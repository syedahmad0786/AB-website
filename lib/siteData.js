// Single source of truth for the facts the home page publishes.
// Read by lib/homeLogic.js (the interactive page), components/StaticHome.jsx (server-rendered HTML),
// and the machine-readable routes (llms.txt, profile.json, /mcp). Keep values identical to what the page shows.

export const SYSTEMS = [
  { name: 'Workspine', kind: 'Flagship product', status: 'In progress', href: 'https://ahmadbukhari.com/work/workspine', desc: 'A private desktop work-memory system that turns fragmented activity into a navigable timeline of context, decisions, and evidence.', tags: 'Product architecture · Memory · Privacy', logos: [], slot: 'sys-workspine', ph: 'GIF: Workspine timeline scrolling through a day of context (16:10)' },
  { name: 'MANHAJ', kind: 'Delivery engine', status: 'Private system', href: 'https://ahmadbukhari.com/work/manhaj', desc: 'A system factory and control plane for turning repeatable delivery knowledge into governed modules, agents, and releases.', tags: 'System factory · Governance', logos: [], slot: 'sys-manhaj', ph: 'GIF: a module passing the quality gate to release (16:10)' },
  { name: 'Enterprise OS', kind: 'Client system', status: 'Anonymized', href: 'https://ahmadbukhari.com/work/enterprise-os', desc: 'A layered operating model joining permissions, delivery, finance, state gates, and observability without exposing client internals.', tags: 'Architecture · Controls · Audit', logos: [], slot: 'sys-enterprise-os', ph: 'Blurred dashboard capture or architecture diagram (16:10)' },
  { name: 'Self Healing Automation', kind: 'Reliability system · ErrorLens', status: 'Public proof', href: 'https://ahmadbukhari.com/work/errorlens', desc: 'ErrorLens turns workflow failures into structured events. It classifies errors, retries safe cases, escalates with context, and records what needs fixing.', tags: 'Observability · Recovery', logos: ['n8n'], slot: 'sys-errorlens', ph: 'GIF: n8n run failing, then ErrorLens classifying and retrying (16:10)' },
  { name: 'Make → n8n Factory', kind: 'Migration factory', status: 'Documented scope', href: 'https://ahmadbukhari.com/work/migration-factory', desc: 'A migration program that classifies 108 workflow candidates into reusable families, then validates behavior instead of copying spaghetti.', tags: '108 candidates · Migration · QA', logos: ['make', 'n8n'], slot: 'sys-migration', ph: 'GIF: Make scenario next to its rebuilt n8n workflow (16:10)' },
  { name: 'Resilient Onboarding', kind: 'Cross-platform operations', status: 'Anonymized', href: 'https://ahmadbukhari.com/work/onboarding', desc: 'A checkpointed onboarding architecture spanning CRM, billing, calendars, messaging, and human handoffs. Recovery is part of the design.', tags: 'CRM · Provisioning · State', logos: ['n8n', 'airtable', 'supabase'], slot: 'sys-onboarding', ph: 'GIF: onboarding pipeline dashboard, a stuck client being retried (16:10)' }
];

export const REPOS = [
  { kind: 'AI OPS', name: 'FlowSentry', slug: 'flowsentry', desc: 'Deterministic n8n failure detection with local LLM root cause analysis and Slack ready digests.', logos: ['python', 'n8n', 'ollama'] },
  { kind: 'HUMAN IN LOOP', name: 'Ticket Triage AI', slug: 'ticket-triage-ai', desc: 'KB grounded ticket classification, priority, routing, and drafts with approval before customer delivery.', logos: ['fastapi', 'streamlit', 'sqlite'] },
  { kind: 'DATA AGENT', name: 'SQL Analyst Agent', slug: 'sql-analyst-agent', desc: 'A schema aware, SELECT only analyst that reads errors, repairs its SQL, and makes every attempt visible.', logos: ['duckdb', 'python', 'ollama'] },
  { kind: 'RESEARCH', name: 'Paper Scout', slug: 'paper-scout', desc: 'New arXiv papers become a referenced briefing, comparison table, open questions, and interactive topic map.', logos: ['arxiv', 'plotly', 'ollama'] },
  { kind: 'VOICE', name: 'VoiceLine AI', slug: 'voiceline-ai', desc: 'A local voice receptionist that extracts intent, schedules an appointment, and returns a spoken confirmation.', logos: ['openai', 'python'] },
  { kind: 'DOCUMENT AI', name: 'Extractor Pipeline', slug: 'extractor-pipeline', desc: 'Messy documents become validated records through schema checks, model repair, and explicit failure logs.', logos: ['pydantic', 'sqlite'] }
];

