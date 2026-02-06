"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceIcon from "@/components/ui/ServiceIcon";
import GlowLine from "@/components/ui/GlowLine";

export default function ServicesGrid() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/[0.02] rounded-full blur-[128px]" />

      <div className="section-padding">
        <SectionLabel label="What I Build" />

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
        >
          Precision-Engineered
          <br />
          <span className="text-gradient">AI Systems</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="max-w-xl text-white/40 text-lg mb-16 leading-relaxed"
        >
          Every engagement is architected around measurable ROI. These are not
          experiments — they are production systems that pay for themselves.
        </motion.p>

        <GlowLine className="mb-16" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => (
            <Link
              key={service.id}
              href={`/services#${service.id}`}
              className="group"
            >
            <motion.div
              variants={fadeInUp}
              custom={i}
              className="glass-panel-hover p-8 flex flex-col h-full"
            >
              {/* Icon + Tag */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-[1px]`}
                >
                  <div className="w-full h-full rounded-xl bg-surface-100 flex items-center justify-center">
                    <ServiceIcon
                      icon={service.icon}
                      className="text-white/80"
                    />
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/20 group-hover:text-white/40 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>

              {/* Tagline */}
              <p className="text-sm text-white/30 italic mb-4">
                {service.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-white/50 leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              {/* Use Case Preview */}
              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-purple/60 mb-2">
                  Featured Use Case
                </p>
                <p className="text-sm font-medium text-white/70">
                  {service.useCase.name}
                </p>
              </div>

              {/* Outcomes */}
              <div className="mt-4 flex flex-wrap gap-2">
                {service.outcomes.map((outcome) => (
                  <span
                    key={outcome}
                    className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/[0.03] text-white/30 border border-white/[0.04]"
                  >
                    {outcome}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-white/20 group-hover:text-accent-purple transition-colors duration-300">
                <span>Explore</span>
                <svg
                  className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
