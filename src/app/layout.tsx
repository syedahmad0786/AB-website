import type { Metadata, Viewport } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveCursorField from "@/components/ui/InteractiveCursorField";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import CookieConsent from "@/components/CookieConsent";
import ExitIntentModal from "@/components/ExitIntentModal";
import { PersonJsonLd, WebsiteJsonLd, FAQJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
  default: SITE_CONFIG.title,
  template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
  "Agentic AI",
  "Voice AI",
  "Enterprise Automation",
  "AI Consulting",
  "n8n Automation",
  "GoHighLevel Expert",
  "AI Workflow Architect",
  "Autonomous AI Systems",
  "Business Process Automation",
  "Conversational AI",
  "Vapi Voice AI",
  "Retell AI",
  "Ahmad Bukhari",
  "AiXCEL Solutions",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  openGraph: {
  type: "website",
  locale: "en_US",
  url: SITE_CONFIG.url,
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  siteName: SITE_CONFIG.name,
  images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
  card: "summary_large_image",
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  images: [SITE_CONFIG.ogImage],
  },
  robots: {
  index: true,
  follow: true,
  googleBot: {
  index: true,
  follow: true,
  "max-video-preview": -1,
  "max-image-preview": "large",
  "max-snippet": -1,
  },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="en" className="dark">
  <head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <PersonJsonLd />
  <WebsiteJsonLd />
  <FAQJsonLd />
  <ServiceJsonLd />
  </head>
  <body className="min-h-screen bg-surface antialiased">
  <InteractiveCursorField />
  <AnalyticsProvider />
  <CookieConsent />
  <Navbar />
  <main className="relative z-10">{children}</main>
  <Footer />
  <ExitIntentModal />
  </body>
  </html>
  );
}
