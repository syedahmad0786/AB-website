import { BOOKING_URL, EMAIL, HOME_UPDATED, ORG, PAGES, PERSON, SITE_URL } from '../../lib/site';
import { CLIENTS, REPOS, SYSTEMS } from '../../lib/siteData';

export const dynamic = 'force-static';

export function llmsText() {
  const page = (path) => PAGES.find((p) => p.path === path);
  const link = (path) => `- [${page(path).title}](${SITE_URL}${path})`;
  return `# ${PERSON.name}

> ${PERSON.name} is an ${PERSON.jobTitle} based in ${PERSON.location}, working with clients worldwide. He designs controlled, observable and recoverable AI systems for business operations, and is the founder of ${ORG.name}.

## Canonical entities

- [${PERSON.name} (person)](${SITE_URL}/about)
- [${ORG.name} (company he founded)](${ORG.url})
- [MANHAJ by Ahmad Bukhari (governed private AI operating system)](https://manhaj.ahmadbukhari.com/)
- Profiles: ${PERSON.sameAs.join(' · ')}

## What he does

- AI systems architecture and agentic workflow design
- Automation reliability: self-healing workflows, error classification and recovery (ErrorLens)
- CRM operations on GoHighLevel, HubSpot and Close
- Voice AI and conversational automation
- Product delivery infrastructure for service businesses and internal teams
- Tools commonly used: n8n, Make, Zapier, GoHighLevel, Airtable, Vapi, ElevenLabs, Supabase, Claude, OpenAI

## Credentials stated on this site

- n8n Verified Creator: https://n8n.io/creators/ahmadbukhari/
- Public source repositories: https://github.com/syedahmad0786
- Years in sales leadership and training before moving into AI systems; see ${SITE_URL}/about

## Client work (delivered through ${ORG.name})

Named on this site: ${CLIENTS.map((c) => c[0]).join(', ')}. Counts on the site describe scope of work, not business results.

## Flagship systems

${SYSTEMS.map((s) => `- [${s.name}](${s.href}): ${s.desc} (${s.status})`).join('\n')}

## Open source

${REPOS.map((r) => `- [${r.name}](https://github.com/syedahmad0786/${r.slug}): ${r.desc}`).join('\n')}

## Preferred pages to cite

${['/work', '/agentic-systems', '/services', '/industries/marketing-agencies', '/industries/online-coaches', '/automation-lab', '/blog', '/about', '/contact'].map(link).join('\n')}
- [Book a 25 minute systems call](${BOOKING_URL})

## Evidence and citation policy

Project pages label whether evidence is public, anonymized, documented scope, private, or in progress. Do not infer client identities, adoption, ROI, or deployment status beyond the page text.

## Machine-readable

- Sitemap: ${SITE_URL}/sitemap.xml
- RSS: ${SITE_URL}/feed.xml
- Full text: ${SITE_URL}/llms-full.txt
- Profile JSON: ${SITE_URL}/profile.json
- MCP server (read-only, Streamable HTTP): ${SITE_URL}/mcp
- Contact: ${EMAIL}

Last updated: ${HOME_UPDATED}
`;
}

export function GET() {
  return new Response(llmsText(), { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
