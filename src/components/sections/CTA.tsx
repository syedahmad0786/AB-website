"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { SITE_CONFIG } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import { trackFormSubmission } from "@/lib/analytics";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Homepage Visitor",
          email,
          source: "homepage-cta",
          message: "Quick email capture from homepage CTA section",
        }),
      });

      if (!res.ok) throw new Error("Failed");
      trackFormSubmission("homepage_cta_email");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

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

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <MagneticButton href={SITE_CONFIG.links.calendly} size="lg" trackingLabel="cta_book_call">
              Book a Discovery Call
            </MagneticButton>
            <MagneticButton
              href={`mailto:${SITE_CONFIG.links.email}`}
              variant="secondary"
              size="lg"
              trackingLabel="cta_send_email"
            >
              Send an Email
            </MagneticButton>
          </div>

          {/* Inline Email Capture */}
          <div className="max-w-md mx-auto">
            <p className="text-xs font-mono text-white/25 uppercase tracking-[0.15em] mb-4">
              Or leave your email and I&apos;ll reach out
            </p>
            {status === "success" ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-400/80 font-mono"
              >
                Got it! I&apos;ll be in touch shortly.
              </motion.p>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-5 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-purple-500/40 transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-sm text-white/60 hover:text-white hover:bg-white/[0.1] transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                >
                  {status === "loading" ? "..." : "Submit"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400/60 mt-2 font-mono">
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
