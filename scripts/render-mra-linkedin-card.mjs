import { chromium } from "file:///C:/Users/ahmad/.agents/skills/gstack/node_modules/playwright/index.mjs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const mraRoot = path.resolve(process.env.MRA_ROOT || path.join(root, "..", "marketing-revenue-assurance"));
const outputRoot = path.join(root, "public", "art", "linkedin");
const outputSvg = path.join(outputRoot, "marketing-revenue-assurance.svg");
const outputPng = path.join(outputRoot, "marketing-revenue-assurance.png");

const base64 = async (file) => (await readFile(file)).toString("base64");
const [
  screenshot,
  abMark,
  aixcelMark,
  instrumentSans,
  instrumentSerif,
  plexMono,
] = await Promise.all([
  base64(path.join(mraRoot, "media", "01-console-dark.png")),
  base64(path.join(root, "public", "brand", "ahmad-ab-axis-dark.svg")),
  base64(path.join(mraRoot, "public", "assets", "aixcel-node-mark.svg")),
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
  await base64(path.join(mraRoot, "public", "assets", "tech", `${name}.svg`)),
])));

const techRow = technologies.map(([name, label], index) => {
  const x = 54 + (index * 194);
  return `<g transform="translate(${x} 1105)">
    <rect width="178" height="67" rx="10" fill="#F4EEE3" stroke="#B9AF9D"/>
    <image x="14" y="14" width="38" height="38" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${technologyMarks[name]}"/>
    <text x="62" y="40" class="tech">${label}</text>
  </g>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-labelledby="title desc">
  <title id="title">Marketing Revenue Assurance project visual</title>
  <desc id="desc">A real product console, release metrics, and official technology marks explain a governed multi-agent system that reconciles advertising, CRM, funnel, and cash evidence.</desc>
  <defs>
    <style>
      @font-face { font-family: InstrumentSans; src: url(data:font/woff2;base64,${instrumentSans}) format('woff2'); font-weight: 100 900; }
      @font-face { font-family: InstrumentSerif; src: url(data:font/woff2;base64,${instrumentSerif}) format('woff2'); font-style: italic; }
      @font-face { font-family: PlexMono; src: url(data:font/woff2;base64,${plexMono}) format('woff2'); font-weight: 600; }
      .sans { font-family: InstrumentSans, Arial, sans-serif; }
      .serif { font-family: InstrumentSerif, Georgia, serif; font-style: italic; }
      .mono { font-family: PlexMono, Consolas, monospace; }
      .tech { fill: #11100E; font-family: InstrumentSans, Arial, sans-serif; font-size: 15px; font-weight: 700; }
    </style>
    <clipPath id="console-clip"><rect x="54" y="476" width="972" height="451" rx="13"/></clipPath>
  </defs>
  <rect width="1080" height="1350" fill="#E9E1D2"/>
  <rect x="0" y="0" width="18" height="1350" fill="#C95F37"/>
  <image x="54" y="46" width="58" height="58" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${abMark}"/>
  <text x="126" y="72" class="sans" fill="#11100E" font-size="18" font-weight="750">AHMAD BUKHARI</text>
  <text x="126" y="96" class="mono" fill="#502C52" font-size="11">AGENTIC AI &amp; LLM SYSTEMS SPECIALIST</text>
  <image x="853" y="49" width="53" height="53" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${aixcelMark}"/>
  <text x="919" y="72" class="sans" fill="#11100E" font-size="16" font-weight="780">AIXCEL</text>
  <text x="919" y="94" class="mono" fill="#502C52" font-size="10">SOLUTIONS</text>
  <line x1="54" y1="131" x2="1026" y2="131" stroke="#877D6E"/>

  <text x="54" y="183" class="mono" fill="#C95F37" font-size="15" letter-spacing="1.8">MARKETING REVENUE ASSURANCE / 02</text>
  <text x="54" y="259" class="sans" fill="#11100E" font-size="64" font-weight="790">
    <tspan x="54">Revenue leaks hide</tspan>
    <tspan x="54" dy="64">between systems.</tspan>
  </text>
  <text x="622" y="321" class="serif" fill="#502C52" font-size="42">Reconcile before action.</text>
  <text x="54" y="394" class="sans" fill="#302D29" font-size="23">
    <tspan x="54">Ten bounded specialists compare ad delivery, CRM state, funnel movement,</tspan>
    <tspan x="54" dy="31">and collected cash. Deterministic controls own every number.</tspan>
  </text>

  <rect x="54" y="476" width="972" height="451" rx="13" fill="#080807" stroke="#502C52" stroke-width="2"/>
  <image x="54" y="236" width="972" height="742" clip-path="url(#console-clip)" preserveAspectRatio="none" href="data:image/png;base64,${screenshot}"/>
  <rect x="54" y="891" width="972" height="36" fill="#C95F37"/>
  <text x="73" y="915" class="mono" fill="#F4EEE3" font-size="12">REAL CONSOLE  ·  SYNTHETIC PUBLIC DATA  ·  ZERO EXTERNAL WRITES</text>

  <g transform="translate(54 966)">
    <text x="0" y="34" class="sans" fill="#11100E" font-size="34" font-weight="820">12/12</text>
    <text x="0" y="59" class="mono" fill="#625A50" font-size="11">GOLDEN SCENARIOS</text>
    <line x1="207" y1="0" x2="207" y2="70" stroke="#B9AF9D"/>
    <text x="241" y="34" class="sans" fill="#11100E" font-size="34" font-weight="820">31</text>
    <text x="241" y="59" class="mono" fill="#625A50" font-size="11">AUTOMATED TESTS</text>
    <line x1="449" y1="0" x2="449" y2="70" stroke="#B9AF9D"/>
    <text x="483" y="34" class="sans" fill="#11100E" font-size="34" font-weight="820">81.93%</text>
    <text x="483" y="59" class="mono" fill="#625A50" font-size="11">MEASURED COVERAGE</text>
    <line x1="733" y1="0" x2="733" y2="70" stroke="#B9AF9D"/>
    <text x="767" y="34" class="sans" fill="#C95F37" font-size="34" font-weight="820">0</text>
    <text x="767" y="59" class="mono" fill="#625A50" font-size="11">AUTOMATIC MUTATIONS</text>
  </g>

  ${techRow}
  <text x="54" y="1211" class="mono" fill="#502C52" font-size="11">REST · OPENAPI · POSTMAN · DOCKER · SIGNED SERVERLESS RECEIPTS</text>
  <line x1="54" y1="1240" x2="1026" y2="1240" stroke="#877D6E"/>
  <text x="54" y="1281" class="sans" fill="#11100E" font-size="16" font-weight="700">Published by Ahmad Bukhari. Built and verified by AiXCEL Solutions.</text>
  <text x="54" y="1316" class="mono" fill="#C95F37" font-size="14">marketing-revenue-assurance.vercel.app</text>
</svg>`;

await writeFile(outputSvg, svg, "utf8");

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(outputSvg).href, { waitUntil: "load" });
  const proof = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    missingImages: [...document.images].filter((image) => !image.complete || !image.naturalWidth).length,
  }));
  if (proof.width !== 1080 || proof.height !== 1350 || proof.missingImages !== 0) {
    throw new Error(`Marketing Revenue Assurance card did not render cleanly: ${JSON.stringify(proof)}`);
  }
  await page.screenshot({ path: outputPng, clip: { x: 0, y: 0, width: 1080, height: 1350 }, type: "png" });
} finally {
  await browser.close();
}

process.stdout.write(`Rendered ${outputSvg} and ${outputPng}\n`);
