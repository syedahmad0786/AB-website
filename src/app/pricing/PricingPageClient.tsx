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

const TIERS = [
  {
    name: "Starter",
    price: "$8,000 - 12,000",
    description: "Perfect entry point for teams ready to test the power of AI automation without a massive commitment.",
    popular: false,
    features: [
      "Single workflow automation or voice AI agent",
      "1 platform integration",
      "2-week delivery",
      "30-day post-launch support included",
      "Full documentation & handoff",
    ],
    bestFor: "Solo operators, small teams testing AI",
    retainer: null,
  },
  {
    name: "Growth",
    price: "$15,000 - 25,000",
    description: "Multi-system automation for companies ready to replace manual processes at scale.",
    popular: true,
    features: [
      "Multi-workflow system or agentic AI MVP",
      "3-5 platform integrations",
      "4-6 week delivery",
      "90-day support + optimization",
      "Priority Slack channel access",
    ],
    bestFor: "Growing companies ready to scale operations",
    retainer: "$3,500 - 6,000/mo",
  },
  {
    name: "Enterprise",
    price: "$30,000 - 75,000+",
    description: "Full agentic AI deployment designed to replace entire manual departments with autonomous systems.",
    popular: false,
    features: [
      "Full agentic AI deployment, multi-agent systems",
      "Unlimited integrations",
      "8-12 week delivery",
      "Dedicated support + SLA",
      "Quarterly strategy reviews",
    ],
    bestFor: "Companies replacing entire manual departments",
    retainer: "$6,000 - 12,000/mo",
  },
] as const;

const A_LA_CARTE = [
  { name: "Voice AI Agent", price: "$8,000 - 15,000", description: "Custom voice agent for inbound/outbound calls, booking, and qualification." },
  { name: "n8n Workflow Build", price: "$3,000 - 8,000", description: "Single automated workflow connecting your existing tools." },
  { name: "GoHighLevel Setup", price: "$5,000 - 12,000", description: "Full CRM setup with automations, pipelines, and integrations." },
  { name: "AI Content Pipeline", price: "$6,000 - 15,000", description: "End-to-end content generation system from one input to many outputs." },
  { name: "CRM Integration", price: "$4,000 - 10,000", description: "Connect and sync data between your CRM and other platforms." },
  { name: "AI Consulting", price: "$250/hr", description: "Strategic advisory on AI implementation, architecture, and team enablement." },
] as const;

const PRICING_FACTORS = [
  { title: "Number of Integrations", description: "Each platform connection adds complexity to data mapping, authentication, and error handling." },
  { title: "Complexity of Logic", description: "Decision trees, conditional branching, and multi-step approval workflows increase build time." },
  { title: "Data Volume & Processing", description: "High-throughput systems need queue management, rate limiting, and performance optimization." },
  { title: "Custom AI Model Needs", description: "Fine-tuned models, custom training data, or specialized prompt engineering add to scope." },
  { title: "Human-in-the-Loop Level", description: "Approval gates, review steps, and exception handling require additional UX and logic layers." },
  { title: "Ongoing Maintenance Scope", description: "Monitoring, updates, platform API changes, and scaling needs factor into retainer pricing." },
] as const;

const COMPARISON_ROWS = [
  { feature: "Custom Build", starter: "Single workflow", growth: "Multi-workflow system", enterprise: "Full AI deployment" },
  { feature: "Integrations", starter: "1 platform", growth: "3-5 platforms", enterprise: "Unlimited" },
  { feature: "AI Agents", starter: "1 agent", growth: "Multi-agent MVP", enterprise: "Multi-agent orchestration" },
  { feature: "Voice AI", starter: "Basic agent", growth: "Advanced routing", enterprise: "Enterprise telephony" },
  { feature: "Support", starter: "30 days", growth: "90 days + optimization", enterprise: "Dedicated + SLA" },
  { feature: "Delivery Time", starter: "2 weeks", growth: "4-6 weeks", enterprise: "8-12 weeks" },
  { feature: "Strategy Reviews", starter: "\u2014", growth: "Monthly check-in", enterprise: "Quarterly deep-dive" },
  { feature: "Retainer Option", starter: "\u2014", growth: "$3.5K-6K/mo", enterprise: "$6K-12K/mo" },
] as const;

