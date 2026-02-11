"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import type { PortfolioItem } from "@/lib/portfolio-data";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";

export default function PortfolioDetailClient({ item }: { item: PortfolioItem }) {
  return (
  <div className="pt-32">
  <div className="section-padding">
  {/* Back link */}
  <motion.div
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  className="mb-12"
  >
  <Link
  href="/portfolio"
  className="text-sm font-mono text-white/30 hover:text-white/60 transition-colors inline-flex items-center gap-2"
  >
  <span>←</span> All Projects
  </Link>
  </motion.div>

  {/* Header */}
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="max-w-4xl mb-12"
  >
  <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
  <div
  className={`h-1 w-16 rounded-full bg-gradient-to-r ${item.gradient}`}
  />
  <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/30">
  {item.category}
  </span>
  </motion.div>

  <motion.h1
  variants={fadeInUp}
  custom={1}
  className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
  >
  {item.title}
  </motion.h1>

  <motion.p
  variants={fadeInUp}
  custom={2}
  className="text-xl md:text-2xl text-gradient font-serif font-medium mb-8"
  >
  {item.tagline}
  </motion.p>

  <motion.p
  variants={fadeInUp}
  custom={3}
  className="text-lg text-white/40 leading-relaxed"
  >
  {item.overview}
  </motion.p>
  </motion.div>

  {/* Hero Blueprint Image */}
  <motion.div
  initial={{ opacity: 0, y: 30, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
  className="relative mb-20 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(139,92,246,0.08)]"
  >
  <div className="relative aspect-[16/9]">
  <Image
  src={item.heroImage}
  alt={`${item.title} - System Blueprint`}
  fill
  quality={95}
  placeholder="blur"
  blurDataURL={item.heroBlurDataURL}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
  priority
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
  </div>
  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
  <span className="text-xs font-mono text-white/40 tracking-wider uppercase">System Blueprint</span>
  <span className={`text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-white/50`}>
  {item.category}
  </span>
  </div>
  </motion.div>

  <GlowLine />

  {/* Deliverables & Results Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-24">
  {/* Deliverables */}
  <motion.div
  variants={slideInLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  >
  <h2 className="font-serif text-2xl font-bold mb-8">
  Key <span className="text-gradient">Deliverables</span>
  </h2>
  <div className="space-y-4">
  {item.deliverables.map((d, i) => (
  <motion.div
  key={i}
  initial={{ opacity: 0, x: -10 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.1 }}
  className="flex items-start gap-3"
  >
  <span
  className={`mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient} flex-shrink-0`}
  />
  <span className="text-white/50 leading-relaxed">{d}</span>
  </motion.div>
  ))}
  </div>
  </motion.div>

  {/* Results */}
  <motion.div
  variants={slideInRight}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  >
  <h2 className="font-serif text-2xl font-bold mb-8">
  Measurable <span className="text-gradient">Results</span>
  </h2>
  <div className="space-y-4">
  {item.results.map((r, i) => (
  <motion.div
  key={i}
  initial={{ opacity: 0, x: 10 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.1 }}
  className="glass-panel p-5"
  >
  <span className="text-white/70 font-medium">{r}</span>
  </motion.div>
  ))}
  </div>

  {/* Clients */}
  {item.clientCount > 0 && (
  <div className="mt-10">
  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/25 mb-4">
  Clients Served
  </h3>
  <div className="flex items-center gap-4 mb-4">
  <span className={`text-3xl font-serif font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
  {item.clientCount}+
  </span>
  <span className="text-sm text-white/40">
  clients across
  </span>
  </div>
  <div className="flex flex-wrap gap-3">
  {item.clientIndustries.map((industry) => (
  <span
  key={industry}
  className="px-3 py-1.5 text-sm font-mono text-white/40 border border-white/[0.06] rounded-full"
  >
  {industry}
  </span>
  ))}
  </div>
  </div>
  )}
  </motion.div>
  </div>

  {/* Architecture Flowchart */}
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  className="py-20"
  >
  <h2 className="font-serif text-2xl font-bold mb-8">
  System <span className="text-gradient">Architecture</span>
  </h2>
  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_40px_rgba(139,92,246,0.06)] group">
  <div className="relative aspect-[16/9]">
  <Image
  src={item.architectureImage}
  alt={`${item.title} - Architecture Flowchart`}
  fill
  quality={95}
  placeholder="blur"
  blurDataURL={item.architectureBlurDataURL}
  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
  </div>
  <div className="absolute bottom-0 left-0 right-0 p-5">
  <span className="text-xs font-mono text-white/40 tracking-wider uppercase">Technical Architecture</span>
  </div>
  </div>
  </motion.div>

  <GlowLine />

  {/* Tech Stack */}
  <div className="py-24">
  <h2 className="font-serif text-2xl font-bold mb-8">
  Tech <span className="text-gradient">Stack</span>
  </h2>
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="flex flex-wrap gap-3"
  >
  {item.techStack.map((tech, i) => (
  <motion.span
  key={tech}
  variants={fadeInUp}
  custom={i}
  className="px-5 py-2.5 text-sm font-mono text-white/50 border border-white/[0.06] rounded-full bg-glass-light hover:bg-glass-medium hover:text-white/80 hover:border-white/[0.12] transition-all duration-300"
  >
  {tech}
  </motion.span>
  ))}
  </motion.div>
  </div>

  <GlowLine />

  {/* CTA */}
  <div className="py-24 text-center">
  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
  Want results <span className="text-gradient">like this?</span>
  </h2>
  <p className="text-white/40 mb-8 max-w-xl mx-auto">
  Every system I build is scoped against projected ROI. If it
  will not pay for itself within 90 days, I will tell you upfront.
  </p>
  <div className="flex flex-wrap justify-center gap-4">
  <MagneticButton href={SITE_CONFIG.links.calendly} size="lg">
  Book a Discovery Call
  </MagneticButton>
  <MagneticButton href="/portfolio" variant="secondary" size="lg">
  View More Projects
  </MagneticButton>
  </div>
  </div>
  </div>
  </div>
  );
}
