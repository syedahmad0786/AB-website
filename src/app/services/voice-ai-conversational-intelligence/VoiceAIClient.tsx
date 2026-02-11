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

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const HERO_STATS = [
  { value: "<500ms", label: "Response Latency" },
  { value: "24/7", label: "Availability" },
  { value: "95%+", label: "Call Resolution Rate" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & Call Audit",
    description:
      "We start by mapping every inbound and outbound call flow your team handles today. We analyze call recordings, document common objections, identify drop-off points, and quantify the revenue leaking through missed or mishandled calls. This audit becomes the blueprint for your AI voice agent.",
    timeline: "Week 1",
  },
  {
    num: "02",
    title: "Voice Agent Design",
    description:
      "Using your call audit data, we architect the conversational flows, decision trees, and escalation logic. We select the optimal voice personality, define the knowledge base structure, and map every integration point with your CRM, calendar, and internal systems. Every branch is designed to mirror how your best human rep handles calls.",
    timeline: "Week 1-2",
  },
  {
    num: "03",
    title: "Build & Integration",
    description:
      "We build the voice agent on the platform best suited to your use case — VAPI for maximum customization, Synthflow for rapid deployment, or Voiceflow for complex multi-turn conversations. Simultaneously, we wire up CRM integrations, calendar booking, call recording, and real-time transcription pipelines.",
    timeline: "Week 2-3",
  },
  {
    num: "04",
    title: "Testing & Calibration",
    description:
      "Before a single live call, we run hundreds of simulated conversations covering edge cases, objection handling, accent variation, and background noise scenarios. We fine-tune latency, adjust tone and pacing, and calibrate the escalation thresholds until the agent performs at or above human benchmark levels.",
    timeline: "Week 3-4",
  },
  {
    num: "05",
    title: "Launch & Optimization",
    description:
      "We deploy the agent to a controlled subset of your call volume, monitor every conversation in real time, and iterate daily. Within the first two weeks of live calls, we typically achieve a 30-40% improvement in key metrics. Ongoing optimization is driven by call analytics, sentiment scoring, and weekly performance reviews.",
    timeline: "Week 4+",
  },
];

const USE_CASES = [
  {
    industry: "Agencies & Service Businesses",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
    title: "AI Receptionist for Call Routing & Booking",
    description:
      "Deploy an AI receptionist that answers every call within two rings, qualifies the inquiry based on your ideal client profile, and books meetings directly into your calendar. No more missed leads. No more phone tag. Agencies using our voice agents report a 3x increase in booked consultations and a 67% reduction in missed inbound calls.",
    metrics: ["3x booked consultations", "67% fewer missed calls", "Zero hold time"],
  },
  {
    industry: "Coaches & Consultants",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
    title: "Automated Discovery Call Screening & Qualification",
    description:
      "Your AI voice agent conducts structured discovery calls, asks your pre-defined qualification questions, scores the lead in real time, and only forwards high-intent prospects to your calendar. Low-quality leads receive a polite redirect to self-serve resources. Coaches using this system save 15+ hours per week previously spent on unqualified calls.",
    metrics: ["15+ hours saved weekly", "40% higher close rates", "Automated lead scoring"],
  },
  {
    industry: "SaaS Companies",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Technical Support Triage & Escalation",
    description:
      "Handle Tier-1 support calls entirely through AI. The voice agent identifies the issue category, walks the caller through common troubleshooting steps, creates a support ticket with full context if the issue requires human intervention, and routes the escalation to the right specialist. SaaS teams deploying this see a 60% reduction in average handle time and a 45% decrease in escalation volume.",
    metrics: ["60% faster resolution", "45% fewer escalations", "Full ticket context on handoff"],
  },
  {
    industry: "Real Estate",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "24/7 Property Inquiry Handling & Showing Bookings",
    description:
      "Never miss a buyer inquiry again. Your AI voice agent answers property-related questions using your listing data, qualifies buyer intent and budget range, and books showing appointments directly into your agents' calendars. After-hours calls convert at 2.5x higher rates because prospects get instant responses instead of voicemail. One brokerage added $2.3M in pipeline within 90 days of deployment.",
    metrics: ["2.5x after-hours conversion", "$2.3M pipeline added in 90 days", "Instant showing bookings"],
  },
];

