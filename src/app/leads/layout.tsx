import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LeadEngine AI - Lead Generation & Profiling',
  description: 'AI-powered lead generation, email discovery, and psychological profiling platform',
  robots: { index: false, follow: false },
};

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
