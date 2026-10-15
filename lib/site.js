// Canonical host and entity facts. One place to change if the canonical host moves.
// Every URL the site publishes about itself (canonical, sitemap, schema @id, llms.txt, MCP) derives from SITE_URL.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmadbukhari.com';

export const BOOKING_URL = 'https://cal.com/ahmad-bukhari/revenue-handoff-map';
export const EMAIL = 'ahmadbukhari4245@gmail.com';

export const PERSON = {
  id: `${SITE_URL}/#person`,
  name: 'Ahmad Bukhari',
  alternateName: 'Syed Muhammad Ahmad Bukhari',
  jobTitle: 'Agentic AI & LLM Systems Specialist',
  description:
    'Designs agentic AI and LLM systems, resilient automation, CRM operations and product delivery for service businesses and internal teams. Founder of AiXCEL Solutions.',
  location: 'Islamabad, Pakistan',
  availability: 'Available worldwide',
  image: `${SITE_URL}/images/ahmad-bukhari.jpg`,
  sameAs: [
    'https://www.linkedin.com/in/bukhariahmad',
    'https://github.com/syedahmad0786',
    'https://n8n.io/creators/ahmadbukhari/',
    'https://x.com/ahmadbukhari',
    'https://www.youtube.com/@AhmadBukhari97',
    'https://www.instagram.com/bukharibuildsai/',
    'https://www.tiktok.com/@ahmad.bukhari0786',
    'https://www.facebook.com/profile.php?id=61593858664534',
  ],
  knowsAbout: [
    'AI systems architecture', 'agentic AI', 'LLM systems', 'AI automation', 'voice AI', 'CRM operations',
    'GoHighLevel', 'n8n', 'Make', 'workflow reliability', 'human-in-the-loop approval', 'observability', 'product delivery',
  ],
};

export const ORG = {
  id: 'https://aixcelsolutions.com/#org',
  name: 'AiXCEL Solutions',
  url: 'https://aixcelsolutions.com/',
  logo: 'https://aixcelsolutions.com/assets/aixcel-mark.svg',
  description:
    "Founder-led AI operations studio for agencies and service businesses: lead follow-up, client onboarding, reporting and automation monitoring, built inside the client's own accounts with a person approving every client-facing step.",
};

// The multi-page site that the Next.js app falls through to (see next.config.mjs rewrites).
export const PAGES = [
  { path: '/work', title: 'AI systems portfolio and case studies', group: 'Proof' },
  { path: '/agentic-systems', title: 'Agentic systems library', group: 'Proof' },
  { path: '/automation-lab', title: 'Automation reliability lab', group: 'Proof' },
  { path: '/portfolio', title: 'Portfolio archive', group: 'Proof' },
  { path: '/blog', title: 'Research and findings', group: 'Proof' },
  { path: '/about', title: 'About Ahmad Bukhari', group: 'Proof' },
  { path: '/contact', title: 'Contact', group: 'Proof' },
  { path: '/services', title: 'AI systems and automation consulting', group: 'Services' },
  { path: '/services/ai-systems-architecture', title: 'AI systems architecture consulting', group: 'Services' },
  { path: '/services/agentic-ai-autonomous-workflows', title: 'Agentic AI and autonomous workflow design', group: 'Services' },
  { path: '/services/ai-automation-consulting', title: 'AI automation consulting', group: 'Services' },
  { path: '/services/gohighlevel-crm-automation', title: 'GoHighLevel CRM automation architecture', group: 'Services' },
  { path: '/services/voice-ai-conversational-intelligence', title: 'Voice AI and conversational automation', group: 'Services' },
  { path: '/services/ai-sdr-outbound-automation', title: 'AI SDR and outbound automation', group: 'Services' },
  { path: '/services/content-generation-automation', title: 'AI content generation and repurposing automation', group: 'Services' },
  { path: '/industries/marketing-agencies', title: 'AI automation for marketing agencies', group: 'Industries' },
  { path: '/industries/online-coaches', title: 'AI automation for online coaches', group: 'Industries' },
  { path: '/work/workspine', title: 'Workspine: private AI work memory', group: 'Systems' },
  { path: '/work/manhaj', title: 'MANHAJ: a governed AI operating system', group: 'Systems' },
  { path: '/work/enterprise-os', title: 'Enterprise AI operating system architecture', group: 'Systems' },
  { path: '/work/errorlens', title: 'Self-healing AI automation and workflow reliability', group: 'Systems' },
  { path: '/work/migration-factory', title: 'Make to n8n automation migration factory', group: 'Systems' },
  { path: '/work/onboarding', title: 'Resilient client onboarding automation', group: 'Systems' },
  { path: '/blog/how-to-choose-an-ai-automation-agency', title: 'How to choose an AI automation agency', group: 'Research' },
  { path: '/blog/automation-governance-inspectable-systems', title: 'Automation governance for inspectable systems', group: 'Research' },
];

// Archived; the pages carry noindex until each claim has supporting evidence. Listed for the MCP/profile, not the sitemap.
export const PORTFOLIO_PAGES = [
  'ad-analytics-reporting', 'ai-video-production', 'billing-invoice-automation', 'chatbot-automation',
  'client-onboarding-automation', 'creative-strategy-copywriting', 'crm-appointment-setting', 'ecommerce-shopify-analytics',
  'lead-gen-email-marketing', 'market-research-competitor-analysis', 'social-media-content-automation', 'website-funnel-building',
].map((slug) => ({ path: `/portfolio/${slug}`, title: slug.replace(/-/g, ' '), group: 'Portfolio' }));

