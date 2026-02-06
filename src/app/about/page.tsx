import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About — Ahmad Bukhari | Agentic AI & Automation Architect",
  description:
    "Syed Muhammad Ahmad Bukhari — Founder of Aixcel Solutions and Fynora.ai. Building autonomous AI systems and enterprise automation for businesses ready to scale without scaling headcount.",
  openGraph: {
    title: "About Ahmad Bukhari | AI Automation Architect",
    description:
      "From enterprise automation to agentic AI — learn how Ahmad Bukhari builds systems that replace manual work with compounding intelligence.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
