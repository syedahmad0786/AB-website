import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

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
  const heroPreloadCount = (html.match(/<link rel="preload" as="image" href="\/art\/hero\//g) || []).length;
  if (url.pathname === "/" && heroPreloadCount !== 2) failures.push("/: expected exactly two viewport-specific hero preloads");
  if (url.pathname !== "/" && heroPreloadCount !== 0) failures.push(`${url.pathname}: hero artwork must not be preloaded off the homepage`);
}

const scaleScenes = ["01-the-field", "02-the-atom", "03-memory", "04-emergence", "05-orchestration"];
const systemStories = ["workspine", "manhaj", "enterprise-os", "errorlens", "make-n8n-factory", "resilient-onboarding"];
const fieldNotes = ["designing-systems-that-fail-safely", "workflow-count-is-a-weak-metric", "operators-advantage-in-ai"];
const requiredArtwork = [
  "art/ahmadbukhari-default-og-1200x630.png",
  ...["field-grid", "paper-grain", "portrait-axis-frame", "signal-route-divider"].map((name) => `art/backgrounds/${name}.svg`),
  ...["decision-field-desktop-1280x720", "decision-field-desktop-1600x900", "decision-field-desktop-1920x1080", "decision-field-mobile-800x1000", "decision-field-mobile-1080x1350"].map((name) => `art/hero/${name}.webp`),
  ...scaleScenes.flatMap((name) => [
    `art/scale/${name}-800x450.webp`,
    `art/scale/${name}-1280x720.webp`,
    `art/scale/${name}-1600x900.webp`,
    `art/scale/${name}-mobile-800x1000.webp`,
  ]),
  ...systemStories.flatMap((name) => [
    `art/systems/${name}-800x500.webp`,
    `art/systems/${name}-1200x750.webp`,
  ]),
  ...fieldNotes.flatMap((name) => [
    `art/field-notes/${name}-800x500.webp`,
    `art/field-notes/${name}-1200x750.webp`,
  ]),
];
const requiredBrand = [
  "brand/ahmad-ab-axis.svg",
  "brand/ahmad-ab-axis-dark.svg",
  "brand/ahmad-ab-axis-mono.svg",
  "brand/ahmad-ab-axis-favicon.svg",
  "brand/ahmad-ab-axis-avatar.svg",
  "brand/ahmad-ab-axis-favicon-32.png",
  "brand/ahmad-ab-axis-apple-touch-180.png",
  "brand/ahmad-ab-axis-avatar-400.png",
  "brand/ahmad-ab-axis-avatar-1024.png",
];
const requiredFonts = [
  "fonts/instrument-sans-latin-wght-normal.woff2",
  "fonts/instrument-sans-latin-wght-italic.woff2",
  "fonts/instrument-serif-latin-400-normal.woff2",
  "fonts/instrument-serif-latin-400-italic.woff2",
  "fonts/ibm-plex-mono-latin-400-normal.woff2",
  "fonts/ibm-plex-mono-latin-500-normal.woff2",
  "fonts/ibm-plex-mono-latin-600-normal.woff2",
  "fonts/instrument-sans-LICENSE",
  "fonts/instrument-serif-LICENSE",
  "fonts/ibm-plex-mono-LICENSE",
];
const required = ["robots.txt", "sitemap.xml", "llms.txt", "feed.xml", "404.html", "site.css", "experience.js", "decision-engine.js", "site.webmanifest", "favicon.svg", "twin-widget.js", "twin-avatar.svg", "images/ahmad-cafe.jpg", ...requiredArtwork, ...requiredBrand, ...requiredFonts];
for (const file of required) {
  try {
    const details = await stat(resolve(dist, file));
    if (!details.isFile() || details.size === 0) failures.push(`Invalid or empty ${file}`);
  } catch {
    failures.push(`Missing ${file}`);
  }
}

async function listAssetFiles(directory, prefix = "") {
  const files = [];
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await listAssetFiles(resolve(directory, entry.name), relative));
    else if (entry.isFile()) files.push(relative);
  }
  return files;
}

