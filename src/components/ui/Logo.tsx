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

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
  {/* Logo Mark - Premium geometric monogram */}
  <svg
  width={icon}
  height={icon}
  viewBox="0 0 64 64"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="flex-shrink-0"
  >
  <defs>
  {/* Primary gradient - electric blue to purple */}
  <linearGradient id="logo-grad-primary" x1="0" y1="0" x2="64" y2="64">
  <stop offset="0%" stopColor="#6366F1" />
  <stop offset="50%" stopColor="#8B5CF6" />
  <stop offset="100%" stopColor="#06B6D4" />
  </linearGradient>

  {/* Glow gradient for the outer frame */}
  <linearGradient id="logo-grad-glow" x1="0" y1="0" x2="64" y2="64">
  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
  </linearGradient>

  {/* Subtle inner gradient */}
  <linearGradient id="logo-grad-inner" x1="16" y1="16" x2="48" y2="48">
  <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
  <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
  </linearGradient>

  {/* Glow filter */}
  <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
  <feComposite in="SourceGraphic" in2="blur" operator="over" />
  </filter>
  </defs>

  {/* Outer hexagonal frame - premium border */}
  <path
  d="M32 2L58 17V47L32 62L6 47V17L32 2Z"
  stroke="url(#logo-grad-primary)"
  strokeWidth="1.5"
  fill="none"
  opacity="0.6"
  />

  {/* Inner background fill - dark glass */}
  <path
  d="M32 6L54 19V45L32 58L10 45V19L32 6Z"
  fill="url(#logo-grad-inner)"
  stroke="url(#logo-grad-primary)"
  strokeWidth="0.5"
  opacity="0.3"
  />

  {/* Letter A - left side, sharp geometric */}
  <g filter="url(#logo-glow)">
  <path
  d="M20 44L28 18H30L38 44"
  stroke="url(#logo-grad-primary)"
  strokeWidth="2.2"
  strokeLinecap="round"
  strokeLinejoin="round"
  fill="none"
  />
  {/* A crossbar */}
  <path
  d="M23 36H35"
  stroke="url(#logo-grad-primary)"
  strokeWidth="1.8"
  strokeLinecap="round"
  />
  </g>

  {/* Letter B - right side, elegant curves */}
  <g filter="url(#logo-glow)">
  <path
  d="M30 18H38C42 18 44 20.5 44 23.5C44 26.5 42 28.5 39 29C42.5 29.5 45 32 45 35.5C45 39 42 44 38 44H30"
  stroke="url(#logo-grad-primary)"
  strokeWidth="2.2"
  strokeLinecap="round"
  strokeLinejoin="round"
  fill="none"
  />
  {/* B vertical stem */}
  <path
  d="M30 18V44"
  stroke="url(#logo-grad-primary)"
  strokeWidth="2.2"
  strokeLinecap="round"
  />
  </g>

  {/* Accent dot - top right corner of hexagon */}
  <circle
  cx="50"
  cy="14"
  r="1.5"
  fill="url(#logo-grad-primary)"
  opacity="0.8"
  />

  {/* Small accent line - bottom left */}
  <line
  x1="12"
  y1="50"
  x2="18"
  y2="50"
  stroke="url(#logo-grad-primary)"
  strokeWidth="1"
  opacity="0.4"
  />
  </svg>

  {/* Wordmark */}
  {showText && (
  <span className={`font-serif font-bold tracking-tight leading-none ${text}`}>
  <span className="text-white">Ahmad</span>
  <span className="text-gradient"> Bukhari</span>
  </span>
  )}
  </span>
  );
}

/* Animated version for special uses (hero, loading, etc.) */
export function AnimatedLogo({ size = "lg", className = "" }: Omit<LogoProps, "showText">) {
  const { icon } = sizes[size];

  return (
  <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
  className={`inline-flex items-center gap-3 ${className}`}
  >
  <svg
  width={icon}
  height={icon}
  viewBox="0 0 64 64"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  >
  <defs>
  <linearGradient id="alogo-grad" x1="0" y1="0" x2="64" y2="64">
  <stop offset="0%" stopColor="#6366F1" />
  <stop offset="50%" stopColor="#8B5CF6" />
  <stop offset="100%" stopColor="#06B6D4" />
  </linearGradient>
  <filter id="alogo-glow" x="-20%" y="-20%" width="140%" height="140%">
  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
  <feComposite in="SourceGraphic" in2="blur" operator="over" />
  </filter>
  </defs>

  {/* Animated hexagon frame */}
  <motion.path
  d="M32 2L58 17V47L32 62L6 47V17L32 2Z"
  stroke="url(#alogo-grad)"
  strokeWidth="1.5"
  fill="none"
  opacity="0.6"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.5, ease: "easeInOut" }}
  />

  <motion.path
  d="M32 6L54 19V45L32 58L10 45V19L32 6Z"
  fill="rgba(255,255,255,0.03)"
  stroke="url(#alogo-grad)"
  strokeWidth="0.5"
  opacity="0.3"
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.3 }}
  transition={{ delay: 0.8, duration: 0.5 }}
  />

  {/* Animated A */}
  <g filter="url(#alogo-glow)">
  <motion.path
  d="M20 44L28 18H30L38 44"
  stroke="url(#alogo-grad)"
  strokeWidth="2.2"
  strokeLinecap="round"
  strokeLinejoin="round"
  fill="none"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
  />
  <motion.path
  d="M23 36H35"
  stroke="url(#alogo-grad)"
  strokeWidth="1.8"
  strokeLinecap="round"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
  />
  </g>

  {/* Animated B */}
  <g filter="url(#alogo-glow)">
  <motion.path
  d="M30 18V44"
  stroke="url(#alogo-grad)"
  strokeWidth="2.2"
  strokeLinecap="round"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
  />
  <motion.path
  d="M30 18H38C42 18 44 20.5 44 23.5C44 26.5 42 28.5 39 29C42.5 29.5 45 32 45 35.5C45 39 42 44 38 44H30"
  stroke="url(#alogo-grad)"
  strokeWidth="2.2"
  strokeLinecap="round"
  strokeLinejoin="round"
  fill="none"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ delay: 1.0, duration: 1.0, ease: "easeOut" }}
  />
  </g>

  {/* Accent dot */}
  <motion.circle
  cx="50"
  cy="14"
  r="1.5"
  fill="url(#alogo-grad)"
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 0.8, scale: 1 }}
  transition={{ delay: 1.8, duration: 0.3 }}
  />
  </svg>

  <motion.span
  className="font-serif text-2xl font-bold tracking-tight leading-none"
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 1.2, duration: 0.6 }}
  >
  <span className="text-white">Ahmad</span>
  <span className="text-gradient"> Bukhari</span>
  </motion.span>
  </motion.div>
  );
}
