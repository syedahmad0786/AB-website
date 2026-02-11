import { SITE_CONFIG } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AiXCEL Solutions",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/favicon.svg`,
    description: SITE_CONFIG.description,
    founder: {
      "@type": "Person",
      name: "Syed Muhammad Ahmad Bukhari",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.links.email,
      telephone: SITE_CONFIG.links.phone,
      contactType: "sales",
      availableLanguage: ["English"],
    },
    sameAs: [SITE_CONFIG.links.linkedin],
    areaServed: "Worldwide",
    serviceType: [
      "AI Automation",
      "Voice AI Development",
      "Agentic AI Systems",
      "Enterprise Automation",
      "CRM Automation",
      "AI Consulting",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonJsonLd() {
  const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Syed Muhammad Ahmad Bukhari",
  url: SITE_CONFIG.url,
  jobTitle: "AI Automation Architect & Consultant",
  worksFor: [
  {
  "@type": "Organization",
  name: "AiXCEL Solutions",
  },
  ],
  knowsAbout: [
  "Agentic AI",
  "Voice AI",
  "Enterprise Automation",
  "n8n Workflow Automation",
  "GoHighLevel",
  "Conversational AI",
  "Business Process Automation",
  "AI Consulting",
  ],
  sameAs: [SITE_CONFIG.links.linkedin],
  };

  return (
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
  );
}

export function FAQJsonLd() {
  const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
  {
  "@type": "Question",
  name: "How much does custom AI automation cost?",
  acceptedAnswer: {
  "@type": "Answer",
  text: "Engagements typically range from $5K for targeted workflow automations to $50K+ for full enterprise agentic AI deployments. Every project is scoped against projected ROI - if the system won't pay for itself within 90 days, we'll tell you upfront.",
  },
  },
  {
  "@type": "Question",
  name: "What is Agentic AI and how is it different from standard automation?",
  acceptedAnswer: {
  "@type": "Answer",
  text: "Standard automation follows fixed rules: if X then Y. Agentic AI systems plan, reason, and adapt. They handle ambiguous inputs, make multi-step decisions, and self-correct when something breaks - like having a senior employee that never sleeps.",
  },
  },
  {
  "@type": "Question",
  name: "What are the benefits of Voice AI for real estate?",
  acceptedAnswer: {
  "@type": "Answer",
  text: "Voice AI handles inbound calls 24/7, qualifies leads in real-time, books appointments automatically, and follows up on missed calls with sub-500ms latency. Real estate firms typically see a 3x increase in qualified appointments and a 67% reduction in missed calls.",
  },
  },
  {
  "@type": "Question",
  name: "How long does AI automation implementation take?",
  acceptedAnswer: {
  "@type": "Answer",
  text: "Most production systems are deployed within 2-4 weeks. We start with a focused audit, build in sprints, and ship iteratively so you see value within the first week.",
  },
  },
  {
  "@type": "Question",
  name: "Do you offer ongoing AI automation support?",
  acceptedAnswer: {
  "@type": "Answer",
  text: "Yes. We offer maintenance retainers that include monitoring, optimization, and scaling. The goal is always to build systems your team can eventually maintain independently.",
  },
  },
  ],
  };

  return (
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
  );
}

export function WebsiteJsonLd() {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  author: {
  "@type": "Person",
  name: "Syed Muhammad Ahmad Bukhari",
  },
  };

  return (
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
  );
}

export function ServiceJsonLd() {
  const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aixcel Solutions - AI Automation Services",
  url: `${SITE_CONFIG.url}/services`,
  provider: {
  "@type": "Person",
  name: "Syed Muhammad Ahmad Bukhari",
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
  "@type": "OfferCatalog",
  name: "AI Automation Services",
  itemListElement: [
  {
  "@type": "Offer",
  itemOffered: {
  "@type": "Service",
  name: "Agentic AI & Autonomous Workflows",
  description:
  "Multi-agent systems that plan, execute, and self-correct across complex business processes.",
  },
  },
  {
  "@type": "Offer",
  itemOffered: {
  "@type": "Service",
  name: "Voice AI & Conversational Intelligence",
  description:
  "Human-like voice agents for inbound support and outbound qualification with sub-500ms latency.",
  },
  },
  {
  "@type": "Offer",
  itemOffered: {
  "@type": "Service",
  name: "Content Generation & Automation Pipelines",
  description:
  "End-to-end media engines that transform single inputs into multi-platform assets.",
  },
  },
  {
  "@type": "Offer",
  itemOffered: {
  "@type": "Service",
  name: "Enterprise Automation & Integration",
  description:
  "Connecting siloed systems via n8n/Make for seamless data flow.",
  },
  },
  {
  "@type": "Offer",
  itemOffered: {
  "@type": "Service",
  name: "AI Consulting & Incubation",
  description:
  "Strategic AI implementation, workforce training, and fractional Chief AI Officer services.",
  },
  },
  ],
  },
  };

  return (
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
  );
}
