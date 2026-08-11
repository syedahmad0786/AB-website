import { chromium } from "file:///C:/Users/ahmad/.agents/skills/gstack/node_modules/playwright/index.mjs";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const ctcoRoot = path.resolve(process.env.CTCO_ROOT || path.join(root, "..", "creator-talent-campaign-os"));
const outputRoot = path.join(root, "public", "art", "linkedin");
const outputSvg = path.join(outputRoot, "creator-talent-campaign-os.svg");
const outputPng = path.join(outputRoot, "creator-talent-campaign-os.png");
const base64 = async (file) => (await readFile(file)).toString("base64");

const [screenshot, abMark, aixcelMark, instrumentSans, instrumentSerif, plexMono] = await Promise.all([
  base64(path.join(ctcoRoot, "media", "10-live-production-balanced-roster.png")),
  base64(path.join(root, "public", "brand", "ahmad-ab-axis.svg")),
  base64(path.join(ctcoRoot, "public", "assets", "aixcel-node-mark.svg")),
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
const marks = Object.fromEntries(await Promise.all(technologies.map(async ([name]) => [
  name,
  await base64(path.join(ctcoRoot, "public", "assets", "tech", `${name}.svg`)),
])));

const techRow = technologies.map(([name, label], index) => {
  const x = 55 + (index * 194);
  const fastApiDisc = name === "fastapi" ? '<circle cx="31" cy="31" r="22" fill="#009688"/>' : "";
  return `<g transform="translate(${x} 1084)">
    <rect width="178" height="64" rx="12" fill="#FFFFFF" stroke="#D7D0C5"/>
    ${fastApiDisc}
    <image x="13" y="13" width="36" height="36" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${marks[name]}"/>
    <text x="61" y="38" class="tech">${label}</text>
  </g>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-labelledby="title desc">
  <title id="title">Creator and Talent Campaign OS project visual</title>
  <desc id="desc">A verified creator campaign decision system shows a real roster, human approval boundary, production evidence, and official technology marks.</desc>
  <defs>
    <style>
      @font-face { font-family: InstrumentSans; src: url(data:font/woff2;base64,${instrumentSans}); }
      @font-face { font-family: InstrumentSerif; src: url(data:font/woff2;base64,${instrumentSerif}); font-style: italic; }
      @font-face { font-family: PlexMono; src: url(data:font/woff2;base64,${plexMono}); font-weight: 600; }
      .sans { font-family: InstrumentSans, Arial, sans-serif; }
      .serif { font-family: InstrumentSerif, Georgia, serif; font-style: italic; }
      .mono { font-family: PlexMono, Consolas, monospace; letter-spacing: .08em; }
      .tech { font-family: InstrumentSans, Arial, sans-serif; fill: #15171B; font-size: 16px; font-weight: 720; }
    </style>
    <clipPath id="runtime"><rect x="55" y="350" width="970" height="500" rx="22"/></clipPath>
    <linearGradient id="runtimeShade" x1="0" y1="0" x2="0" y2="1"><stop offset=".62" stop-color="#0E1014" stop-opacity="0"/><stop offset="1" stop-color="#0E1014" stop-opacity=".84"/></linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="#F3EFE7"/>
  <rect x="0" y="0" width="18" height="1350" fill="#FF6248"/>
  <g transform="translate(55 46)">
    <image width="54" height="54" href="data:image/svg+xml;base64,${abMark}"/>
    <text x="72" y="23" class="sans" fill="#15171B" font-size="17" font-weight="780">AHMAD BUKHARI</text>
    <text x="72" y="45" class="mono" fill="#68645F" font-size="9">AGENTIC AI AND LLM SYSTEMS</text>
    <image x="855" y="2" width="46" height="46" href="data:image/svg+xml;base64,${aixcelMark}"/>
    <text x="910" y="30" class="sans" fill="#15171B" font-size="15" font-weight="760">AiXCEL</text>
  </g>
  <line x1="55" y1="124" x2="1025" y2="124" stroke="#D0C9BE"/>
  <text x="55" y="166" class="mono" fill="#E44E37" font-size="11">SYSTEM 09  /  CREATOR CAMPAIGN OPERATIONS</text>
  <text x="55" y="225" class="sans" fill="#111317" font-size="58" font-weight="850">Creator &amp; Talent</text>
  <text x="55" y="286" class="sans" fill="#111317" font-size="58" font-weight="850">Campaign OS</text>
  <text x="572" y="286" class="serif" fill="#E95740" font-size="58">with receipts.</text>
  <text x="55" y="324" class="sans" fill="#5F5B55" font-size="17">Evidence-backed roster planning. Human decision. Zero external campaign writes.</text>

  <rect x="55" y="350" width="970" height="500" rx="22" fill="#111317"/>
  <g clip-path="url(#runtime)">
    <image x="55" y="-260" width="970" height="3148" preserveAspectRatio="none" href="data:image/png;base64,${screenshot}"/>
    <rect x="55" y="350" width="970" height="500" fill="url(#runtimeShade)"/>
  </g>
  <rect x="77" y="373" width="214" height="36" rx="18" fill="#F3EFE7"/>
  <circle cx="98" cy="391" r="5" fill="#1E9A68"/>
  <text x="113" y="396" class="mono" fill="#15171B" font-size="9">VERIFIED PRODUCTION RUN</text>
  <g transform="translate(78 754)">
    <rect width="348" height="72" rx="12" fill="#101217" fill-opacity=".94" stroke="#FFFFFF" stroke-opacity=".22"/>
    <text x="18" y="27" class="mono" fill="#FF927F" font-size="9">BASELINE DECISION</text>
    <text x="18" y="55" class="sans" fill="#FFFFFF" font-size="22" font-weight="780">Ready For Review · 4 creators</text>
  </g>
  <g transform="translate(685 754)">
    <rect width="318" height="72" rx="12" fill="#FF6248"/>
    <text x="18" y="27" class="mono" fill="#36100A" font-size="9">CHANGED EVIDENCE</text>
    <text x="18" y="55" class="sans" fill="#111317" font-size="22" font-weight="820">Hold · 3 creators</text>
  </g>

  <g transform="translate(55 905)">
    <text x="0" y="33" class="sans" fill="#111317" font-size="38" font-weight="850">13/13</text>
    <text x="0" y="57" class="mono" fill="#68645F" font-size="9">GOLDEN SCENARIOS</text>
    <line x1="220" y1="0" x2="220" y2="68" stroke="#CFC7BB"/>
    <text x="252" y="33" class="sans" fill="#111317" font-size="38" font-weight="850">70</text>
    <text x="252" y="57" class="mono" fill="#68645F" font-size="9">AUTOMATED TESTS</text>
    <line x1="442" y1="0" x2="442" y2="68" stroke="#CFC7BB"/>
    <text x="474" y="33" class="sans" fill="#111317" font-size="38" font-weight="850">85.38%</text>
    <text x="474" y="57" class="mono" fill="#68645F" font-size="9">MEASURED COVERAGE</text>
    <line x1="744" y1="0" x2="744" y2="68" stroke="#CFC7BB"/>
    <text x="778" y="33" class="sans" fill="#E44E37" font-size="38" font-weight="850">0</text>
    <text x="778" y="57" class="mono" fill="#68645F" font-size="9">EXTERNAL WRITES</text>
  </g>
  <text x="55" y="1027" class="mono" fill="#68645F" font-size="10">12-NODE LANGGRAPH · 7 SPECIALISTS · 18 EVALUATION MEASURES · 34 POSTMAN ASSERTIONS</text>
  ${techRow}
  <text x="55" y="1190" class="mono" fill="#68645F" font-size="10">REST · OPENAPI · DOCKER · GITHUB ACTIONS · PLAYWRIGHT · VERCEL</text>
  <line x1="55" y1="1228" x2="1025" y2="1228" stroke="#D0C9BE"/>
  <text x="55" y="1274" class="sans" fill="#15171B" font-size="17" font-weight="740">Public synthetic demonstration. Private implementation repository.</text>
  <text x="55" y="1315" class="mono" fill="#E44E37" font-size="14">creator-talent-campaign-os.vercel.app</text>
</svg>`;

await writeFile(outputSvg, svg, "utf8");
const browserExecutable = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find(existsSync);
const browser = await chromium.launch({
  headless: true,
  ...(browserExecutable ? { executablePath: browserExecutable } : {}),
});
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
    throw new Error(`Creator and Talent Campaign OS card did not render cleanly: ${JSON.stringify(proof)}`);
  }
  await page.screenshot({ path: outputPng, clip: { x: 0, y: 0, width: 1080, height: 1350 }, type: "png" });
} finally {
  await browser.close();
}

process.stdout.write(`Rendered ${outputSvg} and ${outputPng}\n`);
