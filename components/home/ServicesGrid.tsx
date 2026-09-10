import { SERVICES } from "@/lib/services";
import ServiceCard from "@/components/shared/ServiceCard";
import SectionHeading from "@/components/shared/SectionHeading";

/** Home services grid: compact, equal 2×2 cards — no giant spans. */
export default function ServicesGrid() {
  return (
    <section id="services" className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow="Services"
          title="Four ways to put AI to work today"
          lede="Every service is deployable standalone, or as part of one connected experience."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
