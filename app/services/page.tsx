import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { buildMetadata } from "@/lib/metadata";
import ServiceCard from "@/components/shared/ServiceCard";
import StatsBand from "@/components/shared/StatsBand";
import ProcessSteps from "@/components/shared/ProcessSteps";
import ParticleWave from "@/components/anim/ParticleWave";
import WaveBackground from "@/components/anim/WaveBackground";
import HeroIconScene from "@/components/anim/HeroIconScene";
import AnimatedIconRow from "@/components/anim/AnimatedIconRow";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { JsonLd, serviceLd } from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Voice Commerce, Chat AI Automotive, Dynamic DriveThru, AI Agent, Square Integration, Custom CRM, CRM Management, AI Phone Receptionist, AI Appointment Booking and Multilingual AI Assistant — deployable standalone or as one connected experience.",
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
    "IT & Technology": 1,
  },
  "chat-ai-automotive": {
    "Hospitality & Wellness": 1,
    Automotive: 2,
    Retail: 1,
    "Food & Beverage": 1,
    Healthcare: 1,
    "IT & Technology": 1,
  },
  "dynamic-drivethru": {
    "Hospitality & Wellness": 1,
    Automotive: 0,
    Retail: 1,
    "Food & Beverage": 2,
    Healthcare: 0,
    "IT & Technology": 0,
  },
  "ai-agent": {
    "Hospitality & Wellness": 1,
    Automotive: 1,
    Retail: 1,
    "Food & Beverage": 1,
    Healthcare: 2,
    "IT & Technology": 2,
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
            <AnimatedIconRow
              kind="service"
              id="index"
              caption="Ten services, one connected brain"
              className="mt-7"
            />
          </div>
          <HeroIconScene
            kind="service"
            id="index"
            label="One connected AI platform"
          />
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

      {/* Stats band — mirrors WP "Winning Awards / Years Experience / Product Delivery" */}
      <section
        aria-label="Talent Trek track record"
        className="section-alt border-y border-line"
      >
        <div className="container-site py-14">
          <StatsBand
            name="Talent Trek track record"
            items={[
              { label: "Awards & recognition", value: 12, suffix: "+" },
              { label: "Years experience", value: 8, suffix: "+" },
              { label: "Live deployments", value: 500, suffix: "+" },
              { label: "Calls handled monthly", value: 250, suffix: "k+" },
            ]}
          />
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

      {/* Integrations strip — WP partner icons */}
      <section
        aria-label="Platforms we integrate with"
        className="section-alt border-t border-line"
      >
        <div className="container-site py-12">
          <AnimatedSection className="mb-8 text-center">
            <p className="eyebrow mb-2">Integrations</p>
            <h2 className="text-2xl md:text-3xl">
              Plugged into the platforms you already run
            </h2>
          </AnimatedSection>
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {[
              { src: "/site/partner-icon1.png", label: "POS platforms" },
              { src: "/site/partner-icon2.png", label: "Telephony & voice" },
              { src: "/site/partner-icon3.png", label: "Calendars & booking" },
              { src: "/site/partner-icon4.png", label: "Payment gateways" },
              { src: "/site/partner-icon5.png", label: "CRMs & helpdesks" },
            ].map((p) => (
              <li key={p.src}>
                <AnimatedSection className="group flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent">
                  <Image
                    src={p.src}
                    alt=""
                    width={40}
                    height={40}
                    sizes="40px"
                    aria-hidden
                    className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-sm font-bold">{p.label}</span>
                </AnimatedSection>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work process */}
      <section className="section" aria-labelledby="services-process">
        <div className="container-site">
          <AnimatedSection className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">How we deliver</p>
            <h2 id="services-process" className="text-3xl md:text-4xl">
              From first call to live AI in four steps
            </h2>
            <p className="mt-4 text-ink-muted">
              The same transparent process behind every service above — you
              approve scripts, intents and success metrics before anything
              goes live.
            </p>
          </AnimatedSection>
          <ProcessSteps
            steps={[
              {
                title: "Discussion",
                body: "We map your call flows, menus, FAQs and pain points, then agree the outcomes that matter.",
              },
              {
                title: "Ideas & concepts",
                body: "Conversation designs, integrations and success metrics are drafted for your approval.",
              },
              {
                title: "Testing & trying",
                body: "You trial the assistant on real scenarios in a safe sandbox before any customer hears it.",
              },
              {
                title: "Execute & install",
                body: "We go live on your channels with monitoring, tuning and human hand-off from day one.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}

