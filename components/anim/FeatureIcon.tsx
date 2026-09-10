import {
  BarChart3,
  Clock,
  Globe,
  Headphones,
  Layers,
  ShieldCheck,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: LucideIcon[] = [
  Zap,
  TrendingUp,
  ShieldCheck,
  Clock,
  Layers,
  BarChart3,
  Headphones,
  Globe,
];

/**
 * Animated feature icon — replaces the old "F01/F02…" number labels.
 * Lucide glyph in the brand-orange logo accent, floating on a soft orange
 * glow chip. Animation freezes under prefers-reduced-motion (CSS side).
 */
export default function FeatureIcon({ index }: { index: number }) {
  const Icon = ICONS[index % ICONS.length];
  return (
    <span
      className="feat-icon mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
      aria-hidden
    >
      <Icon className="h-6 w-6" />
    </span>
  );
}