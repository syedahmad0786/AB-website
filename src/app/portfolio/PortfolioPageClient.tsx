"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from "@/lib/portfolio-data";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import CTA from "@/components/sections/CTA";

export default function PortfolioPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
  activeCategory === "All"
  ? PORTFOLIO_ITEMS
  : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
  <div className="pt-32">
  <div className="section-padding">
  {/* Header */}
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="max-w-4xl mb-16"
  >
  <SectionLabel label="Portfolio" />
  <motion.h1
  variants={fadeInUp}
  className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
  >
  Built. Deployed.
  <br />
  <span className="text-gradient">Delivering ROI.</span>
  </motion.h1>
  <motion.p
  variants={fadeInUp}
  custom={1}
  className="text-xl text-white/40 leading-relaxed"
  >
  12 production-grade automation systems across ad analytics,
  AI video production, voice AI, CRM automation, and more.
  Real projects. Real metrics. Real impact.
  </motion.p>
  </motion.div>

  {/* Category Filter */}
  <motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
  custom={2}
  className="flex flex-wrap gap-2 mb-16"
  >
  <button
  onClick={() => setActiveCategory("All")}
  className={`px-4 py-2 text-sm font-mono rounded-full border transition-all duration-300 ${
  activeCategory === "All"
  ? "bg-white/10 border-white/20 text-white"
  : "border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/[0.12]"
  }`}
  >
  All ({PORTFOLIO_ITEMS.length})
  </button>
  {PORTFOLIO_CATEGORIES.map((cat) => (
  <button
  key={cat}
  onClick={() => setActiveCategory(cat)}
  className={`px-4 py-2 text-sm font-mono rounded-full border transition-all duration-300 ${
  activeCategory === cat
  ? "bg-white/10 border-white/20 text-white"
  : "border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/[0.12]"
  }`}
  >
  {cat}
  </button>
  ))}
  </motion.div>

  <GlowLine />

  {/* Portfolio Grid */}
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-16"
  >
  {filtered.map((item, i) => (
  <motion.div key={item.slug} variants={fadeInUp} custom={i}>
  <Link href={`/portfolio/${item.slug}`} className="block group">
  <div className="glass-panel-hover h-full flex flex-col overflow-hidden rounded-2xl">
  {/* Thumbnail Image */}
  <div className="relative aspect-[16/10] overflow-hidden">
  <Image
  src={item.heroImage}
  alt={item.title}
  fill
  quality={90}
  placeholder="blur"
  blurDataURL={item.heroBlurDataURL}
  className="object-cover transition-transform duration-700 group-hover:scale-105"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
  <div className="absolute top-4 left-4">
  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
  {item.category}
  </span>
  </div>
  </div>

  <div className="p-6 flex flex-col flex-1">
  {/* Gradient accent bar */}
  <div
  className={`h-1 w-12 rounded-full bg-gradient-to-r ${item.gradient} mb-4 group-hover:w-20 transition-all duration-500`}
  />

  {/* Title */}
  <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-gradient transition-all duration-300">
  {item.title}
  </h3>

  {/* Tagline */}
  <p className="text-sm text-white/40 mb-5 leading-relaxed flex-1">
  {item.tagline}
  </p>

  {/* Tech pills */}
  <div className="flex flex-wrap gap-1.5 mb-5">
  {item.techStack.slice(0, 3).map((tech) => (
  <span
  key={tech}
  className="px-2 py-0.5 text-[10px] font-mono text-white/30 border border-white/[0.06] rounded-full"
  >
  {tech}
  </span>
  ))}
  {item.techStack.length > 3 && (
  <span className="px-2 py-0.5 text-[10px] font-mono text-white/20">
  +{item.techStack.length - 3}
  </span>
  )}
  </div>

  {/* Key metric */}
  <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
  <span className="text-xs text-white/50 font-mono">
  {item.results[0]}
  </span>
  <span className="text-xs text-accent-purple group-hover:translate-x-1 transition-transform duration-300">
  →
  </span>
  </div>
  </div>
  </div>
  </Link>
  </motion.div>
  ))}
  </motion.div>
  </div>

  <GlowLine />
  <CTA />
  </div>
  );
}
