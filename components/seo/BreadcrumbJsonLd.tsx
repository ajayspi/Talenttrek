import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export interface BreadcrumbItem {
  name: string;
  /** Path starting with "/" — resolved against SITE.url. */
  url: string;
}

/** BreadcrumbList JSON-LD — included on every page per the schema spec. */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}
