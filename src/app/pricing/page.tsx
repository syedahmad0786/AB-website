import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing & Packages - AI Automation Services | Ahmad Bukhari",
  description: "Transparent AI automation pricing. Starter packages from $8K, Growth from $15K, Enterprise from $30K. Voice AI, Agentic AI, CRM automation, and content pipelines. Free discovery call included.",
  openGraph: {
    title: "AI Automation Pricing | Ahmad Bukhari",
    description: "Transparent pricing for AI automation services. From $8K starter packages to $75K+ enterprise deployments. Free discovery call included.",
  },
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
