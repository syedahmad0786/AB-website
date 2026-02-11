import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services - Agentic AI, Voice AI & Enterprise Automation",
  description:
  "Custom AI automation services: Agentic AI workflows, Voice AI agents with <500ms latency, content generation pipelines, enterprise integrations via n8n/Make, and AI consulting. ROI-focused solutions for scaling businesses.",
  openGraph: {
  title: "AI Automation Services | Ahmad Bukhari",
  description:
  "Autonomous AI systems, Voice AI agents, and enterprise automation that deliver measurable ROI. See how our solutions eliminate manual work.",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