export const TOOLS = [
  ['OpenAI', null, 'openai.com'], ['Claude', 'claude', 'claude.ai'], ['n8n', 'n8n', 'n8n.io'], ['Make', 'make', 'make.com'], ['HubSpot', 'hubspot', 'hubspot.com'],
  ['GoHighLevel', null, 'gohighlevel.com'], ['Vapi', null, 'vapi.ai'], ['ElevenLabs', 'elevenlabs', 'elevenlabs.io'], ['monday.com', null, 'monday.com'], ['Power BI', null, 'powerbi.microsoft.com'],
  ['Tableau', null, 'tableau.com'], ['Airtable', 'airtable', 'airtable.com'], ['Supabase', 'supabase', 'supabase.com'], ['Intercom', 'intercom', 'intercom.com'],
  ['Close', null, 'close.com'], ['Next.js', 'nextdotjs', 'nextjs.org'], ['Vercel', 'vercel', 'vercel.com'], ['Python', 'python', 'python.org'], ['FastAPI', 'fastapi', 'fastapi.tiangolo.com'],
  ['Ollama', 'ollama', 'ollama.com'], ['DuckDB', 'duckdb', 'duckdb.org'], ['Pydantic', 'pydantic', 'pydantic.dev'], ['GitHub', 'github', 'github.com'], ['Cal.com', 'caldotcom', 'cal.com']
];

export const CASES = [
  { name: 'Conversions.ai', sector: 'AI agency · US', status: 'Built and handed over', href: 'https://www.conversions.ai', logo: 'https://aixcelsolutions.com/assets/clients/conversions-ai-icon.png', problem: 'Lead, onboarding and reporting work had to run across four separate client workspaces.', built: 'Workflows across all four workspaces: ads, attribution, CRM and reporting.', tools: ['n8n', 'make'], stats: [[39, '', 'n8n workflows'], [103, '', 'Make scenarios'], [4, '', 'client workspaces']] },
  { name: 'Modern Amenities', sector: 'Smart vending · Community', status: 'Engagement completed', href: 'https://modern-amenities.com', logo: 'https://aixcelsolutions.com/assets/clients/modern-amenities.svg', problem: 'Automations were spread across three platforms, and setting up a new member touched several tools.', built: 'Monitoring across every automation and one onboarding pipeline for new members.', tools: ['n8n', 'make', 'zapier'], stats: [[216, '', 'automations monitored across n8n, Make and Zapier'], [7, '', 'platforms in one six-stage onboarding pipeline'], [52, '/52', 'automated tests passing']] },
  { name: 'ChiroCandy', sector: 'Healthcare marketing', status: 'Reconciled July 2026', href: 'https://chirocandy.com', logo: 'https://aixcelsolutions.com/assets/clients/chirocandy.png', problem: 'A large set of GoHighLevel locations had to be accounted for before clinic accounts could run from one system.', built: 'An inventory of every location and one role-gated system for accounts and staff.', tools: ['ghl'], stats: [[450, '', 'GoHighLevel locations inventoried and reconciled'], [204, '', 'client accounts and 22 staff, role-gated'], [7, '', 'AI call flows, new lead to missed-call callback']] }
];

