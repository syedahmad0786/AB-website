import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, saveLead, getApiKeys } from '@/lib/leads/store';
import { generatePsychProfile } from '@/lib/leads/profiler';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { leadId } = body as { leadId: string };

    if (!leadId) {
      return NextResponse.json({ error: 'leadId is required' }, { status: 400 });
    }

    const lead = await getLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const apiKeys = await getApiKeys();
    const profile = await generatePsychProfile(lead, apiKeys.openaiApiKey);

    lead.psychProfile = profile;

    // Boost score for profiled leads
    lead.score = Math.max(lead.score, 50);
    if (profile.confidence > 60) lead.score = Math.max(lead.score, 70);

    await saveLead(lead);

    return NextResponse.json({
      lead,
      profile,
    });
  } catch (error) {
    console.error('Profiling error:', error);
    return NextResponse.json(
      { error: 'Profiling failed', details: String(error) },
      { status: 500 }
    );
  }
}
