"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import {
  CalendarCheck,
  Clock4,
  Layers,
  PhoneCall,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from "lucide-react";

const STATS: {
  icon: LucideIcon;
  value: number | null;
  suffix: string;
  text?: string;
  label: string;
}[] = [
  { icon: PhoneCall, value: 47, suffix: "%", label: "After-hours pickup" },
  { icon: Timer, value: 31, suffix: "s", label: "Avg. first response" },
  { icon: Layers, value: 4, suffix: "", label: "Channels, one brain" },
  { icon: Clock4, value: null, suffix: "", text: "24/7", label: "Always-on cover" },
  { icon: CalendarCheck, value: 18, suffix: "%", label: "Booking uplift" },
  { icon: ShieldCheck, value: 94, suffix: "%", label: "Routine intents handled" },
];

function Stat({
  icon: Icon,
  value,
  suffix,
  text,
  label,
  active,
}: {
  icon: LucideIcon;
  value: number | null;
  suffix: string;
  text?: string;
  label: string;
  active: boolean;
}) {
  const counted = useCountUp(value ?? 0, active && value !== null);
  return (
    <div className="flex flex-col items-center">
      <span
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-dim text-primary"
        aria-hidden
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <p
        className="mt-4 font-display text-3xl font-bold leading-none text-primary tabular-nums"
        aria-label={`${value ?? text}${suffix} ${label}`}
      >
        {value !== null ? counted : text}
        {suffix && <span className="ml-0.5 text-xl font-semibold">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm text-ink-muted">{label}</p>
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
        className="container-site grid grid-cols-2 gap-x-6 gap-y-12 py-16 text-center md:grid-cols-3 lg:grid-cols-6"
      >
        {STATS.map((s) => (
          <Stat
            key={s.label}
            icon={s.icon}
            value={s.value}
            suffix={s.suffix}
            text={s.text}
            label={s.label}
            active={inView}
          />
        ))}
      </div>
    </section>
  );
}
