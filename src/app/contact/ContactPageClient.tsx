"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { SITE_CONFIG } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import GlowLine from "@/components/ui/GlowLine";
import ContactForm from "@/components/ContactForm";

const CONTACT_METHODS = [
  {
  label: "Discovery Call",
  description:
  "30-minute call to audit your current operations and identify the highest-ROI automation opportunities.",
  action: "Book on Calendly",
  href: SITE_CONFIG.links.calendly,
  },
  {
  label: "Email",
  description:
  "For detailed project briefs, partnership inquiries, or if you prefer async communication.",
  action: "Send Email",
  href: `mailto:${SITE_CONFIG.links.email}`,
  },
  {
  label: "LinkedIn",
  description:
  "Connect for ongoing insights on Agentic AI, automation architecture, and enterprise AI strategy.",
  action: "Connect",
  href: SITE_CONFIG.links.linkedin,
  },
];

export default function ContactPageClient() {
  return (
  <div className="pt-32 pb-20">
  <div className="section-padding">
  {/* Header */}
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="max-w-3xl mb-20"
  >
  <SectionLabel label="Contact" />
  <motion.h1
  variants={fadeInUp}
  className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
  >
  Let&apos;s Talk
  <br />
  <span className="text-gradient">Systems.</span>
  </motion.h1>
  <motion.p
  variants={fadeInUp}
  custom={1}
  className="text-xl text-white/40 leading-relaxed"
  >
  Every engagement starts with a conversation. No pitch decks, no
  fluff - just a direct assessment of where AI automation will
  generate the highest return for your specific operation.
  </motion.p>
  </motion.div>

  <GlowLine />

  {/* Contact Methods */}
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6 py-24"
  >
  {CONTACT_METHODS.map((method, i) => (
  <motion.div
  key={method.label}
  variants={fadeInUp}
  custom={i}
  className="glass-panel-hover p-8 flex flex-col"
  >
  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-purple mb-4">
  {String(i + 1).padStart(2, "0")}
  </span>
  <h3 className="font-serif text-2xl font-bold mb-3">
  {method.label}
  </h3>
  <p className="text-white/40 leading-relaxed flex-1 mb-6">
  {method.description}
  </p>
  <MagneticButton href={method.href} variant="secondary" size="sm">
  {method.action}
  </MagneticButton>
  </motion.div>
  ))}
  </motion.div>

  <GlowLine />

  {/* Contact Form */}
  <section className="py-24">
  <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  >
  <SectionLabel label="Send a Message" />
  <motion.h2
  variants={fadeInUp}
  className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4"
  >
  Prefer to <span className="text-gradient">Write?</span>
  </motion.h2>
  <motion.p
  variants={fadeInUp}
  custom={1}
  className="text-white/40 leading-relaxed mb-12 max-w-2xl"
  >
  Fill out the form below with your project details and I&apos;ll get back to you within 24 hours.
  </motion.p>
  <motion.div
  variants={fadeInUp}
  custom={2}
  className="max-w-2xl"
  >
  <ContactForm />
  </motion.div>
  </motion.div>
  </section>

  <GlowLine />

  {/* FAQ Section for AEO */}
  <section className="py-24">
  <SectionLabel label="FAQ" />
  <motion.h2
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
  >
  Common <span className="text-gradient">Questions</span>
  </motion.h2>

  <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="space-y-6 max-w-3xl"
  >
  {[
  {
  q: "How much does custom AI automation cost?",
  a: "Engagements typically range from $5K for targeted workflow automations to $50K+ for full enterprise agentic AI deployments. Every project is scoped against projected ROI - if the system won't pay for itself within 90 days, I'll tell you upfront.",
  },
  {
  q: "What is Agentic AI and how is it different from standard automation?",
  a: "Standard automation follows fixed rules: if X then Y. Agentic AI systems plan, reason, and adapt. They can handle ambiguous inputs, make multi-step decisions, and self-correct when something breaks - like having a senior employee that never sleeps.",
  },
  {
  q: "What are the benefits of Voice AI for real estate?",
  a: "Voice AI handles inbound calls 24/7, qualifies leads in real-time, books appointments automatically, and follows up on missed calls - all with sub-500ms latency. Real estate firms typically see a 3x increase in qualified appointments and a 67% reduction in missed calls.",
  },
  {
  q: "How long does implementation take?",
  a: "Most production systems are deployed within 2-4 weeks. We start with a focused audit, build in sprints, and ship iteratively so you see value within the first week - not after months of 'discovery phases.'",
  },
  {
  q: "Do you offer ongoing support?",
  a: "Yes. We offer maintenance retainers that include monitoring, optimization, and scaling as your needs grow. The goal is always to build systems your team can eventually maintain independently.",
  },
  ].map((faq, i) => (
  <motion.details
  key={i}
  variants={fadeInUp}
  custom={i}
  className="group glass-panel overflow-hidden"
  >
  <summary className="flex items-center justify-between cursor-pointer p-6 text-white/80 hover:text-white transition-colors">
  <span className="font-medium pr-4">{faq.q}</span>
  <span className="text-accent-purple text-xl flex-shrink-0 group-open:rotate-45 transition-transform duration-300">
  +
  </span>
  </summary>
  <div className="px-6 pb-6 text-white/40 leading-relaxed border-t border-white/[0.04] pt-4">
  {faq.a}
  </div>
  </motion.details>
  ))}
  </motion.div>
  </section>
  </div>
  </div>
  );
}
