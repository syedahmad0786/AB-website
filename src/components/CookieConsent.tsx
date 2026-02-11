"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash immediately on load
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-update"));
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new Event("cookie-consent-update"));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-black/80 backdrop-blur-xl px-6 py-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <p className="text-sm text-white/50 text-center sm:text-left">
              This site uses analytics cookies to improve your experience and
              help me understand how visitors interact with the content.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm text-white/40 hover:text-white/60 border border-white/[0.08] rounded-full transition-all duration-300 hover:border-white/[0.15]"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
