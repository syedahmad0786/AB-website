"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { SITE_CONFIG } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import CTA from "@/components/sections/CTA";

type Track = "ai" | "automation" | "leadership" | "voice";

interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  detail: string;
  tracks: Track[];
  metrics: { label: string; value: string }[];
}

const TRACKS: { id: Track | "all"; label: string }[] = [
  { id: "all", label: "All Roles" },
  { id: "ai", label: "AI / Agents" },
  { id: "automation", label: "Automation" },
  { id: "voice", label: "Voice AI" },
  { id: "leadership", label: "Leadership" },
];

const TIMELINE: TimelineEntry[] = [
  {
    period: "Sep 2025 \u2013 Present",
    role: "AI Specialist",
    company: "a global media investment group",
    detail:
      "Architecting fully AI-automated video production systems for YouTube. Deploying content pipelines using OpenAI, Claude, and Gemini with HeyGen/Synthesia integration.",
    tracks: ["ai", "automation"],
    metrics: [
      { label: "Post-production time", value: "-65%" },
      { label: "Capacity scaled", value: "3x" },
    ],
  },
  {
    period: "Mar 2025 \u2013 Present",
    role: "Senior AI Automation Developer",
    company: "a performance marketing consultancy",
    detail:
      "Building multi-agent systems (Ops, Sales, Content, Onboarding, Research) across Make.com, n8n, Zapier, Airtable, GHL, and OpenAI.",
    tracks: ["ai", "automation"],
    metrics: [
      { label: "Workflow efficiency", value: "+60%" },
      { label: "Content creation time", value: "-40%" },
    ],
  },
  {
    period: "May 2025 \u2013 Present",
    role: "AI Automation Expert (Fractional CAiO)",
    company: "a global staffing marketplace",
    detail:
      "Delivering fractional Chief AI Officer services. Building automated research systems, AI-powered workflows, and intelligent dashboards for real-time ROI tracking.",
    tracks: ["ai", "leadership"],
    metrics: [
      { label: "Operational costs", value: "-30-50%" },
      { label: "ROI dashboards", value: "Live" },
    ],
  },
  {
    period: "Feb 2025 \u2013 Present",
    role: "Automation Expert",
    company: "a top-tier agency coaching program",
    detail:
      "Building comprehensive automation infrastructure for 275+ active members. Implementing GHL CRM systems, funnel templates, and automated lead nurture sequences.",
    tracks: ["automation"],
    metrics: [
      { label: "Enrollment conversions", value: "+42%" },
      { label: "Members served", value: "275+" },
    ],
  },
  {
    period: "Jul \u2013 Oct 2025",
    role: "Senior AI Automation Engineer",
    company: "an AI startup incubator",
    detail:
      "Shipped no-code/low-code systems for cohort operations supporting a 10,000+ member community. Automated analytics, lead-to-enrollment funnels, and internal tools.",
    tracks: ["ai", "automation"],
    metrics: [
      { label: "Weekly hours freed", value: "25+" },
      { label: "Community scale", value: "10k+" },
    ],
  },
  {
    period: "Mar \u2013 Aug 2025",
    role: "Senior No Code Developer",
    company: "a creator economy agency",
    detail:
      "Architected no-code data pipelines for creator programs. Implemented CRM stacks and launched scalable content workflows.",
    tracks: ["automation"],
    metrics: [
      { label: "Customer LTV", value: "+45%" },
      { label: "Content output", value: "+250%" },
    ],
  },
  {
    period: "Jan \u2013 Jun 2025",
    role: "CRM & AI Automation Expert",
    company:
      "a B2B lead gen firm / national healthcare marketing / CRM solutions provider",
    detail:
      "Designed custom GHL CRM systems, AI-powered workflows, voice bots and chatbots for appointment booking, and reactivation campaigns.",
    tracks: ["automation", "voice"],
    metrics: [
      { label: "Manual tasks", value: "-70%" },
      { label: "Appointment booking", value: "+50%" },
      { label: "Re-engagement", value: "+35%" },
    ],
  },
  {
    period: "Dec 2022 \u2013 Jan 2025",
    role: "AI Automation Specialist - Founder",
    company: "AiXCEL Solutions",
    detail:
      "Founded and led the agency. Deployed end-to-end automation systems, AI chatbots, and lead generation engines across dozens of clients.",
    tracks: ["leadership", "ai", "automation"],
    metrics: [
      { label: "Workflow efficiency", value: "+60%" },
      { label: "Response times", value: "-50%" },
      { label: "Conversion rates", value: "+35%" },
    ],
  },
];

