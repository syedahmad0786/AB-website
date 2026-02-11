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
    feature: "Response Latency",
    vapi: "<500ms (industry-leading)",
    synthflow: "600-900ms",
    bland: "500-800ms",
    retell: "500-700ms",
  },
  {
    feature: "API Customization",
    vapi: "Full API-first architecture",
    synthflow: "Moderate (dashboard-first)",
    bland: "Good API support",
    retell: "Good API support",
  },
  {
    feature: "Pricing Model",
    vapi: "Per-minute usage",
    synthflow: "Monthly subscription",
    bland: "Per-minute usage",
    retell: "Per-minute usage",
  },
  {
    feature: "Voice Quality",
    vapi: "Premium (11Labs, Azure, custom)",
    synthflow: "Good (built-in voices)",
    bland: "Good (built-in voices)",
    retell: "Premium (11Labs, OpenAI)",
  },
  {
    feature: "Custom Voice Cloning",
    vapi: "Yes (via 11Labs integration)",
    synthflow: "Limited",
    bland: "Yes",
    retell: "Yes",
  },
  {
    feature: "CRM Integration",
    vapi: "API-based (any CRM)",
    synthflow: "GHL native + API",
    bland: "API-based",
    retell: "API-based",
  },
  {
    feature: "Multi-Language",
    vapi: "30+ languages",
    synthflow: "20+ languages",
    bland: "English-focused",
    retell: "15+ languages",
  },
];

const BUILD_ITEMS = [
  {
    title: "Inbound Call Handling",
    description:
      "AI agents that answer every call instantly with human-like conversation. FAQ resolution, call routing, appointment scheduling, and escalation to live agents when needed. No more missed calls or hold times.",
  },
  {
    title: "Outbound Qualification",
    description:
      "AI-powered cold and warm outreach at scale. Lead qualification calls, follow-up sequences, and appointment setting. Your voice agent handles the volume while your team handles the closes.",
  },
  {
    title: "Appointment Scheduling",
    description:
      "Voice agents that check calendar availability in real time, book appointments, send confirmations, and handle rescheduling. Integrated with Google Calendar, Calendly, and GHL booking systems.",
  },
  {
    title: "IVR Replacement",
    description:
      "Replace clunky phone trees with natural conversation. Callers describe what they need in plain language, and the AI agent routes them intelligently. No more pressing 1 for sales, 2 for support.",
  },
  {
    title: "Customer Support",
    description:
      "24/7 voice support that resolves common issues, processes returns, checks order status, and provides account information. Handles 60-80% of inbound support volume without human intervention.",
  },
  {
    title: "Lead Qualification",
    description:
      "Pre-qualify leads with custom scoring criteria before they reach your sales team. Budget, timeline, decision authority, and fit assessment handled conversationally by AI.",
  },
];

const TECH_CAPABILITIES = [
  {
    title: "Custom Voice Cloning",
    description:
      "Clone your best agent's voice or create a brand-specific voice identity via 11Labs integration. Your AI agent sounds like your team, not a generic bot.",
  },
  {
    title: "Multi-Language Support",
    description:
      "Deploy voice agents in 30+ languages with native accent quality. Automatic language detection routes callers to the right language model in real time.",
  },
  {
    title: "CRM Integration",
    description:
      "Every call logged, transcribed, and synced to your CRM automatically. Contact records updated, notes appended, and follow-up tasks created without manual entry.",
  },
  {
    title: "Call Recording & Analytics",
    description:
      "Full call recording with AI-generated summaries, sentiment analysis, and keyword detection. Identify patterns, track agent performance, and surface coaching opportunities.",
  },
  {
    title: "Sentiment Analysis",
    description:
      "Real-time emotion detection during calls. Automatically escalate to human agents when frustration is detected. Post-call sentiment scoring for quality monitoring.",
  },
  {
    title: "Real-Time Transcription",
    description:
      "Live call transcription with speaker diarization. Searchable transcript archive for compliance, training, and dispute resolution purposes.",
  },
];

