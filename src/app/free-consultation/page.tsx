import type { Metadata } from "next";
import ConsultationClient from "./ConsultationClient";

export const metadata: Metadata = {
  title: "Free AI Automation Strategy Call | Ahmad Bukhari",
  description: "Book a free 30-minute AI automation strategy call. Get a custom automation roadmap, ROI estimate, and implementation plan. No pitch, just insights. Available worldwide.",
  openGraph: {
    title: "Free 30-Min AI Strategy Call | Ahmad Bukhari",
    description: "Get a custom automation roadmap and ROI estimate in 30 minutes. No pitch, just insights from an AI automation architect.",
  },
  alternates: {
    canonical: "/free-consultation",
  },
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
