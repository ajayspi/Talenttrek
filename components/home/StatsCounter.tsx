"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  { value: 47, suffix: "%", label: "Calls answered after hours" },
  { value: 31, suffix: "s", label: "Average first-response time" },
  { value: 4, suffix: "", label: "Channels, one brain" },
  { value: null, suffix: "", text: "24/7", label: "Always-on cover" },
  { value: 18, suffix: "%", label: "Typical booking uplift" },
  { value: 94, suffix: "%", label: "Containment on routine intents" },
] as const;

function Stat({
  value,
  suffix,
  text,
  label,
  active,
}: {
  value: number | null;
  suffix: string;
  text?: string;
  label: string;
  active: boolean;
}) {
  const counted = useCountUp(value ?? 0, active && value !== null);
  return (
    <div>
      <p className="font-display text-4xl font-extrabold text-primary md:text-5xl tabular-nums" aria-label={`${value ?? text}${suffix} ${label}`}>
        {value !== null ? counted : text}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-bold uppercase tracking-wide text-ink-muted">
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  return (
    <section
      aria-label="Talent Trek by the numbers"
      className="section-alt border-y border-line"
    >
      <div
        ref={ref}
        className="container-site grid grid-cols-2 gap-10 py-14 text-center md:grid-cols-3 lg:grid-cols-6"
      >
        {STATS.map((s) => (
          <Stat
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            text={"text" in s ? s.text : undefined}
            label={s.label}
            active={inView}
          />
        ))}
      </div>
    </section>
  );
}
