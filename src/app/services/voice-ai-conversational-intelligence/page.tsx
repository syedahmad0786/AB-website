import type { Metadata } from "next";
import VoiceAIClient from "./VoiceAIClient";

export const metadata: Metadata = {
  title: "Voice AI & Conversational Intelligence Services | Ahmad Bukhari",
  description:
    "Deploy human-like voice AI agents with sub-500ms latency via VAPI, Synthflow & Voiceflow. 24/7 inbound support, outbound qualification, and appointment booking. Starting at $8K.",
  openGraph: {
    title: "Voice AI Services - Human-Like Voice Agents | Ahmad Bukhari",
    description:
      "Deploy voice agents that handle calls 24/7 with sub-500ms latency. 3x more qualified appointments, 67% fewer missed calls.",
  },
  alternates: {
    canonical: "/services/voice-ai-conversational-intelligence",
  },
};

export default function VoiceAIPage() {
  return <VoiceAIClient />;
}