export const CLIENTS = [
  ['Conversions.ai', 'conversions-ai.png', 'https://www.conversions.ai', 'AI agency · US', '39 n8n workflows and 103 Make scenarios across four client workspaces.'],
  ['We Scale Creators', 'we-scale-creators.png', 'https://wescalecreators.com', 'Creator growth · US', 'Creator CRM stacks, billing recovery, intake-to-fulfilment pipelines and CAC, LTV and ROAS reporting.'],
  ['Agency on Fire', 'agency-on-fire.png', 'https://www.skool.com/agencyonfirecoaching/about', 'Agency coaching · US', 'GoHighLevel CRM automation, funnel templates, lead nurture and student-progress dashboards.'],
  ['Modern Amenities', 'modern-amenities.svg', 'https://modern-amenities.com', 'Smart vending · Community', '216 automations monitored and one six-stage onboarding pipeline across 7 platforms.'],
  ['ChiroCandy', 'chirocandy.png', 'https://chirocandy.com', 'Healthcare marketing', '450 GoHighLevel locations reconciled, 204 accounts on one role-gated system, 7 AI call flows.'],
  ['Hrmny', 'hrmny.png', 'https://hrmny.co', 'Creative agency · Dubai & Riyadh', 'Creative and communications agency across digital, social, brand experience and production.'],
  ['AI Product Accelerator', 'ai-product-accelerator.png', 'https://aiproductaccelerator.com', 'Education program', 'Helps professionals launch their own AI product in 90 days, without writing code.'],
  ['RepStack', 'repstack-ink.svg', 'https://repstack.co', 'Remote staffing', 'Places employer-of-record talent with digital agencies and GoHighLevel SaaS founders.'],
  ['One Konnector', 'one-konnector-ink.png', 'https://onekonnector.com', 'CRM & lead capture', 'CRM and lead-capture business running its funnels and pipeline on GoHighLevel.'],
  ['VT Capital', 'vt-capital.svg', 'https://aixcelsolutions.com/work#vt-capital', 'Capital · Cyprus', 'Architected and automated key stages of its AI video production pipeline.'],
  ['Hire Zim AI', 'https://www.google.com/s2/favicons?domain=hirezim.ai&sz=128', 'https://www.hirezim.ai/', 'AI hiring', 'Systems work delivered through AiXCEL Solutions.'],
  ['Realiste', { mono: ['R', '#121210'] }, 'https://realiste.ai/en', 'AI real estate analytics', 'Systems work delivered through AiXCEL Solutions.']
];

export const PROTOS = [
  { name: 'Creator Campaign Command', desc: 'Turn a campaign brief into a ranked creator plan that stops at human review.', href: 'https://campaign-command.aixcelsolutions.com', mode: 'demo' },
  { name: 'LanguageMix Studio', desc: 'Propose culturally reviewed multilingual copy while preserving source meaning and approval.', href: 'https://language-mix.aixcelsolutions.com', mode: 'demo' },
  { name: 'Marketing Revenue Assurance', desc: 'Reconcile advertising, CRM, funnel, and collected-cash evidence before acting on a revenue signal.', href: 'https://marketing-revenue-assurance.vercel.app', mode: 'demo' },
  { name: 'Deal Rescue & Forecast Truth', desc: 'Compare seller confidence with buyer evidence and dated commitments before a forecast decision.', href: 'https://deal-rescue-forecast-truth.vercel.app', mode: 'demo' },
  { name: 'Creative Learning OS', desc: 'Separate a useful creative signal from audience, placement, lag, and data-quality confounds.', href: 'https://creative-learning-os.vercel.app', mode: 'demo' },
  { name: 'Creator & Talent Campaign OS', desc: 'Check campaign fit, rights, safety, history, budget, and concentration before selecting a roster.', href: 'https://creator-talent-campaign-os.vercel.app', mode: 'demo' },
  { name: 'Agentic Systems Gateway', desc: 'Provide an inspectable gateway for replay, model access boundaries, and release evidence.', href: 'https://agentic-systems-gateway.vercel.app', mode: 'demo' },
  { name: 'Agentic Systems Evaluation Lab', desc: 'Exercise API contracts, evidence references, approval gates, and failure behavior across deployed examples.', href: 'https://evaluation-lab.aixcelsolutions.com', mode: 'demo' },
  { name: 'Content Performance Forecaster', desc: 'Explore a historical forecasting baseline with ranges, cohort context, and input sensitivity.', href: 'https://content-forecast.aixcelsolutions.com', mode: 'demo' },
  { name: 'Revenue Signal Graph', desc: 'Turn fragmented account evidence into a qualification decision and a human-reviewed action proposal.', href: 'https://revenue-signals.aixcelsolutions.com', mode: 'demo' }
];

