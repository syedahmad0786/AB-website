import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import BlogDetailClient from "./BlogDetailClient";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
  title: `${post.title} - Ahmad Bukhari`,
  description: post.excerpt,
  openGraph: {
  title: post.title,
  description: post.excerpt,
  type: "article",
  publishedTime: post.publishedAt,
  authors: ["Ahmad Bukhari"],
  tags: post.tags,
  },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return <BlogDetailClient post={post} />;
}
