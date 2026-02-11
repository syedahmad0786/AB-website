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
    title: "Student Onboarding Takes Hours",
    description:
      "Every new student means manual account creation, course access provisioning, welcome emails, resource sharing, community invites, and calendar setup. You spend your first interaction on logistics instead of coaching.",
  },
  {
    number: "02",
    title: "Scheduling Chaos",
    description:
      "Back-and-forth emails to find a time, no-shows without reminders, double-bookings across time zones, and no system to screen applicants before they get on your calendar. Your most valuable asset is your time and it is being wasted.",
  },
  {
    number: "03",
    title: "Content Creation Bottleneck",
    description:
      "You deliver incredible coaching calls and workshops, but that content dies in a Zoom recording. It should be repurposed into blog posts, social content, email sequences, and course materials but you do not have the bandwidth.",
  },
  {
    number: "04",
    title: "Manual Follow-Ups and Reminders",
    description:
      "Students ghost after week two. You know follow-up sequences work, but manually tracking who needs what reminder, who is falling behind, and who is ready for an upsell is impossible past 20 students.",
  },
  {
    number: "05",
    title: "Community Management Overhead",
    description:
      "Your Slack or Circle community is growing but so is the noise. Repetitive questions, unanswered threads, disengaged members, and zero visibility into who is active and who has churned. Moderating takes hours you do not have.",
  },
] as const;

