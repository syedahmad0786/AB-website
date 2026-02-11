"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { trackFormSubmission } from "@/lib/analytics";

const SERVICE_OPTIONS = [
  { value: "agentic-ai", label: "Agentic AI Systems" },
  { value: "voice-ai", label: "Voice AI & Telephony" },
  { value: "content-automation", label: "Content Automation" },
  { value: "enterprise-automation", label: "Enterprise Automation" },
  { value: "ai-consulting", label: "AI Consulting" },
  { value: "other", label: "Other / Not Sure" },
];

const BUDGET_OPTIONS = [
  { value: "", label: "Select budget range (optional)" },
  { value: "under-5k", label: "Under $5K" },
  { value: "5k-15k", label: "$5K - $15K" },
  { value: "15k-50k", label: "$15K - $50K" },
  { value: "50k-plus", label: "$50K+" },
  { value: "not-sure", label: "Not Sure Yet" },
];

const inputClass =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white/90 placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 text-sm";

const selectClass =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white/90 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 text-sm appearance-none cursor-pointer";

const labelClass =
  "block text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2";

const errorClass = "text-xs text-red-400/80 mt-1.5 font-mono";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact-form" }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      trackFormSubmission("contact_form");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Message Sent</h3>
            <p className="text-white/40 mb-6">
              I typically respond within 24 hours. Looking forward to connecting.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-mono"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  Name <span className="text-purple-400">*</span>
                </label>
                <input
                  {...register("name")}
                  placeholder="Your full name"
                  className={inputClass}
                />
                {errors.name && (
                  <p className={errorClass}>{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>
                  Email <span className="text-purple-400">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@company.com"
                  className={inputClass}
                />
                {errors.email && (
                  <p className={errorClass}>{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Company</label>
                <input
                  {...register("company")}
                  placeholder="Your company name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Interest & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  Service Interest <span className="text-purple-400">*</span>
                </label>
                <div className="relative">
                  <select {...register("interest")} className={selectClass}>
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-neutral-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.interest && (
                  <p className={errorClass}>{errors.interest.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Budget Range</label>
                <div className="relative">
                  <select {...register("budget")} className={selectClass}>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-neutral-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>
                Message <span className="text-purple-400">*</span>
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Tell me about your project, goals, and timeline..."
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p className={errorClass}>{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-400/80 font-mono">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
