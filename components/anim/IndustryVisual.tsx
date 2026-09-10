import {
  Car,
  HeartPulse,
  Monitor,
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
  "information-technology": Monitor,
};

/** Map of slugs that have real photography in /public/industries. */
const INDUSTRY_HERO_IMAGES: Record<string, string> = {
  "hospitality-wellness": "/industries/hospitality/hero.png",
  automotive: "/industries/automotive/hero.png",
  "food-beverage": "/industries/restaurants/hero.png",
  "information-technology": "/industries/it/hero.png",
};

const INDUSTRY_HERO_ALTS: Record<string, string> = {
  "hospitality-wellness": "A modern hotel lobby with warm lighting, representing voice-powered guest experiences",
  automotive: "A modern car dashboard with voice control, representing in-vehicle voice AI",
  "food-beverage": "A vibrant restaurant scene with voice-enabled ordering technology",
  "information-technology": "A modern IT workspace with AI-powered support agents assisting employees",
};

/**
 * Animated industry visual — replaces placeholder photography on industry
 * cards and pages. When a slug has real photography it renders a branded
 * rounded-frame photo with a gradient overlay and the industry name. Falls
 * back to the icon + voice-wave token for industries without imagery
 * (retail, healthcare).
 */
export default function IndustryVisual({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const hero = INDUSTRY_HERO_IMAGES[slug];
  const alt = INDUSTRY_HERO_ALTS[slug] ?? "";
  const Icon = INDUSTRY_ICONS[slug];

  if (hero) {
    return (
      <div className="service-visual group relative aspect-[16/10] w-full overflow-hidden border border-line">
        <img
          src={hero}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"
          aria-hidden
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-surface/80 px-3 py-1 text-sm font-bold backdrop-blur-sm">
          {name}
        </span>
      </div>
    );
  }

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