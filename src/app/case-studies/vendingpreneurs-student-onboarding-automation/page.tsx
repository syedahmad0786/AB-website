import type { Metadata } from "next";
import VendingPreneursClient from "./VendingPreneursClient";

export const metadata: Metadata = {
  title: "VendingPreneurs Case Study - Student Onboarding Automation | Ahmad Bukhari",
  description: "How we automated VendingPreneurs' student onboarding with n8n, reducing 18 hours/week of manual work to under 2 minutes per student. $19,800/year in operational savings.",
  openGraph: {
    title: "VendingPreneurs Automation Case Study | Ahmad Bukhari",
    description: "From 18 hours/week manual onboarding to fully automated in 2 minutes. See how n8n + AI transformed an education business.",
  },
  alternates: {
    canonical: "/case-studies/vendingpreneurs-student-onboarding-automation",
  },
};

export default function VendingPreneursPage() {
  return <VendingPreneursClient />;
}
