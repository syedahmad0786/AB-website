import type { Metadata } from "next";
import AISDRClient from "./AISDRClient";

export const metadata: Metadata = {
  title: "AI SDR & Outbound Sales Automation | Ahmad Bukhari",
  description:
    "AI-powered sales development reps that prospect, qualify, and book meetings 24/7. Personalized outreach at scale via email, LinkedIn & SMS. 3x more qualified meetings.",
  openGraph: {
    title: "AI SDR Outbound Automation | Ahmad Bukhari",
    description:
      "Deploy AI sales agents that prospect, qualify, and book meetings around the clock. 3x qualified meetings, 70% lower cost per acquisition.",
  },
  alternates: {
    canonical: "/services/ai-sdr-outbound-automation",
  },
};

export default function AISDRPage() {
  return <AISDRClient />;
}
