/**
 * GA4 event tracking. Events only fire when the visitor has accepted the
 * cookie banner (localStorage flag) — no client-side pixel fires without
 * consent. The gtag function itself is injected by CookieConsent after an
 * explicit "Accept".
 */

export type AnalyticsEvent =
  | "form_submit"
  | "cta_click"
  | "service_view"
  | "industry_view"
  | "blog_read";

type GtagFn = (
  command: "event" | "config" | "js" | "set",
  target: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export const CONSENT_KEY = "tt-consent";

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;
  window.gtag?.("event", event, params);
}
