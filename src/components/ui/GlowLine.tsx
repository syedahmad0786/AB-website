"use client";

import { motion } from "framer-motion";

export default function GlowLine({ className = "" }: { className?: string }) {
  return (
  <motion.div
  initial={{ scaleX: 0 }}
  whileInView={{ scaleX: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
  className={`glow-line origin-left ${className}`}
  />
  );
}
