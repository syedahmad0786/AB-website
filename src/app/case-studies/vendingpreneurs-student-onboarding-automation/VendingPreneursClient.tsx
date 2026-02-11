"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";
import CTA from "@/components/sections/CTA";

const HERO_METRICS = [
  { value: "18hrs \u2192 2min", label: "Onboarding Time" },
  { value: "$19,800/yr", label: "Annual Savings" },
  { value: "3 Weeks", label: "Time to Deploy" },
];

const BEFORE_AFTER = [
  { metric: "Onboarding time", before: "45 min/student", after: "2 min/student" },
  { metric: "Weekly admin hours", before: "18 hrs", after: "0.5 hrs (monitoring)" },
  { metric: "Error rate", before: "15%", after: "0.3%" },
  { metric: "Student satisfaction", before: "3.2 / 5", after: "4.8 / 5" },
  { metric: "Cost per onboarding", before: "$45.00", after: "$0.12" },
  { metric: "Staff capacity freed", before: "0 hrs/week", after: "17.5 hrs/week" },
];

const WORKFLOW_PHASES = [
  {
    phase: "Phase 1",
    title: "Trigger & Data Collection",
    description:
      "Stripe payment webhook fires and initiates the pipeline. Student payment data is validated, enriched with form submission details, and normalized into a unified student record ready for downstream provisioning.",
    nodes: "Nodes 1\u20132",
    integrations: ["Stripe", "Webhook"],
  },
  {
    phase: "Phase 2",
    title: "Account Provisioning",
    description:
      "The system simultaneously provisions accounts across all required platforms: creates the student\u2019s Teachable LMS account with course enrollment, spins up a dedicated Slack cohort channel with auto-invite, generates a Google Drive folder pre-loaded with course materials, and books a calendar slot for orientation.",
    nodes: "Nodes 3\u20138",
    integrations: ["Teachable", "Slack", "Google Workspace"],
  },
  {
    phase: "Phase 3",
    title: "Communication & Tracking",
    description:
      "A personalized welcome email sequence deploys via SendGrid (Day 0, Day 1, Day 3), an Airtable student record is created with full metadata and enrollment status, and the admin notification system confirms successful completion or escalates failures.",
    nodes: "Nodes 9\u201311",
    integrations: ["Airtable", "SendGrid"],
  },
];

const TECH_NODES = [
  { id: "01\u201302", label: "Payment validation + student data extraction", tool: "Stripe API" },
  { id: "03\u201304", label: "Course enrollment + credential generation", tool: "Teachable API" },
  { id: "05\u201306", label: "Cohort channel creation + student invite", tool: "Slack API" },
  { id: "07\u201308", label: "Drive folder + Calendar orientation booking", tool: "Google API" },
  { id: "09", label: "Student record creation with all metadata", tool: "Airtable API" },
  { id: "10\u201311", label: "Welcome email sequence (Day 0, Day 1, Day 3)", tool: "SendGrid API" },
];

const ROI_ITEMS = [
  { label: "Time saved", calc: "17.5 hrs/week \u00d7 $25/hr \u00d7 52 weeks", value: "$22,750/year", positive: true },
  { label: "Tool costs", calc: "n8n Pro ($50) + SendGrid ($20) + APIs ($20) \u00d7 12 mo", value: "-$1,080/year", positive: false },
  { label: "Error reduction savings", calc: "Fewer support tickets & re-onboarding", value: "$1,900/year", positive: true },
  { label: "Net annual savings", calc: "", value: "$19,800/year", positive: true, highlight: true },
];

const LESSONS = [
  "Start with the most painful bottleneck, not the most complex process. The highest-impact automation is the one your team dreads doing every single day.",
  "Build admin override endpoints for every automated step. When edge cases appear \u2014 and they will \u2014 your team needs a manual escape hatch that doesn\u2019t break the entire pipeline.",
  "Monitor the first two weeks closely. Edge cases only appear with real users, real payment methods, and real timezone differences. The staging environment never catches everything.",
  "Document every API integration for future team members. Six months from now, someone will need to update a webhook URL or swap an API key. Make it easy for them.",
];

