import { SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = [
    { title: 'Automation Governance for Inspectable Systems', link: `${SITE_URL}/blog/automation-governance-inspectable-systems`, date: 'Tue, 11 Aug 2026 00:00:00 GMT', desc: 'A practitioner guide to governing CRM state, AI decisions, product delivery, error recovery, and workflow migration through explicit controls and evidence.' },
    { title: 'How to Choose an AI Automation Agency', link: `${SITE_URL}/blog/how-to-choose-an-ai-automation-agency`, date: 'Wed, 22 Jul 2026 00:00:00 GMT', desc: 'A practical buyer guide to evaluating an AI automation agency by diagnosis, architecture, evidence, controls, ownership, reliability, and handover.' },
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Ahmad Bukhari — Research &amp; Findings</title><link>${SITE_URL}/blog</link><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/><description>Dated, evidence-led AI research and business findings in plain English.</description>${items
    .map((i) => `<item><title>${esc(i.title)}</title><link>${i.link}</link><guid>${i.link}</guid><pubDate>${i.date}</pubDate><description>${esc(i.desc)}</description></item>`)
    .join('')}</channel></rss>`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
