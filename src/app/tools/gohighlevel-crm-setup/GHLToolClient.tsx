"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";
import CTA from "@/components/sections/CTA";

const COMPARISON = [
  {
    feature: "Monthly Cost",
    ghl: "$97-497/mo",
    hubspot: "$800-3,600+/mo",
    salesforce: "$25-300/user/mo",
    activecampaign: "$29-259+/mo",
  },
  {
    feature: "Built-in Features",
    ghl: "CRM + Funnels + SMS + Email + Booking + Surveys",
    hubspot: "CRM + Email (rest is add-ons)",
    salesforce: "CRM (everything is add-on)",
    activecampaign: "Email + CRM (basic)",
  },
  {
    feature: "Agency / White-Label",
    ghl: "Full white-label SaaS mode",
    hubspot: "Partner program only",
    salesforce: "No",
    activecampaign: "No",
  },
  {
    feature: "Learning Curve",
    ghl: "Moderate (lots of features)",
    hubspot: "Low-Moderate",
    salesforce: "Steep",
    activecampaign: "Low",
  },
  {
    feature: "SMS & Voice Built-In",
    ghl: "Yes (Twilio-powered)",
    hubspot: "No (add-on)",
    salesforce: "No (add-on)",
    activecampaign: "SMS only (limited)",
  },
  {
    feature: "Funnel / Page Builder",
    ghl: "Yes (built-in)",
    hubspot: "Yes (limited on starter)",
    salesforce: "No",
    activecampaign: "Landing pages only",
  },
];

const BUILD_ITEMS = [
  {
    title: "Pipeline Automation",
    description:
      "Custom deal pipelines with stage-based automations, task triggers, and automatic status updates. Every lead moves through your funnel without manual dragging or follow-up gaps.",
  },
  {
    title: "Booking & Calendar Systems",
    description:
      "Round-robin scheduling, service-based booking, group events, and automated confirmations. Synced with Google Calendar, Outlook, and your CRM records in real time.",
  },
  {
    title: "Reputation Management",
    description:
      "Automated review request campaigns after service delivery. Google and Facebook review funnels with sentiment tracking and response workflows for negative feedback.",
  },
  {
    title: "White-Label CRM Setup",
    description:
      "Your own branded CRM platform powered by GHL. Custom domain, branding, client onboarding flows, and usage-based billing. Sell CRM access as a recurring revenue stream.",
  },
  {
    title: "Funnel & Landing Pages",
    description:
      "High-converting funnel pages built directly in GHL. Lead capture, appointment booking, sales pages, and membership areas with integrated payment processing.",
  },
  {
    title: "SMS & Email Campaigns",
    description:
      "Multi-channel drip campaigns with dynamic personalization. SMS follow-ups, email nurture sequences, voicemail drops, and ringless voicemail. All triggered by pipeline events.",
  },
];

const USE_CASES = [
  {
    label: "Marketing Agencies",
    detail:
      "White-label GHL as your own SaaS product. Manage multiple client accounts from a single dashboard. Automated reporting, campaign management, and reputation tracking for every client.",
  },
  {
    label: "Real Estate",
    detail:
      "Lead capture from Zillow, Realtor.com, and Facebook Ads flows directly into GHL pipelines. Automated drip sequences, showing confirmations, and post-closing review requests.",
  },
  {
    label: "Coaches & Consultants",
    detail:
      "Automated appointment funnels, onboarding sequences, and payment collection. Course delivery, membership access management, and client progress tracking in one platform.",
  },
  {
    label: "Local Service Businesses",
    detail:
      "Missed call text-back, review automation, booking confirmations, and seasonal re-engagement campaigns. One platform replaces your CRM, email tool, booking app, and review manager.",
  },
];

const EXPERTISE = [
  "Certified GoHighLevel implementation expert",
  "50+ GHL setups for agencies and service businesses",
  "Custom workflow automation beyond native GHL capabilities",
  "White-label SaaS specialization with billing integration",
  "n8n and Zapier integrations for extending GHL functionality",
  "Pipeline design with conversion rate optimization",
  "Twilio-powered SMS and voice configuration",
  "Membership and course platform setup within GHL",
];

