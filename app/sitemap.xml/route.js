import { HOME_UPDATED, CASE_STUDY_PAGES, PAGES, PAGES_UPDATED, SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

// /portfolio/* pages are noindex by design (archived, pending evidence review), so they stay out.
export function GET() {
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: HOME_UPDATED },
    ...PAGES.map((p) => ({ loc: `${SITE_URL}${p.path}`, lastmod: p.updated || PAGES_UPDATED })),
    ...CASE_STUDY_PAGES.map((p) => ({ loc: `${SITE_URL}${p.path}` })),
    { loc: `${SITE_URL}/privacy`, lastmod: '2026-10-29' },
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