const CAPABILITIES = [
  {
    title: "Natural Language Understanding",
    description:
      "Advanced NLU models that understand context, intent, and nuance across diverse accents, dialects, and speaking styles. Your voice agent comprehends what callers mean, not just what they say.",
  },
  {
    title: "Multi-Turn Conversations",
    description:
      "Agents that maintain context across complex, multi-step conversations. They remember what was said earlier, handle interruptions gracefully, and guide callers toward resolution without losing the thread.",
  },
  {
    title: "CRM Integration",
    description:
      "Native integrations with GoHighLevel, HubSpot, Salesforce, Zoho, and Pipedrive. Every call automatically logs contact data, updates deal stages, and triggers follow-up sequences in your existing CRM.",
  },
  {
    title: "Call Recording & Transcription",
    description:
      "Every conversation is recorded and transcribed in real time with speaker diarization. Transcripts are searchable, exportable, and automatically attached to the relevant CRM record for full audit trails.",
  },
  {
    title: "Sentiment Analysis",
    description:
      "Real-time emotional intelligence that detects caller frustration, excitement, or hesitation. The agent adjusts its tone, pace, and approach dynamically, and flags high-emotion calls for immediate human review.",
  },
  {
    title: "Multi-Language Support",
    description:
      "Deploy voice agents that converse fluently in English, Spanish, French, German, Arabic, Hindi, and 20+ additional languages. Language detection is automatic, and agents switch seamlessly mid-conversation when needed.",
  },
  {
    title: "Custom Voice Cloning",
    description:
      "Create a branded voice identity unique to your business. Using advanced voice synthesis from ElevenLabs and PlayHT, we can clone existing voices or craft entirely new ones that embody your brand personality.",
  },
  {
    title: "Calendar Integration",
    description:
      "Direct booking into Calendly, Cal.com, GoHighLevel calendars, Google Calendar, and Microsoft Outlook. The agent checks real-time availability, handles time zone conversions, and sends confirmation messages after booking.",
  },
];

const COMPARISON_DATA = {
  headers: ["Metric", "AI Voice Agent", "Call Center", "IVR System", "Chatbot"],
  rows: [
    ["Response Time", "<500ms", "2-15 min wait", "Instant (rigid)", "Instant (text)"],
    ["Availability", "24/7/365", "Limited hours", "24/7/365", "24/7/365"],
    ["Cost per Call", "$0.10-0.50", "$5-25", "$0.50-2", "$0.05-0.20"],
    ["Personalization", "High", "Varies by agent", "None", "Moderate"],
    ["Scalability", "Unlimited", "Linear cost", "Limited paths", "Unlimited"],
    ["Complex Conversations", "Excellent", "Excellent", "Poor", "Moderate"],
    ["Emotional Intelligence", "Good", "Varies", "None", "Poor"],
    ["Setup Time", "2-4 weeks", "4-12 weeks", "2-6 weeks", "1-3 weeks"],
  ],
};

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$8,000 - $10,000",
    type: "one-time",
    hosting: "$500/mo hosting & maintenance",
    description:
      "Ideal for businesses deploying their first voice AI agent. One fully configured inbound or outbound agent with core integrations.",
    features: [
      "1 AI voice agent (inbound or outbound)",
      "Up to 20 conversational flows",
      "CRM integration (1 platform)",
      "Calendar booking integration",
      "Call recording & transcription",
      "2 weeks of post-launch optimization",
      "Basic analytics dashboard",
    ],
  },
  {
    name: "Growth",
    price: "$10,000 - $15,000",
    type: "one-time",
    hosting: "$1,500/mo managed service",
    description:
      "For scaling teams that need multiple agents, advanced integrations, and ongoing managed optimization with dedicated support.",
    features: [
      "Up to 3 AI voice agents",
      "Unlimited conversational flows",
      "Multi-CRM integration",
      "Advanced call routing & transfers",
      "Sentiment analysis & scoring",
      "Custom voice cloning",
      "Multi-language support (up to 5)",
      "Weekly optimization reviews",
      "Priority support & SLA",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    type: "custom",
    hosting: "Custom managed service agreement",
    description:
      "Full-scale conversational AI deployment across departments, locations, or product lines. Includes dedicated AI engineering and strategy support.",
    features: [
      "Unlimited AI voice agents",
      "Enterprise-grade SLA (99.9% uptime)",
      "Custom NLU model training",
      "On-premise or private cloud deployment",
      "Advanced analytics & BI integration",
      "Dedicated account manager",
      "Compliance & security audit support",
      "White-label capability",
    ],
  },
];

