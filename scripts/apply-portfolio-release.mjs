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
      const route = routeOf(rel);
      html = html.replace('<meta name="robots" content="noindex,nofollow">', `<link rel="canonical" href="${SITE}${route}">`);
      sitemapRoutes.push(route);
    }
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
  const today = new Date().toISOString().slice(0, 10);
  const add = sitemapRoutes
    .filter((r) => !xml.includes(`<loc>${SITE}${r}</loc>`))
    .map((r) => `  <url><loc>${SITE}${r}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  if (add) xml = xml.replace('</urlset>', add + '\n</urlset>');
  await writeFile(sitemapPath, xml);
} catch (e) {
  console.warn('sitemap not updated:', e.message);
}

if (!(await stat(resolve(out, 'work/case-studies/index.html')).catch(() => null))) throw new Error('portfolio index missing after release');
console.log(`Portfolio release applied: ${copied} files (${pages} pages), ${sitemapRoutes.length} indexable routes added to sitemap.`);
