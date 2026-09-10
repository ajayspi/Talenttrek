import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { buildMetadata } from "@/lib/metadata";
import ServiceCard from "@/components/shared/ServiceCard";
import ParticleWave from "@/components/anim/ParticleWave";
import WaveBackground from "@/components/anim/WaveBackground";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { JsonLd, serviceLd } from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Voice Commerce, Chat AI Automotive, Dynamic DriveThru and AI Agent — deployable standalone or as one connected experience.",
  path: "/services",
});

/** Matrix of service fit per industry: 2 = core fit, 1 = supported, 0 = n/a. */
const FIT: Record<string, Record<string, 0 | 1 | 2>> = {
  "voice-commerce": {
    "Hospitality & Wellness": 2,
    Automotive: 1,
    Retail: 2,
    "Food & Beverage": 2,
    Healthcare: 1,
  },
  "chat-ai-automotive": {
    "Hospitality & Wellness": 1,
    Automotive: 2,
    Retail: 1,
    "Food & Beverage": 1,
    Healthcare: 1,
  },
  "dynamic-drivethru": {
    "Hospitality & Wellness": 1,
    Automotive: 0,
    Retail: 1,
    "Food & Beverage": 2,
    Healthcare: 0,
  },
  "ai-agent": {
    "Hospitality & Wellness": 1,
    Automotive: 1,
    Retail: 1,
    "Food & Beverage": 1,
    Healthcare: 2,
  },
};

function FitCell({ level }: { level: 0 | 1 | 2 }) {
  if (level === 2)
    return (
      <>
        <span
          className="mx-auto block h-3.5 w-3.5 rounded-full bg-accent"
          aria-hidden
        />
        <span className="sr-only">Core fit</span>
      </>
    );
  if (level === 1)
    return (
      <>
        <span
          className="mx-auto block h-3.5 w-3.5 rounded-full border-2 border-accent"
          aria-hidden
        />
        <span className="sr-only">Supported</span>
      </>
    );
  return (
    <>
      <span className="mx-auto block text-ink-muted" aria-hidden>
        –
      </span>
      <span className="sr-only">Not applicable</span>
    </>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={SERVICES.map((s) =>
          serviceLd({
            name: s.name,
            description: s.short,
            path: `/services/${s.slug}`,
          }),
        )}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface via-primary-dim/15 to-surface">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-dim/30 via-transparent to-accent-dim/30"
          aria-hidden
        />
        <ParticleWave />
        <div className="container-site relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-muted">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span aria-hidden> / </span>
              <span aria-current="page">Services</span>
            </nav>
            <p className="eyebrow mb-3">Services</p>
            <h1 className="text-4xl md:text-5xl">
              AI that answers, books and{" "}
              <span className="grad-text">
                sells
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-muted">
              Every service below is deployable standalone or as part of one
              connected experience — pick the workflow that hurts most and
              start there.
            </p>
          </div>
          <AbstractIllustration />
        </div>
        <WaveBackground />
      </section>

      {/* Cards */}
      <section className="section">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* Comparison table — services × industries */}
      <section className="section section-alt border-t border-line" aria-labelledby="comparison">
        <div className="container-site">
          <AnimatedSection className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">Which service, where</p>
            <h2 id="comparison" className="text-3xl md:text-4xl">
              Services across industries
            </h2>
            <p className="mt-4 text-ink-muted">
              A quick matrix of where each service is a core fit versus a
              strong supporting player. Every combination is configurable —
              this is where they earn their keep fastest.
            </p>
          </AnimatedSection>
          <AnimatedSection className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">
                Fit of each Talent Trek service to each industry — filled
                circle means core fit, outlined circle means supported
              </caption>
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
                  <th scope="col" className="p-4 font-bold">Service</th>
                  {INDUSTRIES.map((i) => (
                    <th key={i.slug} scope="col" className="p-4 text-center font-bold">
                      {i.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => (
                  <tr key={s.slug} className="border-b border-line last:border-0">
                    <th scope="row" className="p-4 font-bold text-ink">
                      <Link
                        href={`/services/${s.slug}`}
                        className="hover:text-accent"
                      >
                        {s.name}
                      </Link>
                    </th>
                    {INDUSTRIES.map((i) => (
                      <td key={i.slug} className="p-4 text-center">
                        <FitCell level={FIT[s.slug]?.[i.name] ?? 0} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

/** Undraw-style abstract AI illustration (inline SVG, theme-aware). */
function AbstractIllustration() {
  return (
    <svg
      viewBox="0 0 520 380"
      className="w-full"
      role="img"
      aria-label="Abstract illustration of AI connecting conversations"
    >
      <defs>
        <linearGradient id="tt-svc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <circle cx="260" cy="180" r="120" fill="url(#tt-svc-grad)" opacity="0.12" />
      <circle cx="260" cy="180" r="80" fill="url(#tt-svc-grad)" opacity="0.16" />
      <g stroke="var(--primary)" strokeWidth="1.5" opacity="0.5" fill="none">
        <path d="M260 100 L150 60 M260 100 L390 70 M260 260 L130 300 M260 260 L400 290 M260 100 L260 260" />
      </g>
      <g fill="var(--surface)" stroke="var(--accent)" strokeWidth="2">
        <circle cx="150" cy="60" r="14" />
        <circle cx="390" cy="70" r="14" />
        <circle cx="130" cy="300" r="14" />
        <circle cx="400" cy="290" r="14" />
      </g>
      <circle cx="260" cy="180" r="42" fill="url(#tt-svc-grad)" />
      <g stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M244 180 q8 -14 16 0 q8 14 16 0" />
        <path d="M240 164 q20 -22 40 0" opacity="0.7" />
        <path d="M240 196 q20 22 40 0" opacity="0.7" />
      </g>
    </svg>
  );
}
