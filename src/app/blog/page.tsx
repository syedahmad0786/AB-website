import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog - Ahmad Bukhari | AI Automation Insights & Case Studies",
  description:
  "Deep-dive articles on AI automation, workflow engineering, and enterprise integration. Real-world case studies from building 200+ production workflows across voice AI, content automation, and CRM systems.",
  openGraph: {
  title: "Blog - Ahmad Bukhari",
  description:
  "Insights on AI automation, workflow engineering, and enterprise integration from 200+ production deployments.",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
