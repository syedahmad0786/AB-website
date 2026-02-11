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

/* ─── Data ────────────────────────────────────────────────────── */

const SERVICE_AREAS = [
  {
    title: "Pipeline Automation",
    description:
      "Automate every stage of your sales pipeline. Leads are assigned to the right rep instantly, follow-up sequences fire on schedule, and stage transitions happen without anyone clicking a button. No lead falls through the cracks because every action is triggered by behavior, not memory.",
    features: [
      "Automatic lead assignment by source, location, or value",
      "Stage-based follow-up sequences (SMS + email + voicemail drops)",
      "Stale-deal alerts and re-engagement triggers",
      "Revenue forecasting dashboards per pipeline stage",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
      </svg>
    ),
  },
  {
    title: "Reputation Management",
    description:
      "Automate the entire review lifecycle. After a service is delivered, customers receive a review request via SMS or email. Positive reviews are routed to Google and Facebook. Negative feedback triggers an internal alert so your team can resolve issues before they go public.",
    features: [
      "Automated review request sequences post-service",
      "Smart routing: 4-5 stars to public platforms, 1-3 stars to internal",
      "Real-time review monitoring across Google, Facebook, Yelp",
      "Auto-response templates for common review types",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Booking & Appointments",
    description:
      "Replace the back-and-forth of scheduling with automated calendar systems. Prospects book directly from your funnel or website. Confirmations, reminders, and no-show follow-ups all fire automatically. Your calendar stays full without your team touching it.",
    features: [
      "Embeddable booking widgets for funnels and websites",
      "Multi-step confirmation: email + SMS + calendar invite",
      "Automated reminders at 24hr, 2hr, and 15min before appointment",
      "No-show detection with automatic rebooking sequences",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Lead Nurturing",
    description:
      "Build multi-channel drip campaigns that adapt to what each lead actually does. Opens an email but does not click? They get an SMS. Books a call but does not show? They enter a re-engagement sequence. Every touchpoint is personalized based on real behavior, not assumptions.",
    features: [
      "Behavior-triggered SMS and email sequences",
      "Dynamic content based on lead source, tags, and activity",
      "Multi-channel workflows: email, SMS, voicemail drops, Facebook DMs",
      "Lead scoring with automatic hot-lead alerts to sales",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "White-Label Setup",
    description:
      "If you run an agency, GoHighLevel lets you resell the entire CRM under your own brand. We handle the full white-label configuration: custom domain, branded login, client sub-accounts, and permission structures so your clients never see the GHL name.",
    features: [
      "Custom domain and branded login portal",
      "Client sub-account architecture with permission tiers",
      "Branded email and SMS sending domains",
      "Snapshot templates for rapid client onboarding",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Funnels & Landing Pages",
    description:
      "Build high-converting landing pages and multi-step funnels directly inside GoHighLevel. Every page is tracked, every form submission triggers a workflow, and every visitor is retargeted. No need for ClickFunnels, Leadpages, or Unbounce when GHL does it natively.",
    features: [
      "Drag-and-drop funnel builder with mobile optimization",
      "A/B testing on headlines, CTAs, and form layouts",
      "Built-in tracking pixels for Facebook, Google, and TikTok ads",
      "Form submissions auto-create contacts and trigger workflows",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const COMPARISON_DATA = {
  headers: ["Feature", "GoHighLevel", "HubSpot", "Salesforce", "ActiveCampaign"],
  rows: [
    ["Monthly Cost", "$97-497", "$800-3,600+", "$1,250-5,000+", "$49-259+"],
    ["Learning Curve", "Moderate", "Moderate", "Steep", "Easy"],
    ["Built-in Features", "All-in-one", "Add-on heavy", "Add-on heavy", "Email-focused"],
    ["Agency-Friendly", "Yes (white-label)", "No", "No", "Limited"],
    ["SMS & Voice Built-in", "Yes", "Add-on ($)", "Add-on ($)", "SMS only ($)"],
    ["Funnel Builder", "Included", "Separate tool", "No", "Basic"],
    ["Reputation Mgmt", "Included", "No", "No", "No"],
    ["Appointment Booking", "Included", "Paid add-on", "Via integration", "No"],
  ],
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Audit & Discovery",
    description:
      "We map your current tech stack, identify what can be consolidated into GoHighLevel, and document every workflow that needs to be replicated or improved. Nothing gets lost in the migration.",
    timeline: "Week 1",
  },
  {
    step: "02",
    title: "Account Setup & Configuration",
    description:
      "GHL account creation, custom domain configuration, sending domain verification, phone number provisioning, and user permissions. The foundation that everything else is built on.",
    timeline: "Week 1-2",
  },
  {
    step: "03",
    title: "Pipeline & Automation Build",
    description:
      "Pipelines, workflows, email and SMS templates, booking calendars, funnels, and all automations are built and connected. Every trigger, condition, and action is tested against real scenarios before going live.",
    timeline: "Week 2-4",
  },
  {
    step: "04",
    title: "Team Training & Handoff",
    description:
      "Recorded walkthroughs for every workflow. Live training sessions with your team. Documentation for standard operating procedures. Your team does not just receive a system; they understand how to operate it.",
    timeline: "Week 4-5",
  },
  {
    step: "05",
    title: "Optimization & Scaling",
    description:
      "After two weeks of live data, we analyze performance metrics, refine automations, adjust sequences based on open and reply rates, and identify opportunities to expand what the system handles.",
    timeline: "Week 6-8",
  },
];

const USE_CASES = [
  {
    industry: "Marketing Agencies",
    description:
      "White-label the entire GHL platform under your agency brand. Onboard clients into their own sub-accounts with pre-built automation snapshots. Charge a monthly SaaS fee on top of your service retainer and create a new revenue stream that scales without proportional labor.",
    outcomes: ["Recurring SaaS revenue per client", "Faster client onboarding with snapshots", "Branded CRM clients actually use"],
  },
  {
    industry: "Real Estate",
    description:
      "Capture leads from Zillow, Realtor.com, Facebook Ads, and your website into a single pipeline. Automated SMS and email drip campaigns nurture cold leads for months. When they engage, the system books a showing and alerts the agent. The entire journey from lead capture to closed deal is tracked.",
    outcomes: ["Unified lead pipeline across all sources", "Months-long nurture sequences on autopilot", "Automated showing booking and agent alerts"],
  },
  {
    industry: "Coaches & Consultants",
    description:
      "Build an application funnel that qualifies prospects before they ever speak to you. Approved applicants are routed to a booking calendar. After the call, onboarding sequences fire automatically: welcome emails, intake forms, course access, and payment collection all handled without manual steps.",
    outcomes: ["Pre-qualified leads only reach your calendar", "Automated onboarding after enrollment", "Payment collection and course delivery on autopilot"],
  },
  {
    industry: "Local Service Businesses",
    description:
      "Plumbers, dentists, HVAC companies, med spas, and law firms all share the same problem: missed calls, no online reviews, and manual appointment booking. GHL solves all three with a missed-call text-back, automated review requests, and an online booking widget that connects to your calendar.",
    outcomes: ["Missed-call text-back recovers lost leads", "4.8+ star average with automated review requests", "24/7 online booking without phone tag"],
  },
];

const PRICING_TIERS = [
  {
    name: "GHL Setup",
    price: "$5,000 - $8,000",
    description: "Account configuration, pipeline setup, and foundational automation for teams getting started with GoHighLevel.",
    includes: [
      "GHL account and domain configuration",
      "Up to 3 sales/service pipelines",
      "Basic email and SMS automation (up to 5 workflows)",
      "Booking calendar setup",
      "Contact import and tag structure",
      "2 hours of team training",
    ],
    timeline: "2-3 weeks",
  },
  {
    name: "Full Automation",
    price: "$8,000 - $12,000",
    description: "Complete GHL deployment with advanced workflows, multi-channel sequences, and third-party integrations for teams that want the entire system working end-to-end.",
    includes: [
      "Everything in GHL Setup",
      "Advanced multi-step workflows (up to 15)",
      "Lead scoring and hot-lead alerts",
      "Reputation management automation",
      "Funnel or landing page build (up to 3 pages)",
      "Third-party integrations (Stripe, Zapier, webhooks)",
      "4 hours of team training with recorded walkthroughs",
    ],
    featured: true,
    timeline: "4-6 weeks",
  },
  {
    name: "White-Label Package",
    price: "$10,000 - $15,000",
    description: "Full branded CRM for agencies looking to resell GoHighLevel under their own name. Includes client sub-account architecture and onboarding snapshots.",
    includes: [
      "Everything in Full Automation",
      "Custom branded domain and login portal",
      "Client sub-account template with permission tiers",
      "Up to 5 automation snapshots for client onboarding",
      "Branded email and SMS sending configuration",
      "Agency dashboard and reporting setup",
      "6 hours of training for your team and client-facing staff",
    ],
    timeline: "6-8 weeks",
  },
  {
    name: "Monthly Management",
    price: "$1,500 - $3,500/mo",
    description: "Ongoing optimization, workflow maintenance, and expansion for teams that want a dedicated GHL specialist without hiring full-time.",
    includes: [
      "Monthly workflow audits and performance reviews",
      "New automation builds (up to 4 per month)",
      "A/B testing on sequences and funnels",
      "Priority support via Slack or email",
      "Monthly strategy call",
      "Quarterly system health report",
    ],
    timeline: "Ongoing",
  },
];

const FAQ_ITEMS = [
  {
    question: "Do I need to switch from my current CRM?",
    answer:
      "Not necessarily. If your current CRM is working and you only need specific features like reputation management or funnel building, we can integrate GoHighLevel alongside your existing stack. However, most businesses find that consolidating into GHL reduces their total software spend by 40-60% because it replaces multiple tools. We always start with an audit to determine the best approach for your situation.",
  },
  {
    question: "Can you migrate data from HubSpot or Salesforce?",
    answer:
      "Yes. We handle full data migrations including contacts, deals, pipeline stages, tags, notes, and activity history. The migration is mapped field-by-field before anything moves, and we run validation checks after import to ensure nothing is lost or duplicated. Typical migrations from HubSpot or Salesforce take 3-5 business days depending on data volume.",
  },
  {
    question: "How long does GoHighLevel setup take?",
    answer:
      "A foundational setup with pipelines, basic automation, and booking takes 2-3 weeks. A full deployment with advanced workflows, reputation management, funnels, and integrations takes 4-6 weeks. White-label agency setups with sub-account architecture take 6-8 weeks. These timelines assume timely feedback on our end during the build process.",
  },
  {
    question: "Do you train my team?",
    answer:
      "Every engagement includes structured training. This is not a generic GHL tutorial. We record walkthroughs specific to your workflows, run live training sessions where your team operates the system with us present, and deliver written SOPs for ongoing reference. Teams that complete our training are self-sufficient within two weeks of handoff.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "GoHighLevel has native integrations with Stripe, Shopify, Quickbooks, Google My Business, Facebook, Instagram, TikTok, and Zoom. For anything beyond native integrations, we connect through Zapier, Make, or direct API/webhook configurations. Common custom integrations include Slack notifications, Google Sheets reporting, Calendly syncing, and custom CRM-to-CRM data bridges.",
  },
  {
    question: "Is GoHighLevel good for my industry?",
    answer:
      "GHL works best for service-based businesses that rely on lead generation, appointment booking, and client communication. This includes marketing agencies, real estate, coaching, consulting, dental practices, med spas, HVAC, legal services, and SaaS companies. If your business depends on a sales pipeline and client follow-up, GoHighLevel is likely a strong fit. We will tell you upfront if it is not.",
  },
  {
    question: "What about ongoing maintenance?",
    answer:
      "Automations are not set-and-forget. Open rates change, SMS regulations update, and your business evolves. Our monthly management plans include regular audits, new automation builds, A/B testing, and a dedicated strategy call. If you prefer to manage internally, our training ensures your team can handle day-to-day operations with confidence.",
  },
  {
    question: "Can you build custom features inside GHL?",
    answer:
      "GoHighLevel has a robust workflow builder, but some use cases require custom solutions. We build custom webhook integrations, API-driven automations, and even external tools that connect to GHL for functionality the native platform does not support. If you need something GHL cannot do out of the box, we will find or build the bridge.",
  },
];

/* ─── Component ───────────────────────────────────────────────── */

export default function GHLClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="pt-32">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="section-padding pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <SectionLabel label="GoHighLevel Services" />

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Your CRM.
            <br />
            <span className="text-gradient">Actually Working For You.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-xl text-white/40 leading-relaxed max-w-2xl mb-8"
          >
            GoHighLevel is the all-in-one platform that replaces your CRM, email
            marketing, SMS platform, funnel builder, booking tool, and reputation
            manager. We set it up so it actually does all of that, instead of
            collecting dust after the first week.
          </motion.p>

          <motion.div variants={fadeInUp} custom={2} className="flex flex-wrap gap-4">
            <MagneticButton
              href={SITE_CONFIG.links.calendly}
              size="lg"
              trackingLabel="ghl_hero_book_call"
            >
              Book a Discovery Call
            </MagneticButton>
            <MagneticButton
              href="/services"
              variant="secondary"
              size="lg"
              trackingLabel="ghl_hero_all_services"
            >
              All Services
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── What is GoHighLevel ────────────────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <SectionLabel label="Platform Overview" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            One Platform.{" "}
            <span className="text-gradient">Ten Tools Replaced.</span>
          </motion.h2>

          <motion.div variants={fadeInUp} custom={1} className="space-y-6 text-white/50 text-lg leading-relaxed">
            <p>
              GoHighLevel is a marketing and CRM platform built for agencies and
              service businesses. It consolidates your CRM, email marketing, SMS
              campaigns, funnel builder, appointment booking, reputation
              management, and client communication into a single dashboard. Instead
              of paying for HubSpot, Mailchimp, Calendly, ClickFunnels, and Podium
              separately, you get all of it in one subscription.
            </p>
            <p>
              The catch is that GoHighLevel is powerful but not simple. Most
              businesses sign up, get overwhelmed by the feature set, and end up
              using 10% of what they are paying for. That is where we come in. We
              configure, automate, and optimize GHL so your team actually uses
              it and your business actually benefits from it.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[
              "CRM & Pipeline",
              "Email Marketing",
              "SMS & Voicemail",
              "Funnel Builder",
              "Booking & Calendar",
              "Reputation Mgmt",
              "Invoicing & Payments",
              "Membership Sites",
              "Social Media Planner",
            ].map((tool) => (
              <div
                key={tool}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-glass-light border border-white/[0.06]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent-purple shrink-0" />
                <span className="text-sm font-mono text-white/60">{tool}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── What We Build ─────────────────────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Service Areas" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            What We Build{" "}
            <span className="text-gradient">Inside GoHighLevel</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 max-w-2xl mb-16"
          >
            Six core areas of GHL implementation. Each one is built to run
            without daily intervention from your team.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREAS.map((area, i) => (
              <motion.div
                key={area.title}
                variants={fadeInUp}
                custom={i}
                className="glass-panel-hover p-8 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple mb-6">
                  {area.icon}
                </div>

                <h3 className="font-serif text-xl font-bold mb-3">
                  {area.title}
                </h3>

                <p className="text-white/45 text-sm leading-relaxed mb-6 flex-1">
                  {area.description}
                </p>

                <ul className="space-y-2">
                  {area.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-white/50"
                    >
                      <div className="w-1 h-1 rounded-full bg-accent-purple mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Comparison Table ──────────────────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Platform Comparison" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            GHL vs.{" "}
            <span className="text-gradient">The Alternatives</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 max-w-2xl mb-12"
          >
            GoHighLevel is not the right fit for every business. Here is an
            honest comparison so you can decide before spending a dollar.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="overflow-x-auto -mx-6 px-6"
          >
            <div className="glass-panel overflow-hidden min-w-[700px]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {COMPARISON_DATA.headers.map((header, i) => (
                      <th
                        key={header}
                        className={`px-6 py-4 text-left font-mono uppercase tracking-wider text-xs ${
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
                      className="border-b border-white/[0.03] last:border-0"
                    >
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`px-6 py-4 ${
                            cellIdx === 0
                              ? "font-medium text-white/70"
                              : cellIdx === 1
                              ? "text-accent-purple/80 font-mono"
                              : "text-white/40 font-mono"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Process ───────────────────────────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="How We Work" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            From Audit to{" "}
            <span className="text-gradient">Fully Automated</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 max-w-2xl mb-16"
          >
            A five-phase process that takes your GoHighLevel account from blank
            canvas to revenue-generating system.
          </motion.p>

          <div className="space-y-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8 grid grid-cols-1 md:grid-cols-[80px_1fr_120px] gap-6 items-start"
              >
                <div className="text-4xl font-serif font-bold text-accent-purple/30">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/45 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass-light border border-white/[0.06] self-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                  <span className="text-xs font-mono text-white/50 whitespace-nowrap">
                    {step.timeline}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Use Cases ─────────────────────────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Industry Applications" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Built For{" "}
            <span className="text-gradient">Your Industry</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 max-w-2xl mb-16"
          >
            GoHighLevel is versatile, but the way you configure it depends
            entirely on how your business operates. Here is how we tailor it
            for different industries.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((useCase, i) => (
              <motion.div
                key={useCase.industry}
                variants={fadeInUp}
                custom={i}
                className="glass-panel p-8"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple mb-3">
                  {useCase.industry}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {useCase.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass-light border border-white/[0.06]"
                    >
                      <div className="w-1 h-1 rounded-full bg-accent-purple" />
                      <span className="text-xs font-mono text-white/50">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Pricing ───────────────────────────────────────────── */}
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Transparent{" "}
            <span className="text-gradient">Pricing</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 max-w-2xl mb-16"
          >
            Every engagement is scoped before a contract is signed. No hidden
            fees, no surprise invoices. Here is what GoHighLevel implementation
            typically looks like.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeInUp}
                custom={i}
                className={`glass-panel p-8 flex flex-col ${
                  tier.featured
                    ? "border-accent-purple/30 relative overflow-hidden"
                    : ""
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-accent-purple/20 text-accent-purple text-[10px] font-mono uppercase tracking-widest rounded-bl-xl">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-white/30 uppercase tracking-wider">
                    {tier.timeline}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold mb-1">
                  {tier.name}
                </h3>

                <p className="text-2xl font-serif font-bold text-accent-purple mb-4">
                  {tier.price}
                </p>

                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>

                <ul className="space-y-3 flex-1">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/50"
                    >
                      <svg
                        className="w-4 h-4 text-accent-purple shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <MagneticButton
                    href={SITE_CONFIG.links.calendly}
                    variant={tier.featured ? "primary" : "secondary"}
                    size="sm"
                    trackingLabel={`ghl_pricing_${tier.name.toLowerCase().replace(/\s/g, "_")}`}
                    className="w-full"
                  >
                    Get Started
                  </MagneticButton>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── FAQ ───────────────────────────────────────────────── */}
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Common{" "}
            <span className="text-gradient">Questions</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-lg text-white/40 max-w-2xl mb-12"
          >
            Straight answers. No fluff.
          </motion.p>

          <div className="max-w-3xl space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i}
                className="glass-panel overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                >
                  <span className="font-serif text-lg font-medium pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-accent-purple shrink-0 transition-transform duration-300 ${
                      openFAQ === i ? "rotate-45" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === i ? "auto" : 0,
                    opacity: openFAQ === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-8 pb-6 text-white/45 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── Internal Links ────────────────────────────────────── */}
      <section className="section-padding py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionLabel label="Explore" />

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-12"
          >
            Continue{" "}
            <span className="text-gradient">Browsing</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: "/services",
                label: "All Services",
                description: "See every automation service we offer",
              },
              {
                href: "/portfolio",
                label: "Case Studies",
                description: "Real results from real deployments",
              },
              {
                href: "/contact",
                label: "Get a Quote",
                description: "Tell us about your project",
              },
              {
                href: SITE_CONFIG.links.calendly,
                label: "Free Consultation",
                description: "30-minute strategy call, no strings",
                external: true,
              },
            ].map((link, i) => (
              <motion.div key={link.href} variants={fadeInUp} custom={i}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel-hover p-6 block h-full"
                  >
                    <p className="font-serif text-lg font-bold mb-1">
                      {link.label}
                    </p>
                    <p className="text-sm text-white/40">{link.description}</p>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="glass-panel-hover p-6 block h-full"
                  >
                    <p className="font-serif text-lg font-bold mb-1">
                      {link.label}
                    </p>
                    <p className="text-sm text-white/40">{link.description}</p>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowLine />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTA />
    </div>
  );
}
