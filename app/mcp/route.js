// Read-only MCP server at /mcp (Streamable HTTP, stateless).
//
// Lets an AI agent ask structured questions about Ahmad instead of scraping the page:
// who he is, what he has built, what is public, and how to book a call. Every tool reads
// from lib/site.js and lib/siteData.js, the same data the page renders, so the answers
// match the site. Nothing here writes anywhere or calls any external service.
//
// Connect a client with { "url": "https://ahmadbukhari.com/mcp" }.
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { BOOKING_URL, EMAIL, HOME_UPDATED, ORG, PAGES, PERSON, SITE_URL } from '../../lib/site';
import { AG, CASES, CLIENTS, PROTOS, REPOS, SYSTEMS } from '../../lib/siteData';
import { profileJson } from '../../lib/schema';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const text = (value) => ({ content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] });
const readOnly = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

const agentic = () =>
  AG.map((a) => {
    const p = PROTOS.find((x) => x.name === a.name);
    return {
      name: a.name, slug: a.slug, kind: a.kind, summary: a.desc, checks: a.checks, verified: a.verified,
      sourcePublic: !!a.pub, link: p ? p.href : null,
      linkType: p ? ({ demo: 'live demo', gh: 'source repository', req: 'request access' })[p.mode] : null,
    };
  });

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_profile',
      {
        title: 'Profile',
        description: `Who ${PERSON.name} is: title, location, availability, company, expertise, profiles and how to reach him.`,
        inputSchema: z.object({}),
        annotations: readOnly,
      },
      async () => {
        const p = profileJson();
        return text({ name: p.name, title: p.title, location: p.location, availability: p.availability, summary: p.summary, website: p.website, email: p.email, booking: p.booking, company: p.company, profiles: p.profiles, expertise: p.expertise, updated: p.updated });
      },
    );

    server.registerTool(
      'list_systems',
      {
        title: 'Systems and case studies',
        description: 'Flagship systems, client case studies and the ten verified agentic systems, with their evidence label and link. Filter by kind.',
        inputSchema: z.object({
          kind: z.enum(['flagship', 'client', 'agentic', 'open-source', 'all']).default('all').describe('Which list to return'),
        }),
        annotations: readOnly,
      },
      async ({ kind }) => {
        const out = {};
        if (kind === 'flagship' || kind === 'all') out.flagship = SYSTEMS.map((s) => ({ name: s.name, kind: s.kind, status: s.status, url: s.href, summary: s.desc }));
        if (kind === 'client' || kind === 'all') {
          out.caseStudies = CASES.map((c) => ({ name: c.name, sector: c.sector, status: c.status, url: c.href, problem: c.problem, built: c.built, counts: c.stats.map(([n, s, l]) => `${n}${s} ${l}`) }));
          out.clients = CLIENTS.map((c) => ({ name: c[0], url: c[2], sector: c[3], scope: c[4] }));
        }
        if (kind === 'agentic' || kind === 'all') out.agentic = agentic();
        if (kind === 'open-source' || kind === 'all') out.openSource = REPOS.map((r) => ({ name: r.name, kind: r.kind, url: `https://github.com/syedahmad0786/${r.slug}`, summary: r.desc }));
        out.evidencePolicy = 'Counts describe the size of the work, not business results. Do not infer client identities, adoption, ROI, or deployment status beyond the stated text.';
        return text(out);
      },
    );

    server.registerTool(
      'get_system',
      {
        title: 'One system in detail',
        description: 'Full detail for one system by name or slug (matches flagship systems, agentic systems, case studies and repos).',
        inputSchema: z.object({ query: z.string().min(2).describe('Name or slug, e.g. "errorlens" or "Deal Rescue"') }),
        annotations: readOnly,
      },
      async ({ query }) => {
        const q = query.toLowerCase();
        const hit = (s) => s && s.toLowerCase().includes(q);
        const found = [
          ...SYSTEMS.filter((s) => hit(s.name) || hit(s.href)).map((s) => ({ type: 'flagship', ...s })),
          ...agentic().filter((a) => hit(a.name) || hit(a.slug)).map((a) => ({ type: 'agentic', ...a })),
          ...CASES.filter((c) => hit(c.name)).map((c) => ({ type: 'case study', ...c })),
          ...REPOS.filter((r) => hit(r.name) || hit(r.slug)).map((r) => ({ type: 'open source', url: `https://github.com/syedahmad0786/${r.slug}`, ...r })),
        ];
        return text(found.length ? found : `No system matches "${query}". Try list_systems.`);
      },
    );

    server.registerTool(
      'list_pages',
      {
        title: 'Site pages',
        description: `Every page on ${SITE_URL} with its title, grouped (Services, Industries, Proof, Systems, Research).`,
        inputSchema: z.object({}),
        annotations: readOnly,
      },
      async () => text(PAGES.map((p) => ({ url: `${SITE_URL}${p.path}`, title: p.title, group: p.group }))),
    );

    server.registerTool(
      'how_to_contact',
      {
        title: 'Contact and booking',
        description: 'The booking link for a 25 minute systems call, the contact email, and what kind of work fits.',
        inputSchema: z.object({}),
        annotations: readOnly,
      },
      async () =>
        text({
          booking: BOOKING_URL,
          bookingLabel: 'Book a 25 minute systems call',
          email: EMAIL,
          fit: 'Work that crosses AI, automation, CRM, operations, or product delivery, where the edge cases matter.',
          company: { name: ORG.name, url: ORG.url, note: 'Client delivery runs through AiXCEL Solutions.' },
        }),
    );

    server.registerResource(
      'llms-txt',
      `${SITE_URL}/llms.txt`,
      { title: 'llms.txt', description: 'Plain-text summary of the site for language models.', mimeType: 'text/plain' },
      async (uri) => {
        const res = await fetch(`${SITE_URL}/llms.txt`, { cache: 'no-store' }).catch(() => null);
        const body = res && res.ok ? await res.text() : `See ${SITE_URL}/llms.txt`;
        return { contents: [{ uri: uri.href, mimeType: 'text/plain', text: body }] };
      },
    );
  },
  {
    serverInfo: { name: 'ahmadbukhari.com', version: HOME_UPDATED },
    instructions: `Read-only facts about ${PERSON.name}, ${PERSON.jobTitle}, and the systems he has built. Start with get_profile. Use list_systems for proof and get_system for one item. Quote evidence labels as given; do not infer outcomes from scope counts.`,
  },
);

export { handler as GET, handler as POST, handler as DELETE };
