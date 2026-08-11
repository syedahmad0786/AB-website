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
const verifiedBookingUrl = "https://cal.com/ahmad-bukhari/revenue-handoff-map";

function mainVisibleWordCount(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] || "";
  return main
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

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
  const renderedTitle = title?.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'") || "";
  if (renderedTitle.length > 60) failures.push(`${url.pathname}: title exceeds 60 rendered characters`);
  if (!description || description.length < 70 || description.length > 158) failures.push(`${url.pathname}: invalid description`);
  if (canonical !== url.href) failures.push(`${url.pathname}: canonical mismatch (${canonical})`);
  if (canonicals.has(canonical)) failures.push(`${url.pathname}: duplicate canonical`);
  canonicals.add(canonical);
  if (!robots?.includes("index") || robots.includes("noindex") || !robots.includes("follow")) failures.push(`${url.pathname}: sitemap page is not index,follow`);
  if (!/<h1[ >]/.test(html)) failures.push(`${url.pathname}: missing H1`);
  if (!/<script type="application\/ld\+json">/.test(html)) failures.push(`${url.pathname}: missing JSON-LD`);
  if (!html.includes('id="theme-toggle"') || !html.includes('src="/theme.js"')) failures.push(`${url.pathname}: shared theme controls are missing`);
  if ((html.match(/src="\/analytics\.js"/g) || []).length !== 1) failures.push(`${url.pathname}: expected exactly one shared analytics loader`);
  if (!html.includes('aixcel-color-theme') || !html.includes('document.documentElement.dataset.theme')) failures.push(`${url.pathname}: early theme initialization is missing`);
  if (html.includes("calendly.com/ahmadbukhari4245")) failures.push(`${url.pathname}: stale booking URL`);
  const bookingAnchors = [...html.matchAll(/<a\b[^>]*href="https:\/\/cal\.com\/ahmad-bukhari\/revenue-handoff-map"[^>]*>/g)].map(match => match[0]);
  if (!bookingAnchors.length) failures.push(`${url.pathname}: verified booking CTA is missing`);
  for (const anchor of bookingAnchors) {
    if (!anchor.includes("data-cal-trigger") || !anchor.includes('data-cal-link="ahmad-bukhari/revenue-handoff-map"') || !anchor.includes('data-cal-namespace="revenue-handoff-map"')) failures.push(`${url.pathname}: booking CTA cannot emit a first-party success event`);
    if (/\starget=(?:"_blank"|'_blank')/.test(anchor)) failures.push(`${url.pathname}: embedded booking CTA opens a duplicate browser context`);
  }
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
const linkedinSystems = ["creator-campaign-command", "marketing-revenue-assurance", "deal-rescue-forecast-truth", "creative-learning-os", "language-mix-studio", "agentic-systems-evaluation-lab", "content-performance-forecaster", "revenue-signal-graph", "creator-talent-campaign-os", "agentic-systems-gateway"];
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
  ...linkedinSystems.flatMap((name) => [
    `art/linkedin/${name}.png`,
    `art/linkedin/${name}.svg`,
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
const builtIndex = await readFile(resolve(dist, "index.html"), "utf8");
const siteCssRefs = [...builtIndex.matchAll(/\/(site\.[a-f0-9]{12}\.css)/g)].map((match) => match[1]);
const siteCssFilename = siteCssRefs[0] || "";
if (siteCssRefs.length !== 2 || new Set(siteCssRefs).size !== 1) failures.push("Homepage must preload and load one matching content-hashed site stylesheet");
const required = ["robots.txt", "sitemap.xml", "llms.txt", "feed.xml", "404.html", ...(siteCssFilename ? [siteCssFilename] : []), "experience.js", "decision-engine.js", "theme.js", "analytics.js", "site.webmanifest", "favicon.svg", "aixcel-signal-icon-512.svg", "twin-widget.js", "twin-avatar.svg", "images/ahmad-cafe.jpg", ...requiredArtwork, ...requiredBrand, ...requiredFonts];
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
  ["aixcel-signal-icon-512.svg", "14c5dacce5a964a44c9ea6f281d99000544dc1a51f4e38919ff011a6821c2202"],
]) {
  const digest = createHash("sha256").update((await readFile(resolve(dist, file), "utf8")).replaceAll("\r\n", "\n")).digest("hex");
  if (digest !== expectedHash) failures.push(`${file}: official AB Axis asset hash changed`);
}