const FAQ_ITEMS = [
  {
    question: "How much does voice AI cost?",
    answer:
      "Our voice AI solutions start at $8,000-$10,000 for a single agent deployment with core integrations, plus $500/month for hosting and maintenance. The Growth tier ranges from $10,000-$15,000 one-time with $1,500/month managed service that includes ongoing optimization, advanced integrations, and priority support. Enterprise deployments are custom-priced based on scale, compliance requirements, and integration complexity. Every engagement begins with a free discovery call where we map your specific needs and provide a detailed ROI projection so you can make an informed decision.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "A standard voice AI deployment takes 3-4 weeks from kickoff to live calls. Week 1 covers discovery and call auditing. Weeks 2-3 are dedicated to building the agent, wiring integrations, and designing conversational flows. Week 3-4 focuses on rigorous testing and calibration. We run hundreds of simulated conversations before any live deployment. Complex enterprise deployments with custom NLU training or multi-department rollouts can take 6-8 weeks. We provide a detailed timeline during your discovery call.",
  },
  {
    question: "Will callers know they're talking to AI?",
    answer:
      "Modern voice AI has reached a level where most callers cannot distinguish the agent from a well-trained human representative. We use advanced voice synthesis from providers like ElevenLabs and PlayHT that produce natural intonation, appropriate pausing, and emotional responsiveness. That said, we always recommend transparent disclosure where legally required. In many jurisdictions, you are required to inform callers they are speaking with an AI system. We help you implement disclosure in a way that builds trust rather than creating friction.",
  },
  {
    question: "What happens when the AI can't answer a question?",
    answer:
      "Every voice agent we deploy includes a carefully designed escalation protocol. When the agent encounters a question outside its knowledge base or detects caller frustration above a defined threshold, it seamlessly transfers the call to a human representative with full context — including the transcript so far, caller sentiment score, and the specific point of confusion. The human rep picks up exactly where the AI left off with zero repetition for the caller. You define the escalation rules, and we calibrate the sensitivity during testing.",
  },
  {
    question: "Do you integrate with our existing CRM?",
    answer:
      "Yes. We integrate natively with GoHighLevel, HubSpot, Salesforce, Zoho CRM, Pipedrive, and Close. For other CRMs, we build custom integrations through API connections or middleware platforms like n8n and Make. Every call automatically creates or updates contact records, logs call notes and transcripts, updates deal stages, and triggers follow-up automation sequences. The goal is zero manual data entry — everything flows into your existing systems without your team lifting a finger.",
  },
  {
    question: "What languages are supported?",
    answer:
      "Our voice agents support 25+ languages including English, Spanish, French, German, Portuguese, Italian, Dutch, Arabic, Hindi, Mandarin, Japanese, and Korean. Language detection is automatic — the agent identifies the caller's language within the first few seconds and switches seamlessly. For businesses operating in multilingual markets, we can deploy agents that handle language switching mid-conversation without dropping context. Custom language models can be trained for industry-specific terminology.",
  },
  {
    question: "Can we customize the voice?",
    answer:
      "Absolutely. You have three options: choose from a library of over 100 pre-built voice profiles with varying genders, accents, ages, and personalities; clone an existing voice (such as a founder or brand spokesperson) from a short audio sample; or work with us to design an entirely new synthetic voice that embodies your brand identity. We handle the voice design process end-to-end and iterate until the voice feels exactly right for your audience.",
  },
  {
    question: "What's the ROI timeline?",
    answer:
      "Most clients see measurable ROI within the first 30 days of live deployment. The primary drivers are reduced missed calls (each recovered call has a quantifiable revenue value), lower cost per interaction compared to human agents, increased booking and conversion rates from instant response times, and time savings for your team. On average, our voice AI deployments pay for themselves within 60-90 days. During your discovery call, we build a custom ROI model using your actual call volume, conversion rates, and average deal size so you have a clear picture before committing.",
  },
  {
    question: "Do you offer a pilot program?",
    answer:
      "Yes. For businesses that want to validate voice AI before committing to a full deployment, we offer a 30-day pilot program. We deploy a single agent handling a controlled subset of your call volume — typically 20-30% — so you can compare AI performance against your existing process with real data. The pilot includes full analytics, weekly performance reviews, and a detailed report at the end with recommendations. Pilot pricing is applied as a credit toward the full deployment if you proceed.",
  },
];