export const AG = [
  { name: 'Creator Campaign Command', kind: 'Multi-agent campaign planning', slug: 'creator-campaign-command', pub: true, desc: 'Five bounded roles turn a campaign objective and budget into an evidence-linked creator plan, then stop before outreach or spend.', checks: ['LangGraph + FastAPI', '5 bounded roles', '3 scenario shapes', 'Objective-sensitive ranking', 'Approval gate before outreach or spend'], big: [['5', 'bounded roles'], ['3', 'scenario shapes'], ['1', 'approval gate']], verified: 'Verified 5 Aug 2026' },
  { name: 'Marketing Revenue Assurance', kind: 'Cross-system revenue assurance', slug: 'marketing-revenue-assurance', pub: false, brief: true, desc: 'Ten bounded specialists reconcile advertising delivery, CRM state, funnel movement, and collected cash, then propose a recovery plan without changing any external system.', checks: ['12 of 12 golden scenarios', '31 automated tests', '81.93% measured coverage', '25 Postman assertions', 'Signed serverless approval receipts', 'Docker and PostgreSQL acceptance'], big: [['12/12', 'golden scenarios'], ['31', 'tests'], ['81.93%', 'coverage']], verified: 'Verified 10 Aug 2026' },
  { name: 'Deal Rescue & Forecast Truth', kind: 'B2B forecast control', slug: 'deal-rescue-forecast-truth', pub: false, brief: true, desc: 'Twelve bounded stages compare seller confidence with exact buyer language, stakeholder coverage, and dated commitments, then stop at a sales manager decision.', checks: ['12 of 12 golden deal states', '53 automated tests', '83.97% measured coverage', '28 live Postman assertions', 'PostgreSQL checkpoint restart proof', '0 external mutations'], big: [['12/12', 'golden deal states'], ['53', 'tests'], ['83.97%', 'coverage']], verified: 'Verified' },
  { name: 'Creative Learning OS', kind: 'Creative measurement and learning', slug: 'creative-learning-os', pub: false, brief: true, desc: 'Eleven bounded stages separate attributable creative signal from sample, audience, placement, funnel, lag, fatigue, and data-quality confounds, then stop before publishing or changing spend.', checks: ['13 of 13 golden scenarios', '68 automated tests', '82.76% measured coverage', '18 evaluation measures', '34 production Postman assertions', '0 platform mutations'], big: [['13/13', 'golden scenarios'], ['68', 'tests'], ['82.76%', 'coverage']], verified: 'Verified' },
  { name: 'LanguageMix Studio', kind: 'Multilingual content operations', slug: 'language-mix-studio', pub: true, desc: 'Timed English scripts become distinct Urdu, Roman Urdu, or Arabic review packages with voice register, safety checks, and native-language approval.', checks: ['FastAPI', '3 source scenarios', '3 locale routes', '3 registers', '27 meaningful combinations', 'Native-language approval'], big: [['3', 'locale routes'], ['3', 'voice registers'], ['27', 'combinations']], verified: 'Verified 5 Aug 2026' },
  { name: 'Agentic Systems Evaluation Lab', kind: 'Independent evaluation', slug: 'agentic-systems-evaluation-lab', pub: true, desc: 'A live black-box evaluator tests deployed systems for contracts, evidence, approval gates, boundaries, idempotency, and latency.', checks: ['3 target systems', '7 weighted checks', '4 baseline and fault scenarios', 'Arbitrary URLs blocked'], big: [['3', 'target systems'], ['7', 'weighted checks'], ['4', 'fault scenarios']], verified: 'Verified 5 Aug 2026' },
  { name: 'Content Performance Forecaster', kind: 'Pre-publish decision support', slug: 'content-performance-forecaster', pub: true, desc: 'A reproducible historical baseline returns forecast ranges, confidence, cohort fallback, and input sensitivity before publication.', checks: ['500 licensed records', '400 training rows', '100 holdout rows', 'Versioned ridge models', 'No LLM claim'], big: [['500', 'licensed records'], ['100', 'holdout rows'], ['0', 'LLM claims']], verified: 'Verified 5 Aug 2026' },
  { name: 'Revenue Signal Graph', kind: 'Governed revenue operations', slug: 'revenue-signal-graph', pub: false, desc: 'Seven bounded agents convert fragmented account evidence into an explainable qualification, speed-to-lead decision, and human-reviewed action proposal.', checks: ['LangGraph + FastAPI, PostgreSQL path', '12 of 12 golden scenarios', '31 automated tests', '85.30% measured coverage', '18 Postman assertions', '$0 replay inference'], big: [['12/12', 'golden scenarios'], ['85.30%', 'coverage'], ['$0', 'replay inference']], verified: 'Verified 10 Aug 2026' },
  { name: 'Creator & Talent Campaign OS', kind: 'Creator and talent campaign control', slug: 'creator-talent-campaign-os', pub: false, brief: true, desc: 'Twelve bounded stages test audience authenticity, campaign fit, conflicts, rights, safety, historical evidence, budget, and concentration, then stop at a campaign manager decision.', checks: ['13 of 13 golden scenarios', '70 automated tests', '85.38% measured coverage', '18 evaluation measures', '34 production Postman assertions', '0 external writes'], big: [['13/13', 'golden scenarios'], ['70', 'tests'], ['85.38%', 'coverage']], verified: 'Verified' },
  { name: 'Agentic Systems Gateway', kind: 'Governed model access and release evidence', slug: 'agentic-systems-gateway', pub: false, brief: true, desc: 'A deterministic policy gateway gives nine deployed systems free replay, visitor-owned NVIDIA NIM or OpenRouter access, signed receipts, and an evidence-qualified evaluation registry without exposing an owner-funded model key.', checks: ['Fixed provider allowlist', 'HMAC receipts', '85 automated tests', '18 of 18 evaluation measures', '40 production Postman assertions', '0 production 5xx'], big: [['85', 'tests'], ['18/18', 'evaluation measures'], ['0', 'production 5xx']], verified: 'Verified 11 Aug 2026' }
];

