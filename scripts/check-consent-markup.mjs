import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const home = resolve(root, '../personal-home');
const dist = resolve(root, 'dist');
const expected = '/analytics.js?v=20261029-consent-1';
const analyticsScripts = html => [...html.matchAll(/<script\b[^>]*\bsrc=["'](\/analytics\.js[^"']*)["'][^>]*>/gi)].map(match => match[1]);
function htmlFile(route) {
  const path = route.replace(/^\//, '').replace(/\/$/, '');
  const options = path ? [resolve(dist, `${path}.html`), resolve(dist, path, 'index.html')] : [resolve(dist, 'index.html')];
  const file = options.find(existsSync);
  assert.ok(file, `Missing generated page for ${route}`);
  return file;
}
function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]);
}

test('every sitemap-indexable static page has exactly the versioned consent loader', () => {
  const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8');
  const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  assert.ok(routes.length > 0);
  for (const route of routes) {
    const html = readFileSync(htmlFile(route), 'utf8');
    assert.deepEqual(analyticsScripts(html), [expected], route);
    assert.ok(!/<script\b[^>]*\bsrc=["']\/analytics\.js["']/i.test(html), `Legacy cache key at ${route}`);
  }
  console.log(`Checked ${routes.length} sitemap-indexable static pages.`);
});

test('walkthrough, iframe and backend demo markup remains without analytics loaders', () => {
  const files = walk(dist).filter(file => file.endsWith('.html') && /[\\/](?:walkthrough|work-walkthrough|backend)[\\/]/.test(file));
  assert.ok(files.length > 0);
  for (const file of files) assert.deepEqual(analyticsScripts(readFileSync(file, 'utf8')), [], file);
  console.log(`Checked ${files.length} untracked demo/embed pages.`);
});

test('production Next output uses the new cache key and is not globally noindex', () => {
  const required = JSON.parse(readFileSync(resolve(home, '.next/required-server-files.json'), 'utf8'));
  assert.equal(required.config.env.NEXT_PUBLIC_AB_PRIVATE_PREVIEW, '0');
  const routes = JSON.parse(readFileSync(resolve(home, '.next/routes-manifest.json'), 'utf8'));
  for (const rule of routes.headers || []) {
    assert.ok(!rule.headers.some(header => header.key.toLowerCase() === 'x-robots-tag' && /noindex/i.test(header.value)), `Unexpected noindex header on ${rule.source}`);
  }
  for (const page of ['index.html', 'privacy.html']) {
    const html = readFileSync(resolve(home, '.next/server/app', page), 'utf8');
    assert.ok(html.includes(expected), `${page}: missing versioned Next Script payload`);
    assert.ok(!/\/analytics\.js(?!\?v=20261029-consent-1)/.test(html), `${page}: legacy/incorrect analytics cache key`);
    assert.ok(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html), `${page}: unexpected robots noindex`);
    assert.ok(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*index/i.test(html), `${page}: missing indexable robots metadata`);
  }
});

test('shared analytics behavior is byte-identical in both sources and static build', () => {
  const source = readFileSync(resolve(home, 'public/analytics.js'));
  assert.ok(source.equals(readFileSync(resolve(root, 'static/analytics.js'))));
  assert.ok(source.equals(readFileSync(resolve(dist, 'analytics.js'))));
});
