import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.ahmadbukhari.com'),
  title: 'Ahmad Bukhari · Agentic AI & LLM Systems',
  description: 'Agentic AI, LLM systems and resilient automation, designed around how work actually breaks. Founder of AiXCEL Solutions.',
  openGraph: {
    title: 'Ahmad Bukhari · Agentic AI & LLM Systems',
    description: 'Work breaks. I design what happens next.',
    url: 'https://www.ahmadbukhari.com',
    siteName: 'Ahmad Bukhari',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', creator: '@ahmadbukhari' },
  icons: { icon: '/assets/ahmad-avatar.gif' },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#ECE8DF' };

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
      <body>{children}</body>
    </html>
  );
}
