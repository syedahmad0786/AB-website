"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";

export default function TechStack() {
  return (
  <section className="relative py-24 overflow-hidden">
  <div className="section-padding">
  <SectionLabel label="Stack" />

  <motion.h2
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
  >
  Tools of the <span className="text-gradient">Trade</span>
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
  className="px-4 py-2 text-sm font-mono text-white/50 border border-white/[0.06] rounded-full bg-glass-light hover:bg-glass-medium hover:text-white/80 hover:border-white/[0.12] transition-all duration-300 cursor-default"
  >
  {tech}
  </motion.span>
  ))}
  </motion.div>
  </div>
  </section>
  );
}
