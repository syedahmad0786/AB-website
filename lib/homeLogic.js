// Ported from the Claude Design prototype `project/Home v8.dc.html` (<script data-dc-script>).
// Behaviour is kept 1:1 with the design; the JSX template lives in components/Home.jsx.
import React from 'react';
import { DCLogic } from './dcLogic';
import BlackHole from '../components/BlackHole';

export class HomeLogic extends DCLogic {
  state = { nodes: {}, wires: {}, log: [], run: 0, scen: 'happy', stack: 0, sel: 0, hl: null, clock: '', marqPaused: false, cp: 1, hc: -1, labF: 'all', selA: 0, vk: 0, liveA: false, ch: 0, gh: [], ghi: 0, buds: [], swarm: false, cheer: false, bmsgs: {}, winners: [], cam: { x: 0, y: 0, z: 1 }, panning: false, inspect: null, openCase: -1, ox: 0, netSel: 0, grav: null, theme: 'light', layout: -1, pos: {}, swap: {}, extras: [] };
  rootRef = React.createRef();
  bgRef = React.createRef();
  curRef = React.createRef();
  casesRef = React.createRef();
  L(name, slug, domain) {
    const fb = 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=128';
    return { name, src: slug ? 'https://cdn.simpleicons.org/' + slug : fb, fb };
  }
  STACKS = [
    { trig: this.L('n8n', 'n8n', 'n8n.io'), llm: this.L('Claude', 'claude', 'claude.ai'), crm: this.L('HubSpot', 'hubspot', 'hubspot.com'), cal: this.L('Cal.com', 'caldotcom', 'cal.com'), guard: this.L('n8n', 'n8n', 'n8n.io'), store: this.L('Supabase', 'supabase', 'supabase.com') },
    { trig: this.L('Make', 'make', 'make.com'), llm: this.L('OpenAI', null, 'openai.com'), crm: this.L('GoHighLevel', null, 'gohighlevel.com'), cal: this.L('Calendly', 'calendly', 'calendly.com'), guard: this.L('n8n', 'n8n', 'n8n.io'), store: this.L('Airtable', 'airtable', 'airtable.com') },
    { trig: this.L('n8n', 'n8n', 'n8n.io'), llm: this.L('Ollama', 'ollama', 'ollama.com'), crm: this.L('Close', null, 'close.com'), cal: this.L('Cal.com', 'caldotcom', 'cal.com'), guard: this.L('n8n', 'n8n', 'n8n.io'), store: this.L('Supabase', 'supabase', 'supabase.com') }
  ];
  NODES = [
    { k: 'n1', x: 20, y: 40, t: 'trig', label: 'Trigger', title: 'New inbound request' },
    { k: 'n2', x: 270, y: 40, t: 'llm', label: 'Understand', title: 'Read intent and context' },
    { k: 'n3', x: 520, y: 40, t: 'crm', label: 'CRM', title: 'Upsert contact, no duplicates' },
    { k: 'n4', x: 770, y: 40, t: 'cal', label: 'Act', title: 'Book the discovery call' },
    { k: 'n5', x: 770, y: 400, t: 'guard', label: 'ErrorLens', title: 'Classify the outcome' },
    { k: 'n7', x: 20, y: 400, t: 'store', label: 'Evidence', title: 'Write the record' }
  ];
  WIRES = {
    w12: 'M225 90 C248 90 248 90 270 90', w23: 'M475 90 C498 90 498 90 520 90', w34: 'M725 90 C748 90 748 90 770 90',
    w45: 'M850 140 L850 400', w54: 'M915 400 C975 330 975 210 915 140',
    w56: 'M770 450 C700 450 690 450 615 450', w67: 'M375 450 C300 450 290 450 225 450',
    w57: 'M880 500 C880 600 122 600 122 500'
  };
  WLABEL = { w45: ['result', 842, 270, 'end'], w54: ['retry', 972, 270], w56: ['needs judgment', 630, 438], w57: ['all gates pass', 440, 588] };
  SYSTEMS = [
    { name: 'Workspine', kind: 'Flagship product', status: 'In progress', href: 'https://ahmadbukhari.com/work/workspine', desc: 'A private desktop work-memory system that turns fragmented activity into a navigable timeline of context, decisions, and evidence.', tags: 'Product architecture · Memory · Privacy', logos: [], slot: 'sys-workspine', ph: 'GIF: Workspine timeline scrolling through a day of context (16:10)' },
    { name: 'MANHAJ', kind: 'Delivery engine', status: 'Private system', href: 'https://ahmadbukhari.com/work/manhaj', desc: 'A system factory and control plane for turning repeatable delivery knowledge into governed modules, agents, and releases.', tags: 'System factory · Governance', logos: [], slot: 'sys-manhaj', ph: 'GIF: a module passing the quality gate to release (16:10)' },
    { name: 'Enterprise OS', kind: 'Client system', status: 'Anonymized', href: 'https://ahmadbukhari.com/work/enterprise-os', desc: 'A layered operating model joining permissions, delivery, finance, state gates, and observability without exposing client internals.', tags: 'Architecture · Controls · Audit', logos: [], slot: 'sys-enterprise-os', ph: 'Blurred dashboard capture or architecture diagram (16:10)' },
    { name: 'Self Healing Automation', kind: 'Reliability system · ErrorLens', status: 'Public proof', href: 'https://ahmadbukhari.com/work/errorlens', desc: 'ErrorLens turns workflow failures into structured events. It classifies errors, retries safe cases, escalates with context, and records what needs fixing.', tags: 'Observability · Recovery', logos: ['n8n'], slot: 'sys-errorlens', ph: 'GIF: n8n run failing, then ErrorLens classifying and retrying (16:10)' },
    { name: 'Make → n8n Factory', kind: 'Migration factory', status: 'Documented scope', href: 'https://ahmadbukhari.com/work/migration-factory', desc: 'A migration program that classifies 108 workflow candidates into reusable families, then validates behavior instead of copying spaghetti.', tags: '108 candidates · Migration · QA', logos: ['make', 'n8n'], slot: 'sys-migration', ph: 'GIF: Make scenario next to its rebuilt n8n workflow (16:10)' },
    { name: 'Resilient Onboarding', kind: 'Cross-platform operations', status: 'Anonymized', href: 'https://ahmadbukhari.com/work/onboarding', desc: 'A checkpointed onboarding architecture spanning CRM, billing, calendars, messaging, and human handoffs. Recovery is part of the design.', tags: 'CRM · Provisioning · State', logos: ['n8n', 'airtable', 'supabase'], slot: 'sys-onboarding', ph: 'GIF: onboarding pipeline dashboard, a stuck client being retried (16:10)' }
  ];
  LOGOS = {
    n8n: ['n8n', 'n8n', 'n8n.io'], make: ['Make', 'make', 'make.com'], airtable: ['Airtable', 'airtable', 'airtable.com'], supabase: ['Supabase', 'supabase', 'supabase.com'],
    python: ['Python', 'python', 'python.org'], ollama: ['Ollama', 'ollama', 'ollama.com'], fastapi: ['FastAPI', 'fastapi', 'fastapi.tiangolo.com'], streamlit: ['Streamlit', 'streamlit', 'streamlit.io'],
    sqlite: ['SQLite', 'sqlite', 'sqlite.org'], duckdb: ['DuckDB', 'duckdb', 'duckdb.org'], arxiv: ['arXiv', 'arxiv', 'arxiv.org'], plotly: ['Plotly', 'plotly', 'plotly.com'],
    openai: ['Whisper', null, 'openai.com'], pydantic: ['Pydantic', 'pydantic', 'pydantic.dev'],
    zapier: ['Zapier', 'zapier', 'zapier.com'], ghl: ['GoHighLevel', null, 'gohighlevel.com'], vercel: ['Vercel', 'vercel', 'vercel.com'], github: ['GitHub', 'github', 'github.com']
  };
  REPOS = [
    { kind: 'AI OPS', name: 'FlowSentry', slug: 'flowsentry', desc: 'Deterministic n8n failure detection with local LLM root cause analysis and Slack ready digests.', logos: ['python', 'n8n', 'ollama'] },
    { kind: 'HUMAN IN LOOP', name: 'Ticket Triage AI', slug: 'ticket-triage-ai', desc: 'KB grounded ticket classification, priority, routing, and drafts with approval before customer delivery.', logos: ['fastapi', 'streamlit', 'sqlite'] },
    { kind: 'DATA AGENT', name: 'SQL Analyst Agent', slug: 'sql-analyst-agent', desc: 'A schema aware, SELECT only analyst that reads errors, repairs its SQL, and makes every attempt visible.', logos: ['duckdb', 'python', 'ollama'] },
    { kind: 'RESEARCH', name: 'Paper Scout', slug: 'paper-scout', desc: 'New arXiv papers become a referenced briefing, comparison table, open questions, and interactive topic map.', logos: ['arxiv', 'plotly', 'ollama'] },
    { kind: 'VOICE', name: 'VoiceLine AI', slug: 'voiceline-ai', desc: 'A local voice receptionist that extracts intent, schedules an appointment, and returns a spoken confirmation.', logos: ['openai', 'python'] },
    { kind: 'DOCUMENT AI', name: 'Extractor Pipeline', slug: 'extractor-pipeline', desc: 'Messy documents become validated records through schema checks, model repair, and explicit failure logs.', logos: ['pydantic', 'sqlite'] }
  ];
  TOOLS = [
    ['OpenAI', null, 'openai.com'], ['Claude', 'claude', 'claude.ai'], ['n8n', 'n8n', 'n8n.io'], ['Make', 'make', 'make.com'], ['HubSpot', 'hubspot', 'hubspot.com'],
    ['GoHighLevel', null, 'gohighlevel.com'], ['Vapi', null, 'vapi.ai'], ['ElevenLabs', 'elevenlabs', 'elevenlabs.io'], ['monday.com', null, 'monday.com'], ['Power BI', null, 'powerbi.microsoft.com'],
    ['Tableau', null, 'tableau.com'], ['Airtable', 'airtable', 'airtable.com'], ['Supabase', 'supabase', 'supabase.com'], ['Intercom', 'intercom', 'intercom.com'],
    ['Close', null, 'close.com'], ['Next.js', 'nextdotjs', 'nextjs.org'], ['Vercel', 'vercel', 'vercel.com'], ['Python', 'python', 'python.org'], ['FastAPI', 'fastapi', 'fastapi.tiangolo.com'],
    ['Ollama', 'ollama', 'ollama.com'], ['DuckDB', 'duckdb', 'duckdb.org'], ['Pydantic', 'pydantic', 'pydantic.dev'], ['GitHub', 'github', 'github.com'], ['Cal.com', 'caldotcom', 'cal.com']
  ];

  CASES = [
    { name: 'Conversions.ai', sector: 'AI agency · US', status: 'Built and handed over', href: 'https://www.conversions.ai', logo: 'https://aixcelsolutions.com/assets/clients/conversions-ai-icon.png', problem: 'Lead, onboarding and reporting work had to run across four separate client workspaces.', built: 'Workflows across all four workspaces: ads, attribution, CRM and reporting.', tools: ['n8n', 'make'], stats: [[39, '', 'n8n workflows'], [103, '', 'Make scenarios'], [4, '', 'client workspaces']] },
    { name: 'Modern Amenities', sector: 'Smart vending · Community', status: 'Engagement completed', href: 'https://modern-amenities.com', logo: 'https://aixcelsolutions.com/assets/clients/modern-amenities.svg', problem: 'Automations were spread across three platforms, and setting up a new member touched several tools.', built: 'Monitoring across every automation and one onboarding pipeline for new members.', tools: ['n8n', 'make', 'zapier'], stats: [[216, '', 'automations monitored across n8n, Make and Zapier'], [7, '', 'platforms in one six-stage onboarding pipeline'], [52, '/52', 'automated tests passing']] },
    { name: 'ChiroCandy', sector: 'Healthcare marketing', status: 'Reconciled July 2026', href: 'https://chirocandy.com', logo: 'https://aixcelsolutions.com/assets/clients/chirocandy.png', problem: 'A large set of GoHighLevel locations had to be accounted for before clinic accounts could run from one system.', built: 'An inventory of every location and one role-gated system for accounts and staff.', tools: ['ghl'], stats: [[450, '', 'GoHighLevel locations inventoried and reconciled'], [204, '', 'client accounts and 22 staff, role-gated'], [7, '', 'AI call flows, new lead to missed-call callback']] }
  ];
  CLIENTS = [
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
    ['Realiste', this.mono('R', '#121210'), 'https://realiste.ai/en', 'AI real estate analytics', 'Systems work delivered through AiXCEL Solutions.']
  ];
  PROTOS = [
    { name: 'Creator Campaign Command', desc: 'Turn a campaign brief into a ranked creator plan that stops at human review.', href: 'https://github.com/syedahmad0786/creator-campaign-command', mode: 'gh' },
    { name: 'LanguageMix Studio', desc: 'Propose culturally reviewed multilingual copy while preserving source meaning and approval.', href: 'https://github.com/syedahmad0786/language-mix-studio', mode: 'gh' },
    { name: 'Marketing Revenue Assurance', desc: 'Reconcile advertising, CRM, funnel, and collected-cash evidence before acting on a revenue signal.', href: 'https://marketing-revenue-assurance.vercel.app', mode: 'demo' },
    { name: 'Deal Rescue & Forecast Truth', desc: 'Compare seller confidence with buyer evidence and dated commitments before a forecast decision.', href: 'https://deal-rescue-forecast-truth.vercel.app', mode: 'demo' },
    { name: 'Creative Learning OS', desc: 'Separate a useful creative signal from audience, placement, lag, and data-quality confounds.', href: 'https://creative-learning-os.vercel.app', mode: 'demo' },
    { name: 'Creator & Talent Campaign OS', desc: 'Check campaign fit, rights, safety, history, budget, and concentration before selecting a roster.', href: 'https://creator-talent-campaign-os.vercel.app', mode: 'demo' },
    { name: 'Agentic Systems Gateway', desc: 'Provide an inspectable gateway for replay, model access boundaries, and release evidence.', href: 'https://agentic-systems-gateway.vercel.app', mode: 'demo' },
    { name: 'Agentic Systems Evaluation Lab', desc: 'Exercise API contracts, evidence references, approval gates, and failure behavior across deployed examples.', href: 'https://github.com/syedahmad0786/agentic-systems-evaluation-lab', mode: 'gh' },
    { name: 'Content Performance Forecaster', desc: 'Explore a historical forecasting baseline with ranges, cohort context, and input sensitivity.', href: 'https://github.com/syedahmad0786/content-performance-forecaster', mode: 'gh' },
    { name: 'Revenue Signal Graph', desc: 'Turn fragmented account evidence into a qualification decision and a human-reviewed action proposal.', href: 'https://aixcelsolutions.com/labs/agentic-systems', mode: 'req' }
  ];

