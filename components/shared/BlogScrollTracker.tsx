"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Blog scroll-depth tracking: fires blog_read at 50% and 100% depth
 * (consent-gated). Mounted by /blog/[slug].
 */
export default function BlogScrollTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const fired = new Set<string>();
    const onScroll = () => {
      const doc = document.documentElement;
      const depth =
        (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (depth >= 0.5 && !fired.has("50")) {
        fired.add("50");
        trackEvent("blog_read", { slug, depth: 50 });
      }
      if (depth >= 0.95 && !fired.has("100")) {
        fired.add("100");
        trackEvent("blog_read", { slug, depth: 100 });
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);
  return null;
}
