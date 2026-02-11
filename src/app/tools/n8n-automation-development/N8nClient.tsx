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
    feature: "Monthly Cost (10K tasks)",
    n8n: "~$50 self-hosted",
    zapier: "$250-600+",
    make: "$100-300+",
  },
  {
    feature: "Self-Hosting Option",
    n8n: "Yes (full control)",
    zapier: "No",
    make: "No",
  },
  {
    feature: "Custom Code Nodes",
    n8n: "JavaScript & Python",
    zapier: "Limited (Code by Zapier)",
    make: "Limited (HTTP module)",
  },
  {
    feature: "AI / LLM Nodes",
    n8n: "Native (GPT-4, Claude, Gemini)",
    zapier: "Basic AI actions",
    make: "Via HTTP only",
  },
  {
    feature: "Complex Branching",
    n8n: "Unlimited nesting",
    zapier: "Paths (limited)",
    make: "Routers (moderate)",
  },
  {
    feature: "Sub-Workflows",
    n8n: "Full support",
    zapier: "Transfer (limited)",
    make: "Scenarios (separate)",
  },
  {
    feature: "Error Handling",
    n8n: "Try/Catch per node",
    zapier: "Global only",
    make: "Error routes",
  },
];

const USE_CASES = [
  {
    title: "Lead Routing & Qualification",
    description:
      "Automatically score, enrich, and route inbound leads to the right sales rep based on firmographic data, engagement signals, and custom scoring models. Zero lag between form fill and first touch.",
  },
  {
    title: "CRM Sync & Data Hygiene",
    description:
      "Bi-directional sync between your CRM (HubSpot, Salesforce, GHL) and operational tools. Deduplication, field normalization, and real-time data enrichment running 24/7.",
  },
  {
    title: "Content Production Pipelines",
    description:
      "Input one piece of content, output ten. Blog to social posts, video to transcripts, podcast to newsletters. AI-powered repurposing with brand-voice consistency across every channel.",
  },
  {
    title: "Invoicing & Payment Automation",
    description:
      "Contract signed to invoice sent in under 60 seconds. Automated payment reminders, reconciliation with accounting software, and overdue escalation workflows.",
  },
  {
    title: "Client Onboarding Sequences",
    description:
      "New client triggers a cascade: welcome email, Slack channel creation, project board setup, kickoff scheduling, and document collection. All in under 90 seconds.",
  },
  {
    title: "Data Enrichment & Research",
    description:
      "Pull enrichment data from Clearbit, Apollo, LinkedIn, and custom sources. AI-powered summarization of company profiles, tech stack detection, and buying intent signals.",
  },
  {
    title: "Reporting & Dashboard Automation",
    description:
      "Scheduled data pulls from multiple sources, AI-generated summaries, and auto-populated dashboards in Airtable, Google Sheets, or Power BI. Weekly reports delivered to Slack without lifting a finger.",
  },
];

const EXPERTISE = [
  "200+ production workflows deployed across industries",
  "Enterprise-grade error handling with retry logic and dead-letter queues",
  "AI node integration: GPT-4, Claude, Gemini for intelligent automation",
  "Sub-workflow architectures for modular, maintainable systems",
  "Webhook-driven event processing with sub-second execution",
  "Custom JavaScript and Python function nodes for complex transformations",
  "Database integrations: PostgreSQL, MySQL, MongoDB, Airtable",
  "OAuth and API key management for 400+ platform integrations",
];

const PRICING = [
  {
    tier: "Single Workflow Build",
    price: "$3,000 - $8,000",
    description: "One production-ready n8n workflow with testing and documentation",
    includes: [
      "Requirements discovery session",
      "Workflow architecture design",
      "Full build with error handling",
      "Testing and QA",
      "Documentation and handoff",
      "30 days post-launch support",
    ],
  },
  {
    tier: "Multi-Workflow System",
    price: "$8,000 - $20,000",
    description: "Interconnected workflow ecosystem for end-to-end automation",
    includes: [
      "Operations audit and mapping",
      "System architecture blueprint",
      "3-8 interconnected workflows",
      "Sub-workflow patterns",
      "Monitoring and alerting setup",
      "60 days post-launch support",
    ],
  },
  {
    tier: "Enterprise Deployment",
    price: "$20,000+",
    description: "Organization-wide n8n infrastructure with training and governance",
    includes: [
      "Full operations audit",
      "Self-hosted n8n setup and config",
      "10+ workflows with AI integration",
      "Team training (up to 10 users)",
      "Governance and access controls",
      "90 days post-launch support",
    ],
  },
  {
    tier: "Monthly Retainer",
    price: "$2,000 - $5,000/mo",
    description: "Ongoing n8n management, optimization, and new workflow builds",
    includes: [
      "Priority Slack/email support",
      "Workflow monitoring and maintenance",
      "Monthly performance reviews",
      "New workflow builds (scoped per tier)",
      "Proactive optimization recommendations",
      "Quarterly roadmap sessions",
    ],
  },
];

