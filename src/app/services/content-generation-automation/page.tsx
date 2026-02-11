import type { Metadata } from "next";
import ContentGenClient from "./ContentGenClient";

export const metadata: Metadata = {
  title: "AI Content Generation & Automation Services | Ahmad Bukhari",
  description: "Transform 1 video into 40+ content pieces automatically. AI-powered content pipelines using 11 Labs, HeyGen, Synthesia & n8n. From blogs to social media to video clips.",
  openGraph: {
    title: "AI Content Automation | Ahmad Bukhari",
    description: "10x your content output without hiring. Automated pipelines that turn 1 input into blogs, social posts, video clips, and newsletters.",
  },
  alternates: {
    canonical: "/services/content-generation-automation",
  },
};

export default function ContentGenPage() {
  return <ContentGenClient />;
}
