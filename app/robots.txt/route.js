import { SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

const AGENTS = ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Applebot-Extended', 'Google-Extended', 'Bingbot', 'Amazonbot', 'cohere-ai', 'Meta-ExternalAgent'];

export function GET() {
  const body = [
    'User-agent: *', 'Allow: /', 'Disallow: /api/', '',
    ...AGENTS.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL}`,
    '',
    `# Machine-readable: ${SITE_URL}/llms.txt · ${SITE_URL}/llms-full.txt · ${SITE_URL}/profile.json · MCP at ${SITE_URL}/mcp`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
