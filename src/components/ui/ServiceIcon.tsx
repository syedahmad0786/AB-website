"use client";

interface ServiceIconProps {
  icon: string;
  className?: string;
}

export default function ServiceIcon({ icon, className = "" }: ServiceIconProps) {
  const paths: Record<string, React.ReactNode> = {
  brain: (
  <>
  <path
  d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7Z"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  />
  <path d="M9 21h6M10 17v4M14 17v4M12 2v3" strokeWidth="1.5" strokeLinecap="round" />
  <circle cx="9" cy="10" r="1" fill="currentColor" />
  <circle cx="15" cy="10" r="1" fill="currentColor" />
  </>
  ),
  waveform: (
  <>
  <path d="M2 12h2l3-7 4 14 4-10 3 5h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>
  ),
  layers: (
  <>
  <path d="M12 2 2 7l10 5 10-5-10-5Z" strokeWidth="1.5" strokeLinejoin="round" />
  <path d="m2 17 10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  <path d="m2 12 10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>
  ),
  circuit: (
  <>
  <rect x="2" y="2" width="6" height="6" rx="1" strokeWidth="1.5" />
  <rect x="16" y="2" width="6" height="6" rx="1" strokeWidth="1.5" />
  <rect x="9" y="16" width="6" height="6" rx="1" strokeWidth="1.5" />
  <path d="M5 8v4h7v4M19 8v4H12" strokeWidth="1.5" strokeLinecap="round" />
  </>
  ),
  graduation: (
  <>
  <path d="m2 10 10-5 10 5-10 5Z" strokeWidth="1.5" strokeLinejoin="round" />
  <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M22 10v6" strokeWidth="1.5" strokeLinecap="round" />
  </>
  ),
  };

  return (
  <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  className={`w-6 h-6 ${className}`}
  >
  {paths[icon] || paths.brain}
  </svg>
  );
}
