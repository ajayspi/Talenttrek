/**
 * Central brand + contact constants. Every page, component and JSON-LD
 * block reads from here so the business details can never drift.
 */
export const SITE = {
  name: "Talent Trek",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://talenttrek.com.au",
  wpUrl: process.env.NEXT_PUBLIC_WP_URL ?? "https://talenttrek.com.au",
  tagline: "The polite face of AI",
  description:
    "Voice Commerce, Chat AI Automotive, Dynamic DriveThru and AI Agent solutions for Australian hospitality, automotive, retail, F&B and healthcare businesses.",
  phone: {
    display: "1800 860 624",
    href: "tel:1800860624",
    intl: "+611800860624",
  },
  email: "info@talenttrek.com.au",
  abn: "13 674 722 135",
  address: {
    street: "312/86 Overton Rd",
    locality: "Williams Landing",
    region: "VIC",
    postalCode: "3027",
    country: "AU",
    full: "312/86 Overton Rd, Williams Landing VIC 3027",
  },
  geo: { latitude: -37.844, longitude: 144.756 },
  areaServed: "AU",
  foundedLocation: "Melbourne, Victoria, Australia",
  mapEmbedUrl:
    "https://www.google.com/maps?q=312/86+Overton+Rd,+Williams+Landing+VIC+3027&output=embed",
  socials: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
  },
  logos: {
    color: "/logo-color.png",
    white: "/logo-white.png",
    icon: "/icon.png",
    heroGif: "/hero.gif",
  },
} as const;
