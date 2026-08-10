import { chromium } from "file:///C:/Users/ahmad/.agents/skills/gstack/node_modules/playwright/index.mjs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const drftRoot = path.resolve(
  process.env.DRFT_ROOT || path.join(root, "..", "deal-rescue-forecast-truth"),
);
const outputRoot = path.join(root, "public", "art", "linkedin");
const outputSvg = path.join(outputRoot, "deal-rescue-forecast-truth.svg");
const outputPng = path.join(outputRoot, "deal-rescue-forecast-truth.png");

const base64 = async (file) => (await readFile(file)).toString("base64");
const [
  screenshot,
  abMark,
  aixcelMark,
  instrumentSans,
  instrumentSerif,
  plexMono,
] = await Promise.all([
  base64(path.join(drftRoot, "media", "10-live-production-edited-risk.png")),
  base64(path.join(root, "public", "brand", "ahmad-ab-axis.svg")),
  base64(path.join(drftRoot, "public", "assets", "aixcel-node-mark.svg")),
  base64(path.join(root, "public", "fonts", "instrument-sans-latin-wght-normal.woff2")),
  base64(path.join(root, "public", "fonts", "instrument-serif-latin-400-italic.woff2")),
  base64(path.join(root, "public", "fonts", "ibm-plex-mono-latin-600-normal.woff2")),
]);

const technologies = [
  ["python", "Python"],
  ["fastapi", "FastAPI"],
  ["langgraph", "LangGraph"],
  ["postgresql", "Postgres"],
  ["opentelemetry", "OTel"],
];
const technologyMarks = Object.fromEntries(await Promise.all(technologies.map(async ([name]) => [
  name,
  await base64(path.join(drftRoot, "public", "assets", "tech", `${name}.svg`)),
])));

