import { NextRequest, NextResponse } from 'next/server';
import {
  getAllLeads,
  getLeadById,
  saveLead,
  saveMultipleLeads,
  deleteLead,
  updateLeadStatus,
  updateLeadTags,
  updateLeadNotes,
  searchLeads,
  getDashboardStats,
  createEmptyLead,
} from '@/lib/leads/store';
import { Lead, LeadStatus, SearchResult } from '@/lib/leads/types';

// GET /api/leads - List leads or get stats
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const query = searchParams.get('q');
    const id = searchParams.get('id');
    const status = searchParams.get('status') as LeadStatus | null;

    if (action === 'stats') {
      const stats = await getDashboardStats();
      return NextResponse.json(stats);
    }

    if (id) {
      const lead = await getLeadById(id);
      if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(lead);
    }

    let leads: Lead[];
    if (query) {
      leads = await searchLeads(query);
    } else {
      leads = await getAllLeads();
    }

    if (status) {
      leads = leads.filter((l) => l.status === status);
    }

    // Sort by most recent
    leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      leads,
      total: leads.length,
    });
  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json({ error: 'Failed to get leads' }, { status: 500 });
  }
}

// POST /api/leads - Create lead(s) from search results
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, ...data } = body;

    // Save a single search result as a lead
    if (action === 'save_result') {
      const result = data.result as SearchResult;
      const nameParts = result.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const lead = createEmptyLead({
        firstName,
        lastName,
        fullName: result.name,
        title: result.title,
        company: result.company,
        location: result.location,
        avatarUrl: result.avatarUrl,
        source: result.platform,
        socialProfiles: [
          {
            platform: result.platform,
            url: result.url,
            username: result.url.split('/').pop(),
            bio: result.snippet,
            rawData: result.rawData,
          },
        ],
        emails: result.email
          ? [
              {
                email: result.email,
                type: 'unknown',
                confidence: result.confidence,
                verified: false,
                source: result.platform,
              },
            ]
          : [],
        score: result.confidence > 80 ? 40 : 20,
      });

      await saveLead(lead);
      return NextResponse.json({ lead });
    }

    // Save multiple search results
    if (action === 'save_results') {
      const results = data.results as SearchResult[];
      const leads: Lead[] = results.map((result) => {
        const nameParts = result.name.split(' ');
        return createEmptyLead({
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          fullName: result.name,
          title: result.title,
          company: result.company,
          location: result.location,
          avatarUrl: result.avatarUrl,
          source: result.platform,
          socialProfiles: [
            {
              platform: result.platform,
              url: result.url,
              username: result.url.split('/').pop(),
              bio: result.snippet,
              rawData: result.rawData,
            },
          ],
          emails: result.email
            ? [
                {
                  email: result.email,
                  type: 'unknown',
                  confidence: result.confidence,
                  verified: false,
                  source: result.platform,
                },
              ]
            : [],
          score: result.confidence > 80 ? 40 : 20,
        });
      });

      await saveMultipleLeads(leads);
      return NextResponse.json({ leads, count: leads.length });
    }

    // Create a manual lead
    if (action === 'create') {
      const lead = createEmptyLead(data.lead as Partial<Lead>);
      await saveLead(lead);
      return NextResponse.json({ lead });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Create lead error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

// PATCH /api/leads - Update a lead
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    let lead;

    switch (action) {
      case 'status':
        lead = await updateLeadStatus(id, data.status as LeadStatus);
        break;
      case 'tags':
        lead = await updateLeadTags(id, data.tags as string[]);
        break;
      case 'notes':
        lead = await updateLeadNotes(id, data.notes as string);
        break;
      case 'update':
        lead = await getLeadById(id);
        if (lead) {
          Object.assign(lead, data.updates, { updatedAt: new Date().toISOString() });
          await saveLead(lead);
        }
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

// DELETE /api/leads - Delete a lead
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const deleted = await deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete lead error:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
