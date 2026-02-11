"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONFIG, TRUSTED_BY } from "@/lib/constants";
import { fadeInUp, staggerContainer, letterStagger, letterChild } from "@/lib/motion";

const HEADLINE = "Stop Renting Your Time.";
const SUBHEADLINE = "Build Systems That Scale Indefinitely.";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
  <section
  ref={containerRef}
  className="relative min-h-screen flex flex-col justify-center overflow-hidden"
  >
  {/* Background Elements */}
  <div className="absolute inset-0">
  {/* Gradient orbs */}
  <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-purple/[0.04] rounded-full blur-[128px] animate-float" />
  <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-blue/[0.03] rounded-full blur-[128px] animate-float [animation-delay:3s]" />
  {/* Grid */}
  <div
  className="absolute inset-0 opacity-[0.015]"
  style={{
  backgroundImage:
  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
  }}
  />
  </div>

  <motion.div
  style={{ opacity, y }}
  className="relative z-10 section-padding pt-32 pb-20"
  >
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="max-w-5xl"
  >
  {/* Kicker */}
  <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
  <div className="h-px w-12 bg-gradient-to-r from-accent-purple to-transparent" />
  <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-purple">
  Agentic AI &middot; Voice AI &middot; Enterprise Automation
  </span>
  </motion.div>

  {/* Headline with letter stagger */}
  <motion.h1
  variants={letterStagger}
  className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4"
  >
  {HEADLINE.split("").map((char, i) => (
  <motion.span
  key={i}
  variants={letterChild}
  className="inline-block"
  >
  {char === " " ? "\u00A0" : char}
  </motion.span>
  ))}
  </motion.h1>

  <motion.h2
  variants={fadeInUp}
  custom={2}
  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight text-gradient mb-8"
  >
  {SUBHEADLINE}
  </motion.h2>

  {/* Subtext */}
  <motion.p
  variants={fadeInUp}
  custom={3}
  className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed font-light mb-12"
  >
  I architect autonomous AI systems and enterprise automation that
  replace headcount with scalable intelligence. Founder of{" "}
  <span className="text-white/80">AiXCEL Solutions</span>.
  </motion.p>

  {/* CTAs */}
  <motion.div
  variants={fadeInUp}
  custom={4}
  className="flex flex-wrap gap-4 mb-20"
  >
  <MagneticButton href={SITE_CONFIG.links.calendly} size="lg" trackingLabel="hero_book_call">
  Book a Discovery Call
  </MagneticButton>
  <MagneticButton href="/services" variant="secondary" size="lg" trackingLabel="hero_view_services">
  View Services
  </MagneticButton>
  </motion.div>

  {/* Trusted By */}
  <motion.div variants={fadeInUp} custom={5}>
  <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/20 mb-6">
  Trusted by forward-thinking teams
  </p>
  <div className="flex flex-wrap items-center gap-8">
  {TRUSTED_BY.map((name, i) => (
  <motion.div
  key={name}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 + i * 0.15 }}
  className="text-sm font-mono text-white/20 hover:text-white/40 transition-colors duration-300"
  >
  {name}
  </motion.div>
  ))}
  </div>
  </motion.div>
  </motion.div>
  </motion.div>

  {/* Scroll indicator */}
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 2 }}
  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
  >
  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
  Scroll
  </span>
  <motion.div
  animate={{ y: [0, 8, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
  />
  </motion.div>
  </section>
  );
}
