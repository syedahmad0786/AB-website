"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowLine from "@/components/ui/GlowLine";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/lib/constants";
import CTA from "@/components/sections/CTA";

/* ───────────────────────── Data ───────────────────────── */

const CONTENT_PROBLEMS = [
  {
    stat: "4-8",
    label: "pieces/week",
    description:
      "Most marketing teams produce 4 to 8 content pieces per week. That is not enough to stay visible across the platforms your audience uses every day.",
  },
  {
    stat: "40+",
    label: "pieces needed",
    description:
      "Modern distribution demands 40 or more assets per week across blogs, social channels, email, and video. The gap between output and demand keeps growing.",
  },
  {
    stat: "$6K+",
    label: "per writer/mo",
    description:
      "Hiring additional writers, editors, and video producers is expensive and slow to ramp. Quality control and brand voice consistency degrade as teams scale.",
  },
  {
    stat: "72%",
    label: "off-brand",
    description:
      "Without centralized systems, most teams report that a majority of their outsourced or rushed content drifts from brand voice and messaging guidelines.",
  },
];

const PIPELINE_STEPS = [
  {
    phase: "Input",
    title: "Single Source Asset",
    description:
      "Start with one high-value asset: a long-form video, a podcast episode, a webinar recording, or a detailed article. One input feeds the entire engine.",
    items: ["Video recording", "Podcast episode", "Webinar or livestream", "Long-form article"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    phase: "AI Processing",
    title: "Intelligent Extraction",
    description:
      "AI transcribes, analyzes, and deconstructs the source material into structured components. Every key point, quote, and topic is extracted and categorized automatically.",
    items: [
      "Transcription and cleanup",
      "Summary generation",
      "Key point extraction",
      "Topic and theme mapping",
    ],
    color: "from-blue-500 to-purple-600",
  },
  {
    phase: "Content Generation",
    title: "Multi-Format Output",
    description:
      "Each extracted component is transformed into platform-specific content formats, optimized for the unique requirements and best practices of every distribution channel.",
    items: [
      "Blog posts and articles",
      "Twitter/X threads",
      "LinkedIn posts and articles",
      "Instagram captions and carousels",
      "YouTube Shorts scripts",
      "Email newsletter copy",
      "Short-form video clips",
    ],
    color: "from-purple-600 to-accent-purple",
  },
  {
    phase: "Quality Gate",
    title: "Human Review Layer",
    description:
      "Every piece passes through a human approval step before publishing. You maintain full creative control while the system handles the heavy lifting of production.",
    items: [
      "Brand voice verification",
      "Fact-checking layer",
      "Tone and style review",
      "Final approval workflow",
    ],
    color: "from-accent-purple to-pink-500",
  },
  {
    phase: "Distribution",
    title: "Automated Publishing",
    description:
      "Approved content is scheduled and published automatically across all connected platforms. Optimal posting times, hashtag strategies, and cross-promotion are handled by the system.",
    items: [
      "Platform-specific scheduling",
      "Optimal time delivery",
      "Cross-platform syndication",
      "Performance tracking",
    ],
    color: "from-pink-500 to-cyan-500",
  },
];

const PIPELINE_TYPES = [
  {
    title: "Video-to-Everything Pipeline",
    tagline: "1 video becomes an entire content library",
    description:
      "Record a single long-form video and the pipeline handles the rest. AI transcribes, extracts key segments, generates written content for every platform, and produces short-form clips ready for TikTok, Reels, and Shorts. One hour of filming replaces an entire week of content production.",
    outputs: [
      "5 SEO-optimized blog posts",
      "10 social media posts",
      "3 long-form LinkedIn articles",
      "5 short-form video clips",
      "1 email newsletter",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    title: "Blog Content Engine",
    tagline: "From topic to published post, fully automated",
    description:
      "The system researches trending topics in your niche, generates detailed outlines, writes SEO-optimized drafts, and prepares them for publishing. Built-in keyword research ensures every post targets high-intent search terms that drive organic traffic.",
    outputs: [
      "Topic research and selection",
      "Detailed content outlines",
      "Full draft generation",
      "SEO optimization and meta tags",
      "Scheduled publishing",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Social Media Automation",
    tagline: "Content calendar on autopilot",
    description:
      "A complete social media engine that generates your content calendar, writes platform-specific copy, creates AI-generated images and graphics, and schedules everything for optimal engagement. Your brand stays active and consistent without daily manual effort.",
    outputs: [
      "Weekly content calendar",
      "Platform-specific copywriting",
      "AI image generation",
      "Hashtag optimization",
      "Automated scheduling",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: "Newsletter Pipeline",
    tagline: "Curate, write, design, and send automatically",
    description:
      "From content curation to final delivery, this pipeline handles your entire newsletter workflow. AI aggregates relevant industry content, writes engaging commentary, structures the layout, and sends it on schedule. Your audience gets consistent value without you writing a single word.",
    outputs: [
      "Industry content curation",
      "AI-written commentary",
      "Template design and layout",
      "Audience segmentation",
      "Automated send and tracking",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Podcast Repurposing",
    tagline: "Every episode becomes a content goldmine",
    description:
      "Transform every podcast episode into a full suite of derivative content. The system generates show notes, blog recaps, social quotes, audiogram clips, and newsletter features from each recording. One conversation fuels weeks of multi-channel distribution.",
    outputs: [
      "Detailed show notes",
      "Full blog post recap",
      "Social media quote cards",
      "Audiogram clips for sharing",
      "Newsletter feature writeup",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
];

const TECH_STACK_ITEMS = [
  {
    category: "Orchestration",
    tools: ["n8n", "Make.com", "Zapier"],
    description: "Workflow automation platforms that connect every tool in the pipeline and handle scheduling, triggers, and error recovery.",
  },
  {
    category: "AI Writing",
    tools: ["OpenAI GPT-4", "Claude AI", "Gemini"],
    description: "Large language models for generating blog posts, social copy, newsletters, and long-form articles that match your brand voice.",
  },
  {
    category: "Voice & Audio",
    tools: ["11 Labs", "Whisper", "Descript"],
    description: "AI voice synthesis for narration and audiograms, plus automated transcription and audio editing at scale.",
  },
  {
    category: "AI Video",
    tools: ["HeyGen", "Synthesia", "Opus Clip"],
    description: "AI-powered video generation for talking head content, short-form clips, and automated video editing from long-form sources.",
  },
  {
    category: "Image Generation",
    tools: ["Midjourney", "DALL-E", "Canva AI"],
    description: "AI image creation for social graphics, blog hero images, and branded visual content that maintains design consistency.",
  },
  {
    category: "Distribution",
    tools: ["Buffer", "Hootsuite API", "Publer"],
    description: "Automated scheduling and publishing across every social platform with analytics-driven optimal posting times.",
  },
];

const RESULTS = [
  { stat: "10x", label: "Content Output", description: "From 4 pieces per week to 40 or more without increasing team size" },
  { stat: "0", label: "Additional Headcount", description: "Scale production without hiring writers, editors, or social media managers" },
  { stat: "80%", label: "Time Reduction", description: "Cut content production time from days to hours with automated pipelines" },
  { stat: "100%", label: "Brand Consistency", description: "Centralized voice guidelines enforced at every stage of generation" },
];

const PRICING_TIERS = [
  {
    name: "Content Pipeline Setup",
    price: "$6,000 - 10,000",
    description: "A single content pipeline connecting one input type to multiple output formats. Ideal for teams ready to test automation with a specific content workflow.",
    features: [
      "1 pipeline (e.g. video-to-blog)",
      "Up to 3 output formats",
      "Brand voice configuration",
      "Quality review workflow",
      "2-week delivery",
      "30-day post-launch support",
    ],
  },
  {
    name: "Full Content Engine",
    price: "$10,000 - 15,000",
    popular: true,
    description: "A complete content automation system with multiple pipelines, cross-platform distribution, and AI-driven scheduling. The full stack for serious content operations.",
    features: [
      "3-5 connected pipelines",
      "All output formats included",
      "Multi-platform distribution",
      "SEO optimization layer",
      "4-6 week delivery",
      "90-day support and optimization",
    ],
  },
  {
    name: "Monthly Management",
    price: "$2,500 - 5,000/mo",
    description: "Ongoing management, optimization, and expansion of your content automation system. Continuous improvement based on performance data and new platform capabilities.",
    features: [
      "Pipeline monitoring and maintenance",
      "Monthly content strategy review",
      "New format and platform additions",
      "Performance reporting",
      "Priority Slack support",
      "Quarterly system upgrades",
    ],
  },
  {
    name: "Custom Enterprise",
    price: "$15,000+",
    description: "Multi-brand, multi-language, or high-volume content operations requiring custom AI model tuning, advanced approval workflows, and enterprise integrations.",
    features: [
      "Multi-brand and multi-language support",
      "Custom AI model fine-tuning",
      "Enterprise CMS integrations",
      "Advanced approval workflows",
      "Dedicated account management",
      "Custom SLA and support terms",
    ],
  },
];

const FAQS = [
  {
    question: "Will the content sound robotic?",
    answer:
      "No. The system is trained on your existing content, brand guidelines, and voice documentation before generating a single word. Every pipeline includes tone calibration and brand voice enforcement. The output reads like your best writer on their best day, not like a chatbot. And the human review layer catches anything that does not meet your standards before it ever publishes.",
  },
  {
    question: "Do we maintain creative control?",
    answer:
      "Absolutely. Every pipeline includes a human-in-the-loop approval step. Nothing publishes without your sign-off. You can review, edit, approve, or reject any piece before it goes live. The system handles the production heavy lifting while you retain full editorial authority over what represents your brand.",
  },
  {
    question: "What platforms do you support?",
    answer:
      "The system supports all major content platforms including WordPress, Medium, LinkedIn, Twitter/X, Instagram, Facebook, TikTok, YouTube, Substack, ConvertKit, Mailchimp, and more. If a platform has an API or accepts scheduled content, we can connect it. Custom integrations for proprietary CMS systems are available in the Enterprise tier.",
  },
  {
    question: "How do you maintain brand voice across all outputs?",
    answer:
      "During onboarding, we analyze your existing top-performing content and create a detailed brand voice profile. This profile includes tone parameters, vocabulary preferences, messaging frameworks, and style rules that are embedded into every generation prompt. The result is output that sounds consistently like you, regardless of format or platform.",
  },
  {
    question: "What about SEO optimization?",
    answer:
      "SEO is built into the pipeline, not bolted on afterward. The Blog Content Engine includes keyword research, search intent analysis, meta tag generation, internal linking suggestions, and readability scoring. Every blog post is optimized for both search engines and human readers before it reaches your review queue.",
  },
  {
    question: "Can we use our existing content library?",
    answer:
      "Yes, and you should. Your existing content library is a goldmine for repurposing. We can ingest your back catalog of videos, podcasts, blogs, and presentations to generate fresh derivative content from proven material. Many clients see their best ROI from repurposing high-performing historical content they have already created.",
  },
  {
    question: "What is the typical turnaround time?",
    answer:
      "Once the pipeline is built and calibrated, content generation is near-instant. A single video input can produce the full suite of derivative content within 2 to 4 hours, including the human review step. The initial pipeline setup takes 2 to 6 weeks depending on complexity. After launch, the system runs continuously with minimal oversight.",
  },
  {
    question: "Do you handle content strategy too?",
    answer:
      "The Monthly Management tier includes content strategy consultation. We review performance data, identify high-performing topics and formats, and adjust the pipeline configuration to maximize engagement and reach. For teams that need deeper strategic support, we offer dedicated content strategy sessions as part of the Enterprise package.",
  },
];

/* ───────────────────── Components ─────────────────────── */

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="font-serif text-lg font-semibold pr-8 group-hover:text-accent-purple transition-colors duration-300">
          {question}
        </span>
        <span
          className="text-white/40 text-2xl shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-white/40 leading-relaxed max-w-2xl">{answer}</p>
      </motion.div>
    </div>
  );
}

/* ───────────────────── Page ───────────────────────────── */

export default function ContentGenClient() {
  return (
    <div className="pt-32">
      {/* ── Hero ── */}
      <section className="section-padding pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <SectionLabel label="Content Automation" />
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            One Input.
            <br />
            <span className="text-gradient">Infinite Output.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed mb-8 max-w-2xl"
          >
            AI-powered content pipelines that transform a single video, podcast,
            or article into dozens of platform-ready assets. Blogs, social posts,
            video clips, newsletters, and more, generated automatically and
            published on schedule. 10x your content output without adding a
            single person to your team.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-4">
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="lg"
              trackingLabel="content_gen_hero_cta"
            >
              Book a Discovery Call
            </MagneticButton>
            <MagneticButton
              href="/services"
              variant="secondary"
              size="lg"
              trackingLabel="content_gen_hero_services"
            >
              View All Services
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── The Content Problem ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="The Problem" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Your Content Demand Outpaces
            <br />
            <span className="text-gradient">Your Production Capacity</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Every platform demands fresh content daily. Your team cannot keep up
            manually. Hiring more people does not scale. The bottleneck is not
            creativity. It is production.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTENT_PROBLEMS.map((problem, i) => (
              <motion.div
                key={problem.label}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-6 lg:p-8"
              >
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-gradient">
                    {problem.stat}
                  </span>
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-accent-purple/70 mt-1">
                    {problem.label}
                  </p>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── How Content Automation Works ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="The Pipeline" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            How Content Automation Works
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-16 max-w-2xl"
          >
            A five-stage pipeline that takes one source asset and multiplies it
            into dozens of publish-ready pieces, with a human review gate before
            anything goes live.
          </motion.p>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-accent-purple/40 to-pink-500/40 hidden md:block" />

            <div className="space-y-8">
              {PIPELINE_STEPS.map((step, i) => (
                <motion.div
                  key={step.phase}
                  variants={fadeInUp}
                  custom={i}
                  className="relative md:pl-20 lg:pl-24"
                >
                  {/* Step number */}
                  <div className="hidden md:flex absolute left-0 top-0 w-12 h-12 lg:w-16 lg:h-16 items-center justify-center">
                    <div
                      className={`w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1px]`}
                    >
                      <div className="w-full h-full rounded-2xl bg-surface-100 flex items-center justify-center">
                        <span className="text-sm lg:text-base font-mono font-bold text-white/80">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel-hover p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple">
                        {step.phase}
                      </span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <h3 className="font-serif text-xl lg:text-2xl font-bold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/40 leading-relaxed mb-5">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── What We Build ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Pipeline Types" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            What We Build
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Five specialized content pipelines, each designed to eliminate a
            specific production bottleneck. Deploy one or combine them into a
            complete content engine.
          </motion.p>

          <div className="space-y-6">
            {PIPELINE_TYPES.map((pipeline, i) => (
              <motion.div
                key={pipeline.title}
                variants={fadeInUp}
                custom={i}
                className="glass-panel-hover p-6 lg:p-10 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple shrink-0">
                        {pipeline.icon}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl lg:text-2xl font-bold group-hover:text-accent-purple transition-colors duration-300">
                          {pipeline.title}
                        </h3>
                        <p className="text-sm text-accent-purple/60 italic font-serif">
                          {pipeline.tagline}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/40 leading-relaxed">
                      {pipeline.description}
                    </p>
                  </div>

                  {/* Outputs */}
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-3">
                      Outputs
                    </p>
                    <ul className="space-y-2">
                      {pipeline.outputs.map((output) => (
                        <li key={output} className="flex items-start gap-2.5">
                          <CheckIcon />
                          <span className="text-sm text-white/50">{output}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Technology Stack ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Tech Stack" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Technology Stack
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Every pipeline is built on proven, enterprise-grade tools. No
            experimental tech, no vendor lock-in, and full ownership of your
            content and data.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_STACK_ITEMS.map((item, i) => (
              <motion.div
                key={item.category}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-6 lg:p-8"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-3">
                  {item.category}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-mono text-accent-purple/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Results ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Results" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            The Numbers Speak
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Content automation delivers measurable results from day one. These
            are the outcomes our clients see after deploying their pipelines.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESULTS.map((result, i) => (
              <motion.div
                key={result.label}
                variants={fadeInUp}
                custom={i}
                className="relative glass-panel p-8 text-center overflow-hidden"
              >
                {/* Decorative glow */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-accent-purple/[0.06] blur-[48px]" />
                <div className="relative">
                  <span className="text-5xl md:text-6xl font-bold text-gradient">
                    {result.stat}
                  </span>
                  <p className="text-sm font-mono uppercase tracking-[0.15em] text-accent-purple/70 mt-2 mb-3">
                    {result.label}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Before/After callout */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="mt-12 glass-panel p-8 lg:p-10 max-w-2xl mx-auto text-center"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-4">
              Before vs After
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-12">
              <div>
                <span className="text-2xl md:text-3xl font-bold text-white/30">
                  4 posts/week
                </span>
                <p className="text-xs text-white/20 mt-1 font-mono">Manual production</p>
              </div>
              <div className="text-2xl text-accent-purple/60">&rarr;</div>
              <div>
                <span className="text-2xl md:text-3xl font-bold text-gradient">
                  40+ posts/week
                </span>
                <p className="text-xs text-accent-purple/50 mt-1 font-mono">
                  Automated pipeline
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Pricing ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Pricing" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Investment &amp; Pricing
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Transparent pricing based on pipeline complexity and scope. Every
            engagement starts with a free discovery call to define exactly what
            you need.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeInUp}
                custom={i}
                className={`relative glass-panel p-8 lg:p-10 flex flex-col ${
                  tier.popular
                    ? "ring-1 ring-accent-purple/30"
                    : ""
                }`}
              >
                {/* Gradient top border */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-purple/60 to-transparent" />

                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-purple/20 border border-accent-purple/40">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-purple">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-serif text-xl font-bold mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-2xl md:text-3xl font-bold text-gradient mb-3">
                    {tier.price}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href={SITE_CONFIG.links.calendly}
                  variant={tier.popular ? "primary" : "secondary"}
                  size="md"
                  className="w-full"
                  trackingLabel={`content_gen_pricing_${tier.name.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  Book Discovery Call
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── FAQ ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="FAQ" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed mb-12 max-w-2xl"
          >
            Answers to the most common questions about AI content automation.
            If yours is not listed, bring it to the discovery call.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="max-w-3xl">
            {FAQS.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Internal Links ── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel label="Explore More" />
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-8"
          >
            Related Pages
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={1}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Link
              href="/services"
              className="glass-panel-hover p-6 lg:p-8 group block"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-2">
                Services
              </p>
              <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-accent-purple transition-colors duration-300">
                All Services
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Explore the full range of AI automation and consulting services
                available.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="glass-panel-hover p-6 lg:p-8 group block"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-2">
                Pricing
              </p>
              <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-accent-purple transition-colors duration-300">
                Pricing & Plans
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Transparent pricing tiers and a la carte options for every
                budget and scope.
              </p>
            </Link>

            <Link
              href="/free-consultation"
              className="glass-panel-hover p-6 lg:p-8 group block"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-2">
                Free Consultation
              </p>
              <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-accent-purple transition-colors duration-300">
                Free Discovery Call
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Book a 30-minute call to scope your content automation
                opportunity and get a custom roadmap.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── CTA ── */}
      <CTA />
    </div>
  );
}