const USE_CASES = [
  {
    label: "Real Estate",
    detail:
      "Inbound lead qualification from property listings, automated showing scheduling, and post-showing follow-up calls. One firm increased qualified appointments by 3x while reducing missed calls by 67%.",
  },
  {
    label: "Healthcare",
    detail:
      "Patient intake calls, appointment scheduling and reminders, prescription refill requests, and after-hours triage routing. HIPAA-compliant voice agents that handle volume without wait times.",
  },
  {
    label: "Marketing Agencies",
    detail:
      "White-label voice AI for agency clients. Lead qualification for multiple campaigns, appointment booking across client calendars, and automated reporting on call performance metrics.",
  },
  {
    label: "SaaS Support",
    detail:
      "Tier-1 support resolution, account status checks, billing inquiries, and feature request logging. Reduce support ticket volume by 40-60% while improving response time to zero wait.",
  },
];

const EXPERTISE = [
  "Early VAPI adopter with production deployments since platform launch",
  "Custom voice agent architectures handling thousands of monthly calls",
  "Deep integration with n8n for complex post-call workflow automation",
  "GoHighLevel + VAPI pipelines for seamless CRM-to-call automation",
  "11Labs voice cloning integration for brand-specific voice identities",
  "Multi-provider fallback systems for 99.9% uptime reliability",
  "Real-time call analytics dashboards and performance monitoring",
  "Compliance-ready deployments for healthcare and financial services",
];

const PRICING = [
  {
    tier: "Basic Voice Agent",
    price: "$8,000 - $10,000",
    description: "Single-purpose voice agent with CRM integration and basic call flows",
    includes: [
      "Agent persona and voice setup",
      "Call flow design (1 use case)",
      "CRM integration (1 platform)",
      "Call recording and transcription",
      "Testing and prompt optimization",
      "30 days post-launch support",
    ],
  },
  {
    tier: "Advanced Voice System",
    price: "$10,000 - $15,000",
    description: "Multi-purpose agents with advanced routing, analytics, and integrations",
    includes: [
      "Everything in Basic",
      "Multiple call flows (up to 5)",
      "Custom voice cloning",
      "Sentiment analysis and escalation",
      "Multi-CRM integration",
      "n8n post-call workflow automation",
      "Analytics dashboard setup",
      "60 days post-launch support",
    ],
  },
  {
    tier: "Enterprise Custom",
    price: "Custom Pricing",
    description: "Organization-wide voice AI with custom models, compliance, and training",
    includes: [
      "Everything in Advanced",
      "Unlimited call flows and agents",
      "Multi-language deployment",
      "HIPAA/SOC 2 compliance config",
      "Custom analytics and reporting",
      "Team training (up to 10 users)",
      "Dedicated Slack channel support",
      "90 days post-launch support",
    ],
  },
  {
    tier: "Monthly Management",
    price: "$1,500 - $4,000/mo",
    description: "Ongoing optimization, monitoring, and prompt engineering for voice agents",
    includes: [
      "24/7 agent monitoring and alerting",
      "Weekly prompt optimization",
      "Call quality auditing",
      "Monthly performance reporting",
      "New call flow builds (scoped)",
      "Priority support via Slack",
    ],
  },
];

const FAQ = [
  {
    q: "What is VAPI and how does it work?",
    a: "VAPI is a voice AI platform that enables developers to build human-like phone agents. It provides an API-first framework for creating voice agents that can make and receive phone calls, understand natural language, and perform actions like booking appointments or qualifying leads.",
  },
  {
    q: "How realistic do VAPI voice agents sound?",
    a: "With premium voice providers like 11Labs and custom voice cloning, VAPI agents are nearly indistinguishable from human agents. Sub-500ms latency ensures natural conversation flow without awkward pauses.",
  },
  {
    q: "Can the voice agent handle complex conversations?",
    a: "Yes. VAPI agents are powered by large language models (GPT-4, Claude) that handle branching conversations, follow-up questions, objection handling, and context retention across long calls. They are not simple IVR scripts.",
  },
  {
    q: "What happens if the AI cannot handle a call?",
    a: "We build escalation logic into every agent. When the AI detects it cannot resolve an issue, or when sentiment analysis flags frustration, it warm-transfers to a human agent with full context and transcript.",
  },
  {
    q: "How does VAPI integrate with my existing CRM?",
    a: "Through direct API integration or n8n workflow automation. Every call is logged with recording, transcript, sentiment score, and extracted data points. Contact records are updated automatically in your CRM.",
  },
  {
    q: "What is the cost per call with VAPI?",
    a: "VAPI charges per minute of conversation (typically $0.05-0.15/min depending on voice provider). For most businesses, this works out to $0.50-2.00 per call, which is a fraction of human agent costs.",
  },
  {
    q: "Can I use my own phone numbers?",
    a: "Yes. VAPI supports bring-your-own-number via Twilio, Vonage, or other SIP providers. We handle the setup, porting, and configuration as part of the deployment.",
  },
  {
    q: "Is VAPI suitable for regulated industries like healthcare?",
    a: "Yes, with proper configuration. We deploy HIPAA-compliant voice agents with encrypted call recording, access controls, and audit logging. BAA agreements are handled through VAPI and associated providers.",
  },
  {
    q: "How long does it take to deploy a voice agent?",
    a: "A basic agent takes 2-3 weeks from kickoff to production. Advanced systems with multiple call flows and integrations take 4-6 weeks. Enterprise deployments take 8-12 weeks including compliance and training.",
  },
  {
    q: "Can the voice agent make outbound calls?",
    a: "Absolutely. VAPI supports both inbound and outbound calling. We build outbound agents for lead qualification, appointment reminders, follow-up calls, and survey collection. Calling lists are managed through your CRM or n8n workflows.",
  },
];

