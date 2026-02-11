import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact - Book a Discovery Call | Ahmad Bukhari",
  description:
  "Ready to automate your operations with AI? Book a free discovery call with Ahmad Bukhari to discuss Agentic AI, Voice AI, and enterprise automation solutions tailored to your business.",
  openGraph: {
  title: "Contact Ahmad Bukhari | AI Automation Consulting",
  description:
  "Book a free discovery call to explore how autonomous AI systems can eliminate manual work and scale your operations.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
