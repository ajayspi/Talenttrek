"use client";

import { useEffect, useRef } from "react";

const CONTAINER_ID = "geo-particles";

/**
 * Geometric minimal particle background (tsParticles slim): slowly rotating
 * polygons linked by faint lines, hover = grab links. Colour follows the
 * --primary token so it adapts to light/dark. Decorative: aria-hidden,
 * pointer-events off at the wrapper level (the engine canvas handles hover
 * via the wrapper). Renders nothing on failure; static under reduced motion.
 */
export default function GeoParticles({
  className = "",
  reducedMotion = false,
}: {
  className?: string;
  reducedMotion?: boolean;
}) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const reduced =
      reducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let container: { destroy: () => void } | undefined;

    (async () => {
      try {
        const [{ tsParticles }, { loadSlim }] = await Promise.all([
          import("@tsparticles/engine"),
          import("@tsparticles/slim"),
        ]);
        await loadSlim(tsParticles);
        if (cancelled || !wrapper.current) return;

        const color =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--primary")
            .trim() || "#2563eb";

        container =
          (await tsParticles.load({
            id: CONTAINER_ID,
            element: wrapper.current,
          options: {
            fullScreen: { enable: false },
            detectRetina: true,
            fpsLimit: 45,
            background: { color: { value: "transparent" } },
            particles: {
              number: {
                value: 38,
                density: { enable: true, width: 1200, height: 640 },
              },
              color: { value: color },
              shape: {
                type: ["triangle", "polygon"],
                options: { polygon: { sides: 6 } },
              },
              opacity: { value: { min: 0.12, max: 0.38 } },
              size: { value: { min: 2.5, max: 5.5 } },
              links: {
                enable: true,
                distance: 140,
                color,
                opacity: 0.16,
                width: 1,
              },
              move: {
                enable: !reduced,
                speed: 0.45,
                random: true,
                outModes: { default: "out" },
              },
              rotate: {
                animation: reduced
                  ? { enable: false }
                  : { enable: true, speed: 5 },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: !reduced, mode: "grab" },
                onClick: { enable: false },
              },
              modes: {
                grab: { distance: 150, links: { opacity: 0.32 } },
              },
            },
            reduceDuplicates: true,
          },
          }));
        } catch {
          /* decorative only — ignore */
        }
      })();

      return () => {
        cancelled = true;
        container?.destroy();
      };
    }, [reducedMotion]);

  return (
    <div
      ref={wrapper}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    />
  );
}