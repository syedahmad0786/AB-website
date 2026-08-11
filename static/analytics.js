(() => {
  const measurementId = "G-W66WJJKGWQ";
  let calEmbedScriptReady = false;

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

  function initCalBookingMeasurement() {
    if (!document.querySelector("[data-cal-trigger][data-cal-link]")) return;

    ((CalWindow, embedSource, initMethod) => {
      const queue = (api, args) => api.q.push(args);
      const documentRef = CalWindow.document;
      CalWindow.Cal = CalWindow.Cal || function calEmbedApi() {
        const cal = CalWindow.Cal;
        const args = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const embedScript = documentRef.createElement("script");
          embedScript.src = embedSource;
          embedScript.async = true;
          embedScript.addEventListener("load", () => {
            calEmbedScriptReady = true;
          }, { once: true });
          documentRef.head.appendChild(embedScript);
          cal.loaded = true;
        }
        if (args[0] === initMethod) {
          const namespaceApi = function namespacedCalApi() {
            queue(namespaceApi, arguments);
          };
          const namespace = args[1];
          namespaceApi.q = namespaceApi.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || namespaceApi;
            queue(cal.ns[namespace], args);
            queue(cal, ["initNamespace", namespace]);
          } else {
            queue(cal, args);
          }
          return;
        }
        queue(cal, args);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const namespace = "revenue-handoff-map";
    window.Cal("init", namespace, { origin: "https://cal.com" });
    const bookingEmbed = window.Cal.ns[namespace];
    bookingEmbed("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#502C52" },
        dark: { "cal-brand": "#C8FF2E" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    const measuredBookings = new Set();
    bookingEmbed("on", {
      action: "bookingSuccessfulV2",
      callback: event => {
        const data = event?.detail?.data || {};
        const bookingKey = [data.uid, data.eventTypeId, data.startTime].filter(Boolean).join("|");
        if (bookingKey && measuredBookings.has(bookingKey)) return;
        if (bookingKey) measuredBookings.add(bookingKey);

        const normalizedBookingStatus = typeof data.status === "string"
          ? data.status.trim().toLowerCase()
          : "unknown";
        const allowedBookingStatuses = new Set(["accepted", "confirmed", "pending", "rejected", "cancelled", "canceled"]);
        const bookingStatus = allowedBookingStatuses.has(normalizedBookingStatus)
          ? normalizedBookingStatus
          : "unknown";
        const parameters = {
          page_path: window.location.pathname,
          booking_status: bookingStatus,
        };
        if (Number.isInteger(data.eventTypeId)) parameters.event_type_id = data.eventTypeId;

        record("booking_created", parameters);
        if (["accepted", "confirmed"].includes(bookingStatus)) {
          record("booking_confirmed", parameters);
        }
      },
    });
  }

  initCalBookingMeasurement();

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
      if (calEmbedScriptReady && link.matches?.("[data-cal-trigger][data-cal-link]")) {
        event.preventDefault();
      }
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
