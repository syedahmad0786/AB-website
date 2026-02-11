"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
  opacity: 1,
  y: 0,
  transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
  activeCategory === "All"
  ? BLOG_POSTS
  : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
  <section className="relative min-h-screen pt-32 pb-24 px-6">
  {/* Header */}
  <div className="max-w-5xl mx-auto text-center mb-16">
  <motion.p
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4 font-mono"
  >
  Blog & Insights
  </motion.p>
  <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="text-4xl md:text-6xl font-bold mb-6"
  >
  Deep Dives Into{" "}
  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
  AI Automation
  </span>
  </motion.h1>
  <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-lg text-neutral-400 max-w-2xl mx-auto"
  >
  Real-world case studies, technical breakdowns, and strategic insights
  from building 200+ production automation workflows.
  </motion.p>
  </div>

  {/* Category Filter */}
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="max-w-5xl mx-auto flex flex-wrap justify-center gap-3 mb-16"
  >
  {["All", ...BLOG_CATEGORIES].map((cat) => (
  <button
  key={cat}
  onClick={() => setActiveCategory(cat)}
  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
  activeCategory === cat
  ? "bg-white/10 border-purple-500/60 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]"
  : "border-white/[0.06] text-neutral-500 hover:text-neutral-300 hover:border-white/10"
  }`}
  >
  {cat}
  </button>
  ))}
  </motion.div>

  {/* Blog Grid */}
  <div className="max-w-5xl mx-auto">
  <AnimatePresence mode="wait">
  <motion.div
  key={activeCategory}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
  className="grid md:grid-cols-2 gap-8"
  >
  {filtered.map((post, i) => (
  <motion.div
  key={post.slug}
  custom={i}
  initial="hidden"
  animate="visible"
  variants={fadeUp}
  >
  <Link href={`/blog/${post.slug}`} className="group block h-full">
  <article className="relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(168,85,247,0.06)]">
  {/* Thumbnail Image */}
  <div className="relative aspect-[16/9] overflow-hidden">
  <Image
  src={post.featuredImage}
  alt={post.title}
  fill
  quality={90}
  placeholder="blur"
  blurDataURL={post.featuredBlurDataURL}
  className="object-cover transition-transform duration-700 group-hover:scale-105"
  sizes="(max-width: 768px) 100vw, 50vw"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
  <div className="absolute top-4 left-4">
  <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
  {post.category}
  </span>
  </div>
  <div className="absolute top-4 right-4">
  <span className="text-[10px] font-mono text-white/60 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
  {post.readTime}
  </span>
  </div>
  </div>

  <div className="p-7">
  {/* Title */}
  <h2 className="text-lg font-semibold mb-3 text-neutral-200 group-hover:text-white transition-colors duration-300 leading-tight">
  {post.title}
  </h2>

  {/* Excerpt */}
  <p className="text-sm text-neutral-500 mb-5 leading-relaxed line-clamp-2">
  {post.excerpt}
  </p>

  {/* Tags */}
  <div className="flex flex-wrap gap-2 mb-5">
  {post.tags.slice(0, 3).map((tag) => (
  <span
  key={tag}
  className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.06] text-neutral-500 bg-white/[0.02]"
  >
  {tag}
  </span>
  ))}
  </div>

  {/* Read More */}
  <div className="flex items-center gap-2 text-sm text-purple-400/70 group-hover:text-purple-400 transition-colors">
  <span>Read article</span>
  <svg
  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
  >
  <path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M17 8l4 4m0 0l-4 4m4-4H3"
  />
  </svg>
  </div>
  </div>

  {/* Bottom accent line */}
  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </article>
  </Link>
  </motion.div>
  ))}
  </motion.div>
  </AnimatePresence>
  </div>

  {/* CTA */}
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="max-w-3xl mx-auto mt-24 text-center"
  >
  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12">
  <h3 className="text-2xl font-semibold mb-4">
  Want these systems built for your business?
  </h3>
  <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
  Every article is based on real production work. Let&apos;s discuss
  how to apply these automation strategies to your operation.
  </p>
  <Link
  href="/contact"
  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300"
  >
  Start a Conversation
  <svg
  className="w-4 h-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
  >
  <path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M17 8l4 4m0 0l-4 4m4-4H3"
  />
  </svg>
  </Link>
  </div>
  </motion.div>
  </section>
  );
}
