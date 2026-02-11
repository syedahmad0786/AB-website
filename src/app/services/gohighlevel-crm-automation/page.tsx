import type { Metadata } from "next";
import GHLClient from "./GHLClient";

export const metadata: Metadata = {
  title: "GoHighLevel CRM Automation Services | Ahmad Bukhari",
  description: "Expert GoHighLevel setup, automation & CRM optimization. Custom workflows, pipeline automation, reputation management & white-label solutions. Starting at $5K.",
  openGraph: {
    title: "GoHighLevel CRM Expert | Ahmad Bukhari",
    description: "Custom GoHighLevel setup and automation. Pipeline management, lead nurturing, reputation management, and white-label CRM solutions.",
  },
  alternates: {
    canonical: "/services/gohighlevel-crm-automation",
  },
};

export default function GHLPage() {
  return <GHLClient />;
}
