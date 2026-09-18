/**
 * Icon constellations for the animated hero scenes.
 *
 * Each service and industry page gets its own "constellation": one brand
 * core icon plus three satellite icons that describe what the page actually
 * delivers. The registry maps plain slug strings to lucide components so
 * server components can hand a slug to the client scene without trying to
 * serialise component references across the boundary.
 */
import {
  AudioLines,
  BarChart3,
  BedDouble,
  BellRing,
  Bike,
  Bot,
  Building2,
  CalendarCheck,
  Car,
  CarFront,
  Clock,
  CreditCard,
  Database,
  Gauge,
  Globe2,
  Headphones,
  HeartPulse,
  Languages,
  Link2,
  MessageSquare,
  Mic,
  Monitor,
  Network,
  Package,
  PhoneCall,
  Receipt,
  RefreshCw,
  Server,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Soup,
  Sparkles,
  Stethoscope,
  Store,
  Terminal,
  Timer,
  Truck,
  Users,
  UtensilsCrossed,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/lib/services";

export interface HeroScene {
  /** Hero icon rendered in the accent chip at the centre of the scene. */
  core: LucideIcon;
  /** Three supporting icons that float around the core. */
  satellites: LucideIcon[];
}

/** One scene per service, keyed by the service's icon token (+ "index" for the
 *  services hub hero). HeroGsap/ServiceDetail pass `service.icon`. */
export const SERVICE_SCENES: Record<ServiceIcon | "index", HeroScene> = {
  mic: { core: Mic, satellites: [CreditCard, ShoppingBag, PhoneCall] },
  chat: { core: MessageSquare, satellites: [Car, Wrench, CalendarCheck] },
  drive: { core: CarFront, satellites: [UtensilsCrossed, Receipt, Timer] },
  agent: { core: Bot, satellites: [Workflow, Network, Sparkles] },
  square: { core: CreditCard, satellites: [Receipt, Store, Link2] },
  crm: { core: Users, satellites: [Database, Settings2, MessageSquare] },
  database: { core: Database, satellites: [BarChart3, ShieldCheck, RefreshCw] },
  phone: { core: PhoneCall, satellites: [Headphones, Clock, CalendarCheck] },
  calendar: { core: CalendarCheck, satellites: [Clock, Users, BellRing] },
  globe: { core: Languages, satellites: [Globe2, MessageSquare, AudioLines] },
  index: {
    core: Sparkles,
    satellites: [Mic, MessageSquare, Bot, Database, PhoneCall, Languages],
  },
};

/** One scene per industry slug (+ "index" for the /industries hero). */
export const INDUSTRY_SCENES: Record<string, HeroScene> = {
  "hospitality-wellness": {
    core: UtensilsCrossed,
    satellites: [BedDouble, CalendarCheck, Sparkles],
  },
  automotive: { core: Car, satellites: [Wrench, Gauge, PhoneCall] },
  retail: { core: ShoppingBag, satellites: [Package, CreditCard, Truck] },
  "food-beverage": { core: Soup, satellites: [UtensilsCrossed, Timer, Bike] },
  healthcare: {
    core: HeartPulse,
    satellites: [Stethoscope, CalendarCheck, ShieldCheck],
  },
  "information-technology": {
    core: Monitor,
    satellites: [Server, Terminal, ShieldCheck],
  },
  index: {
    core: Building2,
    satellites: [
      UtensilsCrossed,
      Car,
      ShoppingBag,
      Soup,
      HeartPulse,
      Monitor,
    ],
  },
};

/** Fallback so an unknown slug still renders a finished, animated hero. */
const FALLBACK: HeroScene = {
  core: Sparkles,
  satellites: [Bot, MessageSquare, PhoneCall],
};

/**
 * Resolve a hero scene.
 *
 * @param kind "service" → `id` is the service icon token (e.g. "mic"), or
 *             "index" for the services hub. "industry" → `id` is the industry
 *             slug, or "index" for the industries hub.
 */
export function heroScene(
  kind: "service" | "industry",
  id: string,
): HeroScene {
  if (kind === "service") {
    const scene = SERVICE_SCENES[id as ServiceIcon | "index"];
    return scene ?? FALLBACK;
  }
  return INDUSTRY_SCENES[id] ?? FALLBACK;
}
