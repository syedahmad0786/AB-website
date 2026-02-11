import type { Metadata } from "next";
import VAPIClient from "./VAPIClient";

export const metadata: Metadata = {
  title: "VAPI Voice AI Integration & Development | Ahmad Bukhari",
  description:
    "Expert VAPI voice AI integration and custom voice agent development. Build human-like phone agents with sub-500ms latency. Inbound & outbound call automation.",
  openGraph: {
    title: "VAPI Voice AI Developer | Ahmad Bukhari",
    description:
      "Custom VAPI voice agents with sub-500ms latency. Inbound support, outbound qualification, and appointment booking.",
  },
  alternates: {
    canonical: "/tools/vapi-voice-ai-integration",
  },
};

export default function VAPIPage() {
  return <VAPIClient />;
}
