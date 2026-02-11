import type { Metadata } from "next";
import ProcessPageClient from "./ProcessPageClient";

export const metadata: Metadata = {
  title: "Our Process - How AI Automation Gets Built | Ahmad Bukhari",
  description: "From discovery to deployment in 2-6 weeks. See our proven 6-step process for building AI automation systems that deliver ROI from day one. Transparent, iterative, results-focused.",
  openGraph: {
    title: "How We Build AI Automation | Ahmad Bukhari",
    description: "Our 6-step process from discovery to deployment. Transparent timelines, iterative delivery, and ROI-focused development.",
  },
  alternates: {
    canonical: "/process",
  },
};

export default function ProcessPage() {
  return <ProcessPageClient />;
}
