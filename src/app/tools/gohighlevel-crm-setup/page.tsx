import type { Metadata } from "next";
import GHLToolClient from "./GHLToolClient";

export const metadata: Metadata = {
  title: "GoHighLevel CRM Setup & Consulting | Ahmad Bukhari",
  description:
    "Expert GoHighLevel implementation, automation & white-label setup. Pipeline optimization, reputation management, and custom workflows for agencies and service businesses.",
  openGraph: {
    title: "GoHighLevel Expert | Ahmad Bukhari",
    description:
      "Complete GHL implementation: pipelines, automations, white-label setup, and agency solutions.",
  },
  alternates: {
    canonical: "/tools/gohighlevel-crm-setup",
  },
};

export default function GHLToolPage() {
  return <GHLToolClient />;
}
