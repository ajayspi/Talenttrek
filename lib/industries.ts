/**
 * The six industries Talent Trek serves. Shared by the home industries
 * strip, the /industries page and the footer.
 */

export interface IndustryFeature {
  title: string;
  body: string;
  image: string;
}

export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  pains: string[];
  solutions: string[];
  services: string[];
  /** Path to hero image in /public/industries, or null to use the token visual. */
  image: string | null;
  imageAlt: string;
  /** Feature cards for the "Why Talent Trek?" section. */
  features: IndustryFeature[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "hospitality-wellness",
    name: "Hospitality & Wellness",
    tagline: "Bookings, room service & enquiries handled 24/7",
    pains: [
      "Front desk swamped at check-in peaks",
      "Late-night booking calls missed",
      "Spa and treatment schedules double-booked",
    ],
    solutions: [
      "Voice assistants take reservations, update bookings and answer guests around the clock",
      "AI agents triage group inboxes across venues in your brand voice",
      "Chat AI covers pre-arrival questions, upgrades and late checkouts",
    ],
    services: ["Voice Commerce", "AI Agent", "Chat AI Automotive"],
    image: "/industries/hospitality/hero.png",
    imageAlt: "A modern hotel lobby with warm lighting, representing voice-powered guest experiences",
    features: [
      {
        title: "Autonomous AI Agents",
        body: "AI agents that understand, reason and take meaningful action across voice, chat, kiosks and mobile.",
        image: "/industries/hospitality/agents.png",
      },
      {
        title: "Agentic+ Framework",
        body: "AI agents collaborate, switch roles and complete multi-step tasks with precision.",
        image: "/industries/hospitality/agentic.png",
      },
      {
        title: "Built-In Voice Intelligence",
        body: "Proprietary voice recognition for fast, natural, accurate voice interactions at scale.",
        image: "/industries/hospitality/voice-intel.png",
      },
      {
        title: "GenAI-Driven Builder",
        body: "Build and deploy voice AI agents tailored to your hospitality workflows.",
        image: "/industries/hospitality/genai-builder.png",
      },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    tagline: "Bookings, parts quotes & after-hours leads",
    pains: [
      "Advisors buried in repetitive booking calls",
      "After-hours enquiries going cold",
      "Parts quotes taking days",
    ],
    solutions: [
      "Chat AI books services with rego lookup and correct labour times",
      "Parts and labour quotes answered instantly from your catalogue",
      "Every after-hours enquiry qualified and queued for the morning briefing",
    ],
    services: ["Chat AI Automotive", "AI Agent"],
    image: "/industries/automotive/hero.png",
    imageAlt: "A modern car dashboard with voice control, representing in-vehicle voice AI",
    features: [
      {
        title: "Voice Commerce Ecosystem",
        body: "Turn conversations into commerce — drivers order coffee, book tables and shop hands-free.",
        image: "/industries/automotive/commerce.png",
      },
      {
        title: "Advanced Voice Customization",
        body: "Shape your in-car voice assistant tone, behaviour and knowledge for a branded experience.",
        image: "/industries/automotive/customization.png",
      },
      {
        title: "Seamless Integration",
        body: "Voice AI integrates into your vehicle infotainment system, powered by large language models.",
        image: "/industries/automotive/integration.png",
      },
      {
        title: "Generative AI Intelligence",
        body: "Real-time data from weather and traffic to stocks, sports and restaurant suggestions.",
        image: "/industries/automotive/voice-ai.png",
      },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    tagline: "Fast answers on stock, shipping & returns",
    pains: [
      "Staff pulled from the floor to answer phones",
      "Duplicate questions across web, email and phone",
      "Returns process confusing customers",
    ],
    solutions: [
      "Self-service lookups for availability, shipping and returns",
      "Voice Commerce takes phone orders with payment in the call",
      "One assistant answering consistently on every channel",
    ],
    services: ["Voice Commerce", "AI Agent"],
    image: null,
    imageAlt: "",
    features: [],
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    tagline: "Menu-adaptive ordering that never drops an order",
    pains: [
      "Peak-hour order spikes overflowing",
      "Drive-thru queues and order errors",
      "Inconsistent upsells between shifts",
    ],
    solutions: [
      "Dynamic DriveThru keeps lanes moving with menu-accurate ordering",
      "Voice Commerce overflows delivery and pickup spikes",
      "Consistent, gentle upsells on every order, every hour",
    ],
    services: ["Dynamic DriveThru", "Voice Commerce"],
    image: "/industries/restaurants/hero.png",
    imageAlt: "A vibrant restaurant scene with voice-enabled ordering technology",
    features: [
      {
        title: "Smart Drive-Thru",
        body: "AI-powered drive-thru voice interactions that reduce wait times and increase order accuracy.",
        image: "/industries/restaurants/drive-thru.png",
      },
      {
        title: "Express Lane Ordering",
        body: "Customers pre-order before reaching the counter or drive-thru to keep the line moving.",
        image: "/industries/restaurants/express-lane.png",
      },
      {
        title: "Intelligent Kiosks",
        body: "Voice-enabled kiosks designed to personalize every in-store transaction.",
        image: "/industries/restaurants/kiosks.png",
      },
      {
        title: "Smart Voice Ordering",
        body: "Customers place orders through voice commands via phone, SMS or mobile apps.",
        image: "/industries/restaurants/voice-ordering.png",
      },
      {
        title: "In-Car Ordering Integration",
        body: "Seamless food ordering through in-car voice assistants for drivers on the go.",
        image: "/industries/restaurants/in-car.png",
      },
      {
        title: "AI-Powered Staff Assist",
        body: "Instant, voice-accessible guidance from digital handbooks and training materials.",
        image: "/industries/restaurants/staff-assist.png",
      },
      {
        title: "Voice-Driven Insights",
        body: "Real-time feedback from team and guest interactions to improve service quality.",
        image: "/industries/restaurants/voice-insights.png",
      },
      {
        title: "Kitchen Display Sync",
        body: "Orders land straight in your kitchen display — no re-keying, no double-handling.",
        image: "/industries/restaurants/kitchen-display.png",
      },
      {
        title: "Peak Order Overflow",
        body: "Voice Commerce absorbs delivery and pickup spikes without a single dropped call.",
        image: "/industries/restaurants/peak-orders.png",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Appointments & triage without the hold music",
    pains: [
      "Reception buried under appointment calls",
      "No-shows from weak reminder workflows",
      "After-hours calls with nowhere to go",
    ],
    solutions: [
      "AI agents handle appointments, reminders and general enquiries politely, 24/7",
      "Clinical questions escalate immediately under your triage rules",
      "Every interaction logged for privacy and compliance",
    ],
    services: ["AI Agent", "Voice Commerce"],
    image: null,
    imageAlt: "",
    features: [],
  },
  {
    slug: "information-technology",
    name: "IT & Technology",
    tagline: "Smarter, faster IT support powered by Voice AI",
    pains: [
      "Long wait times and confusing help desk tickets",
      "Repetitive tier-1 issues flooding your IT team",
      "After-hours IT requests with nowhere to go",
    ],
    solutions: [
      "AI agents deliver instant, voice-guided IT support that resolves issues faster",
      "Automate frequent tasks like password resets, software installs and VPN access",
      "24/7 multichannel support via chat, voice and SMS for global teams",
    ],
    services: ["AI Agent"],
    image: "/industries/it/hero.png",
    imageAlt: "A modern IT workspace with AI-powered support agents assisting employees",
    features: [
      {
        title: "Smart Virtual IT Agent",
        body: "Automate frequent support tasks like password resets, software installations and VPN access.",
        image: "/industries/it/agent.png",
      },
      {
        title: "24/7 Multichannel Support",
        body: "Always-available assistance via chat, voice or SMS — perfect for remote and hybrid teams.",
        image: "/industries/it/multichannel.png",
      },
      {
        title: "Seamless Ticket Management",
        body: "Create, update and resolve tickets in ServiceNow, Jira or BMC with human-like guidance.",
        image: "/industries/it/tickets.png",
      },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

/** Animated-metric + radar-profile data per industry subpage. */
export interface IndustryMetric {
  label: string;
  value: number;
  suffix?: string;
}

export interface IndustryExtras {
  /** Hero sub-paragraph for the subpage. */
  summary: string;
  metrics: IndustryMetric[];
  /** 5-axis profile, values 0–100. Labels shared across industries. */
  poly: number[];
}

/** Shared radar axis labels (comparable across every industry page). */
export const POLY_LABELS = [
  "Call automation",
  "Bookings & orders",
  "Response speed",
  "Revenue uplift",
  "Compliance",
] as const;

export const INDUSTRY_EXTRAS: Record<string, IndustryExtras> = {
  "hospitality-wellness": {
    summary:
      "Guests expect answers at midnight the same way they expect them at noon. We put a polite, brand-true assistant on every call, chat and inbox so your front-of-house team can focus on the guests standing in front of them.",
    metrics: [
      { label: "Calls answered 24/7", value: 100, suffix: "%" },
      { label: "Booking uplift", value: 23, suffix: "%" },
      { label: "Avg. response time", value: 4, suffix: "s" },
    ],
    poly: [92, 88, 95, 70, 78],
  },
  automotive: {
    summary:
      "Service advisors shouldn't spend their day reading regos over the phone. We automate bookings, parts quotes and after-hours lead capture so every enquiry is warm by the time your team opens.",
    metrics: [
      { label: "After-hours leads captured", value: 87, suffix: "%" },
      { label: "Booking time cut", value: 41, suffix: "%" },
      { label: "Quote turnaround", value: 90, suffix: "% faster" },
    ],
    poly: [86, 90, 88, 82, 72],
  },
  retail: {
    summary:
      "Stock, shipping and returns questions repeat all day on every channel. One assistant answers them consistently everywhere — and takes phone orders with payment captured in the call.",
    metrics: [
      { label: "Containment rate", value: 78, suffix: "%" },
      { label: "Phone order uplift", value: 19, suffix: "%" },
      { label: "First response", value: 6, suffix: "s" },
    ],
    poly: [80, 84, 92, 74, 68],
  },
  "food-beverage": {
    summary:
      "Lunch rush shouldn't mean lost orders. Dynamic DriveThru keeps the lane moving with menu-accurate ordering, and Voice Commerce absorbs delivery and pickup spikes without a single dropped call.",
    metrics: [
      { label: "Peak orders absorbed", value: 96, suffix: "%" },
      { label: "Order accuracy", value: 99, suffix: "%" },
      { label: "Lane time cut", value: 32, suffix: "%" },
    ],
    poly: [90, 96, 94, 80, 66],
  },
  healthcare: {
    summary:
      "Reception staff deserve relief from appointment ping-pong — and patients deserve an answer at 9pm. We automate bookings and reminders with strict triage escalation and full interaction logging.",
    metrics: [
      { label: "Appointments handled", value: 85, suffix: "%" },
      { label: "No-show reduction", value: 37, suffix: "%" },
      { label: "After-hours coverage", value: 100, suffix: "%" },
    ],
    poly: [88, 86, 90, 60, 98],
  },
  "information-technology": {
    summary:
      "Say goodbye to long wait times and confusing help desk tickets. Talent Trek intelligent AI agents deliver instant, voice-guided IT support that helps your team solve issues faster, without the friction.",
    metrics: [
      { label: "Tickets auto-resolved", value: 66, suffix: "%" },
      { label: "After-hours coverage", value: 100, suffix: "%" },
      { label: "Avg. first response", value: 2, suffix: "s" },
    ],
    poly: [95, 70, 98, 75, 80],
  },
};
