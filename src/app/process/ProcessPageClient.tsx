"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";
import CTA from "@/components/sections/CTA";

/* ───────────────────────── DATA ───────────────────────── */

const STATS = [
  { value: "2-6 Weeks", label: "Average delivery time" },
  { value: "200+", label: "Workflows deployed" },
  { value: "90-Day", label: "ROI guarantee" },
];

interface ProcessStep {
  number: string;
  title: string;
  week: string;
  whatHappens: string;
  whatYouProvide: string;
  deliverable: string;
  timeline: string;
  extra?: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Audit",
    week: "Week 1",
    whatHappens:
      "We conduct a deep dive into your current workflows, tech stack, and pain points. Every manual process gets cataloged, every bottleneck gets measured, and every opportunity gets scored by potential ROI.",
    whatYouProvide:
      "Access to your existing tools, a 2-hour kickoff call with key stakeholders, and a list of manual processes that consume the most time.",
    deliverable:
      "An Automation Opportunity Map with detailed ROI projections for each identified workflow, ranked by impact and implementation speed.",
    timeline: "3-5 business days",
  },
  {
    number: "02",
    title: "Strategy & Architecture",
    week: "Week 1-2",
    whatHappens:
      "We design the system architecture, select the optimal tool combination, and define every integration point. Nothing gets built until the blueprint is airtight and you have signed off on the approach.",
    whatYouProvide:
      "Feedback on the proposed approach and a priority ranking of which automations matter most to your operations.",
    deliverable:
      "A technical specification document and a system architecture diagram showing every data flow, trigger, and decision point.",
    timeline: "3-5 business days",
  },
  {
    number: "03",
    title: "Build & Integrate",
    week: "Week 2-4",
    whatHappens:
      "Development proceeds in focused 1-week sprints with daily progress updates. You see working components every week, not a single big reveal at the end. Each sprint concludes with a demo and feedback session.",
    whatYouProvide:
      "API credentials and tool access for the platforms being integrated, plus availability for quick questions as they arise.",
    deliverable:
      "A working automation system deployed in a staging environment, tested against real-world data patterns and edge cases.",
    timeline: "1-3 weeks depending on complexity",
  },
  {
    number: "04",
    title: "Test & Calibrate",
    week: "Week 4-5",
    whatHappens:
      "End-to-end testing across every workflow path, edge case handling for unusual inputs, and performance optimization to ensure sub-second execution where it matters.",
    whatYouProvide:
      "Real-world test data that reflects your actual operations, and team members available for user acceptance testing.",
    deliverable:
      "A fully tested system with comprehensive error handling, monitoring dashboards, and alerting for any failures.",
    timeline: "3-5 business days",
  },
  {
    number: "05",
    title: "Training & Handoff",
    week: "Week 5-6",
    whatHappens:
      "Interactive training sessions for your team, detailed documentation covering every workflow, and a complete admin walkthrough so your team can manage and modify the system independently.",
    whatYouProvide:
      "Team availability for training sessions and identification of internal system owners.",
    deliverable:
      "Video recordings of all training sessions, written documentation, and full admin dashboard access with annotated guides.",
    timeline: "2-3 business days",
  },
  {
    number: "06",
    title: "Ongoing Support",
    week: "Post-launch",
    whatHappens:
      "Continuous monitoring, proactive optimization, and scaling as your needs evolve. We treat your automation like a living system, not a one-time delivery.",
    whatYouProvide:
      "Ongoing feedback on system performance and any changes in your business processes or goals.",
    deliverable:
      "Monthly performance reports with actionable optimization recommendations and proactive system updates.",
    timeline: "Continuous",
    extra:
      "30 days of included support after launch, then optional retainer packages from $3,500-$8,000/mo based on system complexity.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "No Black Boxes",
    description:
      "You see every workflow, every integration, every decision. Full transparency from day one through post-launch. Your system is never a mystery.",
  },
  {
    title: "Sprint-Based Delivery",
    description:
      "Working systems every week, not a big reveal at the end. Each sprint demo lets you course-correct early, eliminating wasted build time.",
  },
  {
    title: "ROI-First Scoping",
    description:
      "We kill features that do not generate measurable value. Every automation earns its place by proving ROI before it enters the build queue.",
  },
  {
    title: "Knowledge Transfer",
    description:
      "Your team can maintain the system independently after handoff. We build capability, not dependency. Documentation and training are non-negotiable.",
  },
];

const TIMELINE_PHASES = [
  { week: "1", label: "Discovery", color: "from-blue-500 to-purple-500" },
  { week: "1-2", label: "Strategy", color: "from-purple-500 to-violet-500" },
  { week: "2-4", label: "Build", color: "from-violet-500 to-cyan-500" },
  { week: "4-5", label: "Test", color: "from-cyan-500 to-blue-500" },
  { week: "5-6", label: "Train", color: "from-blue-500 to-purple-500" },
  { week: "6+", label: "Support", color: "from-purple-500 to-cyan-500" },
];