const SKILL_MATRIX: {
  category: string;
  items: { name: string; level: number }[];
}[] = [
  {
    category: "AI / LLMs",
    items: [
      { name: "OpenAI / GPT-4", level: 95 },
      { name: "Anthropic Claude", level: 92 },
      { name: "Google Gemini", level: 85 },
      { name: "Agentic Architectures", level: 90 },
      { name: "RAG & Vector Stores", level: 82 },
    ],
  },
  {
    category: "Automation",
    items: [
      { name: "n8n", level: 95 },
      { name: "Make.com", level: 92 },
      { name: "Zapier", level: 88 },
      { name: "Pabbly Connect", level: 75 },
    ],
  },
  {
    category: "Voice AI",
    items: [
      { name: "Vapi", level: 90 },
      { name: "Synthflow", level: 85 },
      { name: "Voiceflow", level: 82 },
      { name: "11 Labs", level: 88 },
    ],
  },
  {
    category: "CRM & Ops",
    items: [
      { name: "GoHighLevel", level: 95 },
      { name: "HubSpot", level: 82 },
      { name: "Salesforce", level: 75 },
      { name: "Airtable", level: 90 },
      { name: "ActiveCampaign", level: 78 },
    ],
  },
  {
    category: "Content & Media",
    items: [
      { name: "HeyGen", level: 85 },
      { name: "Synthesia", level: 82 },
      { name: "Webflow", level: 78 },
      { name: "Bubble.io", level: 72 },
    ],
  },
];

const HIGHLIGHTS = [
  { value: "200+", label: "Workflows Deployed", suffix: "" },
  { value: "30+", label: "Hours Saved / Client / Week", suffix: "" },
  { value: "70%", label: "Manual Task Reduction", suffix: "" },
  { value: "9", label: "Years in Automation", suffix: "" },
];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[\d.,]/g, "");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(numeric * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  return (
    <span ref={ref} className="tabular-nums">
      {isNaN(numeric) ? value : `${display}${suffix}`}
    </span>
  );
}

