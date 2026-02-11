import type { Metadata } from "next";
import N8nClient from "./N8nClient";

export const metadata: Metadata = {
  title: "n8n Automation Development & Consulting | Ahmad Bukhari",
  description:
    "Expert n8n workflow automation development. 200+ workflows deployed. Custom integrations, AI-powered automations, and enterprise-grade solutions. Free consultation available.",
  openGraph: {
    title: "n8n Automation Expert | Ahmad Bukhari",
    description:
      "200+ n8n workflows deployed. Custom automation development, AI integrations, and enterprise solutions.",
  },
  alternates: {
    canonical: "/tools/n8n-automation-development",
  },
};

export default function N8nPage() {
  return <N8nClient />;
}
