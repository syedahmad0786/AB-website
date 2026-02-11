"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";
import CTA from "@/components/sections/CTA";

/* ───────────────────────── Data ───────────────────────── */

const PAIN_POINTS = [
  {
    number: "01",
    title: "Client Onboarding Takes Days",
    description:
      "Every new client means manual account setup, Slack channels, project boards, welcome emails, and invoice generation. Your team spends the first week on admin instead of strategy.",
  },
  {
    number: "02",
    title: "Reporting Eats Billable Hours",
    description:
      "Pulling data from Google Analytics, Meta Ads, HubSpot, and five other platforms into a branded PDF every month is a full-time job nobody signed up for.",
  },
  {
    number: "03",
    title: "Content Production Bottleneck",
    description:
      "Your clients expect multi-platform content but your team can only produce so much. One blog post should become 10 social assets, but the repurposing pipeline does not exist.",
  },
  {
    number: "04",
    title: "CRM Is a Mess",
    description:
      "Leads fall through the cracks, follow-ups get missed, and your sales pipeline looks like a graveyard of good intentions. Manual CRM management does not scale past 20 clients.",
  },
  {
    number: "05",
    title: "Too Many Tools, Too Many Subscriptions",
    description:
      "You are paying for 15 different SaaS tools that do not talk to each other. Data lives in silos, workflows break at the seams, and nobody knows which tool is the source of truth.",
  },
] as const;

const SOLUTIONS = [
  {
    title: "Automated Client Onboarding",
    subtitle: "Contract to kickoff in under 90 seconds",
    description:
      "The moment a contract is signed, the entire onboarding engine fires: invoice generated and sent, Slack channel created, project board populated with your standard deliverables, welcome email sequence triggered, and team notifications dispatched. What used to take your ops team 6 hours now happens before you finish your coffee.",
    outcomes: ["6hrs saved per client", "Sub-90s execution", "Zero manual handoffs"],
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "AI-Powered Reporting",
    subtitle: "From data pull to client inbox, untouched",
    description:
      "Automated data extraction from every platform your clients use. AI analyzes trends, flags anomalies, generates insights, and compiles everything into a branded PDF report. Scheduled delivery to clients on your cadence. Your account managers review and approve in one click instead of building reports from scratch.",
    outcomes: ["15hrs/month saved per AM", "100% on-time delivery", "Branded templates"],
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    title: "Content Production Engine",
    subtitle: "1 input becomes 40+ assets",
    description:
      "Feed in one blog post, video, or podcast episode. The engine outputs optimized versions for LinkedIn, Twitter/X, Instagram carousels, email newsletters, YouTube descriptions, Facebook posts, and more. Each piece is tailored to the platform, maintains your client's brand voice, and follows your content calendar.",
    outcomes: ["10x content output", "Zero additional headcount", "Platform-native formatting"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "White-Label CRM",
    subtitle: "Your brand, their experience, automated everything",
    description:
      "A fully branded GoHighLevel instance for each client with automated lead capture, nurture sequences, appointment booking, pipeline management, and reporting dashboards. Offer CRM as a value-add service or a standalone revenue stream. Your clients see your brand, never the underlying platform.",
    outcomes: ["New revenue stream", "Client retention boost", "Fully white-labeled"],
    gradient: "from-blue-600 to-purple-500",
  },
  {
    title: "Lead Generation Automation",
    subtitle: "AI SDR that never sleeps",
    description:
      "An autonomous outbound system that identifies ideal prospects, enriches contact data, crafts personalized outreach sequences, handles responses, qualifies leads through AI conversation, and books meetings directly on your calendar. Works for your agency and as a service you sell to clients.",
    outcomes: ["3x qualified leads", "24/7 outreach", "Automated qualification"],
    gradient: "from-purple-600 to-blue-600",
  },
] as const;

const RESULTS = [
  { metric: "6hrs", label: "Saved per client onboarding" },
  { metric: "10x", label: "Content output multiplier" },
  { metric: "40%", label: "Reduction in operational costs" },
  { metric: "3x", label: "Qualified leads generated" },
] as const;

const TECH_STACK_AGENCIES = [
  "n8n",
  "GoHighLevel",
  "OpenAI / GPT-4",
  "Slack",
  "Airtable",
  "Make.com",
] as const;

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$8,000 - 12,000",
    description:
      "One core automation to prove the concept and show immediate ROI to your team.",
    popular: false,
    features: [
      "Single workflow automation",
      "1 platform integration",
      "2-week delivery",
      "30-day post-launch support",
      "Full documentation and handoff",
    ],
    bestFor: "Agencies testing their first automation",
    retainer: null,
  },
  {
    name: "Growth",
    price: "$15,000 - 25,000",
    description:
      "Multi-system automation for agencies ready to eliminate operational bottlenecks at scale.",
    popular: true,
    features: [
      "Multi-workflow system (onboarding + reporting + CRM)",
      "3-5 platform integrations",
      "4-6 week delivery",
      "90-day support and optimization",
      "Priority Slack channel access",
    ],
    bestFor: "Growing agencies with 10-50 clients",
    retainer: "$3,500 - 6,000/mo",
  },
  {
    name: "Agency Partnership",
    price: "$25,000+",
    description:
      "Full operational transformation with white-label solutions and ongoing strategic support.",
    popular: false,
    features: [
      "Full automation suite deployment",
      "White-label CRM setup",
      "Unlimited integrations",
      "Dedicated support with SLA",
      "Quarterly strategy reviews",
      "Revenue share options available",
    ],
    bestFor: "Established agencies scaling past 50 clients",
    retainer: "$6,000 - 12,000/mo",
  },
] as const;

