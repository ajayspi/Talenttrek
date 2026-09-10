import type { Metadata } from "next";
import { SITE } from "./site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  /** Defaults to the brand OG image hosted on the WordPress CDN. */
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
  const ogImage =
    image ??
    "https://talenttrek.com.au/wp-content/uploads/2025/07/Gemini_Generated_Image_yhavzmyhavzmyhav-scaled-e1751807159510-1024x505.png";
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
      images: [{ url: ogImage, width: 1024, height: 505, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
