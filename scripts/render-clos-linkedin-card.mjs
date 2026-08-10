import { chromium } from "file:///C:/Users/ahmad/.agents/skills/gstack/node_modules/playwright/index.mjs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const closRoot = path.resolve(process.env.CLOS_ROOT || path.join(root, "..", "creative-learning-os"));
const outputRoot = path.join(root, "public", "art", "linkedin");
const outputSvg = path.join(outputRoot, "creative-learning-os.svg");
const outputPng = path.join(outputRoot, "creative-learning-os.png");

const base64 = async (file) => (await readFile(file)).toString("base64");
const [screenshot, abMark, aixcelMark, instrumentSans, instrumentSerif, plexMono] = await Promise.all([
  base64(path.join(closRoot, "media", "10-live-production-clean-scale.png")),
  base64(path.join(root, "public", "brand", "ahmad-ab-axis.svg")),
  base64(path.join(closRoot, "public", "assets", "aixcel-node-mark.svg")),
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
  await base64(path.join(closRoot, "public", "assets", "tech", `${name}.svg`)),
])));

const techRow = technologies.map(([name, label], index) => {
  const x = 56 + (index * 194);
  const iconBackground = name === "fastapi"
    ? '\n    <circle cx="33" cy="34" r="23" fill="#009688"/>'
    : "";
  return `<g transform="translate(${x} 1080)">
    <rect width="178" height="68" rx="34" fill="#F4F0E8" stroke="#D9D0C5"/>${iconBackground}
    <image x="14" y="15" width="38" height="38" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${technologyMarks[name]}"/>
    <text x="62" y="41" class="tech">${label}</text>
  </g>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-labelledby="title desc">
  <title id="title">Creative Learning OS project visual</title>
  <desc id="desc">A verified creative measurement system changes its recommendation when conversion evidence changes, with a real production screen and official technology marks.</desc>
  <defs>
    <style>
      @font-face { font-family: InstrumentSans; src: url(data:font/woff2;base64,${instrumentSans}) format('woff2'); font-weight: 100 900; }
      @font-face { font-family: InstrumentSerif; src: url(data:font/woff2;base64,${instrumentSerif}) format('woff2'); font-style: italic; }
      @font-face { font-family: PlexMono; src: url(data:font/woff2;base64,${plexMono}) format('woff2'); font-weight: 600; }
      .sans { font-family: InstrumentSans, Arial, sans-serif; }
      .serif { font-family: InstrumentSerif, Georgia, serif; font-style: italic; }
      .mono { font-family: PlexMono, Consolas, monospace; }
      .tech { fill: #15120F; font-family: InstrumentSans, Arial, sans-serif; font-size: 15px; font-weight: 760; }
    </style>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F4F0E8"/>
      <stop offset="1" stop-color="#EDE4F1"/>
    </linearGradient>
    <clipPath id="screen"><rect x="516" y="284" width="510" height="586" rx="26"/></clipPath>
  </defs>

  <rect width="1080" height="1350" fill="url(#wash)"/>
  <circle cx="1010" cy="-4" r="270" fill="#502C52"/>
  <circle cx="24" cy="1040" r="280" fill="#C8FF2E" opacity=".34"/>
  <path d="M0 938C245 836 365 952 558 890C752 828 883 690 1080 742V1350H0Z" fill="#15120F"/>

  <image x="55" y="44" width="58" height="58" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${abMark}"/>
  <text x="126" y="72" class="sans" fill="#15120F" font-size="18" font-weight="780">AHMAD BUKHARI</text>
  <text x="126" y="97" class="mono" fill="#502C52" font-size="11">AGENTIC AI &amp; LLM SYSTEMS SPECIALIST</text>
  <rect x="838" y="40" width="188" height="68" rx="34" fill="#F4F0E8"/>
  <image x="856" y="51" width="46" height="46" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${aixcelMark}"/>
  <text x="913" y="76" class="sans" fill="#15120F" font-size="15" font-weight="800">AIXCEL</text>
  <text x="913" y="95" class="mono" fill="#502C52" font-size="9">SOLUTIONS</text>

  <text x="55" y="164" class="mono" fill="#502C52" font-size="14" letter-spacing="1.8">CREATIVE LEARNING OS / 04</text>
  <text x="55" y="231" class="sans" fill="#15120F" font-size="59" font-weight="800">
    <tspan x="55">Know what worked.</tspan>
    <tspan x="55" dy="62">Know </tspan><tspan class="serif" fill="#7B43A5" font-size="52">why it might have.</tspan>
  </text>
  <text x="55" y="390" class="sans" fill="#39302B" font-size="21">
    <tspan x="55">A governed learning loop separates signal</tspan>
    <tspan x="55" dy="29">from noise, then stops before publishing</tspan>
    <tspan x="55" dy="29">or changing spend.</tspan>
  </text>

  <g transform="translate(55 470)">
    <rect width="392" height="96" rx="12" fill="#FFFFFF" stroke="#D9D0C5"/>
    <text x="20" y="28" class="mono" fill="#655B55" font-size="10">BASELINE EVIDENCE</text>
    <text x="20" y="67" class="sans" fill="#15120F" font-size="28" font-weight="820">SCALE</text>
    <text x="302" y="67" class="mono" fill="#16805A" font-size="14">+50.0%</text>
  </g>
  <path d="M130 592H364" stroke="#502C52" stroke-width="2"/>
  <path d="M354 583L365 592L354 601" fill="none" stroke="#502C52" stroke-width="2"/>
  <text x="55" y="627" class="mono" fill="#502C52" font-size="10">CHANGE CONVERSION EVIDENCE</text>
  <g transform="translate(55 653)">
    <rect width="392" height="96" rx="12" fill="#502C52"/>
    <text x="20" y="28" class="mono" fill="#DCCDE5" font-size="10">EDITED EVIDENCE</text>
    <text x="20" y="67" class="sans" fill="#F4F0E8" font-size="28" font-weight="820">HOLD</text>
    <text x="314" y="67" class="mono" fill="#C8FF2E" font-size="14">N/A</text>
  </g>
  <text x="55" y="793" class="sans" fill="#39302B" font-size="15" font-weight="660">
    <tspan x="55">Same workflow. Different evidence.</tspan>
    <tspan x="55" dy="24">Different bounded decision.</tspan>
  </text>

  <rect x="500" y="268" width="542" height="618" rx="34" fill="#15120F" opacity=".16"/>
  <rect x="516" y="284" width="510" height="586" rx="26" fill="#0E0D12" stroke="#7B43A5" stroke-width="2"/>
  <g clip-path="url(#screen)">
    <svg x="516" y="284" width="510" height="586" viewBox="0 230 1440 1655" preserveAspectRatio="xMidYMid slice">
      <image x="0" y="0" width="1440" height="5900" href="data:image/png;base64,${screenshot}"/>
    </svg>
  </g>
  <rect x="538" y="836" width="466" height="22" rx="11" fill="#C8FF2E"/>
  <text x="559" y="851" class="mono" fill="#15120F" font-size="8">REAL PUBLIC RUNTIME · SYNTHETIC AGGREGATE DATA · ZERO PLATFORM CHANGES</text>

  <g transform="translate(55 936)">
    <text x="0" y="35" class="sans" fill="#F4F0E8" font-size="34" font-weight="820">13/13</text>
    <text x="0" y="60" class="mono" fill="#F4F0E8" opacity=".58" font-size="10">GOLDEN SCENARIOS</text>
    <line x1="220" y1="0" x2="220" y2="72" stroke="#F4F0E8" opacity=".18"/>
    <text x="251" y="35" class="sans" fill="#F4F0E8" font-size="34" font-weight="820">68</text>
    <text x="251" y="60" class="mono" fill="#F4F0E8" opacity=".58" font-size="10">AUTOMATED TESTS</text>
    <line x1="442" y1="0" x2="442" y2="72" stroke="#F4F0E8" opacity=".18"/>
    <text x="474" y="35" class="sans" fill="#F4F0E8" font-size="34" font-weight="820">82.76%</text>
    <text x="474" y="60" class="mono" fill="#F4F0E8" opacity=".58" font-size="10">MEASURED COVERAGE</text>
    <line x1="744" y1="0" x2="744" y2="72" stroke="#F4F0E8" opacity=".18"/>
    <text x="778" y="35" class="sans" fill="#C8FF2E" font-size="34" font-weight="820">0</text>
    <text x="778" y="60" class="mono" fill="#F4F0E8" opacity=".58" font-size="10">PLATFORM MUTATIONS</text>
  </g>

  ${techRow}
  <text x="55" y="1188" class="mono" fill="#F4F0E8" opacity=".66" font-size="11">REST · OPENAPI · POSTMAN · DOCKER · GITHUB ACTIONS · PLAYWRIGHT · VERCEL</text>
  <line x1="55" y1="1232" x2="1025" y2="1232" stroke="#F4F0E8" opacity=".24"/>
  <text x="55" y="1277" class="sans" fill="#F4F0E8" font-size="16" font-weight="700">Published by Ahmad Bukhari. Built and verified by AiXCEL Solutions.</text>
  <text x="55" y="1316" class="mono" fill="#C8FF2E" font-size="14">creative-learning-os.vercel.app</text>
</svg>`;

await writeFile(outputSvg, svg, "utf8");

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(outputSvg).href, { waitUntil: "load" });
  await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
  const proof = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    missingImages: [...document.images].filter((image) => !image.complete || !image.naturalWidth).length,
  }));
  if (proof.width !== 1080 || proof.height !== 1350 || proof.missingImages !== 0) {
    throw new Error(`Creative Learning OS card did not render cleanly: ${JSON.stringify(proof)}`);
  }
  await page.screenshot({ path: outputPng, clip: { x: 0, y: 0, width: 1080, height: 1350 }, type: "png" });
} finally {
  await browser.close();
}

process.stdout.write(`Rendered ${outputSvg} and ${outputPng}\n`);