const forbiddenDesignAsset = /(?:^|[-/])(master|preview|gallery|contact-sheet)(?:[-.]|$)|\.(?:html|md|jpg)$/i;
for (const [label, directory, expectedFiles] of [
  ["public artwork", resolve(root, "public/art"), requiredArtwork.map((file) => file.slice("art/".length))],
  ["built artwork", resolve(dist, "art"), requiredArtwork.map((file) => file.slice("art/".length))],
  ["public brand", resolve(root, "public/brand"), requiredBrand.map((file) => file.slice("brand/".length))],
  ["built brand", resolve(dist, "brand"), requiredBrand.map((file) => file.slice("brand/".length))],
  ["public fonts", resolve(root, "public/fonts"), requiredFonts.map((file) => file.slice("fonts/".length))],
  ["built fonts", resolve(dist, "fonts"), requiredFonts.map((file) => file.slice("fonts/".length))],
]) {
  const actualFiles = await listAssetFiles(directory);
  const expectedSet = new Set(expectedFiles);
  const actualSet = new Set(actualFiles);
  for (const file of expectedSet) {
    if (!actualSet.has(file)) failures.push(`${label}: missing production asset ${file}`);
  }
  for (const file of actualSet) {
    if (forbiddenDesignAsset.test(file)) failures.push(`${label}: design/source asset must not ship: ${file}`);
    else if (!expectedSet.has(file)) failures.push(`${label}: unexpected asset must not ship: ${file}`);
  }
}

for (const [file, expectedHash] of [
  ["brand/ahmad-ab-axis.svg", "d5d7dcea7a4068bd6b4b29e58dee30521007fe0fc18f1edd080c979bb0402115"],
  ["brand/ahmad-ab-axis-favicon.svg", "76432e32a2871027c48c206a143cc62fd79cf8418c699ad1e312a7fede339c7a"],
  ["favicon.svg", "76432e32a2871027c48c206a143cc62fd79cf8418c699ad1e312a7fede339c7a"],
]) {
  const digest = createHash("sha256").update(await readFile(resolve(dist, file))).digest("hex");
  if (digest !== expectedHash) failures.push(`${file}: official AB Axis asset hash changed`);
}

