"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import CTA from "@/components/sections/CTA";

const CASE_STUDIES = [
  {
  id: "self-healing-crm",
  category: "Agentic AI",
  title: "The Self-Healing CRM",
  client: "Enterprise SaaS",
  challenge:
  "CRM data degraded weekly - duplicate contacts, missing fields, stale pipeline stages. Sales reps spent 6+ hours/week on manual cleanup instead of selling.",
  solution:
  "Deployed a multi-agent system via n8n and OpenAI that continuously audits records, deduplicates contacts, enriches missing data from external APIs, and flags anomalies for human review only when confidence is low.",
  results: [
  { metric: "94%", label: "Reduction in CRM errors" },
  { metric: "12hrs", label: "Saved per rep per week" },
  { metric: "30 days", label: "Full ROI payback" },
  ],
  gradient: "from-blue-500 to-purple-600",
  image: "/images/case-studies/self-healing-crm.png",
  },
  {
  id: "voice-concierge",
  category: "Voice AI",
  title: "24/7 Concierge",
  client: "Real Estate Brokerage",
  challenge:
  "67% of inbound calls went unanswered outside business hours. Each missed call represented $800+ in potential commission. Manual follow-up was inconsistent.",
  solution:
  "Deployed a Vapi-powered voice agent that handles inbound calls 24/7 - qualifying leads, booking showings, answering property FAQs, and routing urgent requests to agents - all with sub-500ms response latency.",
  results: [
  { metric: "3x", label: "Qualified appointments" },
  { metric: "67%", label: "Fewer missed calls" },
  { metric: "<500ms", label: "Response latency" },
  ],
  gradient: "from-purple-500 to-cyan-500",
  image: "/images/case-studies/voice-concierge.png",
  },
  {
  id: "omni-channel-engine",
  category: "Content Automation",
  title: "The Omni-Channel Engine",
  client: "Digital Marketing Agency",
  challenge:
  "Content team was bottlenecked at 4 posts/week across 3 platforms. Client demand required 40+ pieces weekly. Hiring was not viable within budget constraints.",
  solution:
  "Built an end-to-end pipeline: 1 video input triggers automatic transcription, blog generation, social copy variants, short-form clip extraction, and scheduled publishing - all orchestrated through n8n with human-in-the-loop quality gates.",
  results: [
  { metric: "10x", label: "Content output" },
  { metric: "0", label: "Additional headcount" },
  { metric: "4→40", label: "Posts per week" },
  ],
  gradient: "from-cyan-500 to-blue-500",
  image: "/images/case-studies/omni-channel-engine.png",
  },
  {
  id: "zero-touch-onboarding",
  category: "Enterprise Automation",
  title: "Zero-Touch Onboarding",
  client: "Professional Services Firm",
  challenge:
  "Client onboarding took 2-3 days of manual admin: contracts, invoices, Slack setup, project boards, welcome sequences. Staff spent more time onboarding than delivering.",
  solution:
  "Integrated GoHighLevel, Airtable, Slack, and Stripe via n8n. Contract signature triggers: invoice generation, Slack channel creation, project board scaffolding, and a personalized welcome sequence - all in under 90 seconds.",
  results: [
  { metric: "6hrs", label: "Saved per onboarding" },
  { metric: "<90s", label: "Full execution time" },
  { metric: "0", label: "Manual handoffs" },
  ],
  gradient: "from-blue-600 to-purple-500",
  image: "/images/case-studies/zero-touch-onboarding.png",
  },
];