export const AGSTACK = [['Python', 'python', 'python.org'], ['FastAPI', 'fastapi', 'fastapi.tiangolo.com'], ['Pydantic v2', 'pydantic', 'pydantic.dev'], ['LangGraph', 'langgraph', 'langchain.com'], ['Postman', 'postman', 'postman.com'], ['Pytest', 'pytest', 'pytest.org'], ['GitHub Actions', 'githubactions', 'github.com'], ['Playwright', null, 'playwright.dev'], ['Vercel', 'vercel', 'vercel.com'], ['OpenTelemetry', 'opentelemetry', 'opentelemetry.io'], ['Prometheus', 'prometheus', 'prometheus.io'], ['PostgreSQL', 'postgresql', 'postgresql.org'], ['Docker', 'docker', 'docker.com'], ['NVIDIA NIM', 'nvidia', 'nvidia.com'], ['OpenRouter', null, 'openrouter.ai']];

export const CH = [
  ['LinkedIn', null, 'linkedin.com', 'in/bukhariahmad', 'https://www.linkedin.com/in/bukhariahmad', 'LinkedIn post', ['/api/social/linkedin', 'page']],
  ['X', 'x', 'x.com', '@ahmadbukhari', 'https://x.com/ahmadbukhari', 'Posts on X', ['/assets/social/x.jpg', 'shot']],
  ['Instagram', 'instagram', 'instagram.com', '@bukharibuildsai', 'https://www.instagram.com/bukharibuildsai/', 'Instagram reel', ['https://www.instagram.com/reel/DdvBcyxT_SO/embed/', 'page']],
  ['TikTok', 'tiktok', 'tiktok.com', '@ahmad.bukhari0786', 'https://www.tiktok.com/@ahmad.bukhari0786', 'TikTok profile', ['/api/social/tiktok', 'video']],
  ['YouTube', 'youtube', 'youtube.com', '@AhmadBukhari97', 'https://www.youtube.com/@AhmadBukhari97', 'YouTube channel', ['/api/social/youtube', 'video']],
  ['Facebook', 'facebook', 'facebook.com', 'Bukhari Builds AI', 'https://www.facebook.com/profile.php?id=61593858664534', 'Facebook page', ['/assets/social/facebook.jpg', 'shot']],
  ['GitHub', 'github', 'github.com', 'syedahmad0786', 'https://github.com/syedahmad0786', 'GitHub profile', ['/assets/social/github.jpg', 'shot']],
  ['n8n', 'n8n', 'n8n.io', 'creators/ahmadbukhari', 'https://n8n.io/creators/ahmadbukhari/', 'n8n creator profile', ['https://n8n.io/creators/ahmadbukhari/', 'page']]
];


