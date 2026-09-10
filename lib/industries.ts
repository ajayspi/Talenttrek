/**
 * The five industries Talent Trek serves. Shared by the home industries
 * strip, the /industries page and the footer.
 */

export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  pains: string[];
  solutions: string[];
  services: string[];
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
};
