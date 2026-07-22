import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
const siteUrl = "https://ahmadbukhari.com";
const bookingUrl = "https://cal.com/ahmad-bukhari/ai-consultancy-call-with-ab";
const updatedAt = "2026-07-22";

const [sourceTemplate, siteCss, experienceJs, visualJourneySource] = await Promise.all([
  readFile(resolve(root, "static/site-template.html"), "utf8"),
  readFile(resolve(root, "static/site-current.css"), "utf8"),
  readFile(resolve(root, "static/experience.js"), "utf8"),
  readFile(resolve(root, "static/visual-journey.js"), "utf8"),
]);
const visualJourneyJs = visualJourneySource
  .replace(
    'var e=window.matchMedia("(prefers-reduced-motion: reduce)").matches,t=',
    'var e=window.matchMedia("(prefers-reduced-motion: reduce)").matches,R=innerWidth<761,t=',
  )
  .replace(
    'if(e)b("REDUCED MOTION");else if(t)b("SAVE DATA");else{',
    'if(e)b("REDUCED MOTION");else if(R)b("RESPONSIVE ARTWORK");else if(t)b("SAVE DATA");else{',
  );

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
const notesSection = extract('<section class="notes-section', '<section class="contact-section');
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
    description: "Evidence-led content automation that turns approved source material into reviewable articles, social posts, video briefs, and distribution workflows.",
    answer: "Useful content automation preserves source evidence, brand voice, editorial review, and a canonical publishing record instead of generating unverified volume.",
    outcomes: ["Source-to-asset workflow", "Editorial checkpoints", "Brand and factual guardrails", "Repurposing formats", "Distribution and performance feedback"],
  },
};

const industries = {
  "online-coaches": {
    title: "AI Automation for Online Coaches and Education Businesses",
    description: "AI automation architecture for coaching businesses: lead response, qualification, enrollment, client onboarding, delivery support, renewal, and reporting.",
    audience: "coaching programs, cohort businesses, education creators, and expert-led service companies",
    workflows: ["Lead capture, qualification, and appointment routing", "Enrollment and payment-state checks", "Checkpointed student or client onboarding", "Program reminders and support triage", "Renewal risk and outcome reporting"],
  },
  "marketing-agencies": {
    title: "AI Automation for Marketing Agencies",
    description: "AI systems for agencies that need dependable lead operations, client onboarding, campaign reporting, content production, and delivery visibility.",
    audience: "performance, creative, growth, and full-service agencies",
    workflows: ["Lead research and CRM routing", "Proposal-to-onboarding handoffs", "Campaign data normalization and reporting", "Content review and repurposing", "Client delivery alerts and exception management"],
  },
};

function routeIntro(eyebrow, title, description) {
  return `<section class="route-intro"><span class="eyebrow">${escapeHtml(eyebrow)}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></section>`;
}

