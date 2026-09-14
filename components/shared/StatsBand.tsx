"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

interface StatItem {
  label: string;
  /** Numeric target — counted up when scrolled into view. */
  value?: number;
  /** Static string instead of a number (e.g. "24/7"). */
  text?: string;
  suffix?: string;
  /** Optional progress bar fill (0–100). */
  percent?: number;
}

function Stat({
  item,
  active,
}: {
  item: StatItem;
  active: boolean;
}) {
  const counted = useCountUp(item.value ?? 0, active && item.value !== undefined);
  const display = item.value !== undefined ? counted : item.text;
  return (
    <div>
      <p
        className="font-display text-4xl font-extrabold text-primary md:text-5xl tabular-nums"
        aria-label={`${display}${item.suffix ?? ""} ${item.label}`}
      >
        {display}
        {item.suffix}
      </p>
      <p className="mt-2 text-sm font-bold uppercase tracking-wide text-ink-muted">
        {item.label}
      </p>
      {item.percent !== undefined && (
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary-dim"
          role="presentation"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent-strong)] to-[var(--grad-to)] transition-[width] duration-1000 ease-out"
            style={{ width: active ? `${item.percent}%` : "0%" }}
          />
        </div>
      )}
    </div>
  );
}

interface StatsBandProps {
  items: StatItem[];
  /** Accessible name for the band (rendered as aria-label + sr-only heading). */
  name?: string;
  columnsClass?: string;
}

/**
 * Reusable count-up stats band with optional progress bars — mirrors the
 * animated "00 k+ / 00 %" counters on the WordPress site. Counts start when
 * the band scrolls into view; numbers jump straight to their target under
 * prefers-reduced-motion (handled inside useCountUp).
 */
export default function StatsBand({
  items,
  name = "Key numbers",
  columnsClass = "grid-cols-2 md:grid-cols-4",
}: StatsBandProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  return (
    <div
      ref={ref}
      role="group"
      aria-label={name}
      className={`grid gap-10 text-center ${columnsClass}`}
    >
      {items.map((item) => (
        <Stat key={item.label} item={item} active={inView} />
      ))}
    </div>
  );
}
