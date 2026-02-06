"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceIcon from "@/components/ui/ServiceIcon";
import GlowLine from "@/components/ui/GlowLine";
import CTA from "@/components/sections/CTA";

function ServiceDetail({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <article
      id={service.id}
      className="relative py-24 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Content Side */}
        <motion.div
          variants={isEven ? slideInLeft : slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={isEven ? "" : "lg:order-2"}
        >
          {/* Number + Icon */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-[1px]`}
            >
              <div className="w-full h-full rounded-2xl bg-surface-100 flex items-center justify-center">
                <ServiceIcon icon={service.icon} className="text-white/80 w-7 h-7" />
              </div>
            </div>
            <span className="text-xs font-mono text-white/20 tracking-[0.15em]">
              SERVICE {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            {service.title}
          </h2>

          <p className="text-lg text-accent-purple/70 italic font-serif mb-6">
            {service.tagline}
          </p>

          <p className="text-white/50 text-lg leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Outcomes */}
          <div className="flex flex-wrap gap-3 mb-8">
            {service.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-light border border-white/[0.06]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                <span className="text-sm font-mono text-white/60">{outcome}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Use Case Card */}
        <motion.div
          variants={isEven ? slideInRight : slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={isEven ? "" : "lg:order-1"}
        >
          <div className="glass-panel p-8 lg:p-10 relative overflow-hidden">
            {/* Decorative gradient */}
            <div
              className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-[0.06] blur-[64px]`}
            />

            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-3">
              Use Case
            </p>
            <h3 className="font-serif text-2xl font-bold mb-4">
              {service.useCase.name}
            </h3>
            <p className="text-white/50 leading-relaxed">
              {service.useCase.detail}
            </p>

            {/* Visual placeholder */}
            <div className="mt-8 aspect-[16/9] rounded-xl bg-surface-200 border border-white/[0.04] flex items-center justify-center">
              <span className="text-xs font-mono text-white/15 tracking-widest uppercase">
                Visual Asset
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}

export default function ServicesPageClient() {
  return (
    <div className="pt-32">
      <div className="section-padding">
        {/* Page Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mb-16"
        >
          <SectionLabel label="Services" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            What Gets Built.
            <br />
            <span className="text-gradient">What Gets Measured.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed"
          >
            Every system I deploy is measured against one metric: does it
            replace manual work with compounding returns? If it does not
            generate more value than it costs, it does not ship.
          </motion.p>
        </motion.div>

        <GlowLine />

        {/* Service Details */}
        {SERVICES.map((service, i) => (
          <div key={service.id}>
            <ServiceDetail service={service} index={i} />
            {i < SERVICES.length - 1 && <GlowLine />}
          </div>
        ))}
      </div>

      <GlowLine />
      <CTA />
    </div>
  );
}