const PRICING = [
  {
    tier: "Basic CRM Setup",
    price: "$5,000 - $8,000",
    description: "Core GHL configuration with pipelines, automations, and integrations",
    includes: [
      "Account setup and branding",
      "Up to 3 pipelines configured",
      "5-10 automation workflows",
      "Calendar and booking setup",
      "Email and SMS templates",
      "30 days post-launch support",
    ],
  },
  {
    tier: "Full Automation System",
    price: "$8,000 - $15,000",
    description: "Complete GHL ecosystem with advanced automations and campaigns",
    includes: [
      "Everything in Basic",
      "Unlimited pipeline stages",
      "15-25 automation workflows",
      "Reputation management setup",
      "Funnel and landing pages (up to 5)",
      "Multi-channel campaign setup",
      "60 days post-launch support",
    ],
  },
  {
    tier: "White-Label SaaS",
    price: "$10,000 - $15,000",
    description: "Your own branded CRM platform with client management infrastructure",
    includes: [
      "White-label branding and domain",
      "Client onboarding flow",
      "Usage-based billing setup",
      "Template snapshot library",
      "Sub-account architecture",
      "Admin training and documentation",
      "90 days post-launch support",
    ],
  },
  {
    tier: "Monthly Management",
    price: "$1,500 - $3,500/mo",
    description: "Ongoing GHL administration, optimization, and campaign execution",
    includes: [
      "Workflow monitoring and fixes",
      "Campaign management and A/B testing",
      "Monthly performance reporting",
      "New automation builds (scoped)",
      "Priority support via Slack",
      "Quarterly strategy sessions",
    ],
  },
];

const FAQ = [
  {
    q: "What is GoHighLevel and who is it for?",
    a: "GoHighLevel (GHL) is an all-in-one CRM, marketing, and sales platform designed for agencies and service businesses. It replaces tools like HubSpot, ActiveCampaign, Calendly, ClickFunnels, and Twilio with a single unified platform.",
  },
  {
    q: "Can GoHighLevel replace my current CRM?",
    a: "In most cases, yes. GHL includes CRM, email marketing, SMS, booking, funnels, reputation management, and more. We handle the full migration including contact imports, pipeline mapping, and automation rebuilds.",
  },
  {
    q: "What is GHL white-labeling and how does it work?",
    a: "White-labeling lets you rebrand GHL as your own software product. You get a custom domain, your logo, and your branding. You can then sell CRM access to your clients as a SaaS product with recurring monthly revenue.",
  },
  {
    q: "How long does a GoHighLevel setup take?",
    a: "Basic setups take 2-3 weeks. Full automation systems take 4-6 weeks. White-label SaaS deployments take 6-8 weeks including client onboarding flow design and template creation.",
  },
  {
    q: "Can GHL integrate with tools I already use?",
    a: "Yes. GHL has native integrations with many tools, and we extend its capabilities using n8n, Zapier, or direct API connections. Common integrations include QuickBooks, Slack, Google Sheets, Stripe, and custom databases.",
  },
  {
    q: "Do you build the funnel pages or do I need a designer?",
    a: "We build them. GHL has a built-in page builder, and we design high-converting funnels, landing pages, and forms as part of the setup. No external designer needed for standard implementations.",
  },
  {
    q: "How does GHL handle SMS and phone calls?",
    a: "GHL uses Twilio under the hood for SMS, MMS, and voice calls. We configure your A2P 10DLC registration, phone number setup, and compliance requirements as part of every engagement.",
  },
  {
    q: "Can you automate review requests through GHL?",
    a: "Yes. We build automated review request campaigns triggered by service completion, appointment follow-up, or pipeline stage changes. Includes Google and Facebook review funnels with response monitoring.",
  },
  {
    q: "What training do you provide for our team?",
    a: "Every project includes a walkthrough session and documentation. For larger deployments, we provide formal video training covering daily operations, contact management, campaign editing, and reporting.",
  },
  {
    q: "Is GoHighLevel worth the investment vs free CRMs?",
    a: "GHL replaces 10+ individual tools costing $500-2,000+ per month combined. For businesses using separate CRM, email, SMS, booking, and funnel tools, GHL typically saves 40-60% on monthly software costs while adding capabilities.",
  },
];