  AG = [
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
  AGSTACK = [['Python', 'python', 'python.org'], ['FastAPI', 'fastapi', 'fastapi.tiangolo.com'], ['Pydantic v2', 'pydantic', 'pydantic.dev'], ['LangGraph', 'langgraph', 'langchain.com'], ['Postman', 'postman', 'postman.com'], ['Pytest', 'pytest', 'pytest.org'], ['GitHub Actions', 'githubactions', 'github.com'], ['Playwright', null, 'playwright.dev'], ['Vercel', 'vercel', 'vercel.com'], ['OpenTelemetry', 'opentelemetry', 'opentelemetry.io'], ['Prometheus', 'prometheus', 'prometheus.io'], ['PostgreSQL', 'postgresql', 'postgresql.org'], ['Docker', 'docker', 'docker.com'], ['NVIDIA NIM', 'nvidia', 'nvidia.com'], ['OpenRouter', null, 'openrouter.ai']];
  CH = [
    ['LinkedIn', null, 'linkedin.com', 'in/bukhariahmad', 'https://www.linkedin.com/in/bukhariahmad', 'LinkedIn post', ['/api/social/linkedin', 'page']],
    ['X', 'x', 'x.com', '@ahmadbukhari', 'https://x.com/ahmadbukhari', 'Posts on X', ['/assets/social/x.jpg', 'shot']],
    ['Instagram', 'instagram', 'instagram.com', '@bukharibuildsai', 'https://www.instagram.com/bukharibuildsai/', 'Instagram reel', ['https://www.instagram.com/reel/DdvBcyxT_SO/embed/', 'page']],
    ['TikTok', 'tiktok', 'tiktok.com', '@ahmad.bukhari0786', 'https://www.tiktok.com/@ahmad.bukhari0786', 'TikTok profile', ['/api/social/tiktok', 'video']],
    ['YouTube', 'youtube', 'youtube.com', '@AhmadBukhari97', 'https://www.youtube.com/@AhmadBukhari97', 'YouTube channel', ['/api/social/youtube', 'video']],
    ['Facebook', 'facebook', 'facebook.com', 'Bukhari Builds AI', 'https://www.facebook.com/profile.php?id=61593858664534', 'Facebook page', ['/assets/social/facebook.jpg', 'shot']],
    ['GitHub', 'github', 'github.com', 'syedahmad0786', 'https://github.com/syedahmad0786', 'GitHub profile', ['/assets/social/github.jpg', 'shot']],
    ['n8n', 'n8n', 'n8n.io', 'creators/ahmadbukhari', 'https://n8n.io/creators/ahmadbukhari/', 'n8n creator profile', ['https://n8n.io/creators/ahmadbukhari/', 'page']]
  ];
  setupAgentic() {
    this.revealChecks();
    this.agint = setInterval(() => { if (!this.aPaused && !this.state.liveA) this.selectA((this.state.selA + 1) % this.AG.length); }, 7000);
    this.chint = setInterval(() => { if (!this.chPaused) this.setState(s => ({ ch: (s.ch + 1) % this.CH.length })); }, 3200);
  }
  selectA(i) { if (this.state.selA === i) return; this.setState({ selA: i, liveA: false }); this.revealChecks(); }
  revealChecks() {
    clearInterval(this.ckint); this.setState({ vk: 0 });
    this.ckint = setInterval(() => { const n = this.AG[this.state.selA].checks.length; if (this.state.vk >= n) { clearInterval(this.ckint); return; } this.setState(s => ({ vk: s.vk + 1 })); }, 260);
  }
  fetchGh() {
    try {
      fetch('https://api.github.com/users/syedahmad0786/events/public?per_page=20').then(r => r.ok ? r.json() : []).then(ev => {
        const items = (Array.isArray(ev) ? ev : []).map(e => {
          const full = e.repo && e.repo.name ? e.repo.name : 'syedahmad0786', repo = full.split('/')[1] || full, p = e.payload || {};
          let t = null;
          if (e.type === 'PushEvent') { const c = p.commits || []; const n = c.length || p.size || 1; const msg = c[0] && c[0].message ? c[0].message.split('\n')[0].slice(0, 64) : ''; t = 'pushed ' + n + ' commit' + (n > 1 ? 's' : '') + ' to ' + repo + (msg ? ' · ' + msg : ''); }
          else if (e.type === 'CreateEvent') t = 'created ' + (p.ref_type || 'repository') + (p.ref ? ' ' + p.ref : '') + ' in ' + repo;
          else if (e.type === 'PullRequestEvent') t = (p.action || 'opened') + ' a pull request in ' + repo;
          else if (e.type === 'ReleaseEvent') t = 'published a release of ' + repo;
          else if (e.type === 'PublicEvent') t = 'open-sourced ' + repo;
          return t ? { text: t, href: 'https://github.com/' + full, at: e.created_at } : null;
        }).filter(Boolean);
        if (items.length) { this.setState({ gh: items, ghi: 0 }); this.ghint = setInterval(() => this.setState(s => ({ ghi: (s.ghi + 1) % s.gh.length })), 4500); }
      }).catch(() => {});
    } catch (e) {}
  }
  ago(iso) { const m = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000)); if (m < 60) return m + 'm ago'; const h = Math.round(m / 60); if (h < 48) return h + 'h ago'; return Math.round(h / 24) + 'd ago'; }
  BUDS = [
    ['ErrorLens', 'n8n', 'n8n.io', '#FF4F12', 'Gate passed ✓'],
    ['OpenAI', null, 'openai.com', '#10A37F', 'Shipping it!'],
    ['Claude', 'claude', 'claude.ai', '#D97757', 'Let’s build this.'],
    ['Gemini', 'googlegemini', 'gemini.google.com', '#4285F4', 'On it!'],
    ['Grok', null, 'grok.com', '#121210', 'Hurrah!'],
    ['GLM', null, 'z.ai', '#3859FF', '加油! Let’s go'],
    ['DeepSeek', null, 'deepseek.com', '#4D6BFE', 'Deploying…'],
    ['Qwen', null, 'qwen.ai', '#615CED', '一起建造!'],
    ['Mistral', 'mistralai', 'mistral.ai', '#FA520F', 'Allez, on build!']
  ];
  homeSpot(i) {
    return { side: ((i % 2 === 1) !== (Math.random() < 0.15)) ? 1 : 0, fx: Math.random(), fy: Math.random(), jx: Math.random() - 0.5, jy: Math.random() - 0.5 };
  }
  budPx(b, i, vw, vh) {
    if (b.abs) return { x: b.x, y: b.y };
    const gv = this.state.grav; if (gv) { const a = (i / this.BUDS.length) * Math.PI * 2 + Date.now() / 7000; return { x: Math.round(gv.cx + Math.cos(a) * gv.r - 10), y: Math.round(gv.cy + Math.sin(a) * gv.r * 0.92 - 10) }; }
    const n = this.BUDS.length, gutter = (vw - Math.min(vw, 1480)) / 2 + Math.min(40, Math.max(16, vw * 0.03));
    let x, y;
    if (gutter >= 64) {
      const room = Math.max(0, gutter - 60);
      x = b.side ? vw - gutter + 8 + b.fx * room : 8 + b.fx * room;
      const slot = Math.floor(i / 2), slots = Math.ceil(n / 2);
      y = 130 + ((slot + 0.15 + b.fy * 0.7) / slots) * Math.max(200, vh - 240);
    } else {
      x = vw - 20 - (n - i) * 34 + b.jx * 6;
      y = vh - 54 + b.jy * 8;
    }
    return { x: Math.round(Math.min(Math.max(x, 4), vw - 50)), y: Math.round(Math.min(Math.max(y, 90), vh - 44)) };
  }
  setupBuddy() {
    const LOSE = [w => 'We got late…', w => w + ', I’ll get you next time', w => 'Lost again.', w => 'I was right there!', w => 'Next round is mine, ' + w, w => 'Lag. Blaming the network.', w => 'Fine, ' + w + ' wins this one', w => 'Rate limited, sorry'];
    const TRAP = ['Trap it!', 'Got you!', 'Over here!', 'Surround it!'];
    const home = () => { if (this.swarmEl) return; this.setState({ buds: this.BUDS.map((b, i) => this.homeSpot(i)), swarm: false, cheer: false, bmsgs: {}, winners: [] }); };
    home();
    this.bint = setInterval(() => { if (this.swarmEl) return; this.setState(s => ({ buds: s.buds.map((b, i) => Math.random() < 0.4 ? this.homeSpot(i) : b) })); }, 5200);
    const swarmTo = (el, mode) => {
      const r = el.getBoundingClientRect(), vw = Math.max(window.innerWidth || 0, 320), vh = Math.max(window.innerHeight || 0, 400);
      const order = this.BUDS.map((b, i) => i).sort(() => Math.random() - 0.5), k = 3 + (Math.random() < 0.5 ? 1 : 0), win = order.slice(0, k), lose = order.slice(k);
      const C = [[r.left - 34, r.top - 30], [r.right + 4, r.top - 30], [r.right + 4, r.bottom + 2], [r.left - 34, r.bottom + 2]];
      const buds = this.state.buds.slice(), msgs = {}, wname = this.BUDS[win[0]][0];
      win.forEach((bi, j) => { buds[bi] = { abs: true, x: Math.round(Math.min(Math.max(C[j][0], 4), vw - 60)), y: Math.round(Math.min(Math.max(C[j][1], 70), vh - 50)) }; msgs[bi] = mode === 'trap' ? TRAP[j] : this.BUDS[bi][4]; });
      lose.forEach((bi, j) => {
        let x, y, t = 0;
        do { x = 30 + Math.random() * (vw - 260); y = 100 + Math.random() * (vh - 190); t++; } while (t < 14 && x > r.left - 230 && x < r.right + 70 && y > r.top - 100 && y < r.bottom + 70);
        buds[bi] = { abs: true, x: Math.round(x), y: Math.round(y) };
        msgs[bi] = LOSE[(j + Math.floor(Math.random() * LOSE.length)) % LOSE.length](wname);
      });
      this.setState({ swarm: true, cheer: false, buds, bmsgs: msgs, winners: win });
    };
    this.trap = el => {
      if (!(this.props.cursorBuddy ?? true) || Date.now() - (this.lastTrap || 0) < 2000) return;
      this.lastTrap = Date.now(); this.swarmEl = el; swarmTo(el, 'trap');
      clearTimeout(this.backT); this.backT = setTimeout(() => { this.swarmEl = null; home(); }, 2000);
    };
    this.onOver = e => {
      const el = e.target && e.target.closest ? e.target.closest('a,button') : null;
      if (!el || el === this.swarmEl || !(this.props.cursorBuddy ?? true)) return;
      clearTimeout(this.overT); clearTimeout(this.backT);
      this.overT = setTimeout(() => { this.swarmEl = el; swarmTo(el, 'hover'); }, 300);
    };
    this.onOut = e => {
      const el = e.target && e.target.closest ? e.target.closest('a,button') : null;
      if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
      clearTimeout(this.overT);
      if (this.swarmEl === el) { clearTimeout(this.backT); this.backT = setTimeout(() => { this.swarmEl = null; home(); }, 800); }
    };
    this.onDown = () => { if (!this.swarmEl) return; this.setState({ cheer: true }); clearTimeout(this.backT); this.backT = setTimeout(() => { this.swarmEl = null; home(); }, 1700); };
    this.onResize = () => { this.swarmEl = null; home(); };
    this.onScrollB = () => { if (this.swarmEl) { this.swarmEl = null; home(); } const n = performance.now(); if (n - (this._gt || 0) > 120) { this._gt = n; this.checkGrav(); } };
    this.gint = setInterval(() => this.checkGrav(), 800);
    this.onVis = () => { if (!document.hidden) { this.swarmEl = null; home(); } };
    document.addEventListener('pointerover', this.onOver, true);
    document.addEventListener('pointerout', this.onOut, true);
    document.addEventListener('pointerdown', this.onDown, true);
    document.addEventListener('visibilitychange', this.onVis);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScrollB, { passive: true, capture: true });
    this.cleanBuddy = () => {
      document.removeEventListener('pointerover', this.onOver, true); document.removeEventListener('pointerout', this.onOut, true);
      document.removeEventListener('pointerdown', this.onDown, true); document.removeEventListener('visibilitychange', this.onVis);
      window.removeEventListener('resize', this.onResize); window.removeEventListener('scroll', this.onScrollB, true); clearTimeout(this.overT); clearTimeout(this.backT);
    };
  }
  setupFx() {
    const root = this.rootRef.current; if (!root || !Element.prototype.animate) return;
    const layer = document.createElement('div'); layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:45;overflow:hidden'; document.body.appendChild(layer); this.fxLayer = layer;
    const hash = s => { let x = 0; for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) | 0; return Math.abs(x); };
    const isLogo = el => el && el.tagName === 'IMG' && (el.hasAttribute('data-fb') || el.hasAttribute('data-logo') || el.hasAttribute('data-ask'));
    const T = [
      [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }],
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-9px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }],
      [{ transform: 'scale(1,1)' }, { transform: 'scale(1.3,.75)' }, { transform: 'scale(.85,1.2)' }, { transform: 'scale(1.08,.95)' }, { transform: 'scale(1,1)' }],
      [{ transform: 'perspective(200px) rotateY(0)' }, { transform: 'perspective(200px) rotateY(360deg)' }],
      [{ transform: 'rotate(0)' }, { transform: 'rotate(-18deg)' }, { transform: 'rotate(14deg)' }, { transform: 'rotate(-8deg)' }, { transform: 'rotate(0)' }],
      [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
      [{ transform: 'skewX(0)' }, { transform: 'skewX(-16deg)' }, { transform: 'skewX(12deg)' }, { transform: 'skewX(0)' }],
      [{ transform: 'perspective(200px) rotateX(0)' }, { transform: 'perspective(200px) rotateX(360deg)' }]
    ];
    const ASK = {
      chatgpt: [[{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(180deg) scale(.78)' }, { transform: 'rotate(360deg) scale(1)' }], { duration: 1300, iterations: Infinity, easing: 'linear' }],
      perplexity: [[{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 1600, iterations: Infinity, easing: 'steps(8, end)' }],
      claude: [[{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(45deg) scale(1.4)' }, { transform: 'rotate(90deg) scale(1)' }], { duration: 1100, iterations: Infinity, easing: 'ease-in-out' }],
      google: [[{ transform: 'rotate(0)', filter: 'hue-rotate(0deg)' }, { transform: 'rotate(360deg)', filter: 'hue-rotate(360deg)' }], { duration: 1800, iterations: Infinity }],
      grok: [[{ transform: 'translate(0,0) skewX(0)' }, { transform: 'translate(-1px,1px) skewX(-14deg)' }, { transform: 'translate(1px,-1px) skewX(14deg)' }, { transform: 'translate(0,0) skewX(0)' }], { duration: 360, iterations: Infinity }],
      copilot: [[{ transform: 'rotate(0deg) translateX(3px) rotate(0deg)' }, { transform: 'rotate(360deg) translateX(3px) rotate(-360deg)' }], { duration: 900, iterations: Infinity, easing: 'linear' }]
    };
    this.fxOver = e => {
      let el = e.target;
      if (el && el.closest && !isLogo(el)) { const host = el.closest('a,button'); const im = host ? host.querySelector('img[data-ask]') : null; if (im) el = im; }
      if (!isLogo(el) || el._fx) return;
      const ask = el.getAttribute('data-ask');
      if (ask && ASK[ask]) { el._fx = el.animate(ASK[ask][0], ASK[ask][1]); return; }
      if (el.closest('a,button')) { el._fx = el.animate(T[hash(el.src) % T.length], { duration: 750, easing: 'cubic-bezier(.3,1.4,.5,1)' }); el._fx.onfinish = () => { el._fx = null; }; return; }
      const r = el.getBoundingClientRect(); let dx = r.left + r.width / 2 - e.clientX, dy = r.top + r.height / 2 - e.clientY; const d = Math.hypot(dx, dy) || 1; dx = dx / d * 48; dy = dy / d * 30;
      el._fx = el.animate([{ transform: 'translate(0,0)' }, { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(' + (dx > 0 ? 16 : -16) + 'deg)', offset: 0.22 }, { transform: 'translate(' + (dx * 0.9) + 'px,' + (dy * 0.9) + 'px) rotate(0)', offset: 0.8 }, { transform: 'translate(0,0)' }], { duration: 1700, easing: 'cubic-bezier(.2,.8,.2,1)' });
      el._fx.onfinish = () => { el._fx = null; };
      if (this.trap && !el.closest('[data-stage]')) this.trap(el);
    };
    this.fxOut = e => { const t = e.target; const host = t && t.closest ? t.closest('a,button') : null; const im = host ? host.querySelector('img[data-ask]') : (t && t.getAttribute && t.getAttribute('data-ask') ? t : null); if (!im || !im._fx) return; if (host && e.relatedTarget && host.contains(e.relatedTarget)) return; im._fx.cancel(); im._fx = null; };
    this.fxClick = e => {
      const el = e.target; if (!isLogo(el)) return;
      const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, mode = hash(el.src) % 5, n = 12;
      for (let i = 0; i < n; i++) {
        const p = document.createElement('img'), sz = Math.max(14, r.width) * (0.6 + Math.random() * 0.6);
        p.src = el.currentSrc || el.src; p.style.cssText = 'position:absolute;left:' + (cx - sz / 2) + 'px;top:' + (cy - sz / 2) + 'px;width:' + sz + 'px;height:' + sz + 'px;object-fit:contain';
        layer.appendChild(p);
        let a = (i / n) * Math.PI * 2, dist = 70 + Math.random() * 80;
        if (mode === 1) { a = -Math.PI / 2 + (Math.random() - 0.5) * 1.2; dist = 120 + Math.random() * 100; }
        if (mode === 2) { a = (i / n) * Math.PI * 4; dist = 24 + i * 13; }
        if (mode === 3) { a = (i % 2 ? 0 : Math.PI) + (Math.random() - 0.5) * 0.6; dist = 90 + Math.random() * 130; }
        if (mode === 4) { a = Math.PI / 2 + (Math.random() - 0.5) * 1.5; dist = 100 + Math.random() * 90; }
        const tx = Math.cos(a) * dist, ty = Math.sin(a) * dist + (mode === 1 ? 70 : 0);
        p.animate([{ transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 }, { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(.35) rotate(' + ((Math.random() - 0.5) * 720) + 'deg)', opacity: 0 }], { duration: 800 + Math.random() * 600, easing: 'cubic-bezier(.15,.7,.3,1)', fill: 'forwards' }).onfinish = () => p.remove();
      }
    };
    root.addEventListener('pointerover', this.fxOver, true); root.addEventListener('pointerout', this.fxOut, true); root.addEventListener('click', this.fxClick, true);
  }
  setupBg() {
    const c = this.bgRef.current; if (!c || !c.getContext) return;
    const ctx = c.getContext('2d'); let w = 0, hh = 0;
    const size = () => { const d = Math.min(2, window.devicePixelRatio || 1); w = Math.max(320, window.innerWidth || 0); hh = Math.max(400, window.innerHeight || 0); c.width = w * d; c.height = hh * d; c.style.width = w + 'px'; c.style.height = hh + 'px'; ctx.setTransform(d, 0, 0, d, 0, 0); };
    size(); this.bgResize = size; window.addEventListener('resize', size);
    this.mx = -9999; this.my = -9999;
    this.bgMove = e => {
      this.mx = e.clientX; this.my = e.clientY;
      const cur = this.curRef.current;
      if (cur) { const t = e.target && e.target.closest ? e.target : null, big = t && t.closest('[data-invert-big]'), mid = !big && t && t.closest('h1,h2,h3,a,button'), s = big ? 150 : mid ? 64 : 22; cur.style.width = s + 'px'; cur.style.height = s + 'px'; cur.style.transform = 'translate(' + (e.clientX - s / 2) + 'px,' + (e.clientY - s / 2) + 'px)'; cur.style.opacity = '1'; }
      const now = performance.now(); if (now - (this._pt || 0) < 90) return; this._pt = now; this.proximity(e.clientX, e.clientY);
    };
    window.addEventListener('pointermove', this.bgMove, { passive: true });
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let sd = 7; const rnd = () => { sd = (sd * 16807) % 2147483647; return sd / 2147483647; };
    const stars = Array.from({ length: 240 }, () => ({ x: rnd(), y: rnd(), z: 0.25 + rnd() * 0.75, o: rnd() < 0.08 }));
    let t = 0, last = 0, lastY = window.scrollY || 0, vel = 0, shoot = null;
    const frame = now => {
      if (!last || now - last > 24 || reduce) {
        last = now || 1; t += 0.004;
        if (w !== Math.max(320, window.innerWidth || 0)) size();
        const sy = window.scrollY || 0; vel = vel * 0.85 + (sy - lastY) * 0.15; lastY = sy;
        ctx.clearRect(0, 0, w, hh);
        ctx.save(); ctx.translate(w * 0.84, hh * 0.3 - sy * 0.04); ctx.rotate(-0.32);
        [300, 470, 660].forEach((R, i) => {
          ctx.beginPath(); ctx.ellipse(0, 0, R, R * 0.3, 0, 0, Math.PI * 2); ctx.setLineDash(i === 1 ? [4, 8] : []); ctx.strokeStyle = 'rgba(18,18,16,0.075)'; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
          const a = t * (0.9 - i * 0.22) + i * 2.1, px = Math.cos(a) * R, py = Math.sin(a) * R * 0.3;
          ctx.beginPath(); ctx.arc(px, py, 15, 0, Math.PI * 2); ctx.fillStyle = i === 0 ? 'rgba(255,79,18,0.12)' : 'rgba(18,18,16,0.05)'; ctx.fill();
          ctx.beginPath(); ctx.arc(px, py, i === 0 ? 5 : 3.5, 0, Math.PI * 2); ctx.fillStyle = i === 0 ? '#FF4F12' : '#121210'; ctx.fill();
        });
        ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,79,18,0.10)'; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,79,18,0.6)'; ctx.fill();
        ctx.restore();
        const warp = Math.max(-70, Math.min(70, vel * 1.5)), pmx = this.mx > -999 ? this.mx - w / 2 : 0, pmy = this.my > -999 ? this.my - hh / 2 : 0, near = [];
        for (const s of stars) {
          let x = ((s.x * w - pmx * s.z * 0.03) % w + w) % w, y = ((s.y * hh - sy * s.z * 0.35 - pmy * s.z * 0.03) % hh + hh) % hh;
          const dx = x - this.mx, dy = y - this.my, d = Math.hypot(dx, dy);
          if (d < 150) { const q = (150 - d) / 150; x += dx / (d || 1) * q * 46 * s.z; y += dy / (d || 1) * q * 46 * s.z; if (d < 135) near.push([x, y, d]); }
          const r = 0.5 + s.z * 1.3, al = 0.12 + s.z * 0.38, col = s.o ? 'rgba(255,79,18,' + Math.min(1, al + 0.25) + ')' : 'rgba(18,18,16,' + al + ')';
          if (Math.abs(warp) > 3) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - warp * s.z); ctx.strokeStyle = col; ctx.lineWidth = r; ctx.stroke(); }
          else { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); }
        }
        if (near.length) { near.sort((a, b) => a[2] - b[2]); ctx.lineWidth = 0.8; for (let i = 0; i < Math.min(near.length, 9); i++) { const p = near[i]; ctx.beginPath(); ctx.moveTo(this.mx, this.my); ctx.lineTo(p[0], p[1]); ctx.strokeStyle = 'rgba(255,79,18,' + (0.38 * (1 - p[2] / 135)).toFixed(3) + ')'; ctx.stroke(); } }
        if (this.mx > -999) { ctx.beginPath(); ctx.arc(this.mx, this.my, 150, 0, Math.PI * 2); ctx.setLineDash([2, 7]); ctx.strokeStyle = 'rgba(18,18,16,0.06)'; ctx.stroke(); ctx.setLineDash([]); }
        if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * w * 0.6, y: Math.random() * hh * 0.4, l: 0 };
        if (shoot) { shoot.l += 0.03; const L = 160, x2 = shoot.x + shoot.l * 520, y2 = shoot.y + shoot.l * 220, g = ctx.createLinearGradient(x2 - L, y2 - L * 0.42, x2, y2); g.addColorStop(0, 'rgba(255,79,18,0)'); g.addColorStop(1, 'rgba(255,79,18,0.85)'); ctx.beginPath(); ctx.moveTo(x2 - L, y2 - L * 0.42); ctx.lineTo(x2, y2); ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.stroke(); if (shoot.l > 1) shoot = null; }
      }
      if (!reduce) this.bgRaf = requestAnimationFrame(frame);
    };
    frame(0);
  }
  panDown = e => {
    if (e.button !== 0 || (e.target.closest && e.target.closest('[data-nopan]'))) return;
    const st = this.state.cam, sx = e.clientX, sy = e.clientY;
    const move = ev => { const dx = ev.clientX - sx, dy = ev.clientY - sy; if (!this.state.panning && Math.hypot(dx, dy) < 4) return; this.setState({ panning: true, cam: { x: st.x + dx, y: st.y + dy, z: st.z } }); };
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); setTimeout(() => this.setState({ panning: false }), 0); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  zoomBy(d) { this.setState(s => ({ cam: { x: s.cam.x, y: s.cam.y, z: Math.min(1.6, Math.max(0.6, Math.round((s.cam.z + d) * 100) / 100)) } })); }
  INSPECT = {
    n1: ['Receives the request by webhook and stamps it with an idempotency key, so a resend never runs twice.', '{\n  "source": "form",\n  "email": "lead@agency.co",\n  "key": "req_8f2c"\n}'],
    n2: ['The model extracts intent, budget and urgency into a typed schema. Low confidence routes to a person.', '{\n  "intent": "discovery_call",\n  "confidence": 0.91\n}'],
    n3: ['Matches on email and upserts. A retry updates the same contact instead of creating a duplicate.', '{\n  "contact": "upsert",\n  "duplicate": false\n}'],
    n4: ['Books the call. Failures are caught and classified, never swallowed.', '{\n  "slot": "Thu 15:30 PKT",\n  "status": 200\n}'],
    n5: ['Classifies every outcome: pass, safe to retry, or needs a person.', '{\n  "class": "transient",\n  "retry": "1 of 3"\n}'],
    n6: ['Gets the thread, CRM history and the proposed action in one place, then approves or edits.', '{\n  "decision": "approve",\n  "note": "hold slot 24h"\n}'],
    n7: ['Writes what happened and why, so the next decision starts informed.', '{\n  "exceptions": 1,\n  "recovered": true,\n  "owner": "Ahmad"\n}']
  };
  NETGROUPS = [
    { name: 'Conversions.ai · We Scale Creators', logo: 'https://aixcelsolutions.com/assets/clients/conversions-ai-icon.png', kids: [['Ben Kelly', 'benkelly.co', 'https://www.benkelly.co/'], ['Acquisition Ace', 'acquisitionace.io', 'https://www.acquisitionace.io/'], ['Catalys', 'catalys.co', 'https://www.catalys.co/'], ['Laurel Leaf', 'laurelleaf.co', 'https://laurelleaf.co/'], ['Modern Day Brokerage', 'moderndaybrokerage.com', 'https://www.moderndaybrokerage.com/'], ['AdOutreach', 'adoutreach.com', 'https://adoutreach.com/'], ['Digital Mavericks Media', 'digitalmavericksmedia.com', 'https://digitalmavericksmedia.com/'], ['Mavrix AI', 'mavrixai.com', 'https://mavrixai.com/'], ['Elinor Jewels', 'elinorjewels.com', 'https://elinorjewels.com/']] },
    { name: 'Modern Amenities', logo: 'https://aixcelsolutions.com/assets/clients/modern-amenities.svg', kids: [['Vendingpreneurs', 'vendingpreneurs.com', 'https://www.vendingpreneurs.com/'], ['McKenzie SewOn', 'mcsewon.com', 'https://www.mcsewon.com/']] },
    { name: 'One Konnector', logo: 'https://aixcelsolutions.com/assets/clients/one-konnector-ink.png', kids: [['Arizona Dreams Gymnastics', 'azdreamsgym.com', 'https://www.azdreamsgym.com/'], ['DECAL Gymnastics', 'decalgymnastics.com', 'https://www.decalgymnastics.com/'], ['GAGE Center', 'gagecenter.com', 'https://www.gagecenter.com/'], ['Al Fong · Gymnastics Simplified', 'alfong.com', 'https://www.alfong.com/'], ['Gymnastics Counts', 'gymnasticscounts.com', 'https://gymnasticscounts.com/']] }
  ];
  caseNet(c, ci) {
    const g = c.name === 'Conversions.ai' ? this.NETGROUPS[0] : c.name === 'Modern Amenities' ? this.NETGROUPS[1] : null, open = this.state.openCase === ci;
    if (!g) return { hasNet: false, open: false, net: [] };
    return { hasNet: true, open, net: g.kids.map(k => ({ name: k[0], href: k[2], src: this.kidLogo(k) })), netLabel: (open ? 'Hide' : 'Show') + ' the ' + g.kids.length + ' client teams it reached', arrow: open ? '↑' : '↓', btnBg: open ? '#121210' : 'transparent', btnFg: open ? '#ECE8DF' : '#121210', toggle: () => this.setState(s => ({ openCase: s.openCase === ci ? -1 : ci })) };
  }
  caseViz(i) {
    const h = React.createElement, A = o => h('animate', Object.assign({ repeatCount: 'indefinite' }, o)), txt = (x, y, t, c) => h('text', { x, y, fill: c || '#8C877C', fontFamily: 'Space Mono, monospace', fontSize: 9 }, t);
    let k = [];
    if (i === 0) {
      k = [0, 1, 2, 3].map(j => h('g', { key: j }, h('rect', { x: 18 + j * 80, y: 20, width: 66, height: 86, rx: 6, fill: 'none', stroke: '#3D3B36' }), txt(26 + j * 80, 15, 'workspace ' + (j + 1)),
        ...[0, 1, 2].map(q => h('rect', { key: q, x: 26 + j * 80, width: 50, height: 9, rx: 3, fill: (j + q) % 3 === 0 ? '#FF4F12' : '#ECE8DF', y: 24 }, A({ attributeName: 'y', values: '24;96', dur: '3.6s', begin: (-(q * 1.2 + j * 0.4)) + 's' }), A({ attributeName: 'opacity', values: '0;1;1;0', keyTimes: '0;.15;.8;1', dur: '3.6s', begin: (-(q * 1.2 + j * 0.4)) + 's' })))));
      k.push(txt(222, 116, '39 n8n · 103 Make', '#ECE8DF'));
    } else {
      const cols = i === 1 ? 24 : 30, rows = i === 1 ? 9 : 15, sx = i === 1 ? 12.5 : 10.4, sy = i === 1 ? 10 : 6.2, r = i === 1 ? 2.6 : 1.8;
      for (let c = 0; c < cols; c++) k.push(h('g', { key: c, fill: '#3D3B36' }, A({ attributeName: 'fill', values: i === 1 ? '#3D3B36;#6EDB9A;#3D3B36' : '#3D3B36;#3D3B36;#6EDB9A;#6EDB9A', keyTimes: i === 1 ? '0;.5;1' : '0;.3;.4;1', dur: i === 1 ? '3s' : '6s', begin: (c * (i === 1 ? 0.1 : 0.12)) + 's' }), ...Array.from({ length: rows }, (_, q) => h('circle', { key: q, cx: 18 + c * sx, cy: 14 + q * sy, r }))));
      if (i === 1) [[5, 3], [14, 6], [20, 1]].forEach((p, j) => k.push(h('circle', { key: 'x' + j, cx: 18 + p[0] * sx, cy: 14 + p[1] * sy, r: 3.4, fill: '#FF6B5B' }, A({ attributeName: 'opacity', values: '1;0;1', dur: (1.4 + j * 0.5) + 's' }))));
      k.push(h('rect', { key: 'lb', x: 236, y: 103, width: 100, height: 14, rx: 3, fill: '#121210' }), txt(242, 113, i === 1 ? '216 monitored' : '450 reconciled', '#ECE8DF'));
    }
    return h('svg', { viewBox: '0 0 340 120', width: '100%', height: '100%', style: { display: 'block' } }, ...k);
  }
  orbitCluster(g, gi) {
    const h = React.createElement, S = 290, c = S / 2, rx = 128, ry = 42, ang = [0, 60, 120], dur = [16, 22, 19];
    const pathFor = th => { const t = th * Math.PI / 180, ex = Math.cos(t) * rx, ey = Math.sin(t) * rx, P1 = (c + ex).toFixed(1) + ' ' + (c + ey).toFixed(1), P2 = (c - ex).toFixed(1) + ' ' + (c - ey).toFixed(1); return 'M' + P1 + ' A' + rx + ' ' + ry + ' ' + th + ' 1 1 ' + P2 + ' A' + rx + ' ' + ry + ' ' + th + ' 1 1 ' + P1; };
    const per = [0, 0, 0]; g.kids.forEach((k, i) => per[i % 3]++); const idx = [0, 0, 0];
    const electrons = g.kids.map((k, i) => { const o = i % 3, j = idx[o]++, D = dur[o] + gi * 2; return h('a', { key: k[0], href: k[2], target: '_blank', rel: 'noopener', title: k[0], style: { position: 'absolute', left: 0, top: 0, width: 40, height: 40, offsetPath: "path('" + pathFor(ang[o]) + "')", offsetRotate: '0deg', offsetAnchor: 'center', animation: 'abOrbit3 ' + D + 's linear infinite', animationDelay: (-(D * j / per[o])).toFixed(2) + 's', animationPlayState: 'var(--ps, running)', borderRadius: '50%', background: '#FFFFFF', border: '1.5px solid #121210', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 4px rgba(255,79,18,.16)' } }, h('img', { src: this.kidLogo(k), alt: k[0], 'data-logo': '1', style: { width: 22, height: 22, objectFit: 'contain', borderRadius: 5 } })); });
    return h('div', { key: g.name, style: { border: '1.5px solid #121210', borderRadius: 18, background: '#0E0E0D', color: '#ECE8DF', padding: '22px 18px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', overflow: 'hidden' } },
      h('div', { onMouseEnter: e => e.currentTarget.style.setProperty('--ps', 'paused'), onMouseLeave: e => e.currentTarget.style.setProperty('--ps', 'running'), style: { position: 'relative', width: S, height: S, flex: 'none' } },
        h('div', { style: { position: 'absolute', left: c - 80, top: c - 80, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,79,18,.5), rgba(255,79,18,0) 68%)', animation: 'abGlow 3.2s ease-in-out infinite' } }),
        h('svg', { width: S, height: S, viewBox: '0 0 ' + S + ' ' + S, style: { position: 'absolute', inset: 0 } }, ang.map(a => h('ellipse', { key: a, cx: c, cy: c, rx, ry, transform: 'rotate(' + a + ' ' + c + ' ' + c + ')', fill: 'none', stroke: 'rgba(236,232,223,.3)', strokeWidth: 1.2, strokeDasharray: '3 5' }))),
        h('div', { style: { position: 'absolute', zIndex: 1, left: c - 38, top: c - 38, width: 76, height: 76, borderRadius: '50%', background: '#FFFFFF', display: 'grid', placeItems: 'center', overflow: 'hidden', boxShadow: '0 0 0 6px rgba(255,79,18,.28), 0 0 44px rgba(255,79,18,.6)' } }, h('img', { src: g.logo, alt: g.name, 'data-logo': '1', style: { width: '72%', height: '72%', objectFit: 'contain' } })),
        ...electrons),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'center' } },
        h('span', { style: { fontWeight: 800, fontSize: 18, letterSpacing: '-.02em' } }, g.name),
        h('span', { style: { fontFamily: 'Space Mono, monospace', fontSize: 11.5, color: '#A39E92', lineHeight: 1.55, maxWidth: 320 } }, g.kids.map(k => k[0]).join(' · '))));
  }
  oxViz(tab) {
    const h = React.createElement, P = '#C9C4B8', D = '#2C2B27', O = '#FF5A1F', G = '#6EDB9A';
    const fx = (d, kids) => h('g', { style: { animation: 'abFadeUp .5s ease both', animationDelay: d + 's' } }, ...kids);
    const txt = (x, y, t, c, s) => h('text', { x, y, fill: c || P, fontFamily: 'Space Mono, monospace', fontSize: s || 10 }, t);
    let k = [];
    if (tab === 0) k = ['Personal', 'Shared channel', 'Group'].map((n, i) => fx(i * 0.15, [h('rect', { x: 4 + i * 132, y: 4, width: 124, height: 150, rx: 8, fill: 'none', stroke: i === 1 ? O : '#3D3B36' }), txt(14 + i * 132, 24, n, i === 1 ? O : P), ...[0, 1, 2].map(r => h('g', { key: r }, h('circle', { cx: 24 + i * 132, cy: 50 + r * 34, r: 8, fill: D }), h('rect', { x: 38 + i * 132, y: 44 + r * 34, width: 70 - r * 12, height: 5, rx: 2.5, fill: '#3D3B36' }), h('rect', { x: 38 + i * 132, y: 53 + r * 34, width: 50, height: 4, rx: 2, fill: D })))]));
    if (tab === 1) k = ['Client prefers Thursday calls', 'Brand voice: plain, no jargon', 'Q3 report uses blended CAC', 'Onboarding needs signed DPA'].map((t, i) => fx(i * 0.15, [h('rect', { x: 4, y: 6 + i * 36, width: 252, height: 28, rx: 6, fill: D }), txt(14, 24 + i * 36, t), i === 2 ? h('g', { style: { animation: 'abFadeUp .5s ease both', animationDelay: '1s' } }, h('rect', { x: 266, y: 6 + i * 36, width: 126, height: 28, rx: 6, fill: 'none', stroke: O }), txt(274, 24 + i * 36, 'Suggest to company', O)) : null]));
    if (tab === 2) k = [fx(0, [h('rect', { x: 4, y: 6, width: 250, height: 38, rx: 10, fill: D }), txt(16, 29, 'Need 3 landing page drafts for the launch')]), fx(0.8, [h('rect', { x: 120, y: 54, width: 272, height: 52, rx: 10, fill: 'none', stroke: O }), txt(132, 76, 'Ready: 3 previews, 3 CRM fragments,'), txt(132, 94, '6 screenshots with QA notes', O)]), fx(1.6, [h('rect', { x: 230, y: 118, width: 162, height: 30, rx: 8, fill: '#13804A' }), txt(242, 137, 'Approved by a person ✓', '#FFFDF8')])];
    if (tab === 3) k = ['page-a.html', 'page-b.html', 'crm-fragment.json', 'qa-notes.md', 'shot-01.png', 'manifest.json'].map((t, i) => fx(i * 0.12, [h('rect', { x: 4 + (i % 3) * 132, y: 6 + Math.floor(i / 3) * 76, width: 124, height: 68, rx: 8, fill: D }), h('rect', { x: 14 + (i % 3) * 132, y: 16 + Math.floor(i / 3) * 76, width: 22, height: 26, rx: 3, fill: 'none', stroke: i === 2 ? O : P }), txt(14 + (i % 3) * 132, 62 + Math.floor(i / 3) * 76, t)]));
    if (tab === 4) { const T = ['Meta Ads', 'Google Ads', 'Slack', 'HighLevel', 'HubSpot', 'Make']; k = [fx(0, [h('circle', { cx: 200, cy: 80, r: 24, fill: O }), txt(186, 84, 'OX', '#121210', 12)]), ...T.map((t, i) => { const a = (i / T.length) * Math.PI * 2 - Math.PI / 2, x = 200 + Math.cos(a) * 150, y = 80 + Math.sin(a) * 62; return fx(0.2 + i * 0.12, [h('line', { x1: 200, y1: 80, x2: x, y2: y, stroke: '#3D3B36', strokeDasharray: '3 3' }), h('rect', { x: x - 40, y: y - 11, width: 80, height: 22, rx: 11, fill: D, stroke: i === 2 ? G : '#3D3B36' }), txt(x - 32, y + 4, t)]); })]; }
    return h('svg', { key: 'ox' + tab, viewBox: '0 0 400 160', width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid meet', style: { display: 'block', position: 'absolute', inset: 0 } }, ...k);
  }
  LAYOUTS = [
    { n1: { x: 20, y: 40 }, n2: { x: 270, y: 40 }, n3: { x: 520, y: 40 }, n4: { x: 770, y: 40 }, n5: { x: 770, y: 400 }, n6: { x: 375, y: 348 }, n7: { x: 20, y: 400 } },
    { n1: { x: 20, y: 250 }, n2: { x: 250, y: 60 }, n3: { x: 480, y: 250 }, n4: { x: 710, y: 60 }, n5: { x: 780, y: 330 }, n6: { x: 400, y: 380 }, n7: { x: 30, y: 470 } },
    { n1: { x: 30, y: 40 }, n2: { x: 30, y: 250 }, n3: { x: 280, y: 145 }, n4: { x: 530, y: 40 }, n5: { x: 780, y: 145 }, n6: { x: 520, y: 330 }, n7: { x: 780, y: 470 } }
  ];
  ALT = { trig: [['n8n', 'n8n', 'n8n.io'], ['Make', 'make', 'make.com'], ['Zapier', 'zapier', 'zapier.com']], llm: [['Claude', 'claude', 'claude.ai'], ['OpenAI', null, 'openai.com'], ['Gemini', 'googlegemini', 'gemini.google.com'], ['Grok', null, 'grok.com'], ['DeepSeek', null, 'deepseek.com'], ['Ollama', 'ollama', 'ollama.com']], crm: [['HubSpot', 'hubspot', 'hubspot.com'], ['GoHighLevel', null, 'gohighlevel.com'], ['Close', null, 'close.com'], ['Salesforce', 'salesforce', 'salesforce.com']], cal: [['Cal.com', 'caldotcom', 'cal.com'], ['Calendly', 'calendly', 'calendly.com']], store: [['Supabase', 'supabase', 'supabase.com'], ['Airtable', 'airtable', 'airtable.com'], ['PostgreSQL', 'postgresql', 'postgresql.org']] };
  ADDABLE = [['Notify', 'Slack', null, 'slack.com', 'Post the summary to the owner', 'Sends the owner a short summary with links to the evidence.'], ['Summarize', 'Gemini', 'googlegemini', 'gemini.google.com', 'Summarize the thread for the client', 'Drafts a client-ready summary that waits for approval.'], ['Score', 'Grok', null, 'grok.com', 'Score lead quality', 'Scores the lead against the ideal customer profile.'], ['Translate', 'DeepSeek', null, 'deepseek.com', 'Prepare an Urdu follow-up', 'Prepares a follow-up in the client’s language for review.']];
  MONO = { 'Ben Kelly': ['BK', '#1F2A44'], 'Laurel Leaf': ['LL', '#2F6B3A'], 'Modern Day Brokerage': ['MD', '#7A4E2D'], 'Digital Mavericks Media': ['DM', '#5B2A86'], 'Mavrix AI': ['MX', '#0F766E'], 'GAGE Center': ['GC', '#1D4ED8'], 'Gymnastics Counts': ['G1', '#BE185D'] };
  mono(t, c) { return 'data:image/svg+xml,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='" + c + "'/><text x='32' y='41' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='700' font-size='" + (t.length > 1 ? 24 : 30) + "' fill='#FFFDF8'>" + t + "</text></svg>"); }
  kidLogo(k) { const m = this.MONO[k[0]]; return m ? this.mono(m[0], m[1]) : 'https://www.google.com/s2/favicons?domain=' + k[1] + '&sz=128'; }
  curStack(stack) { const S = Object.assign({}, this.STACKS[stack]), sw = this.state.swap || {}; Object.keys(sw).forEach(t => { const a = this.ALT[t]; if (a) { const v = a[sw[t] % a.length]; S[t] = this.L(v[0], v[1], v[2]); } }); return S; }
  extraNodes() { return (this.state.extras || []).map((ai, j) => { const a = this.ADDABLE[ai]; return { k: 'x' + j, t: 'x', label: a[0], title: a[4], tool: this.L(a[1], a[2], a[3]), desc: a[5] }; }); }
  positions() { const st = this.state, L = this.LAYOUTS[Math.max(0, st.layout)], P = Object.assign({}, L); (st.extras || []).forEach((e, j) => { P['x' + j] = { x: 400 + j * 34, y: 180 + j * 26 }; }); Object.keys(st.pos || {}).forEach(k => { P[k] = st.pos[k]; }); return P; }
  pushLog(msg, tone) { this.setState(s => ({ log: s.log.concat([{ t: this.fmt(Date.now() - (this.t0 || Date.now())), msg, tone: tone || 'run' }]).slice(-6) })); }
  withExtras(steps) {
    const ex = this.state.extras || []; if (!ex.length) return steps;
    const out = steps.map(s => Object.assign({}, s, { end: false }));
    ex.forEach((ai, j) => { const a = this.ADDABLE[ai]; out.push({ w: { ['wx' + j]: 'run' } }, { w: { ['wx' + j]: 'ok' }, n: { ['x' + j]: 'run' }, msg: a[1] + ' · ' + a[4].toLowerCase() }, { n: { ['x' + j]: 'ok' } }); });
    out.push({ msg: 'Run complete · ' + ex.length + ' added node' + (ex.length > 1 ? 's' : '') + ' ran', tone: 'ok', end: true });
    return out;
  }
  wireData(P) {
    const E = [['w12', 'n1', 'n2'], ['w23', 'n2', 'n3'], ['w34', 'n3', 'n4'], ['w45', 'n4', 'n5'], ['w54', 'n5', 'n4', 1], ['w56', 'n5', 'n6'], ['w67', 'n6', 'n7'], ['w57', 'n5', 'n7', 2]];
    (this.state.extras || []).forEach((e, j) => E.push(['wx' + j, j ? 'x' + (j - 1) : 'n7', 'x' + j]));
    const LB = { w45: 'result', w54: 'retry', w56: 'needs judgment', w57: 'all gates pass' }, sz = k => k === 'n6' ? [240, 204] : [205, 100], out = {};
    E.forEach(([k, a, b, mode]) => {
      const A = P[a], B = P[b]; if (!A || !B) return;
      const [aw, ah] = sz(a), [bw, bh] = sz(b), ac = [A.x + aw / 2, A.y + ah / 2], bc = [B.x + bw / 2, B.y + bh / 2], dx = bc[0] - ac[0], dy = bc[1] - ac[1];
      let p1, p2, n1, n2;
      if (mode === 2) { p1 = [ac[0] - 30, A.y + ah]; p2 = [bc[0], B.y + bh]; n1 = [0, 1]; n2 = [0, 1]; }
      else if (Math.abs(dx) > Math.abs(dy) * 1.15) { const s = Math.sign(dx) || 1; p1 = [s > 0 ? A.x + aw : A.x, ac[1]]; p2 = [s > 0 ? B.x : B.x + bw, bc[1]]; n1 = [s, 0]; n2 = [-s, 0]; }
      else { const s = Math.sign(dy) || 1; p1 = [ac[0], s > 0 ? A.y + ah : A.y]; p2 = [bc[0], s > 0 ? B.y : B.y + bh]; n1 = [0, s]; n2 = [0, -s]; }
      if (mode === 1) { if (n1[0] === 0) { p1[0] += 36; p2[0] += 36; } else { p1[1] += 30; p2[1] += 30; } }
      const dist = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]), kk = mode === 2 ? 120 : Math.max(36, dist * (mode === 1 ? 0.5 : 0.38));
      const c1 = [p1[0] + n1[0] * kk, p1[1] + n1[1] * kk], c2 = [p2[0] + n2[0] * kk, p2[1] + n2[1] * kk];
      if (mode === 1) { const px = n1[0] === 0 ? 50 : 0, py = n1[0] === 0 ? 0 : 50; c1[0] += px; c2[0] += px; c1[1] += py; c2[1] += py; }
      const R = q => Math.round(q[0]) + ' ' + Math.round(q[1]), d = 'M' + R(p1) + ' C' + R(c1) + ' ' + R(c2) + ' ' + R(p2);
      const m = [0.125 * p1[0] + 0.375 * c1[0] + 0.375 * c2[0] + 0.125 * p2[0], 0.125 * p1[1] + 0.375 * c1[1] + 0.375 * c2[1] + 0.125 * p2[1]];
      out[k] = { d, lab: LB[k] ? [LB[k], Math.round(m[0] + 8), Math.round(m[1] - 6)] : null };
    });
    return out;
  }
  nodeDrag(k) {
    return e => {
      if (e.button !== 0) return; e.stopPropagation();
      const stage = e.currentTarget.closest('[data-stage]'); if (!stage) return;
      const unit = 1000 / stage.getBoundingClientRect().width / (this.state.cam.z || 1), P0 = this.positions()[k], sx = e.clientX, sy = e.clientY, wh = k === 'n6' ? [240, 204] : [205, 100];
      let moved = false;
      const move = ev => { const dx = (ev.clientX - sx) * unit, dy = (ev.clientY - sy) * unit; if (!moved && Math.hypot(dx, dy) < 5) return; moved = true; this.setState(s => ({ pos: Object.assign({}, s.pos, { [k]: { x: Math.round(Math.min(Math.max(P0.x + dx, 0), 1000 - wh[0])), y: Math.round(Math.min(Math.max(P0.y + dy, 0), 600 - wh[1])) } }) })); };
      const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); if (!moved) this.setState({ inspect: k }); };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    };
  }
  proximity(x, y) {
    const root = this.rootRef.current; if (!root) return;
    if (!this._cache || performance.now() - this._cacheT > 1500) { this._cache = { logos: Array.from(root.querySelectorAll('img[data-fb],img[data-logo]')), rep: Array.from(root.querySelectorAll('[data-repel]')) }; this._cacheT = performance.now(); }
    const near = (el, R) => { const r = el.getBoundingClientRect(); if (!r.width) return null; const cx = r.left + r.width / 2, cy = r.top + r.height / 2, d = Math.hypot(cx - x, cy - y); return d < R ? { cx, cy, d } : null; };
    this._cache.rep.forEach(el => { const n = near(el, 170); if (n) { const ux = (n.cx - x) / (n.d || 1), uy = (n.cy - y) / (n.d || 1), q = (170 - n.d) / 170; el.style.transition = 'transform .45s cubic-bezier(.2,.8,.2,1)'; el.style.transform = 'translate(' + (ux * 90 * q) + 'px,' + (uy * 70 * q) + 'px) rotate(' + ((ux > 0 ? 1 : -1) * 24 * q) + 'deg)'; el._rp = true; } else if (el._rp) { el.style.transform = ''; el._rp = false; } });
    this._cache.logos.forEach(el => { if (el._fx || el.closest('[data-repel]') || el.closest('[data-stage]')) return; const n = near(el, el.closest('a,button') ? 44 : 100); if (n && this.fxOver) this.fxOver({ target: el, clientX: x, clientY: y }); });
    if (!this.state.swarm && this._bp && (this.props.cursorBuddy ?? true)) {
      let changed = false; const buds = this.state.buds.slice(), vw = Math.max(window.innerWidth || 0, 320), vh = Math.max(window.innerHeight || 0, 400);
      this._bp.forEach((p, i) => { if (!p) return; const d = Math.hypot(p.x + 18 - x, p.y + 10 - y); if (d < 110) { const ux = (p.x - x) / (d || 1), uy = (p.y - y) / (d || 1); buds[i] = { abs: true, fled: true, x: Math.round(Math.min(Math.max(p.x + ux * 180, 4), vw - 60)), y: Math.round(Math.min(Math.max(p.y + uy * 140, 80), vh - 50)) }; changed = true; } });
      if (changed) { this.setState({ buds }); clearTimeout(this._fleeT); this._fleeT = setTimeout(() => { if (!this.swarmEl) this.setState(s => ({ buds: s.buds.map((b, i) => b.fled ? this.homeSpot(i) : b) })); }, 2600); }
    }
  }
  checkGrav() {
    const root = this.rootRef.current; if (!root) return; const el = root.querySelector('[data-bh]'); if (!el) return;
    const r = el.getBoundingClientRect(), vh = window.innerHeight || 0, on = r.width > 0 && r.top < vh * 0.72 && r.bottom > vh * 0.28;
    const g = on ? { cx: Math.round(r.left + r.width / 2), cy: Math.round(r.top + r.height / 2), r: Math.round(r.width * 0.43) } : null, o = this.state.grav;
    if ((!g && o) || (g && (!o || Math.abs(o.cx - g.cx) + Math.abs(o.cy - g.cy) + Math.abs(o.r - g.r) > 6))) this.setState({ grav: g });
  }
  cine(svg) {
    const h = React.createElement;
    return h('div', { style: { position: 'absolute', inset: 0, overflow: 'hidden', background: '#121210' } }, svg,
      h('div', { style: { position: 'absolute', left: 0, right: 0, top: '38%', height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,140,80,.9), rgba(255,240,220,.95), rgba(255,140,80,.9), transparent)', filter: 'blur(1.5px)', mixBlendMode: 'screen', animation: 'abFlare 7s ease-in-out infinite', pointerEvents: 'none' } }),
      h('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, transparent 52%, rgba(0,0,0,.62) 100%)', pointerEvents: 'none' } }),
      h('div', { style: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px)', backgroundSize: '100% 3px', mixBlendMode: 'overlay', pointerEvents: 'none' } }));
  }
  NETDESC = ['39 n8n workflows and 103 Make scenarios across four client workspaces, plus creator CRM stacks, billing recovery and CAC, LTV and ROAS reporting.', '216 automations monitored across n8n, Make and Zapier, and one six-stage onboarding pipeline joining 7 platforms.', 'CRM and lead-capture funnels and pipeline running on GoHighLevel for gymnastics and youth-sport businesses.'];
  netPanel() {
    const h = React.createElement, sel = this.state.netSel || 0, G = this.NETGROUPS, g = G[sel], n = g.kids.length, total = G.reduce((a, x) => a + x.kids.length, 0);
    const list = G.map((p, i) => { const on = i === sel; return h('button', { key: p.name, onClick: () => this.setState({ netSel: i }), onMouseEnter: () => this.state.netSel !== i && this.setState({ netSel: i }), style: { all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 16px 16px 18px', borderRadius: 14, background: on ? '#1C1B18' : 'transparent', boxShadow: on ? 'inset 3px 0 0 #FF5A1F' : 'none', transition: 'background .25s' } },
      h('span', { style: { display: 'flex', alignItems: 'center', gap: 12 } }, h('span', { style: { width: 44, height: 44, borderRadius: 11, background: '#FFFFFF', display: 'grid', placeItems: 'center', overflow: 'hidden', flex: 'none' } }, h('img', { src: p.logo, alt: '', 'data-logo': '1', style: { width: '78%', height: '78%', objectFit: 'contain' } })),
        h('span', { style: { display: 'flex', flexDirection: 'column', gap: 2 } }, h('span', { style: { fontWeight: 800, fontSize: 17, color: on ? '#FFFDF8' : '#C9C4B8' } }, p.name), h('span', { style: { fontFamily: 'Space Mono, monospace', fontSize: 11.5, color: on ? '#FF7A45' : '#8C877C' } }, p.kids.length + ' client teams reached'))),
      on ? h('span', { style: { fontSize: 14, lineHeight: 1.5, color: '#C9C4B8', animation: 'abFadeUp .4s ease both' } }, this.NETDESC[i]) : null); });
    const rings = n > 5 ? [Math.ceil(n / 2) - 1, n - (Math.ceil(n / 2) - 1)] : [n], R = n > 5 ? [25, 43] : [38];
    let idx = 0; const pills = [], beams = [];
    rings.forEach((cnt, ri) => { for (let j = 0; j < cnt; j++) { const k = g.kids[idx++], a = (j / cnt) * Math.PI * 2 + ri * 0.6 - Math.PI / 2, x = 50 + Math.cos(a) * R[ri], y = 50 + Math.sin(a) * R[ri];
      beams.push(h('line', { key: 'b' + idx, x1: 50, y1: 50, x2: x, y2: y, stroke: 'rgba(255,90,31,.38)', strokeWidth: 0.25, strokeDasharray: '1 1.2', style: { animation: 'abFlow 1.6s linear infinite' } }));
      pills.push(h('div', { key: k[0], style: { position: 'absolute', left: x + '%', top: y + '%', width: 0, height: 0 } }, h('a', { href: k[2], target: '_blank', rel: 'noopener', title: k[0], style: { position: 'absolute', left: 0, top: 0, transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', textDecoration: 'none', background: '#141413', color: '#ECE8DF', border: '1px solid #3D3B36', borderRadius: 999, padding: '5px 11px 5px 5px', fontSize: 12.5, fontWeight: 600, boxShadow: '0 6px 18px rgba(0,0,0,.4)', animation: 'abSpinR 120s linear infinite', animationPlayState: 'var(--ps, running)' } },
        h('span', { style: { width: 24, height: 24, borderRadius: '50%', background: '#FFFFFF', display: 'grid', placeItems: 'center', overflow: 'hidden', flex: 'none' } }, h('img', { src: this.kidLogo(k), alt: '', 'data-logo': '1', style: { width: 16, height: 16, objectFit: 'contain' } })), k[0]))); } });
    const system = h('div', { key: 'sys' + sel, onMouseEnter: e => e.currentTarget.style.setProperty('--ps', 'paused'), onMouseLeave: e => e.currentTarget.style.setProperty('--ps', 'running'), style: { position: 'relative', width: 'min(100%, 470px)', aspectRatio: '1', margin: '0 auto', animation: 'abFadeUp .5s ease both' } },
      h('div', { style: { position: 'absolute', inset: '30%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,79,18,.55), rgba(255,79,18,0) 70%)', animation: 'abGlow 3.4s ease-in-out infinite' } }),
      h('div', { style: { position: 'absolute', inset: 0, animation: 'abSpin 120s linear infinite', animationPlayState: 'var(--ps, running)' } },
        h('svg', { viewBox: '0 0 100 100', style: { position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' } }, R.map((r, i) => h('circle', { key: 'r' + i, cx: 50, cy: 50, r, fill: 'none', stroke: 'rgba(236,232,223,.18)', strokeWidth: 0.3, strokeDasharray: i ? '0.6 1.4' : 'none' })), ...beams), ...pills),
      h('div', { style: { position: 'absolute', left: '50%', top: '50%', width: '22%', aspectRatio: '1', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: '#FFFFFF', display: 'grid', placeItems: 'center', overflow: 'hidden', boxShadow: '0 0 0 8px rgba(255,79,18,.22), 0 0 60px rgba(255,79,18,.6)' } }, h('img', { src: g.logo, alt: g.name, 'data-logo': '1', style: { width: '70%', height: '70%', objectFit: 'contain' } })));
    return h('div', { 'data-keep': '1', style: { display: 'flex', flexWrap: 'wrap', background: '#0E0E0D', color: '#ECE8DF', border: '1.5px solid #121210', borderRadius: 22, overflow: 'hidden', boxShadow: '10px 10px 0 #FF4F12' } },
      h('div', { style: { flex: '1 1 320px', padding: 18, display: 'flex', flexDirection: 'column', gap: 6, borderRight: '1px solid #2C2B27' } },
        h('span', { style: { fontFamily: 'Space Mono, monospace', fontSize: 11.5, letterSpacing: '.08em', textTransform: 'uppercase', color: '#8C877C', padding: '4px 18px 10px' } }, 'Partner networks · pick one'), ...list,
        h('div', { style: { marginTop: 'auto', padding: '18px 18px 6px', display: 'flex', alignItems: 'baseline', gap: 10, borderTop: '1px solid #2C2B27' } }, h('span', { style: { fontSize: 44, fontWeight: 900, letterSpacing: '-.05em', color: '#FF5A1F', lineHeight: 1 } }, String(total)), h('span', { style: { fontFamily: 'Space Mono, monospace', fontSize: 11.5, color: '#A39E92', lineHeight: 1.4 } }, 'client teams reached through partner agencies'))),
      h('div', { style: { flex: '1.5 1 480px', padding: '28px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, backgroundImage: 'radial-gradient(rgba(236,232,223,.08) 1px, transparent 1.4px)', backgroundSize: '22px 22px' } }, system,
        h('span', { style: { textAlign: 'center', fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#8C877C', marginTop: 10 } }, 'Hover to pause · click a client to visit')));
  }
  markEl(i) {
    const h = React.createElement, W = '#FFFDF8';
    const C = ['#FF4F12', '#13804A', '#3859FF', '#D97757', '#0E7490', '#7C3AED', '#B87300', '#D62E1F', '#DB2777', '#4A4740'];
    const G = [
      [h('path', { d: 'M11 12l7 8-7 8M18 12l7 8-7 8M25 12l7 8-7 8', stroke: W, strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' })],
      [h('path', { d: 'M20 8l11 4v8c0 7-5 11-11 13-6-2-11-6-11-13v-8z', fill: 'none', stroke: W, strokeWidth: 2.6, strokeLinejoin: 'round' }), h('path', { d: 'M15 20l4 4 7-8', fill: 'none', stroke: W, strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' })],
      [h('circle', { cx: 20, cy: 20, r: 10.5, fill: 'none', stroke: W, strokeWidth: 5.5, strokeDasharray: '8.25 8.25' }), h('circle', { cx: 20, cy: 20, r: 10.5, fill: 'none', stroke: W, strokeWidth: 1.2 })],
      [h('circle', { cx: 20, cy: 20, r: 11, fill: 'none', stroke: W, strokeWidth: 2.6 }), h('path', { d: 'M20 9a11 11 0 0 1 0 22z', fill: W })],
      [h('rect', { x: 8, y: 10, width: 15, height: 12, rx: 3, fill: 'none', stroke: W, strokeWidth: 2.4 }), h('rect', { x: 17, y: 18, width: 15, height: 12, rx: 3, fill: W })],
      [h('circle', { cx: 20, cy: 20, r: 12, fill: 'none', stroke: W, strokeWidth: 2.2 }), h('circle', { cx: 20, cy: 20, r: 7, fill: 'none', stroke: W, strokeWidth: 2.2 }), h('circle', { cx: 20, cy: 20, r: 2.6, fill: W })],
      [h('path', { d: 'M9 31V25M16 31V20M23 31V16M30 31V10', stroke: W, strokeWidth: 3.2, strokeLinecap: 'round' }), h('path', { d: 'M8 20l8-5 7 2 9-8', fill: 'none', stroke: W, strokeWidth: 1.6, strokeDasharray: '2 3' })],
      [h('path', { d: 'M12 27L20 12L29 25Z', fill: 'none', stroke: W, strokeWidth: 2 }), h('circle', { cx: 12, cy: 27, r: 3.6, fill: W }), h('circle', { cx: 20, cy: 12, r: 3.6, fill: W }), h('circle', { cx: 29, cy: 25, r: 3.6, fill: W })],
      [h('path', { d: 'M20 8v24M9.6 14l20.8 12M9.6 26l20.8-12', stroke: W, strokeWidth: 3, strokeLinecap: 'round' }), h('circle', { cx: 20, cy: 20, r: 4, fill: C[8], stroke: W, strokeWidth: 2 })],
      [h('path', { d: 'M10 32V18a10 10 0 0 1 20 0v14', fill: 'none', stroke: W, strokeWidth: 2.8 }), h('path', { d: 'M10 25h20', stroke: W, strokeWidth: 2 }), h('circle', { cx: 20, cy: 17, r: 3, fill: '#FF4F12' })]
    ];
    const MV = [['translate', '0 0;1.6 0;0 0;-1.6 0;0 0', '4s'], ['translate', '0 0;0 -1.6;0 0;0 1.2;0 0', '3s'], ['rotate', '0 20 20;360 20 20', '12s'], ['rotate', '0 20 20;10 20 20;0 20 20;-10 20 20;0 20 20', '5s']];
    const mv = MV[[0, 1, 2, 3, 1, 2, 0, 3, 2, 1][i]];
    return h('svg', { viewBox: '0 0 40 40', width: '100%', height: '100%', style: { display: 'block' } }, h('rect', { width: 40, height: 40, rx: 10, fill: C[i] }), h('g', null, h('animateTransform', { attributeName: 'transform', type: mv[0], values: mv[1], dur: mv[2], repeatCount: 'indefinite' }), ...G[i]));
  }
  repoViz(i) {
    const h = React.createElement, O = '#FF4F12', P = '#ECE8DF', D = '#3D3B36', G = '#6EDB9A', R = '#FF6B5B';
    const txt = (x, y, t, c) => h('text', { x, y, fill: c || '#8C877C', fontFamily: 'Space Mono, monospace', fontSize: 9 }, t);
    const A = (o) => h('animate', Object.assign({ repeatCount: 'indefinite' }, o));
    let k = [];
    if (i === 0) {
      const d = 'M0 70 L40 70 L50 60 L60 80 L70 70 L120 70 L130 30 L140 100 L150 70 L200 70 L210 60 L220 80 L230 70 L300 70';
      k = [h('path', { d, fill: 'none', stroke: D, strokeWidth: 1.6 }), h('path', { d, fill: 'none', stroke: O, strokeWidth: 2.4, strokeDasharray: '60 600' }, A({ attributeName: 'stroke-dashoffset', from: '0', to: '-660', dur: '3s' })), h('circle', { cx: 130, cy: 30, r: 5, fill: R }, A({ attributeName: 'r', values: '3;7;3', dur: '1.5s' })), txt(12, 18, 'n8n executions'), txt(200, 110, 'failure → digest', O)];
    } else if (i === 1) {
      const L = [30, 60, 90];
      k = [...L.map((y, j) => h('rect', { key: 'l' + j, x: 200, y: y - 10, width: 88, height: 20, rx: 4, fill: 'none', stroke: D })), txt(212, 33, 'urgent'), txt(212, 63, 'billing'), txt(212, 93, 'how-to'), h('rect', { x: 112, y: 46, width: 50, height: 24, rx: 5, fill: 'none', stroke: G, strokeDasharray: '3 3' }), txt(118, 84, 'approve', G),
        ...[0, 1, 2].map(j => h('rect', { key: 't' + j, width: 22, height: 12, rx: 2, fill: j === 0 ? O : P }, h('animateMotion', { dur: '3s', begin: (-j) + 's', repeatCount: 'indefinite', path: 'M14 52 C90 52 140 ' + (L[j] - 6) + ' 230 ' + (L[j] - 6) })))];
    } else if (i === 2) {
      k = [txt(14, 22, 'SELECT …', O), ...[0, 1, 2, 3].map(j => h('rect', { key: j, x: 14, y: 32 + j * 15, height: 7, rx: 3.5, fill: j === 2 ? R : P, width: 0 }, A({ attributeName: 'width', values: '0;' + (110 + j * 32) + ';' + (110 + j * 32), keyTimes: '0;0.5;1', dur: '3.2s', begin: (j * 0.3) + 's' }))), h('rect', { x: 14, y: 96, height: 7, rx: 3.5, fill: G, width: 0 }, A({ attributeName: 'width', values: '0;0;190', keyTimes: '0;0.7;1', dur: '3.2s' })), txt(222, 22, 'read only', G), txt(222, 70, 'error → repair', R)];
    } else if (i === 3) {
      const N = [[50, 60], [110, 28], [120, 92], [190, 58], [250, 26], [258, 94]], E = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]];
      k = [...E.map((e, j) => h('line', { key: 'e' + j, x1: N[e[0]][0], y1: N[e[0]][1], x2: N[e[1]][0], y2: N[e[1]][1], stroke: D, strokeWidth: 1.5 })), ...N.map((n, j) => h('circle', { key: 'n' + j, cx: n[0], cy: n[1], r: j === 3 ? 9 : 5, fill: j === 3 ? O : P }, A({ attributeName: 'opacity', values: '.35;1;.35', dur: '2.4s', begin: (j * 0.3) + 's' }))), txt(12, 112, 'arXiv → briefing → topic map')];
    } else if (i === 4) {
      k = [...Array.from({ length: 28 }, (_, j) => { const hh = 10 + ((j * 37) % 46), d = (0.9 + (j % 5) * 0.17) + 's'; return h('rect', { key: j, x: 16 + j * 9.8, y: 56, width: 5, rx: 2.5, height: 4, fill: j > 19 ? G : O }, A({ attributeName: 'height', values: '4;' + hh + ';4', dur: d }), A({ attributeName: 'y', values: '56;' + (58 - hh / 2) + ';56', dur: d })); }), txt(14, 112, 'intent: book appointment'), txt(226, 112, 'confirmed', G)];
    } else {
      k = [h('rect', { x: 20, y: 16, width: 62, height: 88, rx: 4, fill: 'none', stroke: P, strokeWidth: 1.5 }), ...[0, 1, 2, 3, 4].map(j => h('rect', { key: 'd' + j, x: 30, y: 30 + j * 13, width: 40 - (j % 2) * 12, height: 4, rx: 2, fill: D })), h('path', { d: 'M98 60h52', stroke: O, strokeWidth: 2, strokeDasharray: '4 4' }, A({ attributeName: 'stroke-dashoffset', from: '16', to: '0', dur: '.8s' })),
        ...['vendor', 'total', 'date', 'tax'].map((t, j) => h('g', { key: 'f' + j }, A({ attributeName: 'opacity', values: '0;1;1;0', keyTimes: '0;.2;.85;1', dur: '3.6s', begin: (j * 0.4) + 's' }), h('rect', { x: 166, y: 18 + j * 23, width: 118, height: 17, rx: 4, fill: 'none', stroke: j === 3 ? R : G }), txt(173, 30 + j * 23, t + (j === 3 ? ' · model repair' : ' ✓'), j === 3 ? R : G)))];
    }
    return this.cine(h('svg', { viewBox: '0 0 300 120', width: '100%', height: '100%', style: { display: 'block', position: 'absolute', inset: 0, animation: 'abKen 18s ease-in-out infinite alternate' } }, ...k));
  }
  journeyViz(kind) {
    const h = React.createElement, O = '#FF4F12', P = '#ECE8DF', D = '#2C2B27', G = '#6EDB9A';
    const txt = (x, y, t, c, s, w, a) => h('text', { x, y, fill: c || '#A39E92', fontFamily: s ? 'Schibsted Grotesk, sans-serif' : 'Space Mono, monospace', fontSize: s || 11, fontWeight: w || 400, textAnchor: a || 'start' }, t);
    const A = o => h('animate', Object.assign({ repeatCount: 'indefinite' }, o));
    let sd = kind.length * 97; const rnd = () => { sd = (sd * 16807) % 2147483647; return sd / 2147483647; };
    let k = [];
    if (kind === 'now') {
      const T = ['n8n', 'Claude', 'HubSpot', 'Supabase', 'Slack', 'Vapi', 'Make', 'OpenAI'];
      k = [h('ellipse', { cx: 200, cy: 150, rx: 150, ry: 96, fill: 'none', stroke: D, strokeDasharray: '3 6' }), h('ellipse', { cx: 200, cy: 150, rx: 80, ry: 52, fill: 'none', stroke: D }),
        ...T.map((t, i) => { const a = i / T.length * Math.PI * 2 - Math.PI / 2, x = 200 + Math.cos(a) * 150, y = 150 + Math.sin(a) * 96; return h('g', { key: t }, h('line', { x1: 200, y1: 150, x2: x, y2: y, stroke: '#3D3B36' }), h('circle', { r: 3, fill: O }, h('animateMotion', { dur: '2.6s', begin: (-i * 0.33) + 's', repeatCount: 'indefinite', path: 'M200 150 L' + x.toFixed(1) + ' ' + y.toFixed(1) })), h('rect', { x: x - 34, y: y - 11, width: 68, height: 22, rx: 11, fill: '#1C1B18', stroke: i % 3 === 0 ? O : '#3D3B36' }), txt(x, y + 4, t, P, 0, 400, 'middle')); }),
        h('circle', { cx: 200, cy: 150, r: 30, fill: 'none', stroke: O }, A({ attributeName: 'r', values: '30;56', dur: '2s' }), A({ attributeName: 'opacity', values: '.7;0', dur: '2s' })),
        h('circle', { cx: 200, cy: 150, r: 30, fill: O }), txt(200, 157, 'AB', '#121210', 20, 900, 'middle'), txt(16, 290, 'agents, CRM, voice and delivery systems')];
    } else if (kind === 'sales') {
      for (let cI = 0; cI < 18; cI++) { const kids = []; for (let r = 0; r < 6; r++) { if (cI * 6 + r >= 107) break; const x = 34 + cI * 19, y = 96 + r * 26; kids.push(h('circle', { key: 'h' + r, cx: x, cy: y - 7, r: 4 }), h('rect', { key: 'b' + r, x: x - 5, y: y - 1, width: 10, height: 9, rx: 4 })); } k.push(h('g', { key: cI, fill: '#3D3B36' }, A({ attributeName: 'fill', values: '#3D3B36;' + O + ';' + P + ';#3D3B36', keyTimes: '0;.2;.5;1', dur: '4.5s', begin: (cI * 0.12) + 's' }), ...kids)); }
      k.push(txt(28, 58, '107', P, 46, 900), txt(124, 42, 'people trained'), txt(124, 58, '16-month leadership role'), ...Array.from({ length: 12 }, (_, i) => h('rect', { key: 'w' + i, x: 236 + i * 13, y: 30, width: 8, height: 26, rx: 2, fill: i % 4 === 0 ? O : '#3D3B36' }, A({ attributeName: 'height', values: '6;26;12;6', dur: (1.6 + (i % 3) * 0.4) + 's' }), A({ attributeName: 'y', values: '50;30;44;50', dur: (1.6 + (i % 3) * 0.4) + 's' }))), txt(236, 74, 'weekly operating rhythm'));
    } else if (kind === 'advisory') {
      const pa = 'M128 150 C200 150 200 82 278 82', pb = 'M128 150 C200 150 200 218 278 218';
      k = [h('rect', { x: 26, y: 108, width: 102, height: 84, rx: 10, fill: '#1C1B18', stroke: '#3D3B36' }), h('path', { d: 'M48 152 L77 128 L106 152 M56 150 V178 H98 V150', fill: 'none', stroke: P, strokeWidth: 2 }), txt(77, 210, 'one property decision', '#A39E92', 0, 400, 'middle'),
        h('path', { d: pa, fill: 'none', stroke: '#3D3B36', strokeWidth: 2 }), h('path', { d: pb, fill: 'none', stroke: O, strokeWidth: 2.4, strokeDasharray: '6 6' }, A({ attributeName: 'stroke-dashoffset', from: '24', to: '0', dur: '.9s' })),
        h('circle', { r: 4, fill: P }, h('animateMotion', { dur: '3s', repeatCount: 'indefinite', path: pa })), h('circle', { r: 5, fill: O }, h('animateMotion', { dur: '2.2s', repeatCount: 'indefinite', path: pb })),
        h('rect', { x: 278, y: 52, width: 106, height: 60, rx: 10, fill: '#1C1B18', stroke: '#3D3B36' }), txt(290, 76, 'Residential', P, 15, 700), txt(290, 96, 'yield 5.1% · hold'),
        h('rect', { x: 278, y: 188, width: 106, height: 60, rx: 10, fill: '#1C1B18', stroke: O, strokeWidth: 2 }, A({ attributeName: 'stroke-opacity', values: '.3;1;.3', dur: '2.2s' })), txt(290, 212, 'Commercial ✓', O, 15, 700), txt(290, 232, 'yield 7.4% · act'),
        ...[0, 1, 2, 3, 4].map(i => h('rect', { key: 'g' + i, x: 26 + i * 22, y: 40 + (4 - i) * 6, width: 14, height: 28 + i * 6, rx: 2, fill: i === 4 ? O : '#3D3B36' }, A({ attributeName: 'opacity', values: '.4;1;.4', dur: '2.4s', begin: (i * 0.2) + 's' }))),
        txt(16, 290, 'complex decisions → clear client choices')];
    } else {
      const fam = Array.from({ length: 30 }, () => { const a = rnd() * Math.PI * 2, r = 40 + rnd() * 140; return [200 + Math.cos(a) * r * 1.15, 170 + Math.sin(a) * r * 0.62, r]; }).filter(p => p[1] > 70 && p[1] < 262);
      k = [...[0, 1, 2].map(i => h('ellipse', { key: 'r' + i, cx: 200, cy: 170, rx: 10, ry: 6, fill: 'none', stroke: O, strokeWidth: 1.4 }, A({ attributeName: 'rx', values: '10;200', dur: '4.5s', begin: (-i * 1.5) + 's' }), A({ attributeName: 'ry', values: '6;110', dur: '4.5s', begin: (-i * 1.5) + 's' }), A({ attributeName: 'opacity', values: '.8;0', dur: '4.5s', begin: (-i * 1.5) + 's' }))),
        ...fam.map((p, i) => h('g', { key: 'f' + i, fill: '#3D3B36' }, A({ attributeName: 'fill', values: '#3D3B36;' + G + ';' + G + ';#3D3B36', keyTimes: '0;.12;.8;1', dur: '4.5s', begin: (p[2] / 200 * 1.5).toFixed(2) + 's' }), h('rect', { x: p[0] - 4, y: p[1] - 4, width: 8, height: 8, rx: 2 }))),
        h('rect', { x: 184, y: 154, width: 32, height: 32, rx: 6, fill: O }), h('path', { d: 'M190 166 H210 M190 174 H210 M200 158 V182', stroke: '#121210', strokeWidth: 2 }),
        txt(24, 52, '748', P, 42, 900), txt(112, 36, 'ration packs mobilized'), txt(112, 52, 'COVID-response food program'), txt(16, 290, 'families reached, not dashboards shipped')];
    }
    return this.cine(h('svg', { viewBox: '0 0 400 300', width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid meet', style: { display: 'block', position: 'absolute', inset: 0, animation: 'abKen 16s ease-in-out infinite alternate' } }, ...k));
  }
  askLinks(q) {
    const e = encodeURIComponent(q), F = d => 'https://www.google.com/s2/favicons?domain=' + d + '&sz=128';
    return [['ChatGPT', F('chatgpt.com'), 'https://chatgpt.com/?q=' + e], ['Claude', 'https://cdn.simpleicons.org/claude', 'https://claude.ai/new?q=' + e, F('claude.ai')], ['Perplexity', 'https://cdn.simpleicons.org/perplexity', 'https://www.perplexity.ai/search?q=' + e, F('perplexity.ai')], ['Google AI Mode', 'https://cdn.simpleicons.org/googlegemini', 'https://www.google.com/search?udm=50&q=' + e, F('gemini.google.com')], ['Grok', F('grok.com'), 'https://grok.com/?q=' + e], ['Copilot', F('copilot.microsoft.com'), 'https://copilot.microsoft.com/?q=' + e]]
      .map((a, i) => ({ name: a[0], src: a[1], href: a[2], fb: a[3] || a[1], key: ['chatgpt', 'claude', 'perplexity', 'google', 'grok', 'copilot'][i] }));
  }

  buildSteps(scen, S) {
    const pre = [
      { n: { n1: 'run' }, msg: S.trig.name + ' · webhook received: new inbound request' },
      { n: { n1: 'ok' }, w: { w12: 'run' } },
      { w: { w12: 'ok' }, n: { n2: 'run' }, msg: S.llm.name + ' · extracting intent, budget, urgency' },
      { n: { n2: 'ok' }, w: { w23: 'run' }, msg: 'Intent: discovery call · confidence 0.91', tone: 'ok' },
      { w: { w23: 'ok' }, n: { n3: 'run' }, msg: S.crm.name + ' · matched on email, upsert with idempotency key' },
      { n: { n3: 'ok' }, w: { w34: 'run' } },
      { w: { w34: 'ok' }, n: { n4: 'run' }, msg: S.cal.name + ' · requesting the first open slot' }
    ];
    const finish = (extra, closing) => [
      { w: { w45: 'ok', w57: 'run', w56: 'skip', w67: 'skip' }, n: { n5: 'ok', n6: 'skip' }, msg: extra },
      { w: { w57: 'ok' }, n: { n7: 'run' }, msg: S.store.name + ' · evidence row written' },
      { n: { n7: 'ok' }, msg: closing, tone: 'ok', end: true }
    ];
    if (scen === 'happy') return pre.concat([
      { n: { n4: 'ok' }, w: { w45: 'run' }, msg: 'Slot held · Thu 15:30 PKT', tone: 'ok' },
      { w: { w45: 'ok' }, n: { n5: 'run' }, msg: 'ErrorLens · checking state gates' }
    ], finish('All gates pass · no human needed', 'Run complete · 0 exceptions'));
    if (scen === 'timeout') return pre.concat([
      { n: { n4: 'err' }, w: { w45: 'err' }, msg: S.cal.name + ' · 504 gateway timeout after 10s', tone: 'err' },
      { w: { w45: 'ok' }, n: { n5: 'run' }, msg: 'ErrorLens · transient failure, safe to retry', tone: 'warn' },
      { n: { n5: 'wait' }, w: { w54: 'run' }, msg: 'Retry 1 of 3 · backoff 2s · same idempotency key', tone: 'warn' },
      { w: { w54: 'ok' }, n: { n4: 'run' }, msg: S.cal.name + ' · requesting the slot again' },
      { n: { n4: 'ok' }, w: { w45: 'run' }, msg: 'Slot held on retry', tone: 'ok' },
      { n: { n5: 'run' } }
    ], finish('Recovered · no human needed', 'Run complete · 1 exception recovered and logged'));
    return pre.concat([
      { n: { n4: 'err' }, w: { w45: 'err' }, msg: 'State gate blocked · payment still pending', tone: 'err' },
      { w: { w45: 'ok' }, n: { n5: 'run' }, msg: 'ErrorLens · not safe to retry, needs judgment', tone: 'warn' },
      { n: { n5: 'ok' }, w: { w56: 'run', w57: 'skip' }, msg: 'Escalating with thread, CRM history and invoice' },
      { w: { w56: 'ok' }, n: { n6: 'run' }, msg: 'Ahmad · reviewing the full context', tone: 'warn' },
      { n: { n6: 'ok' }, w: { w67: 'run' }, msg: 'Approved · hold slot 24h, send payment link', tone: 'ok' },
      { w: { w67: 'ok' }, n: { n7: 'run' }, msg: S.store.name + ' · decision and reason recorded' },
      { n: { n7: 'ok' }, msg: 'Run complete · human decision on record', tone: 'ok', end: true }
    ]);
  }

  componentDidMount() {
    this.startRun('happy', 0);
    this.setState({ clock: this.pkt() });
    this.clockT = setInterval(() => this.setState({ clock: this.pkt() }), 1000);
    const root = this.rootRef.current;
    if (root) {
      root.addEventListener('error', this.onImgErr, true);
      let tries = 0;
      this.vint = setInterval(() => {
        const vids = root.querySelectorAll('video');
        vids.forEach(v => { v.muted = true; if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } });
        if (++tries > 20 || (vids.length && Array.from(vids).every(v => !v.paused))) clearInterval(this.vint);
      }, 500);
    }
    this.setupCount();
    this.setupAgentic();
    this.setupBuddy();
    this.fetchGh();
    this.setupFx();
    this.setupBg();
    try { const sv = localStorage.getItem('ab-theme'); const th = sv || 'light'; document.documentElement.setAttribute('data-theme', th); if (th !== 'light') this.setState({ theme: th }); } catch (e) {}
    this.oxint = setInterval(() => { if (Date.now() < (this.oxHold || 0)) return; this.setState(s => ({ ox: (s.ox + 1) % 5 })); }, 3600);
  }
  setupCount() {
    const el = this.casesRef.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    this.setState({ cp: 0 });
    const check = () => {
      if (!this.casesRef.current) return;
      if (this.casesRef.current.getBoundingClientRect().top < window.innerHeight * 0.85) { this.stopCheck(); this.runCount(); }
    };
    this.stopCheck = () => { window.removeEventListener('scroll', check, true); clearTimeout(this.countFb); };
    window.addEventListener('scroll', check, { passive: true, capture: true });
    this.countFb = setTimeout(() => { this.stopCheck(); clearInterval(this.cint); this.setState({ cp: 1 }); }, 6000);
  }
  runCount() {
    const t0 = Date.now(), d = 1500;
    clearInterval(this.cint);
    this.cint = setInterval(() => { const p = Math.min(1, (Date.now() - t0) / d); this.setState({ cp: p }); if (p >= 1) clearInterval(this.cint); }, 40);
  }
  componentWillUnmount() { clearInterval(this.gint); [this.agint, this.chint, this.ckint, this.ghint, this.bint, this.oxint].forEach(clearInterval); cancelAnimationFrame(this.bgRaf); if (this.bgResize) window.removeEventListener('resize', this.bgResize); if (this.bgMove) window.removeEventListener('pointermove', this.bgMove); if (this.fxLayer) this.fxLayer.remove(); const rt = this.rootRef.current; if (rt && this.fxOver) { rt.removeEventListener('pointerover', this.fxOver, true); rt.removeEventListener('pointerout', this.fxOut, true); rt.removeEventListener('click', this.fxClick, true); } if (this.cleanBuddy) this.cleanBuddy(); if (this.stopCheck) this.stopCheck(); clearInterval(this.cint); clearInterval(this.vint); clearTimeout(this.t); clearInterval(this.clockT); const r = this.rootRef.current; if (r) r.removeEventListener('error', this.onImgErr, true); }
  onImgErr = e => { const el = e.target; if (el && el.tagName === 'IMG' && el.hasAttribute('data-fb')) { const fb = el.getAttribute('data-fb'); if (el.src !== fb) el.src = fb; else el.style.visibility = 'hidden'; } };
  pkt() { try { return new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Karachi', hour12: false }); } catch (e) { return ''; } }
  fmt(ms) { const s = Math.floor(ms / 1000), m = Math.floor(s / 60); return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0') + '.' + String(ms % 1000).padStart(3, '0'); }
  startRun(scen, stack) {
    clearTimeout(this.t);
    this.steps = this.withExtras(this.buildSteps(scen, this.curStack(stack)));
    this.si = 0; this.t0 = Date.now();
    this.setState(s => ({ nodes: {}, wires: {}, log: [], run: s.run + 1, scen, stack, layout: Object.keys(s.pos).length ? Math.max(0, s.layout) : (s.layout + 1) % 3 }));
    this.t = setTimeout(() => this.tick(), 500);
  }
  tick() {
    const st = this.steps[this.si++];
    if (!st) return;
    this.setState(s => {
      let log = s.log;
      if (st.msg) log = log.concat([{ t: this.fmt(Date.now() - this.t0), msg: st.msg, tone: st.tone || 'run' }]).slice(-6);
      return { nodes: Object.assign({}, s.nodes, st.n || {}), wires: Object.assign({}, s.wires, st.w || {}), log };
    });
    const ms = this.props.stepMs ?? 850;
    if (st.end) {
      if (this.props.autoplay ?? true) {
        this.t = setTimeout(() => {
          const order = ['happy', 'timeout', 'judgment'];
          this.startRun(order[(order.indexOf(this.state.scen) + 1) % 3], (this.state.stack + 1) % this.STACKS.length);
        }, 2800);
      }
    } else this.t = setTimeout(() => this.tick(), ms);
  }
  onLogoErr = e => {
    const el = e.currentTarget, fb = el.getAttribute('data-fb');
    if (fb && el.src !== fb) el.src = fb; else el.style.visibility = 'hidden';
  };
  statusLook(s, hl) {
    const C = { idle: '#8C877C', run: '#FF4F12', ok: '#13804A', err: '#D62E1F', wait: '#B87300', skip: '#A8A296' };
    const T = { idle: 'Waiting', run: 'Running…', ok: 'Success', err: 'Failed', wait: 'Retrying', skip: 'Skipped' };
    const B = { idle: '#CFC9BC', run: '#FF4F12', ok: '#13804A', err: '#D62E1F', wait: '#B87300', skip: '#DDD7CA' };
    let shadow = s === 'run' ? '0 0 0 4px rgba(255,79,18,.16), 0 14px 32px -14px rgba(255,79,18,.8)' : s === 'err' ? '0 0 0 4px rgba(214,46,31,.16)' : '0 1px 0 rgba(18,18,16,.06)';
    if (hl) shadow = '0 0 0 3px #121210, 0 0 0 7px rgba(255,79,18,.35)';
    return { color: C[s], statusText: T[s], border: hl ? '#121210' : B[s], shadow, op: s === 'skip' ? 0.45 : 1, tf: s === 'run' || hl ? 'translateY(-3px)' : 'none' };
  }
  tile(t, i) {
    const l = this.L(t[0], t[1], t[2]);
    return React.createElement('span', { key: i, 'data-repel': '1', style: { display: 'flex', alignItems: 'center', gap: 10, background: '#FFFFFF', border: '1px solid #CFC9BC', borderRadius: 12, padding: '12px 18px', flex: 'none', fontWeight: 700, fontSize: 17, letterSpacing: '-.01em', color: '#121210' } },
      React.createElement('img', { src: l.src, 'data-fb': l.fb, onError: this.onLogoErr, alt: '', style: { width: 26, height: 26, objectFit: 'contain' } }), l.name);
  }
  marqRow(list, dir, dur) {
    const items = list.concat(list).map((t, i) => this.tile(t, i));
    return React.createElement('div', { style: { overflow: 'hidden', maskImage: 'linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)' } },
      React.createElement('div', { style: { display: 'flex', gap: 12, width: 'max-content', paddingRight: 12, animation: 'abMarq ' + dur + 's linear infinite', animationDirection: dir, animationPlayState: this.state.marqPaused ? 'paused' : 'running' } }, items));
  }

  renderVals() {
    const st = this.state, S = this.curStack(st.stack), hl = st.hl, P = this.positions();
    const nodes = this.NODES.concat(this.extraNodes()).map(n => {
      const l = n.tool || S[n.t], look = this.statusLook(st.nodes[n.k] || 'idle', hl === n.k);
      return Object.assign({ inspect: () => this.setState({ inspect: n.k }), key: n.k, left: P[n.k].x / 10 + '%', top: P[n.k].y / 6 + '%', drag: this.nodeDrag(n.k), label: n.label, title: n.title, tool: l.name, src: l.src, fb: l.fb }, look);
    });
    const human = this.statusLook(st.nodes.n6 || 'idle', hl === 'n6');
    if (human.border === '#CFC9BC') human.border = '#121210';
    human.left = P.n6.x / 10 + '%'; human.top = P.n6.y / 6 + '%';
    const WD = this.wireData(P);
    const WC = { idle: '#BDB6A7', run: '#FF4F12', ok: '#121210', err: '#D62E1F', skip: '#D9D3C6' };
    const h = React.createElement;
    const wiresSvg = h('svg', { viewBox: '0 0 1000 600', style: { position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' } },
      Object.keys(WD).map(k => {
        const d = WD[k].d, s = st.wires[k] || 'idle';
        const dashed = s === 'run' || s === 'err' || (s === 'idle' && (k === 'w54' || k === 'w57' || k === 'w56'));
        const lab = WD[k].lab;
        return h('g', { key: k },
          h('path', { d, fill: 'none', stroke: (hl === 'n4' && k === 'w54') ? '#121210' : WC[s], strokeWidth: s === 'run' ? 2.6 : 1.7, strokeLinecap: 'round', strokeDasharray: dashed ? '6 7' : undefined, style: s === 'run' ? { animation: 'abFlow .6s linear infinite' } : undefined }),
          s === 'run' ? h('circle', { r: 5.5, fill: '#FF4F12', stroke: '#FFFDF8', strokeWidth: 2 }, h('animateMotion', { dur: '0.85s', repeatCount: 'indefinite', path: d })) : null,
          lab ? h('text', { x: lab[1], y: lab[2], fill: s === 'run' ? '#C2410C' : '#8C877C', fontFamily: 'Space Mono, monospace', fontSize: 12, textAnchor: lab[3] || 'start' }, lab[0]) : null);
      }));
    const scenarios = [['happy', 'Happy path'], ['timeout', 'Timeout'], ['judgment', 'Needs judgment']].map(([k, label]) => ({
      label, go: () => this.startRun(k, (st.stack + 1) % this.STACKS.length), bg: st.scen === k ? '#121210' : '#FFFDF8', fg: st.scen === k ? '#ECE8DF' : '#121210'
    }));
    const TC = { run: '#ECE8DF', ok: '#6EDB9A', err: '#FF7B6B', warn: '#F5B544' };
    const principles = [
      ['01', 'Idempotency', 'Run it twice, get one result. No duplicate contacts, no double bookings.', 'n3'],
      ['02', 'State gates', 'Nothing moves until the conditions for it are true.', 'n5'],
      ['03', 'Recovery', 'Transient failures retry safely. Everything else is classified, never swallowed.', 'n4'],
      ['04', 'Human context', 'When judgment is needed, a person gets the whole story, not just an alert.', 'n6']
    ].map(p => ({ num: p[0], title: p[1], body: p[2], on: () => this.setState({ hl: p[3] }) }));
    const lg = k => { const v = this.LOGOS[k]; return this.L(v[0], v[1], v[2]); };
    const systems = this.SYSTEMS.map((s, i) => {
      const on = st.sel === i;
      return Object.assign({}, s, { num: String(i + 1).padStart(2, '0'), select: () => this.state.sel !== i && this.setState({ sel: i }), color: on ? '#FFFDF8' : '#8C877C', numColor: on ? '#FF5A1F' : '#5E5B54', pad: on ? '16px' : '0px', bg: 'transparent', vis: on ? 1 : 0, pe: on ? 'auto' : 'none' });
    });
    const c = this.SYSTEMS[st.sel];
    const cur = { name: c.name, desc: c.desc, tags: c.tags, href: c.href, logos: c.logos.map(lg) };
    const repos = this.REPOS.map(r => ({ kind: r.kind, name: r.name, desc: r.desc, href: 'https://github.com/syedahmad0786/' + r.slug, logos: r.logos.map(lg) }));
    const half = Math.ceil(this.TOOLS.length / 2);
    const marquee = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } }, this.marqRow(this.TOOLS.slice(0, half), 'normal', 48), this.marqRow(this.TOOLS.slice(half), 'reverse', 54));
    const words = ['Signal', 'Context', 'Decision', 'Boundary', 'Action', 'Evidence'];
    const seq = words.concat(words).map((w, i) => h('span', { key: i, style: { display: 'flex', alignItems: 'center', gap: 36, flex: 'none' } },
      h('span', { style: { fontSize: 'clamp(48px,7vw,112px)', fontWeight: 900, letterSpacing: '-.05em', lineHeight: 1, color: i % 2 ? 'transparent' : '#ECE8DF', WebkitTextStroke: i % 2 ? '1.5px #ECE8DF' : '0' } }, w),
      h('span', { style: { fontFamily: 'Space Mono, monospace', fontSize: 'clamp(18px,2vw,28px)', color: '#FF5A1F' } }, '→')));
    const wordBand = h('div', { style: { display: 'flex', gap: 36, width: 'max-content', paddingRight: 36, animation: 'abMarq 38s linear infinite' } }, seq);
    const liveDot = h('span', { style: { width: 9, height: 9, borderRadius: '50%', background: '#13804A', animation: 'abPulse 1.8s infinite', flex: 'none' } });
    const AI = 'https://ahmadbukhari.com/art/linkedin/';
    const agentic = this.AG.map((a, i) => { const on = st.selA === i; return { num: String(i + 1).padStart(2, '0'), name: a.name, kind: a.kind, src: a.pub ? 'Public source' : 'Private repo', srcColor: a.pub ? '#6EDB9A' : '#A39E92', color: on ? '#FFFDF8' : '#8C877C', numColor: on ? '#FF5A1F' : '#5E5B54', pad: on ? '14px' : '0px', bar: on ? 'inset 3px 0 0 #FF5A1F' : 'none', select: () => this.selectA(i), mark: this.markEl(i), markOp: on ? 1 : 0.6 }; });
    const A0 = this.AG[st.selA];
    const curA = { name: A0.name, kind: A0.kind, mark: this.markEl(st.selA), desc: A0.desc, big: A0.big.map(b => ({ v: b[0], l: b[1] })), verified: A0.verified, img: AI + A0.slug + '.png', live: 'https://' + A0.slug + '.vercel.app', host: A0.slug + '.vercel.app', hasGh: !!A0.pub, gh: 'https://github.com/syedahmad0786/' + A0.slug, hasBrief: !!A0.brief, brief: 'https://aixcelsolutions.com/case-studies/' + A0.slug };
    const checks = A0.checks.map((t, i) => ({ t, op: i < st.vk ? 1 : 0.18, mark: i < st.vk ? '✓' : '·' }));
    const ckState = st.vk >= A0.checks.length ? 'all checks passed' : 'checking ' + (st.vk + 1) + ' of ' + A0.checks.length;
    const agStack = this.AGSTACK.map(t => this.L(t[0], t[1], t[2]));
    if (!this.seenCh) this.seenCh = new Set();
    const channels = this.CH.map((c, i) => { const on = st.ch === i; const l = this.L(c[0], c[1], c[2]); return { num: String(i + 1).padStart(2, '0'), name: c[0], handle: c[3], href: c[4], ph: c[5], slot: 'social-' + c[0].toLowerCase(), src: l.src, fb: l.fb, embed: c[6] && this.seenCh && (on || this.seenCh.has(i)) ? c[6][0] : null, embedMode: c[6] ? c[6][1] : null, vis: on ? 1 : 0, pe: on ? 'auto' : 'none', border: on ? '#121210' : '#CFC9BC', bg: on ? '#FFFDF8' : 'transparent', shadow: on ? '4px 4px 0 #FF4F12' : 'none', tf: on ? 'translate(-2px,-2px)' : 'none', on: () => { this.chPaused = true; this.seenCh.add(i); if (this.state.ch !== i) this.setState({ ch: i }); else this.forceUpdate(); }, click: e => { if (c[6]) { e.preventDefault(); this.chPaused = true; this.seenCh.add(i); this.setState({ ch: i }); } } }; });
    const curCh = channels[st.ch];
    const g = st.gh[st.ghi];
    const gh = g ? { text: 'syedahmad0786 ' + g.text, href: g.href, ago: this.ago(g.at) } : { text: '', href: '#', ago: '' };
    const vwN = Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0, 320), vhN = Math.max(window.innerHeight || 0, 400), showN = vwN < 820 ? 3 : this.BUDS.length;
    const cheers = ['Hurrah!', 'Let’s build!', 'Shipping!'];
    this._bp = [];
    const buddy = (this.props.cursorBuddy ?? true) && st.buds.length ? h('div', { 'data-keep': '1', style: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 40, overflow: 'hidden' } }, st.buds.slice(0, showN).map((b, i) => {
      const B = this.BUDS[i], l = this.L(B[0], B[1], B[2]), p = this.budPx(b, i, vwN, vhN), v = i % 3, win = st.winners.indexOf(i) >= 0;
      this._bp[i] = p;
      const img = h('img', { src: l.src, 'data-fb': l.fb, alt: '', style: { width: v === 1 ? 18 : 16, height: v === 1 ? 18 : 16, borderRadius: 4, objectFit: 'contain', background: '#FFFFFF' } });
      const badge = v === 1
        ? h('div', { style: { marginLeft: 12, marginTop: -2, width: 32, height: 32, borderRadius: '50%', background: '#FFFDF8', border: '2px solid ' + B[3], display: 'grid', placeItems: 'center', boxShadow: '0 0 0 ' + (st.swarm ? 7 : 4) + 'px ' + B[3] + '33, 0 0 0 ' + (st.swarm ? 14 : 8) + 'px ' + B[3] + '14', transition: 'box-shadow .4s', transform: st.cheer && win ? 'scale(1.2)' : 'none' } }, img)
        : v === 2
          ? h('div', { style: { marginLeft: 12, marginTop: -2, width: 26, height: 26, borderRadius: 7, background: B[3], display: 'grid', placeItems: 'center', transform: st.cheer && win ? 'rotate(12deg) scale(1.15)' : 'rotate(-6deg)', transition: 'transform .25s', boxShadow: '2px 2px 0 #121210' } }, img)
          : h('div', { style: { marginLeft: 14, marginTop: -4, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFFDF8', border: '1.5px solid ' + B[3], borderRadius: 999, padding: st.swarm ? '3px 10px 3px 4px' : '3px', fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700, color: '#121210', whiteSpace: 'nowrap', boxShadow: '2px 2px 0 ' + B[3], transform: st.cheer && win ? 'scale(1.14) rotate(' + (i % 2 ? 5 : -5) + 'deg)' : 'none', transition: 'transform .25s' } }, img, st.swarm ? B[0] : null);
      const bpos = v === 1 ? { position: 'absolute', left: 30, bottom: '100%', marginBottom: 2 } : v === 2 ? { position: 'absolute', right: '100%', top: 2, marginRight: 4 } : { position: 'absolute', left: 18, top: 30 };
      const GM = ['Hold the line!', 'Don’t let go!', 'Not into the AGI!', 'Event horizon. Careful.'], gm = st.grav && !st.swarm && i % 3 === 0 ? GM[(i / 3) % GM.length] : null;
      const bubble = (st.swarm && st.bmsgs[i]) || gm ? h('div', { style: Object.assign({ width: 'max-content', background: v === 2 ? '#121210' : B[3], color: '#FFFFFF', borderRadius: v === 1 ? 999 : 8, padding: '4px 10px', fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', border: v === 2 ? '1.5px solid ' + B[3] : 'none' }, bpos) }, (v === 1 ? '' : '') + (gm || (st.cheer && win ? cheers[i % 3] : st.bmsgs[i]))) : null;
      return h('div', { key: B[0], style: { position: 'absolute', left: 0, top: 0, opacity: st.swarm ? 1 : 0.72, transform: 'translate(' + p.x + 'px,' + p.y + 'px)', transition: 'transform ' + (st.swarm ? '0.7s' : b.fled ? '0.45s' : st.grav ? '1.05s' : '2.6s') + ' cubic-bezier(.65,0,.35,1) ' + (st.swarm ? (i * 0.035) + 's' : '0s') } },
        h('svg', { width: 20, height: 20, viewBox: '0 0 22 22', style: { display: 'block' } }, h('path', { d: 'M2 2 L19 9.5 L11 11.5 L8 19.5 Z', fill: B[3], stroke: '#121210', strokeWidth: 1.5, strokeLinejoin: 'round' })), badge, bubble);
    })) : null;
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const invertCursor = coarse ? null : h('div', { ref: this.curRef, 'aria-hidden': 'true', style: { position: 'fixed', left: 0, top: 0, width: 22, height: 22, borderRadius: '50%', background: '#ECE8DF', mixBlendMode: 'difference', pointerEvents: 'none', zIndex: 60, opacity: 0, transition: 'width .25s, height .25s, opacity .3s', willChange: 'transform' } });
    const BOTS = [['Claude', 'claude', 'claude.ai'], ['Gemini', 'googlegemini', 'gemini.google.com'], ['Grok', null, 'grok.com'], ['OpenAI', null, 'openai.com'], ['Meta AI', 'meta', 'meta.ai']];
    const humanBots = h('div', { style: { position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, pointerEvents: 'none', zIndex: 2 } }, h('div', { style: { position: 'absolute', left: 0, top: 0, animation: 'abSpin 18s linear infinite' } },
      BOTS.map((b, i) => { const a = i / BOTS.length * 360, l = this.L(b[0], b[1], b[2]); return h('div', { key: b[0], style: { position: 'absolute', left: 0, top: 0, transform: 'rotate(' + a + 'deg) translate(15.8cqw) rotate(' + (-a) + 'deg)' } },
        h('div', { style: { position: 'absolute', left: '-1.6cqw', top: '-1.6cqw', width: '3.2cqw', height: '3.2cqw', borderRadius: '50%', background: '#FFFDF8', border: '1.5px solid #121210', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 3px rgba(255,79,18,.2)', animation: 'abSpinR 18s linear infinite' } }, h('img', { src: l.src, 'data-fb': l.fb, alt: b[0], style: { width: '60%', height: '60%', objectFit: 'contain' } }))); })));
    if (!this.STARSH) { let sd = 11; const r = () => { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }; this.STARSH = Array.from({ length: 110 }, () => Math.round(r() * 1600) + 'px ' + Math.round(r() * 900) + 'px 0 ' + (r() < 0.2 ? 1 : 0) + 'px rgba(236,232,223,' + (0.25 + r() * 0.6).toFixed(2) + ')').join(','); }
    const horizon = h(React.Fragment, null,
      h(BlackHole),
      h('div', { 'aria-hidden': 'true', style: { position: 'absolute', left: 0, top: 0, width: 1.5, height: 1.5, borderRadius: '50%', boxShadow: this.STARSH, animation: 'abGlow 6s ease-in-out infinite', pointerEvents: 'none' } }),
    );
    const nowViz = this.journeyViz('now'), salesViz = this.journeyViz('sales');
    const askAixcel = this.askLinks('What does AiXCEL Solutions (aixcelsolutions.com) do, who founded it, and which clients has it worked with?');
    const askAhmad = this.askLinks('Who is Ahmad Bukhari (ahmadbukhari.com), the agentic AI and LLM systems specialist from Islamabad? What has he built and who has he worked with?');
    const advisoryViz = this.journeyViz('advisory'), yardimViz = this.journeyViz('yardim');
    const cam = st.cam, camTf = 'translate(' + cam.x + 'px,' + cam.y + 'px) scale(' + cam.z + ')';
    const ik = st.inspect, INode = ik ? this.NODES.concat(this.extraNodes()).find(nd => nd.k === ik) : null, SS = ['waiting', 'running', 'success', 'failed', 'retrying', 'skipped'], SK = ['idle', 'run', 'ok', 'err', 'wait', 'skip'];
    const IT = INode ? (INode.tool || S[INode.t]) : null, ALTL = INode ? this.ALT[INode.t] : null, curI = ALTL && IT ? ALTL.findIndex(v => v[0] === IT.name) : -1, nextT = ALTL ? ALTL[(curI + 1) % ALTL.length] : null;
    const insp = ik ? { label: INode ? INode.label + ' · ' + IT.name : 'Human in the loop', status: SS[SK.indexOf(st.nodes[ik] || 'idle')], title: INode ? INode.title : 'Ahmad reviews with context', desc: (this.INSPECT[ik] || [INode ? INode.desc : ''])[0], json: (this.INSPECT[ik] || ['', '{\n  "added_by": "you",\n  "runs_after": "evidence"\n}'])[1], canSwap: !!(ALTL && ALTL.length > 1), next: nextT ? '→ ' + nextT[0] : '' } : { label: '', status: '', title: '', desc: '', json: '', canSwap: false, next: '' };
    const swapTool = () => { if (!ALTL || !INode) return; const t = INode.t; this.setState(s => ({ swap: Object.assign({}, s.swap, { [t]: (curI + 1) % ALTL.length }) })); this.pushLog('Swapped ' + INode.label + ' to ' + nextT[0], 'ok'); };
    const orbits = this.netPanel();
    const OXT = [['Projects', 'Projects', 'Keep the right people in the same context.'], ['Memory', 'Company memory', 'The next task should start informed.'], ['Slack rooms', 'Real workflow', 'Ask. Review. Receive the work.'], ['Files', 'Useful outputs', 'Give the work a home.'], ['Connections', 'Integrations', 'Keep the tools. Connect the work.']];
    const oxTabs = OXT.map((t, i) => ({ label: t[0], go: () => { this.oxHold = Date.now() + 12000; this.setState({ ox: i }); }, bg: st.ox === i ? '#2C2B27' : 'transparent', fg: st.ox === i ? '#FFFDF8' : '#8C877C', dot: st.ox === i ? '#FF5A1F' : '#3D3B36' }));
    const ox = { kicker: OXT[st.ox][1], title: OXT[st.ox][2] }, oxViz = this.oxViz(st.ox), oxBar = h('div', { key: 'oxb' + st.ox, style: { height: 2, background: '#FF5A1F', animation: 'abGrow 3.6s linear forwards' } });
    const bgCanvas = h('canvas', { ref: this.bgRef, 'aria-hidden': 'true', style: { position: 'fixed', left: 0, top: 0, zIndex: -1, pointerEvents: 'none' } });
    const hv = this.props.headline ?? 'Work breaks';
    const ease = 1 - Math.pow(1 - st.cp, 3);
    const cases = this.CASES.map((c, ci) => Object.assign({}, c, this.caseNet(c, ci), { viz: this.caseViz(ci), logoH: c.name === 'ChiroCandy' ? '22px' : '34px', tools: c.tools.map(lg), stats: c.stats.map(s => ({ v: Math.round(s[0] * ease) + s[1], label: s[2] })) }));
    const clients = this.CLIENTS.map((c, i) => { const on = st.hc === i; return { name: c[0], logo: (/^(https?:|data:)/.test(c[1]) ? c[1] : 'https://aixcelsolutions.com/assets/clients/' + c[1]), href: c[2], line: on ? c[4] : c[3], lineColor: on ? '#121210' : '#5E5B54', bg: on ? '#FFFDF8' : 'transparent', bar: on ? 'inset 0 4px 0 #FF4F12' : 'none', on: () => this.state.hc !== i && this.setState({ hc: i }) }; });
    const src = this.REPOS.map((r, i) => ({ viz: this.repoViz(i), kind: r.kind, name: r.name, desc: r.desc, href: 'https://github.com/syedahmad0786/' + r.slug, logos: r.logos.map(lg), badge: 'Public source', badgeColor: '#13804A', cta: 'Source', type: 'source' }));
    const pro = this.PROTOS.map(p => ({ kind: 'PROTOTYPE', name: p.name, desc: p.desc, href: p.href, logos: p.mode === 'demo' ? [lg('vercel')] : p.mode === 'gh' ? [lg('github')] : [], badge: p.mode === 'demo' ? 'Live demo' : p.mode === 'gh' ? 'Source on GitHub' : 'Demo on request', badgeColor: p.mode === 'demo' ? '#C2410C' : '#5E5B54', cta: p.mode === 'demo' ? 'Open demo' : p.mode === 'gh' ? 'Source' : 'Ask', type: 'proto' }));
    const all = src.concat(pro);
    const labItems = src;
    const labFilters = [['all', 'All · ' + all.length], ['source', 'Public source · ' + src.length], ['proto', 'Prototypes · ' + pro.length]].map(([k, label]) => ({ label, go: () => this.setState({ labF: k }), bg: st.labF === k ? '#121210' : 'transparent', fg: st.labF === k ? '#ECE8DF' : '#121210' }));
    return {
      rootRef: this.rootRef, clock: st.clock, liveDot, run: st.run,
      stackLabel: [S.trig.name, S.llm.name, S.crm.name].join(' · '),
      scenarios, breakIt: () => this.startRun(Math.random() < 0.5 ? 'timeout' : 'judgment', (st.stack + 1) % this.STACKS.length),
      nodes, human, wiresSvg, onLogoErr: this.onLogoErr,
      log: st.log.map(l => ({ t: l.t, msg: l.msg, color: TC[l.tone] })),
      principles, clearHl: () => this.setState({ hl: null }),
      marquee, pauseMarq: () => this.setState({ marqPaused: true }), playMarq: () => this.setState({ marqPaused: false }),
      wordBand, systems, cur, repos, casesRef: this.casesRef, cases, clients, clearHc: () => this.setState({ hc: -1 }), labItems, labFilters, agentic, curA, checks, ckState, agStack, pauseA: () => { this.aPaused = true; },
      liveOn: st.liveA, liveOff: !st.liveA, showLive: () => { this.aPaused = true; this.setState({ liveA: true }); }, showSnap: () => this.setState({ liveA: false }),
      liveBg: st.liveA ? '#FF5A1F' : 'transparent', liveFg: st.liveA ? '#121210' : '#ECE8DF', snapBg: st.liveA ? 'transparent' : '#ECE8DF', snapFg: st.liveA ? '#ECE8DF' : '#121210',
      channels, curCh, pauseCh: () => { this.chPaused = true; }, playCh: () => { this.chPaused = false; }, hasGh: st.gh.length > 0, gh, buddy, ready: true, bgCanvas, orbits, oxTabs, ox, oxViz, oxBar, insp, hasInspect: !!ik, closeInspect: () => this.setState({ inspect: null }), inspectHuman: () => this.setState({ inspect: 'n6' }),
      panDown: this.panDown, panCursor: st.panning ? 'grabbing' : 'grab', camTf, camTr: st.panning ? 'none' : 'transform .35s cubic-bezier(.2,.8,.2,1)', gridPos: cam.x + 'px ' + cam.y + 'px',
      zoomIn: () => this.zoomBy(0.15), zoomOut: () => this.zoomBy(-0.15), zoomReset: () => this.setState({ cam: { x: 0, y: 0, z: 1 } }), zoomPct: Math.round(cam.z * 100) + '%', wideHdr: vwN >= 1180, askAixcel, askAhmad, themeIcon: st.theme === 'dark' ? '☀' : '☾', toggleTheme: () => { const th = st.theme === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', th); try { localStorage.setItem('ab-theme', th); } catch (e) {} this.setState({ theme: th }); },
      advisoryViz, yardimViz, nowViz, salesViz, humanBots, invertCursor, horizon, swapTool,
      addNode: () => { const n = this.state.extras.length; if (n >= this.ADDABLE.length) return; this.setState(s => ({ extras: s.extras.concat([n]) })); this.pushLog('Node added · ' + this.ADDABLE[n][1] + ' · ' + this.ADDABLE[n][0], 'ok'); },
      shuffleLayout: () => this.setState(s => ({ layout: (Math.max(0, s.layout) + 1) % 3, pos: {} })),
      hA: hv === 'Work breaks', hB: hv === 'Messy operations', hC: hv === 'Can it operate?'
    };
  }
}
