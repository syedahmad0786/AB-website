import { chromium } from "file:///C:/Users/ahmad/.agents/skills/gstack/node_modules/playwright/index.mjs";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const gatewayRoot = path.resolve(process.env.GATEWAY_ROOT || path.join(root, "..", "agentic-systems-gateway"));
const outputRoot = path.join(root, "public", "art", "linkedin");
const outputSvg = path.join(outputRoot, "agentic-systems-gateway.svg");
const outputPng = path.join(outputRoot, "agentic-systems-gateway.png");
const base64 = async (file) => (await readFile(file)).toString("base64");

const [screenshot, abMark, aixcelMark, instrumentSans, instrumentSerif, plexMono] = await Promise.all([
  base64(path.join(gatewayRoot, "media", "02-live-production-changed-evidence-dark.png")),
  base64(path.join(root, "public", "brand", "ahmad-ab-axis.svg")),
  base64(path.join(gatewayRoot, "public", "assets", "aixcel-node-mark.svg")),
  base64(path.join(root, "public", "fonts", "instrument-sans-latin-wght-normal.woff2")),
  base64(path.join(root, "public", "fonts", "instrument-serif-latin-400-italic.woff2")),
  base64(path.join(root, "public", "fonts", "ibm-plex-mono-latin-600-normal.woff2")),
]);

const technologies = [
  ["python", "Python"],
  ["fastapi", "FastAPI"],
  ["postgresql", "PostgreSQL"],
  ["opentelemetry", "OpenTelemetry"],
];
const marks = Object.fromEntries(await Promise.all(technologies.map(async ([name]) => [
  name,
  await base64(path.join(gatewayRoot, "public", "assets", "tech", `${name}.svg`)),
])));

