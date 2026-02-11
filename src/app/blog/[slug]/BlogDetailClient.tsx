"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog-data";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio-data";
import BlogCTA from "@/components/BlogCTA";

function renderMarkdown(content: string) {
  const blocks = content.split("\n\n");
  const elements: React.ReactNode[] = [];

  blocks.forEach((block, idx) => {
  const trimmed = block.trim();
  if (!trimmed) return;

  // H2
  if (trimmed.startsWith("## ")) {
  elements.push(
  <motion.h2
  key={idx}
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.5 }}
  className="text-2xl md:text-3xl font-bold mt-14 mb-6 text-white"
  >
  {trimmed.slice(3)}
  </motion.h2>
  );
  return;
  }

  // Bullet list
  if (trimmed.startsWith("- ")) {
  const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
  elements.push(
  <motion.ul
  key={idx}
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.4 }}
  className="space-y-3 my-6"
  >
  {items.map((item, j) => {
  const text = item.slice(2);
  return (
  <li key={j} className="flex items-start gap-3">
  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
  <span
  className="text-neutral-300 leading-relaxed"
  dangerouslySetInnerHTML={{
  __html: formatInline(text),
  }}
  />
  </li>
  );
  })}
  </motion.ul>
  );
  return;
  }

  // Bold heading paragraph: **Title** - Description
  const boldHeadingMatch = trimmed.match(/^\*\*(.+?)\*\*\s*-\s*([\s\S]+)$/);
  if (boldHeadingMatch) {
  const titleText = boldHeadingMatch[1].trim();
  const bodyText = boldHeadingMatch[2].trim();
  elements.push(
  <motion.div
  key={idx}
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.4 }}
  className="my-6 pl-5 border-l-2 border-purple-500/30"
  >
  <p className="text-neutral-200">
  <strong className="text-white">{titleText}</strong>
  {bodyText && (
  <span className="text-neutral-400"> - {bodyText}</span>
  )}
  </p>
  </motion.div>
  );
  return;
  }

  // Regular paragraph
  elements.push(
  <motion.p
  key={idx}
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.4 }}
  className="text-neutral-400 leading-[1.85] my-5"
  dangerouslySetInnerHTML={{
  __html: formatInline(trimmed),
  }}
  />
  );
  });

  return elements;
}

function formatInline(text: string): string {
  return text
  .replace(
  /\*\*(.+?)\*\*/g,
  '<strong class="text-neutral-200 font-semibold">$1</strong>'
  )
  .replace(
  /\*(.+?)\*/g,
  '<em class="text-neutral-300">$1</em>'
  );
}

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  const relatedPortfolio = PORTFOLIO_ITEMS.find(
  (p) => p.slug === post.portfolioSlug
  );

  return (
  <article className="relative min-h-screen pt-32 pb-24 px-6">
  {/* Back Link */}
  <div className="max-w-3xl mx-auto mb-12">
  <Link
  href="/blog"
  className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-purple-400 transition-colors group"
  >
  <svg
  className="w-4 h-4 transition-transform group-hover:-translate-x-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
  >
  <path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M7 16l-4-4m0 0l4-4m-4 4h18"
  />
  </svg>
  Back to Blog
  </Link>
  </div>

  {/* Header */}
  <header className="max-w-3xl mx-auto mb-16">
  <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="flex items-center gap-4 mb-6"
  >
  <span className="text-xs font-mono uppercase tracking-wider text-purple-400 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5">
  {post.category}
  </span>
  <span className="text-xs text-neutral-600 font-mono">
  {post.readTime} read
  </span>
  <span className="text-xs text-neutral-600 font-mono">
  {new Date(post.publishedAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  })}
  </span>
  </motion.div>

  <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="text-3xl md:text-5xl font-bold leading-tight mb-6"
  >
  {post.title}
  </motion.h1>

  <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-lg text-neutral-400 leading-relaxed"
  >
  {post.excerpt}
  </motion.p>

  {/* Tags */}
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="flex flex-wrap gap-2 mt-8"
  >
  {post.tags.map((tag) => (
  <span
  key={tag}
  className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.06] text-neutral-500 bg-white/[0.02]"
  >
  {tag}
  </span>
  ))}
  </motion.div>

  {/* Divider */}
  <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
  </header>

  {/* Featured Image - Architecture Flowchart */}
  <motion.div
  initial={{ opacity: 0, y: 20, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
  className="max-w-4xl mx-auto mb-16"
  >
  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_50px_rgba(139,92,246,0.06)]">
  <div className="relative aspect-[16/9]">
  <Image
  src={post.featuredImage}
  alt={`${post.title} - Technical Architecture`}
  fill
  quality={95}
  placeholder="blur"
  blurDataURL={post.featuredBlurDataURL}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
  priority
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
  </div>
  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
  <span className="text-xs font-mono text-white/40 tracking-wider uppercase">Technical Architecture</span>
  <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-white/50">
  {post.category}
  </span>
  </div>
  </div>
  </motion.div>

  {/* Article Body */}
  <div className="max-w-3xl mx-auto">
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  >
  {renderMarkdown(post.content)}
  </motion.div>
  </div>

  {/* Blog CTA - Lead Capture */}
  <BlogCTA postTitle={post.title} />

  {/* Blueprint Visual */}
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  className="max-w-4xl mx-auto mt-16 mb-8"
  >
  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_40px_rgba(139,92,246,0.06)] group">
  <div className="relative aspect-[16/9]">
  <Image
  src={post.blueprintImage}
  alt={`${post.title} - System Blueprint`}
  fill
  quality={95}
  placeholder="blur"
  blurDataURL={post.blueprintBlurDataURL}
  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
  </div>
  <div className="absolute bottom-0 left-0 right-0 p-5">
  <span className="text-xs font-mono text-white/40 tracking-wider uppercase">System Blueprint</span>
  </div>
  </div>
  </motion.div>

  {/* Related Portfolio Link */}
  {relatedPortfolio && (
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="max-w-3xl mx-auto mt-20"
  >
  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
  <p className="text-xs font-mono uppercase tracking-wider text-purple-400/60 mb-4">
  Related Case Study
  </p>
  <h3 className="text-xl font-semibold mb-3">
  {relatedPortfolio.title}
  </h3>
  <p className="text-sm text-neutral-500 mb-6">
  {relatedPortfolio.tagline}
  </p>
  <Link
  href={`/portfolio/${relatedPortfolio.slug}`}
  className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group"
  >
  View full case study
  <svg
  className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
  )}

  {/* Author / CTA */}
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="max-w-3xl mx-auto mt-12"
  >
  <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-purple-500/[0.04] to-blue-500/[0.04] p-8 text-center">
  <p className="text-xs font-mono uppercase tracking-wider text-neutral-600 mb-3">
  Written by
  </p>
  <h4 className="text-lg font-semibold mb-2">Ahmad Bukhari</h4>
  <p className="text-sm text-neutral-500 mb-6">
  AI Automation Architect - building autonomous systems that
  eliminate manual work
  </p>
  <Link
  href="/contact"
  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm text-white font-medium hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300"
  >
  Work with Ahmad
  </Link>
  </div>
  </motion.div>
  </article>
  );
}
