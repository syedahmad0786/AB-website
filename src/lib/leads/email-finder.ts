// ============================================================================
// Email & Phone Discovery Engine
// Finds contact info using pattern guessing, DNS checks, and public data
// ============================================================================

import { EmailRecord, PhoneRecord, ApiKeysConfig } from './types';
import { findGitHubEmails } from './search-engines';

// ---- Email Pattern Generation ----

const EMAIL_PATTERNS = [
  // Most common patterns (ordered by frequency)
  '{first}@{domain}',
  '{first}.{last}@{domain}',
  '{first}{last}@{domain}',
  '{f}{last}@{domain}',
  '{first}_{last}@{domain}',
  '{first}-{last}@{domain}',
  '{last}@{domain}',
  '{f}.{last}@{domain}',
  '{first}{l}@{domain}',
  '{last}.{first}@{domain}',
  '{last}{first}@{domain}',
  '{last}{f}@{domain}',
  '{f}{l}@{domain}',
];

function generateEmailCandidates(
  firstName: string,
  lastName: string,
  domain: string
): string[] {
  const first = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const last = lastName.toLowerCase().replace(/[^a-z]/g, '');
  const f = first[0] || '';
  const l = last[0] || '';

  if (!first || !domain) return [];

  return EMAIL_PATTERNS.map((pattern) =>
    pattern
      .replace('{first}', first)
      .replace('{last}', last)
      .replace('{f}', f)
      .replace('{l}', l)
      .replace('{domain}', domain)
  ).filter((email) => email.includes('@') && !email.includes('undefined'));
}

// ---- Domain Discovery ----

export function guessCompanyDomain(company: string): string[] {
  const clean = company
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();

  const words = clean.split(/\s+/);
  const domains: string[] = [];

  // Common domain patterns
  const tlds = ['.com', '.io', '.co', '.ai', '.dev', '.tech'];

  // Full name joined
  const joined = words.join('');
  const dashed = words.join('-');

  for (const tld of tlds) {
    domains.push(joined + tld);
    if (words.length > 1) {
      domains.push(dashed + tld);
      domains.push(words[0] + tld); // First word only
    }
  }

  // Remove duplicates
  return [...new Set(domains)];
}

// ---- DNS MX Record Check (via DoH) ----

async function checkMxRecord(domain: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return false;
    const data = await res.json();
    return (data.Answer?.length ?? 0) > 0;
  } catch {
    return false;
  }
}

// ---- Email Verification via SMTP (basic check) ----

async function verifyEmailBasic(email: string): Promise<boolean> {
  // We use a simple DNS MX check - full SMTP verification requires a backend service
  const domain = email.split('@')[1];
  if (!domain) return false;
  return checkMxRecord(domain);
}

// ---- Hunter.io Integration (free: 25 searches/month) ----

async function searchHunter(
  domain: string,
  firstName: string,
  lastName: string,
  apiKey: string
): Promise<EmailRecord[]> {
  const results: EmailRecord[] = [];

  // Email finder endpoint
  try {
    const params = new URLSearchParams({
      domain,
      first_name: firstName,
      last_name: lastName,
      api_key: apiKey,
    });

    const res = await fetch(`https://api.hunter.io/v2/email-finder?${params}`);
    if (res.ok) {
      const data = await res.json();
      if (data.data?.email) {
        results.push({
          email: data.data.email,
          type: 'work',
          confidence: data.data.score || 80,
          verified: data.data.verification?.status === 'valid',
          source: 'hunter.io',
        });
      }
    }
  } catch {
    // ignore
  }

  // Domain search for additional emails
  try {
    const params = new URLSearchParams({
      domain,
      api_key: apiKey,
      limit: '5',
    });

    const res = await fetch(`https://api.hunter.io/v2/domain-search?${params}`);
    if (res.ok) {
      const data = await res.json();
      const pattern = data.data?.pattern;
      if (pattern && firstName && lastName) {
        const email = pattern
          .replace('{first}', firstName.toLowerCase())
          .replace('{last}', lastName.toLowerCase())
          .replace('{f}', firstName[0]?.toLowerCase() || '')
          .replace('{l}', lastName[0]?.toLowerCase() || '');

        if (email && !results.some((r) => r.email === `${email}@${domain}`)) {
          results.push({
            email: `${email}@${domain}`,
            type: 'work',
            confidence: 75,
            verified: false,
            source: 'hunter.io (pattern)',
          });
        }
      }
    }
  } catch {
    // ignore
  }

  return results;
}

