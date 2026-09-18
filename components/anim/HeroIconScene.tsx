"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import VoiceWave from "./VoiceWave";
import { heroScene } from "./heroScenes";

interface HeroIconSceneProps {
  /** Which constellation registry to read from. */
  kind: "service" | "industry";
  /** Service icon token (e.g. "mic") or industry slug. Use "index" for hubs. */
  id: string;
  /** Caption rendered in the live pill. */
  label: string;
  /** Optional photography rendered behind the constellation (industry pages). */
  image?: string | null;
  imageAlt?: string;
  className?: string;
}

/** Spark positions (% of the frame) — decorative twinkles only. */
const SPARKS = [
  { left: "18%", top: "24%", delay: "0s", size: 3 },
  { left: "78%", top: "18%", delay: "0.7s", size: 4 },
  { left: "26%", top: "70%", delay: "1.4s", size: 3 },
  { left: "68%", top: "78%", delay: "2.1s", size: 3 },
  { left: "46%", top: "10%", delay: "1.1s", size: 2 },
  { left: "88%", top: "56%", delay: "0.4s", size: 3 },
];

/**
 * The animated icon constellation used by every service & industry hero:
 * a brand-accent core icon, expanding halo rings, GSAP-rotated dashed orbits,
 * floating satellite icon chips and an equalizer base. Optional photography
 * sits behind the constellation so the page keeps its real imagery.
 *
 * Motion is GSAP-driven (matchMedia-gated) with CSS keyframes for the ambient
 * loops, so nothing animates for prefers-reduced-motion users.
 */
export default function HeroIconScene({
  kind,
  id,
  label,
  image = null,
  imageAlt = "",
  className = "",
}: HeroIconSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scene = heroScene(kind, id);
  const Core = scene.core;
  const satellites = scene.satellites;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(q(".hero-frame"), { opacity: 0, y: 26, duration: 0.7 })
        .from(q(".hero-grid"), { opacity: 0, duration: 0.8 }, "-=0.5")
        .from(q(".hero-halos"), { opacity: 0, duration: 0.6 }, "-=0.65")
        .from(q(".hero-orbit"), { opacity: 0, scale: 0.85, duration: 0.9 }, "-=0.6")
        .from(
          q(".hero-core"),
          { scale: 0.5, opacity: 0, duration: 0.7, ease: "back.out(1.9)" },
          "-=0.6",
        )
        .from(
          q(".hero-chip"),
          { scale: 0.4, opacity: 0, duration: 0.55, stagger: 0.13 },
          "-=0.45",
        )
        .from(q(".hero-base"), { opacity: 0, y: 16, duration: 0.6 }, "-=0.6")
        .from(q(".hero-sparks"), { opacity: 0, duration: 0.7 }, "-=0.5");

      // Continuous orbital drift — the dashed rings counter-rotate.
      gsap.to(q(".hero-orbit-a"), {
        rotation: 360,
        duration: 52,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      gsap.to(q(".hero-orbit-b"), {
        rotation: -360,
        duration: 74,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      // Slow vertical breathing on the core chip.
      gsap.to(q(".hero-core"), {
        y: -5,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => mm.revert();
  }, [kind, id]);

  /** Chip centres sit on an ellipse around the frame centre — positioned with
   *  left/top only, so GSAP is free to own each chip's own transform. The
   *  vertical radius stays outside the core chip's footprint so nothing
   *  overlaps, even on a 320px-wide phone. */
  const chipPosition = (index: number, total: number) => {
    const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
    const left = 50 + Math.cos(angle) * 36;
    const top = 50 + Math.sin(angle) * 35;
    return {
      left: `calc(${left}% - 1.5rem)`,
      top: `calc(${top}% - 1.5rem)`,
    };
  };

  return (
    <div ref={ref} className={className}>
      <div className="hero-frame hero-scene relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-line shadow-card">
        {image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-surface/30"
              aria-hidden
            />
          </>
        )}

        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />

        {/* Expanding halo rings behind the core. */}
        <div
          className="hero-halos pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          {[0, 1.25, 2.5].map((delay) => (
            <span
              key={delay}
              className="hero-halo absolute inset-0 rounded-full"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
{/* Counter-rotating dashed orbits (GSAP). */}
        <svg
          className="hero-orbit pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden
        >
          <circle
            className="hero-orbit-a"
            cx="50"
            cy="50"
            r="37"
            stroke="var(--accent-logo)"
            strokeOpacity="0.4"
            strokeWidth="0.35"
            strokeDasharray="3 4"
          />
          <circle
            className="hero-orbit-b"
            cx="50"
            cy="50"
            r="28"
            stroke="var(--primary)"
            strokeOpacity="0.35"
            strokeWidth="0.3"
            strokeDasharray="1.5 5"
          />
        </svg>

        {/* Twinkling sparks. */}
        <div className="hero-sparks pointer-events-none absolute inset-0" aria-hidden>
          {SPARKS.map((s) => (
            <span
              key={`${s.left}-${s.top}`}
              className="hero-spark absolute"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
              }}
            />
          ))}
        </div>

        {/* Core icon chip. */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <div className="hero-core flex h-24 w-24 items-center justify-center rounded-3xl border border-line backdrop-blur-sm">
            <span className="hero-core-inner inline-flex">
              <Core className="h-11 w-11" strokeWidth={1.7} />
            </span>
          </div>
        </div>

        {/* Floating satellite icon chips. */}
        {satellites.map((Satellite, i) => (
          <div
            key={`${kind}-${id}-sat-${i}`}
            className="hero-chip absolute"
            style={chipPosition(i, satellites.length)}
            aria-hidden
          >
            <span className="hero-chip-inner flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface/85 text-[var(--accent-logo)] shadow-card backdrop-blur-sm">
              <Satellite className="h-5 w-5" strokeWidth={1.8} />
            </span>
          </div>
        ))}

        {/* Equalizer + live caption. */}
        <div className="hero-base absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
          <span
            className="inline-flex max-w-[65%] items-center gap-2 truncate rounded-full border border-line bg-surface/85 px-3 py-1.5 text-xs font-bold text-ink backdrop-blur-sm sm:max-w-none"
            aria-hidden
          >
            <span className="hero-spark h-1.5 w-1.5 flex-none" />
            <span className="truncate">{label}</span>
          </span>
          <VoiceWave bars={10} className="hidden h-8 w-24 flex-none sm:flex" />
        </div>
      </div>
    </div>
  );
}