const FAQS = [
  {
    question: "What\u2019s included in the free discovery call?",
    answer: "A 30-minute call where we audit your current workflows, identify automation opportunities, and map out a rough scope and timeline. You will walk away with a clear picture of what can be automated, estimated ROI, and a prioritized roadmap \u2014 whether or not we work together.",
  },
  {
    question: "Can I start with Starter and upgrade later?",
    answer: "Absolutely. Many clients begin with a single workflow to prove the concept, then scale into Growth or Enterprise once they see measurable results. Every system I build is designed to be modular and extensible, so upgrading never means starting over.",
  },
  {
    question: "Do you offer monthly payment plans?",
    answer: "For project-based work, the standard split is 50% upfront and 50% on delivery. For larger engagements above $25,000, I can structure milestone-based payments across the project timeline. Retainers are billed monthly at the start of each month.",
  },
  {
    question: "What if the project scope changes?",
    answer: "Scope changes happen. If the change is minor, I absorb it. For significant additions, I provide a transparent change order with updated pricing and timeline before any extra work begins. You are never surprised by a bill.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "I do not offer blanket refunds, but I do guarantee delivery against the agreed scope. If a system does not perform as specified in the project brief, I fix it at no additional cost. The 30 to 90 day post-launch support window exists specifically for this purpose.",
  },
  {
    question: "What\u2019s not included in the pricing?",
    answer: "Third-party platform subscription costs (n8n Cloud, OpenAI API credits, GoHighLevel, etc.) are not included and are billed directly by those providers. I will always estimate these costs upfront so there are no surprises. Custom domain, hosting, and telephony costs are also separate.",
  },
  {
    question: "How do retainers work?",
    answer: "Monthly retainers cover ongoing optimization, monitoring, new feature builds, and platform maintenance. Hours roll over for one month. You get a dedicated Slack channel, priority response times, and a monthly performance report. Retainers can be paused or cancelled with 30 days notice.",
  },
] as const;

/* ───────────────────── Components ─────────────────────── */

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
        <span className="text-white/40 text-2xl shrink-0 transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
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

export default function PricingPageClient() {
  return (
    <div className="pt-32">
      {/* ── Hero ── */}
      <section className="section-padding pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <SectionLabel label="Pricing" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Transparent Pricing.
            <br />
            <span className="text-gradient">Real ROI.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed"
          >
            No hidden fees. No vague estimates. Every project is scoped,
            priced, and agreed upon before a single line of automation is
            built. You know exactly what you are paying for and exactly what
            you are getting.
          </motion.p>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Pricing Tiers ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={fadeInUp}
              custom={i}
              className={`relative glass-panel p-8 lg:p-10 flex flex-col ${
                tier.popular ? "lg:-mt-4 lg:mb-[-16px] ring-1 ring-accent-purple/30" : ""
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
                <h3 className="font-serif text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-3">{tier.price}</p>
                <p className="text-sm text-white/40 leading-relaxed">{tier.description}</p>
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
                  <p className="text-sm font-semibold text-accent-purple">{tier.retainer}</p>
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
                trackingLabel={`pricing_${tier.name.toLowerCase()}_cta`}
              >
                Book Discovery Call
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <GlowLine />

      {/* ── A La Carte Services ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="A La Carte" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Individual Services
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Need a specific build without committing to a full package? Each
            service can be scoped independently or bundled for a custom
            engagement.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {A_LA_CARTE.map((service, i) => (
              <motion.div
                key={service.name}
                variants={fadeInUp}
                custom={i}
                className="glass-panel-hover p-6 lg:p-8 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-serif text-lg font-semibold group-hover:text-accent-purple transition-colors duration-300">
                    {service.name}
                  </h3>
                </div>
                <p className="text-xl font-bold text-gradient mb-3">{service.price}</p>
                <p className="text-sm text-white/40 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── What Drives Pricing ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Pricing Factors" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            What Drives Pricing
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Every project is unique. Here are the six factors that most
            influence the final scope and investment.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRICING_FACTORS.map((factor, i) => (
              <motion.div
                key={factor.title}
                variants={fadeInUp}
                custom={i}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-mono font-bold text-accent-purple">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold mb-1">{factor.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{factor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Comparison Table ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Compare Plans" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-12"
          >
            Side-by-Side Comparison
          </motion.h2>

          <motion.div variants={fadeInUp} custom={1} className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-4 pr-6 text-xs font-mono uppercase tracking-[0.15em] text-white/30 w-[180px]">
                    Feature
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Starter
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-mono uppercase tracking-[0.15em] text-accent-purple">
                    Growth
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-200">
                    <td className="py-4 pr-6 text-sm font-semibold text-white/70">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-sm text-white/40">{row.starter}</td>
                    <td className="py-4 px-4 text-sm text-white/60">{row.growth}</td>
                    <td className="py-4 px-4 text-sm text-white/40">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Payment Terms ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Payment Terms" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-12"
          >
            Simple, Clear Terms
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeInUp} custom={0} className="glass-panel p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-lg font-bold text-accent-purple">50</span>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Project-Based</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                50% upfront to begin work, 50% on delivery and sign-off. Clear milestones, no ambiguity.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} custom={1} className="glass-panel p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-5 h-5 text-accent-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Monthly Retainers</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Billed at the start of each month. Cancel or pause with 30 days written notice. Hours roll over once.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} custom={2} className="glass-panel p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-xs font-mono font-bold text-accent-purple">NET15</span>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Enterprise Terms</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Net-15 payment terms available for enterprise contracts. Custom invoicing and procurement workflow support.
              </p>
            </motion.div>
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Straight answers to the questions I hear most. If yours is not
            listed, bring it to the discovery call.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="max-w-3xl">
            {FAQS.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── CTA ── */}
      <CTA />
    </div>
  );
}