const builtFiles = await listAssetFiles(dist);
const htmlFiles = builtFiles.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = await readFile(resolve(dist, file), "utf8");
  const localReferences = [];
  for (const match of html.matchAll(/\b(src|srcset)="([^"]+)"/g)) {
    const values = match[1] === "srcset" ? match[2].split(",").map((candidate) => candidate.trim().split(/\s+/)[0]) : [match[2]];
    localReferences.push(...values);
  }
  for (const match of html.matchAll(/<link\b[^>]*\brel="(?:icon|apple-touch-icon|manifest)"[^>]*\bhref="([^"]+)"[^>]*>/g)) {
    localReferences.push(match[1]);
  }
  for (const reference of localReferences.filter((value) => value.startsWith("/"))) {
    const pathname = reference.split(/[?#]/)[0];
    try {
      if (!(await stat(resolve(dist, pathname.slice(1)))).isFile()) failures.push(`${file}: local asset is not a file: ${pathname}`);
    } catch {
      failures.push(`${file}: missing local asset ${pathname}`);
    }
  }
  for (const tag of html.matchAll(/<img\b[^>]*\bsrc="\/art\/[^"]+"[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(tag[0])) failures.push(`${file}: artwork image is missing alt text`);
    if (!/\bwidth="\d+"/.test(tag[0]) || !/\bheight="\d+"/.test(tag[0])) failures.push(`${file}: artwork image is missing intrinsic dimensions`);
    if (!/\bdecoding="async"/.test(tag[0])) failures.push(`${file}: artwork image is missing async decoding`);
  }
}

const home = await readFile(resolve(dist, "index.html"), "utf8");
const defaultOgUrl = "https://ahmadbukhari.com/art/ahmadbukhari-default-og-1200x630.png";
if (!home.includes(`<meta property="og:image" content="${defaultOgUrl}">`)) failures.push("Homepage default Open Graph PNG is missing");
if (!home.includes(`<meta name="twitter:image" content="${defaultOgUrl}">`)) failures.push("Homepage default Twitter image PNG is missing");
if (home.includes("/images/og-default.webp") || home.includes("/og.jpg")) failures.push("Homepage still references a superseded default share image");
for (const marker of ["digital gravity", "The Decision Engine", "signal-stage", "context-stage", "decision-stage", "boundary-stage", "action-stage", "evidence-stage", "Selected systems", "Automation lab", "/twin-widget.js?v=9", "data-visual-renderer=\"decision-engine-v1\""]) {
  if (!home.includes(marker)) failures.push(`Homepage redesign marker missing: ${marker}`);
}
if ((home.match(/data-engine-step="/g) || []).length !== 6) failures.push("Homepage must contain six semantic Decision Engine steps");
if ((home.match(/data-engine-layer="/g) || []).length !== 6) failures.push("Homepage must contain six Decision Engine visual layers");
if ((home.match(/class="project-art project-art-image"/g) || []).length !== 6) failures.push("Homepage must contain six System Story artworks");
if ((home.match(/class="note-cover"/g) || []).length !== 3) failures.push("Homepage must contain three Field Note covers");
if ((home.match(/<img\b[^>]*fetchpriority="high"[^>]*>/g) || []).length !== 1) failures.push("Homepage must have exactly one high-priority artwork image");
if (!home.includes('<img class="ab-axis" src="/brand/ahmad-ab-axis.svg" alt="" width="96" height="96">')) failures.push("Homepage header does not use the official AB Axis SVG");
if (!home.includes('<link rel="icon" href="/brand/ahmad-ab-axis-favicon.svg" type="image/svg+xml" sizes="any">')) failures.push("Homepage does not use the cache-busting official AB Axis favicon path");
if (!home.includes('<link rel="icon" href="/brand/ahmad-ab-axis-favicon-32.png" type="image/png" sizes="32x32">')) failures.push("Homepage 32px AB Axis favicon fallback is missing");
if (!home.includes('<link rel="manifest" href="/site.webmanifest">')) failures.push("Homepage web manifest link is missing");
if (/ab-logo-orbit|class="ab-logo|class="gravity-mark/.test(home)) failures.push("Homepage still contains a retired logo implementation");

const homeSchema = JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
const homeProfiles = (homeSchema["@graph"] || []).filter((node) => node["@type"] === "ProfilePage");
if (homeProfiles.length !== 1 || homeProfiles[0]?.mainEntity?.["@id"] !== "https://ahmadbukhari.com/#person") failures.push("Homepage must expose exactly one ProfilePage with Ahmad as its main entity");
const about = await readFile(resolve(dist, "about.html"), "utf8");
const aboutSchema = JSON.parse(about.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
const aboutProfile = (aboutSchema["@graph"] || []).find((node) => node["@type"] === "ProfilePage");
if (aboutProfile?.mainEntity?.["@id"] !== "https://ahmadbukhari.com/#person") failures.push("About ProfilePage must declare Ahmad as its main entity");

const blogIndexHtml = await readFile(resolve(dist, "blog.html"), "utf8");
if ((blogIndexHtml.match(/class="note-cover"/g) || []).length !== 3) failures.push("Authoritative /blog hub must include all three Field Note covers");
if (sitemapHrefs.has("https://ahmadbukhari.com/field-notes")) failures.push("Retired /field-notes teaser must not compete with the canonical /blog hub");

const css = await readFile(resolve(dist, "site.css"), "utf8");
for (const marker of [".site-loader", ".loader-axis", ".brand-name", ".decision-engine-story", ".engine-layer-boundary", ".engine-output"]) {
  if (!css.includes(marker)) failures.push(`Current production CSS marker missing: ${marker}`);
}
for (const retiredMarker of [".ab-logo", ".gravity-mark", ".ab-logo-orbit"]) {
  if (css.includes(retiredMarker)) failures.push(`Retired logo CSS is still present: ${retiredMarker}`);
}
if (!css.includes("html:not(.js) .hero-line > span") || !css.includes("html:not(.js) .reveal")) failures.push("No-JS hero and content visibility fallback is missing");

const twinWidget = await readFile(resolve(dist, "twin-widget.js"), "utf8");
if (/showTeaser|setTimeout\(showTeaser|addEventListener\("scroll", onScroll/.test(twinWidget)) failures.push("AI twin must not auto-expand a teaser over page content");
if (!twinWidget.includes("pointer-events:none") || !twinWidget.includes(".tw-panel,.tw-launch-wrap{pointer-events:auto}")) failures.push("AI twin fixed root must not intercept the page outside its controls");
if (!twinWidget.includes("width:72px;height:72px")) failures.push("AI twin mobile launcher must remain compact");
if (!twinWidget.includes('root.classList.toggle("tw-launcher-offstage", window.scrollY > 160)')) failures.push("AI twin launcher must leave the viewport once a visitor starts reading");
for (const marker of ["Instrument Sans", "Instrument Serif", "IBM Plex Mono", "/fonts/instrument-sans-latin-wght-normal.woff2", "/art/backgrounds/paper-grain.svg"]) {
  if (!css.includes(marker)) failures.push(`AB artwork-system CSS marker missing: ${marker}`);
}
for (const reference of [...css.matchAll(/url\(["']?(\/[^"')]+)["']?\)/g)].map((match) => match[1])) {
  const pathname = reference.split(/[?#]/)[0];
  try {
    if (!(await stat(resolve(dist, pathname.slice(1)))).isFile()) failures.push(`site.css: local asset is not a file: ${pathname}`);
  } catch {
    failures.push(`site.css: missing local asset ${pathname}`);
  }
}

const experience = await readFile(resolve(dist, "experience.js"), "utf8");
const decisionEngine = await readFile(resolve(dist, "decision-engine.js"), "utf8");
const decisionEngineScriptIndex = home.indexOf('<script defer src="/decision-engine.js"></script>');
const experienceScriptIndex = home.indexOf('<script defer src="/experience.js"></script>');
for (const marker of ["data-engine-story", "expansionFrames", "positionLayer", "prefers-reduced-motion", "navigator.connection", "requestAnimationFrame(update)", "Pass / logged"]) {
  if (!decisionEngine.includes(marker)) failures.push(`Decision Engine runtime marker missing: ${marker}`);
}
if (!decisionEngine.includes("mobileStateAtAnchor")) failures.push("Decision Engine must align mobile state to the visible chapter copy");
if (!experience.includes('body.classList.add("visual-ready")')) failures.push("Experience runtime must release the branded loader after first render");
if (decisionEngineScriptIndex < 0 || experienceScriptIndex < 0 || decisionEngineScriptIndex > experienceScriptIndex) failures.push("Decision Engine must load before the general experience script");
if (home.includes("visual-journey.js") || home.includes("intelligence-field")) failures.push("Homepage still loads the retired WebGL journey");
if ((home.match(/\/images\/ahmad-cafe\.jpg/g) || []).length !== 2) failures.push("Vendored Ahmad portrait source is not present in both portrait placements");
if ((home.match(/width="778" height="1000"/g) || []).length < 2) failures.push("Vendored Ahmad portrait intrinsic dimensions are missing");
if (home.includes("ahmad-fable5.vercel.app")) failures.push("Homepage still depends on the external portrait host");
if (/(cosmos-hero|brain-profile)\.webp/.test(home)) failures.push("Homepage still references uncopied journey media");

const caseArtworkChecks = {
  workspine: ["workspine", "Workspine turns operational events into contextual memory and verified evidence."],
  manhaj: ["manhaj", "MANHAJ shows a governed path from build through a quality gate to verified release."],
  "enterprise-os": ["enterprise-os", "Enterprise OS connects observation, delivery, control, and shared state on one operating plane."],
  errorlens: ["errorlens", "ErrorLens classifies failures, retries safe cases, and escalates exceptions requiring judgment."],
  "migration-factory": ["make-n8n-factory", "A Make-to-n8n migration factory groups workflow inventory into reusable families and verifies parity."],
  onboarding: ["resilient-onboarding", "Resilient onboarding checkpoints intake, identity, provisioning, and confirmation with a recovery path."],
};
for (const [slug, [artwork, alt]] of Object.entries(caseArtworkChecks)) {
  const html = await readFile(resolve(dist, `work/${slug}.html`), "utf8");
  if (!html.includes('<figure class="case-system-art"><picture>')) failures.push(`/work/${slug}: semantic lead artwork is missing`);
  if (!html.includes(`/art/systems/${artwork}-800x500.webp`)) failures.push(`/work/${slug}: 800px artwork source is missing`);
  if (!html.includes(`/art/systems/${artwork}-1200x750.webp`)) failures.push(`/work/${slug}: 1200px artwork source is missing`);
  if (!html.includes('width="1200" height="750" loading="lazy" decoding="async"')) failures.push(`/work/${slug}: artwork dimensions or deferred-loading attributes are missing`);
  if (!html.includes(`alt="${alt}"`)) failures.push(`/work/${slug}: audited artwork alt text is missing`);
}
if (!decisionEngine.includes("reduceMotion.matches || saveData") || !decisionEngine.includes('story.classList.toggle("engine-static", staticMode)')) failures.push("Decision Engine must provide reduced-motion and Save Data fallbacks");

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
const guideArticle = (guideSchema["@graph"] || []).find((node) => node["@type"] === "Article");
if (guideArticle?.image !== defaultOgUrl) failures.push("Current buyer guide Article schema must use the default Open Graph PNG");

const feed = await readFile(resolve(dist, "feed.xml"), "utf8");
if ((feed.match(/<item>/g) || []).length !== 1 || !feed.includes(guideUrl)) failures.push("RSS feed must contain only the current buyer guide");

const llmsText = await readFile(resolve(dist, "llms.txt"), "utf8");
if (!llmsText.startsWith("# Ahmad Bukhari\n")) failures.push("llms.txt must begin with the canonical publisher H1");
if ((llmsText.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) || []).length < 10) failures.push("llms.txt must expose canonical resources as Markdown links");
for (const marker of ["## Canonical entities", "## Preferred pages to cite", "## Areas of expertise", "## Evidence and citation policy", "## Discovery"]) {
  if (!llmsText.includes(marker)) failures.push(`llms.txt section missing: ${marker}`);
}

const notFound = await readFile(resolve(dist, "404.html"), "utf8");
if (!notFound.includes('<meta name="robots" content="noindex,follow">')) failures.push("404 page must be noindex,follow");
if (/rel="canonical"|property="og:url"|application\/ld\+json/.test(notFound)) failures.push("404 page must not claim homepage canonical, Open Graph URL, or schema identity");
if (/rel="preload" as="image" href="\/art\/hero\//.test(notFound)) failures.push("404 page must not preload homepage artwork");

const vercel = await readFile(resolve(root, "vercel.json"), "utf8");
if (!vercel.includes('microphone=(self)')) failures.push("Permissions Policy must allow the first-party voice widget microphone");
if (!vercel.includes('https://aixcelsolutions.com/contact#engagement')) failures.push("Pricing redirect does not target the canonical Aixcel engagement section");
if (!vercel.includes('"source": "/field-notes", "destination": "/blog"')) failures.push("Retired /field-notes URL must redirect to the authoritative /blog hub");

const indexNowKey = await readFile(resolve(dist, "9f9c7c3379d04c07b68984d92f986969.txt"), "utf8");
if (indexNowKey !== "9f9c7c3379d04c07b68984d92f986969") failures.push("IndexNow key file is not exact");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`SEO build validated: ${urls.length} indexable canonical pages; legacy claims are excluded; discovery, visual, voice, schema, and entity checks passed.`);
