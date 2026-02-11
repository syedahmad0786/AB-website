"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";

const WHAT_WE_COVER = [
  {
    title: "Automation Audit",
    description:
      "We'll analyze your current workflows and identify the highest-ROI automation opportunities in your business.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
      </svg>
    ),
  },
  {
    title: "Custom Roadmap",
    description:
      "You'll leave with a prioritized implementation plan — what to automate first, expected timeline, and projected savings.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    title: "ROI Estimate",
    description:
      "Get a realistic estimate of time saved, cost reduced, and revenue potential from the automations we discuss.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

const IDEAL_CLIENTS = [
  "Agency owners spending 15+ hours/week on manual operations",
  "Coaches and consultants with client onboarding bottlenecks",
  "SaaS founders looking to reduce support costs by 50%+",
  "Enterprise teams drowning in data entry and reporting",
  "Anyone spending $5K+/month on tasks AI could handle",
];

const WHAT_MAKES_DIFFERENT = [
  {
    title: "No Generic Advice",
    description: "Every recommendation is based on your actual tech stack and current workflows.",
  },
  {
    title: "Not a Sales Pitch",
    description: "You'll get actionable insights whether you hire us or not. Zero pressure, guaranteed.",
  },
  {
    title: "Real Architecture Discussion",
    description: "We'll sketch out the actual system design live — not vague promises, but concrete blueprints.",
  },
  {
    title: "Immediate Value",
    description: "Most clients implement at least one quick win from the call alone, often saving hours that same week.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Book Your Slot",
    description: "Pick a 30-minute window that works for your schedule using the calendar below.",
  },
  {
    step: "02",
    title: "Pre-Call Questionnaire",
    description: "Fill out a brief form so we can understand your business and prepare tailored recommendations.",
  },
  {
    step: "03",
    title: "We Prepare",
    description: "We analyze your workflows and research your industry to come prepared with specific automation strategies.",
  },
  {
    step: "04",
    title: "Live Strategy Session",
    description: "A focused, high-value conversation where you leave with a custom roadmap and clear next steps.",
  },
];

const TRUST_SIGNALS = [
  { value: "200+", label: "Automation workflows deployed" },
  { value: "40%", label: "Average cost reduction for clients" },
  { value: "4.9/5", label: "Client satisfaction rating" },
  { value: "Global", label: "Trusted by agencies, coaches, and SaaS companies worldwide" },
];

const FAQS = [
  {
    q: "Is this really free?",
    a: "Yes, 100%. There is no hidden fee, no credit card required, and no obligation whatsoever. This is a genuine strategy session designed to give you clarity on what automation can do for your business. If we are a good fit to work together, great. If not, you still walk away with a concrete roadmap.",
  },
  {
    q: "How should I prepare for the call?",
    a: "After booking, you will receive a short pre-call questionnaire. Fill that out honestly — it helps us prepare specific recommendations instead of generic advice. If you can, have a rough idea of which workflows consume the most time in your business and what tools you currently use.",
  },
  {
    q: "What if I'm not ready to invest yet?",
    a: "That is perfectly fine. Many clients book the call purely for research purposes and come back months later when the timing is right. The roadmap you receive is yours to keep and implement on your own timeline — with or without us.",
  },
  {
    q: "Do you work with my industry?",
    a: "We have deployed automation systems across agencies, coaching businesses, SaaS companies, real estate firms, healthcare marketing, staffing platforms, and e-commerce. If your business involves repetitive processes and digital tools, we can almost certainly help. If your industry is outside our expertise, we will tell you upfront.",
  },
  {
    q: "What happens after the call?",
    a: "You will receive a written summary of everything we discussed, including the recommended automation roadmap and estimated ROI. If you want to move forward, we will send a detailed proposal within 48 hours. If not, no follow-up pressure — just the value from the session itself.",
  },
  {
    q: "Can I bring my team?",
    a: "Absolutely. In fact, we encourage it. Having your operations lead, CTO, or relevant team members on the call ensures everyone is aligned on priorities and can ask questions specific to their domain. The more context we have, the better the recommendations.",
  },
];

export default function ConsultationClient() {
  return (
    <div className="pt-32 pb-20">
      <div className="section-padding">
        {/* ── Hero Section ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mb-20"
        >
          <SectionLabel label="Free Strategy Call" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            30 Minutes.
            <br />
            <span className="text-gradient">Zero Pitch. Pure Strategy.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed mb-10 max-w-2xl"
          >
            Get a custom AI automation roadmap tailored to your business — with
            actionable insights you can implement immediately, whether you work
            with us or not.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2}>
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="lg"
              trackingLabel="hero-book-call"
            >
              Book Your Free Call
            </MagneticButton>
          </motion.div>
        </motion.div>

        <GlowLine />

        {/* ── Embedded Calendly Section ── */}
        <section className="py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel label="Schedule" />
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              Pick a Time That <span className="text-gradient">Works for You</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-white/40 leading-relaxed mb-10 max-w-2xl"
            >
              Select a 30-minute slot below. All times are displayed in your
              local timezone. Available worldwide.
            </motion.p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="glass-panel rounded-2xl overflow-hidden"
          >
            <iframe
              src="https://calendly.com/ahmadbukhari4245/30min"
              title="Book a 30-minute AI automation strategy call"
              style={{ width: "100%", height: "700px", border: "none" }}
              loading="lazy"
            />
          </motion.div>
        </section>

        <GlowLine />

        {/* ── What We'll Cover ── */}
        <section className="py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel label="What You Get" />
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
            >
              What We&apos;ll <span className="text-gradient">Cover</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {WHAT_WE_COVER.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                custom={i}
                className="glass-panel-hover p-8 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-[1px] mb-6">
                  <div className="w-full h-full rounded-2xl bg-surface-100 flex items-center justify-center text-white/70">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-white/40 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Who This Is For ── */}
        <section className="py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel label="Ideal Clients" />
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
            >
              Who This Is <span className="text-gradient">For</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl space-y-4"
          >
            {IDEAL_CLIENTS.map((client, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-glass-light border border-white/[0.06] hover:bg-glass-medium hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-white/60 text-lg leading-relaxed">
                  {client}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── What Makes This Different ── */}
        <section className="py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel label="Our Approach" />
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
            >
              What Makes This <span className="text-gradient">Different</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
          >
            {WHAT_MAKES_DIFFERENT.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 opacity-[0.04] blur-[48px]" />
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 text-accent-purple mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/40 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── 4-Step Process ── */}
        <section className="py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel label="How It Works" />
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
            >
              4 Simple <span className="text-gradient">Steps</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PROCESS_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                custom={i}
                className="glass-panel-hover p-8 relative"
              >
                <span className="text-5xl font-serif font-bold text-gradient opacity-60 mb-4 block">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-white/40 leading-relaxed text-sm">
                  {item.description}
                </p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-accent-purple/40 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Trust Signals ── */}
        <section className="py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel label="Track Record" />
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
            >
              Results That <span className="text-gradient">Speak</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TRUST_SIGNALS.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 text-center"
              >
                <span className="block text-4xl md:text-5xl font-serif font-bold text-gradient mb-3">
                  {item.value}
                </span>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── FAQ Section ── */}
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
            className="space-y-4 max-w-3xl"
          >
            {FAQS.map((faq, i) => (
              <motion.details
                key={i}
                variants={fadeInUp}
                custom={i}
                className="group glass-panel overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-white/80 hover:text-white transition-colors">
                  <span className="font-medium pr-4">{faq.q}</span>
                  <span className="text-accent-purple text-xl flex-shrink-0 group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-white/40 leading-relaxed border-t border-white/[0.04] pt-4">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </motion.div>
        </section>

        <GlowLine />

        {/* ── Final CTA ── */}
        <section className="py-24 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            >
              Ready to Automate <span className="text-gradient">Smarter?</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-white/40 leading-relaxed mb-10 text-lg"
            >
              Stop spending hours on work that machines should handle. Book your
              free 30-minute strategy call and walk away with a roadmap you can
              act on immediately.
            </motion.p>
            <motion.div variants={fadeInUp} custom={2}>
              <MagneticButton
                href={SITE_CONFIG.links.calendly}
                size="lg"
                trackingLabel="final-cta-book-call"
              >
                Book Your Free Call
              </MagneticButton>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
