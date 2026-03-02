// ============================================================================
// Lead Storage Layer - JSON file-based storage (zero cost)
// ============================================================================

import { promises as fs } from 'fs';
import path from 'path';
import {
  Lead,
  LeadStatus,
  DashboardStats,
  ApiKeysConfig,
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// ---- Helpers ----

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // dir exists
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ---- Lead CRUD ----

export async function getAllLeads(): Promise<Lead[]> {
  return readJsonFile<Lead[]>(LEADS_FILE, []);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const leads = await getAllLeads();
  return leads.find((l) => l.id === id) ?? null;
}

export async function saveLead(lead: Lead): Promise<Lead> {
  const leads = await getAllLeads();
  const existingIndex = leads.findIndex((l) => l.id === lead.id);

  if (existingIndex >= 0) {
    leads[existingIndex] = { ...lead, updatedAt: new Date().toISOString() };
  } else {
    leads.push(lead);
  }

  await writeJsonFile(LEADS_FILE, leads);
  return lead;
}

export async function saveMultipleLeads(newLeads: Lead[]): Promise<Lead[]> {
  const leads = await getAllLeads();

  for (const newLead of newLeads) {
    const existingIndex = leads.findIndex((l) => l.id === newLead.id);
    if (existingIndex >= 0) {
      leads[existingIndex] = { ...newLead, updatedAt: new Date().toISOString() };
    } else {
      leads.push(newLead);
    }
  }

  await writeJsonFile(LEADS_FILE, leads);
  return newLeads;
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await getAllLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  await writeJsonFile(LEADS_FILE, filtered);
  return true;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  const leads = await getAllLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return null;
  lead.status = status;
  lead.updatedAt = new Date().toISOString();
  await writeJsonFile(LEADS_FILE, leads);
  return lead;
}

export async function updateLeadTags(id: string, tags: string[]): Promise<Lead | null> {
  const leads = await getAllLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return null;
  lead.tags = tags;
  lead.updatedAt = new Date().toISOString();
  await writeJsonFile(LEADS_FILE, leads);
  return lead;
}

export async function updateLeadNotes(id: string, notes: string): Promise<Lead | null> {
  const leads = await getAllLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return null;
  lead.notes = notes;
  lead.updatedAt = new Date().toISOString();
  await writeJsonFile(LEADS_FILE, leads);
  return lead;
}

export async function searchLeads(query: string): Promise<Lead[]> {
  const leads = await getAllLeads();
  const lower = query.toLowerCase();
  return leads.filter(
    (l) =>
      l.fullName.toLowerCase().includes(lower) ||
      l.company?.toLowerCase().includes(lower) ||
      l.title?.toLowerCase().includes(lower) ||
      l.industry?.toLowerCase().includes(lower) ||
      l.tags.some((t) => t.toLowerCase().includes(lower)) ||
      l.emails.some((e) => e.email.toLowerCase().includes(lower))
  );
}

export async function getLeadsByStatus(status: LeadStatus): Promise<Lead[]> {
  const leads = await getAllLeads();
  return leads.filter((l) => l.status === status);
}

export async function getLeadsByTag(tag: string): Promise<Lead[]> {
  const leads = await getAllLeads();
  return leads.filter((l) => l.tags.includes(tag));
}

// ---- Stats ----

export async function getDashboardStats(): Promise<DashboardStats> {
  const leads = await getAllLeads();
  return {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === 'new').length,
    enrichedLeads: leads.filter((l) => l.enrichment).length,
    profiledLeads: leads.filter((l) => l.psychProfile).length,
    emailsFound: leads.reduce((sum, l) => sum + l.emails.length, 0),
    phonesFound: leads.reduce((sum, l) => sum + l.phones.length, 0),
  };
}

// ---- Config ----

export async function getApiKeys(): Promise<ApiKeysConfig> {
  // First check environment variables, then fall back to config file
  const envKeys: ApiKeysConfig = {
    serpApiKey: process.env.SERP_API_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,
    githubToken: process.env.GITHUB_TOKEN,
    hunterApiKey: process.env.HUNTER_API_KEY,
    proxycurlApiKey: process.env.PROXYCURL_API_KEY,
  };

  const fileKeys = await readJsonFile<ApiKeysConfig>(CONFIG_FILE, {});

  return {
    serpApiKey: envKeys.serpApiKey || fileKeys.serpApiKey,
    openaiApiKey: envKeys.openaiApiKey || fileKeys.openaiApiKey,
    githubToken: envKeys.githubToken || fileKeys.githubToken,
    hunterApiKey: envKeys.hunterApiKey || fileKeys.hunterApiKey,
    proxycurlApiKey: envKeys.proxycurlApiKey || fileKeys.proxycurlApiKey,
  };
}

export async function saveApiKeys(keys: Partial<ApiKeysConfig>): Promise<void> {
  const existing = await readJsonFile<ApiKeysConfig>(CONFIG_FILE, {});
  const merged = { ...existing, ...keys };
  await writeJsonFile(CONFIG_FILE, merged);
}

// ---- Export ----

export async function exportLeadsToCsv(leadIds?: string[]): Promise<string> {
  let leads = await getAllLeads();
  if (leadIds && leadIds.length > 0) {
    leads = leads.filter((l) => leadIds.includes(l.id));
  }

  const headers = [
    'Name', 'Title', 'Company', 'Industry', 'Location',
    'Email (Primary)', 'Email Confidence', 'Phone (Primary)',
    'LinkedIn', 'Twitter', 'GitHub', 'Score', 'Status', 'Tags',
    'Communication Style', 'Decision Style', 'Top Values',
  ];

  const rows = leads.map((l) => {
    const primaryEmail = l.emails[0];
    const primaryPhone = l.phones[0];
    const linkedin = l.socialProfiles.find((s) => s.platform === 'linkedin');
    const twitter = l.socialProfiles.find((s) => s.platform === 'twitter');
    const github = l.socialProfiles.find((s) => s.platform === 'github');

    return [
      l.fullName,
      l.title || '',
      l.company || '',
      l.industry || '',
      l.location || '',
      primaryEmail?.email || '',
      primaryEmail ? `${primaryEmail.confidence}%` : '',
      primaryPhone?.phone || '',
      linkedin?.url || '',
      twitter?.url || '',
      github?.url || '',
      `${l.score}`,
      l.status,
      l.tags.join('; '),
      l.psychProfile?.communicationStyle?.primary || '',
      l.psychProfile?.decisionMaking?.style || '',
      l.psychProfile?.values?.topValues?.join('; ') || '',
    ];
  });

  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csv = [
    headers.map(escape).join(','),
    ...rows.map((r) => r.map(escape).join(',')),
  ].join('\n');

  return csv;
}

export async function exportLeadsToJson(leadIds?: string[]): Promise<string> {
  let leads = await getAllLeads();
  if (leadIds && leadIds.length > 0) {
    leads = leads.filter((l) => leadIds.includes(l.id));
  }
  return JSON.stringify(leads, null, 2);
}

// ---- Utility ----

export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function createEmptyLead(overrides: Partial<Lead> = {}): Lead {
  const now = new Date().toISOString();
  return {
    id: generateLeadId(),
    createdAt: now,
    updatedAt: now,
    firstName: '',
    lastName: '',
    fullName: '',
    emails: [],
    phones: [],
    socialProfiles: [],
    tags: [],
    score: 0,
    status: 'new',
    source: '',
    notes: '',
    ...overrides,
  };
}
