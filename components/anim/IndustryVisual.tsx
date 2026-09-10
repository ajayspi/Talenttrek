import {
  Car,
  HeartPulse,
  ShoppingBag,
  Soup,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import VoiceWave from "@/components/anim/VoiceWave";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "hospitality-wellness": UtensilsCrossed,
  automotive: Car,
  retail: ShoppingBag,
  "food-beverage": Soup,
  healthcare: HeartPulse,
};

/**
 * Animated industry visual — replaces placeholder photography on industry
 * cards and pages. Big brand-orange glyph + live voice-wave on a themed
 * gradient tile. Falls back to a generic wave when the slug is unknown.
 */
export default function IndustryVisual({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const Icon = INDUSTRY_ICONS[slug];
  return (
    <div className="service-visual relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-5 overflow-hidden border border-line p-6">
      {Icon && (
        <span
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-dim"
          aria-hidden
        >
          <Icon className="h-8 w-8 text-accent" />
        </span>
      )}
      <span className="text-sm font-bold text-ink-muted">{name}</span>
    </div>
  );
}