const FAQS = [
  {
    question: "How quickly will we see ROI from automation?",
    answer:
      "Most agencies see measurable ROI within 30 days of deployment. Client onboarding automation alone typically saves 6+ hours per new client, which at agency billing rates translates to $1,500-3,000 in recovered billable time per onboarding. The reporting engine usually pays for itself within 2 months based on time savings alone.",
  },
  {
    question: "How much involvement does my team need during the build?",
    answer:
      "Minimal. I need 2-3 hours of your team's time during the discovery phase to map current workflows and access credentials. After that, I build independently and deliver a working system. Your team gets a recorded walkthrough and documentation for every automation deployed.",
  },
  {
    question: "Can we white-label these solutions for our clients?",
    answer:
      "Absolutely. The GoHighLevel CRM setup is fully white-labeled by default. For other automations, I can build them under your brand so you can offer automation as a service to your clients. Several agency partners generate $2,000-5,000 per month in additional recurring revenue this way.",
  },
  {
    question: "What happens to our client data? Is it secure?",
    answer:
      "All data stays within your existing platforms and the automation layer. I do not store client data on separate servers. Automations run through n8n Cloud or your self-hosted instance with enterprise-grade encryption. I sign NDAs before every engagement and can work within your existing security and compliance framework.",
  },
  {
    question: "Can this scale as we add more clients?",
    answer:
      "Every system is built to be modular and scalable. Adding a new client to the onboarding system is as simple as triggering the workflow. The content engine scales linearly. The only cost that increases is API usage for AI processing, which is typically under $50 per month per client.",
  },
  {
    question: "What if we already use Make.com or Zapier?",
    answer:
      "I work with your existing stack. If you are on Make.com or Zapier, I can build within those platforms or migrate you to n8n for more flexibility and lower costs at scale. Most agencies save 40-60% on automation platform costs by switching to n8n without losing any functionality.",
  },
  {
    question: "Do you offer a pilot project before a full engagement?",
    answer:
      "Yes. The Starter tier is designed exactly for this. Pick your biggest operational bottleneck, and I will automate it in 2 weeks. Once you see the results, we can scope the full system. No pressure, no lock-in.",
  },
  {
    question: "How do you handle platform API changes and updates?",
    answer:
      "Retainer clients get proactive monitoring and updates whenever platforms change their APIs. For project-based clients, the 30-90 day support window covers any breaking changes. After that, updates are billed at the retainer rate or as a one-time fix.",
  },
  {
    question: "Can you integrate with our existing project management tools?",
    answer:
      "Yes. I have built integrations with Asana, Monday.com, ClickUp, Basecamp, Trello, Notion, and most project management platforms. If you use it, I can connect it to the automation system.",
  },
  {
    question: "What is the difference between the Growth and Partnership tiers?",
    answer:
      "Growth gives you a multi-workflow system to solve 2-3 core operational problems. Partnership is a full operational transformation including white-label CRM, unlimited integrations, dedicated support, and strategic advisory. Partnership clients also get priority access to new automation templates and revenue share options for client-facing solutions.",
  },
  {
    question: "How do retainers work for agencies?",
    answer:
      "Monthly retainers cover ongoing optimization, monitoring, new automation builds, and platform maintenance. You get a dedicated Slack channel, priority response times, and a monthly performance report. Retainers can be paused or cancelled with 30 days notice. Hours roll over for one month.",
  },
  {
    question: "Can your automations handle multi-account management?",
    answer:
      "Yes. The system is designed for agencies managing multiple client accounts. Each automation can be templated and deployed per client with unique credentials, branding, and configuration. One agency partner manages 40+ client onboarding flows through a single automation system.",
  },
] as const;

