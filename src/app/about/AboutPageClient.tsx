"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import { TECH_STACK, SITE_CONFIG } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import CTA from "@/components/sections/CTA";

const TIMELINE = [
  {
  period: "Sep 2025 \u2013 Present",
  role: "AI Specialist",
  company: "a global media investment group",
  detail:
  "Architecting fully AI-automated video production systems for YouTube. Deploying content pipelines using OpenAI, Claude, and Gemini with HeyGen/Synthesia integration, reducing post-production time by 65% and scaling capacity by 300%.",
  },
  {
  period: "Mar 2025 \u2013 Present",
  role: "Senior AI Automation Developer",
  company: "a performance marketing consultancy",
  detail:
  "Building advanced AI automation agents for marketing, sales, and data analysis. Deployed multi-agent systems (Ops, Sales, Content, Onboarding, Research) across Make.com, n8n, Zapier, Airtable, GHL, and OpenAI. Improved workflow efficiency by 60%, reduced content creation times by 40%.",
  },
  {
  period: "May 2025 \u2013 Present",
  role: "AI Automation Expert (Fractional CAiO)",
  company: "a global staffing marketplace",
  detail:
  "Delivering fractional Chief AI Officer services to multiple clients. Building automated research systems, AI-powered workflows reducing operational costs by 30-50%, and intelligent dashboards for real-time ROI tracking.",
  },
  {
  period: "Feb 2025 \u2013 Present",
  role: "Automation Expert",
  company: "a top-tier agency coaching program",
  detail:
  "Building comprehensive automation infrastructure for 275+ active members. Implementing GHL CRM systems, pre-built funnel templates, and automated lead nurture sequences increasing enrollment conversions by 42%.",
  },
  {
  period: "Jul \u2013 Oct 2025",
  role: "Senior AI Automation Engineer",
  company: "an AI startup incubator",
  detail:
  "Shipped no-code/low-code systems for cohort operations supporting a 10,000+ member community. Automated analytics, lead-to-enrollment funnels, and internal tools freeing 25+ hours weekly for high-value coaching.",
  },
  {
  period: "Mar \u2013 Aug 2025",
  role: "Senior No Code Developer",
  company: "a creator economy agency",
  detail:
  "Architected no-code data pipelines for creator programs. Implemented CRM stacks increasing customer LTV by 45%, launched scalable content workflows increasing output by 250%.",
  },
  {
  period: "Jan \u2013 Jun 2025",
  role: "CRM & AI Automation Expert",
  company: "a B2B lead generation firm / a national healthcare marketing firm / a CRM solutions provider",
  detail:
  "Designed custom GHL CRM systems, AI-powered workflows reducing manual tasks by 70%, voice bots and chatbots improving appointment booking by 50%, and reactivation campaigns increasing re-engagement by 35%.",
  },
  {
  period: "Dec 2022 \u2013 Jan 2025",
  role: "AI Automation Specialist",
  company: "AiXCEL Solutions (Founder)",
  detail:
  "Founded and led the agency. Deployed end-to-end automation systems improving workflow efficiency by 60%, built AI chatbots reducing response times by 50%, and automated lead generation enhancing conversion rates by 35%.",
  },
];

