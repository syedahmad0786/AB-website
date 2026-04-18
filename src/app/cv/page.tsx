import type { Metadata } from "next";
import CVPageClient from "./CVPageClient";

export const metadata: Metadata = {
  title: "Interactive CV - Ahmad Bukhari | AI Automation Architect",
  description:
    "An interactive curriculum vitae of Syed Muhammad Ahmad Bukhari - explore nine years of AI automation work, 200+ deployed workflows, and outcome-driven case metrics across filterable timelines and skill matrices.",
  openGraph: {
    title: "Interactive CV - Ahmad Bukhari",
    description:
      "Filter roles, expand outcomes, explore the stack. A living CV built for decision-makers.",
  },
};

export default function CVPage() {
  return <CVPageClient />;
}
