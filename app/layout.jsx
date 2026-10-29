import Script from 'next/script';
import './globals.css';
import '../styles/live-workspace.css';
import { PERSON, SITE_URL } from '../lib/site';

const title = `${PERSON.name} | AI Automation & AI Agent Developer`;
const description =
  'AI automation and AI agent developer: reliable n8n workflows, LLM systems, CRM automation and human-approved agents for agencies and service businesses. Founder of AiXCEL Solutions.';
const ogImage = { url: '/art/ahmadbukhari-default-og-1200x630.png', width: 1200, height: 630, alt: 'Ahmad Bukhari: messy operations become systems that think.' };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: '/', types: { 'application/rss+xml': '/feed.xml' } },
  openGraph: {
    title,
    description: 'Work breaks. I design what happens next.',
    url: '/',
    siteName: PERSON.name,
    type: 'profile',
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', creator: '@ahmadbukhari', title, description: 'Work breaks. I design what happens next.', images: [ogImage.url] },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '32x32' }, { url: '/brand/ahmad-ab-axis-favicon.svg', type: 'image/svg+xml' }],
    apple: '/brand/ahmad-ab-axis-apple-touch-180.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ECE8DF' },
    { media: '(prefers-color-scheme: dark)', color: '#121210' },
  ],
};

// Applies the saved theme before first paint so dark mode doesn't flash.
const themeScript = "try{var t=localStorage.getItem('ab-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}<Script src="/analytics.js?v=20261029-consent-1" strategy="afterInteractive" /></body>
    </html>
  );
}