const FAQS = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects are completed within 2-6 weeks, depending on complexity. A single-platform automation might take 2 weeks, while a multi-system enterprise integration with AI agents typically requires 4-6 weeks. We scope timelines precisely during the Discovery phase so there are no surprises.",
  },
  {
    question: "What if the project scope changes mid-build?",
    answer:
      "Scope changes happen -- we plan for them. Our sprint-based approach means we reassess priorities every week. If new requirements emerge, we evaluate them against ROI, adjust the roadmap transparently, and communicate any timeline or budget implications before proceeding. No hidden change-order fees.",
  },
  {
    question: "How much of our team's time is required?",
    answer:
      "Minimal. Expect roughly 2-4 hours per week from your key stakeholder during the build phase, primarily for sprint demos and quick questions. The kickoff call and training sessions require more focused time, but we schedule around your availability.",
  },
  {
    question: "What tools do you typically use?",
    answer:
      "Our core stack includes n8n, Make.com, and Zapier for orchestration; OpenAI, Claude, and Gemini for AI; Airtable, GoHighLevel, and Salesforce for data; and Vapi, Synthflow, and Voiceflow for voice AI. We select tools based on your existing stack and specific requirements -- never force a one-size-fits-all solution.",
  },
  {
    question: "What happens if something breaks after launch?",
    answer:
      "Every project includes 30 days of post-launch support at no additional cost. During this period, we monitor all workflows, fix any issues immediately, and optimize performance. After 30 days, you can continue with an optional retainer for ongoing monitoring and optimization, or your trained team can handle maintenance independently.",
  },
];

