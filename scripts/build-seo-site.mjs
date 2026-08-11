import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import vm from "node:vm";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
const siteUrl = "https://ahmadbukhari.com";
const bookingUrl = "https://cal.com/ahmad-bukhari/revenue-handoff-map";
const latestResearchUrl = "https://aixcelsolutions.com/insights/openai-presence-enterprise-ai-agent-rollout";
const updatedAt = "2026-08-11";

const [sourceTemplateInput, siteCss, seoPagesCss, themeCss, experienceJs, decisionEngineJs, themeJs, analyticsJs] = await Promise.all([
  readFile(resolve(root, "static/site-template.html"), "utf8"),
  readFile(resolve(root, "static/site-current.css"), "utf8"),
  readFile(resolve(root, "static/seo-pages.css"), "utf8"),
  readFile(resolve(root, "static/theme.css"), "utf8"),
  readFile(resolve(root, "static/experience.js"), "utf8"),
  readFile(resolve(root, "static/decision-engine.js"), "utf8"),
  readFile(resolve(root, "static/theme.js"), "utf8"),
  readFile(resolve(root, "static/analytics.js"), "utf8"),
]);
const compiledSiteCss = `${siteCss}\n\n${seoPagesCss}\n\n${themeCss}`;
const siteCssFilename = `site.${createHash("sha256").update(compiledSiteCss).digest("hex").slice(0, 12)}.css`;
const sourceTemplate = sourceTemplateInput.replaceAll("/site.css", `/${siteCssFilename}`);

function loadTypeScriptData(relativePath) {
  const source = requireSource(relativePath);
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const module = { exports: {} };
  const context = vm.createContext({ module, exports: module.exports, Set });
  new vm.Script(compiled, { filename: relativePath }).runInContext(context);
  return module.exports;
}

function requireSource(relativePath) {
  return sourceFiles.get(relativePath);
}

const sourceFiles = new Map(
  await Promise.all(
    ["src/lib/blog-data.ts", "src/lib/portfolio-data.ts"].map(async (path) => [
      path,
      await readFile(resolve(root, path), "utf8"),
    ]),
  ),
);
const { BLOG_POSTS } = loadTypeScriptData("src/lib/blog-data.ts");
const { PORTFOLIO_ITEMS } = loadTypeScriptData("src/lib/portfolio-data.ts");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const escapeXml = escapeHtml;