// lastmod of the fall-through pages: their build date. The home page uses HOME_UPDATED.
export const PAGES_UPDATED = '2026-08-11';
export const HOME_UPDATED = '2026-10-15';

// Copy that only exists in components/Home.jsx, mirrored here so the server-rendered page and
// the machine-readable routes say the same thing. If Home.jsx changes, change this too.
export const HEADLINE = { lead: 'Work', mark1: 'breaks.', mid: 'I design what happens', mark2: 'next.' };
export const HERO_TAGS = ['Agentic AI & LLM Systems', 'Resilient automation', 'CRM operations'];
export const HERO_COPY =
  'Agentic AI, LLM systems and resilient automation, designed around how work actually breaks. This workflow is running now. Go ahead and break it.';

export const PRINCIPLES = [
  ['01', 'Idempotency', 'Run it twice, get one result. No duplicate contacts, no double bookings.'],
  ['02', 'State gates', 'Nothing moves until the conditions for it are true.'],
  ['03', 'Recovery', 'Transient failures retry safely. Everything else is classified, never swallowed.'],
  ['04', 'Human context', 'When judgment is needed, a person gets the whole story, not just an alert.'],
];

export const JOURNEY = [
  { when: 'Now', title: 'AI systems & automation', body: 'Architecting resilient CRM, voice, agentic, migration, and delivery systems for service businesses and internal teams.' },
  { when: '2021 to 2024', title: 'Sales leadership & training', body: 'Led teams, designed operating rhythms, and trained more than one hundred candidates across real estate organizations.', stat: ['107', 'people trained across a 16-month leadership role · self-reported'] },
  { when: '2020 to now', title: 'Yardim Foundation', body: 'Directing food and ration support: a human system where reliability is measured in families reached, not dashboards shipped.', stat: ['748', 'ration packs mobilized in the COVID-response food program · self-reported'] },
  { when: '2019 to 2021', title: 'Investment advisory', body: 'Translated complex property decisions into clear client choices across residential and commercial transactions.' },
];

export const AIXCEL_SERVICES = [
  { num: '01', model: 'Subscription', name: 'Lead Operations', body: 'Every enquiry captured, scored, routed to an owner and followed up on a clock until a call is booked.', href: 'https://aixcelsolutions.com/services/lead-operations' },
  { num: '02', model: 'Sprint', name: 'Client Onboarding', body: 'From signed contract to live client without the chase. Anything that touches the client waits for approval.', href: 'https://aixcelsolutions.com/services/client-onboarding' },
  { num: '03', model: 'Subscription or Sprint', name: 'Dashboards & Daily Pulse', body: 'One agreed view of spend, leads and revenue, and a pulse in Slack each morning.', href: 'https://aixcelsolutions.com/services/dashboards' },
  { num: '04', model: 'Subscription', name: 'Monitoring & Alerts', body: 'Every automation watched by deterministic checks. Failures arrive with the cause and a fix to approve.', href: 'https://aixcelsolutions.com/services/monitoring' },
];

export const AIXCEL_PRODUCTS = [
  { name: 'OpenXCEL AI', body: 'Business-owned AI with company memory, connected tools and role-based assistants. First deployed in my own agency, instead of renting a system I couldn’t inspect.', stats: [['86%', 'lower monthly model bill'], ['25K', 'requests run in September'], ['13', 'client jobs a week in Slack, each approved by a person']], href: 'https://aixcelsolutions.com/products/openxcel-ai', cta: 'Read the case study' },
  { name: 'SIGNAL', body: 'AI search visibility audits. SIGNAL records what AI answer engines say about a business, which sources they cite, and whether the visits they send become qualified enquiries.', stats: [], href: 'https://aixcelsolutions.com/products/signal', cta: 'See the method' },
];

export const AIXCEL_MODULES = [
  ['Onboard', 'https://aixcelsolutions.com/services/client-onboarding'],
  ['ErrorLens', 'https://aixcelsolutions.com/services/monitoring'],
  ['Pulse', 'https://aixcelsolutions.com/services/dashboards'],
  ['AI Model Router', 'https://router.aixcelsolutions.com'],
];

export const NOTES = [
  { label: 'Practitioner guide · August 11, 2026 · 9 min', title: 'Automation governance for inspectable systems', body: 'Connect CRM state, AI decisions, delivery gates, workflow migration, and error recovery through explicit owners and evidence.', href: `${SITE_URL}/blog/automation-governance-inspectable-systems` },
  { label: 'Buyer guide · July 22, 2026 · 7 min', title: 'How to choose an AI automation agency', body: 'Evaluate diagnosis, controls, evidence, ownership, recovery, and handover, not demo count.', href: `${SITE_URL}/blog/how-to-choose-an-ai-automation-agency` },
];

const ASK_Q = (q) => encodeURIComponent(q);
export const ASK_AHMAD_QUESTION = `Who is Ahmad Bukhari (${SITE_URL.replace('https://', '')}), the agentic AI and LLM systems specialist from Islamabad? What has he built and who has he worked with?`;
export const ASK_LINKS = [
  ['ChatGPT', `https://chatgpt.com/?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Claude', `https://claude.ai/new?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Perplexity', `https://www.perplexity.ai/search?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Google AI Mode', `https://www.google.com/search?udm=50&q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Grok', `https://grok.com/?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Copilot', `https://copilot.microsoft.com/?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
];
