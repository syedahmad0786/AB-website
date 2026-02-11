import type { Metadata } from "next";
import AgenciesClient from "./AgenciesClient";

export const metadata: Metadata = {
  title: "AI Automation for Marketing Agencies | Ahmad Bukhari",
  description:
    "Scale your agency without scaling headcount. AI automation for client onboarding, reporting, content production, CRM management & white-label solutions. Trusted by 15+ agencies.",
  openGraph: {
    title: "Agency Automation Solutions | Ahmad Bukhari",
    description:
      "Scale your agency with AI. Automated client onboarding, reporting, content production, and white-label CRM solutions.",
  },
  alternates: { canonical: "/industries/marketing-agencies" },
};

export default function AgenciesPage() {
  return <AgenciesClient />;
}
