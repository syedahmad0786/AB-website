import type { Metadata } from "next";
import CoachesClient from "./CoachesClient";

export const metadata: Metadata = {
  title: "AI Automation for Online Coaches & Course Creators | Ahmad Bukhari",
  description:
    "Automate your coaching business. Student onboarding, appointment booking, content repurposing, email sequences & community management. Scale to 1000+ students without hiring.",
  openGraph: {
    title: "Coaching Business Automation | Ahmad Bukhari",
    description:
      "Scale your coaching business with AI. Automated student onboarding, booking, content, and community management.",
  },
  alternates: { canonical: "/industries/online-coaches" },
};

export default function CoachesPage() {
  return <CoachesClient />;
}
