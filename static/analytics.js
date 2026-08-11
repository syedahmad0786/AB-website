(() => {
  const measurementId = "G-X3LRS8KJKX";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    send_page_view: true,
  });

  const loader = document.createElement("script");
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  loader.dataset.analyticsLoader = measurementId;
  document.head.append(loader);

  function record(eventName, parameters = {}) {
    window.gtag?.("event", eventName, {
      transport_type: "beacon",
      ...parameters,
    });
  }

  document.addEventListener("click", event => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;

    let destination;
    try {
      destination = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    if (destination.hostname === "cal.com" && destination.pathname.startsWith("/ahmad-bukhari/")) {
      record("discovery_call_click", {
        page_path: window.location.pathname,
        link_domain: destination.hostname,
      });
      return;
    }

    if (destination.protocol === "mailto:") {
      record("contact_email_click", {
        page_path: window.location.pathname,
      });
    }
  });
})();
