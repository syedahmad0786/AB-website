import type { Metadata } from "next";
import AgenticAIClient from "./AgenticAIClient";

export const metadata: Metadata = {
  title: "Agentic AI & Autonomous Workflow Services | Ahmad Bukhari",
  description:
    "Build multi-agent AI systems that plan, execute, and self-correct. Powered by n8n, OpenAI, Claude & custom orchestration. From $2.5K discovery to $50K+ enterprise deployments.",
  openGraph: {
    title: "Agentic AI Services - Autonomous Workflows | Ahmad Bukhari",
    description:
      "Multi-agent AI systems that think, act, and iterate without human babysitting. 94% reduction in errors, 12+ hours saved per employee per week.",
  },
  alternates: {
    canonical: "/services/agentic-ai-autonomous-workflows",
  },
};

export default function AgenticAIPage() {
  return <AgenticAIClient />;
}
