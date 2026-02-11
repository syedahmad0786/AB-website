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

/* ───────────────────────────── data ───────────────────────────── */

const capabilities = [
  {
    title: "Lead Research & Enrichment",
    description:
      "AI agents scrape company data, identify decision-makers, map org charts, and analyze tech stacks before a single email is sent. Every prospect receives outreach that proves you did the homework.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "Personalized Outreach",
    description:
      "AI-crafted emails that reference specific pain points, recent funding rounds, job postings, and competitive moves. No templates. Every message reads like a thoughtful human wrote it.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Multi-Channel Sequences",
    description:
      "Email, LinkedIn connection requests, LinkedIn DMs, and SMS coordinated into intelligent sequences. Each channel reinforces the others without feeling spammy or repetitive.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Smart Follow-ups",
    description:
      "Behavior-based follow-up timing that adapts to opens, clicks, and replies. AI handles objections, answers questions, and knows when to push and when to pause.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Meeting Booking",
    description:
      "Calendar integration with qualification screening built in. AI confirms availability, handles timezone logic, sends calendar invites, and pre-qualifies leads before they hit your calendar.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Pipeline Handoff",
    description:
      "CRM sync, lead scoring, conversation history, and sales team notifications all automated. Your closers get a warm, contextualized handoff instead of a cold name on a spreadsheet.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

const pipelineSteps = [
  { step: "01", label: "ICP Definition", detail: "Define your ideal customer profile and targeting criteria" },
  { step: "02", label: "Lead Sourcing", detail: "Identify and extract prospects from multiple databases" },
  { step: "03", label: "AI Research", detail: "Deep-dive into each prospect's company and pain points" },
  { step: "04", label: "Personalized Copy", detail: "AI generates unique messaging for every contact" },
  { step: "05", label: "Multi-Channel Send", detail: "Coordinated outreach across email, LinkedIn, and SMS" },
  { step: "06", label: "Response Handling", detail: "AI manages replies, objections, and questions" },
  { step: "07", label: "Meeting Booked", detail: "Qualified meetings land directly on your calendar" },
  { step: "08", label: "CRM Sync", detail: "All data, notes, and history pushed to your CRM" },
];

const comparisonData = {
  headers: ["Metric", "AI SDR", "Traditional SDR", "Manual Outreach"],
  rows: [
    ["Cost / Month", "$3K-6K", "$6K-10K+ (salary + tools)", "$500-2K (tools only)"],
    ["Emails / Day", "500+", "50-80", "10-20"],
    ["Personalization Level", "Hyper-personalized", "Semi-personalized", "Template-based"],
    ["Working Hours", "24/7/365", "8 hrs/day, 5 days/week", "As time permits"],
    ["Ramp Time", "1-2 weeks", "2-3 months", "Immediate (low quality)"],
    ["Consistency", "100% consistent", "Variable by rep", "Highly variable"],
    ["Multi-Channel", "Email + LinkedIn + SMS", "Mostly email", "Single channel"],
    ["Data Enrichment", "Automated & real-time", "Manual research", "Minimal"],
  ],
};

const useCases = [
  {
    vertical: "B2B SaaS",
    description:
      "Product-led outreach to free trial users who stalled, churned accounts ready for re-engagement, and expansion signals within existing customer base. AI identifies in-product behavior patterns and crafts outreach that references exact features the prospect explored.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    vertical: "Agencies",
    description:
      "Niche-targeted outreach to potential clients based on industry, company size, and specific pain points your agency solves. AI monitors job postings, funding rounds, and tech stack changes to identify companies actively in-market for your services.",
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    vertical: "Professional Services",
    description:
      "Decision-maker targeting at enterprise accounts with multi-threading across buying committees. AI identifies the right stakeholders across procurement, technical, and executive functions, then sequences outreach that builds consensus from multiple entry points.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    vertical: "Startups",
    description:
      "Early traction without hiring an SDR team. Get your first 50-100 qualified meetings booked while you focus on product and fundraising. AI handles the entire top-of-funnel so founders can close deals instead of sourcing them.",
    gradient: "from-blue-600 to-purple-500",
  },
];

const metrics = [
  { value: "3x", label: "More Qualified Meetings", detail: "vs. manual outbound efforts" },
  { value: "70%", label: "Lower Cost Per Acquisition", detail: "compared to traditional SDR hire" },
  { value: "500+", label: "Personalized Emails / Day", detail: "each uniquely crafted by AI" },
  { value: "45%", label: "Average Open Rates", detail: "vs. 15-20% industry average" },
];

const pricingTiers = [
  {
    name: "Setup & Launch",
    price: "$8,000 - $15,000",
    period: "one-time",
    description: "Full AI SDR infrastructure build, ICP definition, domain setup, and sequence creation.",
    features: [
      "ICP & buyer persona research",
      "Domain procurement & warmup",
      "Email infrastructure setup",
      "AI personalization engine configuration",
      "Initial sequence creation (3-5 sequences)",
      "CRM integration & pipeline mapping",
      "LinkedIn automation setup",
      "Deliverability optimization",
    ],
  },
  {
    name: "Monthly Management",
    price: "$3,000 - $6,000",
    period: "per month",
    description: "Ongoing AI SDR operations, optimization, and scaling of your outbound engine.",
    features: [
      "500+ personalized emails per day",
      "Multi-channel sequence management",
      "A/B testing & copy optimization",
      "Lead list building & enrichment",
      "Response handling & qualification",
      "Weekly performance reporting",
      "Deliverability monitoring",
      "Sequence refresh & iteration",
    ],
    highlighted: true,
  },
  {
    name: "Performance Add-on",
    price: "$500",
    period: "per qualified meeting",
    description: "Pay-for-performance pricing aligned with your pipeline goals. Optional add-on.",
    features: [
      "Qualified meeting = matches ICP criteria",
      "Verified decision-maker attendance",
      "Pre-meeting brief delivered",
      "No cap on monthly meetings",
      "Transparent tracking dashboard",
      "Aligned incentives with your growth",
    ],
  },
];

const faqs = [
  {
    question: "Will emails land in spam?",
    answer:
      "No. We set up dedicated sending domains with proper SPF, DKIM, and DMARC authentication. Every domain goes through a 2-3 week warmup period before any outreach begins. We monitor deliverability daily and maintain sender reputation scores above 95%. Our infrastructure is specifically designed to avoid spam filters while maintaining high volume.",
  },
  {
    question: "How personalized are the messages?",
    answer:
      "Every email is unique. AI researches each prospect individually, referencing their company's recent news, job postings, tech stack, competitive landscape, and specific pain points relevant to your solution. These are not mail-merge templates with a first name swapped in. Each message reads like a thoughtful, researched outreach from a senior sales professional.",
  },
  {
    question: "What tools do you use?",
    answer:
      "Our stack includes Instantly, Smartlead, or Lemlist for email infrastructure, Clay or Apollo for data enrichment, LinkedIn Sales Navigator for social selling, OpenAI and Claude for AI personalization, and n8n for orchestration. The exact stack is customized based on your needs, existing tools, and target market.",
  },
  {
    question: "How many meetings can I expect?",
    answer:
      "Results vary by industry, ICP, and offer, but most clients see 15-40 qualified meetings per month within 60 days of launch. During the first 30 days (domain warmup + initial sequences), expect 5-15 meetings. By month three, optimized sequences typically deliver 25-50+ meetings per month.",
  },
  {
    question: "Do you handle LinkedIn outreach too?",
    answer:
      "Yes. LinkedIn is a core part of our multi-channel approach. We automate connection requests, profile views, and direct messages that are coordinated with email sequences. When a prospect sees your email and then gets a LinkedIn connection request referencing the same topic, response rates increase significantly.",
  },
  {
    question: "What about domain warmup?",
    answer:
      "We handle the entire domain warmup process. We procure 3-5 sending domains per client, configure all DNS records, and run a 2-3 week automated warmup that gradually increases sending volume. This protects your primary domain reputation while building deliverability for your outbound infrastructure.",
  },
  {
    question: "Can this integrate with our CRM?",
    answer:
      "Absolutely. We integrate with Salesforce, HubSpot, Pipedrive, Close, and most major CRMs. All prospect data, email conversations, lead scores, and meeting details sync automatically. Your sales team sees the full context of every AI-generated conversation directly in their existing workflow.",
  },
  {
    question: "What is the minimum commitment?",
    answer:
      "We recommend a minimum 3-month engagement to see meaningful results. The first month covers setup and warmup, months two and three are when optimization and scaling happen. After the initial period, clients continue on a month-to-month basis. Most clients stay for 6-12+ months as the system compounds in performance.",
  },
];

/* ───────────────────────────── component ───────────────────────────── */

export default function AISDRClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-32">
      {/* ────────── HERO ────────── */}
      <section className="section-padding pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <SectionLabel label="AI SDR Services" />

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            An SDR That Never
            <br />
            <span className="text-gradient">Stops Prospecting.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed max-w-2xl mb-10"
          >
            AI-powered sales development that prospects, qualifies, and books meetings
            around the clock. Hyper-personalized outreach at scale across email, LinkedIn,
            and SMS. Your pipeline never sleeps.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-4">
            <MagneticButton href={SITE_CONFIG.links.calendly} size="lg" trackingLabel="aisdr_hero_book_call">
              Book a Discovery Call
            </MagneticButton>
            <MagneticButton href="/services" variant="secondary" size="lg" trackingLabel="aisdr_hero_all_services">
              All Services
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── WHAT IS AN AI SDR ────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <SectionLabel label="What Is an AI SDR" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            Your Top-of-Funnel,{" "}
            <span className="text-gradient">Fully Automated.</span>
          </motion.h2>

          <motion.div variants={fadeInUp} custom={1} className="space-y-6 text-white/50 text-lg leading-relaxed">
            <p>
              An AI SDR is an autonomous sales agent that handles every activity a human
              sales development representative performs at the top of your funnel. It
              identifies prospects that match your ideal customer profile, researches their
              company and individual pain points, crafts personalized outreach, manages
              multi-step follow-up sequences, handles objections in real time, and books
              qualified meetings directly on your sales team&apos;s calendar.
            </p>
            <p>
              Unlike mass email tools that blast the same template to thousands of contacts,
              an AI SDR operates with intelligence. It reads annual reports, monitors job
              postings, tracks funding announcements, analyzes tech stack data, and weaves
              those signals into outreach that feels like it came from a senior account
              executive who spent twenty minutes researching each prospect.
            </p>
            <p>
              The difference between an AI SDR and a traditional email automation platform is
              the difference between a chess engine and a random number generator. Both make
              moves, but only one understands the game. AI SDRs coordinate across email,
              LinkedIn, and SMS simultaneously, adapting timing and messaging based on
              prospect behavior, and escalating to human sales reps only when a prospect is
              genuinely ready to talk.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── CAPABILITIES ────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Capabilities" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Everything a Great SDR Does.{" "}
            <span className="text-gradient">At Machine Scale.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/40 text-lg leading-relaxed max-w-2xl mb-16"
          >
            Six core capabilities working in concert to fill your pipeline with qualified
            opportunities, not just activity metrics.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                variants={fadeInUp}
                custom={i}
                className="glass-panel-hover p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/[0.06] flex items-center justify-center text-accent-purple mb-5 group-hover:border-accent-purple/30 transition-colors duration-500">
                  {cap.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{cap.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{cap.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── PIPELINE VISUALIZATION ────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="How It Works" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            From ICP to{" "}
            <span className="text-gradient">Booked Meeting.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/40 text-lg leading-relaxed max-w-2xl mb-16"
          >
            An eight-stage pipeline that transforms your ideal customer profile into
            qualified calendar events, fully automated.
          </motion.p>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
            >
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  custom={i}
                  className="text-center group"
                >
                  <div className="relative mx-auto w-16 h-16 rounded-full bg-glass-medium border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-accent-purple/40 transition-all duration-500">
                    <span className="text-xs font-mono text-accent-purple font-semibold">
                      {step.step}
                    </span>
                  </div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-white/30 leading-snug hidden md:block">
                    {step.detail}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── COMPARISON TABLE ────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Comparison" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            AI SDR vs Traditional SDR vs{" "}
            <span className="text-gradient">Manual Outreach.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/40 text-lg leading-relaxed max-w-2xl mb-16"
          >
            A side-by-side breakdown of cost, capacity, and quality across three
            approaches to outbound sales.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  {comparisonData.headers.map((header, i) => (
                    <th
                      key={header}
                      className={`py-4 px-4 text-left font-mono text-xs uppercase tracking-[0.15em] ${
                        i === 1 ? "text-accent-purple" : "text-white/40"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={`py-4 px-4 text-sm ${
                          cellIdx === 0
                            ? "font-mono text-white/60 text-xs uppercase tracking-wider"
                            : cellIdx === 1
                            ? "text-white/80 font-medium"
                            : "text-white/40"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── USE CASES ────────── */}
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Built for Teams That{" "}
            <span className="text-gradient">Need Pipeline Now.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/40 text-lg leading-relaxed max-w-2xl mb-16"
          >
            Whether you are a funded startup without a sales team or an established company
            looking to scale outbound, AI SDRs adapt to your market.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.vertical}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 relative overflow-hidden"
              >
                <div
                  className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${uc.gradient} opacity-[0.06] blur-[48px]`}
                />
                <h3 className="font-serif text-2xl font-bold mb-3">{uc.vertical}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{uc.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── RESULTS METRICS ────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Results" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
          >
            Numbers That{" "}
            <span className="text-gradient">Move Pipeline.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 text-center"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-2">
                  {metric.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/70 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-white/30">{metric.detail}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── PRICING ────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Pricing" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Transparent Pricing.{" "}
            <span className="text-gradient">Real ROI.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/40 text-lg leading-relaxed max-w-2xl mb-16"
          >
            Every engagement starts with infrastructure that is built to last, followed
            by ongoing management that compounds in performance month over month.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeInUp}
                custom={i}
                className={`glass-panel p-8 relative overflow-hidden ${
                  tier.highlighted
                    ? "border-accent-purple/30 shadow-glow"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
                )}

                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-3">
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-3xl font-bold">{tier.price}</span>
                </div>
                <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-4">
                  {tier.period}
                </p>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-2 shrink-0" />
                      <span className="text-sm text-white/50">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={4}
            className="mt-10 text-center"
          >
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="lg"
              trackingLabel="aisdr_pricing_book_call"
            >
              Discuss Your Outbound Goals
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── FAQ ────────── */}
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
          >
            Common Questions About{" "}
            <span className="text-gradient">AI SDRs.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="glass-panel overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-serif text-lg font-semibold pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-accent-purple shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-white/40 leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── INTERNAL LINKS ────────── */}
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
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-10"
          >
            Related <span className="text-gradient">Resources.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { href: "/services", label: "All Services", description: "Explore the full range of AI automation services" },
              { href: "/pricing", label: "Pricing", description: "Transparent pricing across all service tiers" },
              { href: "/free-consultation", label: "Free Consultation", description: "Book a no-obligation strategy session" },
              { href: "/case-studies", label: "Case Studies", description: "See real results from real engagements" },
            ].map((link, i) => (
              <motion.div key={link.href} variants={fadeInUp} custom={i}>
                <Link
                  href={link.href}
                  className="glass-panel-hover p-6 block group"
                >
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-white/70 group-hover:text-accent-purple transition-colors duration-300 mb-2">
                    {link.label}
                  </h3>
                  <p className="text-xs text-white/30">{link.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-accent-purple/60 group-hover:text-accent-purple transition-colors duration-300">
                    <span>View</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ────────── CTA ────────── */}
      <CTA />
    </div>
  );
}
