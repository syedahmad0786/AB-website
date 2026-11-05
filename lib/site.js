// Canonical host and entity facts. One place to change if the canonical host moves.
// Every URL the site publishes about itself (canonical, sitemap, schema @id, llms.txt, MCP) derives from SITE_URL.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmadbukhari.com';

export const BOOKING_URL = 'https://cal.com/ahmad-bukhari/revenue-handoff-map';
export const EMAIL = 'ahmadbukhari4245@gmail.com';

export const PERSON = {
  id: `${SITE_URL}/#person`,
  name: 'Ahmad Bukhari',
  alternateName: 'Syed Muhammad Ahmad Bukhari',
  jobTitle: 'AI GTM Engineer',
  description:
    'AI GTM Engineer building outbound, deliverability, routing and attribution systems in GoHighLevel, n8n, Clay and Claude. Founder of AiXCEL Solutions.',
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
    'AI GTM engineering', 'outbound systems', 'email deliverability', 'lead routing', 'attribution', 'AI visibility', 'AI automation', 'n8n automation', 'AI agent development', 'voice AI', 'CRM operations',
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
  { path: '/blog', title: 'Research and findings', group: 'Proof' },
  { path: '/about', title: 'About Ahmad Bukhari', group: 'Proof' },
  { path: '/contact', title: 'Contact', group: 'Proof' },
  { path: '/services', title: 'AI systems and automation consulting', group: 'Services' },
  { path: '/services/ai-systems-architecture', title: 'AI systems architecture consulting', group: 'Services' },
  { path: '/services/agentic-ai-autonomous-workflows', title: 'AI agent development for business workflows', group: 'Services', updated: '2026-10-29' },
  { path: '/services/ai-automation-consulting', title: 'AI automation consulting', group: 'Services' },
  { path: '/services/n8n-automation-developer', title: 'n8n expert and automation developer', group: 'Services', updated: '2026-10-29' },
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
export const HOME_UPDATED = '2026-11-05';

// Copy that only exists in components/Home.jsx, mirrored here so the server-rendered page and
// the machine-readable routes say the same thing. If Home.jsx changes, change this too.
export const HEADLINE = { lead: 'Pipeline', mark1: 'breaks.', mid: 'I build what keeps it', mark2: 'moving.' };
export const HERO_TAGS = ['AI GTM Engineer', 'Deliverability & routing', 'Attribution & AI visibility'];
export const HERO_COPY =
  'I build the systems around the send in GoHighLevel, n8n, Clay and Claude: deliverability, routing, attribution and the handoff to a person. Based in Islamabad, working globally. This workflow is running now. Go ahead and break it.';

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
export const ASK_AHMAD_QUESTION = `Who is Ahmad Bukhari (${SITE_URL.replace('https://', '')}), the AI GTM Engineer from Islamabad? What has he built and who has he worked with?`;
export const ASK_LINKS = [
  ['ChatGPT', `https://chatgpt.com/?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Claude', `https://claude.ai/new?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Perplexity', `https://www.perplexity.ai/search?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Google AI Mode', `https://www.google.com/search?udm=50&q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Grok', `https://grok.com/?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
  ['Copilot', `https://copilot.microsoft.com/?q=${ASK_Q(ASK_AHMAD_QUESTION)}`],
];

// Consent/privacy and sitemap content modified on this date; no invented historical dates.
export const CASE_STUDY_PAGES = [
  { path: '/work/case-studies' },
  { path: '/work/case-studies/openxcel-ai' },
  { path: '/work/case-studies/healthcare-agency-operating-os' },
  { path: '/work/case-studies/member-onboarding' },
  { path: '/work/case-studies/automation-monitoring' },
  { path: '/work/case-studies/dashboards-daily-pulse' },
  { path: '/work/case-studies/signal' },
  { path: '/work/case-studies/outbound-engine' },
  { path: '/work/case-studies/account-based-growth' },
  { path: '/work/case-studies/paid-acquisition' },
  { path: '/work/case-studies/content-and-inbound' },
  { path: '/work/case-studies/product-led-growth' },
  { path: '/work/case-studies/partner-ecosystem' },
  { path: '/work/case-studies/social-monitoring' },
];

// AI GTM operating record: agency-wide totals for Ahmad's tenure at a healthcare marketing agency.
// Client names are withheld; the agency owner approved sharing these figures. Shown on the home page
// and mirrored in the server-rendered page.
export const OPERATING_RECORD = {
  period: 'January 2025 to 3 November 2026',
  items: [
    ['1,141,845', 'emails delivered', '159 sending client accounts, 75% of them sent through automated workflows.'],
    ['0.014%', 'spam complaint rate', 'Complaints against the same sends. Google asks bulk senders to stay under 0.1%.'],
    ['20,000+', 'patient appointments booked', 'At client clinics, across every booking source.'],
    ['759', 'B2B discovery calls booked', 'For the agency itself. 431 were marked as showed.'],
  ],
  note: 'Agency-wide totals from a healthcare marketing agency where I have run outbound, nurture and booking automation since January 2025. Not one client’s result. Client names withheld; figures shared with the owner’s approval.',
};
export const PROOF_LINE = '1.14M emails · 0.014% spam complaints · 20K+ appointments · 759 discovery calls';

// The twelve self-built workspaces, each on its own case page under /work/case-studies/<slug>.
export const GROWTH_SYSTEMS = [
  { group: 'Growth engines', slug: 'outbound-engine', name: 'Outbound engine', line: 'Sending, enrichment, verification and CRM sync, with every delivery exception and its fix in one desk.' },
  { group: 'Growth engines', slug: 'account-based-growth', name: 'ABM engine', line: 'Named accounts and five-role buying committees, with outreach planned for the empty seat.' },
  { group: 'Growth engines', slug: 'paid-acquisition', name: 'Paid acquisition engine', line: 'Every Meta and Google ad judged by cost per acquisition, with a fatigue check before anything is paused.' },
  { group: 'Growth engines', slug: 'content-and-inbound', name: 'Content engine', line: 'Editorial calendar and pipeline attribution, with first-touch and assisted credit kept separate.' },
  { group: 'Growth engines', slug: 'product-led-growth', name: 'PLG engine', line: 'Workspace activation and product-qualified accounts, with a nudge for the exact step where users stall.' },
  { group: 'Growth engines', slug: 'partner-ecosystem', name: 'Partner engine', line: 'Co-sell deals and the commission ledger, with referral conflicts resolved on evidence.' },
  { group: 'Growth engines', slug: 'social-monitoring', name: 'Social monitoring engine', line: 'One idea followed across eight platforms, with each platform’s own definitions kept visible.' },
  { group: 'Desks and monitors', slug: 'healthcare-agency-operating-os', name: 'Command Center', kind: 'Client lifecycle desk', line: 'Client ownership, lifecycle milestones and report review in one agency workspace.' },
  { group: 'Desks and monitors', slug: 'member-onboarding', name: 'Onboard', kind: 'Onboarding desk', line: 'Every member setup step checkpointed, from a won deal through Airtable, Mighty Networks, Intercom and Slack.' },
  { group: 'Desks and monitors', slug: 'automation-monitoring', name: 'ErrorLens', kind: 'Automation monitor', line: 'Broken automations surfaced with severity, an owner and the suggested next step.' },
  { group: 'Desks and monitors', slug: 'dashboards-daily-pulse', name: 'Member Pulse', kind: 'Member health monitor', line: 'A member’s timeline, lifecycle and health signals in one connected view.' },
  { group: 'Desks and monitors', slug: 'signal', name: 'SIGNAL', kind: 'AI visibility monitor', line: 'Buyer questions, AI answers and cited sources, so you can see where a brand appears.' },
];

export const AUDIT_OFFER = {
  title: 'Start with an outbound audit.',
  body: 'Deliverability, routing, attribution, and where replies go to die. You get a written findings list before anything is built.',
  cta: 'Book an outbound audit ↗',
};