export default function GHLToolClient() {
  return (
    <div className="pt-32">
      <div className="section-padding">
        {/* ── Hero ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mb-20"
        >
          <SectionLabel label="GoHighLevel Expert" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            One Platform.
            <br />
            <span className="text-gradient">Infinite Possibilities.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed max-w-2xl"
          >
            GoHighLevel implementation, automation, and white-label setup for
            agencies and service businesses. Replace 10+ tools with one platform
            and turn your CRM into a revenue stream.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton href="/free-consultation" trackingLabel="ghl_hero_consult">
              Free GHL Consultation
            </MagneticButton>
            <MagneticButton href="/services" variant="secondary" trackingLabel="ghl_hero_services">
              View All Services
            </MagneticButton>
          </motion.div>
        </motion.div>

        <GlowLine />

        {/* ── What is GoHighLevel ── */}
        <section className="py-24">
          <SectionLabel label="The Platform" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-6"
          >
            What is <span className="text-gradient">GoHighLevel?</span>
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl space-y-4 text-white/50 leading-relaxed text-lg"
          >
            <p>
              GoHighLevel is an all-in-one CRM, marketing automation, and sales
              platform built for agencies and service businesses. It consolidates
              your CRM, email marketing, SMS campaigns, appointment scheduling,
              funnel builder, reputation management, and membership sites into a
              single dashboard.
            </p>
            <p>
              What makes GHL unique is its white-label capability: agencies can
              rebrand the entire platform as their own SaaS product and sell CRM
              access to clients for recurring revenue. Combined with built-in
              Twilio integration for SMS and voice, GHL replaces a stack of 10+
              separate tools at a fraction of the cost.
            </p>
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Comparison Table ── */}
        <section className="py-24">
          <SectionLabel label="Comparison" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            GHL vs <span className="text-gradient">Alternatives</span>
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-4 pr-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Feature
                  </th>
                  <th className="py-4 pr-4 text-xs font-mono uppercase tracking-[0.15em] text-accent-purple">
                    GoHighLevel
                  </th>
                  <th className="py-4 pr-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    HubSpot
                  </th>
                  <th className="py-4 pr-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Salesforce
                  </th>
                  <th className="py-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    ActiveCampaign
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04]">
                    <td className="py-4 pr-4 text-sm text-white/60 font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 pr-4 text-sm text-white/80">{row.ghl}</td>
                    <td className="py-4 pr-4 text-sm text-white/40">{row.hubspot}</td>
                    <td className="py-4 pr-4 text-sm text-white/40">{row.salesforce}</td>
                    <td className="py-4 text-sm text-white/40">{row.activecampaign}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </section>

        <GlowLine />

        {/* ── What We Build ── */}
        <section className="py-24">
          <SectionLabel label="Capabilities" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            What We <span className="text-gradient">Build</span>
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BUILD_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 group hover:border-white/[0.12] transition-all duration-300"
              >
                <span className="text-xs font-mono text-accent-purple tracking-[0.15em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl font-semibold mt-3 mb-3">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Use Cases ── */}
        <section className="py-24">
          <SectionLabel label="Industries" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            Who We <span className="text-gradient">Serve</span>
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8"
              >
                <span className="text-xs font-mono text-accent-purple tracking-[0.15em] uppercase">
                  {uc.label}
                </span>
                <p className="text-white/50 text-sm leading-relaxed mt-4">
                  {uc.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Our GHL Expertise ── */}
        <section className="py-24">
          <SectionLabel label="Track Record" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            Our GHL <span className="text-gradient">Expertise</span>
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {EXPERTISE.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-glass-light border border-white/[0.06]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-2 shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Pricing ── */}
        <section className="py-24">
          <SectionLabel label="Investment" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            GHL Setup <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/40 max-w-xl mb-12"
          >
            Scope-based pricing with transparent deliverables. Every project
            begins with a free discovery call to map your requirements.
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {PRICING.map((pkg, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 flex flex-col"
              >
                <span className="text-xs font-mono text-accent-purple tracking-[0.15em] uppercase mb-2">
                  {pkg.tier}
                </span>
                <p className="font-serif text-2xl font-bold mb-2">{pkg.price}</p>
                <p className="text-white/40 text-sm mb-6">{pkg.description}</p>
                <ul className="space-y-2 mt-auto">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="text-accent-purple mt-0.5">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <MagneticButton href="/pricing" variant="secondary" trackingLabel="ghl_pricing_full">
              View Full Pricing
            </MagneticButton>
          </motion.div>
        </section>

        <GlowLine />

        {/* ── FAQ ── */}
        <section className="py-24">
          <SectionLabel label="FAQ" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl space-y-6"
          >
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-6"
              >
                <h3 className="font-serif text-lg font-semibold mb-2">{item.q}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Navigation Links ── */}
        <section className="py-24 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-8">
              Explore More
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="px-6 py-3 rounded-full border border-white/[0.08] text-sm font-mono text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                All Services
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-full border border-white/[0.08] text-sm font-mono text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Pricing
              </Link>
              <Link
                href="/free-consultation"
                className="px-6 py-3 rounded-full border border-white/[0.08] text-sm font-mono text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        </section>
      </div>

      <GlowLine />
      <CTA />
    </div>
  );
}
