import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const dist = resolve(root, "dist");
const sitemap = await readFile(resolve(dist, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
const failures = [];
const canonicals = new Set();
const sitemapHrefs = new Set(urls.map((url) => url.href));

for (const url of urls) {
  const relative = url.pathname === "/" ? "index.html" : `${url.pathname.slice(1)}.html`;
  const file = resolve(dist, relative);
  try {
    if (!(await stat(file)).isFile()) failures.push(`${url.pathname}: missing HTML file`);
  } catch {
    failures.push(`${url.pathname}: missing HTML file`);
    continue;
  }
  const html = await readFile(file, "utf8");
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="(.*?)">/)?.[1];
  const description = html.match(/<meta name="description" content="(.*?)">/)?.[1];
  const robots = html.match(/<meta name="robots" content="(.*?)">/)?.[1];
  if (!title || title.length < 20 || title.length > 75) failures.push(`${url.pathname}: invalid title`);
  if (!description || description.length < 70 || description.length > 170) failures.push(`${url.pathname}: invalid description`);
  if (canonical !== url.href) failures.push(`${url.pathname}: canonical mismatch (${canonical})`);
  if (canonicals.has(canonical)) failures.push(`${url.pathname}: duplicate canonical`);
  canonicals.add(canonical);
  if (!robots?.includes("index") || robots.includes("noindex") || !robots.includes("follow")) failures.push(`${url.pathname}: sitemap page is not index,follow`);
  if (!/<h1[ >]/.test(html)) failures.push(`${url.pathname}: missing H1`);
  if (!/<script type="application\/ld\+json">/.test(html)) failures.push(`${url.pathname}: missing JSON-LD`);
  if (html.includes("calendly.com/ahmadbukhari4245")) failures.push(`${url.pathname}: stale booking URL`);
  if (html.includes("github.com/bukhariahmad")) failures.push(`${url.pathname}: stale GitHub URL`);
  if (html.includes("hello@ahmadbukhari.com")) failures.push(`${url.pathname}: unverified email address`);
  if (/"(?:aggregateRating|review|ratingValue|reviewCount)"/.test(html)) failures.push(`${url.pathname}: unsupported review or rating schema`);
}

const required = ["robots.txt", "sitemap.xml", "llms.txt", "feed.xml", "404.html", "site.css", "experience.js", "visual-journey.js", "twin-widget.js", "twin-avatar.svg", "images/ahmad-cafe.jpg"];
for (const file of required) {
  try { await stat(resolve(dist, file)); } catch { failures.push(`Missing ${file}`); }
}

const home = await readFile(resolve(dist, "index.html"), "utf8");
for (const marker of ["digital gravity", "intelligence-field", "cosmos-stage", "matter-stage", "brain-stage", "network-stage", "compute-stage", "Selected systems", "Automation lab", "/twin-widget.js?v=8", "data-visual-renderer=\"journey-shapes-v2\""]) {
  if (!home.includes(marker)) failures.push(`Homepage redesign marker missing: ${marker}`);
}

const css = await readFile(resolve(dist, "site.css"), "utf8");
for (const marker of [".site-loader", ".ab-logo", ".brand-name", ".field-shell[data-stage=\"2\"].field-rendered #intelligence-field", ".atom-orbit"]) {
  if (!css.includes(marker)) failures.push(`Current production CSS marker missing: ${marker}`);
}

const experience = await readFile(resolve(dist, "experience.js"), "utf8");
const visualJourney = await readFile(resolve(dist, "visual-journey.js"), "utf8");
const journeyScriptIndex = home.indexOf('<script defer src="/visual-journey.js"></script>');
const experienceScriptIndex = home.indexOf('<script defer src="/experience.js"></script>');
for (const marker of ["function setJourneyRendererActive", "setJourneyRendererActive(h)", "setJourneyRendererInactive(e)", 'var JOURNEY_RENDERER_EVENT="ab:journey-renderer-state"', "new CustomEvent(JOURNEY_RENDERER_EVENT", "announceJourneyRendererState(t)"]) {
  if (!visualJourney.includes(marker)) failures.push(`Journey renderer health marker missing: ${marker}`);
}
for (const marker of ['var JOURNEY_RENDERER_EVENT = "ab:journey-renderer-state"', "addEventListener(JOURNEY_RENDERER_EVENT, onJourneyRendererStateChange)", 'legacyJourneyRendererState !== "idle" || legacyJourneyRendererTimer', 'handoff && handoff.reason === "CONTEXT LOST"', "canvas.cloneNode(false)", "canvas.parentNode.replaceChild(replacementCanvas, canvas)", 'legacyJourneyRendererState = "active"']) {
  if (!experience.includes(marker)) failures.push(`Legacy renderer runtime handoff marker missing: ${marker}`);
}
if (!experience.includes("owner.active === true")) failures.push("Legacy renderer active ownership guard missing");
if (!experience.includes('owner.state === "ready" || owner.state === "active"')) failures.push("Legacy renderer readiness guard missing");
if (journeyScriptIndex < 0 || experienceScriptIndex < 0 || journeyScriptIndex > experienceScriptIndex) failures.push("Journey renderer must load before the guarded experience script");
if ((home.match(/\/images\/ahmad-cafe\.jpg/g) || []).length !== 2) failures.push("Vendored Ahmad portrait source is not present in both portrait placements");
if ((home.match(/width="778" height="1000"/g) || []).length < 2) failures.push("Vendored Ahmad portrait intrinsic dimensions are missing");
if (home.includes("ahmad-fable5.vercel.app")) failures.push("Homepage still depends on the external portrait host");
if (/(cosmos-hero|brain-profile)\.webp/.test(home)) failures.push("Homepage still references uncopied journey media");

for (const directory of ["blog", "portfolio"]) {
  const files = await readdir(resolve(dist, directory));
  for (const name of files.filter((file) => file.endsWith(".html"))) {
    if (directory === "blog" && name === "how-to-choose-an-ai-automation-agency.html") continue;
    const html = await readFile(resolve(dist, directory, name), "utf8");
    const canonical = html.match(/<link rel="canonical" href="(.*?)">/)?.[1];
    const robots = html.match(/<meta name="robots" content="(.*?)">/)?.[1];
    if (!robots?.startsWith("noindex")) failures.push(`/${directory}/${name}: legacy record must be noindex,follow`);
    if (canonical && sitemapHrefs.has(canonical)) failures.push(`/${directory}/${name}: noindex record appears in sitemap`);
  }
}

const guidePath = "/blog/how-to-choose-an-ai-automation-agency";
const guideUrl = `https://ahmadbukhari.com${guidePath}`;
const guide = await readFile(resolve(dist, `${guidePath.slice(1)}.html`), "utf8");
if (!sitemapHrefs.has(guideUrl)) failures.push("Current buyer guide missing from sitemap");
if (!guide.includes('<meta property="og:type" content="article">')) failures.push("Current buyer guide missing article Open Graph type");
const guideSchema = JSON.parse(guide.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
const guideTypes = (guideSchema["@graph"] || []).map((node) => node["@type"]);
if (guideTypes.filter((type) => type === "Article").length !== 1 || !guideTypes.includes("WebPage")) failures.push("Current buyer guide must expose one Article and one WebPage entity");

const feed = await readFile(resolve(dist, "feed.xml"), "utf8");
if ((feed.match(/<item>/g) || []).length !== 1 || !feed.includes(guideUrl)) failures.push("RSS feed must contain only the current buyer guide");

const notFound = await readFile(resolve(dist, "404.html"), "utf8");
if (!notFound.includes('<meta name="robots" content="noindex,follow">')) failures.push("404 page must be noindex,follow");
if (/rel="canonical"|property="og:url"|application\/ld\+json/.test(notFound)) failures.push("404 page must not claim homepage canonical, Open Graph URL, or schema identity");

const vercel = await readFile(resolve(root, "vercel.json"), "utf8");
if (!vercel.includes('microphone=(self)')) failures.push("Permissions Policy must allow the first-party voice widget microphone");
if (!vercel.includes('https://aixcelsolutions.com/contact#engagement')) failures.push("Pricing redirect does not target the canonical Aixcel engagement section");

const indexNowKey = await readFile(resolve(dist, "9f9c7c3379d04c07b68984d92f986969.txt"), "utf8");
if (indexNowKey !== "9f9c7c3379d04c07b68984d92f986969") failures.push("IndexNow key file is not exact");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`SEO build validated: ${urls.length} indexable canonical pages; legacy claims are excluded; discovery, visual, voice, schema, and entity checks passed.`);
