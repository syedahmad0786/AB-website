"use client";

import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TechStack from "@/components/sections/TechStack";
import CTA from "@/components/sections/CTA";
import GlowLine from "@/components/ui/GlowLine";

export default function Home() {
  return (
    <>
      <Hero />
      <GlowLine />
      <ServicesGrid />
      <GlowLine />
      <TechStack />
      <GlowLine />
      <CTA />
    </>
  );
}
