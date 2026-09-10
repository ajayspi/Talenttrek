import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { buildMetadata } from "@/lib/metadata";
import ServiceDetail from "@/components/services/ServiceDetail";
import {
  JsonLd,
  faqPageLd,
  howToLd,
  serviceLd,
} from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const service = getService("chat-ai-automotive")!;

export const metadata: Metadata = buildMetadata({
  title: service.name,
  description: service.short,
  path: `/services/${service.slug}`,
});

export default function ChatAiAutomotivePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: service.name,
            description: service.short,
            path: `/services/${service.slug}`,
          }),
          howToLd({
            name: `How ${service.name} works`,
            description: service.short,
            steps: service.howItWorks,
          }),
          faqPageLd(service.faq),
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${service.slug}` },
        ]}
      />
      <ServiceDetail service={service} />
    </>
  );
}
