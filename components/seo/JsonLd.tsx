import { SITE } from "@/lib/site";

/**
 * JSON-LD renderer + schema builders. Builders are plain functions so both
 * server and client components can compose them.
 */

export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      // Schema payloads are built from typed constants in lib/* — no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logos.color}`,
    foundingLocation: SITE.foundedLocation,
    telephone: SITE.phone.intl,
    email: SITE.email,
    vatID: `ABN ${SITE.abn}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone.intl,
      contactType: "sales",
      availableLanguage: "en-AU",
    },
    sameAs: [SITE.socials.linkedin, SITE.socials.x],
  };
}

export function localBusinessLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}${SITE.logos.color}`,
    telephone: SITE.phone.intl,
    email: SITE.email,
    areaServed: SITE.areaServed,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    parentOrganization: { "@id": `${SITE.url}/#organization` },
  };
}

export function websiteLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-AU",
  };
}

export function faqPageLd(
  faqs: { q: string; a: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { title: string; body: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}

export function serviceLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE.url}${path}`,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: SITE.areaServed,
  };
}

export function contactPageLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE.name}`,
    url: `${SITE.url}/contact`,
    about: { "@id": `${SITE.url}/#organization` },
  };
}

export function personLd(name: string, jobTitle: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    worksFor: { "@id": `${SITE.url}/#organization` },
  };
}
