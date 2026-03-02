// ============================================================================
// Multi-Source Lead Search Engine
// Searches Google (via SerpAPI or free), GitHub, and web sources
// ============================================================================

import { SearchResult, SocialPlatform, SearchFilters, ApiKeysConfig } from './types';

// ---- Google Search via SerpAPI (100 free/month, then $50/5000) ----

async function searchViaSerpApi(
  query: string,
  apiKey: string,
  num: number = 10
): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    api_key: apiKey,
    engine: 'google',
    num: String(num),
  });

  const res = await fetch(`https://serpapi.com/search.json?${params}`);
  if (!res.ok) throw new Error(`SerpAPI error: ${res.status}`);

  const data = await res.json();
  const results: SearchResult[] = [];

  for (const item of data.organic_results || []) {
    const result = parseGoogleResult(item.title, item.snippet, item.link);
    if (result) results.push(result);
  }

  return results;
}

// ---- Google Custom Search API (100 free/day, $5/1000 after) ----

async function searchViaGoogleCSE(
  query: string,
  apiKey: string,
  cseId: string,
  num: number = 10
): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    key: apiKey,
    cx: cseId,
    num: String(Math.min(num, 10)),
  });

  const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
  if (!res.ok) throw new Error(`Google CSE error: ${res.status}`);

  const data = await res.json();
  const results: SearchResult[] = [];

  for (const item of data.items || []) {
    const result = parseGoogleResult(item.title, item.snippet, item.link);
    if (result) results.push(result);
  }

  return results;
}

function parseGoogleResult(
  title: string,
  snippet: string,
  url: string
): SearchResult | null {
  const platform = detectPlatform(url);
  const nameMatch = extractNameFromTitle(title, platform);

  if (!nameMatch) return null;

  const email = extractEmailFromText(snippet + ' ' + title);

  return {
    platform,
    name: nameMatch,
    title: extractTitleFromSnippet(snippet),
    company: extractCompanyFromSnippet(snippet),
    location: extractLocationFromSnippet(snippet),
    url,
    snippet,
    email: email || undefined,
    confidence: platform === 'linkedin' ? 85 : 60,
  };
}

// ---- GitHub Search (Free, 5000 req/hour with token) ----

