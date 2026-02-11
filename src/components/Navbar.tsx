"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
  <>
  <motion.header
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
  scrolled
  ? "bg-surface/80 backdrop-blur-xl border-b border-white/[0.06]"
  : "bg-transparent"
  }`}
  >
  <nav className="section-padding flex items-center justify-between h-20">
  {/* Logo */}
  <Link href="/" className="relative group">
  <Logo size="sm" showText={true} />
  </Link>

  {/* Desktop Nav */}
  <div className="hidden md:flex items-center gap-8">
  {NAV_LINKS.map((link) => (
  <Link
  key={link.href}
  href={link.href}
  className="text-sm font-mono text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
  >
  {link.label}
  </Link>
  ))}
  </div>

  {/* CTA */}
  <div className="hidden md:block">
  <MagneticButton href={SITE_CONFIG.links.calendly} size="sm" trackingLabel="nav_book_call">
  Book a Call
  </MagneticButton>
  </div>

  {/* Mobile Toggle */}
  <button
  onClick={() => setMobileOpen(!mobileOpen)}
  className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
  aria-label="Toggle menu"
  >
  <motion.span
  animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
  className="block w-6 h-px bg-white"
  />
  <motion.span
  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
  className="block w-6 h-px bg-white"
  />
  <motion.span
  animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
  className="block w-6 h-px bg-white"
  />
  </button>
  </nav>
  </motion.header>

  {/* Mobile Menu */}
  <AnimatePresence>
  {mobileOpen && (
  <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
  className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl pt-24 px-8 md:hidden"
  >
  <div className="flex flex-col gap-6">
  {NAV_LINKS.map((link, i) => (
  <motion.div
  key={link.href}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: i * 0.1 }}
  >
  <Link
  href={link.href}
  onClick={() => setMobileOpen(false)}
  className="text-3xl font-serif text-white/80 hover:text-white transition-colors block"
  >
  {link.label}
  </Link>
  </motion.div>
  ))}
  <div className="mt-8">
  <MagneticButton href={SITE_CONFIG.links.calendly} size="lg">
  Book a Call
  </MagneticButton>
  </div>
  </div>
  </motion.div>
  )}
  </AnimatePresence>
  </>
  );
}
