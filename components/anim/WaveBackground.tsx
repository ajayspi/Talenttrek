"use client";

import { useEffect, useRef } from "react";

interface WaveBackgroundProps {
  /** Extra classes merged onto the container */
  className?: string;
  /** Number of wave layers (1-3) */
  layers?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Base opacity of waves */
  opacity?: number;
}

/**
 * Animated SVG wave layers for hero sections.
 * Creates a flowing, organic wave effect at the bottom of hero areas.
 * Theme-aware via CSS tokens, respects prefers-reduced-motion.
 */
export default function WaveBackground({
  className = "",
  layers = 3,
  speed = 1,
  opacity = 0.6,
}: WaveBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationId: number;
    let time = 0;

    const paths = svg.querySelectorAll<SVGPathElement>("[data-wave]");
    if (reduced) {
      paths.forEach((p) => {
        p.style.animation = "none";
      });
      return;
    }

    const animate = () => {
      time += 0.008 * speed;
      paths.forEach((path, i) => {
        const offset = time + i * 0.5;
        const y1 = Math.sin(offset) * 8;
        const y2 = Math.sin(offset + 1.5) * 12;
        const y3 = Math.sin(offset + 3) * 8;
        const d = `M0 ${32 + y1} C ${200 + y2} ${20 + y3}, ${400 + y1} ${44 + y2}, 640 ${32 + y3} L 640 64 L 0 64 Z`;
        path.setAttribute("d", d);
      });
      animationId = requestAnimationFrame(animate);
    };

    paths.forEach((_path, i) => {
      const _dur = 8 / speed + i * 2;
    });

    if (!reduced) {
      animationId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  const wavePath = (index: number, baseY: number) => {
    const colors = [
      "var(--primary)",
      "var(--primary-dim)",
      "var(--accent-dim)",
    ];
    const opacities = [opacity * 0.3, opacity * 0.5, opacity * 0.7];
    return (
      <path
        key={index}
        data-wave={index}
        fill={colors[index % 3]}
        opacity={opacities[index % 3]}
        d={`M0 ${baseY} C 160 ${baseY - 12}, 320 ${baseY + 12}, 640 ${baseY} L 640 64 L 0 64 Z`}
      />
    );
  };

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 ${className}`}
      aria-hidden
    >
      <svg
        ref={svgRef}
        viewBox="0 0 640 64"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        {Array.from({ length: layers }).map((_, i) =>
          wavePath(i, 28 + i * 6)
        )}
      </svg>
    </div>
  );
}