export default function AboutPageClient() {
  return (
  <div className="pt-32">
  <div className="section-padding">
  {/* Header */}
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="max-w-4xl mb-20"
  >
  <SectionLabel label="About" />
  <motion.h1
  variants={fadeInUp}
  className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
  >
  The Architect Behind
  <br />
  <span className="text-gradient">the Automation.</span>
  </motion.h1>
  <motion.p
  variants={fadeInUp}
  custom={1}
  className="text-xl text-white/40 leading-relaxed"
  >
  I do not build tools. I build systems - autonomous, measurable, and
  designed to make themselves indispensable from week one.
  </motion.p>
  </motion.div>

  <GlowLine />

  {/* Bio Section */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-24">
  <motion.div
  variants={slideInLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  >
  {/* Portrait */}
  <div className="aspect-[3/4] max-w-md rounded-2xl bg-surface-200 border border-white/[0.04] overflow-hidden relative group">
  <Image
  src="/images/ahmad-bukhari.jpg"
  alt="Ahmad Bukhari - AI Automation Architect"
  fill
  quality={95}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgAD/8QAHRAAAgIBBQAAAAAAAAAAAAAAAAECEgMRMUFRYf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQACIf/aAAwDAQACEQMRAD8Awi8dZWWsuPAg7JbItl6zG//Z"
  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
  sizes="(max-width: 768px) 100vw, 400px"
  priority
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/90" />
  <div className="absolute inset-0 border border-white/[0.06] rounded-2xl" />
  </div>
  </motion.div>

  <motion.div
  variants={slideInRight}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="flex flex-col justify-center"
  >
  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
  Syed Muhammad Ahmad Bukhari
  </h2>

  <p className="text-sm font-mono text-white/30 mb-4">
  BS Economics, NUST &middot; Islamabad, Pakistan
  </p>

  <div className="space-y-4 text-white/50 leading-relaxed">
  <p>
  I started <span className="text-white/80">AiXCEL Solutions</span> with
  one conviction: the majority of &quot;work&quot; inside modern businesses
  is not work at all - it is repetition masquerading as productivity.
  Data entry, lead routing, follow-up sequences, reporting - none of
  it requires human judgment, yet it consumes human time.
  </p>
  <p>
  Since then, I have implemented <span className="text-white/80">200+
  automation workflows</span> across n8n, Make.com, and Zapier, saving
  clients an average of 30+ hours per week. I have built AI agents that
  increased lead conversions by 40%, reduced manual task handling by 70%,
  and cut content production time in half.
  </p>
  <p>
  My approach is surgical. I audit your operations, identify the
  highest-ROI automation targets, and deploy production-grade
  systems - typically within 2-4 weeks - that start generating
  returns immediately. Not proofs-of-concept. Not demos. Working
  systems.
  </p>
  <p>
  I also extend that same rigor to team training and fractional Chief AI
  Officer services. Because the best automation is the one your team
  understands, maintains, and evolves long after the engagement ends.
  </p>
  </div>

  <div className="mt-8">
  <MagneticButton href={SITE_CONFIG.links.linkedin} variant="secondary">
  Connect on LinkedIn
  </MagneticButton>
  </div>
  </motion.div>
  </div>

  <GlowLine />

  {/* Timeline */}
  <div className="py-24">
  <SectionLabel label="Experience" />
  <motion.h2
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
  >
  Professional <span className="text-gradient">Journey</span>
  </motion.h2>

  <div className="space-y-8">
  {TIMELINE.map((item, i) => (
  <motion.div
  key={i}
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={i}
  className="glass-panel p-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6"
  >
  <div>
  <span className="text-xs font-mono text-accent-purple tracking-[0.15em] uppercase">
  {item.period}
  </span>
  </div>
  <div>
  <h3 className="font-serif text-xl font-semibold mb-1">
  {item.role}
  </h3>
  <p className="text-sm text-white/40 mb-3">{item.company}</p>
  <p className="text-white/50 leading-relaxed">{item.detail}</p>
  </div>
  </motion.div>
  ))}
  </div>
  </div>

  <GlowLine />

  {/* Tech Stack */}
  <div className="py-24">
  <SectionLabel label="Tools" />
  <motion.h2
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
  >
  Technical <span className="text-gradient">Arsenal</span>
  </motion.h2>

  <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="flex flex-wrap gap-3"
  >
  {TECH_STACK.map((tech, i) => (
  <motion.span
  key={tech}
  variants={fadeInUp}
  custom={i}
  className="px-4 py-2 text-sm font-mono text-white/50 border border-white/[0.06] rounded-full bg-glass-light hover:bg-glass-medium hover:text-white/80 hover:border-white/[0.12] transition-all duration-300"
  >
  {tech}
  </motion.span>
  ))}
  </motion.div>
  </div>
  </div>

  <GlowLine />
  <CTA />
  </div>
  );
}