export default function CVPageClient() {
  const [activeTrack, setActiveTrack] = useState<Track | "all">("all");
  const [expanded, setExpanded] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>(
    SKILL_MATRIX[0].category
  );

  const filtered = useMemo(
    () =>
      activeTrack === "all"
        ? TIMELINE
        : TIMELINE.filter((t) => t.tracks.includes(activeTrack as Track)),
    [activeTrack]
  );

  const activeSkills =
    SKILL_MATRIX.find((s) => s.category === activeCategory) ?? SKILL_MATRIX[0];

  return (
    <div className="pt-32 print:pt-8">
      <div className="section-padding">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mb-16"
        >
          <SectionLabel label="Interactive CV" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Nine Years of
            <br />
            <span className="text-gradient">Autonomous Systems.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed max-w-3xl"
          >
            A living resume. Filter by track, expand any role for outcomes, and
            inspect the skill matrix underneath every deployment.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="flex flex-wrap gap-3 mt-8"
          >
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="sm"
              trackingLabel="cv_book_call"
            >
              Book a Call
            </MagneticButton>
            <MagneticButton
              href={SITE_CONFIG.links.linkedin}
              variant="secondary"
              size="sm"
            >
              LinkedIn
            </MagneticButton>
            <MagneticButton
              href={`mailto:${SITE_CONFIG.links.email}`}
              variant="secondary"
              size="sm"
            >
              Email
            </MagneticButton>
          </motion.div>
        </motion.div>

        <GlowLine />

        {/* Highlights */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.label}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="glass-panel p-6 md:p-8"
            >
              <div className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-2">
                <AnimatedCounter value={h.value} />
              </div>
              <div className="text-xs md:text-sm font-mono text-white/40 uppercase tracking-wider">
                {h.label}
              </div>
            </motion.div>
          ))}
        </div>

        <GlowLine />

        {/* Experience */}
        <div className="py-20">
          <SectionLabel label="Experience" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight"
            >
              Filter the <span className="text-gradient">Track</span>
            </motion.h2>

            <div className="flex flex-wrap gap-2">
              {TRACKS.map((t) => {
                const active = activeTrack === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTrack(t.id)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full border transition-all duration-300 ${
                      active
                        ? "bg-gradient-accent text-white border-transparent shadow-glow-sm"
                        : "text-white/50 border-white/[0.08] hover:text-white/90 hover:border-white/[0.2]"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-purple/30 to-transparent hidden md:block"
              aria-hidden
            />
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => {
                  const isOpen = expanded === i;
                  return (
                    <motion.div
                      key={`${item.role}-${item.period}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.4, 0.25, 1],
                        delay: i * 0.05,
                      }}
                      className="glass-panel-hover overflow-hidden"
                    >
                      <button
                        onClick={() => setExpanded(isOpen ? null : i)}
                        className="w-full text-left p-6 md:p-8 grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 md:gap-6 items-start"
                        aria-expanded={isOpen}
                      >
                        <div className="relative">
                          <span className="text-xs font-mono text-accent-purple tracking-[0.15em] uppercase">
                            {item.period}
                          </span>
                          <span
                            className="absolute -left-[calc(0.5rem+1px)] top-2 w-2 h-2 rounded-full bg-accent-purple hidden md:block"
                            aria-hidden
                            style={{ left: "calc(200px - 1rem)" }}
                          />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl md:text-2xl font-semibold mb-1">
                            {item.role}
                          </h3>
                          <p className="text-sm text-white/40 mb-3">
                            {item.company}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.tracks.map((track) => (
                              <span
                                key={track}
                                className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-white/[0.04] text-white/50 border border-white/[0.06]"
                              >
                                {track}
                              </span>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 text-lg shrink-0"
                          aria-hidden
                        >
                          +
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.25, 0.4, 0.25, 1],
                            }}
                          >
                            <div className="px-6 md:px-8 pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                              <div />
                              <div>
                                <p className="text-white/60 leading-relaxed mb-6">
                                  {item.detail}
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {item.metrics.map((m) => (
                                    <div
                                      key={m.label}
                                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                    >
                                      <div className="font-serif text-2xl font-bold text-gradient mb-1">
                                        {m.value}
                                      </div>
                                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                                        {m.label}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <p className="text-white/40 text-sm font-mono py-12 text-center">
                No roles match this track yet.
              </p>
            )}
          </div>
        </div>

        <GlowLine />

        {/* Skill Matrix */}
        <div className="py-20">
          <SectionLabel label="Skill Matrix" />
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-10"
          >
            The <span className="text-gradient">Stack</span>, Calibrated
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {SKILL_MATRIX.map((s) => {
                const active = activeCategory === s.category;
                return (
                  <button
                    key={s.category}
                    onClick={() => setActiveCategory(s.category)}
                    className={`text-left px-5 py-4 rounded-xl border transition-all duration-300 shrink-0 ${
                      active
                        ? "bg-glass-medium border-white/[0.12] text-white"
                        : "border-white/[0.04] text-white/50 hover:text-white/80 hover:border-white/[0.1]"
                    }`}
                  >
                    <div className="font-serif text-lg">{s.category}</div>
                    <div className="text-[11px] font-mono text-white/30 mt-1">
                      {s.items.length} tools
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkills.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 md:p-8 space-y-5"
              >
                {activeSkills.items.map((item, i) => (
                  <div key={item.name}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono text-sm text-white/80">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs text-white/40 tabular-nums">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        transition={{
                          duration: 1,
                          ease: [0.25, 0.4, 0.25, 1],
                          delay: 0.1 + i * 0.05,
                        }}
                        className="h-full bg-gradient-accent"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <GlowLine />

        {/* Education */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <SectionLabel label="Education" />
            <div className="glass-panel p-8">
              <h3 className="font-serif text-2xl font-semibold mb-1">
                BS Economics
              </h3>
              <p className="text-sm text-white/40 mb-4">
                National University of Sciences &amp; Technology (NUST) &middot;
                Islamabad, Pakistan
              </p>
              <p className="text-white/50 leading-relaxed text-sm">
                Quantitative foundation for modeling business processes, ROI
                attribution, and systems thinking - now applied to AI-first
                operations design.
              </p>
            </div>
          </div>
          <div>
            <SectionLabel label="Contact" />
            <div className="glass-panel p-8 space-y-3">
              <a
                href={`mailto:${SITE_CONFIG.links.email}`}
                className="flex items-center justify-between text-white/70 hover:text-white transition-colors group"
              >
                <span className="font-mono text-sm">
                  {SITE_CONFIG.links.email}
                </span>
                <span className="text-white/30 group-hover:text-accent-purple transition-colors">
                  &rarr;
                </span>
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-white/70 hover:text-white transition-colors group"
              >
                <span className="font-mono text-sm">LinkedIn / bukhariahmad</span>
                <span className="text-white/30 group-hover:text-accent-purple transition-colors">
                  &rarr;
                </span>
              </a>
              <a
                href={SITE_CONFIG.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-white/70 hover:text-white transition-colors group"
              >
                <span className="font-mono text-sm">Book a 30-min call</span>
                <span className="text-white/30 group-hover:text-accent-purple transition-colors">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <GlowLine />
      <CTA />
    </div>
  );
}
