import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio - AI Automation Projects & Case Studies",
  description:
  "Explore 12 real-world AI automation projects: ad analytics, AI video production, voice AI appointment setting, CRM automation, chatbot development, and more. Results-driven implementations with measurable ROI.",
  openGraph: {
  title: "AI Automation Portfolio | Ahmad Bukhari",
  description:
  "12 production-grade AI automation projects with real metrics. From 90+ workflow video pipelines to 24/7 voice AI booking systems.",
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
