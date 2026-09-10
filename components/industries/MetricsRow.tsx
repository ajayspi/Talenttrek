"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IndustryMetric } from "@/lib/industries";

/**
 * Animated metric row — GSAP + ScrollTrigger count-up when scrolled into
 * view. Numbers render in the mono font with tabular alignment. Static
 * final values under prefers-reduced-motion.
 */
export default function MetricsRow({ metrics }: { metrics: IndustryMetric[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nums = Array.from(el.querySelectorAll<HTMLElement>("[data-target]"));

    if (reduced) {
      nums.forEach((n) => (n.textContent = n.dataset.target ?? "0"));
      return;
    }

    let hasSt = true;
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      hasSt = false;
    }

    const ctx = gsap.context(() => {
      // Card entrance.
      gsap.from(el.querySelectorAll("[data-metric-card]"), {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        ...(hasSt
          ? { scrollTrigger: { trigger: el, start: "top 88%", once: true } }
          : {}),
      });
      // Count-up.
      nums.forEach((n) => {
        const target = Number(n.dataset.target ?? "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            n.textContent = Math.round(obj.v).toLocaleString("en-AU");
          },
          ...(hasSt
            ? {
                scrollTrigger: { trigger: n, start: "top 90%", once: true },
              }
            : {}),
        });
      });
    }, el);

    return () => ctx.revert();
  }, [metrics]);

  return (
    <div
      ref={root}
      className="grid gap-4 sm:grid-cols-3"
      aria-label="Industry performance metrics"
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          data-metric-card
          className="card p-6 text-center"
        >
          <p className="font-mono text-4xl font-bold tabular-nums text-primary">
            <span data-target={m.value}>0</span>
            {m.suffix && <span className="text-2xl">{m.suffix}</span>}
          </p>
          <p className="mt-2 text-sm font-medium text-ink-muted">{m.label}</p>
        </div>
      ))}
    </div>
  );
}