"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import ClarityScript from "./ClarityScript";

export default function AnalyticsProvider() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      setHasConsent(true);
    }

    // Listen for consent changes
    const handleConsent = () => {
      const c = localStorage.getItem("cookie-consent");
      setHasConsent(c === "accepted");
    };

    window.addEventListener("cookie-consent-update", handleConsent);
    return () =>
      window.removeEventListener("cookie-consent-update", handleConsent);
  }, []);

  if (!hasConsent) return null;

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {gaId && gaId !== "G-XXXXXXXXXX" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_title: document.title,
                page_location: window.location.href,
              });
              window.gtag = gtag;
            `}
          </Script>
        </>
      )}
      <ClarityScript />
    </>
  );
}
