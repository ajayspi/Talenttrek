"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { heroScene } from "./heroScenes";

interface AnimatedIconRowProps {
  /** Which constellation registry to read from. */
  kind: "service" | "industry";
  /** Service icon token (e.g. "mic") or industry slug. */
  id: string;
  /** Small label above the rail (also the screen-reader summary). */
  caption?: string;
  className?: string;
}

/**
 * The animated icon rail that sits in the left (text) column of service and
 * industry heroes: the page's core icon plus its three satellite icons, popped
 * in with GSAP and floated by CSS. Icon set is derived from the page slug so
 * the visuals always match the page title.
 */
export default function AnimatedIconRow({
  kind,
  id,
  caption,
  className = "",
}: AnimatedIconRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scene = heroScene(kind, id);
  const icons = [scene.core, ...scene.satellites];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(q(".icon-chip"), {
        scale: 0.5,
        opacity: 0,
        x: -16,
        duration: 0.55,
        stagger: 0.1,
        delay: 0.4,
        ease: "back.out(1.8)",
      });
      gsap.from(q(".icon-rail-dot"), {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.65,
      });
    });

    return () => mm.revert();
  }, [kind, id]);

  return (
    <div ref={ref} className={className}>
      {caption && (
        <span className="text-xs font-bold uppercase tracking-widest text-ink-muted">
          {caption}
        </span>
      )}
      <ul className="mt-2.5 flex flex-wrap items-center gap-2" aria-hidden>
        {icons.map((Icon, i) => (
          <li key={`${kind}-${id}-rail-${i}`} className="flex items-center gap-2">
            {i > 0 && (
              <span className="icon-rail-dot h-1.5 w-1.5 rounded-full" />
            )}
            <span
              className={`icon-chip flex h-11 w-11 items-center justify-center rounded-xl border border-line shadow-card ${
                i === 0
                  ? "bg-accent-dim text-[var(--accent-logo)]"
                  : "bg-surface text-[var(--accent-logo)]"
              }`}
            >
              <span
                className="icon-chip-inner inline-flex"
                style={{ animationDelay: `${i * 0.34}s` }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}