function truncate(value, maxLength) {
  const text = String(value).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  const shortened = text.slice(0, maxLength - 1);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > maxLength * 0.7 ? boundary : maxLength - 1).replace(/[,:;\-–—]+$/, "")}…`;
}

function inlineMarkdown(value) {
  return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderLongForm(content) {
  const blocks = [];
  let list = [];
  const flushList = () => {
    if (!list.length) return;
    blocks.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    list = [];
  };

  for (const rawLine of String(content).split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
    } else if (/^[-*] /.test(line)) {
      list.push(line.slice(2));
    } else {
      flushList();
      blocks.push(`<p>${inlineMarkdown(line)}</p>`);
    }
  }
  flushList();
  return blocks.join("\n");
}

function extract(start, end) {
  const startIndex = sourceTemplate.indexOf(start);
  const endIndex = sourceTemplate.indexOf(end, startIndex);
  if (startIndex < 0 || endIndex < 0) throw new Error(`Could not extract ${start}`);
  return sourceTemplate.slice(startIndex, endIndex);
}

const homeMain = extract('<main id="main">', "\n  </main>") + "\n  </main>";
const workSection = extract('<section class="work-section', '<section class="lab-section');
const labSections = extract('<section class="lab-section', '<section class="about-section');
const aboutSection = extract('<section class="about-section', '<template id="future-team-card-template"');
const contactSection = extract('<section class="contact-section', "\n  </main>");

const cases = {
  workspine: {
    eyebrow: "01 / Flagship product",
    title: "Workspine: private AI work memory",
    shortTitle: "Workspine",
    description: "A private desktop work-memory system for reconstructing the context, decisions, evidence, and commitments that disappear between business apps.",
    problem: "Knowledge work produces a trail of fragments, but the reasoning between them rarely survives. Search can retrieve files; it cannot reconstruct why a decision changed, what evidence supported it, or which commitment is now at risk.",
    architecture: ["Local capture", "Typed event model", "Context graph", "Memory timeline", "Evidence views"],
    decisions: ["Treat privacy boundaries as product architecture, not a settings screen.", "Store work as typed events so new views can emerge without rewriting history.", "Separate captured evidence from machine-generated interpretation.", "Make the timeline useful before adding autonomous action."],
    evidence: "Private source and product footage exist outside this public build. This case explains the architecture and decision logic without exposing internal code, personal work data, or inflated adoption claims.",
  },
  manhaj: {
    eyebrow: "02 / Delivery engine",
    title: "MANHAJ: a governed AI operating system",
    shortTitle: "MANHAJ",
    description: "The delivery architecture behind MANHAJ: a private AI operating system that turns repeatable operating knowledge into governed modules, agents, and releases.",
    problem: "Automation work often scales by copying projects and relying on the builder’s memory. That makes quality inconsistent, estimates fragile, and releases difficult to audit.",
    architecture: ["Intake", "System blueprint", "Module registry", "Quality gates", "Release cockpit"],
    decisions: ["Model reusable capabilities separately from client-specific configuration.", "Require evidence at each delivery gate before a release can advance.", "Keep human approval where business risk cannot be reversed.", "Design the cockpit around exceptions and ownership, not vanity throughput."],
    evidence: "MANHAJ is a self-owned private system under active development. Public claims are limited to the operating model and architecture. Product details are available at manhaj.ahmadbukhari.com.",
  },
  "enterprise-os": {
    eyebrow: "03 / Client system",
    title: "Enterprise AI operating system architecture",
    shortTitle: "Enterprise Operating System",
    description: "An anonymized enterprise operating model connecting delivery, permissions, finance, state gates, and observability.",
    problem: "The client’s operational truth was distributed across tools and teams. Actions could complete without permissions, financial checks, or delivery state being visible in one place.",
    architecture: ["Identity and permissions", "State gates", "Delivery services", "Finance controls", "Audit and observability"],
    decisions: ["Define the business state machine before adding more workflows.", "Make privileged actions explicit and auditable.", "Separate operational status from financial status while preserving their dependencies.", "Use mock data and sanitized diagrams for public communication."],
    evidence: "Client identity, screenshots, source systems, volumes, and URLs are intentionally withheld. This case demonstrates the architecture pattern and constraints without revealing confidential implementation details.",
  },
  errorlens: {
    eyebrow: "04 / Reliability system",
    title: "Self-healing AI automation and workflow reliability",
    seoTitle: "Workflow Reliability & Error Recovery",
    shortTitle: "Self-Healing Automation",
    description: "A workflow reliability layer that classifies failures, retries safe cases, quarantines unsafe events, and escalates with operator-ready context.",
    problem: "Workflow errors are often buried in platform logs or forwarded without enough context to act. The same failure can repeat while a team manually reconstructs what happened.",
    architecture: ["Detect", "Normalize", "Classify", "Retry or quarantine", "Escalate with context"],
    decisions: ["Retry only errors that are safe and plausibly transient.", "Preserve the original payload reference without exposing sensitive data in alerts.", "Route permanent failures to humans with owner, severity, and next action.", "Feed recurring failure classes back into system design."],
    evidence: "A public n8n creator profile and related code are linked from the Automation Lab. Client payloads, credentials, and internal endpoints are not embedded in this demonstration.",
  },
  "migration-factory": {
    eyebrow: "05 / Migration factory",
    title: "Make to n8n automation migration factory",
    shortTitle: "Make → n8n Migration Factory",
    description: "A repeatable method for migrating a 108-workflow estate into tested n8n families instead of performing fragile one-off rewrites.",
    problem: "A direct tool-for-tool rewrite preserves accidental complexity. It also makes parity testing inconsistent and hides which workflows are genuinely unique versus variations of the same pattern.",
    architecture: ["Inventory 108 candidates", "Classify families", "Map capabilities", "Rebuild modules", "Parity and exception tests"],
    decisions: ["Classify before rebuilding.", "Separate business behavior from platform-specific implementation.", "Build reusable nodes and subflows for recurring patterns.", "Use migration status and evidence states instead of one misleading completion number."],
    evidence: "The 108 figure describes documented migration candidates, not a claim that every workflow is already converted and deployed. Client logic and raw exports remain private.",
  },
  onboarding: {
    eyebrow: "06 / Cross-platform operations",
    title: "Resilient client onboarding automation",
    shortTitle: "Resilient Onboarding",
    description: "A checkpointed onboarding system designed to survive duplicate records, partial provisioning, delayed payment, and human exceptions.",
    problem: "Onboarding crossed CRM, billing, calendars, messaging, and manual setup. A partial failure could leave a customer with conflicting status across systems and no clear owner for recovery.",
    architecture: ["Validated intake", "Identity resolution", "Provisioning", "Verification", "Human handoff"],
    decisions: ["Make every step idempotent where the platform allows it.", "Persist checkpoints so recovery starts from a known state.", "Treat human handoff as a designed system state.", "Show operators the last good state, current blocker, and next safe action."],
    evidence: "The public lab uses invented records and contains no client names, endpoints, or credentials. The case communicates the system pattern while protecting the underlying engagement.",
  },
};

const caseArtwork = {
  workspine: {
    file: "workspine",
    alt: "Workspine turns operational events into contextual memory and verified evidence.",
  },
  manhaj: {
    file: "manhaj",
    alt: "MANHAJ shows a governed path from build through a quality gate to verified release.",
  },
  "enterprise-os": {
    file: "enterprise-os",
    alt: "Enterprise OS connects observation, delivery, control, and shared state on one operating plane.",
  },
  errorlens: {
    file: "errorlens",
    alt: "ErrorLens classifies failures, retries safe cases, and escalates exceptions requiring judgment.",
  },
  "migration-factory": {
    file: "make-n8n-factory",
    alt: "A Make-to-n8n migration factory groups workflow inventory into reusable families and verifies parity.",
  },
  onboarding: {
    file: "resilient-onboarding",
    alt: "Resilient onboarding checkpoints intake, identity, provisioning, and confirmation with a recovery path.",
  },
};

const services = {
  "ai-systems-architecture": {
    title: "AI Systems Architecture Consulting",
    description: "AI systems architecture for organizations that need dependable agents, automation, data flows, human approvals, and operating controls—not isolated demos.",
    answer: "AI systems architecture defines how models, business data, workflows, permissions, humans, and recovery paths work together as one dependable operating system.",
    outcomes: ["A bounded system blueprint", "Clear data and permission boundaries", "Human approval and exception paths", "Observability and recovery requirements", "A phased delivery roadmap"],
  },
  "ai-automation-consulting": {
    title: "AI Automation Consultant for Business Operations",
    seoTitle: "AI Automation Consulting",
    description: "Practical AI automation consulting for CRM, revenue operations, onboarding, reporting, customer communication, and internal delivery workflows.",
    answer: "A strong AI automation engagement starts with the operational failure, maps the state and owners, and automates only the actions that can be controlled and measured.",
    outcomes: ["Workflow and failure-point audit", "Automation opportunity ranking", "Prototype and integration plan", "Controls for retries and escalation", "Operator documentation"],
  },
  "agentic-ai-autonomous-workflows": {
    title: "Agentic AI and Autonomous Workflow Design",
    description: "Controlled agentic AI workflows that can plan and act within explicit tools, permissions, evidence requirements, and human approval boundaries.",
    answer: "Agentic AI is useful when a task requires reasoning across several steps. It still needs bounded tools, auditable state, evaluation, and a safe handoff when confidence is low.",
    outcomes: ["Agent and tool boundaries", "Memory and retrieval design", "Evaluation scenarios", "Approval gates", "Failure containment"],
  },
  "voice-ai-conversational-intelligence": {
    title: "Voice AI Systems and Conversational Automation",
    seoTitle: "Voice AI & Conversational Automation",
    description: "Voice AI architecture for qualification, appointment setting, reception, support triage, and structured handoff to human teams.",
    answer: "A production voice agent is more than a prompt. It needs low-latency dialogue, verified business knowledge, CRM state, safe actions, call outcomes, and escalation to a person.",
    outcomes: ["Conversation and escalation design", "Knowledge grounding", "CRM and calendar integration", "Consent and recording controls", "Outcome analytics"],
  },
  "gohighlevel-crm-automation": {
    title: "GoHighLevel CRM Automation Architecture",
    description: "GoHighLevel CRM automation for lead routing, pipeline state, follow-up, appointment operations, data quality, and reliable integrations.",
    answer: "Reliable GoHighLevel automation begins with a clear contact identity, pipeline state model, ownership rules, and safeguards against duplicate or conflicting actions.",
    outcomes: ["CRM state model", "Lead routing and follow-up", "Calendar and communication flows", "Data-quality checks", "Cross-platform synchronization"],
  },
  "ai-sdr-outbound-automation": {
    title: "AI SDR and Outbound Automation Systems",
    description: "Governed outbound systems for research, qualification, personalized messaging, CRM updates, replies, and human sales handoff.",
    answer: "AI SDR automation should improve research and consistency without turning outreach into unreviewed spam. Targeting, evidence, consent, frequency, and human handoff are system requirements.",
    outcomes: ["ICP and qualification logic", "Research workflow", "Message review controls", "Reply classification", "CRM and sales handoff"],
  },
  "content-generation-automation": {
    title: "AI Content Generation and Repurposing Automation",
    seoTitle: "AI Content Automation Systems",
    description: "Evidence-led content automation that turns approved source material into reviewable articles, social posts, video briefs, and distribution workflows.",
    answer: "Useful content automation preserves source evidence, brand voice, editorial review, and a canonical publishing record instead of generating unverified volume.",
    outcomes: ["Source-to-asset workflow", "Editorial checkpoints", "Brand and factual guardrails", "Repurposing formats", "Distribution and performance feedback"],
  },
};

const serviceGuides = {
  "ai-systems-architecture": `<section><h2>Automation governance framework for inspectable AI decisions</h2><p>A governed AI decision engine separates model judgment from permission to act. It records the input and source freshness, policy version, model or rule output, confidence and uncertainty, allowed tools, approval state, side effect, verification result, and final owner. The system should make a refusal or human escalation as observable as a successful automated action.</p>${comparisonTable("Inspectable decision controls", ["Control", "Question answered", "Minimum evidence", "Owner"], [["Input provenance", "What information drove the decision?", "Source, version, freshness, retrieval reference", "Data owner"], ["Policy boundary", "Was this action allowed?", "Policy version, role, permission, risk class", "Business owner"], ["Evaluation", "Was the output good enough?", "Scenario, expected result, actual result, score", "System owner"], ["Human approval", "Who accepted the risky action?", "Preview, approver, time, decision", "Named approver"], ["Execution receipt", "What changed outside the model?", "Tool, request ID, before/after state, verification", "Integration owner"], ["Recovery", "How is a bad outcome contained?", "Checkpoint, retry class, rollback or escalation", "Incident owner"]])}<p>NIST’s voluntary AI Risk Management Framework groups risk activity into govern, map, measure, and manage. Those functions are useful scaffolding; production architecture still requires specific state, permission, evaluation, approval, receipt, and recovery controls for each automated action.</p><p class="source-note"><strong>Primary reference:</strong> <a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</a></p></section>`,
  "gohighlevel-crm-automation": `<section><h2>CRM operations architecture that survives peak demand</h2><p>A CRM integration usually fails under peak load because identity, ordering, rate limits, retries, and ownership were treated as connector settings instead of operating requirements. Define the canonical contact and opportunity state, normalize inbound events, use idempotency keys where possible, queue work that can wait, bound retries, preserve request and record identifiers, and route conflicting state to an owner.</p>${comparisonTable("CRM operating controls", ["Risk", "Control", "Evidence", "Recovery"], [["Duplicate contact or event", "Identity resolution and idempotency", "Source ID, canonical contact, prior action", "Merge, ignore, or review"], ["Out-of-order updates", "Version or state-transition check", "Previous and requested state", "Reject stale event"], ["Rate limit or timeout", "Queue and bounded backoff", "Attempt, response code, request ID", "Retry only safe actions"], ["Partial cross-platform write", "Checkpoint and reconciliation", "Completed side effects and last good state", "Continue or compensate"], ["Credential or permission failure", "Integration identity monitoring", "Connection, scope, affected action", "Stop and re-authorize"], ["Unknown conflict", "Human exception queue", "Record context, trace, recommended next step", "Named owner decides"]])}<p>Peak-hour verification should include bursts, duplicate webhooks, reordered events, expired credentials, slow dependencies, and partial completion. Success is not only throughput: the same business event must produce one intended state change, remain traceable, and reach a recoverable exception path when it cannot complete.</p></section>`,
};

const industries = {
  "online-coaches": {
    title: "AI Automation for Online Coaches and Education Businesses",
    seoTitle: "AI Automation for Online Coaches",
    description: "AI automation architecture for coaching businesses: lead response, qualification, enrollment, client onboarding, delivery support, renewal, and reporting.",
    audience: "coaching programs, cohort businesses, education creators, and expert-led service companies",
    workflows: ["Lead capture, qualification, and appointment routing", "Enrollment and payment-state checks", "Checkpointed student or client onboarding", "Program reminders and support triage", "Renewal risk and outcome reporting"],
    controls: [
      ["Lead capture and qualification", "Contact identity, consent, source, qualification state", "Duplicate contact, missing consent, stale enrichment", "Deduplicate, quarantine uncertain data, and route exceptions before outreach"],
      ["Enrollment and payment", "Payment-provider state, offer, cohort, enrollment owner", "Delayed webhook, chargeback, or mismatched access", "Stop provisioning, reconcile the canonical payment state, then resume from a checkpoint"],
      ["Client or student onboarding", "Enrollment record, required steps, last completed milestone", "Repeated invitations, partial setup, missing prerequisite", "Make steps idempotent, preserve the last good state, and assign an owner"],
      ["Reminders and support", "Active program, schedule, request type, urgency", "Wrong cohort, sensitive request, or reminder after completion", "Suppress unsafe messages and escalate ambiguous or high-impact cases"],
      ["Renewal and outcome reporting", "Named metric, source timestamp, reporting window, account owner", "Stale data, conflicting definitions, or incomplete history", "Label freshness and gaps, reconcile definitions, and require review before action"],
    ],
  },
  "marketing-agencies": {
    title: "AI Automation for Marketing Agencies",
    description: "AI systems for agencies that need dependable lead operations, client onboarding, campaign reporting, content production, and delivery visibility.",
    audience: "performance, creative, growth, and full-service agencies",
    workflows: ["Lead research and CRM routing", "Proposal-to-onboarding handoffs", "Campaign data normalization and reporting", "Content review and repurposing", "Client delivery alerts and exception management"],
    controls: [
      ["Lead research and CRM routing", "Source, contact identity, permission, account and owner", "Duplicate, restricted, stale, or incorrectly matched contact", "Verify permission and identity before creating or updating the canonical CRM record"],
      ["Proposal-to-onboarding handoff", "Approved scope, signature, payment state, delivery owner", "Provisioning starts before commercial or ownership gates are satisfied", "Block the transition until required evidence exists and record the approver"],
      ["Campaign reporting", "Platform, account, attribution window, currency, source timestamp", "API gaps, late conversions, inconsistent attribution, or cross-client data", "Preserve provenance, isolate tenants, label lag, and reconcile before publishing"],
      ["Content production and review", "Approved brief, source material, rights, brand rules, reviewer", "Unsupported claim, wrong client voice, missing rights, or accidental publication", "Keep output in draft, cite evidence, and require deliberate human approval"],
      ["Delivery alerts and exceptions", "Service expectation, severity, last good state, named owner", "Alert fatigue, duplicate notifications, or no accountable responder", "Deduplicate, prioritize by impact, and attach the recovery context to one owner"],
    ],
  },
};

const agenticSystems = [
  {
    name: "Creator Campaign Command",
    art: "creator-campaign-command",
    category: "Multi-agent campaign planning",
    summary: "Five bounded roles turn a campaign objective and budget into an evidence-linked creator plan, then stop before outreach or spend.",
    proof: "LangGraph, FastAPI, 5 roles, 3 scenario shapes, objective-sensitive ranking, approval gate",
    live: "https://creator-campaign-command.vercel.app",
    repo: "https://github.com/syedahmad0786/creator-campaign-command",
  },
  {
    name: "Marketing Revenue Assurance",
    art: "marketing-revenue-assurance",
    category: "Cross-system revenue assurance",
    summary: "Ten bounded specialists reconcile advertising delivery, CRM state, funnel movement, and collected cash, then propose a recovery plan without changing any external system.",
    proof: "LangGraph, FastAPI, 12 of 12 golden scenarios, 31 tests, 81.93 percent coverage, 25 Postman assertions, signed serverless approval receipts, Docker and PostgreSQL acceptance",
    live: "https://marketing-revenue-assurance.vercel.app",
    caseStudy: "https://aixcelsolutions.com/case-studies/marketing-revenue-assurance",
    repo: null,
  },
  {
    name: "Deal Rescue and Forecast Truth",
    art: "deal-rescue-forecast-truth",
    category: "B2B forecast control",
    summary: "Twelve bounded stages compare seller confidence with exact buyer language, stakeholder coverage, and dated commitments, then stop at a sales manager decision.",
    proof: "LangGraph, FastAPI, 12 of 12 golden deal states, 53 tests, 83.97 percent coverage, 28 live Postman assertions, PostgreSQL checkpoint restart proof, 0 external mutations",
    live: "https://deal-rescue-forecast-truth.vercel.app",
    caseStudy: "https://aixcelsolutions.com/case-studies/deal-rescue-forecast-truth",
    repo: null,
  },
  {
    name: "Creative Learning OS",
    art: "creative-learning-os",
    category: "Creative measurement and learning",
    summary: "Eleven bounded stages separate attributable creative signal from sample, audience, placement, funnel, lag, fatigue, and data-quality confounds, then stop before publishing or changing spend.",
    proof: "LangGraph, FastAPI, 13 of 13 golden scenarios, 68 tests, 82.76 percent coverage, 18 evaluation measures, 34 production Postman assertions, PostgreSQL checkpoint restart proof, 0 platform mutations",
    live: "https://creative-learning-os.vercel.app",
    caseStudy: "https://aixcelsolutions.com/case-studies/creative-learning-os",
    repo: null,
  },
  {
    name: "LanguageMix Studio",
    art: "language-mix-studio",
    category: "Multilingual content operations",
    summary: "Timed English scripts become distinct Urdu, Roman Urdu, or Arabic review packages with voice register, safety checks, and native-language approval.",
    proof: "FastAPI, 3 source scenarios, 3 locale routes, 3 registers, 27 meaningful combinations",
    live: "https://language-mix-studio.vercel.app",
    repo: "https://github.com/syedahmad0786/language-mix-studio",
  },
  {
    name: "Agentic Systems Evaluation Lab",
    art: "agentic-systems-evaluation-lab",
    category: "Independent evaluation",
    summary: "A live black-box evaluator tests deployed systems for contracts, evidence, approval gates, boundaries, idempotency, and latency.",
    proof: "3 target systems, 7 weighted checks, 4 baseline and fault scenarios, arbitrary URLs blocked",
    live: "https://agentic-systems-evaluation-lab.vercel.app",
    repo: "https://github.com/syedahmad0786/agentic-systems-evaluation-lab",
  },
  {
    name: "Content Performance Forecaster",
    art: "content-performance-forecaster",
    category: "Pre-publish decision support",
    summary: "A reproducible historical baseline returns forecast ranges, confidence, cohort fallback, and input sensitivity before publication.",
    proof: "500 licensed records, 400 training rows, 100 holdout rows, versioned ridge models, no LLM claim",
    live: "https://content-performance-forecaster.vercel.app",
    repo: "https://github.com/syedahmad0786/content-performance-forecaster",
  },
  {
    name: "Revenue Signal Graph",
    art: "revenue-signal-graph",
    category: "Governed revenue operations",
    summary: "Seven bounded agents convert fragmented account evidence into an explainable qualification, speed-to-lead decision, and human-reviewed action proposal.",
    proof: "LangGraph, FastAPI, PostgreSQL path, 12 of 12 golden scenarios, 31 tests, 85.30 percent coverage, 18 Postman assertions, $0 replay inference",
    live: "https://revenue-signal-graph.vercel.app",
    repo: null,
  },
  {
    name: "Creator & Talent Campaign OS",
    art: "creator-talent-campaign-os",
    category: "Creator and talent campaign control",
    summary: "Twelve bounded stages test audience authenticity, campaign fit, conflicts, rights, safety, historical evidence, budget, and concentration, then stop at a campaign manager decision.",
    proof: "LangGraph, FastAPI, 13 of 13 golden scenarios, 70 tests, 85.38 percent coverage, 18 evaluation measures, 34 production Postman assertions, PostgreSQL checkpoint restart proof, 0 external writes",
    live: "https://creator-talent-campaign-os.vercel.app",
    caseStudy: "https://aixcelsolutions.com/case-studies/creator-talent-campaign-os",
    repo: null,
  },
  {
    name: "Agentic Systems Gateway",
    art: "agentic-systems-gateway",
    category: "Governed model access and release evidence",
    summary: "A deterministic policy gateway gives nine deployed systems free replay, visitor-owned NVIDIA NIM or OpenRouter access, signed receipts, and an evidence-qualified evaluation registry without exposing an owner-funded model key.",
    proof: "FastAPI, fixed provider allowlist, HMAC receipts, 85 tests, 18 of 18 evaluation measures, 40 production Postman assertions, PostgreSQL restart proof, persistent themes, 0 production 5xx",
    live: "https://agentic-systems-gateway.vercel.app",
    caseStudy: "https://aixcelsolutions.com/case-studies/agentic-systems-gateway",
    repo: null,
  },
];

function routeIntro(eyebrow, title, description) {
  return `<section class="route-intro"><span class="eyebrow">${escapeHtml(eyebrow)}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></section>`;
}

function routeFooter() {
  return `<footer class="route-footer"><div><b>Ahmad Bukhari</b><span>Agentic AI &amp; LLM Systems Specialist · Islamabad · working globally</span></div><nav aria-label="Footer"><a href="/agentic-systems">Agentic systems</a><a href="/work">Systems</a><a href="/services">Consulting</a><a href="/blog">Research &amp; findings</a><a href="https://aixcelsolutions.com">Aixcel Solutions</a><a href="https://manhaj.ahmadbukhari.com">MANHAJ</a><a href="${bookingUrl}">Book a call ↗</a></nav></footer>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function comparisonTable(caption, headers, rows) {
  return `<div class="comparison-table-wrap"><table><caption>${escapeHtml(caption)}</caption><thead><tr>${headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function faqSection(faqs) {
  if (!faqs?.length) return "";
  return `<section class="faq-section"><h2>Frequently asked questions</h2>${faqs.map(({ question, answer }) => `<div class="faq-item"><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></div>`).join("")}</section>`;
}

function serviceFaqs(service) {
  return [
    {
      question: `What does ${service.title} deliver?`,
      answer: `Typical outputs include ${service.outcomes.join(", ").toLowerCase()}. The exact scope is defined around the operating problem, constraints, owners, and evidence required for a successful handover.`,
    },
    {
      question: "How does the engagement start?",
      answer: "The work starts by mapping the current business state, actors, data, failure points, and expensive exceptions. Architecture and a phased delivery plan come before tool selection or automated action.",
    },
    {
      question: "How are risk and human approval handled?",
      answer: "Every proposed action receives an owner, permission boundary, evidence requirement, recovery path, and measurable outcome. Sensitive or irreversible decisions remain behind an explicit human approval or escalation step.",
    },
    {
      question: "Who leads delivery?",
      answer: "Ahmad Bukhari leads architecture and systems thinking. Aixcel Solutions supports implementation and integration, while MANHAJ provides the governed delivery model for private AI operating systems.",
    },
  ];
}

function industryFaqs(industry) {
  return [
    {
      question: `Where should ${industry.audience} start with AI automation?`,
      answer: `Start with a workflow where state, ownership, and failure cost can be measured. Common candidates include ${industry.workflows.slice(0, 3).join(", ").toLowerCase()}.`,
    },
    {
      question: "How is automation kept reliable?",
      answer: "The architecture uses a canonical record, explicit ownership, idempotent actions where possible, checkpoints, escalation, and an audit trail. Recovery and human handoff are designed before automation is released.",
    },
    {
      question: "What is reviewed before implementation?",
      answer: "The operating audit reviews where data enters, how business state changes, which decisions require permission, which failures are expensive, and what evidence will prove the workflow is working.",
    },
  ];
}

const agencyGuideFaqs = [
  {
    question: "What is the clearest warning sign when choosing an AI automation agency?",
    answer: "Be cautious when a provider starts with a tool or demo before diagnosing the operating problem, cannot explain the system boundary, or promises fully autonomous results without recovery and human-control paths.",
  },
  {
    question: "Should every AI workflow be fully autonomous?",
    answer: "No. Autonomy should be limited by the reversibility and risk of each action. Sensitive decisions, uncertain model outputs, and expensive exceptions should stop for human approval or escalation.",
  },
  {
    question: "What evidence should a buyer request before signing?",
    answer: "Ask for working repositories or demos, sanitized architecture, test scenarios, evaluation results, failure-path evidence, ownership terms, and documentation that clearly labels what is live, illustrative, anonymized, or still in development.",
  },
];

const servicesIndexFaqs = [
  {
    question: "Which AI consulting service should a team start with?",
    answer: "Start with the operational problem rather than a service label. A focused operating audit identifies the state, owners, data, failure cost, and controls, then maps the work to architecture, automation, CRM, voice, outbound, or content capabilities.",
  },
  {
    question: "Why are fixed package prices not published?",
    answer: "The cost depends on the number of systems, integrations, permissions, failure paths, evidence requirements, and handover scope. After the operating audit, the proposed work should state its boundaries, delivery phases, ownership, and price before implementation begins.",
  },
  {
    question: "Can an engagement stop after architecture?",
    answer: "Yes. A team can use the system blueprint, risk boundaries, acceptance tests, and delivery plan with its own implementation team. Continuing into build and integration is a separate decision.",
  },
];

const workIndexFaqs = [
  {
    question: "What counts as evidence in these AI system case studies?",
    answer: "Each record labels whether evidence is a public deployment, public repository, private implementation, anonymized architecture, documented project scope, or self-reported history. Those labels are not interchangeable.",
  },
  {
    question: "Do the case studies claim client results?",
    answer: "Only when a result has an attributable source, measurement definition, method, and time window. Architecture records without that evidence describe the system pattern and its limits instead of presenting unverified ROI.",
  },
  {
    question: "How should a similar system be evaluated?",
    answer: "Evaluate its state model, permissions, failure recovery, human handoff, observability, acceptance tests, ownership, and evidence—not only its happy-path demo.",
  },
];

const automationLabFaqs = [
  {
    question: "Does the automation lab use live customer data?",
    answer: "No. It uses invented records and mock failure states. It does not contain client identities, credentials, production endpoints, or live write tools.",
  },
  {
    question: "What does the simulator test?",
    answer: "It tests happy-path handling, duplicate identity, unavailable calendars, payment gates, webhook timeouts, checkpoints, recovery, and the context provided to a human operator.",
  },
  {
    question: "What does a successful run prove?",
    answer: "It proves the public simulator follows its documented state and recovery rules. It does not prove an undisclosed client deployment, business result, or production integration.",
  },
];

const aboutFaqs = [
  {
    question: "What does Ahmad Bukhari specialize in?",
    answer: "Ahmad specializes in agentic AI and LLM systems, automation architecture, CRM operations, workflow reliability, human approval, observability, recovery, and product delivery infrastructure.",
  },
  {
    question: "How is the work delivered?",
    answer: "Ahmad leads architecture and systems thinking. Aixcel Solutions supports implementation and integration, while MANHAJ provides a governed model for private AI operating systems.",
  },
  {
    question: "Where can the work be verified?",
    answer: "Use the public agentic systems library, evidence-labeled case studies, linked GitHub repositories, and the automation reliability lab. Each surface states what is live, public, private, anonymized, or still in development.",
  },
];

const contactFaqs = [
  {
    question: "What should I bring to the first systems call?",
    answer: "Bring the current workflow, where state lives, the expensive failure points, who owns each decision, the systems involved, and the outcome that would make the work worthwhile.",
  },
  {
    question: "What should not be sent before the call?",
    answer: "Do not send passwords, API keys, customer exports, health information, financial account data, or other sensitive records. A sanitized workflow description is enough for initial discovery.",
  },
  {
    question: "What happens after discovery?",
    answer: "The next step is a written boundary: the problem, actors, data, permissions, failure paths, evidence, proposed phases, ownership, and the decision to stop, prototype, or proceed.",
  },
];

const blogIndexFaqs = [
  {
    question: "How are research topics selected?",
    answer: "Topics are selected for their operational consequences: what a team should deploy, delay, govern, measure, or verify. Product announcements without a business decision are not enough.",
  },
  {
    question: "How is freshness handled?",
    answer: "Current findings are dated and linked to their canonical publisher. Legacy articles stay excluded from indexing until product capabilities, pricing, examples, and claims complete a new source review.",
  },
  {
    question: "Are the articles implementation guarantees?",
    answer: "No. They are evidence-led analysis and buyer guidance. Implementation scope and risk depend on the organization, data, permissions, integrations, and operating environment.",
  },
];

const automationGovernanceFaqs = [
  {
    question: "What is automation governance?",
    answer: "Automation governance is the operating system around automated decisions: who may act, which state may change, what evidence is required, where a person approves or stops the work, and how the system recovers when it cannot continue safely.",
  },
  {
    question: "Who owns an automated failure?",
    answer: "Every failure class needs a named owner and a safe default. Transient, repeat-safe failures may receive bounded retries; state conflicts, permission failures, uncertain writes, and high-impact exceptions should stop and route the current evidence to a person.",
  },
  {
    question: "Is this guide evidence of a client result?",
    answer: "No. It documents a practitioner framework and links to public architecture examples and primary references. It does not claim client adoption, savings, revenue, satisfaction, or an attributable implementation outcome.",
  },
];

const portfolioIndexFaqs = [
  {
    question: "Why are some portfolio records archived?",
    answer: "The original records contain owner-supplied summaries or quantitative claims that have not yet been paired with a supporting artifact, measurement definition, method, and time window for this publication.",
  },
  {
    question: "Where is the current evidence-led portfolio?",
    answer: "Use Selected Systems and the Agentic Systems library. Those pages label public demos, repositories, private implementations, anonymized architecture, documented scope, and evidence limits.",
  },
  {
    question: "Does an archived title verify the original result?",
    answer: "No. A descriptive title identifies the type of project record. It is not a testimonial, endorsement, independently verified outcome, forecast, or guarantee.",
  },
];

function caseFaqs(item, slug) {
  const topicQuestion = {
    errorlens: "How should workflow errors be classified before recovery?",
    "migration-factory": "How is parity verified during a workflow migration?",
    "enterprise-os": "What governance controls belong in product delivery infrastructure?",
  }[slug] || `How should the ${item.shortTitle} pattern be evaluated?`;
  const topicAnswer = {
    errorlens: "Classify errors by cause, reversibility, retry safety, business impact, and the evidence available. Retry only transient failures that are safe to repeat; quarantine or escalate conflicts, invalid state, and uncertain actions.",
    "migration-factory": "Capture the current inputs, outputs, side effects, timing, credentials, errors, and exceptions; rebuild by workflow family; then compare expected and actual behavior with copied or synthetic data before cutover.",
    "enterprise-os": "Use explicit state transitions, role and permission checks, approval gates, financial dependencies, release evidence, observability, and a named owner for every exception path.",
  }[slug] || "Evaluate the state model, permissions, failure recovery, human handoff, observability, evidence, acceptance tests, and ownership transfer rather than relying on a happy-path demonstration.";
  return [
    { question: topicQuestion, answer: topicAnswer },
    { question: "Is this page proof of a client result?", answer: "No unless the page explicitly provides an attributable source, measurement definition, method, and time window. Otherwise it documents an architecture pattern, scope, public proof, or stated evidence limit." },
    { question: "What should be verified before production use?", answer: "Verify permissions, data boundaries, idempotency, retries, checkpoints, observability, human escalation, acceptance tests, rollback, and the operator documentation needed to recover the system." },
  ];
}

const caseGuides = {
  errorlens: `<section><h2>How to classify and recover workflow errors</h2><p>Start by separating transient infrastructure failures from invalid data, authentication problems, business-rule conflicts, duplicate events, and unknown failures. A timeout may be safe to retry when the action is idempotent. A payment-state conflict, permission failure, or uncertain write should stop. The recovery decision must use the error class, current business state, previous attempts, side-effect risk, and owner—not the error message alone.</p>${comparisonTable("Workflow error classes and safe recovery decisions", ["Error class", "Typical signal", "Safe default", "Evidence to retain"], [["Transient dependency", "Timeout, temporary 5xx, rate limit", "Bounded retry with backoff", "Attempt count, dependency, request ID"], ["Invalid input", "Schema or validation failure", "Quarantine and correct", "Rejected field, source record, validation rule"], ["State conflict", "Duplicate, stale version, illegal transition", "Stop and reconcile", "Canonical state, competing event, owner"], ["Permission or authentication", "401, 403, expired credential", "Stop and escalate", "Integration identity and affected action"], ["Unknown or high-impact", "Unclassified failure or irreversible write", "Human decision", "Payload reference, logs, trace, last good state"]])}</section><section><h2>What an operator needs to recover the system</h2><p>An alert should identify the workflow, canonical record, last good state, failed step, normalized error class, attempt history, side effects already completed, current owner, and next safe action. Logs without business state force a person to reconstruct the incident. Business state without trace and request identifiers makes the technical cause difficult to verify.</p><p>Platform handlers are useful building blocks, not a complete operating model. Make documents skip, retry, resume, commit, and rollback handlers; OpenTelemetry documents traces, metrics, and logs as observability signals. The architecture still has to decide which recovery is safe for the specific business action.</p><p class="source-note"><strong>Primary references:</strong> <a href="https://help.make.com/error-handlers">Make error handlers</a> · <a href="https://opentelemetry.io/docs/concepts/observability-primer/">OpenTelemetry observability primer</a></p></section>`,
  "migration-factory": `<section><h2>Why workflow migrations break after the tool switch</h2><p>A migration fails when the team copies nodes but not behavior. The hidden contract includes trigger timing, field mapping, credentials, retries, ordering, duplicate handling, rate limits, partial writes, operator alerts, and downstream expectations. Inventory those contracts first, group workflows into reusable families, and separate business rules from platform-specific implementation before rebuilding.</p>${comparisonTable("Make and n8n migration questions—not a universal winner", ["Decision area", "What to inspect in Make", "What to inspect in n8n", "Migration acceptance"], [["Execution state", "Incomplete executions and scenario history", "Execution data, error workflows, and persistence", "A failed run can be found and safely resumed"], ["Error handling", "Handler routes and retry directives", "Error workflows, node behavior, and retry design", "Each error class reaches the intended recovery path"], ["Reusable structure", "Templates, subscenarios, and shared data", "Sub-workflows, credentials, and environment configuration", "One family pattern replaces repeated one-off logic"], ["Scale and ordering", "Scheduling, webhooks, and sequential processing", "Concurrency, queue mode, workers, and database state", "Load and ordering tests match the operating requirement"], ["Ownership", "Organization, connections, and documentation", "Instance, source, credentials, and runbooks", "The client can operate, change, and roll back the system"]])}</section><section><h2>Parity before cutover</h2><p>Run the old and new workflow against copied or synthetic cases and compare outputs, side effects, timing, error paths, and operator alerts. Include duplicates, missing fields, expired credentials, timeouts, rate limits, and partial completion. Cut over by family only when the acceptance evidence is recorded; keep a rollback path until the new execution history is stable.</p></section>`,
  "enterprise-os": `<section><h2>What product delivery infrastructure actually controls</h2><p>Product delivery infrastructure is the operating layer connecting intake, identity, permissions, work state, quality evidence, release decisions, finance dependencies, and observability. A pipeline lacks governance when actions can advance without a named owner, allowed transition, supporting evidence, or recovery path. The answer is not another dashboard; it is a controlled state model shared by the systems that change delivery.</p>${comparisonTable("Governance controls for product delivery", ["Control", "Decision it protects", "Required evidence", "Failure response"], [["Identity and role", "Who may act", "Actor, role, tenant, permission", "Deny and record"], ["State transition", "Whether work may advance", "Current state, requested transition, invariant", "Reject or route exception"], ["Quality gate", "Whether output meets acceptance", "Test result, reviewer, artifact", "Hold release"], ["Financial dependency", "Whether delivery and billing states agree", "Invoice or payment state and owner", "Separate states and escalate"], ["Release receipt", "What changed and why", "Version, approver, deployment, verification", "Rollback or remediate"]])}</section><section><h2>How governance is evaluated</h2><p>Test the state machine with valid and invalid transitions, least-privilege roles, duplicate events, delayed financial updates, failed deployments, missing evidence, and a human override. The audit trail must answer who requested an action, what policy allowed it, which evidence supported it, what changed, and whether the result was verified. NIST’s voluntary AI Risk Management Framework organizes risk work around govern, map, measure, and manage; an implementation still needs concrete controls for its own operating context.</p><p class="source-note"><strong>Primary reference:</strong> <a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</a></p></section>`,
};

function casePage(item, slug) {
  const artwork = caseArtwork[slug];
  const faqs = caseFaqs(item, slug);
  const leadArtwork = `<figure class="case-system-art"><picture><source media="(max-width: 800px)" srcset="/art/systems/${artwork.file}-800x500.webp"><img src="/art/systems/${artwork.file}-1200x750.webp" srcset="/art/systems/${artwork.file}-800x500.webp 800w, /art/systems/${artwork.file}-1200x750.webp 1200w" sizes="(max-width: 960px) calc(100vw - 2.5rem), 58rem" width="1200" height="750" loading="lazy" decoding="async" alt="${escapeHtml(artwork.alt)}"></picture><figcaption>${escapeHtml(artwork.alt)}</figcaption></figure>`;
  return `<main id="main" class="route-page">${routeIntro(item.eyebrow, item.title, item.description)}<article class="case-page content-shell">${leadArtwork}<section><span class="dialog-label">Direct answer</span><p class="content-lead">${escapeHtml(item.description)}</p></section><section><h2>The operational problem</h2><p>${escapeHtml(item.problem)}</p></section><section><h2>System architecture</h2><ol class="architecture-list">${item.architecture.map((step, index) => `<li><b>${String(index + 1).padStart(2, "0")}</b><span>${escapeHtml(step)}</span></li>`).join("")}</ol></section><section><h2>Key design decisions</h2>${list(item.decisions)}</section><section><h2>How the pattern is operated</h2><p>The operating model begins with a canonical record and explicit state. Every automated action needs an owner, permission boundary, idempotency or duplicate strategy, observable result, and recovery path. A checkpoint records the last good state before a side effect. When the system cannot prove that continuing is safe, it stops and gives a person the evidence needed to decide.</p></section><section><h2>Verification checklist</h2>${list(["Test the happy path and each documented failure state with copied or synthetic data.", "Confirm that retries cannot repeat an unsafe or irreversible action.", "Trace the actor, input, state transition, side effect, and verification result.", "Exercise human escalation, rollback, and operator handover before release."])}</section>${caseGuides[slug] || ""}<section><h2>Evidence and limits</h2><p>${escapeHtml(item.evidence)}</p></section>${faqSection(faqs)}<aside class="answer-card"><h2>Need a related AI system?</h2><p>Bring the workflow, constraints, failure points, and desired outcome. The first call maps the safest useful move.</p><a class="button button-primary" href="${bookingUrl}">Book a 25 minute systems call <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function agenticSystemsPage() {
  const cards = agenticSystems.map((system, index) => `<article><img class="system-card-art" src="/art/linkedin/${system.art}.png" alt="${escapeHtml(system.name)} project visual" width="1080" height="1350" loading="lazy" decoding="async"><span>${String(index + 1).padStart(2, "0")} / ${escapeHtml(system.category)} · Public demo</span><h2>${escapeHtml(system.name)}</h2><p>${escapeHtml(system.summary)}</p><p><strong>Proof:</strong> ${escapeHtml(system.proof)}</p><a class="button button-primary" href="${system.live}" target="_blank" rel="noopener noreferrer">Open live system <span>↗</span></a>${system.caseStudy ? ` <a class="button button-ghost" href="${system.caseStudy}" target="_blank" rel="noopener noreferrer">Read technical brief <span>↗</span></a>` : ""}${system.repo ? ` <a class="button button-ghost" href="${system.repo}" target="_blank" rel="noopener noreferrer">Inspect GitHub <span>↗</span></a>` : `<p><strong>Source:</strong> Private implementation repository</p>`}</article>`).join("");
  return `<main id="main" class="route-page">${routeIntro("Ten flagship systems / Verified public demos", "Agentic AI & LLM Systems Specialist", "A production-minded revenue and creator operations portfolio proving controlled multi-agent orchestration, evidence, typed APIs, human approval, evaluation, observability, replay, and cloud deployment.")}<section class="content-shell"><div class="answer-card"><h2>Positioning backed by working systems</h2><p>Python foundations with AI-assisted development across FastAPI APIs, LangGraph workflows, deterministic decision systems, data processing, and automated testing.</p><p>The controls are real: campaign objective, attribution window, source freshness, cash reconciliation, buyer language, stakeholder coverage, creative test validity, conversion lag, audience authenticity, rights, conflicts, budget concentration, locale, register, fault scenario, forecast inputs, consent, and speed-to-lead timing each change the computed output. Each project links to its live system, states whether the implementation repository is public or private, and publishes the architecture, API contract, evaluation evidence, and operating limits.</p></div><div class="content-grid">${cards}</div></section><article class="content-shell case-page"><section><h2>Stack demonstrated in the deployed systems</h2>${list(["Python 3.12, FastAPI, Pydantic v2, REST and generated OpenAPI", "LangGraph for explicit state, interruption, approval, and resumption, with deterministic rules for scoring, evidence, limits, and safety", "Postman collections, Pytest, GitHub Actions, Playwright and Vercel deployment", "OpenTelemetry traces, Prometheus metrics, structured JSON logs, evidence records, latency, usage and approval state", "Black-box evaluation with fault injection, idempotency checks, replay mode, uncertainty and input sensitivity"] )}</section><section><h2>What the public proof does not claim</h2><p>These verified portfolio deployments use synthetic or licensed public records. They do not use client credentials, private records, patient health information, live publishing, ad spend, messaging, or CRM write tools. LangChain, CrewAI, MCP, RAG, Kubernetes, Langfuse, LangSmith, and Sentry are not claimed as connected runtime components where they are not deployed.</p></section><aside class="answer-card"><h2>Verification status</h2><p>The earlier creator operations systems and the independent evaluation lab passed their published checks on 5 August 2026. Revenue Signal Graph passed 31 automated tests, 12 golden scenarios, 85.30 percent measured coverage, 18 external Postman assertions, PostgreSQL container acceptance, and four public browser journeys on 10 August 2026. Marketing Revenue Assurance passed 31 automated tests, 12 golden scenarios, 81.93 percent measured coverage, 25 Postman assertions, two independent Docker and PostgreSQL CI paths, cross-instance signed-receipt approval checks, and public browser journeys on 10 August 2026. Deal Rescue and Forecast Truth passed 53 automated tests, 12 golden deal states, 15 evaluation dimensions, 83.97 percent measured coverage, 28 live Postman assertions, PostgreSQL checkpoint restart proof, and a public input-sensitivity journey that changed Commit at 0 risk to Omitted at 100 risk. Creative Learning OS passed 68 automated tests, 13 golden creative-learning scenarios, 18 evaluation measures, 82.76 percent measured coverage, 34 production Postman assertions, PostgreSQL checkpoint recovery, and a public browser journey that changed Scale at positive conversion evidence to Hold when conversion evidence was removed. Creator & Talent Campaign OS passed 70 automated tests, 13 golden roster scenarios, 18 evaluation measures, 85.38 percent measured coverage, 34 production Postman assertions, PostgreSQL checkpoint restart proof, and a public browser journey that changed Ready For Review with 4 creators to Hold with 3 creators after authenticity and fee evidence changed. Agentic Systems Gateway passed 85 automated tests, 18 of 18 release evaluation measures, 40 production Postman assertions, Docker and PostgreSQL receipt restart proof, persistent desktop and mobile themes, rendered seven OpenAPI routes, and produced zero production 5xx responses during verified journeys on 11 August 2026.</p><a class="button button-primary" href="https://github.com/syedahmad0786" target="_blank" rel="noopener noreferrer">Review the public source repositories <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function servicesIndex() {
  return `<main id="main" class="route-page">${routeIntro("AI consulting / Capabilities", "AI systems and automation consulting", "Architecture-led consulting for organizations that need AI, CRM, automation, and human operations to work as one dependable system.")}<section class="content-shell"><div class="answer-card"><h2>What I help build</h2><p>I diagnose operational friction, define the system boundary, and design the data, state, agents, controls, integrations, observability, and human handoffs needed for production. Delivery can continue through Aixcel Solutions and the MANHAJ operating model.</p></div><section class="prose-page compact-prose"><h2>How an engagement is scoped</h2><p>Scope follows operating risk rather than a fixed tool package. The first decision is whether the problem needs a workflow repair, a bounded automation, a CRM state redesign, an AI decision system, or no automation at all. The written plan identifies what is included, what remains human, which accounts and data the client owns, and the evidence required before release.</p>${comparisonTable("Engagement phases and decision gates", ["Phase", "Output", "Decision gate"], [["Operating audit", "Current state, owners, failure cost, data and constraints", "Is the problem worth solving?"], ["System blueprint", "Boundary, state model, permissions, integrations and acceptance tests", "Is the proposed system safe and useful?"], ["Prototype or build", "Controlled implementation on copied or approved data", "Does behavior match the blueprint?"], ["Verification", "Failure tests, observability, security, handover and release evidence", "Is production release approved?"], ["Operate and improve", "Monitored outcomes, incidents, changes and audit receipts", "Should the system continue, change, or stop?"]])}<h2>How pricing becomes transparent</h2><p>Fixed public package prices would imply that every workflow has the same integrations, permissions, failure paths, and handover burden. Instead, the proposal should state the priced scope after the operating audit: phases, deliverables, assumptions, exclusions, client-owned costs, ownership, acceptance criteria, and change process. No implementation begins from an open-ended estimate.</p></section><div class="content-grid">${Object.entries(services).map(([slug, service]) => `<article><span>Capability</span><h2><a href="/services/${slug}">${escapeHtml(service.title)}</a></h2><p>${escapeHtml(service.description)}</p><a class="text-link dark-link" href="/services/${slug}">Explore the approach <span>↗</span></a></article>`).join("")}</div>${faqSection(servicesIndexFaqs)}</section>${routeFooter()}</main>`;
}

function servicePage(service, faqs, slug) {
  return `<main id="main" class="route-page">${routeIntro("AI consulting / Specialist capability", service.title, service.description)}<article class="content-shell prose-page"><section class="answer-card"><h2>What does this service do?</h2><p>${escapeHtml(service.answer)}</p></section><section><h2>Typical engagement outputs</h2>${list(service.outcomes)}</section><section><h2>How the work is approached</h2><p>The engagement starts with the business state, actors, evidence, and exceptions. Architecture comes before tool selection. Every proposed automated action receives an owner, permission boundary, recovery path, and measurable outcome.</p></section><section><h2>What makes the approach different?</h2><p>The work is designed from the operator’s failure path backward. A proposal must identify the canonical state, the person responsible for exceptions, the evidence that permits each action, and how the team regains control. Public proof is labeled by evidence level; unverified testimonials, ROI, “first,” and “only” claims are not substituted for working systems or acceptance tests.</p></section><section><h2>How scope and pricing work</h2><p>The initial audit defines the system boundary, integrations, permissions, risks, phases, acceptance criteria, ownership, and exclusions. A written scope and price follow that boundary. No fixed package or result is invented before the operating problem is understood, and a client can stop after architecture instead of committing to implementation.</p></section>${serviceGuides[slug] || ""}<section><h2>How can the work be verified?</h2><p>Review the <a href="/agentic-systems">deployed agentic systems</a>, <a href="/work">evidence-led case studies</a>, and linked public repositories. Each record states its evidence level and limits rather than presenting unverified ROI or client claims.</p></section><section><h2>Who delivers the system?</h2><p>Ahmad Bukhari leads architecture and systems thinking. <a href="https://aixcelsolutions.com">Aixcel Solutions</a> is the services company, and <a href="https://manhaj.ahmadbukhari.com">MANHAJ</a> is the governed delivery model for private AI operating systems.</p></section>${faqSection(faqs)}<aside class="answer-card"><h2>Discuss the workflow</h2><p>Share the current process, the breakpoints, and the outcome that matters.</p><a class="button button-primary" href="${bookingUrl}">Book a 25 minute call <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function industriesPage(industry, faqs) {
  return `<main id="main" class="route-page">${routeIntro("Industry systems", industry.title, industry.description)}<article class="content-shell prose-page"><section class="answer-card"><h2>Where AI automation helps</h2><p>For ${escapeHtml(industry.audience)}, the highest-value automation usually connects revenue, delivery, and customer state. It should remove repeatable coordination while keeping people in control of sensitive decisions.</p></section><section><h2>Systems commonly designed</h2>${list(industry.workflows)}</section><section><h2>Operating risks and controls</h2><p>An industry workflow becomes dependable when every automated step reads an explicit business state and preserves the evidence used to change it. The system should not infer payment, consent, ownership, approval, or completion from a convenient field when a canonical source exists.</p>${comparisonTable("Industry workflow controls", ["Workflow", "Canonical evidence", "Failure to test", "Safe response"], industry.controls)}<p>Acceptance testing should include duplicates, missing fields, delayed events, expired credentials, rate limits, partial completion, cross-account access attempts, and a human override. The intended result is not zero exceptions; it is an exception path that stops safely, identifies the owner, and retains enough context to recover.</p></section><section><h2>What should remain human?</h2><p>People should retain final control over sensitive outreach, contractual or financial exceptions, access changes, unsupported claims, customer-impacting decisions, and any action whose side effects cannot be safely repeated. Automation can prepare evidence and a recommended next step, but uncertainty must stay visible to the reviewer.</p></section><section><h2>What makes the architecture dependable?</h2><p>Each workflow needs a canonical record, explicit ownership, idempotent actions where possible, checkpoints, escalation, and an audit trail. Those controls matter more than the number of automations deployed.</p></section><section><h2>How can the approach be verified?</h2><p>Inspect the <a href="/agentic-systems">deployed systems</a> and <a href="/work">evidence-led case studies</a>. The public records identify what is live, anonymized, documented scope, private, or still in progress.</p></section>${faqSection(faqs)}<section><h2>Start with an operating audit</h2><p>The first step maps where data enters, how state changes, which failures are expensive, and what a successful human handoff looks like.</p><a class="button button-primary" href="${bookingUrl}">Book a systems call <span>↗</span></a></section></article>${routeFooter()}</main>`;
}

function automationLabPage() {
  return `<main id="main" class="route-page">${routeIntro("Automation lab / Interactive proof", "Stress the AI automation—not just the diagram", "Run mock failure scenarios and inspect how resilient automation handles duplicate records, unavailable services, payment gates, retries, escalation, and human handoff.")}${labSections}<article class="content-shell prose-page"><section class="answer-card"><h2>What the lab demonstrates</h2><p>The simulator makes workflow state and recovery visible. A scenario moves through intake, identity, provisioning, verification, and handoff while the event log records what the system decided. The useful evidence is not that the animation completes; it is whether a duplicate, unavailable dependency, pending payment, or timeout reaches the documented safe state.</p></section><section><h2>How to read a run</h2><p>Follow the canonical record through each checkpoint. Confirm which steps completed, which side effects remain safe to repeat, why the system stopped, and whether the next action belongs to automation or a person. A reliable implementation should preserve the same information in production logs and operator views: record identity, last good state, normalized error, attempt history, owner, and next safe action.</p></section><section><h2>Evidence boundary</h2><p>The lab uses mock data and local rules. It is evidence of the public failure-state design, not a claim that a client deployment, live CRM, payment system, calendar, or customer record participated in the run. Production acceptance would additionally require authenticated integrations, security review, load behavior, recovery exercises, and owner sign-off.</p></section>${faqSection(automationLabFaqs)}</article>${routeFooter()}</main>`;
}

function aboutPage() {
  return `<main id="main" class="route-page">${routeIntro("About / Operator-led architecture", "The operator inside the AI system", "Years inside sales, client delivery, training, CRM operations, and operational handoffs shape how Ahmad Bukhari designs AI systems people can actually operate.")}${aboutSection}<article class="content-shell prose-page"><section><h2>Working principles</h2><p>The work starts with the business state, the people responsible for it, and the exceptions that make the process expensive. Architecture comes before tool selection. Sensitive actions keep an explicit human approval path; recoverable failures receive checkpoints and bounded retries; every production change needs evidence and an owner.</p></section><section><h2>How experience is represented</h2><p>Public pages distinguish career history, self-reported operating evidence, private implementations, anonymized architecture, public repositories, and live demonstrations. Those labels prevent a private build or historical responsibility from being presented as a public client endorsement, independently measured result, or current production deployment.</p></section>${faqSection(aboutFaqs)}</article>${routeFooter()}</main>`;
}

function contactPage() {
  return `<main id="main" class="route-page">${routeIntro("Contact / Focused discovery", "Bring the messy operational part", "Share the workflow, failure points, constraints, and desired outcome. The first call maps the safest useful move.")}<article class="content-shell prose-page"><section class="answer-card"><h2>What to include in the operating brief</h2><p>Describe where the workflow begins, which systems and teams touch it, where the canonical record lives, what breaks, how often the exception matters, and what outcome would justify change. A sanitized diagram, sample field list, or written sequence is useful. Credentials and customer exports are not.</p></section><section><h2>What the first call should produce</h2><p>The purpose is not to force a build. The call should identify the problem boundary, actors, data, permissions, failure cost, evidence, and the smallest safe next step. That may be a diagnostic, architecture blueprint, controlled prototype, implementation phase, or a decision not to automate.</p></section><section><h2>Security before access</h2><p>Do not send passwords, API keys, tokens, private customer data, health information, or financial account details. If implementation proceeds, access should use client-owned accounts, least-privilege roles, an agreed secret-sharing method, and a record of who approved each external write.</p></section>${faqSection(contactFaqs)}</article>${contactSection}</main>`;
}

function blogIndex() {
  return `<main id="main" class="route-page">${routeIntro("Research & findings / Dated and evidence-led", "AI research translated into business decisions", "Current papers, releases, and operating lessons—explained in plain English, dated clearly, and linked to their canonical publisher.")}<section class="content-shell research-hub"><section class="answer-card"><h2>TL;DR: research should change an operating decision</h2><p>This library translates current AI papers, product releases, and system lessons into a practical decision: what to deploy, delay, govern, measure, or verify. Every current item is dated and linked to its canonical publisher. Older material is excluded from search until claims, capabilities, examples, and pricing complete a fresh source review.</p></section><section class="prose-page compact-prose"><h2>How findings are evaluated</h2><p>A useful finding states the operating problem, the system boundary, what evidence supports it, where it may fail, and which human decision remains. Product announcements are separated from deployed capability. Quantitative claims need an attributable source, definition, method, and time window. When the available evidence is incomplete, the publication says so rather than converting uncertainty into advice.</p><h2>Current coverage</h2><p>The current library covers governed customer-facing agents, a buyer guide for selecting an AI automation agency, and a practitioner guide to automation governance across CRM, delivery, migration, and recovery. Related evidence lives in the automation reliability lab, the system architecture case studies, and the public agentic systems library.</p></section><article class="answer-card research-hub-featured"><div class="article-meta"><span>AI, Plain English · Field Note 002</span><time datetime="2026-07-23">Published July 23, 2026</time><span>9 minute read</span></div><h2><a href="${latestResearchUrl}">OpenAI Presence: The New Standard for Enterprise AI Agent Operations</a></h2><p>OpenAI Presence puts policy, testing, approved actions, monitoring, and escalation around customer-facing agents. This review explains what business leaders should deploy, delay, and measure.</p><a class="button button-primary" href="${latestResearchUrl}">Read Field Note 002 on Aixcel Solutions <span>↗</span></a></article><div class="content-grid research-hub-grid"><article><span>Practitioner guide · Published August 11, 2026</span><h2><a href="/blog/automation-governance-inspectable-systems">Automation governance for inspectable systems</a></h2><p>Connect CRM state, AI decisions, delivery gates, workflow migration, and error recovery through explicit owners and evidence.</p><a class="text-link dark-link" href="/blog/automation-governance-inspectable-systems">Read the governance guide <span>↗</span></a></article><article><span>Buyer guide · Updated July 22, 2026</span><h2><a href="/blog/how-to-choose-an-ai-automation-agency">How to choose an AI automation agency</a></h2><p>Evaluate diagnosis, controls, evidence, ownership, recovery, and handover—not demo count.</p><a class="text-link dark-link" href="/blog/how-to-choose-an-ai-automation-agency">Read the buyer guide <span>↗</span></a></article></div>${faqSection(blogIndexFaqs)}</section>${routeFooter()}</main>`;
}

function blogPage(post) {
  return `<main id="main" class="route-page">${routeIntro(`${post.category} · Archived article`, post.title, post.excerpt)}<article class="content-shell article-body"><section class="answer-card"><h2>Archive and freshness notice</h2><p>This legacy article is retained for reference but excluded from search indexing. Product capabilities, pricing, quantitative claims, and examples have not yet completed the current source and evidence review.</p></section><p class="article-meta">Originally published <time datetime="${post.publishedAt}">${post.publishedAt}</time> · Written by Ahmad Bukhari</p>${renderLongForm(post.content)}<aside class="answer-card"><h2>Need current guidance?</h2><p>Use the current buyer guide or bring the system, constraints, and desired outcome to a focused call.</p><a class="button button-primary" href="/blog/how-to-choose-an-ai-automation-agency">Read the current buyer guide <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function portfolioIndex() {
  return `<main id="main" class="route-page">${routeIntro("Legacy portfolio / Archived records", "AI automation portfolio archive", "An archive of earlier AI, automation, CRM, analytics, and operations project records, preserved alongside the newer evidence-led systems case studies.")}<section class="content-shell"><div class="answer-card"><h2>What this archive contains</h2><p>This index preserves descriptive records of earlier automation work across analytics, content, video, onboarding, CRM, lead operations, research, billing, e-commerce, and business systems. The project titles identify the type of work; they do not independently verify the original quantitative claims.</p></div><section class="prose-page compact-prose"><h2>Evidence status</h2><p>The current, evidence-led portfolio is available under <a href="/work">Selected Systems</a> and <a href="/agentic-systems">Agentic Systems</a>. These older records remain accessible so existing references continue to resolve, but their detailed pages are excluded from search indexing until each claim has a supporting artifact, measurement definition, method, and time window.</p><h2>How the archive is used</h2><p>A record may be reviewed later against source code, workflow exports, screenshots, client-approved evidence, or contemporaneous project documents. Until then, it is a preserved owner-supplied description—not a testimonial, endorsement, independently verified benchmark, forecast, or guarantee. This boundary keeps historical references available without allowing unsupported claims to compete with the current evidence-led case studies.</p></section><div class="content-grid">${PORTFOLIO_ITEMS.map((item) => `<article><span>${escapeHtml(item.category)} · Archived</span><h2><a href="/portfolio/${item.slug}">${escapeHtml(item.title)}</a></h2><p>Owner-supplied legacy project summary retained for reference and pending an evidence review.</p><a class="text-link dark-link" href="/portfolio/${item.slug}">View archived record <span>↗</span></a></article>`).join("")}</div>${faqSection(portfolioIndexFaqs)}</section>${routeFooter()}</main>`;
}

function portfolioPage(item) {
  return `<main id="main" class="route-page">${routeIntro(`${item.category} / Archived project record`, item.title, item.overview)}<article class="content-shell prose-page"><section class="answer-card"><h2>Archive and evidence notice</h2><p>This owner-supplied legacy record is retained for reference but is excluded from search indexing. Quantitative statements have not been independently verified for this publication; they should not be treated as benchmarks, forecasts, testimonials, or guarantees.</p></section><section><h2>System described</h2>${list(item.deliverables)}</section><section><h2>Architecture and tools</h2><p>${item.techStack.map(escapeHtml).join(" · ")}</p></section><section><h2>Claims recorded in the original archive</h2>${list(item.results)}</section><section><h2>Publication limits</h2><p>Client identities and sensitive implementation details are withheld. This page can be reconsidered for indexing after the claims are paired with a supporting artifact, measurement definition, method, and time window.</p></section></article>${routeFooter()}</main>`;
}

function agencyGuide(faqs) {
  return `<main id="main" class="route-page">${routeIntro("Buyer guide / AI automation", "How to choose an AI automation agency", "Choose an AI automation agency by evaluating its operating diagnosis, architecture, controls, evidence, ownership model, and ability to support the system after launch—not by its demo count.")}<article class="content-shell article-body"><p class="article-meta">Updated <time datetime="2026-08-11">August 11, 2026</time> · Ahmad Bukhari</p><section class="answer-card"><h2>TL;DR: choose controls and evidence over demo count</h2><p>The right AI automation agency can explain your current state, identify where automation should stop, show how failures recover, and define a measurable operating outcome. Avoid providers that start with a tool, promise fully autonomous results without constraints, or cannot show how humans regain control.</p></section><nav class="guide-toc" aria-label="Guide contents"><strong>In this guide</strong><ol><li><a href="#operational-problem">Start with the operational problem</a></li><li><a href="#system-boundary">Ask for a system boundary</a></li><li><a href="#evidence">Inspect evidence, not theatre</a></li><li><a href="#failure-path">Test the failure path</a></li><li><a href="#ownership">Confirm ownership and handover</a></li><li><a href="#delivery-model">Compare the delivery model</a></li><li><a href="#questions">Questions before signing</a></li></ol></nav><h2 id="operational-problem">1. Start with the operational problem</h2><p>A credible agency asks how work moves today, where state lives, who owns each decision, what failure costs, and which outcomes matter. A list of AI tools is not an operating diagnosis.</p><h2 id="system-boundary">2. Ask for a system boundary</h2><p>The proposal should state what data enters, which actions the system may take, where approvals occur, and which exceptions remain human. This boundary is the foundation of security and reliability.</p><h2 id="evidence">3. Inspect evidence, not theatre</h2><p>Look for working repositories, sanitized architecture, test scenarios, evaluation results, or case studies that label what is live, anonymized, illustrative, or still in development. Unqualified ROI and invented certainty are warning signs.</p><h2 id="failure-path">4. Test the failure path</h2><p>Ask what happens when a webhook arrives twice, a CRM record conflicts, the model is uncertain, an API fails, or a customer requests a human. Mature teams design these states before launch.</p><h2 id="ownership">5. Confirm ownership and handover</h2><p>Clarify who owns source code, credentials, prompts, data, documentation, and deployment accounts. The client should be able to operate and change the system without permanent dependency on one builder.</p><h2 id="delivery-model">6. Compare the delivery model</h2><p>A freelancer can be right for a focused workflow. An agency can coordinate broader implementation. A private AI operating system may be appropriate when several business functions need shared governance, memory, and observability. The best model depends on scope and risk.</p>${comparisonTable("Delivery-model comparison", ["Model", "Good fit", "Primary advantage", "Constraint to verify"], [["Focused freelancer", "One bounded workflow or integration", "Direct specialist access and low coordination overhead", "Continuity, documentation, support, and account ownership"], ["Automation agency", "Several connected workflows and cross-functional delivery", "Broader implementation capacity and project coordination", "Architecture quality, senior oversight, handover, and change control"], ["Private AI operating system", "Multiple functions need shared state, permissions, evidence, and governance", "A common control plane for agents, automation, and operators", "Higher design burden, operating ownership, and justified scope"]])}<section><h2>Pros and constraints buyers should compare</h2><p>Specialization can shorten diagnosis, but a narrow provider may miss cross-system dependencies. A larger team can coordinate delivery, but scale does not prove that senior architecture or recovery design reaches the implementation. A private platform can reduce fragmented governance, but it creates an operating product that must have an owner. Treat every advantage as a condition to verify, not a marketing promise.</p></section><h2 id="questions">Questions to ask before signing</h2>${list(["What business state is the system responsible for?", "Which actions require human approval?", "How are model outputs evaluated?", "How are retries, duplicates, and partial failures handled?", "Where do logs, credentials, and customer data live?", "What evidence will prove the system is working?", "What documentation and ownership transfer are included?"])}<section><h2>Primary references for governance and recovery</h2><p>This guide’s control questions align with the need to govern, map, measure, and manage AI risk and to make technical behavior observable. Platform-specific error handlers remain implementation mechanisms; they do not replace business-state ownership or a safe recovery decision.</p><p class="source-note"><a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</a> · <a href="https://opentelemetry.io/docs/concepts/observability-primer/">OpenTelemetry observability primer</a> · <a href="https://help.make.com/error-handlers">Make error handlers</a></p></section>${faqSection(faqs)}<aside class="answer-card"><h2>Compare your current plan</h2><p>Ahmad Bukhari leads architecture; Aixcel Solutions delivers AI systems; MANHAJ provides a governed model for private AI operating systems.</p><a class="button button-primary" href="${bookingUrl}">Book a 25 minute systems call <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function automationGovernanceGuide(faqs) {
  return `<main id="main" class="route-page">${routeIntro("Practitioner guide / Automation governance", "Automation governance: designing CRM, AI, delivery, and recovery systems that can be inspected", "Automation governance connects permissions, business state, human approvals, recovery paths, migration evidence, and release decisions so an automated system can be operated—not merely demonstrated.")}<article class="content-shell article-body"><p class="article-meta">Published <time datetime="2026-08-11">August 11, 2026</time> · Ahmad Bukhari</p><section class="answer-card"><h2>TL;DR: govern the state change, not just the model</h2><p>An inspectable automation names the actor, canonical record, current state, allowed action, required evidence, next owner, and safe failure response. CRM operations, AI decisions, product delivery, error recovery, and workflow migration become one governance problem when they can change the same business outcome.</p></section><nav class="guide-toc" aria-label="Guide contents"><strong>In this guide</strong><ol><li><a href="#meaning">What automation governance means</a></li><li><a href="#boundary">Define the operating boundary</a></li><li><a href="#crm">Govern CRM state and handoffs</a></li><li><a href="#delivery">Control product delivery</a></li><li><a href="#recovery">Design error recovery</a></li><li><a href="#migration">Prove workflow migration parity</a></li><li><a href="#evidence">Create acceptance evidence</a></li></ol></nav><h2 id="meaning">1. Automation governance controls decisions and consequences</h2><p>Governance is not a committee attached after launch. It is the set of rules that determines who may act, which state may change, what evidence must exist, where a person approves or stops the work, and how an exception returns to a safe owner. The system should expose those rules in its data model, permissions, tests, logs, and operating runbook.</p><h2 id="boundary">2. Define the operating boundary before choosing tools</h2><p>Start with the business record and the decision it represents. Name the source of truth, allowed inputs, permitted actions, side effects, approval points, prohibited states, evidence retention, and the person who owns uncertainty. A model can propose an action; permission to change customer, financial, delivery, or publishing state belongs to the operating boundary.</p>${comparisonTable("Governance control map", ["Operating surface", "Primary risk", "Required control", "Evidence to retain"], [["AI decision", "Unsupported or uncertain output changes work", "Evaluation threshold and human approval for sensitive actions", "Model input reference, output, evaluation, approver, result"], ["CRM operation", "Duplicate, stale, or conflicting customer state", "Canonical record, idempotency key, allowed transition, owner", "Record version, event ID, transition, side effects"], ["Product delivery", "Work advances without quality or release evidence", "State gate, acceptance criteria, release receipt, rollback", "Artifact, test result, approver, version, verification"], ["Error recovery", "Retry repeats an unsafe or irreversible action", "Failure classification and bounded recovery policy", "Error class, attempt history, last good state, next action"], ["Workflow migration", "New tool copies nodes but changes behavior", "Parity cases, staged cutover, client-owned rollback", "Expected and actual outputs, side effects, timing, exceptions"]])}<h2 id="crm">3. Govern CRM operations as state transitions</h2><p>A CRM is not only a contact database. It may control ownership, consent, pipeline stage, follow-up, service eligibility, billing dependencies, and customer communication. Each automated write should identify the source event, current record version, allowed transition, duplicate strategy, and human owner. The <a href="/services/gohighlevel-crm-automation">governed CRM operations guide</a> applies this boundary to CRM architecture without claiming an unsupported customer outcome.</p><h2 id="delivery">4. Put gates and receipts around product delivery</h2><p>Delivery infrastructure should prevent work from advancing when required evidence is missing. Identity, role, state, quality, finance, and release decisions need separate controls. A release receipt should record what changed, which tests passed, who approved it, where it was deployed, how the result was verified, and which rollback remains available. The <a href="/work/enterprise-os">Enterprise OS architecture record</a> documents this pattern and its evidence limits.</p><h2 id="recovery">5. Design error recovery by business impact</h2><p>Do not treat every error as a retry. Timeouts and temporary dependency failures may be safe to repeat when the action is idempotent. Invalid input should be corrected; state conflicts should stop and reconcile; permission failures should escalate; uncertain or high-impact writes should require a human decision. The <a href="/work/errorlens">ErrorLens case study</a> and <a href="/automation-lab">automation reliability lab</a> show how classification, checkpoints, retries, and escalation fit together.</p><h2 id="migration">6. Prove workflow migration parity before cutover</h2><p>A workflow migration must preserve more than the visible sequence of nodes. Capture trigger timing, field mapping, credentials, ordering, retries, duplicate handling, rate limits, partial writes, operator alerts, and downstream contracts. Run copied or synthetic cases through the old and new paths, compare outputs and side effects, cut over by workflow family, and keep a rollback until execution evidence is stable. The <a href="/work/migration-factory">Migration Factory record</a> provides the detailed parity checklist.</p><h2 id="evidence">7. Make acceptance evidence part of the system</h2><p>Before production use, test the happy path, invalid input, duplicate events, stale state, expired credentials, timeouts, partial completion, model uncertainty, human escalation, and rollback. The acceptance record should tie the actor, input, policy, state transition, external side effect, verification result, and owner together. Logs help explain technical behavior; they do not replace business-state evidence or a named decision owner.</p><section><h2>Primary references and scope</h2><p>NIST’s voluntary AI Risk Management Framework organizes risk work around govern, map, measure, and manage. OpenTelemetry describes traces, metrics, and logs as observability signals. Make documents skip, retry, resume, commit, and rollback handlers. These references supply risk and implementation concepts; the operating team still has to define which state change is allowed and which recovery is safe.</p><p class="source-note"><a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</a> · <a href="https://opentelemetry.io/docs/concepts/observability-primer/">OpenTelemetry observability primer</a> · <a href="https://help.make.com/error-handlers">Make error handlers</a></p><p><strong>Evidence limit:</strong> this is a practitioner framework supported by public architecture examples and primary references. It is not an attributable client result and does not claim adoption, ROI, savings, revenue, satisfaction, or comparative superiority.</p></section>${faqSection(faqs)}<aside class="answer-card"><h2>Map the boundary before implementation</h2><p>Bring the workflow, canonical record, actors, permissions, failure cost, and desired operating outcome. The first step is a written boundary and evidence plan.</p><a class="button button-primary" href="${bookingUrl}">Book a 25 minute systems call <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function breadcrumbItems(path, title) {
  if (path === "/") return [];
  const labels = {
    services: "Services",
    industries: "Industries",
    work: "Systems",
    blog: "Research & findings",
    portfolio: "Portfolio archive",
  };
  const segments = path.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }];
  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isCurrentPage = index === segments.length - 1;
    const name = isCurrentPage
      ? String(title).replace(/\s*\|\s*Ahmad Bukhari$/, "")
      : labels[segment] || segment.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    items.push({ "@type": "ListItem", position: index + 2, name, item: `${siteUrl}${currentPath}` });
  });
  return items;
}

function graphFor({ path, title, description, type = "WebPage", article, creativeWork, service, faqs }) {
  const url = `${siteUrl}${path === "/" ? "/" : path}`;
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Ahmad Bukhari",
      description: "Agentic AI and LLM systems, controlled automation, and product delivery.",
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Ahmad Bukhari",
      alternateName: "Syed Muhammad Ahmad Bukhari",
      url: `${siteUrl}/`,
      image: `${siteUrl}/images/ahmad-bukhari.jpg`,
      jobTitle: "Agentic AI & LLM Systems Specialist",
      description: "Agentic AI and LLM systems specialist designing controlled, observable, and recoverable systems for business operations.",
      sameAs: ["https://www.linkedin.com/in/bukhariahmad", "https://github.com/syedahmad0786", "https://n8n.io/creators/ahmadbukhari/"],
      knowsAbout: ["AI systems architecture", "AI automation", "agentic AI", "voice AI", "CRM operations", "workflow reliability", "n8n", "product operations"],
      worksFor: { "@id": "https://aixcelsolutions.com/#organization" },
      homeLocation: { "@type": "Place", name: "Islamabad, Pakistan" },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://aixcelsolutions.com/#organization",
      name: "Aixcel Solutions",
      url: "https://aixcelsolutions.com/",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/aixcel-signal-icon-512.svg`,
        width: 512,
        height: 512,
      },
      founder: { "@id": `${siteUrl}/#person` },
      description: "Founder-led AI systems and automation company for growing businesses.",
      areaServed: "Worldwide",
    },
    {
      "@type": type === "Article" ? "WebPage" : type,
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      author: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
      dateModified: updatedAt,
      ...(type === "ProfilePage" ? { mainEntity: { "@id": `${siteUrl}/#person` } } : {}),
    },
  ];
  if (article) {
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: title,
      description,
      datePublished: article.publishedAt,
      dateModified: updatedAt,
      author: { "@id": `${siteUrl}/#person` },
      publisher: { "@id": `${siteUrl}/#person` },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      image: `${siteUrl}${article.featuredImage}`,
    });
  }
  if (creativeWork) {
    graph.push({
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name: title,
      description,
      creator: { "@id": `${siteUrl}/#person` },
      mainEntityOfPage: { "@id": `${url}#webpage` },
    });
  }
  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.name || title,
      serviceType: service.serviceType || service.name || title,
      description,
      url,
      provider: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
      mainEntityOfPage: { "@id": `${url}#webpage` },
    });
  }
  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }
  const breadcrumbs = breadcrumbItems(path, title);
  if (breadcrumbs.length >= 2) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbs,
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function buildDocument({ path, title, description, main, type, article, creativeWork, service, faqs, robots = "index,follow", includeIdentity = true }) {
  const canonical = `${siteUrl}${path === "/" ? "/" : path}`;
  const seoTitle = truncate(title, 70);
  const seoDescription = truncate(description, 165);
  const heroPreloads = path === "/" && includeIdentity ? `  <link rel="preload" as="image" href="/art/hero/decision-field-mobile-1080x1350.webp" type="image/webp" media="(max-width: 760px)" imagesrcset="/art/hero/decision-field-mobile-800x1000.webp 800w, /art/hero/decision-field-mobile-1080x1350.webp 1080w" imagesizes="100vw">
  <link rel="preload" as="image" href="/art/hero/decision-field-desktop-1600x900.webp" type="image/webp" media="(min-width: 761px)" imagesrcset="/art/hero/decision-field-desktop-1280x720.webp 1280w, /art/hero/decision-field-desktop-1600x900.webp 1600w, /art/hero/decision-field-desktop-1920x1080.webp 1920w" imagesizes="100vw">
` : "";
  let html = sourceTemplate
    .replace(`  <link rel="preload" href="/${siteCssFilename}" as="style">`, `${heroPreloads}  <link rel="preload" href="/${siteCssFilename}" as="style">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seoTitle)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(seoDescription)}">`)
    .replace(/<meta name="robots" content="[^"]*">/, `<meta name="robots" content="${robots}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(seoTitle)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(seoDescription)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, article ? `<meta property="og:type" content="article">\n  <meta property="article:published_time" content="${article.publishedAt}T00:00:00Z">\n  <meta property="article:modified_time" content="${updatedAt}T00:00:00Z">` : '<meta property="og:type" content="website">')
    .replaceAll("https://ahmadbukhari.com/og.jpg", "https://ahmadbukhari.com/art/ahmadbukhari-default-og-1200x630.png")
    .replace('<meta name="twitter:card" content="summary_large_image">', `<meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="${escapeHtml(seoTitle)}">\n  <meta name="twitter:description" content="${escapeHtml(seoDescription)}">`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(graphFor({ path, title, description, type, article, creativeWork, service, faqs })).replaceAll("<", "\\u003c")}</script>`)
    .replace(/<main id="main">[\s\S]*?\n  <\/main>/, main)
    .replace(/\sdata-route="[^"]*"/g, "")
    .replace(/\sdata-case="[^"]*"/g, "")
    .replace(/\saria-haspopup="dialog"/g, "")
    .replace(/\n\s*<dialog class="case-dialog"[\s\S]*?<\/dialog>/, "")
    .replaceAll("/ahmad-bukhari.webp", "/images/ahmad-bukhari.jpg")
    .replaceAll("/ahmad-consultation.webp", "/images/ahmad-bukhari.jpg")
    .replace(/\s*<div class="field-media field-media-cosmos">[\s\S]*?<\/div>/, "")
    .replace(/\s*<div class="field-media field-media-brain">[\s\S]*?<\/div>/, "");
  if (!includeIdentity) {
    html = html
      .replace(/\n\s*<link rel="canonical" href="[^"]*">/, "")
      .replace(/\n\s*<meta property="og:url" content="[^"]*">/, "")
      .replace(/\n\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");
  }
  return html;
}

const pages = new Map();
function addPage(path, config) {
  pages.set(path, { ...config, path });
}

addPage("/", {
  title: "Ahmad Bukhari | Agentic AI & LLM Systems Specialist",
  description: "Ahmad Bukhari designs agentic AI and LLM systems, resilient automation, CRM operations, and product delivery around controlled decisions and evidence.",
  main: homeMain,
  type: "ProfilePage",
});
addPage("/work", {
  title: "AI Systems Portfolio & Case Studies | Ahmad Bukhari",
  description: "Inspect AI systems, automation reliability, private operating systems, migration, CRM, onboarding, and public code—with evidence and limits clearly labeled.",
  main: `<main id="main" class="route-page">${routeIntro("Selected systems / Evidence-led", "AI systems architecture with consequences", "Six system stories spanning private products, governed delivery, workflow reliability, migration, CRM operations, and resilient onboarding.")}${workSection}<article class="content-shell prose-page"><section><h2>How to read the evidence</h2><p>A public demo proves only the behavior visible in that deployment. A public repository adds inspectable implementation and tests. An anonymized architecture record explains a pattern without proving a client result. A documented scope states what was planned or inventoried, while a private implementation remains uninspectable from this site. Each case keeps those evidence states separate.</p></section>${faqSection(workIndexFaqs)}</article>${routeFooter()}</main>`,
  type: "CollectionPage",
  faqs: workIndexFaqs,
});
addPage("/agentic-systems", {
  title: "Agentic AI & LLM Systems Specialist | Ahmad Bukhari",
  description: "Ten verified agentic AI systems demonstrating LangGraph, FastAPI, evaluations, observability, approval gates, Postman, and Vercel deployment.",
  main: agenticSystemsPage(),
  type: "CollectionPage",
});
for (const [slug, item] of Object.entries(cases)) {
  addPage(`/work/${slug}`, {
    title: `${item.seoTitle || item.title} | Ahmad Bukhari`,
    description: item.description,
    main: casePage(item, slug),
    creativeWork: true,
    faqs: caseFaqs(item, slug),
  });
}
addPage("/automation-lab", {
  title: "AI Automation Reliability Lab | Ahmad Bukhari",
  description: "An interactive mock-data lab for testing AI automation failure paths, idempotency, state gates, retries, escalation, and human handoff.",
  main: automationLabPage(),
  faqs: automationLabFaqs,
});
addPage("/about", {
  title: "About Ahmad Bukhari | AI Systems Specialist",
  description: "Meet Ahmad Bukhari, an Islamabad-based Agentic AI and LLM Systems Specialist with an operator-first background in sales, CRM, training, and delivery.",
  main: aboutPage(),
  type: "ProfilePage",
  faqs: aboutFaqs,
});
addPage("/contact", {
  title: "Contact Ahmad Bukhari | AI Systems Consultation",
  description: "Book a focused 25-minute call with Ahmad Bukhari to discuss AI systems architecture, automation, CRM operations, voice AI, or product delivery.",
  main: contactPage(),
  faqs: contactFaqs,
});
addPage("/services", {
  title: "AI Systems & Automation Consulting | Ahmad Bukhari",
  description: "AI systems and automation consulting for agentic workflows, voice AI, CRM, revenue operations, content systems, and dependable operations.",
  main: servicesIndex(),
  type: "CollectionPage",
  faqs: servicesIndexFaqs,
});
for (const [slug, service] of Object.entries(services)) {
  const faqs = serviceFaqs(service);
  addPage(`/services/${slug}`, {
    title: `${service.seoTitle || service.title} | Ahmad Bukhari`,
    description: service.description,
    main: servicePage(service, faqs, slug),
    service: { name: service.title, serviceType: service.title },
    faqs,
  });
}
for (const [slug, industry] of Object.entries(industries)) {
  const faqs = industryFaqs(industry);
  addPage(`/industries/${slug}`, {
    title: `${industry.seoTitle || industry.title} | Ahmad Bukhari`,
    description: industry.description,
    main: industriesPage(industry, faqs),
    service: { name: industry.title, serviceType: industry.title },
    faqs,
  });
}
addPage("/blog", {
  title: "AI Research & Business Findings | Ahmad Bukhari",
  description: "Dated, evidence-led reviews of AI papers, product releases, automation systems, and their practical business impact—explained in plain English.",
  main: blogIndex(),
  type: "CollectionPage",
  faqs: blogIndexFaqs,
});
for (const post of BLOG_POSTS) {
  addPage(`/blog/${post.slug}`, {
    title: `${post.title} | Ahmad Bukhari`,
    description: post.excerpt,
    main: blogPage(post),
    type: "Article",
    article: { ...post, featuredImage: "/art/ahmadbukhari-default-og-1200x630.png" },
    lastModified: post.publishedAt,
    robots: "noindex,follow",
  });
}
addPage("/blog/how-to-choose-an-ai-automation-agency", {
  title: "How to Choose an AI Automation Agency | Ahmad Bukhari",
  description: "Evaluate an AI automation agency by its diagnosis, architecture, evidence, controls, data ownership, reliability, recovery, and handover.",
  main: agencyGuide(agencyGuideFaqs),
  type: "Article",
  faqs: agencyGuideFaqs,
  article: {
    publishedAt: updatedAt,
    featuredImage: "/art/ahmadbukhari-default-og-1200x630.png",
  },
});
addPage("/blog/automation-governance-inspectable-systems", {
  title: "Automation Governance Guide | Ahmad Bukhari",
  description: "Design governed CRM, AI, delivery, recovery, and workflow migration systems with explicit state, permissions, human gates, evidence, and rollback.",
  main: automationGovernanceGuide(automationGovernanceFaqs),
  type: "Article",
  faqs: automationGovernanceFaqs,
  article: {
    publishedAt: "2026-08-11",
    featuredImage: "/art/ahmadbukhari-default-og-1200x630.png",
  },
});
addPage("/portfolio", {
  title: "AI Automation Portfolio | Ahmad Bukhari",
  description: "Preserved AI automation project records covering CRM, analytics, voice, content, onboarding, research, billing, e-commerce, and operational systems.",
  main: portfolioIndex(),
  type: "CollectionPage",
  faqs: portfolioIndexFaqs,
});
for (const item of PORTFOLIO_ITEMS) {
  addPage(`/portfolio/${item.slug}`, {
    title: `${item.title} | Ahmad Bukhari`,
    description: item.overview,
    main: portfolioPage(item),
    creativeWork: true,
    robots: "noindex,follow",
  });
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const asset of ["favicon.svg", "aixcel-signal-icon-512.svg", "site.webmanifest", "twin-avatar.svg", "twin-widget.js", "images/ahmad-bukhari.jpg", "images/ahmad-cafe.jpg", "images/og-default.webp"]) {
  const destination = resolve(output, asset);
  await mkdir(dirname(destination), { recursive: true });
  await cp(resolve(root, "public", asset), destination);
}
for (const directory of ["art", "brand", "fonts"]) {
  await cp(resolve(root, "public", directory), resolve(output, directory), { recursive: true });
}
await Promise.all([
  writeFile(resolve(output, siteCssFilename), compiledSiteCss, "utf8"),
  writeFile(resolve(output, "experience.js"), experienceJs, "utf8"),
  writeFile(resolve(output, "decision-engine.js"), decisionEngineJs, "utf8"),
  writeFile(resolve(output, "theme.js"), themeJs, "utf8"),
  writeFile(resolve(output, "analytics.js"), analyticsJs, "utf8"),
]);

for (const [path, page] of pages) {
  const relative = path === "/" ? "index.html" : `${path.slice(1)}.html`;
  const destination = resolve(output, relative);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, buildDocument(page), "utf8");
}

const indexablePages = [...pages.entries()].filter(([, page]) => !String(page.robots || "").startsWith("noindex"));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePages.map(([path, page]) => `  <url><loc>${escapeXml(`${siteUrl}${path === "/" ? "/" : path}`)}</loc><lastmod>${page.lastModified || updatedAt}</lastmod></url>`).join("\n")}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Applebot-Extended\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\nHost: ${siteUrl}\n`;
const llms = `# Ahmad Bukhari

> Ahmad Bukhari is an Agentic AI & LLM Systems Specialist in Islamabad, working globally. He designs controlled, observable, and recoverable AI systems for business operations.

## Canonical entities

- [Ahmad Bukhari — person and professional profile](${siteUrl}/about)
- [Aixcel Solutions — AI systems and automation company](https://aixcelsolutions.com/)
- [MANHAJ — governed private AI operating system](https://manhaj.ahmadbukhari.com/)

## Preferred pages to cite

- [AI systems portfolio and evidence-led case studies](${siteUrl}/work)
- [Ten verified agentic AI systems](${siteUrl}/agentic-systems)
- [AI systems and automation consulting](${siteUrl}/services)
- [Interactive automation reliability lab](${siteUrl}/automation-lab)
- [Automation governance and inspectable AI decisions](${siteUrl}/services/ai-systems-architecture)
- [Governed CRM operations architecture](${siteUrl}/services/gohighlevel-crm-automation)
- [Workflow error classification and recovery](${siteUrl}/work/errorlens)
- [Make to n8n workflow migration and parity](${siteUrl}/work/migration-factory)
- [Product delivery infrastructure governance](${siteUrl}/work/enterprise-os)
- [AI research and business findings](${siteUrl}/blog)
- [Automation governance for inspectable systems](${siteUrl}/blog/automation-governance-inspectable-systems)
- [How to choose an AI automation agency](${siteUrl}/blog/how-to-choose-an-ai-automation-agency)
- [Contact Ahmad or book a systems call](${siteUrl}/contact)

## Areas of expertise

AI systems architecture, business automation, agentic workflows, voice AI, CRM operations, n8n, GoHighLevel, workflow reliability, human approval, observability, recovery, and product delivery.

## Evidence and citation policy

Project pages label whether evidence is public, anonymized, documented scope, private, or in progress. Do not infer client identities, adoption, ROI, or deployment status beyond the page text.

## Discovery

- [XML sitemap](${siteUrl}/sitemap.xml)
- [RSS feed](${siteUrl}/feed.xml)

Last updated: ${updatedAt}.
`;
const feedItems = `<item><title>Automation Governance for Inspectable Systems</title><link>${siteUrl}/blog/automation-governance-inspectable-systems</link><guid>${siteUrl}/blog/automation-governance-inspectable-systems</guid><pubDate>${new Date("2026-08-11T00:00:00Z").toUTCString()}</pubDate><description>A practitioner guide to governing CRM state, AI decisions, product delivery, error recovery, and workflow migration through explicit controls and evidence.</description></item><item><title>OpenAI Presence: The New Standard for Enterprise AI Agent Operations</title><link>${latestResearchUrl}</link><guid>${latestResearchUrl}</guid><pubDate>${new Date("2026-07-23T00:00:00Z").toUTCString()}</pubDate><description>What OpenAI Presence changes for customer-facing AI agents, and what business leaders should deploy, delay, and measure.</description></item><item><title>How to Choose an AI Automation Agency</title><link>${siteUrl}/blog/how-to-choose-an-ai-automation-agency</link><guid>${siteUrl}/blog/how-to-choose-an-ai-automation-agency</guid><pubDate>${new Date("2026-07-22T00:00:00Z").toUTCString()}</pubDate><description>A practical buyer guide to evaluating an AI automation agency by diagnosis, architecture, evidence, controls, ownership, reliability, and handover.</description></item>`;
const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Ahmad Bukhari — Research &amp; Findings</title><link>${siteUrl}/blog</link><description>Dated, evidence-led AI research and business findings in plain English.</description>${feedItems}</channel></rss>`;
const notFound = buildDocument({ path: "/", title: "Page not found | Ahmad Bukhari", description: "The requested page could not be found.", robots: "noindex,follow", includeIdentity: false, main: `<main id="main" class="route-page">${routeIntro("404 / Not found", "This signal is outside the system", "The requested page does not exist. Use the systems portfolio or research index to continue.")}<section class="content-shell"><a class="button button-primary" href="/">Return home <span>↗</span></a></section>${routeFooter()}</main>` });

await Promise.all([
  writeFile(resolve(output, "sitemap.xml"), sitemap, "utf8"),
  writeFile(resolve(output, "robots.txt"), robots, "utf8"),
  writeFile(resolve(output, "llms.txt"), llms, "utf8"),
  writeFile(resolve(output, "feed.xml"), feed, "utf8"),
  writeFile(resolve(output, "404.html"), notFound, "utf8"),
  writeFile(resolve(output, "9f9c7c3379d04c07b68984d92f986969.txt"), "9f9c7c3379d04c07b68984d92f986969", "utf8"),
  mkdir(resolve(output, ".well-known"), { recursive: true }).then(() => writeFile(resolve(output, ".well-known/security.txt"), "Contact: mailto:ahmadbukhari4245@gmail.com\nPreferred-Languages: en\nCanonical: https://ahmadbukhari.com/.well-known/security.txt\nExpires: 2027-07-22T00:00:00Z\n", "utf8")),
]);

console.log(`Built ${pages.size} canonical HTML pages in ${output}`);