export default function VendingPreneursClient() {
  return (
    <div className="pt-32">
      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section className="section-padding pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <SectionLabel label="Case Study" />

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-glass-light text-accent-purple border border-white/[0.06]">
              Enterprise Automation
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-glass-light text-accent-purple border border-white/[0.06]">
              Education Tech
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            custom={1}
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            From 18 Hours/Week to
            <br />
            <span className="text-gradient">Under 2 Minutes.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-xl text-white/40 leading-relaxed max-w-2xl mb-14"
          >
            How VendingPreneurs automated their entire student onboarding
            pipeline and saved $19,800 per year in operational costs.
          </motion.p>

          {/* Key metrics */}
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {HERO_METRICS.map((m) => (
              <div
                key={m.label}
                className="glass-panel p-6 text-center"
              >
                <p className="font-serif text-2xl md:text-3xl font-bold text-gradient mb-1">
                  {m.value}
                </p>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── CLIENT BACKGROUND ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-8"
          >
            The Client
          </motion.h2>

          <motion.div variants={fadeInUp} custom={1} className="space-y-5 text-white/50 leading-relaxed">
            <p>
              VendingPreneurs is an online education company that teaches aspiring
              entrepreneurs how to build profitable vending machine businesses from
              scratch. Their program covers everything from machine sourcing and
              location scouting to operations management and scaling strategies.
            </p>
            <p>
              With over 200 active students spread across multiple cohorts and a
              growing waitlist, VendingPreneurs had hit a critical inflection point:
              demand was outpacing their ability to deliver a quality onboarding
              experience. Their lean team of three was handling all student management
              manually, and the cracks were starting to show.
            </p>
            <p>
              New cohorts launched monthly, each bringing 20 to 40 new students who
              expected immediate access to course materials, community channels, and
              orientation sessions. The team was growing fast, but their operations
              simply could not keep up.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── THE CHALLENGE ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            The Problem:{" "}
            <span className="text-gradient">Drowning in Manual Work</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/40 leading-relaxed mb-10 max-w-2xl"
          >
            The VendingPreneurs team was spending 18 hours every single week on
            repetitive student onboarding tasks. Here is what that looked like:
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          >
            {[
              "Manually creating student accounts in the learning platform",
              "Sending welcome emails with login credentials and course links",
              "Setting up dedicated Slack channels for each cohort",
              "Creating progress tracking spreadsheets per student",
              "Scheduling individual orientation calls across time zones",
              "Provisioning course access, downloadable materials, and bonus content",
            ].map((task) => (
              <div
                key={task}
                className="flex items-start gap-3 glass-panel p-4"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400/60 shrink-0" />
                <p className="text-sm text-white/50 leading-relaxed">{task}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={3}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="glass-panel p-6 border-l-2 border-red-400/40">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">
                Error Rate
              </p>
              <p className="font-serif text-2xl font-bold text-white/80 mb-1">15%</p>
              <p className="text-sm text-white/40">
                of students experienced onboarding issues &mdash; missing access,
                wrong cohort assignment, or delayed welcome emails.
              </p>
            </div>
            <div className="glass-panel p-6 border-l-2 border-red-400/40">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">
                Staff Burnout
              </p>
              <p className="font-serif text-2xl font-bold text-white/80 mb-1">
                Critical
              </p>
              <p className="text-sm text-white/40">
                The team was spending more time on admin than on teaching or content
                creation, the two activities that actually drive student outcomes.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── FAILED ATTEMPTS ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-10"
          >
            What They Tried Before
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={1}
            className="space-y-6"
          >
            {[
              {
                title: "Zapier",
                detail:
                  "They started with Zapier for basic automations, but quickly hit the platform\u2019s limits. Complex multi-step workflows with conditional branching weren\u2019t feasible, and costs ballooned as student volume increased. At 200+ students per quarter, the per-task pricing model became unsustainable.",
              },
              {
                title: "Virtual Assistant",
                detail:
                  "They hired a part-time virtual assistant to handle onboarding manually using documented SOPs. Quality was inconsistent \u2014 some students received the wrong cohort materials, others waited 48 hours for access. The process still consumed 8+ hours per week and introduced a single point of failure when the VA was unavailable.",
              },
              {
                title: "Manual SOPs & Checklists",
                detail:
                  "Detailed standard operating procedures were documented in Notion with step-by-step checklists. While this improved consistency marginally, the process remained error-prone under load. New team members required two full weeks of training before they could onboard students independently, creating a bottleneck during growth periods.",
              },
            ].map((attempt) => (
              <div key={attempt.title} className="glass-panel p-6 md:p-8">
                <h3 className="font-serif text-xl font-bold mb-3 text-white/80">
                  {attempt.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {attempt.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── THE SOLUTION ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            The Solution:{" "}
            <span className="text-gradient">n8n-Powered Onboarding Engine</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/40 leading-relaxed mb-6 max-w-2xl"
          >
            We built a fully automated onboarding pipeline using n8n as the
            orchestration backbone, connecting six core platforms into a single,
            self-executing workflow. The moment a student completes payment, every
            downstream task fires automatically &mdash; no human intervention
            required.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="flex flex-wrap gap-2 mb-12"
          >
            {["Stripe", "Teachable", "Slack", "Google Workspace", "Airtable", "SendGrid"].map(
              (tool) => (
                <span
                  key={tool}
                  className="text-xs font-mono px-3 py-1.5 rounded-full bg-glass-light text-white/50 border border-white/[0.06]"
                >
                  {tool}
                </span>
              )
            )}
          </motion.div>

          {/* Architecture phases */}
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="space-y-6"
          >
            {WORKFLOW_PHASES.map((phase) => (
              <div key={phase.phase} className="glass-panel p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                    {phase.phase}
                  </span>
                  <span className="text-xs font-mono text-white/20">
                    {phase.nodes}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-white/90">
                  {phase.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed mb-4">
                  {phase.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {phase.integrations.map((int) => (
                    <span
                      key={int}
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-white/30"
                    >
                      {int}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeInUp}
            custom={4}
            className="text-sm text-white/30 mt-8 font-mono"
          >
            11 nodes total &middot; 6 platform integrations &middot; Zero manual steps
          </motion.p>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── TECHNICAL DEEP DIVE ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Under the Hood
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/40 leading-relaxed mb-10 max-w-2xl"
          >
            The workflow is triggered by a Stripe payment webhook. From there, each
            node executes sequentially with built-in error handling, retry logic,
            and admin notifications on failure.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="space-y-3"
          >
            {TECH_NODES.map((node, idx) => (
              <div
                key={node.id}
                className="flex items-start gap-4 glass-panel p-4 md:p-5"
              >
                <span className="shrink-0 w-16 text-xs font-mono text-accent-purple/70 pt-0.5">
                  Node {node.id}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-white/60 leading-relaxed">
                    {node.label}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-white/20 pt-0.5">
                  {node.tool}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Error handling callout */}
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="mt-8 glass-panel p-6 md:p-8 border-l-2 border-accent-purple/40"
          >
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple mb-4">
              Error Handling
            </h3>
            <div className="space-y-3 text-sm text-white/45 leading-relaxed">
              <p>
                <span className="text-white/70 font-medium">Retry logic:</span>{" "}
                Every API call includes exponential backoff with up to three retries.
                Transient failures from Teachable or Slack rate limits are handled
                automatically without human intervention.
              </p>
              <p>
                <span className="text-white/70 font-medium">Admin notifications:</span>{" "}
                If any node fails after all retries, the system immediately sends a
                Slack DM and email alert to the operations lead with full error
                context, the student&apos;s details, and a one-click link to the
                failed execution in n8n.
              </p>
              <p>
                <span className="text-white/70 font-medium">Manual override:</span>{" "}
                A dedicated webhook endpoint allows the team to manually re-trigger
                any individual step for a specific student, bypassing the full
                pipeline when surgical intervention is needed.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── BEFORE / AFTER ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-10"
          >
            Before &amp; After
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={1}
            className="glass-panel overflow-hidden"
          >
            {/* Table header */}
            <div className="grid grid-cols-3 gap-4 p-4 md:p-6 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                Metric
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-red-400/50 text-center">
                Before
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-green-400/50 text-center">
                After
              </span>
            </div>

            {/* Table rows */}
            {BEFORE_AFTER.map((row, idx) => (
              <div
                key={row.metric}
                className={`grid grid-cols-3 gap-4 p-4 md:p-6 ${
                  idx < BEFORE_AFTER.length - 1 ? "border-b border-white/[0.04]" : ""
                }`}
              >
                <span className="text-sm text-white/60">{row.metric}</span>
                <span className="text-sm font-mono text-red-400/40 text-center">
                  {row.before}
                </span>
                <span className="text-sm font-mono text-green-400/60 text-center">
                  {row.after}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── ROI CALCULATION ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-10"
          >
            The Numbers
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={1}
            className="space-y-4 mb-10"
          >
            {ROI_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`glass-panel p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 ${
                  item.highlight ? "border border-accent-purple/20 bg-accent-purple/[0.03]" : ""
                }`}
              >
                <div>
                  <p
                    className={`text-sm font-medium ${
                      item.highlight ? "text-white/90" : "text-white/60"
                    }`}
                  >
                    {item.label}
                  </p>
                  {item.calc && (
                    <p className="text-xs font-mono text-white/25 mt-0.5">
                      {item.calc}
                    </p>
                  )}
                </div>
                <p
                  className={`font-serif text-xl md:text-2xl font-bold ${
                    item.highlight
                      ? "text-gradient"
                      : item.positive
                      ? "text-green-400/70"
                      : "text-red-400/50"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Summary stats */}
          <motion.div
            variants={fadeInUp}
            custom={2}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="glass-panel p-6 text-center">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">
                Implementation Cost
              </p>
              <p className="font-serif text-2xl font-bold text-white/80">$8,500</p>
              <p className="text-xs text-white/25 mt-1">one-time</p>
            </div>
            <div className="glass-panel p-6 text-center">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">
                Payback Period
              </p>
              <p className="font-serif text-2xl font-bold text-gradient">5.2 months</p>
            </div>
            <div className="glass-panel p-6 text-center">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">
                3-Year ROI
              </p>
              <p className="font-serif text-2xl font-bold text-gradient">598%</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── LESSONS LEARNED ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-10"
          >
            Lessons Learned
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={1}
            className="space-y-6"
          >
            {LESSONS.map((lesson, idx) => (
              <div key={idx} className="flex items-start gap-5">
                <span className="shrink-0 w-8 h-8 rounded-full bg-glass-light border border-white/[0.06] flex items-center justify-center text-xs font-mono text-accent-purple">
                  {idx + 1}
                </span>
                <p className="text-sm text-white/50 leading-relaxed pt-1">
                  {lesson}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── TESTIMONIAL ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <div className="mb-6">
              <span className="text-4xl text-accent-purple/30 font-serif">&ldquo;</span>
            </div>
            <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-white/70 mb-8">
              We went from spending our weekends on student onboarding to having it
              done before we finish our morning coffee. The system Ahmad built
              doesn&apos;t just save time &mdash; it made our students&apos; first
              experience with us dramatically better.
            </blockquote>
            <div>
              <p className="text-sm font-mono text-white/40">
                &mdash; VendingPreneurs Operations Team
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── RELATED LINKS ──────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-8"
          >
            Continue Exploring
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={1}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Link
              href="/services/agentic-ai-autonomous-workflows"
              className="glass-panel p-6 group hover:border-white/[0.12] transition-all duration-300"
            >
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-accent-purple mb-3">
                Service
              </p>
              <p className="font-serif text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                Agentic AI &amp; Autonomous Workflows
              </p>
              <p className="text-sm text-white/30 mt-2">
                Multi-agent systems that plan, execute, and self-correct.
              </p>
            </Link>

            <Link
              href="/case-studies"
              className="glass-panel p-6 group hover:border-white/[0.12] transition-all duration-300"
            >
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-accent-purple mb-3">
                Portfolio
              </p>
              <p className="font-serif text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                All Case Studies
              </p>
              <p className="text-sm text-white/30 mt-2">
                See more production results across industries.
              </p>
            </Link>

            <Link
              href="/free-consultation"
              className="glass-panel p-6 group hover:border-white/[0.12] transition-all duration-300"
            >
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-accent-purple mb-3">
                Next Step
              </p>
              <p className="font-serif text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                Free Consultation
              </p>
              <p className="text-sm text-white/30 mt-2">
                Find out what automation can save your team.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ──────────────────────── CTA ──────────────────────── */}
      <CTA />
    </div>
  );
}
