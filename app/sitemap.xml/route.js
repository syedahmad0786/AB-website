import { HOME_UPDATED, PAGES, PAGES_UPDATED, PORTFOLIO_PAGES, SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

export function GET() {
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: HOME_UPDATED },
    ...PAGES.map((p) => ({ loc: `${SITE_URL}${p.path}`, lastmod: PAGES_UPDATED })),
    ...PORTFOLIO_PAGES.map((p) => ({ loc: `${SITE_URL}${p.path}`, lastmod: PAGES_UPDATED })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
