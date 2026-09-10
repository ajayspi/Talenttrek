"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_KEY, hasConsent } from "@/lib/analytics";

/**
 * Minimal cookie consent banner (Accept / Decline) persisted to
 * localStorage. Google Analytics 4 loads via next/script ONLY after an
 * explicit "Accept" — no client-side pixel fires without consent.
 */
export default function CookieConsent() {
  const [choice, setChoice] = useState<"unknown" | "granted" | "denied">(
    "unknown",
  );
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    setChoice(hasConsent() ? "granted" : "unknown");
  }, []);

  function decide(value: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* private mode — banner reappears next visit */
    }
    setChoice(value);
  }

  if (choice !== "unknown") {
    // GA loads after consent, on idle, never blocking interaction.
    if (choice === "granted" && gaId) {
      return (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="lazyOnload"
        />
      );
    }
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[150] mx-auto max-w-xl rounded-2xl border border-line bg-surface p-5 shadow-card md:inset-x-6"
    >
      <p className="text-sm text-ink-muted">
        We use cookies to understand how the site is used — nothing is
        tracked until you say yes. See our{" "}
        <a href="/contact" className="font-bold text-accent underline">
          contact page
        </a>{" "}
        for details.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="btn btn-primary flex-1 py-2.5"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="btn btn-ghost flex-1 py-2.5"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