/* ───────────────────────── COMPONENTS ───────────────────────── */

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="font-serif text-lg md:text-xl font-semibold pr-8 group-hover:text-white transition-colors duration-300 text-white/80">
          {faq.question}
        </span>
        <span
          className={`text-accent-purple text-2xl font-light flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="text-white/50 leading-relaxed pb-6 pr-12">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── PAGE ───────────────────────── */

export default function ProcessPageClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="pt-32">
      {/* ═══════════ HERO ═══════════ */}
      <div className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mb-20"
        >
          <SectionLabel label="Our Process" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            How It Gets Built.
            <br />
            <span className="text-gradient">How It Stays Running.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed max-w-2xl"
          >
            A proven 6-step methodology that turns business chaos into automated
            precision. Transparent timelines, iterative delivery, and measurable
            results from week one.
          </motion.p>
        </motion.div>

        <GlowLine />

        {/* ═══════════ OVERVIEW STATS ═══════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-24"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              variants={fadeInUp}
              custom={i}
              className="glass-panel p-8 text-center"
            >
              <p className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-3">
                {stat.value}
              </p>
              <p className="text-sm font-mono text-white/40 uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <GlowLine />

        {/* ═══════════ 6 STEPS ═══════════ */}
        <div className="py-24">
          <SectionLabel label="The 6 Steps" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
          >
            From First Call to{" "}
            <span className="text-gradient">Full Automation</span>
          </motion.h2>

          <div className="space-y-24">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <article key={step.number} className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Content Side */}
                    <motion.div
                      variants={isEven ? slideInLeft : slideInRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-80px" }}
                      className={isEven ? "" : "lg:order-2"}
                    >
                      {/* Step Number + Week */}
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-6xl md:text-7xl font-serif font-bold text-white/[0.04]">
                          {step.number}
                        </span>
                        <div>
                          <p className="text-xs font-mono text-accent-purple uppercase tracking-[0.2em]">
                            Step {step.number}
                          </p>
                          <p className="text-xs font-mono text-white/30 tracking-[0.15em] mt-1">
                            {step.week}
                          </p>
                        </div>
                      </div>

                      <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-6">
                        {step.title}
                      </h3>

                      <p className="text-white/50 text-lg leading-relaxed">
                        {step.whatHappens}
                      </p>
                    </motion.div>

                    {/* Details Card */}
                    <motion.div
                      variants={isEven ? slideInRight : slideInLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-80px" }}
                      className={isEven ? "" : "lg:order-1"}
                    >
                      <div className="glass-panel p-8 lg:p-10 relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent-purple/[0.04] blur-[64px]" />

                        <div className="space-y-6 relative">
                          {/* What You Provide */}
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-2">
                              What You Provide
                            </p>
                            <p className="text-white/50 leading-relaxed text-sm">
                              {step.whatYouProvide}
                            </p>
                          </div>

                          {/* Deliverable */}
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-2">
                              Deliverable
                            </p>
                            <p className="text-white/50 leading-relaxed text-sm">
                              {step.deliverable}
                            </p>
                          </div>

                          {/* Timeline */}
                          <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                            <div className="w-2 h-2 rounded-full bg-accent-purple animate-glow-pulse" />
                            <p className="text-xs font-mono text-white/40 tracking-wide">
                              Timeline: {step.timeline}
                            </p>
                          </div>

                          {/* Extra info for Step 06 */}
                          {step.extra && (
                            <div className="pt-4 border-t border-white/[0.06]">
                              <p className="text-xs text-white/30 leading-relaxed italic">
                                {step.extra}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <GlowLine />

        {/* ═══════════ DIFFERENTIATORS ═══════════ */}
        <div className="py-24">
          <SectionLabel label="Why It Works" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
          >
            What Makes Our Process{" "}
            <span className="text-gradient">Different</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {DIFFERENTIATORS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 lg:p-10 group hover:border-white/[0.1] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent-purple" />
                  <h3 className="font-serif text-xl font-semibold group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/50 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <GlowLine />

        {/* ═══════════ TIMELINE VISUALIZATION ═══════════ */}
        <div className="py-24">
          <SectionLabel label="Timeline" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
          >
            Your <span className="text-gradient">6-Week</span> Roadmap
          </motion.h2>

          {/* Desktop Timeline */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:block relative"
          >
            {/* Base line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-white/[0.08]" />

            <div className="grid grid-cols-6 gap-4 relative">
              {TIMELINE_PHASES.map((phase, i) => (
                <motion.div
                  key={phase.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="text-center"
                >
                  {/* Dot */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-br ${phase.color} shadow-glow-sm`}
                    />
                  </div>

                  {/* Bar */}
                  <div
                    className={`h-1 rounded-full bg-gradient-to-r ${phase.color} mb-4 opacity-60`}
                  />

                  {/* Label */}
                  <p className="font-serif text-sm font-semibold text-white/80 mb-1">
                    {phase.label}
                  </p>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.15em]">
                    Week {phase.week}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            {TIMELINE_PHASES.map((phase, i) => (
              <motion.div
                key={phase.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex items-center gap-4"
              >
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-br ${phase.color} flex-shrink-0`}
                />
                <div
                  className={`flex-1 h-1 rounded-full bg-gradient-to-r ${phase.color} opacity-40`}
                />
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-serif font-semibold text-white/80">
                    {phase.label}
                  </p>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.15em]">
                    Wk {phase.week}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <GlowLine />

        {/* ═══════════ FAQ ═══════════ */}
        <div className="py-24">
          <SectionLabel label="FAQ" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
          >
            Common <span className="text-gradient">Questions</span>
          </motion.h2>

          <div className="max-w-3xl">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>

        <GlowLine />

        {/* ═══════════ NEXT STEPS ═══════════ */}
        <div className="py-24">
          <SectionLabel label="Next Steps" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            Ready to <span className="text-gradient">Get Started?</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mb-16"
          >
            Pick your path. Whether you need pricing clarity, want to explore
            past results, or are ready to talk -- we make the next step easy.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Pricing */}
            <motion.div variants={fadeInUp} custom={0}>
              <Link href="/pricing" className="block group">
                <div className="glass-panel p-8 h-full hover:border-white/[0.12] transition-all duration-500">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-4">
                    Investment
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                    View Pricing
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    Transparent pricing tiers for every stage of automation
                    maturity. No hidden fees, no surprises.
                  </p>
                  <span className="text-sm font-mono text-accent-purple/70 group-hover:text-accent-purple transition-colors duration-300">
                    See packages &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Free Consultation */}
            <motion.div variants={fadeInUp} custom={1}>
              <Link href="/free-consultation" className="block group">
                <div className="glass-panel p-8 h-full hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-accent-purple/[0.06] blur-[48px]" />
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-4 relative">
                    Free
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-300 relative">
                    Book a Consultation
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6 relative">
                    A 30-minute discovery call to map your automation
                    opportunities. No commitment, no sales pitch.
                  </p>
                  <span className="text-sm font-mono text-accent-purple/70 group-hover:text-accent-purple transition-colors duration-300 relative">
                    Schedule now &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Case Studies */}
            <motion.div variants={fadeInUp} custom={2}>
              <Link href="/case-studies" className="block group">
                <div className="glass-panel p-8 h-full hover:border-white/[0.12] transition-all duration-500">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-4">
                    Proof
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                    Case Studies
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    Real projects, real numbers, real results. See how this
                    process translates into measurable business outcomes.
                  </p>
                  <span className="text-sm font-mono text-accent-purple/70 group-hover:text-accent-purple transition-colors duration-300">
                    Read results &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <GlowLine />
      <CTA />
    </div>
  );
}
