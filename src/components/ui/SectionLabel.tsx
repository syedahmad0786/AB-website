"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className = "" }: SectionLabelProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex items-center gap-3 mb-6 ${className}`}
    >
      <div className="h-px w-8 bg-accent-purple" />
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple">
        {label}
      </span>
    </motion.div>
  );
}
