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

/* -------------------------------------------------------------------------- */
/*                               DATA CONSTANTS                               */
/* -------------------------------------------------------------------------- */

const COMPARISON_TABLE = [
  {
    dimension: "Decision Making",
    agenticAI: "Autonomous reasoning with chain-of-thought planning",
    rpa: "Rule-based, follows exact scripts",
    workflow: "Conditional branching on predefined paths",
    chatbot: "Single-turn intent matching",
  },
  {
    dimension: "Error Handling",
    agenticAI: "Self-corrects, retries with alternative strategies",
    rpa: "Halts or fails silently",
    workflow: "Follows error branch if configured",
    chatbot: "Escalates to human",
  },
  {
    dimension: "Adaptability",
    agenticAI: "Learns from feedback, adjusts behavior over time",
    rpa: "Zero adaptability without re-scripting",
    workflow: "Limited to pre-built logic",
    chatbot: "Re-training required for new intents",
  },
  {
    dimension: "Complexity Ceiling",
    agenticAI: "Multi-step, multi-tool, cross-system orchestration",
    rpa: "Single-application screen automation",
    workflow: "Moderate multi-step pipelines",
    chatbot: "Simple Q&A and form fills",
  },
];

const ARCHITECTURE_LAYERS = [
  {
    label: "Orchestrator Layer",
    description:
      "n8n serves as the central nervous system, routing tasks to specialist agents, managing state, and coordinating multi-step execution flows across your entire stack.",
    tech: ["n8n", "Custom Webhooks", "Event Queue"],
    color: "from-purple-500 to-blue-500",
  },
  {
    label: "Reasoning Engine",
    description:
      "Large language models handle planning, analysis, and decision-making. We select the optimal model per task based on cost, latency, and accuracy requirements.",
    tech: ["OpenAI GPT-4o", "Claude 3.5 Sonnet", "Gemini Pro"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Specialist Agents",
    description:
      "Purpose-built agents with scoped permissions and domain-specific prompts. Each agent owns a single responsibility and communicates through the orchestrator.",
    tech: ["Tool Calling", "Function Routing", "Chain-of-Thought"],
    color: "from-cyan-500 to-teal-500",
  },
  {
    label: "State & Memory",
    description:
      "Persistent state management ensures agents maintain context across sessions, track progress on multi-step tasks, and avoid redundant operations.",
    tech: ["Airtable", "Supabase", "Redis"],
    color: "from-teal-500 to-green-500",
  },
];

const USE_CASES = [
  {
    title: "Self-Healing CRM",
    subtitle: "Data Quality, Deduplication & Enrichment",
    challenge:
      "A B2B SaaS company was losing deals because their CRM contained 40% duplicate records, stale contact data, and inconsistent field formatting. Sales reps spent 6+ hours per week on manual data cleanup instead of selling.",
    solution:
      "We deployed a multi-agent system with three specialist agents: a Data Auditor that continuously scans for duplicates and inconsistencies, an Enrichment Agent that pulls real-time firmographic and contact data from Clearbit and LinkedIn, and a Reconciliation Agent that merges records using fuzzy matching with human-in-the-loop approval for edge cases.",
    results: [
      "94% reduction in CRM data errors",
      "12+ hours saved per sales rep per week",
      "Zero manual data cleanup after week 3",
      "Pipeline accuracy improved by 38%",
    ],
    icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3zm5 2h6m-6 3h6m-6 3h4",
  },
  {
    title: "Intelligent Lead Routing",
    subtitle: "Scoring, Assignment & Follow-Up Sequencing",
    challenge:
      "A performance marketing consultancy was routing leads manually via Slack messages. Average response time was 4.2 hours, with 23% of qualified leads falling through the cracks entirely. Their scoring model was a spreadsheet that nobody trusted.",
    solution:
      "We built an agentic pipeline that ingests leads from six channels, runs them through an AI scoring agent trained on 18 months of conversion data, routes to the optimal rep based on capacity, expertise, and timezone, then orchestrates a personalized follow-up sequence with dynamic content generated per lead.",
    results: [
      "Response time reduced from 4.2 hours to 8 minutes",
      "Lead-to-meeting conversion up 67%",
      "Zero leads dropped from routing errors",
      "Rep satisfaction score increased to 4.7/5",
    ],
    icon: "M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z",
  },
  {
    title: "Autonomous Content Operations",
    subtitle: "Research, Draft, Review & Publish",
    challenge:
      "A creator economy agency was producing 8 pieces of content per week with a team of 4. Every piece required manual research, drafting, internal review, revision cycles, and cross-platform publishing. Bottleneck was always the review stage.",
    solution:
      "We deployed a four-agent content pipeline: a Research Agent that monitors industry trends and compiles briefs, a Drafting Agent that generates platform-optimized content, a Review Agent that evaluates against brand guidelines and SEO benchmarks, and a Publishing Agent that schedules and distributes across 5 platforms with per-channel formatting.",
    results: [
      "Content output scaled from 8 to 40+ pieces per week",
      "Zero additional headcount required",
      "Review cycle reduced from 3 days to 45 minutes",
      "Brand consistency score maintained at 96%",
    ],
    icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
  },
  {
    title: "Financial Ops Automation",
    subtitle: "Invoice Processing, Reconciliation & Anomaly Detection",
    challenge:
      "A global staffing marketplace processed 2,000+ invoices monthly across 14 currencies. Reconciliation was a 3-person, 5-day-per-month operation with a 4.7% error rate that had already caused two compliance incidents.",
    solution:
      "We built an agentic financial operations system with an Extraction Agent that parses invoices from email, PDF, and portal sources using vision models, a Reconciliation Agent that matches line items against purchase orders and flags discrepancies, and an Anomaly Detection Agent that identifies unusual patterns, duplicate charges, and currency conversion errors in real time.",
    results: [
      "Invoice processing time cut by 82%",
      "Error rate reduced from 4.7% to 0.3%",
      "Monthly close accelerated by 4 days",
      "Compliance incidents dropped to zero",
    ],
    icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  },
];

const PROCESS_PHASES = [
  {
    phase: "01",
    title: "Discovery & Audit",
    duration: "1 week",
    price: "$2,500 - $4,000",
    description:
      "We map your current workflows, identify automation-ready processes, evaluate data infrastructure, and define the highest-ROI use case for your first agentic deployment.",
    deliverables: [
      "Process audit document",
      "Data readiness assessment",
      "Architecture recommendation",
      "ROI projection model",
    ],
  },
  {
    phase: "02",
    title: "Agent Architecture Design",
    duration: "2 weeks",
    price: "Included in MVP build",
    description:
      "We design the multi-agent architecture, define agent roles and communication protocols, select optimal models per task, and plan the integration topology with your existing systems.",
    deliverables: [
      "System architecture diagram",
      "Agent specification documents",
      "Integration mapping",
      "Prompt engineering blueprints",
    ],
  },
  {
    phase: "03",
    title: "MVP Build & Integration",
    duration: "2 - 4 weeks",
    price: "$10,000 - $20,000",
    description:
      "We build the core agentic system, integrate with your tools, implement error handling and fallback logic, and deploy a functional MVP that handles your primary use case end-to-end.",
    deliverables: [
      "Working agentic system",
      "n8n workflow suite",
      "API integrations",
      "Monitoring dashboard",
    ],
  },
  {
    phase: "04",
    title: "Testing, Calibration & Human-in-the-Loop",
    duration: "1 - 2 weeks",
    price: "Included in MVP build",
    description:
      "We stress-test the system with real data, calibrate agent behavior through prompt tuning, configure human approval gates for high-stakes decisions, and validate accuracy against your quality benchmarks.",
    deliverables: [
      "Test suite and results",
      "Calibrated prompt library",
      "Human-in-the-loop workflows",
      "Accuracy benchmarks",
    ],
  },
  {
    phase: "05",
    title: "Production Launch & Optimization",
    duration: "Ongoing",
    price: "$3,500 - $8,000/month",
    description:
      "We launch the system into production, monitor performance metrics, optimize based on real-world feedback, and iterate on agent behavior to continuously improve accuracy and reduce costs.",
    deliverables: [
      "Production deployment",
      "Performance monitoring",
      "Monthly optimization reports",
      "Ongoing prompt refinement",
    ],
  },
];

const PRICING_TIERS = [
  {
    name: "Discovery",
    price: "$2,500 - $4,000",
    description: "Process audit, data assessment, and architecture recommendation",
    features: [
      "Full workflow audit",
      "Data readiness assessment",
      "Architecture recommendation",
      "ROI projection model",
      "1-week delivery",
    ],
    cta: "Book Discovery",
    highlighted: false,
  },
  {
    name: "MVP Build",
    price: "$10,000 - $20,000",
    description: "End-to-end agentic system for your primary use case",
    features: [
      "Multi-agent architecture",
      "n8n orchestration suite",
      "API integrations (up to 5 systems)",
      "Human-in-the-loop gates",
      "Monitoring dashboard",
      "4-6 week delivery",
    ],
    cta: "Start MVP Build",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$25,000 - $50,000+",
    description: "Complex multi-agent deployments with custom model training",
    features: [
      "Unlimited agent count",
      "Custom model fine-tuning",
      "Enterprise SSO & compliance",
      "Dedicated support channel",
      "SLA guarantees",
      "8-12 week delivery",
    ],
    cta: "Discuss Enterprise",
    highlighted: false,
  },
  {
    name: "Retainer",
    price: "$3,500 - $8,000/mo",
    description: "Ongoing optimization, monitoring, and expansion of your agentic systems",
    features: [
      "Performance monitoring",
      "Monthly optimization cycles",
      "Prompt refinement",
      "New agent development",
      "Priority support",
      "Quarterly business reviews",
    ],
    cta: "Explore Retainer",
    highlighted: false,
  },
];

const FAQ_ITEMS = [
  {
    question: "What is the difference between agentic AI and regular automation?",
    answer:
      "Regular automation follows predefined rules: if X happens, do Y. Agentic AI reasons about problems, plans multi-step solutions, executes across tools, and self-corrects when things go wrong. Think of it as the difference between a calculator and an analyst. A calculator does what you tell it. An analyst understands the problem, decides what to calculate, checks if the answer makes sense, and adjusts the approach if it does not.",
  },
  {
    question: "How long does an agentic AI project take?",
    answer:
      "A typical project runs 5 to 8 weeks from discovery to production launch. The discovery phase takes 1 week, architecture design takes 2 weeks (often overlapping with build), MVP build takes 2 to 4 weeks, and testing and calibration takes 1 to 2 weeks. Enterprise deployments with complex integrations or custom model training may extend to 12 weeks. We always start with a focused MVP and expand from there.",
  },
  {
    question: "What if the AI makes a mistake?",
    answer:
      "Every agentic system we deploy includes human-in-the-loop checkpoints for high-stakes decisions. Agents flag low-confidence outputs for human review, and all actions are logged with full audit trails. We also implement rollback mechanisms so any agent action can be reversed. In practice, our systems typically achieve higher accuracy than manual processes within the first month of deployment.",
  },
  {
    question: "Do we need to provide training data?",
    answer:
      "In most cases, no. We use pre-trained foundation models (GPT-4, Claude, Gemini) that already have broad capabilities. What we do need is access to your existing systems, documentation of your current processes, and examples of good outcomes. For specialized use cases, we may fine-tune models on your historical data, but this is usually a Phase 2 optimization rather than a launch requirement.",
  },
  {
    question: "Can this integrate with our existing tools?",
    answer:
      "Yes. Our orchestration layer (n8n) supports 400+ native integrations, and we build custom API connectors for anything not covered out of the box. We have deployed agentic systems that integrate with Salesforce, HubSpot, Slack, Airtable, Google Workspace, Jira, Asana, QuickBooks, Stripe, custom ERPs, and proprietary internal tools. If it has an API, we can connect it.",
  },
  {
    question: "What is the typical ROI timeline?",
    answer:
      "Most clients see positive ROI within 30 to 60 days of production launch. The primary value drivers are labor hours saved (typically 10 to 15 hours per employee per week for targeted processes), error reduction (80 to 95% reduction in data quality issues), and speed improvements (response times measured in seconds instead of hours). We provide a detailed ROI projection during the discovery phase before you commit to a build.",
  },
  {
    question: "Do you offer a proof-of-concept?",
    answer:
      "Yes. Our Discovery phase functions as a paid proof-of-concept. For $2,500 to $4,000, you get a complete process audit, architecture recommendation, and ROI projection. If we determine that agentic AI is not the right fit for your use case, we will tell you and recommend a simpler approach. We would rather lose a project than deploy something that does not deliver value.",
  },
  {
    question: "What happens after launch?",
    answer:
      "After launch, we offer retainer packages ($3,500 to $8,000 per month) that include ongoing performance monitoring, monthly optimization cycles, prompt refinement based on real-world feedback, and development of new agents as your needs evolve. Most clients start with a single use case and expand to 3 to 5 agentic systems within the first year. We also provide documentation and training so your team can handle day-to-day oversight.",
  },
];

const INTERNAL_LINKS = [
  {
    label: "Voice AI & Conversational Intelligence",
    href: "/services/voice-ai-conversational-intelligence",
    description: "Human-like voice agents with sub-500ms latency",
  },
  {
    label: "Enterprise Automation & Integration",
    href: "/services/enterprise-automation-integration",
    description: "Connect siloed systems for zero-touch data flow",
  },
  {
    label: "Content Generation & Automation",
    href: "/services/content-generation-automation",
    description: "One input, infinite output across every channel",
  },
  {
    label: "AI Consulting & Incubation",
    href: "/services/ai-consulting-incubation",
    description: "Build the muscle, not just the machine",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "Real results from real deployments",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    description: "Systems we have built and the outcomes they deliver",
  },
];

/* -------------------------------------------------------------------------- */
/*                                FAQ ACCORDION                               */
/* -------------------------------------------------------------------------- */

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group cursor-pointer"
      >
        <span className="font-serif text-lg text-white/80 group-hover:text-white transition-colors">
          {question}
        </span>
        <span
          className={`text-accent-purple text-xl flex-shrink-0 transition-transform duration-300 ${
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
        <p className="text-white/40 leading-relaxed pb-6">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN PAGE CLIENT                              */
/* -------------------------------------------------------------------------- */

export default function AgenticAIClient() {
  return (
    <div className="pt-32">
      {/* ================================================================== */}
      {/*  HERO SECTION                                                      */}
      {/* ================================================================== */}
      <section className="section-padding pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <SectionLabel label="Agentic AI Services" />

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            AI That Thinks.
            <br />
            <span className="text-gradient">AI That Acts.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl md:text-2xl text-white/40 leading-relaxed mb-8 max-w-3xl"
          >
            Multi-agent systems that plan, execute, and self-correct across your
            entire operation. No human babysitting. No brittle scripts. Just
            autonomous workflows that compound in value every week they run.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-white/30 leading-relaxed mb-12 max-w-2xl"
          >
            Built on n8n, OpenAI, Claude, and Gemini with custom orchestration
            logic that turns disconnected tools into a unified, intelligent
            system.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={3}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="lg"
              trackingLabel="agentic_hero_book_call"
            >
              Book Discovery Call
            </MagneticButton>
            <MagneticButton
              href="/case-studies"
              variant="secondary"
              size="lg"
              trackingLabel="agentic_hero_case_studies"
            >
              See Case Studies
            </MagneticButton>
          </motion.div>

          {/* Proof bar */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="flex flex-wrap gap-x-8 gap-y-3 mt-14"
          >
            {[
              "94% error reduction",
              "12+ hrs saved per employee/week",
              "200+ workflows deployed",
            ].map((stat) => (
              <div key={stat} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                <span className="text-sm font-mono text-white/40">{stat}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ================================================================== */}
      {/*  WHAT IS AGENTIC AI                                                */}
      {/* ================================================================== */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Understanding Agentic AI" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            What Is Agentic AI &{" "}
            <span className="text-gradient">How Is It Different?</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-6 max-w-3xl"
          >
            Most automation tools follow scripts. They do exactly what you tell
            them, and nothing more. When something unexpected happens, they
            break. Agentic AI is fundamentally different because it operates with
            autonomy, reasoning, and self-correction.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-3xl"
          >
            An agentic system decomposes a goal into subtasks, selects the right
            tools to accomplish each step, monitors its own progress, and adjusts
            its strategy when outcomes deviate from expectations. It is the
            difference between giving someone a to-do list and hiring someone who
            figures out the to-do list on their own.
          </motion.p>

          {/* Comparison Table */}
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="overflow-x-auto -mx-4 px-4 mb-12"
          >
            <div className="glass-panel p-1 min-w-[700px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                      Dimension
                    </th>
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-[0.15em] text-accent-purple">
                      Agentic AI
                    </th>
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                      RPA
                    </th>
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                      Workflow Automation
                    </th>
                    <th className="text-left p-4 text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                      Chatbots
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_TABLE.map((row, i) => (
                    <tr
                      key={row.dimension}
                      className={
                        i < COMPARISON_TABLE.length - 1
                          ? "border-b border-white/[0.04]"
                          : ""
                      }
                    >
                      <td className="p-4 text-sm font-mono text-white/50">
                        {row.dimension}
                      </td>
                      <td className="p-4 text-sm text-white/70">
                        {row.agenticAI}
                      </td>
                      <td className="p-4 text-sm text-white/30">{row.rpa}</td>
                      <td className="p-4 text-sm text-white/30">
                        {row.workflow}
                      </td>
                      <td className="p-4 text-sm text-white/30">
                        {row.chatbot}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={4}
            className="glass-panel p-8 max-w-3xl"
          >
            <h3 className="font-serif text-xl font-bold mb-4">
              Multi-Agent Architecture in Practice
            </h3>
            <p className="text-white/40 leading-relaxed">
              In a multi-agent system, no single AI does everything. Instead,
              specialized agents collaborate under an orchestrator. One agent
              handles data extraction, another performs analysis, a third
              generates outputs, and a fourth validates quality. They communicate
              through structured protocols, share context through a centralized
              state layer, and escalate to humans only when confidence drops
              below configurable thresholds. The result is a system that handles
              complexity no single automation tool could manage alone.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ================================================================== */}
      {/*  ARCHITECTURE & TECHNOLOGY                                         */}
      {/* ================================================================== */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Architecture" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Our Agentic AI{" "}
            <span className="text-gradient">Architecture</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-16 max-w-3xl"
          >
            Every system we build follows a four-layer architecture designed for
            reliability, observability, and incremental complexity. We do not
            believe in black-box AI. Every decision is traceable, every action is
            logged, and every agent is independently testable.
          </motion.p>

          {/* Architecture Layers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {ARCHITECTURE_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.label}
                variants={fadeInUp}
                custom={i + 2}
                className="glass-panel p-8 relative overflow-hidden group"
              >
                {/* Decorative gradient */}
                <div
                  className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${layer.color} opacity-[0.05] blur-[48px] group-hover:opacity-[0.1] transition-opacity duration-500`}
                />

                <div className="relative">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-2">
                    Layer {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif text-2xl font-bold mb-3">
                    {layer.label}
                  </h3>
                  <p className="text-white/40 leading-relaxed mb-5">
                    {layer.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {layer.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Architecture Flow */}
          <motion.div
            variants={fadeInUp}
            custom={6}
            className="glass-panel p-8 md:p-10"
          >
            <h3 className="font-serif text-xl font-bold mb-6">
              End-to-End Agent Execution Flow
            </h3>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
              {[
                { label: "Trigger", sub: "Webhook / Schedule / Event" },
                { label: "Orchestrator", sub: "n8n Routes to Agents" },
                { label: "Reasoning", sub: "LLM Plans & Decides" },
                { label: "Tool Execution", sub: "APIs, DBs, Services" },
                { label: "Validation", sub: "Quality Check & Retry" },
                { label: "Output", sub: "Action, Report, or Alert" },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-4 md:gap-0 flex-1">
                  <div className="text-center flex-1">
                    <div className="w-10 h-10 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-xs font-mono text-accent-purple">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-white/70">
                      {step.label}
                    </p>
                    <p className="text-[11px] text-white/30 mt-1">{step.sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block w-8 h-px bg-white/[0.08] flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ================================================================== */}
      {/*  USE CASES                                                         */}
      {/* ================================================================== */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Use Cases" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Agentic AI{" "}
            <span className="text-gradient">in the Real World</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-16 max-w-3xl"
          >
            These are not hypothetical scenarios. Each use case is drawn from
            production deployments for real businesses with real constraints and
            real measurable outcomes.
          </motion.p>

          <div className="space-y-8">
            {USE_CASES.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                variants={fadeInUp}
                custom={i + 2}
                className="glass-panel p-8 md:p-10 relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent-purple/[0.04] blur-[64px]" />

                <div className="relative">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-accent-purple"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={useCase.icon}
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-1">
                        Use Case {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-white/30 font-mono mt-1">
                        {useCase.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Challenge */}
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/25 mb-3">
                        The Challenge
                      </p>
                      <p className="text-white/40 leading-relaxed text-sm">
                        {useCase.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/25 mb-3">
                        The Solution
                      </p>
                      <p className="text-white/40 leading-relaxed text-sm">
                        {useCase.solution}
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/25 mb-3">
                        Results
                      </p>
                      <div className="space-y-2">
                        {useCase.results.map((result) => (
                          <div
                            key={result}
                            className="flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                            <span className="text-sm font-mono text-white/60">
                              {result}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ================================================================== */}
      {/*  5-PHASE PROCESS                                                   */}
      {/* ================================================================== */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Our Process" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            From Discovery to{" "}
            <span className="text-gradient">Production in 5 Phases</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-16 max-w-3xl"
          >
            Every engagement follows a structured path from audit to deployment.
            No phase begins until the previous one delivers a concrete artifact.
            You always know exactly where you are and what comes next.
          </motion.p>

          <div className="space-y-6">
            {PROCESS_PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                variants={fadeInUp}
                custom={i + 2}
                className="glass-panel p-8 md:p-10 relative overflow-hidden group"
              >
                <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-accent-purple/[0.04] blur-[48px] group-hover:bg-accent-purple/[0.08] transition-all duration-500" />

                <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start">
                  {/* Phase Number */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <span className="text-4xl font-serif font-bold text-white/10">
                      {phase.phase}
                    </span>
                    <div className="lg:mt-1">
                      <p className="text-xs font-mono text-white/25">
                        {phase.duration}
                      </p>
                      <p className="text-xs font-mono text-accent-purple mt-0.5">
                        {phase.price}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-white/40 leading-relaxed mb-5">
                      {phase.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {phase.deliverables.map((d) => (
                        <span
                          key={d}
                          className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual connector (hidden on mobile) */}
                  <div className="hidden lg:flex items-center justify-center w-8">
                    {i < PROCESS_PHASES.length - 1 && (
                      <div className="w-px h-full bg-white/[0.06]" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ================================================================== */}
      {/*  PRICING                                                           */}
      {/* ================================================================== */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Investment" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Transparent <span className="text-gradient">Pricing</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-16 max-w-3xl"
          >
            No surprise invoices. No scope creep without conversation. Every
            engagement starts with a defined scope, clear deliverables, and a
            price you agree to before work begins.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeInUp}
                custom={i + 2}
                className={`glass-panel p-8 relative overflow-hidden flex flex-col ${
                  tier.highlighted
                    ? "border-accent-purple/20 ring-1 ring-accent-purple/10"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
                )}

                <div className="flex-1">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple mb-3">
                    {tier.name}
                  </p>
                  <p className="font-serif text-2xl font-bold mb-2">
                    {tier.price}
                  </p>
                  <p className="text-sm text-white/30 mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-accent-purple mt-2 flex-shrink-0" />
                        <span className="text-sm text-white/50">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <MagneticButton
                  href={SITE_CONFIG.links.calendly}
                  variant={tier.highlighted ? "primary" : "secondary"}
                  size="sm"
                  className="w-full"
                  trackingLabel={`agentic_pricing_${tier.name.toLowerCase()}`}
                >
                  {tier.cta}
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ================================================================== */}
      {/*  FAQ                                                               */}
      {/* ================================================================== */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="FAQ" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-12"
          >
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </motion.h2>

          <div className="max-w-3xl">
            <div className="glass-panel p-8 md:p-10">
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  index={i}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ================================================================== */}
      {/*  INTERNAL LINKS                                                    */}
      {/* ================================================================== */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Explore More" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-12"
          >
            Related <span className="text-gradient">Services & Work</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERNAL_LINKS.map((link, i) => (
              <motion.div key={link.href} variants={fadeInUp} custom={i + 1}>
                <Link
                  href={link.href}
                  className="glass-panel p-6 block group hover:border-white/[0.12] transition-all duration-300"
                >
                  <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-white transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-sm text-white/30 group-hover:text-white/50 transition-colors">
                    {link.description}
                  </p>
                  <span className="inline-block mt-4 text-xs font-mono text-accent-purple uppercase tracking-[0.15em]">
                    Learn more &rarr;
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ================================================================== */}
      {/*  CTA                                                               */}
      {/* ================================================================== */}
      <CTA />
    </div>
  );
}
