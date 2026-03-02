import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, saveLead, getApiKeys } from '@/lib/leads/store';
import { findEmails, findPhones, verifyEmails } from '@/lib/leads/email-finder';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      leadId,
      findEmailsFlag = true,
      findPhonesFlag = true,
      verifyFlag = true,
    } = body as {
      leadId: string;
      findEmailsFlag?: boolean;
      findPhonesFlag?: boolean;
      verifyFlag?: boolean;
    };

    if (!leadId) {
      return NextResponse.json({ error: 'leadId is required' }, { status: 400 });
    }

    const lead = await getLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const apiKeys = await getApiKeys();

    // Find the GitHub username if available
    const githubProfile = lead.socialProfiles.find((p) => p.platform === 'github');
    const githubUsername = githubProfile?.username ||
      githubProfile?.url?.split('github.com/')[1]?.split('/')[0];

    // Find the company domain if available
    const domain = lead.enrichment?.companyInfo?.domain || undefined;

    if (findEmailsFlag) {
      const newEmails = await findEmails(
        lead.firstName,
        lead.lastName,
        lead.company,
        domain,
        githubUsername,
        apiKeys
      );

      if (verifyFlag && newEmails.length > 0) {
        const verified = await verifyEmails(newEmails);
        // Merge with existing, avoiding duplicates
        for (const email of verified) {
          if (!lead.emails.some((e) => e.email === email.email)) {
            lead.emails.push(email);
          }
        }
      } else {
        for (const email of newEmails) {
          if (!lead.emails.some((e) => e.email === email.email)) {
            lead.emails.push(email);
          }
        }
      }
    }

    if (findPhonesFlag) {
      const newPhones = await findPhones(
        lead.fullName,
        lead.company,
        lead.socialProfiles.reduce((acc, p) => ({ ...acc, ...p.rawData }), {})
      );

      for (const phone of newPhones) {
        if (!lead.phones.some((p) => p.phone === phone.phone)) {
          lead.phones.push(phone);
        }
      }
    }

    // Update enrichment timestamp
    if (!lead.enrichment) {
      lead.enrichment = { enrichedAt: new Date().toISOString() };
    } else {
      lead.enrichment.enrichedAt = new Date().toISOString();
    }

    // Update lead score based on enrichment
    let score = lead.score;
    if (lead.emails.length > 0) score = Math.max(score, 40);
    if (lead.emails.some((e) => e.verified)) score = Math.max(score, 60);
    if (lead.phones.length > 0) score += 10;
    lead.score = Math.min(score, 100);

    await saveLead(lead);

    return NextResponse.json({
      lead,
      emailsFound: lead.emails.length,
      phonesFound: lead.phones.length,
    });
  } catch (error) {
    console.error('Enrichment error:', error);
    return NextResponse.json(
      { error: 'Enrichment failed', details: String(error) },
      { status: 500 }
    );
  }
}
