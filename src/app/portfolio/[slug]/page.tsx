import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio-data";
import PortfolioDetailClient from "./PortfolioDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!item) return {};

  return {
  title: `${item.title} - Portfolio | Ahmad Bukhari`,
  description: item.overview.slice(0, 160),
  openGraph: {
  title: item.title,
  description: item.tagline,
  },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!item) notFound();

  return <PortfolioDetailClient item={item} />;
}
