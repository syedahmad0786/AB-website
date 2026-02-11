"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { trackFormSubmission } from "@/lib/analytics";

export default function BlogCTA({ postTitle }: { postTitle: string }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "blog-cta",
          message: `Inquiry from blog: ${postTitle}`,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      trackFormSubmission("blog_cta");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto my-12 rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-8 text-center"
      >
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white/70 font-medium">Thanks! I&apos;ll be in touch shortly.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto my-12"
    >
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.06] to-blue-500/[0.06] p-8">
        <h3 className="text-lg font-semibold text-white mb-2">
          Want systems like this built for your business?
        </h3>
        <p className="text-sm text-neutral-400 mb-6">
          Drop your details and I&apos;ll send a free automation audit within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
          >
            {status === "loading" ? "Sending..." : "Get Free Audit"}
          </button>
        </form>

        {status === "error" && (
          <p className="text-xs text-red-400/70 mt-3 font-mono">
            Something went wrong. Try again or email me directly.
          </p>
        )}
      </div>
    </motion.div>
  );
}