/* ───────────────────── Components ─────────────────────── */

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-accent-purple shrink-0 mt-0.5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="font-serif text-lg font-semibold pr-8 group-hover:text-accent-purple transition-colors duration-300">
          {question}
        </span>
        <span
          className="text-white/40 text-2xl shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-white/40 leading-relaxed max-w-2xl">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

/* ───────────────────── Page ───────────────────────────── */

export default function AgenciesClient() {
  return (
    <div className="pt-32">
      {/* ── Hero ── */}
      <section className="section-padding pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <SectionLabel label="For Agencies" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Scale Your Agency.
            <br />
            <span className="text-gradient">Not Your Headcount.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed mb-8 max-w-2xl"
          >
            Your agency is drowning in operational overhead. Client onboarding,
            reporting, content production, CRM management, and tool sprawl are
            eating your margins and burning out your team. It does not have to be
            this way.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-4">
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="lg"
              trackingLabel="agencies_hero_book_call"
            >
              Book Agency Strategy Call
            </MagneticButton>
            <MagneticButton
              href="/case-studies"
              variant="secondary"
              size="lg"
              trackingLabel="agencies_hero_case_studies"
            >
              See Agency Results
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Pain Points ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="The Problem" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Sound Familiar?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            These are the five operational bottlenecks that prevent agencies from
            scaling past the 20-client mark without doubling headcount.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAIN_POINTS.map((point, i) => (
              <motion.div
                key={point.number}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 group hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-accent-purple">
                      {point.number}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold group-hover:text-accent-purple transition-colors duration-300">
                    {point.title}
                  </h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Solutions ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Solutions" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            What We Build for Agencies
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Every system is custom-built for your agency&apos;s workflows, tools,
            and client base. These are the five core automations that transform
            agency operations.
          </motion.p>

          <div className="space-y-8">
            {SOLUTIONS.map((solution, i) => (
              <motion.div
                key={solution.title}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 lg:p-10 relative overflow-hidden"
              >
                {/* Decorative gradient */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${solution.gradient} opacity-[0.06] blur-[64px]`}
                />

                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-2">
                      Solution {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-serif text-2xl font-bold mb-1">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-accent-purple/60 italic font-serif mb-4">
                      {solution.subtitle}
                    </p>
                    <p className="text-white/50 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-1">
                      Key Outcomes
                    </p>
                    {solution.outcomes.map((outcome) => (
                      <div
                        key={outcome}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-light border border-white/[0.06]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                        <span className="text-sm font-mono text-white/60">
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Results ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Results" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Real Numbers from Agency Clients
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            These are not projections. These are measured outcomes from agencies
            running these systems in production.
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {RESULTS.map((result, i) => (
              <motion.div
                key={result.metric}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-3">
                  {result.metric}
                </p>
                <p className="text-sm text-white/40 font-mono">
                  {result.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Tech Stack ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Technology" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Technology Stack for Agencies
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Built on proven, enterprise-grade platforms that agencies already know
            and trust.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-3">
            {TECH_STACK_AGENCIES.map((tech) => (
              <div
                key={tech}
                className="px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm font-mono text-white/50 hover:border-accent-purple/30 hover:text-white/70 transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Case Studies ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Proof" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            See It in Action
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-8 max-w-2xl"
          >
            Detailed breakdowns of real agency automation projects, including
            architecture, timelines, and measured outcomes.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-4">
            <Link
              href="/case-studies"
              className="group flex items-center gap-3 glass-panel px-6 py-4 hover:border-white/[0.12] transition-all duration-300"
            >
              <span className="text-sm font-semibold group-hover:text-accent-purple transition-colors duration-300">
                View All Case Studies
              </span>
              <span className="text-white/30 group-hover:text-accent-purple group-hover:translate-x-1 transition-all duration-300">
                &rarr;
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="group flex items-center gap-3 glass-panel px-6 py-4 hover:border-white/[0.12] transition-all duration-300"
            >
              <span className="text-sm font-semibold group-hover:text-accent-purple transition-colors duration-300">
                Explore Portfolio
              </span>
              <span className="text-white/30 group-hover:text-accent-purple group-hover:translate-x-1 transition-all duration-300">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Pricing ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Investment" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Pricing for Agencies
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Every engagement starts with a free discovery call where we map your
            current operations and identify the highest-ROI automations.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeInUp}
                custom={i}
                className={`relative glass-panel p-8 lg:p-10 flex flex-col ${
                  tier.popular
                    ? "lg:-mt-4 lg:mb-[-16px] ring-1 ring-accent-purple/30"
                    : ""
                }`}
              >
                {/* Gradient top border */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-purple/60 to-transparent" />

                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-purple/20 border border-accent-purple/40">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-purple">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier header */}
                <div className="mb-8">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-3xl md:text-4xl font-bold text-gradient mb-3">
                    {tier.price}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Retainer */}
                {tier.retainer && (
                  <div className="mb-6 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 mb-1">
                      Monthly Retainer Option
                    </p>
                    <p className="text-sm font-semibold text-accent-purple">
                      {tier.retainer}
                    </p>
                  </div>
                )}

                {/* Best for */}
                <p className="text-xs font-mono text-white/25 mb-6">
                  Best for: {tier.bestFor}
                </p>

                {/* CTA */}
                <MagneticButton
                  href={SITE_CONFIG.links.calendly}
                  variant={tier.popular ? "primary" : "secondary"}
                  size="md"
                  className="w-full"
                  trackingLabel={`agencies_pricing_${tier.name.toLowerCase()}_cta`}
                >
                  Book Discovery Call
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── FAQ ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="FAQ" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Agency-Specific Questions
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Straight answers to the questions I hear from agency owners and
            operations leads every week.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="max-w-3xl">
            {FAQS.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Internal Links ── */}
      <section className="section-padding py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {[
            { label: "All Services", href: "/services" },
            { label: "Pricing Details", href: "/pricing" },
            { label: "Free Consultation", href: "/free-consultation" },
            { label: "Case Studies", href: "/case-studies" },
          ].map((link, i) => (
            <motion.div key={link.href} variants={fadeInUp} custom={i}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm font-mono text-white/50 hover:border-accent-purple/30 hover:text-white/70 transition-all duration-300"
              >
                {link.label}
                <span className="text-white/20">&rarr;</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <GlowLine />

      {/* ── CTA ── */}
      <CTA />
    </div>
  );
}
