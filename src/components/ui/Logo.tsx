"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "text-base" },
  md: { icon: 36, text: "text-lg" },
  lg: { icon: 48, text: "text-2xl" },
  xl: { icon: 64, text: "text-3xl" },
};

function LogoContent({ size, showText }: { size: keyof typeof sizes; showText: boolean }) {
  const { icon, text } = sizes[size];
  const source = icon < 32
    ? "/brand/ahmad-ab-axis-favicon.svg"
    : "/brand/ahmad-ab-axis.svg";

  return (
    <>
      <img
        src={source}
        alt=""
        width={icon}
        height={icon}
        className="flex-shrink-0"
      />
      {showText && (
        <span className={`font-sans font-semibold tracking-tight leading-none text-white ${text}`}>
          Ahmad Bukhari
        </span>
      )}
    </>
  );
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoContent size={size} showText={showText} />
    </span>
  );
}

export function AnimatedLogo({ size = "lg", className = "" }: Omit<LogoProps, "showText">) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <LogoContent size={size} showText />
    </motion.span>
  );
}
