"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { SITE_CONFIG } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-accent-purple/[0.04] rounded-full blur-[128px]" />
      </div>

      <div className="relative section-padding text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent-purple mb-6">
            Ready to eliminate manual work?
          </p>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s Build Something
            <br />
            <span className="text-gradient">That Compounds.</span>
          </h2>

          <p className="max-w-lg mx-auto text-white/40 text-lg leading-relaxed mb-12">
            Every week you delay automation, you&apos;re burning budget on tasks a
            system could handle in seconds. Let&apos;s talk about what that
            system looks like for you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href={SITE_CONFIG.links.calendly} size="lg">
              Book a Discovery Call
            </MagneticButton>
            <MagneticButton
              href={`mailto:${SITE_CONFIG.links.email}`}
              variant="secondary"
              size="lg"
            >
              Send an Email
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