const techRow = technologies.map(([name, label], index) => {
  const x = 55 + (index * 242);
  const fastApiDisc = name === "fastapi" ? '<circle cx="31" cy="31" r="22" fill="#009688"/>' : "";
  return `<g transform="translate(${x} 1080)">
    <rect width="226" height="66" rx="13" fill="#F6F3ED" stroke="#353944"/>
    ${fastApiDisc}
    <image x="13" y="14" width="36" height="36" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${marks[name]}"/>
    <text x="61" y="40" class="tech">${label}</text>
  </g>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-labelledby="title desc">
  <title id="title">Agentic Systems Gateway project visual</title>
  <desc id="desc">A governed inference gateway and evaluation registry with a live evidence-sensitive workspace, signed receipts, release proof, and official technology marks.</desc>
  <defs>
    <style>
      @font-face { font-family: InstrumentSans; src: url(data:font/woff2;base64,${instrumentSans}); }
      @font-face { font-family: InstrumentSerif; src: url(data:font/woff2;base64,${instrumentSerif}); font-style: italic; }
      @font-face { font-family: PlexMono; src: url(data:font/woff2;base64,${plexMono}); font-weight: 600; }
      .sans { font-family: InstrumentSans, Arial, sans-serif; }
      .serif { font-family: InstrumentSerif, Georgia, serif; font-style: italic; }
      .mono { font-family: PlexMono, Consolas, monospace; letter-spacing: .08em; }
      .tech { font-family: InstrumentSans, Arial, sans-serif; fill: #15171B; font-size: 15px; font-weight: 720; }
    </style>
    <clipPath id="runtime"><rect x="55" y="348" width="970" height="494" rx="24"/></clipPath>
    <linearGradient id="field" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0A0B10"/><stop offset=".56" stop-color="#111420"/><stop offset="1" stop-color="#192148"/></linearGradient>
    <linearGradient id="runtimeShade" x1="0" y1="0" x2="0" y2="1"><stop offset=".68" stop-color="#090A0E" stop-opacity="0"/><stop offset="1" stop-color="#090A0E" stop-opacity=".9"/></linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#field)"/>
  <rect x="0" y="0" width="18" height="1350" fill="#B8F33E"/>
  <circle cx="1000" cy="118" r="180" fill="#7182FF" fill-opacity=".09"/>
  <circle cx="946" cy="245" r="5" fill="#8191FF"/><circle cx="1002" cy="196" r="5" fill="#B8F33E"/><circle cx="1026" cy="274" r="5" fill="#8191FF"/>
  <g transform="translate(55 46)">
    <rect width="54" height="54" rx="12" fill="#F4F2EC"/>
    <image x="5" y="5" width="44" height="44" href="data:image/svg+xml;base64,${abMark}"/>
    <text x="72" y="23" class="sans" fill="#F4F2EC" font-size="17" font-weight="780">AHMAD BUKHARI</text>
    <text x="72" y="45" class="mono" fill="#A9ACB8" font-size="9">AGENTIC AI AND LLM SYSTEMS</text>
    <image x="855" y="2" width="46" height="46" href="data:image/svg+xml;base64,${aixcelMark}"/>
    <text x="910" y="30" class="sans" fill="#F4F2EC" font-size="15" font-weight="760">AiXCEL</text>
  </g>
  <line x1="55" y1="124" x2="1025" y2="124" stroke="#343846"/>
  <text x="55" y="166" class="mono" fill="#B8F33E" font-size="11">SYSTEM 10  /  GOVERNED MODEL ACCESS</text>
  <text x="55" y="228" class="sans" fill="#F7F5F0" font-size="58" font-weight="850">Agentic Systems</text>
  <text x="55" y="290" class="sans" fill="#F7F5F0" font-size="58" font-weight="850">Gateway</text>
  <text x="300" y="290" class="serif" fill="#8D9AFF" font-size="58">with proof.</text>
  <text x="55" y="326" class="sans" fill="#B5B7C1" font-size="17">One governed entry for replay, visitor-owned inference, evaluation, and signed receipts.</text>

  <rect x="55" y="348" width="970" height="494" rx="24" fill="#0B0C10" stroke="#454A5A"/>
  <g clip-path="url(#runtime)">
    <image x="55" y="348" width="970" height="558" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,${screenshot}"/>
    <rect x="55" y="348" width="970" height="494" fill="url(#runtimeShade)"/>
  </g>
  <g transform="translate(79 372)">
    <rect width="244" height="36" rx="18" fill="#F4F2EC"/>
    <circle cx="20" cy="18" r="5" fill="#209967"/>
    <text x="35" y="23" class="mono" fill="#15171B" font-size="9">VERIFIED PRODUCTION RUN</text>
  </g>
  <g transform="translate(77 748)">
    <rect width="382" height="70" rx="12" fill="#0B0D12" fill-opacity=".94" stroke="#FFFFFF" stroke-opacity=".22"/>
    <text x="18" y="27" class="mono" fill="#AAB1FF" font-size="9">EVIDENCE SENSITIVITY</text>
    <text x="18" y="54" class="sans" fill="#FFFFFF" font-size="21" font-weight="780">Output changes with the input</text>
  </g>
  <g transform="translate(699 748)">
    <rect width="304" height="70" rx="12" fill="#B8F33E"/>
    <text x="18" y="27" class="mono" fill="#243000" font-size="9">HARD BOUNDARY</text>
    <text x="18" y="54" class="sans" fill="#111317" font-size="21" font-weight="820">0 external actions</text>
  </g>

  <g transform="translate(55 900)">
    <text x="0" y="33" class="sans" fill="#F7F5F0" font-size="39" font-weight="850">85</text>
    <text x="0" y="58" class="mono" fill="#A9ACB8" font-size="9">AUTOMATED TESTS</text>
    <line x1="210" y1="0" x2="210" y2="70" stroke="#363A47"/>
    <text x="246" y="33" class="sans" fill="#F7F5F0" font-size="39" font-weight="850">18/18</text>
    <text x="246" y="58" class="mono" fill="#A9ACB8" font-size="9">EVALUATION MEASURES</text>
    <line x1="510" y1="0" x2="510" y2="70" stroke="#363A47"/>
    <text x="548" y="33" class="sans" fill="#F7F5F0" font-size="39" font-weight="850">40/40</text>
    <text x="548" y="58" class="mono" fill="#A9ACB8" font-size="9">POSTMAN ASSERTIONS</text>
    <line x1="796" y1="0" x2="796" y2="70" stroke="#363A47"/>
    <text x="833" y="33" class="sans" fill="#B8F33E" font-size="39" font-weight="850">0</text>
    <text x="833" y="58" class="mono" fill="#A9ACB8" font-size="9">PRODUCTION 5XX</text>
  </g>
  <text x="55" y="1029" class="mono" fill="#A9ACB8" font-size="10">9 SYSTEM REGISTRY · FIXED PROVIDERS · HMAC RECEIPTS · PERSISTENT LIGHT AND DARK THEMES</text>
  ${techRow}
  <text x="55" y="1190" class="mono" fill="#A9ACB8" font-size="10">REST · OPENAPI · POSTMAN · DOCKER · GITHUB ACTIONS · PLAYWRIGHT · VERCEL</text>
  <line x1="55" y1="1228" x2="1025" y2="1228" stroke="#343846"/>
  <text x="55" y="1274" class="sans" fill="#F4F2EC" font-size="17" font-weight="740">Public synthetic release. Shared provider spend is disabled by default.</text>
  <text x="55" y="1315" class="mono" fill="#B8F33E" font-size="14">agentic-systems-gateway.vercel.app</text>
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
    throw new Error(`Agentic Systems Gateway card did not render cleanly: ${JSON.stringify(proof)}`);
  }
  await page.screenshot({ path: outputPng, clip: { x: 0, y: 0, width: 1080, height: 1350 }, type: "png" });
} finally {
  await browser.close();
}

process.stdout.write(`Rendered ${outputSvg} and ${outputPng}\n`);