export default function VAPIClient() {
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
          <SectionLabel label="VAPI Expert" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Voice AI.
            <br />
            <span className="text-gradient">Human-Level Quality.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed max-w-2xl"
          >
            Custom VAPI voice agents with sub-500ms latency that handle inbound
            support, outbound qualification, and appointment booking. Indistinguishable
            from your best rep - available 24/7 at a fraction of the cost.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton href="/free-consultation" trackingLabel="vapi_hero_consult">
              Free Voice AI Consultation
            </MagneticButton>
            <MagneticButton href="/services" variant="secondary" trackingLabel="vapi_hero_services">
              View All Services
            </MagneticButton>
          </motion.div>
        </motion.div>

        <GlowLine />

        {/* ── What is VAPI ── */}
        <section className="py-24">
          <SectionLabel label="The Platform" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-6"
          >
            What is <span className="text-gradient">VAPI?</span>
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl space-y-4 text-white/50 leading-relaxed text-lg"
          >
            <p>
              VAPI is the leading voice AI platform for building and deploying
              phone agents. Built with an API-first architecture, VAPI enables
              developers to create voice agents that conduct natural,
              human-sounding phone conversations with sub-500ms response latency.
            </p>
            <p>
              Unlike traditional IVR systems, VAPI agents are powered by large
              language models and premium voice synthesis. They understand context,
              handle interruptions, retain conversation history, and execute
              real-time actions like booking appointments, checking databases, and
              transferring calls. Combined with custom voice cloning via 11Labs,
              your AI agent becomes an extension of your team that never sleeps.
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
            VAPI vs <span className="text-gradient">Alternatives</span>
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
                    VAPI
                  </th>
                  <th className="py-4 pr-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Synthflow
                  </th>
                  <th className="py-4 pr-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Bland AI
                  </th>
                  <th className="py-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Retell
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04]">
                    <td className="py-4 pr-4 text-sm text-white/60 font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 pr-4 text-sm text-white/80">{row.vapi}</td>
                    <td className="py-4 pr-4 text-sm text-white/40">{row.synthflow}</td>
                    <td className="py-4 pr-4 text-sm text-white/40">{row.bland}</td>
                    <td className="py-4 text-sm text-white/40">{row.retell}</td>
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

        {/* ── Technical Capabilities ── */}
        <section className="py-24">
          <SectionLabel label="Technical" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            Technical <span className="text-gradient">Capabilities</span>
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {TECH_CAPABILITIES.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8"
              >
                <h3 className="font-serif text-lg font-semibold mb-3">{item.title}</h3>
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

        {/* ── Our VAPI Expertise ── */}
        <section className="py-24">
          <SectionLabel label="Track Record" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            Our VAPI <span className="text-gradient">Expertise</span>
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
            Voice AI <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/40 max-w-xl mb-12"
          >
            Investment scales with complexity and call volume. Every engagement
            starts with a free discovery call to assess your voice AI requirements.
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
            <MagneticButton href="/pricing" variant="secondary" trackingLabel="vapi_pricing_full">
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
