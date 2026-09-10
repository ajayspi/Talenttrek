import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";
import ServiceGlyph from "@/components/anim/ServiceGlyph";
import AnimatedSection from "./AnimatedSection";

interface ServiceCardProps {
  service: Service;
}

/**
 * Service card with a unique animated glyph per service. Compact and equal
 * across the grid — no giant spans.
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <AnimatedSection>
      <article className="card card-hover group relative flex h-full flex-col overflow-hidden p-7">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-base group-hover:opacity-100"
          aria-hidden
        />
        <ServiceGlyph icon={service.icon} />
        <h3 className="mb-1 text-xl">{service.name}</h3>
        <p className="mb-3 text-sm font-bold text-accent">{service.tagline}</p>
        <p className="mb-5 text-ink-muted">{service.short}</p>
        <ul
          className="mb-7 flex flex-wrap gap-2"
          aria-label={`${service.name} highlights`}
        >
          {service.tags.map((t) => (
            <li key={t}>
              <span className="tag">{t}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="btn btn-primary mt-auto self-start"
        >
          Learn more <ArrowRight className="arrow h-4 w-4" aria-hidden />
        </Link>
      </article>
    </AnimatedSection>
  );
}
