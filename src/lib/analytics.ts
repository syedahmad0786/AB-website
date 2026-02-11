declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

export function trackCTAClick(ctaName: string) {
  trackEvent("cta_click", "engagement", ctaName);
}

export function trackFormSubmission(formName: string) {
  trackEvent("form_submit", "conversion", formName);
}

export function trackPageSection(sectionName: string) {
  trackEvent("section_view", "engagement", sectionName);
}
