export const SITE_CONFIG = {
  name: "Syed Muhammad Ahmad Bukhari",
  title: "Ahmad Bukhari — Agentic AI & Enterprise Automation Architect",
  description:
    "Building autonomous AI systems that eliminate manual work. Founder of AiXCEL Solutions & Fynora.ai. Specializing in Agentic AI, Voice AI, and high-ROI enterprise automation.",
  url: "https://ahmadbukhari.com",
  ogImage: "/images/og-default.webp",
  links: {
    linkedin: "https://www.linkedin.com/in/bukhariahmad",
    github: "https://github.com/bukhariahmad",
    email: "ahmadbukhari4245@gmail.com",
    phone: "+923005174444",
    calendly: "https://calendly.com/ahmadbukhari4245",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    id: "agentic-ai",
    title: "Agentic AI & Autonomous Workflows",
    tagline: "Systems that think, act, and iterate — without you.",
    description:
      "Multi-agent architectures that plan, execute, and self-correct across complex business processes. Built on OpenAI, Claude, and Gemini with orchestration through n8n and Make. No human babysitting required.",
    useCase: {
      name: "The Self-Healing CRM",
      detail:
        "Autonomous agents that continuously audit data quality, enrich stale leads with real-time signals, and flag inconsistencies before they cost you pipeline. One client reduced CRM errors by 94% in 30 days.",
    },
    outcomes: [
      "94% reduction in data errors",
      "12+ hours saved per employee per week",
      "Zero manual data cleanup",
    ],
    icon: "brain",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "voice-ai",
    title: "Voice AI & Conversational Intelligence",
    tagline: "Human-like voice agents. Inhuman consistency.",
    description:
      "Deploy voice agents via Vapi, Synthflow, and Voiceflow that handle inbound support, outbound qualification, and appointment booking with sub-500ms latency. Indistinguishable from your best rep — available 24/7.",
    useCase: {
      name: "24/7 Concierge",
      detail:
        "An AI receptionist that handles booking, triage, and Q&A with <500ms response latency. Deployed for a real estate firm: 3x qualified appointments, 67% reduction in missed calls.",
    },
    outcomes: [
      "3x qualified appointments",
      "67% fewer missed calls",
      "<500ms response latency",
    ],
    icon: "waveform",
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    id: "content-automation",
    title: "Content Generation & Automation Pipelines",
    tagline: "One input. Infinite output.",
    description:
      "End-to-end media engines powered by 11 Labs, HeyGen, and Synthesia. Transform a single video into blogs, tweets, LinkedIn articles, and short-form clips — automatically orchestrated through n8n pipelines.",
    useCase: {
      name: "The Omni-Channel Engine",
      detail:
        "Input 1 video \u2192 Output 5 blogs, 10 tweets, 3 LinkedIn articles, and 5 short-form clips. Fully automated. One marketing team went from 4 posts/week to 40 without adding headcount.",
    },
    outcomes: [
      "10x content output",
      "Zero additional headcount",
      "Consistent brand voice at scale",
    ],
    icon: "layers",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "enterprise-automation",
    title: "Enterprise Automation & Integration",
    tagline: "Your stack, finally talking to itself.",
    description:
      "Connect siloed systems \u2014 Airtable, GoHighLevel, Slack, Salesforce, HubSpot, Zoho \u2014 via n8n, Make, and Zapier for seamless, zero-touch data flow across your entire operation. 200+ workflows deployed and counting.",
    useCase: {
      name: "Zero-Touch Onboarding",
      detail:
        "Contract signed \u2192 Invoice sent \u2192 Slack channel created \u2192 Project board built \u2192 Welcome email dispatched. All in under 90 seconds. Eliminated 6 hours of admin per new client.",
    },
    outcomes: [
      "6 hours saved per onboarding",
      "Sub-90-second execution",
      "Zero manual handoffs",
    ],
    icon: "circuit",
    gradient: "from-blue-600 to-purple-500",
  },
  {
    id: "ai-consulting",
    title: "AI Consulting & Incubation",
    tagline: "Build the muscle, not just the machine.",
    description:
      "Through Fynora.ai, we deliver strategic AI implementation, workforce training, and internal tool development. From fractional Chief AI Officer services to hands-on team enablement \u2014 your team learns to build, not just use.",
    useCase: {
      name: "Internal Brain Training",
      detail:
        "Train your team to adopt LLMs, build custom internal tools, and create their own \u2018Internal Brains\u2019 \u2014 proprietary knowledge systems that compound in value. One enterprise trained 40 employees in 6 weeks.",
    },
    outcomes: [
      "40 employees trained in 6 weeks",
      "Internal AI adoption rate: 89%",
      "Proprietary knowledge systems deployed",
    ],
    icon: "graduation",
    gradient: "from-purple-600 to-blue-600",
  },
] as const;

export const TRUSTED_BY = [
  "Conversions.ai",
  "VT Capital LTD",
  "AI Product Accelerator",
  "Hire Zim",
  "ChiroCandy Marketing",
  "Agency on Fire",
  "RepStack",
  "We Scale Creators",
] as const;

export const TECH_STACK = [
  "n8n",
  "Make.com",
  "Zapier",
  "GoHighLevel",
  "OpenAI / GPT-4",
  "Claude AI",
  "Gemini",
  "Vapi",
  "Synthflow",
  "Voiceflow",
  "11 Labs",
  "HeyGen",
  "Synthesia",
  "Airtable",
  "Salesforce",
  "HubSpot",
  "ActiveCampaign",
  "Intercom",
  "Slack",
  "ManyChat",
  "Botpress",
  "Power BI",
  "Tableau",
  "Pabbly Connect",
  "ClickFunnels",
  "Bubble.io",
  "Webflow",
] as const;
