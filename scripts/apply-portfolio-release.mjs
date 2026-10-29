// Layers the prebuilt portfolio release (case studies, articles, live walkthrough apps,
// logos and workflow templates) onto the static site that build-seo-site.mjs produced.
// Runs after the main build: `node scripts/build-seo-site.mjs && node scripts/apply-portfolio-release.mjs`.
import { readFile, writeFile, mkdir, readdir, copyFile, stat } from 'node:fs/promises';
import { resolve, dirname, relative, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'release/portfolio');
const out = resolve(root, 'dist');
const SITE = 'https://ahmadbukhari.com';
const SKIP = new Set(['index.html', '404.html', 'favicon.svg']); // owned by the main site

async function files(dir) {
  const list = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) list.push(...await files(p));
    else list.push(p);
  }
  return list;
}

// Link previews (LinkedIn, X, Slack): one 1200x627 card per public case study, served from /work/og/.
const OG = {
  'work/case-studies/index.html': ['case-studies', 'Six systems I built: OpenXCEL AI, Command Center, Member Onboarding, ErrorLens, Member Pulse and SIGNAL'],
  'work/case-studies/openxcel-ai/index.html': ['openxcel-ai', 'OpenXCEL AI: an AI coworker in your Slack, shown in a Slack workspace'],
  'work/case-studies/healthcare-agency-operating-os/index.html': ['healthcare-agency-operating-os', 'Command Center: run client delivery from one workspace, with a lifecycle milestone board'],
  'work/case-studies/member-onboarding/index.html': ['member-onboarding', 'Member Onboarding: every member setup step checkpointed, with an onboarding pipeline view'],
  'work/case-studies/automation-monitoring/index.html': ['automation-monitoring', 'ErrorLens: make broken automations visible, with an error overview dashboard'],
  'work/case-studies/dashboards-daily-pulse/index.html': ['dashboards-daily-pulse', 'Member Pulse: see the whole member journey, with a connected pulse stream chart'],
  'work/case-studies/signal/index.html': ['signal', 'SIGNAL: see where your brand shows up when buyers ask ChatGPT, Perplexity, Gemini and Claude'],
  'work/case-studies/commerce-intelligence-creative/index.html': ['commerce-intelligence-creative', 'Commerce intelligence: creative briefs that know what customers buy, with Meta and Shopify campaign context'],
  'work/case-studies/agency-research-campaign/index.html': ['agency-research-campaign', 'Campaign research: client research carried into campaign copy, with a research document library'],
};
const OG_W = 1200, OG_H = 627;
function withLinkPreview(html, rel) {
  const [slug, alt] = OG[rel];
  const image = `${SITE}/work/og/${slug}.jpg`;
  const route = routeOf(rel);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)">/)?.[1];
  const has = (p) => html.includes(`property="${p}"`) || html.includes(`name="${p}"`);
  const tags = [];
  if (!has('og:type')) tags.push('<meta property="og:type" content="website">');
  if (!has('og:url')) tags.push(`<meta property="og:url" content="${SITE}${route}">`);
  if (!has('og:title') && title) tags.push(`<meta property="og:title" content="${title}">`);
  if (!has('og:description') && desc) tags.push(`<meta property="og:description" content="${desc}">`);
  tags.push(
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:secure_url" content="${image}">`,
    '<meta property="og:image:type" content="image/jpeg">',
    `<meta property="og:image:width" content="${OG_W}">`,
    `<meta property="og:image:height" content="${OG_H}">`,
    `<meta property="og:image:alt" content="${alt}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:image" content="${image}">`,
    `<meta name="twitter:image:alt" content="${alt}">`,
  );
  if (!html.includes('</head>')) throw new Error('no </head> in ' + rel);
  return html.replace('</head>', tags.join('') + '</head>');
}

const indexable = (rel) => /^work\/case-studies\/[a-z0-9-]+(\/article)?\/index\.html$/.test(rel) && !rel.includes('/backend/') && !rel.endsWith('/walkthrough/index.html') || rel === 'work/case-studies/index.html';
const routeOf = (rel) => '/' + rel.replace(/\/?index\.html$/, '');

let copied = 0, pages = 0;
const sitemapRoutes = [];
for (const file of await files(src)) {
  const rel = relative(src, file).split(sep).join('/');
  if (SKIP.has(rel)) continue;
  const dest = resolve(out, rel);
  await mkdir(dirname(dest), { recursive: true });
  if (rel.endsWith('.html')) {
    let html = await readFile(file, 'utf8');
    html = html
      .replaceAll('Ahmad Bukhari · Private preview', 'Ahmad Bukhari')
      .replaceAll('BUILD NOTE · PRIVATE DRAFT', 'BUILD NOTE');
    if (indexable(rel)) {
      // Single shared consent asset; embeds/walkthroughs remain untracked.
      html = html.replace(/<script\b[^>]*src=["']\/analytics\.js[^"']*["'][^>]*>\s*<\/script>/gi, "");
      html = html.replace("</body>", '<script defer src="/analytics.js?v=20261029-consent-1"></script></body>');
      const route = routeOf(rel);
      html = html.replace('<meta name="robots" content="noindex,nofollow">', `<link rel="canonical" href="${SITE}${route}">`);
      sitemapRoutes.push(route);
    }
    if (OG[rel]) html = withLinkPreview(html, rel);
    await writeFile(dest, html);
    pages++;
  } else {
    await copyFile(file, dest);
  }
  copied++;
}

// Add the new public pages to the sitemap the main build wrote.
const sitemapPath = resolve(out, 'sitemap.xml');
try {
  let xml = await readFile(sitemapPath, 'utf8');
  // Original release history unavailable: omit lastmod rather than invent a build date.
  const add = sitemapRoutes
    .filter((r) => !xml.includes(`<loc>${SITE}${r}</loc>`))
    .map((r) => `  <url><loc>${SITE}${r}</loc></url>`)
    .join('\n');
  if (add) xml = xml.replace('</urlset>', add + '\n</urlset>');
  await writeFile(sitemapPath, xml);
} catch (e) {
  console.warn('sitemap not updated:', e.message);
}

if (!(await stat(resolve(out, 'work/case-studies/index.html')).catch(() => null))) throw new Error('portfolio index missing after release');
for (const [rel, [slug]] of Object.entries(OG)) {
  const html = await readFile(resolve(out, rel), 'utf8');
  if (!html.includes(`<meta property="og:image" content="${SITE}/work/og/${slug}.jpg">`)) throw new Error('og:image missing on ' + rel);
  if ((html.match(/property="og:image"/g) || []).length !== 1) throw new Error('duplicate og:image on ' + rel);
  const img = await stat(resolve(out, 'work/og', slug + '.jpg')).catch(() => null);
  if (!img || img.size > 1024 * 1024) throw new Error('og image missing or over 1 MB: ' + slug);
}
console.log(`Portfolio release applied: ${copied} files (${pages} pages), ${sitemapRoutes.length} indexable routes added to sitemap.`);
