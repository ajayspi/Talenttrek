/**
 * Real photography used by the "In the wild" band on each service page.
 *
 * The imagery comes from the Talent Trek WordPress media library (scraped into
 * /public/industries/*). Every service maps to three shots that genuinely show
 * the workflow it automates, so the pages never fall back to empty placeholders.
 */
export interface ServiceShot {
  src: string;
  caption: string;
}

const SHOTS: Record<string, ServiceShot[]> = {
  "ai-agent": [
    { src: "/industries/it/agent.png", caption: "An agent working a support queue end to end" },
    { src: "/industries/it/multichannel.png", caption: "One agent across chat, email and phone" },
    { src: "/industries/hospitality/agents.png", caption: "Hand-offs that stay invisible to the guest" },
  ],
  "ai-appointment-booking": [
    { src: "/industries/hospitality/agentic.png", caption: "Bookings captured without a phone queue" },
    { src: "/industries/hospitality/agents.png", caption: "Reminders, reschedules and follow-ups" },
    { src: "/industries/it/tickets.png", caption: "Every booking written straight into your system" },
  ],
  "ai-phone-receptionist": [
    { src: "/industries/hospitality/voice-intel.png", caption: "Every call answered on the first ring" },
    { src: "/industries/restaurants/voice-ordering.png", caption: "Natural voice, your scripts, your brand" },
    { src: "/industries/it/multichannel.png", caption: "Escalations routed to the right human" },
  ],
  "chat-ai-automotive": [
    { src: "/industries/automotive/voice-ai.png", caption: "In-vehicle voice control understood first time" },
    { src: "/industries/automotive/hero.png", caption: "Dealer-grade answers for every model" },
    { src: "/industries/automotive/customization.png", caption: "Tuned to your dealership's tone and rules" },
  ],
  "crm-management": [
    { src: "/industries/it/tickets.png", caption: "A pipeline that updates itself" },
    { src: "/industries/it/multichannel.png", caption: "Every touchpoint logged in one record" },
    { src: "/industries/it/agent.png", caption: "AI keeps the data clean while your team sells" },
  ],
  "custom-crm-services": [
    { src: "/industries/it/multichannel.png", caption: "Built around your channels, not a template" },
    { src: "/industries/it/tickets.png", caption: "Pipelines, stages and automations to spec" },
    { src: "/industries/automotive/integration.png", caption: "Connected to the tools you already run" },
  ],
  "dynamic-drivethru": [
    { src: "/industries/restaurants/drive-thru.png", caption: "Order-taking that never drops a lane" },
    { src: "/industries/restaurants/in-car.png", caption: "Upsells suggested on every order" },
    { src: "/industries/restaurants/express-lane.png", caption: "Peak-hour volume without extra staff" },
  ],
  "multilingual-ai-assistant": [
    { src: "/industries/hospitality/genai-builder.png", caption: "Answers composed in the caller's language" },
    { src: "/industries/hospitality/voice-intel.png", caption: "Speech in, speech out — no scripts to translate" },
    { src: "/industries/restaurants/voice-insights.png", caption: "Consistent service across every language" },
  ],
  "square-integration": [
    { src: "/industries/automotive/commerce.png", caption: "Payments and prompts in the same flow" },
    { src: "/industries/restaurants/kiosks.png", caption: "In-store and online orders in sync" },
    { src: "/industries/restaurants/peak-orders.png", caption: "Peak-ready checkout, no double entry" },
  ],
  "voice-commerce": [
    { src: "/industries/restaurants/voice-ordering.png", caption: "Customers order by simply saying it" },
    { src: "/industries/restaurants/kiosks.png", caption: "Voice-first menus that actually convert" },
    { src: "/industries/automotive/commerce.png", caption: "Payment captured in the conversation" },
  ],
};

/** Fallback band so a newly added service still ships with real imagery. */
const FALLBACK: ServiceShot[] = [
  { src: "/site/product-showcase.png", caption: "One platform across every customer conversation" },
  { src: "/site/product-1.png", caption: "Voice, chat and agents working together" },
  { src: "/industries/it/multichannel.png", caption: "Live in weeks, measured from day one" },
];

export function serviceShots(slug: string): ServiceShot[] {
  return SHOTS[slug] ?? FALLBACK;
}
