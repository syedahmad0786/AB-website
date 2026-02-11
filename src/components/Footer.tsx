"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import GlowLine from "@/components/ui/GlowLine";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="relative mt-32">
  <GlowLine />
  <div className="section-padding py-16">
  <motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-3 gap-12"
  >
  {/* Brand */}
  <div>
  <Logo size="sm" showText={true} />
  <p className="mt-4 text-sm text-white/40 max-w-xs leading-relaxed">
  Architecting autonomous AI systems that replace manual work with
  scalable intelligence. Founder of AiXCEL Solutions.
  </p>
  </div>

  {/* Links */}
  <div>
  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-4">
  Navigation
  </h4>
  <div className="flex flex-col gap-3">
  {NAV_LINKS.map((link) => (
  <Link
  key={link.href}
  href={link.href}
  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
  >
  {link.label}
  </Link>
  ))}
  </div>
  </div>

  {/* Connect */}
  <div>
  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-4">
  Connect
  </h4>
  <div className="flex flex-col gap-3">
  <a
  href={SITE_CONFIG.links.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
  >
  LinkedIn
  </a>
  <a
  href={`mailto:${SITE_CONFIG.links.email}`}
  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
  >
  {SITE_CONFIG.links.email}
  </a>
  <a
  href={SITE_CONFIG.links.calendly}
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
  >
  Schedule a Call
  </a>
  </div>
  </div>
  </motion.div>

  <GlowLine className="mt-12 mb-8" />

  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
  <p className="text-xs text-white/30">
  &copy; {currentYear} Ahmad Bukhari. All rights reserved.
  </p>
  <p className="text-xs text-white/20 font-mono">
  Designed & built with precision.
  </p>
  </div>
  </div>
  </footer>
  );
}
