import type { Metadata } from "next";
import { SITE } from "./site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  /** Defaults to the branded OG image served from this site. */
  image?: string;
}

/** Shared generateMetadata helper — canonical, OG and Twitter in one place. */
export function buildMetadata({
  title,
  description,
  path,
  image,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE.url}${path}`;
  // Self-hosted so share previews survive the WordPress retirement.
  const ogImage = image ?? "/og-default.png";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_AU",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