const RELATED_LINKS = [
  {
    label: "Agentic AI & Autonomous Workflows",
    href: "/services/agentic-ai-autonomous-workflows",
    description: "Multi-agent systems that plan, execute, and self-correct across complex business processes.",
  },
  {
    label: "All Services",
    href: "/services",
    description: "Explore the full range of AI automation and consulting services we offer.",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "See real results from voice AI and automation deployments across industries.",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    description: "Browse completed projects spanning voice AI, agentic workflows, and enterprise automation.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function VoiceAIClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-32">
      {/* ============================================================= */}
      {/*  HERO                                                          */}
      {/* ============================================================= */}
      <section className="section-padding pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <SectionLabel label="Voice AI Services" />

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Your Best Sales Rep.
            <br />
            <span className="text-gradient">Never Takes a Day Off.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed max-w-2xl mb-8"
          >
            Deploy AI voice agents that answer every call, qualify every lead, and
            book every appointment with sub-500ms latency. Built on VAPI,
            Synthflow, and Voiceflow. Indistinguishable from your best human
            representative — available around the clock, every single day.
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            variants={fadeInUp}
            custom={2}
            className="flex flex-wrap gap-8 mb-10"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-serif font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-white/30 uppercase tracking-[0.15em] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap gap-4">
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="lg"
              trackingLabel="voice_ai_hero_book_call"
            >
              Book Strategy Call
            </MagneticButton>
            <MagneticButton
              href="/case-studies"
              variant="secondary"
              size="lg"
              trackingLabel="voice_ai_hero_case_studies"
            >
              See Voice AI in Action
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  WHAT IS VOICE AI                                              */}
      {/* ============================================================= */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <SectionLabel label="The Technology" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            What Is Voice AI &{" "}
            <span className="text-gradient">Why Does It Matter?</span>
          </motion.h2>

          <motion.div variants={fadeInUp} custom={1} className="space-y-6 text-white/50 text-lg leading-relaxed">
            <p>
              Voice AI refers to conversational artificial intelligence agents
              that can conduct natural, human-like phone conversations
              autonomously. Unlike traditional IVR systems that force callers
              through rigid menu trees (&quot;Press 1 for sales, press 2 for
              support&quot;), modern voice AI agents understand free-form speech,
              maintain context across multi-turn dialogues, and respond with the
              nuance and adaptability of a trained human representative.
            </p>
            <p>
              The underlying technology stack combines large language models for
              reasoning and response generation, automatic speech recognition for
              converting spoken words to text, and neural text-to-speech for
              producing natural-sounding voice output. Platforms like VAPI,
              Synthflow, Voiceflow, and Retell AI provide the infrastructure to
              orchestrate these components with the sub-500ms latency required for
              conversations that feel genuinely real-time.
            </p>
            <p>
              The business implications are significant. Voice remains the
              highest-intent communication channel — callers convert at 10-15x the
              rate of web visitors. Yet most businesses miss 30-60% of inbound
              calls due to limited staff availability, hold times, and after-hours
              gaps. Voice AI eliminates every one of those gaps while reducing the
              cost per interaction by 80-95% compared to human call centers.
            </p>
          </motion.div>
        </motion.div>

        {/* Key Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl"
        >
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              custom={i}
              className="glass-panel p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-3">
                {stat.value}
              </div>
              <div className="text-sm font-mono text-white/40 uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  5-STEP PROCESS                                                */}
      {/* ============================================================= */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Our Process" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Our 5-Step Voice AI{" "}
            <span className="text-gradient">Deployment Process</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mb-16"
          >
            Every deployment follows a proven methodology that de-risks the
            implementation and accelerates time-to-value. No guesswork. No wasted
            sprints. From audit to live calls in four weeks.
          </motion.p>
        </motion.div>

        <div className="space-y-6 max-w-4xl">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              className="glass-panel p-8 md:p-10 relative overflow-hidden group"
            >
              {/* Decorative gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 opacity-[0.04] blur-[64px] group-hover:opacity-[0.08] transition-opacity duration-500" />

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex items-center gap-4 md:min-w-[160px]">
                  <span className="text-5xl font-serif font-bold text-white/[0.06]">
                    {step.num}
                  </span>
                  <span className="text-xs font-mono text-accent-purple uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20">
                    {step.timeline}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  USE CASES                                                     */}
      {/* ============================================================= */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Use Cases" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Voice AI Across{" "}
            <span className="text-gradient">Industries</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mb-16"
          >
            Conversational AI voice agents adapt to virtually any industry where
            phone conversations drive revenue. Here are four high-impact
            deployments we specialize in.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.industry}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              className="glass-panel p-8 md:p-10 relative overflow-hidden group"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 opacity-[0.03] blur-[64px] group-hover:opacity-[0.07] transition-opacity duration-500" />

              {/* Industry badge */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-glass-light border border-white/[0.06] flex items-center justify-center text-accent-purple">
                  {uc.icon}
                </div>
                <span className="text-xs font-mono text-accent-purple uppercase tracking-[0.15em]">
                  {uc.industry}
                </span>
              </div>

              <h3 className="font-serif text-xl md:text-2xl font-bold mb-4">
                {uc.title}
              </h3>

              <p className="text-white/50 leading-relaxed mb-6">
                {uc.description}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2">
                {uc.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="px-3 py-1.5 rounded-full bg-glass-light border border-white/[0.06] text-xs font-mono text-white/60"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  TECHNICAL CAPABILITIES                                        */}
      {/* ============================================================= */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Capabilities" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Technical{" "}
            <span className="text-gradient">Capabilities</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mb-16"
          >
            Every voice AI deployment is built on a robust foundation of
            natural language processing, real-time integrations, and enterprise-grade
            infrastructure. Here is what ships with every agent.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              className="glass-panel p-8 relative overflow-hidden group"
            >
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 opacity-[0.03] blur-[48px] group-hover:opacity-[0.06] transition-opacity duration-500" />

              <h3 className="font-serif text-lg font-bold mb-3">
                {cap.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  COMPARISON TABLE                                              */}
      {/* ============================================================= */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Comparison" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Voice AI vs{" "}
            <span className="text-gradient">Traditional Solutions</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mb-16"
          >
            See how AI voice agents stack up against call centers, legacy IVR
            systems, and text-based chatbots across the metrics that matter most.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr>
                {COMPARISON_DATA.headers.map((header, i) => (
                  <th
                    key={header}
                    className={`text-left py-4 px-5 text-xs font-mono uppercase tracking-[0.15em] border-b border-white/[0.06] ${
                      i === 1
                        ? "text-accent-purple"
                        : "text-white/40"
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`py-4 px-5 text-sm ${
                        cellIdx === 0
                          ? "font-mono text-white/60"
                          : cellIdx === 1
                          ? "text-white font-medium"
                          : "text-white/40"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  PRICING                                                       */}
      {/* ============================================================= */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Investment" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Voice AI{" "}
            <span className="text-gradient">Pricing</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mb-6"
          >
            Transparent pricing with no hidden fees. Every tier includes a free
            discovery call where we map your requirements and build a custom ROI
            projection before you commit.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-sm font-mono text-accent-purple/60 mb-16"
          >
            All packages include a complimentary discovery call and ROI analysis.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              className={`glass-panel p-8 md:p-10 relative overflow-hidden ${
                tier.popular
                  ? "border-accent-purple/30 ring-1 ring-accent-purple/10"
                  : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-accent-purple/20 text-accent-purple text-xs font-mono uppercase tracking-[0.15em] rounded-bl-xl">
                  Most Popular
                </div>
              )}

              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 opacity-[0.03] blur-[64px]" />

              <h3 className="font-serif text-2xl font-bold mb-2">
                {tier.name}
              </h3>

              <div className="mb-1">
                <span className="text-3xl font-serif font-bold text-gradient">
                  {tier.price}
                </span>
                {tier.type !== "custom" && (
                  <span className="text-sm text-white/30 ml-2">
                    {tier.type}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-white/30 mb-4">
                {tier.hosting}
              </p>

              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-2 shrink-0" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton
                href={SITE_CONFIG.links.calendly}
                variant={tier.popular ? "primary" : "secondary"}
                size="md"
                className="w-full"
                trackingLabel={`voice_ai_pricing_${tier.name.toLowerCase()}`}
              >
                {tier.type === "custom"
                  ? "Request a Proposal"
                  : "Book Discovery Call"}
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  FAQ                                                           */}
      {/* ============================================================= */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="FAQ" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mb-16"
          >
            Everything you need to know about deploying voice AI agents for your
            business. If your question is not covered here, book a discovery call
            and we will answer it live.
          </motion.p>
        </motion.div>

        <div className="max-w-3xl space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i}
              className="glass-panel overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
              >
                <h3 className="font-serif text-lg font-semibold pr-4 group-hover:text-accent-purple transition-colors">
                  {faq.question}
                </h3>
                <span
                  className={`text-white/30 text-xl shrink-0 transition-transform duration-300 ${
                    openFaq === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === i ? "auto" : 0,
                  opacity: openFaq === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-white/50 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  INTERNAL LINKS                                                */}
      {/* ============================================================= */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Explore More" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            Related{" "}
            <span className="text-gradient">Services & Resources</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {RELATED_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i}
            >
              <Link
                href={link.href}
                className="glass-panel p-6 block group hover:border-accent-purple/20 transition-all duration-300"
              >
                <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-accent-purple transition-colors">
                  {link.label}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {link.description}
                </p>
                <span className="inline-block mt-3 text-xs font-mono text-accent-purple uppercase tracking-[0.15em] group-hover:translate-x-1 transition-transform">
                  Learn more &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <GlowLine />

      {/* ============================================================= */}
      {/*  CTA                                                           */}
      {/* ============================================================= */}
      <CTA />
    </div>
  );
}