// V7: shared catalogue and marketing overlay; original evidence preserved.
export const FEATURED_PRODUCTS = [
  {
    "slug": "openxcel-ai",
    "embed": { "src": "/work-walkthrough/apps/openxcel/embed.html", "chrome": "slack", "app": "openxcel", "title": "OpenXCEL in Slack", "mark": "/portfolio-brand/openxcel-mark.png" },
    "presentation": "ox-workspace",
    "presentationCaption": "Illustrative walkthrough authored for this portfolio with example wording. It is not a recording of a connected workspace. Earlier memory and connections screens are in the case study.",
    "name": "OpenXCEL AI",
    "purpose": "Give your business an AI coworker with company context.",
    "description": "OpenXCEL AI brings company memory, editable skills, tools and approval boundaries into a business-owned AI workspace. Built around a self-hosted Slack coworker, it gives teams a practical way to organize context and define how delegated work should be reviewed.",
    "capabilities": [
      "Company-context workspace with retained memory and editable skills.",
      "Self-hosted Slack coworker setup for business task intake and tool use.",
      "Connection setup and approval boundaries tied to the intended task and reviewer."
    ],
    "caseHref": "/work/case-studies/openxcel-ai",
    "walkthroughHref": null,
    "image": {
      "src": "/project-showcase/f34d67c1d90b-openxcel-skills.png",
      "alt": "OpenXCEL skills workspace",
      "caption": "Existing product-page workspace image. Branding adapted and identities masked at source; not a current execution receipt.",
      "proofClass": "workspace-view",
      "width": 1600,
      "height": 747,
      "sourceSrc": "portfolio-v5/assets/products/openxcel-skills.png",
      "publicSrc": "/case-studies/assets/f34d67c1d90b-openxcel-skills.png"
    }
  },
  {
    "slug": "healthcare-agency-operating-os",
    "embed": { "src": "/work-walkthrough/apps/command-center/embed.html", "chrome": "app", "app": "command-center", "title": "Command Center", "monogram": "CC" },
    "name": "Command Center",
    "purpose": "Run client delivery from a shared operating workspace.",
    "description": "Command Center brings client ownership, lifecycle milestones, service context and report review into a shared agency workspace. Teams can follow the client journey, inspect provider collection results and move the next handoff forward with clear responsibility.",
    "capabilities": [
      "Client and staff ownership linked to lifecycle milestones, services and activity.",
      "Provider collection receipts and data-gap visibility alongside client reporting.",
      "Versioned report review with role-based access and separately scoped company knowledge."
    ],
    "caseHref": "/work/case-studies/healthcare-agency-operating-os",
    "walkthroughHref": "/work/case-studies/healthcare-agency-operating-os/walkthrough",
    "image": {
      "src": "/project-showcase/e43b59190fc2-01-lifecycle.png",
      "alt": "Client lifecycle and ownership",
      "caption": "Local operating interface with example client records.",
      "proofClass": "synthetic-interface",
      "width": 2160,
      "height": 1350,
      "sourceSrc": "portfolio-v5/assets/command-center/01-lifecycle.png",
      "publicSrc": "/case-studies/assets/e43b59190fc2-01-lifecycle.png"
    }
  },
  {
    "slug": "member-onboarding",
    "embed": { "src": "/work-walkthrough/apps/onboard/embed.html", "chrome": "app", "app": "onboard", "title": "Onboard", "monogram": "OB" },
    "name": "Member Onboarding",
    "purpose": "Give every member setup step a clear checkpoint.",
    "description": "Onboard makes the member setup journey easy to follow from a won Close CRM opportunity through Airtable, Mighty Networks, Intercom and Slack. Its checkpoint interface brings stage status and failure handling into a clear operating view for the team.",
    "capabilities": [
      "Checkpoint interface mapping the Close CRM handoff to tracking, community, support and team notifications.",
      "Stage and error views for inspecting individual member setup handoffs.",
      "Local retry controls for working through failed checkpoint paths."
    ],
    "caseHref": "/work/case-studies/member-onboarding",
    "walkthroughHref": "/work/case-studies/member-onboarding/walkthrough",
    "image": {
      "src": "/project-showcase/795f042a097c-01-pipeline.png",
      "alt": "Member onboarding pipeline",
      "caption": "Local example members and checkpoints.",
      "proofClass": "synthetic-interface",
      "width": 2160,
      "height": 1350,
      "sourceSrc": "portfolio-v5/assets/onboard/01-pipeline.png",
      "publicSrc": "/case-studies/assets/795f042a097c-01-pipeline.png"
    }
  },
  {
    "slug": "automation-monitoring",
    "embed": { "src": "/work-walkthrough/apps/errorlens/embed.html", "chrome": "app", "app": "errorlens", "title": "ErrorLens", "monogram": "EL" },
    "name": "ErrorLens",
    "purpose": "Make broken automations visible and actionable.",
    "description": "ErrorLens gives teams a clear place to investigate workflow failures. Execution details, severity, suggested next steps and incident ownership sit together, while logging and Slack alert paths bring the failure context into the team’s daily operating rhythm.",
    "capabilities": [
      "Incident review interface with filters, failure detail and assigned ownership.",
      "Failure-context views covering classification, severity and suggested next steps.",
      "Recovery review controls with incident status and a local resolved state."
    ],
    "caseHref": "/work/case-studies/automation-monitoring",
    "walkthroughHref": "/work/case-studies/automation-monitoring/walkthrough",
    "image": {
      "src": "/project-showcase/fa7b7a4674f7-01-overview.png",
      "alt": "ErrorLens incident overview",
      "caption": "Local interface with example incidents; not current client failures.",
      "proofClass": "synthetic-interface",
      "width": 2160,
      "height": 1350,
      "sourceSrc": "portfolio-v5/assets/errorlens/01-overview.png",
      "publicSrc": "/case-studies/assets/fa7b7a4674f7-01-overview.png"
    }
  },
  {
    "slug": "dashboards-daily-pulse",
    "embed": { "src": "/work-walkthrough/widgets/member-pulse/embed.html", "chrome": "app", "app": "member-pulse", "title": "Member Pulse", "monogram": "MP", "spark": true },
    "name": "Member Pulse",
    "purpose": "See the member journey, not just the latest interaction.",
    "description": "Member Pulse brings a member’s timeline, lifecycle, experience map, interaction stream and tenure into a connected application. Teams can inspect events, explore the inputs behind health signals and view membership patterns across time before choosing their next action.",
    "capabilities": [
      "Timeline and Stages views with platform lanes, date ranges and event detail.",
      "Experience Map and Pulse Stream views linking touchpoints, interaction context and inspectable health signals.",
      "Tenure views for cohorts, joins, calendars and membership duration."
    ],
    "caseHref": "/work/case-studies/dashboards-daily-pulse",
    "walkthroughHref": "/work/case-studies/dashboards-daily-pulse/walkthrough",
    "image": {
      "src": "/project-showcase/5353e9586d94-02-stages.png",
      "alt": "Member Pulse: Stages",
      "caption": "Recovered original Stages view, restored locally with fictional records. Viewport excerpt; open the walkthrough for the full interactive view. Not connected to member accounts.",
      "proofClass": "synthetic-interface",
      "width": 2082,
      "height": 800,
      "sourceSrc": "portfolio-v6/assets/member-pulse/02-stages.png",
      "publicSrc": "/case-studies/assets/5353e9586d94-02-stages.png"
    }
  },
  {
    "slug": "signal",
    "embed": { "src": "/work-walkthrough/apps/signal/embed.html", "chrome": "app", "app": "signal", "title": "SIGNAL", "mark": "/portfolio-brand/signal-mark.svg" },
    "name": "SIGNAL",
    "purpose": "Connect AI visibility with the questions buyers ask.",
    "description": "SIGNAL brings buyer questions, AI answer observations, cited sources and referral reporting into a focused visibility workspace. It helps teams inspect where a brand appears, understand the supporting sources and organize the next research or content decision.",
    "capabilities": [
      "Visibility matrix and project workspace for organizing buyer-question coverage.",
      "Observation structure linking questions, answer engines, dates, methods and cited sources.",
      "AI-referral views that place visibility alongside visits and conversion context."
    ],
    "caseHref": "/work/case-studies/signal",
    "walkthroughHref": null,
    "image": {
      "src": "/project-showcase/dfe21b5f2bee-signal-matrix.png",
      "alt": "SIGNAL answer-visibility matrix",
      "caption": "Existing SIGNAL product image with a sample bicycle-brand dataset, not an AiXCEL client result.",
      "proofClass": "product-view",
      "width": 1200,
      "height": 975,
      "sourceSrc": "portfolio-v5/assets/products/signal-matrix.png",
      "publicSrc": "/case-studies/assets/dfe21b5f2bee-signal-matrix.png"
    }
  }
];
