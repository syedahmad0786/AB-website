import type { Metadata } from "next";
import CaseStudiesPageClient from "./CaseStudiesPageClient";

export const metadata: Metadata = {
  title: "Case Studies - Real AI Automation Results",
  description:
  "See how autonomous AI systems and enterprise automation deliver measurable ROI. Case studies from Agentic AI, Voice AI, and automation pipeline deployments.",
  openGraph: {
  title: "AI Automation Case Studies | Ahmad Bukhari",
  description:
  "Real results from deployed AI systems: 94% error reduction, 3x qualified appointments, 10x content output. See the numbers.",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