function routeFooter() {
  return `<footer class="route-footer"><div><b>Ahmad Bukhari</b><span>AI Systems Architect · Islamabad · working globally</span></div><nav aria-label="Footer"><a href="/work">Systems</a><a href="/services">Consulting</a><a href="/blog">Field notes</a><a href="https://aixcelsolutions.com">Aixcel Solutions</a><a href="https://manhaj.ahmadbukhari.com">MANHAJ</a><a href="${bookingUrl}">Book a call ↗</a></nav></footer>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function casePage(item, slug) {
  const artwork = caseArtwork[slug];
  const leadArtwork = `<figure class="case-system-art"><picture><source media="(max-width: 800px)" srcset="/art/systems/${artwork.file}-800x500.webp"><img src="/art/systems/${artwork.file}-1200x750.webp" srcset="/art/systems/${artwork.file}-800x500.webp 800w, /art/systems/${artwork.file}-1200x750.webp 1200w" sizes="(max-width: 960px) calc(100vw - 2.5rem), 58rem" width="1200" height="750" loading="lazy" decoding="async" alt="${escapeHtml(artwork.alt)}"></picture></figure>`;
  return `<main id="main" class="route-page">${routeIntro(item.eyebrow, item.title, item.description)}<article class="case-page content-shell">${leadArtwork}<section><span class="dialog-label">Direct answer</span><p class="content-lead">${escapeHtml(item.description)}</p></section><section><h2>The operational problem</h2><p>${escapeHtml(item.problem)}</p></section><section><h2>System architecture</h2><ol class="architecture-list">${item.architecture.map((step, index) => `<li><b>${String(index + 1).padStart(2, "0")}</b><span>${escapeHtml(step)}</span></li>`).join("")}</ol></section><section><h2>Key design decisions</h2>${list(item.decisions)}</section><section><h2>Evidence and limits</h2><p>${escapeHtml(item.evidence)}</p></section><aside class="answer-card"><h2>Need a related AI system?</h2><p>Bring the workflow, constraints, failure points, and desired outcome. The first call maps the safest useful move.</p><a class="button button-primary" href="${bookingUrl}">Book a 25 minute systems call <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function servicesIndex() {
  return `<main id="main" class="route-page">${routeIntro("AI consulting / Capabilities", "AI systems and automation consulting", "Architecture-led consulting for organizations that need AI, CRM, automation, and human operations to work as one dependable system.")}<section class="content-shell"><div class="answer-card"><h2>What I help build</h2><p>I diagnose operational friction, define the system boundary, and design the data, state, agents, controls, integrations, observability, and human handoffs needed for production. Delivery can continue through Aixcel Solutions and the MANHAJ operating model.</p></div><div class="content-grid">${Object.entries(services).map(([slug, service]) => `<article><span>Capability</span><h2><a href="/services/${slug}">${escapeHtml(service.title)}</a></h2><p>${escapeHtml(service.description)}</p><a class="text-link dark-link" href="/services/${slug}">Explore the approach <span>↗</span></a></article>`).join("")}</div></section>${routeFooter()}</main>`;
}

function servicePage(service) {
  return `<main id="main" class="route-page">${routeIntro("AI consulting / Specialist capability", service.title, service.description)}<article class="content-shell prose-page"><section class="answer-card"><h2>What does this service do?</h2><p>${escapeHtml(service.answer)}</p></section><section><h2>Typical engagement outputs</h2>${list(service.outcomes)}</section><section><h2>How the work is approached</h2><p>The engagement starts with the business state, actors, evidence, and exceptions. Architecture comes before tool selection. Every proposed automated action receives an owner, permission boundary, recovery path, and measurable outcome.</p></section><section><h2>Who delivers the system?</h2><p>Ahmad Bukhari leads architecture and systems thinking. <a href="https://aixcelsolutions.com">Aixcel Solutions</a> is the services company, and <a href="https://manhaj.ahmadbukhari.com">MANHAJ</a> is the governed delivery model for private AI operating systems.</p></section><aside class="answer-card"><h2>Discuss the workflow</h2><p>Share the current process, the breakpoints, and the outcome that matters.</p><a class="button button-primary" href="${bookingUrl}">Book a 25 minute call <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function industriesPage(industry) {
  return `<main id="main" class="route-page">${routeIntro("Industry systems", industry.title, industry.description)}<article class="content-shell prose-page"><section class="answer-card"><h2>Where AI automation helps</h2><p>For ${escapeHtml(industry.audience)}, the highest-value automation usually connects revenue, delivery, and customer state. It should remove repeatable coordination while keeping people in control of sensitive decisions.</p></section><section><h2>Systems commonly designed</h2>${list(industry.workflows)}</section><section><h2>What makes the architecture dependable?</h2><p>Each workflow needs a canonical record, explicit ownership, idempotent actions where possible, checkpoints, escalation, and an audit trail. Those controls matter more than the number of automations deployed.</p></section><section><h2>Start with an operating audit</h2><p>The first step maps where data enters, how state changes, which failures are expensive, and what a successful human handoff looks like.</p><a class="button button-primary" href="${bookingUrl}">Book a systems call <span>↗</span></a></section></article>${routeFooter()}</main>`;
}

function blogIndex() {
  return `<main id="main" class="route-page">${routeIntro("Field notes / Evidence-led guidance", "AI systems and automation field notes", "Practical guidance on selecting, designing, testing, and operating AI automation and business systems.")}${notesSection}<section class="content-shell"><div class="answer-card"><h2>Current publication standard</h2><p><a href="/blog/how-to-choose-an-ai-automation-agency">How to choose an AI automation agency</a> is the first article published under the evidence-led standard. Earlier posts remain accessible as an archive, but are excluded from search indexing until claims, sources, pricing, and review dates are verified.</p></div><div class="content-grid">${BLOG_POSTS.map((post, index) => `<article><span>${escapeHtml(post.category)} · Archived</span><h2><a href="/blog/${post.slug}">Archived field note ${String(index + 1).padStart(2, "0")}</a></h2><p>Legacy article retained for reference and pending a source, evidence, and freshness review.</p><a class="text-link dark-link" href="/blog/${post.slug}">View archived article <span>↗</span></a></article>`).join("")}</div></section>${routeFooter()}</main>`;
}

function blogPage(post) {
  return `<main id="main" class="route-page">${routeIntro(`${post.category} · Archived article`, post.title, post.excerpt)}<article class="content-shell article-body"><section class="answer-card"><h2>Archive and freshness notice</h2><p>This legacy article is retained for reference but excluded from search indexing. Product capabilities, pricing, quantitative claims, and examples have not yet completed the current source and evidence review.</p></section><p class="article-meta">Originally published <time datetime="${post.publishedAt}">${post.publishedAt}</time> · Written by Ahmad Bukhari</p>${renderLongForm(post.content)}<aside class="answer-card"><h2>Need current guidance?</h2><p>Use the current buyer guide or bring the system, constraints, and desired outcome to a focused call.</p><a class="button button-primary" href="/blog/how-to-choose-an-ai-automation-agency">Read the current buyer guide <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function portfolioIndex() {
  return `<main id="main" class="route-page">${routeIntro("Legacy portfolio / Archived records", "AI automation portfolio archive", "An archive of earlier AI, automation, CRM, analytics, and operations project records, preserved alongside the newer evidence-led systems case studies.")}<section class="content-shell"><div class="answer-card"><h2>Evidence status</h2><p>The current, evidence-led portfolio is available under <a href="/work">Selected Systems</a>. These older records remain accessible so existing references continue to resolve, but their detailed pages are excluded from search indexing until each claim has a supporting artifact, method, and time window.</p></div><div class="content-grid">${PORTFOLIO_ITEMS.map((item, index) => `<article><span>${escapeHtml(item.category)} · Archived</span><h2><a href="/portfolio/${item.slug}">Archived project record ${String(index + 1).padStart(2, "0")}</a></h2><p>Owner-supplied legacy project summary retained for reference and pending an evidence review.</p><a class="text-link dark-link" href="/portfolio/${item.slug}">View archived record <span>↗</span></a></article>`).join("")}</div></section>${routeFooter()}</main>`;
}

function portfolioPage(item) {
  return `<main id="main" class="route-page">${routeIntro(`${item.category} / Archived project record`, item.title, item.overview)}<article class="content-shell prose-page"><section class="answer-card"><h2>Archive and evidence notice</h2><p>This owner-supplied legacy record is retained for reference but is excluded from search indexing. Quantitative statements have not been independently verified for this publication; they should not be treated as benchmarks, forecasts, testimonials, or guarantees.</p></section><section><h2>System described</h2>${list(item.deliverables)}</section><section><h2>Architecture and tools</h2><p>${item.techStack.map(escapeHtml).join(" · ")}</p></section><section><h2>Claims recorded in the original archive</h2>${list(item.results)}</section><section><h2>Publication limits</h2><p>Client identities and sensitive implementation details are withheld. This page can be reconsidered for indexing after the claims are paired with a supporting artifact, measurement definition, method, and time window.</p></section></article>${routeFooter()}</main>`;
}

function agencyGuide() {
  return `<main id="main" class="route-page">${routeIntro("Buyer guide / AI automation", "How to choose an AI automation agency", "Choose an AI automation agency by evaluating its operating diagnosis, architecture, controls, evidence, ownership model, and ability to support the system after launch—not by its demo count.")}<article class="content-shell article-body"><p class="article-meta">Updated <time datetime="2026-07-22">July 22, 2026</time> · Ahmad Bukhari</p><section class="answer-card"><h2>Short answer</h2><p>The right AI automation agency can explain your current state, identify where automation should stop, show how failures recover, and define a measurable operating outcome. Avoid providers that start with a tool, promise fully autonomous results without constraints, or cannot show how humans regain control.</p></section><h2>1. Start with the operational problem</h2><p>A credible agency asks how work moves today, where state lives, who owns each decision, what failure costs, and which outcomes matter. A list of AI tools is not an operating diagnosis.</p><h2>2. Ask for a system boundary</h2><p>The proposal should state what data enters, which actions the system may take, where approvals occur, and which exceptions remain human. This boundary is the foundation of security and reliability.</p><h2>3. Inspect evidence, not theatre</h2><p>Look for working repositories, sanitized architecture, test scenarios, evaluation results, or case studies that label what is live, anonymized, illustrative, or still in development. Unqualified ROI and invented certainty are warning signs.</p><h2>4. Test the failure path</h2><p>Ask what happens when a webhook arrives twice, a CRM record conflicts, the model is uncertain, an API fails, or a customer requests a human. Mature teams design these states before launch.</p><h2>5. Confirm ownership and handover</h2><p>Clarify who owns source code, credentials, prompts, data, documentation, and deployment accounts. The client should be able to operate and change the system without permanent dependency on one builder.</p><h2>6. Compare the delivery model</h2><p>A freelancer can be right for a focused workflow. An agency can coordinate broader implementation. A private AI operating system may be appropriate when several business functions need shared governance, memory, and observability. The best model depends on scope and risk.</p><h2>Questions to ask before signing</h2>${list(["What business state is the system responsible for?", "Which actions require human approval?", "How are model outputs evaluated?", "How are retries, duplicates, and partial failures handled?", "Where do logs, credentials, and customer data live?", "What evidence will prove the system is working?", "What documentation and ownership transfer are included?"])}<aside class="answer-card"><h2>Compare your current plan</h2><p>Ahmad Bukhari leads architecture; Aixcel Solutions delivers AI systems; MANHAJ provides a governed model for private AI operating systems.</p><a class="button button-primary" href="${bookingUrl}">Book a 25 minute systems call <span>↗</span></a></aside></article>${routeFooter()}</main>`;
}

function graphFor({ path, title, description, type = "WebPage", article, creativeWork }) {
  const url = `${siteUrl}${path === "/" ? "/" : path}`;
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Ahmad Bukhari",
      description: "AI systems architecture, automation consulting, and product delivery.",
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
      jobTitle: ["AI Systems Architect", "AI Automation Consultant"],
      description: "AI systems architect and automation consultant designing controlled, observable, and recoverable systems for business operations.",
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
  return { "@context": "https://schema.org", "@graph": graph };
}

function buildDocument({ path, title, description, main, type, article, creativeWork, robots = "index,follow", includeIdentity = true }) {
  const canonical = `${siteUrl}${path === "/" ? "/" : path}`;
  const seoTitle = truncate(title, 70);
  const seoDescription = truncate(description, 165);
  const heroPreloads = path === "/" && includeIdentity ? `  <link rel="preload" as="image" href="/art/hero/decision-field-mobile-1080x1350.webp" type="image/webp" media="(max-width: 760px)" imagesrcset="/art/hero/decision-field-mobile-800x1000.webp 800w, /art/hero/decision-field-mobile-1080x1350.webp 1080w" imagesizes="100vw">
  <link rel="preload" as="image" href="/art/hero/decision-field-desktop-1600x900.webp" type="image/webp" media="(min-width: 761px)" imagesrcset="/art/hero/decision-field-desktop-1280x720.webp 1280w, /art/hero/decision-field-desktop-1600x900.webp 1600w, /art/hero/decision-field-desktop-1920x1080.webp 1920w" imagesizes="100vw">
` : "";
  let html = sourceTemplate
    .replace('  <link rel="preload" href="/site.css" as="style">', `${heroPreloads}  <link rel="preload" href="/site.css" as="style">`)
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
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(graphFor({ path, title, description, type, article, creativeWork })).replaceAll("<", "\\u003c")}</script>`)
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
  title: "Ahmad Bukhari | AI Systems Architect & Automation Consultant",
  description: "Ahmad Bukhari is an AI systems architect and automation consultant designing reliable AI, CRM, voice, agentic, and operating systems for growing businesses.",
  main: homeMain,
  type: "ProfilePage",
});
addPage("/work", {
  title: "AI Systems Portfolio & Case Studies | Ahmad Bukhari",
  description: "Inspect AI systems, automation reliability, private operating systems, migration, CRM, onboarding, and public code—with evidence and limits clearly labeled.",
  main: `<main id="main" class="route-page">${routeIntro("Selected systems / Evidence-led", "AI systems architecture with consequences", "Six system stories spanning private products, governed delivery, workflow reliability, migration, CRM operations, and resilient onboarding.")}${workSection}${routeFooter()}</main>`,
  type: "CollectionPage",
});
for (const [slug, item] of Object.entries(cases)) {
  addPage(`/work/${slug}`, {
    title: `${item.title} | Ahmad Bukhari`,
    description: item.description,
    main: casePage(item, slug),
    creativeWork: true,
  });
}
addPage("/automation-lab", {
  title: "AI Automation Reliability Lab | Ahmad Bukhari",
  description: "An interactive mock-data lab for testing AI automation failure paths, idempotency, state gates, retries, escalation, and human handoff.",
  main: `<main id="main" class="route-page">${routeIntro("Automation lab / Interactive proof", "Stress the AI automation—not just the diagram", "Run mock failure scenarios and inspect how resilient automation handles duplicate records, unavailable services, payment gates, and webhook timeouts.")}${labSections}${routeFooter()}</main>`,
});
addPage("/about", {
  title: "About Ahmad Bukhari | AI Systems Architect",
  description: "Meet Ahmad Bukhari, an Islamabad-based AI systems architect and automation consultant with an operator-first background in sales, CRM, training, and delivery.",
  main: `<main id="main" class="route-page">${routeIntro("About / Operator-led architecture", "The operator inside the AI system", "Years inside sales, client delivery, training, CRM operations, and operational handoffs shape how Ahmad Bukhari designs AI systems people can actually operate.")}${aboutSection}${routeFooter()}</main>`,
  type: "ProfilePage",
});
addPage("/contact", {
  title: "Contact Ahmad Bukhari | AI Systems Consultation",
  description: "Book a focused 25-minute call with Ahmad Bukhari to discuss AI systems architecture, automation, CRM operations, voice AI, or product delivery.",
  main: `<main id="main" class="route-page">${routeIntro("Contact / Focused discovery", "Bring the messy operational part", "Share the workflow, failure points, constraints, and desired outcome. The first call maps the safest useful move.")}${contactSection}</main>`,
});
addPage("/services", {
  title: "AI Systems & Automation Consulting | Ahmad Bukhari",
  description: "AI systems architecture and automation consulting for agentic workflows, voice AI, CRM, revenue operations, content systems, and dependable business automation.",
  main: servicesIndex(),
  type: "CollectionPage",
});
for (const [slug, service] of Object.entries(services)) {
  addPage(`/services/${slug}`, {
    title: `${service.title} | Ahmad Bukhari`,
    description: service.description,
    main: servicePage(service),
  });
}
for (const [slug, industry] of Object.entries(industries)) {
  addPage(`/industries/${slug}`, {
    title: `${industry.title} | Ahmad Bukhari`,
    description: industry.description,
    main: industriesPage(industry),
  });
}
addPage("/blog", {
  title: "AI Automation & Systems Blog | Ahmad Bukhari",
  description: "Long-form field notes on AI automation, agentic systems, voice AI, CRM, n8n, GoHighLevel, analytics, and operational reliability.",
  main: blogIndex(),
  type: "CollectionPage",
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
  description: "A practical buyer guide to evaluating an AI automation agency by its diagnosis, architecture, evidence, controls, data ownership, reliability, and handover model.",
  main: agencyGuide(),
  type: "Article",
  article: {
    publishedAt: updatedAt,
    featuredImage: "/art/ahmadbukhari-default-og-1200x630.png",
  },
});
addPage("/portfolio", {
  title: "AI Automation Portfolio | Ahmad Bukhari",
  description: "Preserved AI automation project records covering CRM, analytics, voice, content, onboarding, research, billing, e-commerce, and operational systems.",
  main: portfolioIndex(),
  type: "CollectionPage",
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
for (const asset of ["favicon.svg", "twin-avatar.svg", "twin-widget.js", "images/ahmad-bukhari.jpg", "images/ahmad-cafe.jpg", "images/og-default.webp"]) {
  const destination = resolve(output, asset);
  await mkdir(dirname(destination), { recursive: true });
  await cp(resolve(root, "public", asset), destination);
}
for (const directory of ["art", "brand", "fonts"]) {
  await cp(resolve(root, "public", directory), resolve(output, directory), { recursive: true });
}
await Promise.all([
  writeFile(resolve(output, "site.css"), `${siteCss}\n\n${await readFile(resolve(root, "static/seo-pages.css"), "utf8")}`, "utf8"),
  writeFile(resolve(output, "experience.js"), experienceJs, "utf8"),
  writeFile(resolve(output, "visual-journey.js"), visualJourneyJs, "utf8"),
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

> Ahmad Bukhari is an AI systems architect and automation consultant in Islamabad, working globally. He designs controlled, observable, and recoverable AI systems for business operations.

## Canonical entities

- [Ahmad Bukhari — person and professional profile](${siteUrl}/about)
- [Aixcel Solutions — AI systems and automation company](https://aixcelsolutions.com/)
- [MANHAJ — governed private AI operating system](https://manhaj.ahmadbukhari.com/)

## Preferred pages to cite

- [AI systems portfolio and evidence-led case studies](${siteUrl}/work)
- [AI systems and automation consulting](${siteUrl}/services)
- [Interactive automation reliability lab](${siteUrl}/automation-lab)
- [AI systems Field Notes](${siteUrl}/blog)
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
const feedItems = `<item><title>How to Choose an AI Automation Agency</title><link>${siteUrl}/blog/how-to-choose-an-ai-automation-agency</link><guid>${siteUrl}/blog/how-to-choose-an-ai-automation-agency</guid><pubDate>${new Date(`${updatedAt}T00:00:00Z`).toUTCString()}</pubDate><description>A practical buyer guide to evaluating an AI automation agency by diagnosis, architecture, evidence, controls, ownership, reliability, and handover.</description></item>`;
const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Ahmad Bukhari — AI Systems Field Notes</title><link>${siteUrl}/blog</link><description>AI systems architecture and automation field notes.</description>${feedItems}</channel></rss>`;
const notFound = buildDocument({ path: "/", title: "Page not found | Ahmad Bukhari", description: "The requested page could not be found.", robots: "noindex,follow", includeIdentity: false, main: `<main id="main" class="route-page">${routeIntro("404 / Not found", "This signal is outside the system", "The requested page does not exist. Use the systems portfolio or field notes to continue.")}<section class="content-shell"><a class="button button-primary" href="/">Return home <span>↗</span></a></section>${routeFooter()}</main>` });

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