// ---- Main Email Discovery Orchestrator ----

export async function findEmails(
  firstName: string,
  lastName: string,
  company?: string,
  domain?: string,
  githubUsername?: string,
  apiKeys?: ApiKeysConfig
): Promise<EmailRecord[]> {
  const allEmails: EmailRecord[] = [];
  const seenEmails = new Set<string>();

  const addEmail = (record: EmailRecord) => {
    const normalized = record.email.toLowerCase().trim();
    if (!seenEmails.has(normalized) && isValidEmail(normalized)) {
      seenEmails.add(normalized);
      allEmails.push({ ...record, email: normalized });
    }
  };

  const tasks: Promise<void>[] = [];

  // 1. Hunter.io (if API key available)
  if (apiKeys?.hunterApiKey && domain) {
    tasks.push(
      searchHunter(domain, firstName, lastName, apiKeys.hunterApiKey)
        .then((emails) => emails.forEach(addEmail))
        .catch(() => {})
    );
  }

  // 2. GitHub email discovery (free)
  if (githubUsername) {
    tasks.push(
      findGitHubEmails(githubUsername, apiKeys?.githubToken)
        .then((emails) => {
          for (const email of emails) {
            addEmail({
              email,
              type: 'personal',
              confidence: 95,
              verified: true,
              source: 'github (commits)',
            });
          }
        })
        .catch(() => {})
    );
  }

  // 3. Domain-based pattern guessing
  const domains: string[] = [];
  if (domain) domains.push(domain);
  if (company) {
    const guessedDomains = guessCompanyDomain(company);
    domains.push(...guessedDomains);
  }

  // Check MX records for discovered domains
  for (const d of [...new Set(domains)].slice(0, 5)) {
    tasks.push(
      checkMxRecord(d).then((hasMx) => {
        if (hasMx) {
          const candidates = generateEmailCandidates(firstName, lastName, d);
          // Add top patterns with descending confidence
          candidates.slice(0, 5).forEach((email, idx) => {
            addEmail({
              email,
              type: 'work',
              confidence: Math.max(40, 70 - idx * 8),
              verified: false,
              source: `pattern (${d})`,
            });
          });
        }
      }).catch(() => {})
    );
  }

  await Promise.all(tasks);

  // Sort by confidence
  allEmails.sort((a, b) => b.confidence - a.confidence);

  return allEmails;
}

// ---- Phone Number Discovery ----

export async function findPhones(
  _name: string,
  _company?: string,
  existingData?: Record<string, unknown>
): Promise<PhoneRecord[]> {
  const phones: PhoneRecord[] = [];

  // Extract phone numbers from any existing scraped data
  if (existingData) {
    const text = JSON.stringify(existingData);
    const phonePatterns = [
      /\+?1?\s*[-.]?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
      /\+\d{1,3}\s?\d{4,14}/g,
      /\(\d{3}\)\s*\d{3}[-.]?\d{4}/g,
    ];

    for (const pattern of phonePatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const phone = match[0].trim();
        if (phone.replace(/\D/g, '').length >= 10) {
          phones.push({
            phone,
            type: 'unknown',
            confidence: 50,
            source: 'scraped data',
          });
        }
      }
    }
  }

  return phones;
}

// ---- Validation ----

function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) return false;
  // Filter out common false positives
  const blacklist = ['example.com', 'test.com', 'localhost', 'sentry.io', 'github.com'];
  const domain = email.split('@')[1];
  return !blacklist.some((b) => domain?.includes(b));
}

// ---- Bulk Email Verification ----

export async function verifyEmails(emails: EmailRecord[]): Promise<EmailRecord[]> {
  const verified: EmailRecord[] = [];

  for (const record of emails) {
    const isValid = await verifyEmailBasic(record.email);
    verified.push({
      ...record,
      verified: isValid,
      confidence: isValid ? Math.min(record.confidence + 10, 100) : Math.max(record.confidence - 20, 10),
    });
  }

  return verified;
}