const SOLUTIONS = [
  {
    title: "Automated Student Onboarding",
    subtitle: "Payment to fully onboarded in under 60 seconds",
    description:
      "The moment a student completes payment, the entire onboarding flow fires automatically: course platform access granted, welcome email sequence triggered, community invite sent, resource library shared, first-week calendar events created, and progress tracking initialized. Your student feels taken care of before you even know they signed up.",
    outcomes: ["18hrs/week saved", "Sub-60s onboarding", "Zero manual steps"],
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Smart Booking System",
    subtitle: "Only qualified calls land on your calendar",
    description:
      "An intelligent booking funnel that screens applicants through an automated questionnaire, scores them based on your criteria, routes qualified prospects to your calendar with timezone-aware scheduling, sends confirmation and reminder sequences, and follows up with no-shows automatically. Unqualified applicants get redirected to your course or group program instead.",
    outcomes: ["85% show rate", "Pre-qualified only", "Automated follow-up"],
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    title: "Content Repurposing Engine",
    subtitle: "1 coaching call becomes 15+ content pieces",
    description:
      "Upload a coaching call recording and the engine extracts key insights, generates blog posts, creates social media content for LinkedIn, Instagram, and Twitter/X, writes email newsletter content, produces short-form video clips, and formats everything for your specific brand voice and audience. One hour of coaching becomes a month of content.",
    outcomes: ["15+ pieces per input", "Brand-voice consistent", "Multi-platform native"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Email and SMS Sequences",
    subtitle: "The right message at the right moment, automatically",
    description:
      "Behavior-triggered communication sequences that nurture new leads, onboard students through their first 30 days, re-engage inactive members, celebrate milestones, deliver upsell offers at peak satisfaction moments, and recover at-risk students before they churn. Every touchpoint is personalized based on actual student behavior, not arbitrary timers.",
    outcomes: ["4.8/5 satisfaction", "38% churn reduction", "Automated upsells"],
    gradient: "from-blue-600 to-purple-500",
  },
  {
    title: "Community Management",
    subtitle: "AI-moderated, engagement-optimized, always-on",
    description:
      "An AI layer on top of your Slack or Circle community that answers common questions from your knowledge base, identifies and escalates complex issues to you, tracks member engagement scores, flags at-risk members, seeds conversation prompts, and delivers weekly community health reports. Your community runs itself while you focus on high-value coaching.",
    outcomes: ["24/7 response coverage", "Engagement tracking", "Auto-moderation"],
    gradient: "from-purple-600 to-blue-600",
  },
] as const;

const RESULTS = [
  { metric: "18hrs", label: "Saved per week on admin" },
  { metric: "$19,800", label: "Annual operational savings" },
  { metric: "4.8/5", label: "Average student satisfaction" },
  { metric: "300%", label: "Enrollment capacity increase" },
] as const;

const TECH_STACK_COACHES = [
  "n8n",
  "Teachable / Kajabi",
  "Slack / Circle",
  "Stripe",
  "GoHighLevel",
  "Calendly",
  "SendGrid",
] as const;

const PRICING_TIERS = [
  {
    name: "Quick Start",
    price: "$5,000 - 8,000",
    description:
      "Automate your biggest bottleneck and prove the model works before scaling further.",
    popular: false,
    features: [
      "Single workflow automation (onboarding or booking)",
      "1 platform integration",
      "10-day delivery",
      "30-day post-launch support",
      "Full documentation and walkthrough",
    ],
    bestFor: "Coaches with 10-50 active students",
    retainer: null,
  },
  {
    name: "Full Automation",
    price: "$10,000 - 18,000",
    description:
      "End-to-end automation of your coaching operations from lead capture to student success.",
    popular: true,
    features: [
      "Multi-workflow system (onboarding + booking + content + email)",
      "3-5 platform integrations",
      "3-5 week delivery",
      "90-day support and optimization",
      "Priority Slack channel access",
    ],
    bestFor: "Coaches scaling from 50 to 500 students",
    retainer: "$1,500 - 3,000/mo",
  },
  {
    name: "Scaling Package",
    price: "$18,000+",
    description:
      "Full operational infrastructure for coaches building a media brand and scaling to 1,000+ students.",
    popular: false,
    features: [
      "Complete automation suite",
      "Community AI management",
      "Content repurposing engine",
      "Advanced analytics and reporting",
      "Dedicated support with SLA",
      "Quarterly strategy sessions",
    ],
    bestFor: "Coaches and course creators at 500+ students",
    retainer: "$3,000 - 5,000/mo",
  },
] as const;

const FAQS = [
  {
    question: "Will automation make my coaching feel less personal?",
    answer:
      "The opposite. Automation handles the admin and logistics so every interaction your students have with you is high-value coaching, not paperwork. The onboarding feels seamless, follow-ups are perfectly timed, and you have more bandwidth for the personal touchpoints that matter. Students consistently rate automated coaching businesses higher for experience quality.",
  },
  {
    question: "I am not technical at all. Can I still manage these systems?",
    answer:
      "Absolutely. Every system I build comes with a recorded walkthrough, written documentation, and a simple dashboard where you can see what is happening. You do not need to touch the automation layer. If something needs adjusting, that is what the support period and retainers are for. Your job is to coach. The system handles the rest.",
  },
  {
    question: "What platforms does this work with?",
    answer:
      "I have built automations for Teachable, Kajabi, Thinkific, Podia, Skool, Circle, Slack, Discord, Stripe, PayPal, Calendly, Acuity, GoHighLevel, ConvertKit, ActiveCampaign, Mailchimp, SendGrid, Zoom, and more. If you use it, I can integrate it.",
  },
  {
    question: "How long before I see results?",
    answer:
      "The Quick Start package delivers a working automation in 10 days. Most coaches see immediate time savings from day one. The full ROI compounds over the first 90 days as the system handles more students without additional effort from you. One coach recovered 18 hours per week within the first month.",
  },
  {
    question: "What about student data privacy?",
    answer:
      "All data stays within your existing platforms. The automation layer connects your tools but does not store student data on separate servers. I work within your platform provider privacy frameworks. For GDPR or specific compliance requirements, I can configure data handling rules as part of the build.",
  },
  {
    question: "Can this handle different programs and pricing tiers?",
    answer:
      "Yes. The system supports multiple programs, pricing tiers, payment plans, scholarship tracks, and VIP access levels. Each can have its own onboarding flow, content library, community channel, and communication sequence. One coach runs three different programs with completely different student journeys through a single automation system.",
  },
  {
    question: "What if I change course platforms later?",
    answer:
      "Every automation is built with modularity in mind. Swapping out one platform for another is a configuration change, not a rebuild. If you move from Teachable to Kajabi, for example, I update the integration endpoints and test the flows. This is typically a 1-2 day update, not a full project.",
  },
  {
    question: "How does the content repurposing engine handle my brand voice?",
    answer:
      "During setup, we create a brand voice profile that captures your tone, vocabulary, key phrases, and content style. The AI engine uses this profile for every piece of content it generates. You review and approve the first batch, we fine-tune, and subsequent content gets closer to your voice with every iteration.",
  },
  {
    question: "Can I still manually override the automations?",
    answer:
      "Always. Every automation has manual override points. You can pause sequences for specific students, manually send communications, adjust booking rules, and intervene in community moderation at any time. The system augments your decision-making. It does not replace it.",
  },
  {
    question: "What ROI should I expect from the Full Automation package?",
    answer:
      "Based on client data, the average coaching business saves 18 hours per week in admin time and $19,800 per year in operational costs with the Full Automation package. The enrollment capacity increase of 300% means you can serve 3x more students without hiring. At typical coaching rates, the system pays for itself within 60-90 days.",
  },
  {
    question: "Do you work with coaching businesses that have a team?",
    answer:
      "Yes. The systems are built to support multi-coach operations. Each coach can have their own booking calendar, student assignments, and communication preferences while sharing the same automation infrastructure. Team dashboards provide visibility into student progress and workload distribution.",
  },
  {
    question: "What does the monthly support retainer include?",
    answer:
      "Retainers cover ongoing optimization, monitoring, new feature builds, and platform maintenance. You get a dedicated Slack channel, priority response times under 4 hours, and a monthly performance report showing automation metrics. Retainers can be paused or cancelled with 30 days notice.",
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

export default function CoachesClient() {
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
          <SectionLabel label="For Coaches" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Coach More.
            <br />
            <span className="text-gradient">Admin Less.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed mb-8 max-w-2xl"
          >
            You became a coach to change lives, not to spend 20 hours a week on
            onboarding, scheduling, follow-ups, and community management. Automate
            the operations. Keep the impact.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-4">
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="lg"
              trackingLabel="coaches_hero_book_call"
            >
              Book Free Strategy Call
            </MagneticButton>
            <MagneticButton
              href="/case-studies/vendingpreneurs-student-onboarding-automation"
              variant="secondary"
              size="lg"
              trackingLabel="coaches_hero_case_study"
            >
              See Coach Case Study
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
            These five operational bottlenecks cap your coaching business at a
            fraction of its potential and burn you out in the process.
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
            What We Build for Coaches
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Every system is tailored to your coaching model, platforms, and student
            journey. These are the five core automations that free you to do what
            you do best.
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
            Real Numbers from Coaching Clients
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Measured outcomes from coaches and course creators running these
            systems with real students.
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

      {/* ── Real Example ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Case Study" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            VendingPreneurs: From Manual to Automated
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-8 max-w-2xl"
          >
            A real coaching business that transformed its student onboarding from
            a multi-hour manual process into a fully automated system handling
            hundreds of students.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="glass-panel p-8 lg:p-10 max-w-3xl relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 opacity-[0.06] blur-[64px]" />

            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">
                    Time Saved
                  </p>
                  <p className="text-2xl font-bold text-gradient">18hrs/week</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">
                    Student Capacity
                  </p>
                  <p className="text-2xl font-bold text-gradient">3x increase</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">
                    Onboarding Time
                  </p>
                  <p className="text-2xl font-bold text-gradient">Under 60s</p>
                </div>
              </div>

              <p className="text-white/50 leading-relaxed mb-6">
                VendingPreneurs was spending hours onboarding each new student
                manually. After deploying the automated onboarding system, new
                students receive course access, community invites, resource
                libraries, and their first-week schedule within seconds of
                payment. The coaching team now focuses entirely on delivering
                value instead of managing logistics.
              </p>

              <Link
                href="/case-studies/vendingpreneurs-student-onboarding-automation"
                className="group inline-flex items-center gap-2 text-sm font-mono text-accent-purple hover:text-white transition-colors duration-300"
              >
                Read the full case study
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  &rarr;
                </span>
              </Link>
            </div>
          </motion.div>
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
            Technology Stack for Coaches
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Built to integrate with the platforms coaches already use and love.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-3">
            {TECH_STACK_COACHES.map((tech) => (
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
            Pricing for Coaches
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Start with a free strategy call. We map your student journey, identify
            the highest-impact automations, and build a system that pays for
            itself.
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
                      Monthly Support Option
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
                  trackingLabel={`coaches_pricing_${tier.name.toLowerCase().replace(/\s+/g, "_")}_cta`}
                >
                  Book Free Strategy Call
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
            Questions from Coaches
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Honest answers to the questions coaches and course creators ask before
            automating their business.
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
            {
              label: "VendingPreneurs Case Study",
              href: "/case-studies/vendingpreneurs-student-onboarding-automation",
            },
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
