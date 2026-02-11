"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { trackCTAClick } from "@/lib/analytics";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  trackingLabel?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  trackingLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
  const { clientX, clientY } = e;
  const { left, top, width, height } =
  ref.current!.getBoundingClientRect();
  const x = (clientX - left - width / 2) * 0.15;
  const y = (clientY - top - height / 2) * 0.15;
  setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseStyles = clsx(
  "relative inline-flex items-center justify-center font-mono font-medium tracking-wide uppercase transition-all duration-300 rounded-full cursor-pointer",
  {
  "px-6 py-3 text-sm": size === "sm",
  "px-8 py-4 text-sm": size === "md",
  "px-10 py-5 text-base": size === "lg",
  },
  {
  "bg-gradient-accent text-white shadow-glow hover:shadow-glow-lg":
  variant === "primary",
  "border border-white/20 text-white hover:border-white/40 hover:bg-white/5":
  variant === "secondary",
  "text-white/70 hover:text-white": variant === "ghost",
  },
  className
  );

  const content = (
  <motion.div
  ref={ref}
  onMouseMove={handleMouse}
  onMouseLeave={reset}
  animate={{ x: position.x, y: position.y }}
  transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
  className={baseStyles}
  >
  <span className="relative z-10">{children}</span>
  </motion.div>
  );

  const handleClick = () => {
  if (trackingLabel) trackCTAClick(trackingLabel);
  onClick?.();
  };

  if (href) {
  const isExternal =
  href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
  return (
  <a
  href={href}
  onClick={handleClick}
  target="_blank"
  rel="noopener noreferrer"
  >
  {content}
  </a>
  );
  }

  return (
  <Link href={href} onClick={handleClick}>
  {content}
  </Link>
  );
  }

  return <div onClick={handleClick}>{content}</div>;
}