const techRow = technologies.map(([name, label], index) => {
  const x = 54 + (index * 194);
  return `<g transform="translate(${x} 1090)">
    <rect width="178" height="67" rx="4" fill="#F4EEE3"/>
    <image x="14" y="14" width="38" height="38" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${technologyMarks[name]}"/>
    <text x="62" y="40" class="tech">${label}</text>
  </g>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-labelledby="title desc">
  <title id="title">Deal Rescue and Forecast Truth project visual</title>
  <desc id="desc">A real live decision room compares seller confidence with buyer evidence, shows a forecast downgrade, and names the production verification stack.</desc>
  <defs>
    <style>
      @font-face { font-family: InstrumentSans; src: url(data:font/woff2;base64,${instrumentSans}) format('woff2'); font-weight: 100 900; }
      @font-face { font-family: InstrumentSerif; src: url(data:font/woff2;base64,${instrumentSerif}) format('woff2'); font-style: italic; }
      @font-face { font-family: PlexMono; src: url(data:font/woff2;base64,${plexMono}) format('woff2'); font-weight: 600; }
      .sans { font-family: InstrumentSans, Arial, sans-serif; }
      .serif { font-family: InstrumentSerif, Georgia, serif; font-style: italic; }
      .mono { font-family: PlexMono, Consolas, monospace; }
      .tech { fill: #11100E; font-family: InstrumentSans, Arial, sans-serif; font-size: 15px; font-weight: 760; }
    </style>
  </defs>
  <rect width="1080" height="1350" fill="#11100E"/>
  <rect x="0" y="0" width="16" height="1350" fill="#C8FF37"/>
  <rect x="730" y="0" width="350" height="410" fill="#502C52"/>

  <image x="54" y="46" width="58" height="58" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${abMark}"/>
  <text x="126" y="72" class="sans" fill="#F4EEE3" font-size="18" font-weight="760">AHMAD BUKHARI</text>
  <text x="126" y="96" class="mono" fill="#C8FF37" font-size="11">AGENTIC AI &amp; LLM SYSTEMS SPECIALIST</text>
  <rect x="850" y="43" width="176" height="64" rx="4" fill="#F4EEE3"/>
  <image x="865" y="51" width="46" height="46" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${aixcelMark}"/>
  <text x="922" y="76" class="sans" fill="#11100E" font-size="15" font-weight="790">AIXCEL</text>
  <text x="922" y="95" class="mono" fill="#502C52" font-size="9">SOLUTIONS</text>
  <line x1="54" y1="132" x2="1026" y2="132" stroke="#F4EEE3" opacity=".24"/>

  <text x="54" y="182" class="mono" fill="#C8FF37" font-size="15" letter-spacing="1.8">DEAL RESCUE + FORECAST TRUTH / 03</text>
  <text x="54" y="252" class="sans" fill="#F4EEE3" font-size="61" font-weight="790">
    <tspan x="54">Your CRM says commit.</tspan>
    <tspan x="54" dy="65">Does the </tspan><tspan class="serif" fill="#C8FF37">buyer?</tspan>
  </text>
  <text x="54" y="385" class="sans" fill="#F4EEE3" opacity=".72" font-size="22">
    <tspan x="54">Exact buyer evidence rebuilds forecast truth, drafts a rescue plan,</tspan>
    <tspan x="54" dy="30">and stops at a sales manager decision.</tspan>
  </text>

  <g transform="translate(54 434)">
    <rect width="302" height="52" fill="#F4EEE3"/>
    <text x="16" y="21" class="mono" fill="#502C52" font-size="10">SELLER FORECAST</text>
    <text x="16" y="42" class="sans" fill="#11100E" font-size="19" font-weight="800">COMMIT · 92%</text>
    <path d="M321 26H649" stroke="#C8FF37" stroke-width="2"/>
    <path d="M641 19L650 26L641 33" fill="none" stroke="#C8FF37" stroke-width="2"/>
    <rect x="670" width="302" height="52" fill="#C8FF37"/>
    <text x="686" y="21" class="mono" fill="#502C52" font-size="10">BUYER EVIDENCE</text>
    <text x="686" y="42" class="sans" fill="#11100E" font-size="19" font-weight="800">OMITTED · 0%</text>
  </g>

  <rect x="54" y="500" width="972" height="350" rx="10" fill="#080807" stroke="#C8FF37" stroke-width="2"/>
  <svg x="54" y="500" width="972" height="350" viewBox="0 650 1440 520" preserveAspectRatio="xMidYMid slice">
    <image x="0" y="0" width="1440" height="5899" href="data:image/png;base64,${screenshot}"/>
  </svg>
  <rect x="54" y="814" width="972" height="36" fill="#C8FF37"/>
  <text x="73" y="838" class="mono" fill="#11100E" font-size="12">REAL PRODUCTION SCREEN · SYNTHETIC BUSINESS DATA · ZERO EXTERNAL WRITES</text>

  <g transform="translate(54 895)">
    <text x="0" y="34" class="sans" fill="#F4EEE3" font-size="34" font-weight="820">12/12</text>
    <text x="0" y="59" class="mono" fill="#F4EEE3" opacity=".58" font-size="11">GOLDEN DEAL STATES</text>
    <line x1="207" y1="0" x2="207" y2="70" stroke="#F4EEE3" opacity=".18"/>
    <text x="241" y="34" class="sans" fill="#F4EEE3" font-size="34" font-weight="820">53</text>
    <text x="241" y="59" class="mono" fill="#F4EEE3" opacity=".58" font-size="11">AUTOMATED TESTS</text>
    <line x1="449" y1="0" x2="449" y2="70" stroke="#F4EEE3" opacity=".18"/>
    <text x="483" y="34" class="sans" fill="#F4EEE3" font-size="34" font-weight="820">83.97%</text>
    <text x="483" y="59" class="mono" fill="#F4EEE3" opacity=".58" font-size="11">MEASURED COVERAGE</text>
    <line x1="733" y1="0" x2="733" y2="70" stroke="#F4EEE3" opacity=".18"/>
    <text x="767" y="34" class="sans" fill="#C8FF37" font-size="34" font-weight="820">0</text>
    <text x="767" y="59" class="mono" fill="#F4EEE3" opacity=".58" font-size="11">AUTOMATIC MUTATIONS</text>
  </g>

  <text x="54" y="1034" class="mono" fill="#C8FF37" font-size="12" letter-spacing="1.2">VERIFIED RUNTIME</text>
  ${techRow}
  <text x="54" y="1198" class="mono" fill="#F4EEE3" opacity=".66" font-size="11">REST · OPENAPI · POSTMAN · DOCKER · GITHUB ACTIONS · SIGNED RECEIPTS</text>
  <line x1="54" y1="1238" x2="1026" y2="1238" stroke="#F4EEE3" opacity=".24"/>
  <text x="54" y="1281" class="sans" fill="#F4EEE3" font-size="16" font-weight="700">Published by Ahmad Bukhari. Built and verified by AiXCEL Solutions.</text>
  <text x="54" y="1317" class="mono" fill="#C8FF37" font-size="14">deal-rescue-forecast-truth.vercel.app</text>
</svg>`;

await writeFile(outputSvg, svg, "utf8");

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(outputSvg).href, { waitUntil: "load" });
  const proof = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    missingImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).length,
  }));
  if (proof.width !== 1080 || proof.height !== 1350 || proof.missingImages !== 0) {
    throw new Error(`Deal Rescue project card did not render cleanly: ${JSON.stringify(proof)}`);
  }
  await page.screenshot({ path: outputPng, clip: { x: 0, y: 0, width: 1080, height: 1350 }, type: "png" });
} finally {
  await browser.close();
}

process.stdout.write(`Rendered ${outputSvg} and ${outputPng}\n`);