async function searchGitHub(
  query: string,
  token?: string
): Promise<SearchResult[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const params = new URLSearchParams({
    q: query,
    per_page: '20',
    sort: 'followers',
  });

  const res = await fetch(`https://api.github.com/search/users?${params}`, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const data = await res.json();
  const results: SearchResult[] = [];

  // Fetch detailed user info for top results
  const items = (data.items || []).slice(0, 10);

  for (const user of items) {
    try {
      const userRes = await fetch(`https://api.github.com/users/${user.login}`, { headers });
      if (!userRes.ok) continue;
      const userData = await userRes.json();

      results.push({
        platform: 'github',
        name: userData.name || userData.login,
        title: userData.bio || undefined,
        company: userData.company?.replace('@', '') || undefined,
        location: userData.location || undefined,
        url: userData.html_url,
        avatarUrl: userData.avatar_url,
        email: userData.email || undefined,
        snippet: userData.bio || '',
        confidence: userData.email ? 90 : 70,
        rawData: {
          login: userData.login,
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          blog: userData.blog,
          twitterUsername: userData.twitter_username,
          hireable: userData.hireable,
          createdAt: userData.created_at,
        },
      });
    } catch {
      // skip failed user lookups
    }
  }

  return results;
}

// ---- GitHub Email Discovery (from public events/commits) ----

export async function findGitHubEmails(
  username: string,
  token?: string
): Promise<string[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const emails = new Set<string>();

  // Check public events for commit emails
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      { headers }
    );
    if (res.ok) {
      const events = await res.json();
      for (const event of events) {
        if (event.type === 'PushEvent') {
          for (const commit of event.payload?.commits || []) {
            const email = commit.author?.email;
            if (email && !email.includes('noreply') && !email.includes('users.noreply')) {
              emails.add(email);
            }
          }
        }
      }
    }
  } catch {
    // ignore
  }

  // Check repos for commit emails
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
      { headers }
    );
    if (res.ok) {
      const repos = await res.json();
      for (const repo of repos.slice(0, 3)) {
        try {
          const commitsRes = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?author=${username}&per_page=5`,
            { headers }
          );
          if (commitsRes.ok) {
            const commits = await commitsRes.json();
            for (const commit of commits) {
              const email = commit.commit?.author?.email;
              if (email && !email.includes('noreply') && !email.includes('users.noreply')) {
                emails.add(email);
              }
            }
          }
        } catch {
          // skip
        }
      }
    }
  } catch {
    // ignore
  }

  return Array.from(emails);
}

// ---- Main Search Orchestrator ----

export async function searchLeads(
  query: string,
  platforms: SocialPlatform[],
  filters: SearchFilters | undefined,
  apiKeys: ApiKeysConfig
): Promise<SearchResult[]> {
  const allResults: SearchResult[] = [];
  const errors: string[] = [];

  // Build search queries for different platforms
  const searches: Promise<void>[] = [];

  // Google-based searches (LinkedIn, Twitter, general)
  if (apiKeys.serpApiKey) {
    for (const platform of platforms) {
      if (platform === 'github') continue; // handled separately

      const dorkQuery = buildDorkQuery(query, platform, filters);
      searches.push(
        searchViaSerpApi(dorkQuery, apiKeys.serpApiKey, 10)
          .then((results) => {
            allResults.push(...results);
          })
          .catch((e) => {
            errors.push(`SerpAPI (${platform}): ${e.message}`);
          })
      );
    }
  } else {
    // Fall back to Google CSE if available
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const googleCseId = process.env.GOOGLE_CSE_ID;

    if (googleApiKey && googleCseId) {
      for (const platform of platforms) {
        if (platform === 'github') continue;

        const dorkQuery = buildDorkQuery(query, platform, filters);
        searches.push(
          searchViaGoogleCSE(dorkQuery, googleApiKey, googleCseId, 10)
            .then((results) => {
              allResults.push(...results);
            })
            .catch((e) => {
              errors.push(`Google CSE (${platform}): ${e.message}`);
            })
        );
      }
    }
  }

  // GitHub direct API search
  if (platforms.includes('github')) {
    const ghQuery = buildGitHubQuery(query, filters);
    searches.push(
      searchGitHub(ghQuery, apiKeys.githubToken)
        .then((results) => {
          allResults.push(...results);
        })
        .catch((e) => {
          errors.push(`GitHub: ${e.message}`);
        })
    );
  }

  await Promise.all(searches);

  // Deduplicate results by URL
  const seen = new Set<string>();
  const deduped = allResults.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });

  // Sort by confidence
  deduped.sort((a, b) => b.confidence - a.confidence);

  return deduped;
}

// ---- Query Builders ----

function buildDorkQuery(
  query: string,
  platform: SocialPlatform,
  filters?: SearchFilters
): string {
  const parts: string[] = [];

  // Platform-specific site restriction
  const siteMap: Record<string, string> = {
    linkedin: 'site:linkedin.com/in/',
    twitter: 'site:twitter.com OR site:x.com',
    facebook: 'site:facebook.com',
    instagram: 'site:instagram.com',
    medium: 'site:medium.com',
    reddit: 'site:reddit.com/user/',
    youtube: 'site:youtube.com',
  };

  if (siteMap[platform]) {
    parts.push(siteMap[platform]);
  }

  parts.push(query);

  if (filters?.title) parts.push(`"${filters.title}"`);
  if (filters?.company) parts.push(`"${filters.company}"`);
  if (filters?.location) parts.push(`"${filters.location}"`);
  if (filters?.industry) parts.push(`"${filters.industry}"`);

  return parts.join(' ');
}

function buildGitHubQuery(query: string, filters?: SearchFilters): string {
  const parts = [query];
  if (filters?.location) parts.push(`location:${filters.location}`);
  if (filters?.company) parts.push(`${filters.company}`);
  return parts.join(' ');
}

// ---- Text Extraction Helpers ----

function detectPlatform(url: string): SocialPlatform {
  if (url.includes('linkedin.com')) return 'linkedin';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('github.com')) return 'github';
  if (url.includes('facebook.com')) return 'facebook';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('medium.com')) return 'medium';
  if (url.includes('reddit.com')) return 'reddit';
  if (url.includes('youtube.com')) return 'youtube';
  if (url.includes('tiktok.com')) return 'tiktok';
  return 'other';
}

function extractNameFromTitle(title: string, platform: SocialPlatform): string | null {
  if (platform === 'linkedin') {
    // LinkedIn titles: "First Last - Title | LinkedIn" or "First Last | LinkedIn"
    const match = title.match(/^([^-|]+?)(?:\s*[-|])/);
    if (match) return match[1].trim();
  }

  if (platform === 'twitter') {
    // Twitter: "Name (@handle) / X" or "Name (@handle)"
    const match = title.match(/^([^(]+?)(?:\s*\()/);
    if (match) return match[1].trim();
  }

  if (platform === 'github') {
    const match = title.match(/^([^·(]+)/);
    if (match) return match[1].trim();
  }

  // Generic - just take first reasonable segment
  const match = title.match(/^([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){0,3})/);
  if (match) return match[1].trim();

  return title.split(/[-|·]/)[0]?.trim() || null;
}

function extractEmailFromText(text: string): string | null {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

function extractTitleFromSnippet(snippet: string): string | undefined {
  // Try to extract job title patterns
  const patterns = [
    /(?:^|\.\s+)([A-Z][a-zA-Z\s&]+(?:at|@)\s+[A-Z][a-zA-Z\s&]+)/,
    /(?:CEO|CTO|CFO|COO|VP|Director|Manager|Engineer|Developer|Designer|Founder|Co-founder|Head of)[^.]*?(?:\.|$)/i,
  ];

  for (const pattern of patterns) {
    const match = snippet.match(pattern);
    if (match) return match[0].trim().replace(/\.\s*$/, '');
  }

  return undefined;
}

function extractCompanyFromSnippet(snippet: string): string | undefined {
  const patterns = [
    /(?:at|@)\s+([A-Z][a-zA-Z0-9\s&.]+?)(?:\s*[.|,]|\s+[-·])/,
    /(?:works?\s+(?:at|for)|employed\s+(?:at|by))\s+([A-Z][a-zA-Z0-9\s&.]+?)(?:\s*[.|,])/i,
  ];

  for (const pattern of patterns) {
    const match = snippet.match(pattern);
    if (match) return match[1].trim();
  }

  return undefined;
}

function extractLocationFromSnippet(snippet: string): string | undefined {
  const patterns = [
    /(?:based\s+in|located\s+in|from)\s+([A-Z][a-zA-Z\s,]+?)(?:\s*[.|])/i,
    /([A-Z][a-z]+,\s+[A-Z]{2})\b/, // City, STATE format
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?,\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/, // City, Country
  ];

  for (const pattern of patterns) {
    const match = snippet.match(pattern);
    if (match) return match[1].trim();
  }

  return undefined;
}

// ---- Profile Scraping Helpers ----

export async function scrapePublicProfile(
  url: string,
  _platform: SocialPlatform
): Promise<Record<string, unknown> | null> {
  // Use a simple fetch to get publicly available data
  // Note: Many platforms block direct scraping; this works for public profiles
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) return null;

    const html = await res.text();

    // Extract structured data from meta tags
    const ogData: Record<string, string> = {};
    const metaRegex = /<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]*?)"\s*\/?>/gi;
    let match;
    while ((match = metaRegex.exec(html)) !== null) {
      ogData[match[1]] = match[2];
    }

    // Extract emails from page
    const emailSet = new Set<string>();
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    let emailMatch;
    while ((emailMatch = emailRegex.exec(html)) !== null) {
      const email = emailMatch[0];
      if (!email.includes('example.com') && !email.includes('sentry')) {
        emailSet.add(email);
      }
    }

    return {
      title: ogData['og:title'] || ogData['twitter:title'],
      description: ogData['og:description'] || ogData['twitter:description'] || ogData['description'],
      image: ogData['og:image'] || ogData['twitter:image'],
      emails: Array.from(emailSet),
    };
  } catch {
    return null;
  }
}