export default function CaseStudiesPageClient() {
  return (
  <div className="pt-32">
  <div className="section-padding">
  {/* Header */}
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="max-w-3xl mb-20"
  >
  <SectionLabel label="Case Studies" />
  <motion.h1
  variants={fadeInUp}
  className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
  >
  Results Speak.
  <br />
  <span className="text-gradient">Numbers Prove.</span>
  </motion.h1>
  <motion.p
  variants={fadeInUp}
  custom={1}
  className="text-xl text-white/40 leading-relaxed"
  >
  Every project below was deployed to production and measured against
  hard business outcomes. No vanity metrics. No hypotheticals.
  </motion.p>
  </motion.div>

  <GlowLine />

  {/* Featured In-Depth Case Study */}
  <motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="py-16"
  >
  <Link href="/case-studies/vendingpreneurs-student-onboarding-automation" className="block glass-panel overflow-hidden group hover:border-white/[0.12] transition-all duration-300">
  <div className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
  <div className="p-8 lg:p-12">
  <div className="flex items-center gap-4 mb-4">
  <span className="text-xs font-mono px-3 py-1 rounded-full bg-glass-light text-accent-purple border border-white/[0.06]">Featured Case Study</span>
  <span className="text-xs font-mono text-white/20">VendingPreneurs</span>
  </div>
  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">From 18 Hours/Week to Under 2 Minutes</h2>
  <p className="text-white/50 leading-relaxed text-lg mb-6 max-w-3xl">How we automated VendingPreneurs&apos; student onboarding with n8n, eliminating 18 hours of weekly manual work and saving $19,800/year in operational costs.</p>
  <div className="grid grid-cols-3 gap-6 mb-6">
  <div><p className="font-serif text-3xl font-bold text-gradient">18hrs</p><p className="text-sm text-white/40 mt-1">Weekly time saved</p></div>
  <div><p className="font-serif text-3xl font-bold text-gradient">$19.8K</p><p className="text-sm text-white/40 mt-1">Annual savings</p></div>
  <div><p className="font-serif text-3xl font-bold text-gradient">598%</p><p className="text-sm text-white/40 mt-1">3-Year ROI</p></div>
  </div>
  <span className="inline-flex items-center gap-2 text-sm font-mono text-accent-purple group-hover:text-white transition-colors">Read full case study <span className="text-lg">&rarr;</span></span>
  </div>
  </Link>
  </motion.div>

  <GlowLine />

  {/* Case Studies */}
  <div className="py-16 space-y-24">
  {CASE_STUDIES.map((study, i) => (
  <motion.article
  key={study.id}
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="glass-panel overflow-hidden"
  >
  {/* Gradient accent bar */}
  <div className={`h-1 bg-gradient-to-r ${study.gradient}`} />

  <div className="p-8 lg:p-12">
  {/* Meta */}
  <div className="flex items-center gap-4 mb-6">
  <span className="text-xs font-mono px-3 py-1 rounded-full bg-glass-light text-accent-purple border border-white/[0.06]">
  {study.category}
  </span>
  <span className="text-xs font-mono text-white/20">
  {study.client}
  </span>
  </div>

  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
  {study.title}
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
  {/* Challenge */}
  <div>
  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-3">
  Challenge
  </h3>
  <p className="text-white/50 leading-relaxed text-sm">
  {study.challenge}
  </p>
  </div>

  {/* Solution */}
  <div className="lg:col-span-2">
  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-3">
  Solution
  </h3>
  <p className="text-white/50 leading-relaxed text-sm">
  {study.solution}
  </p>
  </div>
  </div>

  {/* Results */}
  <div className="border-t border-white/[0.06] pt-8">
  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-6">
  Results
  </h3>
  <div className="grid grid-cols-3 gap-6">
  {study.results.map((result) => (
  <div key={result.label}>
  <p className="font-serif text-3xl md:text-4xl font-bold text-gradient">
  {result.metric}
  </p>
  <p className="text-sm text-white/40 mt-1">
  {result.label}
  </p>
  </div>
  ))}
  </div>
  </div>

  {/* Case Study Visual */}
  <div className="mt-10 relative aspect-[21/9] rounded-xl overflow-hidden border border-white/[0.04]">
  <Image
  src={study.image}
  alt={`${study.title} - System Architecture`}
  fill
  quality={90}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 90vw"
  />
  </div>
  </div>
  </motion.article>
  ))}
  </div>
  </div>

  <GlowLine />
  <CTA />
  </div>
  );
}