const builtFiles = await listAssetFiles(dist);
const htmlFiles = builtFiles.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = await readFile(resolve(dist, file), "utf8");
  if (html.includes("ai-consultancy-call-with-ab")) failures.push(`${file}: retired Cal.com booking slug must not ship`);
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

const home = builtIndex;
if (!home.includes(`href="${verifiedBookingUrl}"`)) failures.push("Homepage must link to the verified live Cal.com event");
const analytics = await readFile(resolve(dist, "analytics.js"), "utf8");
if ((analytics.match(/G-W66WJJKGWQ/g) || []).length !== 1) failures.push("Analytics must use the Measurement ID from the existing Ahmad Bukhari Profile web stream");
if (!analytics.includes("googletagmanager.com/gtag/js") || !analytics.includes('send_page_view: true')) failures.push("GA4 page-view initialization is incomplete");
if (!analytics.includes('record("discovery_call_click"') || !analytics.includes('record("contact_email_click"')) failures.push("Truthful contact-intent analytics events are missing");
if (/generate_lead/.test(analytics)) failures.push("Analytics must not claim a generic lead without a verified success state");
if (!analytics.includes('action: "bookingSuccessfulV2"') || !analytics.includes('record("booking_created"') || !analytics.includes('record("booking_confirmed"')) failures.push("Cal.com booking-success measurement is incomplete");
if (!analytics.includes('["accepted", "confirmed"].includes(bookingStatus)')) failures.push("Booking confirmation must remain gated by Cal.com's accepted or confirmed status");
const defaultOgUrl = "https://ahmadbukhari.com/art/ahmadbukhari-default-og-1200x630.png";
if (!home.includes(`<meta property="og:image" content="${defaultOgUrl}">`)) failures.push("Homepage default Open Graph PNG is missing");
if (!home.includes(`<meta name="twitter:image" content="${defaultOgUrl}">`)) failures.push("Homepage default Twitter image PNG is missing");
if (home.includes("/images/og-default.webp") || home.includes("/og.jpg")) failures.push("Homepage still references a superseded default share image");
for (const marker of ["digital gravity", "The Decision Engine", "Your AI can answer.", "A real system opens", "Capability becomes", "Action leaves.", "Selected systems", "Automation lab", "/twin-widget.js?v=9", "data-visual-renderer=\"decision-engine-cinema-v2\""]) {
  if (!home.includes(marker)) failures.push(`Homepage redesign marker missing: ${marker}`);
}
if ((home.match(/data-cinema-copy="/g) || []).length !== 5) failures.push("Homepage must contain five semantic cinematic beats");
if ((home.match(/data-cinema-layer="/g) || []).length !== 6) failures.push("Homepage must contain six Decision Engine visual layers");
if ((home.match(/class="project-art project-art-image"/g) || []).length !== 6) failures.push("Homepage must contain six System Story artworks");
if ((home.match(/<article class="research-card/g) || []).length !== 2) failures.push("Homepage must contain two current research cards");
if (!home.includes('datetime="2026-07-23"') || !home.includes("openai-presence-enterprise-ai-agent-rollout")) failures.push("Homepage latest research card must expose its publication date and canonical URL");
if ((home.match(/<img\b[^>]*fetchpriority="high"[^>]*>/g) || []).length !== 1) failures.push("Homepage must have exactly one high-priority artwork image");
if (!home.includes('<img class="ab-axis" src="/brand/ahmad-ab-axis.svg" alt="" width="96" height="96">')) failures.push("Homepage header does not use the official AB Axis SVG");
if (!home.includes('<link rel="icon" href="/brand/ahmad-ab-axis-favicon.svg?v=20260723" type="image/svg+xml" sizes="any">')) failures.push("Homepage does not use the cache-busting official AB Axis favicon path");
if (!home.includes('<link rel="icon" href="/brand/ahmad-ab-axis-favicon-32.png?v=20260723" type="image/png" sizes="32x32">')) failures.push("Homepage 32px AB Axis favicon fallback is missing");
if (!home.includes('<link rel="manifest" href="/site.webmanifest">')) failures.push("Homepage web manifest link is missing");
if (/ab-logo-orbit|class="ab-logo|class="gravity-mark/.test(home)) failures.push("Homepage still contains a retired logo implementation");

const agenticSystemsPage = await readFile(resolve(dist, "agentic-systems.html"), "utf8");
if ((agenticSystemsPage.match(/class="system-card-art"/g) || []).length !== 10) failures.push("Agentic systems library must contain ten verified project cards");
for (const marker of ["Creator &amp; Talent Campaign OS", "creator-talent-campaign-os.vercel.app", "70 tests", "85.38 percent coverage", "PostgreSQL checkpoint restart proof", "Ten flagship systems"]) {
  if (!agenticSystemsPage.includes(marker)) failures.push(`Creator & Talent Campaign OS library evidence is missing: ${marker}`);
}
for (const marker of ["Agentic Systems Gateway", "agentic-systems-gateway.vercel.app", "85 tests", "40 production Postman assertions", "0 production 5xx"]) {
  if (!agenticSystemsPage.includes(marker)) failures.push(`Agentic Systems Gateway library evidence is missing: ${marker}`);
}

const homeSchema = JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
const homeProfiles = (homeSchema["@graph"] || []).filter((node) => node["@type"] === "ProfilePage");
if (homeProfiles.length !== 1 || homeProfiles[0]?.mainEntity?.["@id"] !== "https://ahmadbukhari.com/#person") failures.push("Homepage must expose exactly one ProfilePage with Ahmad as its main entity");
const aixcelOrganization = (homeSchema["@graph"] || []).find((node) => Array.isArray(node["@type"]) && node["@type"].includes("Organization"));
if (aixcelOrganization?.name !== "Aixcel Solutions" || aixcelOrganization?.logo?.url !== "https://ahmadbukhari.com/aixcel-signal-icon-512.svg" || aixcelOrganization?.logo?.width !== 512 || aixcelOrganization?.logo?.height !== 512) failures.push("Aixcel Organization schema must expose the approved 512px signal logo");
if ((homeSchema["@graph"] || []).some((node) => node["@type"] === "BreadcrumbList")) failures.push("Homepage must not publish a one-item BreadcrumbList");
const homeDescription = home.match(/<meta name="description" content="(.*?)">/)?.[1] || "";
if (homeDescription.length > 158) failures.push("Homepage description must stay within the Searchable baseline recommendation");
if (!homeDescription.includes("resilient automation") || !homeDescription.includes("controlled decisions and evidence")) failures.push("Homepage description must align with visible operating-system positioning");
const about = await readFile(resolve(dist, "about.html"), "utf8");
const aboutSchema = JSON.parse(about.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
const aboutProfile = (aboutSchema["@graph"] || []).find((node) => node["@type"] === "ProfilePage");
if (aboutProfile?.mainEntity?.["@id"] !== "https://ahmadbukhari.com/#person") failures.push("About ProfilePage must declare Ahmad as its main entity");
if (!(aboutSchema["@graph"] || []).some((node) => node["@type"] === "BreadcrumbList")) failures.push("About page must expose BreadcrumbList schema");

for (const path of [
  "services/ai-systems-architecture",
  "services/ai-automation-consulting",
  "services/agentic-ai-autonomous-workflows",
  "services/voice-ai-conversational-intelligence",
  "services/gohighlevel-crm-automation",
  "services/ai-sdr-outbound-automation",
  "services/content-generation-automation",
  "industries/online-coaches",
  "industries/marketing-agencies",
]) {
  const html = await readFile(resolve(dist, `${path}.html`), "utf8");
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
  const graph = schema["@graph"] || [];
  const service = graph.find((node) => node["@type"] === "Service");
  const faq = graph.find((node) => node["@type"] === "FAQPage");
  const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
  if (service?.provider?.["@id"] !== "https://ahmadbukhari.com/#person" || service?.areaServed !== "Worldwide") failures.push(`/${path}: Service schema provider or area served is missing`);
  if (!faq || (faq.mainEntity || []).length < 3) failures.push(`/${path}: FAQPage schema is missing or too thin`);
  if (!breadcrumb || (breadcrumb.itemListElement || []).length < 3) failures.push(`/${path}: BreadcrumbList schema is incomplete`);
  if ((html.match(/class="faq-item"/g) || []).length !== (faq?.mainEntity || []).length) failures.push(`/${path}: visible FAQs do not match FAQPage schema`);
  const visibleWords = mainVisibleWordCount(html);
  if (visibleWords < 300) failures.push(`/${path}: rendered static content remains below 300 words`);
  if (path.startsWith("industries/") && visibleWords < 500) failures.push(`/${path}: industry operating guidance remains below 500 main-content words`);
  if (path.startsWith("industries/") && (!html.includes("Operating risks and controls") || !html.includes("Industry workflow controls") || !html.includes("What should remain human?"))) failures.push(`/${path}: industry risk, control, and human-boundary guidance is incomplete`);
}
for (const [path, markers] of Object.entries({
  "services/ai-systems-architecture": ["Automation governance framework for inspectable AI decisions", "Inspectable decision controls", "NIST AI Risk Management Framework"],
  "services/gohighlevel-crm-automation": ["CRM operations architecture that survives peak demand", "CRM operating controls", "Peak-hour verification"],
})) {
  const html = await readFile(resolve(dist, `${path}.html`), "utf8");
  for (const marker of markers) if (!html.includes(marker)) failures.push(`/${path}: zero-visibility topic marker missing: ${marker}`);
  if ((html.match(/<table>/g) || []).length !== 1) failures.push(`/${path}: topic guide must expose one semantic control table`);
}

for (const [path, minimumWords] of [
  ["work", 600],
  ["automation-lab", 450],
  ["about", 400],
  ["contact", 300],
  ["services", 550],
  ["blog", 350],
  ["portfolio", 550],
]) {
  const html = await readFile(resolve(dist, `${path}.html`), "utf8");
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
  const graph = schema["@graph"] || [];
  const faq = graph.find((node) => node["@type"] === "FAQPage");
  const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
  const visibleFaqCount = (html.match(/class="faq-item"/g) || []).length;
  if (!faq || (faq.mainEntity || []).length !== 3 || visibleFaqCount !== 3) failures.push(`/${path}: three visible FAQs must match FAQPage schema`);
  if (!breadcrumb || (breadcrumb.itemListElement || []).length < 2) failures.push(`/${path}: BreadcrumbList schema is missing`);
  if (mainVisibleWordCount(html) < minimumWords) failures.push(`/${path}: answer-first content fell below ${minimumWords} words`);
}

const blogIndexHtml = await readFile(resolve(dist, "blog.html"), "utf8");
if (!blogIndexHtml.includes("AI research translated into business decisions") || !blogIndexHtml.includes('datetime="2026-07-23"')) failures.push("Research hub must identify the current dated publication");
if (!blogIndexHtml.includes("openai-presence-enterprise-ai-agent-rollout")) failures.push("Research hub must link to the canonical latest finding");
if (blogIndexHtml.includes("Archived field note") || blogIndexHtml.includes("View archived article")) failures.push("Research hub must not expose the legacy article wall");
if (home.includes("Research without the archive wall") || blogIndexHtml.includes("Publication policy") || blogIndexHtml.includes("Older drafts remain")) failures.push("Current research surfaces must not promote legacy archive material");
if (!blogIndexHtml.includes("TL;DR: research should change an operating decision") || !blogIndexHtml.includes("How findings are evaluated")) failures.push("Research hub must expose its answer-first editorial policy");
if (sitemapHrefs.has("https://ahmadbukhari.com/field-notes")) failures.push("Retired /field-notes teaser must not compete with the canonical /blog hub");

const servicesIndexHtml = await readFile(resolve(dist, "services.html"), "utf8");
if (!servicesIndexHtml.includes("How an engagement is scoped") || !servicesIndexHtml.includes("How pricing becomes transparent") || !servicesIndexHtml.includes("Engagement phases and decision gates")) failures.push("Services index must expose scope, pricing process, and decision gates without invented package prices");
if ((servicesIndexHtml.match(/<table>/g) || []).length !== 1) failures.push("Services index must expose one semantic engagement table");

const portfolioIndexHtml = await readFile(resolve(dist, "portfolio.html"), "utf8");
if (portfolioIndexHtml.includes("Archived project record 01") || !portfolioIndexHtml.includes("Automated Ad Analytics &amp; Reporting")) failures.push("Portfolio archive must use descriptive record headings without treating titles as verified results");

const css = await readFile(resolve(dist, siteCssFilename), "utf8");
for (const marker of [".site-loader", ".loader-axis", ".brand-name", ".decision-cinema", ".cinema-camera", ".cinema-layer-boundary", ".cinema-return", ".research-grid"]) {
  if (!css.includes(marker)) failures.push(`Current production CSS marker missing: ${marker}`);
}
if (!css.includes("z-index: 66") || !css.includes("height: 44px")) failures.push("Mobile menu close control must remain above the overlay with a 44px touch target");
if (!css.includes("@media (max-width: 900px)") || !css.includes("minmax(0, 1.2fr)")) failures.push("Tablet section and Decision Engine grids must remain shrinkable");
for (const retiredMarker of [".ab-logo", ".gravity-mark", ".ab-logo-orbit"]) {
  if (css.includes(retiredMarker)) failures.push(`Retired logo CSS is still present: ${retiredMarker}`);
}
if (css.includes("html:not(.js)")) failures.push("No-JS visibility rules must not flash before deferred scripts initialise");
if (!home.includes("<noscript><style data-nojs-fallback>") || !home.includes(".decision-cinema { height: auto") || !home.includes(".cinema-copy { position: relative") || !home.includes(".desktop-nav { grid-column: 1 / -1")) failures.push("No-JS content and mobile navigation fallback is missing");

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
for (const marker of ["data-cinema-story", "phaseStops", "positionLayer", "progressFromScroll", "prefers-reduced-motion", "navigator.connection", "requestAnimationFrame(tick)", "renderDecisionEngineFrame", "Pass / logged"]) {
  if (!decisionEngine.includes(marker)) failures.push(`Decision Engine runtime marker missing: ${marker}`);
}
if (!css.includes("height: 55svh") || !css.includes("height: 34svh")) failures.push("Decision Engine must reserve separate mobile bands for mechanism and copy");
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
  if (!html.includes(`<figcaption>${alt}</figcaption>`)) failures.push(`/work/${slug}: lead artwork must expose a matching caption`);
  if (mainVisibleWordCount(html) < 400) failures.push(`/work/${slug}: evidence-led case content fell below 400 words`);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
  const graph = schema["@graph"] || [];
  const faq = graph.find((node) => node["@type"] === "FAQPage");
  if (!faq || (faq.mainEntity || []).length !== 3 || (html.match(/class="faq-item"/g) || []).length !== 3) failures.push(`/work/${slug}: three visible case FAQs must match FAQPage schema`);
  if (graph.some((node) => node["@type"] === "Service")) failures.push(`/work/${slug}: case study must not use Service schema`);
}
for (const [slug, markers] of Object.entries({
  errorlens: ["How to classify and recover workflow errors", "Workflow error classes and safe recovery decisions", "OpenTelemetry observability primer"],
  "migration-factory": ["Why workflow migrations break after the tool switch", "Make and n8n migration questions—not a universal winner", "Parity before cutover"],
  "enterprise-os": ["What product delivery infrastructure actually controls", "Governance controls for product delivery", "NIST AI Risk Management Framework"],
})) {
  const html = await readFile(resolve(dist, `work/${slug}.html`), "utf8");
  for (const marker of markers) if (!html.includes(marker)) failures.push(`/work/${slug}: topic-guide marker missing: ${marker}`);
  if ((html.match(/<table>/g) || []).length !== 1) failures.push(`/work/${slug}: topic guide must expose one semantic comparison or control table`);
}
if (!decisionEngine.includes("reducedMotion.matches || saveData") || !decisionEngine.includes('story.classList.toggle("cinema-static", reducedMotion.matches || saveData)')) failures.push("Decision Engine must provide reduced-motion and Save Data fallbacks");

for (const directory of ["blog", "portfolio"]) {
  const files = await readdir(resolve(dist, directory));
  for (const name of files.filter((file) => file.endsWith(".html"))) {
    if (directory === "blog" && ["how-to-choose-an-ai-automation-agency.html", "automation-governance-inspectable-systems.html"].includes(name)) continue;
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
if (!guideTypes.includes("FAQPage") || !guideTypes.includes("BreadcrumbList")) failures.push("Current buyer guide must expose FAQPage and BreadcrumbList entities");
if (!guide.includes("TL;DR: choose controls and evidence over demo count") || (guide.match(/class="faq-item"/g) || []).length !== 3) failures.push("Current buyer guide must expose its TL;DR and three visible FAQs");
if (!guide.includes('class="guide-toc"') || !guide.includes("Delivery-model comparison") || (guide.match(/<table>/g) || []).length !== 1) failures.push("Current buyer guide must expose a linked contents list and one delivery-model comparison table");
for (const source of ["www.nist.gov/itl/ai-risk-management-framework", "opentelemetry.io/docs/concepts/observability-primer/", "help.make.com/error-handlers"]) {
  if (!guide.includes(source)) failures.push(`Current buyer guide primary reference missing: ${source}`);
}
const guideArticle = (guideSchema["@graph"] || []).find((node) => node["@type"] === "Article");
if (guideArticle?.image !== defaultOgUrl) failures.push("Current buyer guide Article schema must use the default Open Graph PNG");

const governancePath = "/blog/automation-governance-inspectable-systems";
const governanceUrl = `https://ahmadbukhari.com${governancePath}`;
const governanceGuide = await readFile(resolve(dist, `${governancePath.slice(1)}.html`), "utf8");
const governanceTitle = "Automation Governance Guide | Ahmad Bukhari";
const governanceDescription = "Design governed CRM, AI, delivery, recovery, and workflow migration systems with explicit state, permissions, human gates, evidence, and rollback.";
if (!sitemapHrefs.has(governanceUrl)) failures.push("Automation governance guide missing from sitemap");
if (!governanceGuide.includes('<meta property="og:type" content="article">')) failures.push("Automation governance guide missing article Open Graph type");
if (!governanceGuide.includes(`<meta property="og:title" content="${governanceTitle}">`)) failures.push("Automation governance guide Open Graph title mismatch");
if (!governanceGuide.includes(`<meta property="og:description" content="${governanceDescription}">`)) failures.push("Automation governance guide Open Graph description mismatch");
const governanceSchema = JSON.parse(governanceGuide.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "{}");
const governanceGraph = governanceSchema["@graph"] || [];
const governanceTypes = governanceGraph.map((node) => node["@type"]);
const governanceArticles = governanceGraph.filter((node) => node["@type"] === "Article");
const governanceWebPages = governanceGraph.filter((node) => node["@type"] === "WebPage");
const governanceFaq = governanceGraph.find((node) => node["@type"] === "FAQPage");
const governanceBreadcrumb = governanceGraph.find((node) => node["@type"] === "BreadcrumbList");
if (governanceArticles.length !== 1 || governanceWebPages.length !== 1) failures.push("Automation governance guide must expose exactly one Article and one WebPage entity");
if (!governanceFaq || !governanceBreadcrumb) failures.push("Automation governance guide must expose FAQPage and BreadcrumbList entities");
const governanceArticle = governanceArticles[0];
if (governanceArticle?.headline !== governanceTitle || governanceArticle?.datePublished !== "2026-08-11" || !governanceArticle?.author) failures.push("Automation governance guide Article schema metadata mismatch");
const governanceFaqQuestions = governanceFaq?.mainEntity?.map((item) => item?.name) || [];
for (const question of ["What is automation governance?", "Who owns an automated failure?", "Is this guide evidence of a client result?"]) {
  if (!governanceFaqQuestions.includes(question)) failures.push(`Automation governance guide FAQ schema question missing: ${question}`);
}
if (governanceFaqQuestions.length !== 3) failures.push("Automation governance guide FAQ schema must expose exactly three questions");
if ((governanceBreadcrumb?.itemListElement || []).length < 3) failures.push("Automation governance guide breadcrumb schema is incomplete");
if (!governanceGuide.includes("TL;DR: govern the state change, not just the model") || (governanceGuide.match(/class="faq-item"/g) || []).length !== 3) failures.push("Automation governance guide must expose its TL;DR and three visible FAQs");
if (!governanceGuide.includes('class="guide-toc"') || !governanceGuide.includes("Governance control map") || (governanceGuide.match(/<table>/g) || []).length !== 1) failures.push("Automation governance guide must expose a linked contents list and one control map");
for (const path of ["/services/gohighlevel-crm-automation", "/work/enterprise-os", "/work/errorlens", "/work/migration-factory", "/automation-lab"]) {
  if (!governanceGuide.includes(`href="${path}"`)) failures.push(`Automation governance guide internal evidence link missing: ${path}`);
}
for (const source of ["www.nist.gov/itl/ai-risk-management-framework", "opentelemetry.io/docs/concepts/observability-primer/", "help.make.com/error-handlers"]) {
  if (!governanceGuide.includes(source)) failures.push(`Automation governance guide primary reference missing: ${source}`);
}
const governanceEvidenceBoundary = "this is a practitioner framework supported by public architecture examples and primary references. It is not an attributable client result and does not claim adoption, ROI, savings, revenue, satisfaction, or comparative superiority.";
const governanceArticleBody = governanceGuide.match(/<article class="content-shell article-body">([\s\S]*?)<\/article>/)?.[1] || "";
const governanceClaimsBody = governanceArticleBody.replace(governanceEvidenceBoundary, "");
const unsupportedGovernanceClaim = /\b(?:clients?|customers?)\s+(?:saved|increased|improved|reduced|grew|achieved|reported)\b|\b(?:proven|guaranteed)\s+(?:roi|results?|outcomes?)\b|\b(?:fixed|transparent|standard)\s+(?:price|pricing|package)\b|\b(?:best-in-class|industry-leading|outperforms?|superior to)\b|\b\d+(?:\.\d+)?%\b|\b(?:testimonials?|client logos?)\b|\b(?:adopted by|used by)\b/i;
if (!governanceGuide.includes(governanceEvidenceBoundary) || unsupportedGovernanceClaim.test(governanceClaimsBody)) failures.push("Automation governance guide evidence boundary is incomplete or contains an unsupported outcome, pricing, adoption, or superiority claim");
if (governanceArticle?.image !== defaultOgUrl) failures.push("Automation governance guide Article schema must use the default Open Graph PNG");

const feed = await readFile(resolve(dist, "feed.xml"), "utf8");
if ((feed.match(/<item>/g) || []).length !== 3 || !feed.includes(governanceUrl) || !feed.includes(guideUrl) || !feed.includes("openai-presence-enterprise-ai-agent-rollout")) failures.push("RSS feed must contain all three current dated publications");
const firstFeedItem = feed.match(/<item>([\s\S]*?)<\/item>/)?.[1] || "";
const governanceFeedDate = new Date("2026-08-11T00:00:00Z").toUTCString();
if (!firstFeedItem.includes(`<link>${governanceUrl}</link>`) || !firstFeedItem.includes(`<guid>${governanceUrl}</guid>`) || !firstFeedItem.includes(`<pubDate>${governanceFeedDate}</pubDate>`)) failures.push("Automation governance guide must be the first RSS item with its canonical URL and fixed publication date");

const llmsText = await readFile(resolve(dist, "llms.txt"), "utf8");
if (!llmsText.startsWith("# Ahmad Bukhari\n")) failures.push("llms.txt must begin with the canonical publisher H1");
if ((llmsText.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) || []).length < 10) failures.push("llms.txt must expose canonical resources as Markdown links");
for (const marker of ["## Canonical entities", "## Preferred pages to cite", "## Areas of expertise", "## Evidence and citation policy", "## Discovery"]) {
  if (!llmsText.includes(marker)) failures.push(`llms.txt section missing: ${marker}`);
}
for (const path of ["/services/ai-systems-architecture", "/services/gohighlevel-crm-automation", "/work/errorlens", "/work/migration-factory", "/work/enterprise-os", "/blog/automation-governance-inspectable-systems"]) {
  if (!llmsText.includes(`https://ahmadbukhari.com${path}`)) failures.push(`llms.txt zero-visibility topic link missing: ${path}`);
}

const notFound = await readFile(resolve(dist, "404.html"), "utf8");
if (!notFound.includes('<meta name="robots" content="noindex,follow">')) failures.push("404 page must be noindex,follow");
if (/rel="canonical"|property="og:url"|application\/ld\+json/.test(notFound)) failures.push("404 page must not claim homepage canonical, Open Graph URL, or schema identity");
if (/rel="preload" as="image" href="\/art\/hero\//.test(notFound)) failures.push("404 page must not preload homepage artwork");

const themeScript = await readFile(resolve(dist, "theme.js"), "utf8");
if (!themeScript.includes("localStorage.setItem") || !themeScript.includes("prefers-color-scheme: dark")) failures.push("Theme script must persist explicit choices and honor system preference");

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
