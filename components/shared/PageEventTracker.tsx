"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Fires an analytics event once on mount (consent-gated). */
export default function PageEventTracker({
  event,
  label,
}: {
  event: AnalyticsEvent;
  label: string;
}) {
  useEffect(() => {
    trackEvent(event, { label });
  }, [event, label]);
  return null;
}