const FAQ = [
  {
    q: "What is n8n and how is it different from Zapier?",
    a: "n8n is an open-source workflow automation platform. Unlike Zapier, it supports self-hosting, custom code nodes (JavaScript and Python), complex branching logic, and native AI/LLM integrations. For complex workflows, n8n is significantly more powerful and cost-effective.",
  },
  {
    q: "Can n8n be self-hosted for data compliance?",
    a: "Yes. n8n can run on your own infrastructure (AWS, GCP, Azure, or on-premise), giving you full control over data residency and security. This is critical for HIPAA, SOC 2, and GDPR compliance.",
  },
  {
    q: "How many integrations does n8n support?",
    a: "n8n has 400+ native integrations and supports any REST API or GraphQL endpoint through HTTP request nodes. If a platform has an API, n8n can connect to it.",
  },
  {
    q: "Can n8n handle AI and machine learning workflows?",
    a: "Absolutely. n8n has native nodes for OpenAI (GPT-4), Anthropic (Claude), Google (Gemini), and supports custom AI model integration. We build AI-powered workflows that classify, generate, and make decisions autonomously.",
  },
  {
    q: "What is the typical timeline for an n8n project?",
    a: "A single workflow build takes 1-2 weeks. Multi-workflow systems take 3-6 weeks. Enterprise deployments take 6-12 weeks depending on scope and number of integrations.",
  },
  {
    q: "Do you provide training for our team?",
    a: "Yes. Every project includes documentation and a handoff session. Enterprise packages include formal training for up to 10 team members covering workflow building, monitoring, and maintenance.",
  },
  {
    q: "How do you handle errors in n8n workflows?",
    a: "We implement try/catch blocks at the node level, retry logic for transient failures, dead-letter queues for persistent errors, and real-time alerting via Slack or email. Every workflow is built for production reliability.",
  },
  {
    q: "Can you migrate our existing Zapier or Make.com workflows to n8n?",
    a: "Yes. We regularly migrate clients from Zapier and Make.com to n8n. The process includes auditing existing workflows, redesigning for n8n best practices, and typically results in 40-70% cost savings.",
  },
  {
    q: "What kind of ROI can we expect from n8n automation?",
    a: "Our clients typically see 10-30 hours saved per week per workflow system, with payback periods of 4-8 weeks. One client saved $180K annually by replacing manual data entry and reporting with n8n workflows.",
  },
  {
    q: "Do you offer ongoing support after the build?",
    a: "Yes. All projects include a post-launch support period (30-90 days depending on tier). For ongoing needs, our monthly retainer covers monitoring, maintenance, optimization, and new builds.",
  },
];

export default function N8nClient() {
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
          <SectionLabel label="n8n Expert" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            200+ Workflows.
            <br />
            <span className="text-gradient">Zero Manual Steps.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed max-w-2xl"
          >
            I have built, deployed, and maintained over 200 production n8n
            workflows across industries - from lead routing to AI-powered content
            pipelines. If it can be automated, I have probably already built it.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton href="/free-consultation" trackingLabel="n8n_hero_consult">
              Free n8n Consultation
            </MagneticButton>
            <MagneticButton href="/services" variant="secondary" trackingLabel="n8n_hero_services">
              View All Services
            </MagneticButton>
          </motion.div>
        </motion.div>

        <GlowLine />

        {/* ── What is n8n ── */}
        <section className="py-24">
          <SectionLabel label="The Platform" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-6"
          >
            What is <span className="text-gradient">n8n?</span>
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl space-y-4 text-white/50 leading-relaxed text-lg"
          >
            <p>
              n8n is an open-source workflow automation platform that connects your
              apps, services, and APIs into seamless, event-driven pipelines. With
              400+ native integrations, custom JavaScript and Python support, and
              the option to self-host on your own infrastructure, n8n gives
              engineering teams and businesses full control over their automation
              stack.
            </p>
            <p>
              Unlike Zapier or Make.com, n8n excels at complex, multi-step
              workflows with branching logic, sub-workflows, error handling, and
              native AI/LLM nodes. It is the platform of choice for teams that need
              more than simple trigger-action automations.
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
            n8n vs <span className="text-gradient">Alternatives</span>
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-4 pr-6 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Feature
                  </th>
                  <th className="py-4 pr-6 text-xs font-mono uppercase tracking-[0.15em] text-accent-purple">
                    n8n
                  </th>
                  <th className="py-4 pr-6 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Zapier
                  </th>
                  <th className="py-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Make.com
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04]">
                    <td className="py-4 pr-6 text-sm text-white/60 font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 pr-6 text-sm text-white/80">{row.n8n}</td>
                    <td className="py-4 pr-6 text-sm text-white/40">{row.zapier}</td>
                    <td className="py-4 text-sm text-white/40">{row.make}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Use Cases ── */}
        <section className="py-24">
          <SectionLabel label="Use Cases" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            What We <span className="text-gradient">Automate</span>
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {USE_CASES.map((uc, i) => (
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
                  {uc.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {uc.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Our n8n Expertise ── */}
        <section className="py-24">
          <SectionLabel label="Expertise" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            Our n8n <span className="text-gradient">Expertise</span>
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
            n8n Development <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/40 max-w-xl mb-12"
          >
            Transparent pricing based on scope and complexity. Every engagement
            starts with a free consultation to scope your requirements.
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
            <MagneticButton href="/pricing" variant="secondary" trackingLabel="n8n_pricing_full">
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
