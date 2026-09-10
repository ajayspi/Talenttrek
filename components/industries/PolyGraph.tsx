"use client";

import { motion, useReducedMotion } from "framer-motion";
import { POLY_LABELS } from "@/lib/industries";

const SIZE = 300;
const CX = SIZE / 2;
const CY = SIZE / 2 + 6;
const R = 104;

function point(i: number, total: number, radius: number): [number, number] {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total;
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)];
}

function polyPoints(values: number[], scale: number): string {
  return values
    .map((v, i) => point(i, values.length, (v / 100) * R * scale).join(","))
    .join(" ");
}

/**
 * Animated radar / "poly graph" — five-axis profile rendered as an SVG
 * pentagon grid with a motion-drawn data polygon and pulsing vertices.
 * Froze to static under prefers-reduced-motion.
 */
export default function PolyGraph({
  values,
  title = "Talent Trek impact profile",
}: {
  values: number[];
  title?: string;
}) {
  const reduced = useReducedMotion();
  const dataPoints = polyPoints(values, 1).split(" ").map((p) => p.split(",").map(Number));

  return (
    <figure className="card p-6">
      <figcaption className="mb-2 text-center text-sm font-bold uppercase tracking-wide text-accent">
        {title}
      </figcaption>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-[320px]"
        role="img"
        aria-label={`${title}: ${POLY_LABELS.map(
          (l, i) => `${l} ${values[i]} of 100`,
        ).join(", ")}`}
      >
        {/* grid rings */}
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon
            key={s}
            points={polyPoints([100, 100, 100, 100, 100], s)}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
        ))}
        {/* axes */}
        {POLY_LABELS.map((_, i) => {
          const [x, y] = point(i, 5, R);
          return (
            <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />
          );
        })}
        {/* data polygon */}
        <motion.polygon
          points={polyPoints(values, 1)}
          fill="var(--accent-dim)"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        {/* pulsing vertices */}
        {dataPoints.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill="var(--accent)"
            initial={reduced ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        ))}
        {/* labels */}
        {POLY_LABELS.map((label, i) => {
          const [x, y] = point(i, 5, R + 26);
          return (
            <text
              key={label}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10.5"
              fontWeight="600"
              fill="var(--text-2)"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </figure>
  );
}