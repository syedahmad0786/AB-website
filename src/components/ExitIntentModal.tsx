"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackFormSubmission } from "@/lib/analytics";

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0) {
      const alreadyShown = sessionStorage.getItem("exit-intent-shown");
      if (alreadyShown) return;

      sessionStorage.setItem("exit-intent-shown", "true");
      setShow(true);
    }
  }, []);

  useEffect(() => {
    // Only trigger after 30 seconds on site
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 30000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setStatus("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "exit-intent",
          message: "Exit intent popup - requested free automation audit",
        }),
      });

      trackFormSubmission("exit_intent");
      setStatus("success");
      setTimeout(() => setShow(false), 3000);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShow(false);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.1] bg-neutral-950/95 backdrop-blur-xl p-8 shadow-[0_0_80px_rgba(139,92,246,0.1)]"
          >
            {/* Close */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] text-white/30 hover:text-white/60 hover:border-white/20 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">You&apos;re on the list!</h3>
                <p className="text-sm text-white/40">I&apos;ll send your free audit within 24 hours.</p>
              </div>
            ) : (
              <>
                {/* Gradient accent */}
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mb-6" />

                <h3 className="text-xl font-bold text-white mb-2">
                  Before you go...
                </h3>
                <p className="text-sm text-white/40 mb-6 leading-relaxed">
                  Get a <span className="text-purple-400 font-medium">free AI automation audit</span> for
                  your business. I&apos;ll identify 3 workflows you can automate to save 10+ hours/week.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Get My Free Audit"}
                  </button>
                </form>

                <p className="text-[10px] text-white/20 text-center mt-4 font-mono">
                  No spam, ever. Your data stays private.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
