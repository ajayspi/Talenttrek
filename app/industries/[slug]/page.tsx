import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react";
import { INDUSTRIES, INDUSTRY_EXTRAS, getIndustry } from "@/lib/industries";
import { SERVICES } from "@/lib/services";
import { buildMetadata } from "@/lib/metadata";
import ParticleWave from "@/components/anim/ParticleWave";
import IndustryVisual from "@/components/anim/IndustryVisual";
import MetricsRow from "@/components/industries/MetricsRow";
import PolyGraph from "@/components/industries/PolyGraph";
import SectionHeading from "@/components/shared/SectionHeading";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { JsonLd, faqPageLd, serviceLd } from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: `${industry.name} AI Solutions`,
    description: `How Talent Trek helps ${industry.name} businesses with voice, chat and agent AI — ${industry.tagline}.`,
    path: `/industries/${slug}`,
  });
}

function faqsFor(name: string) {
  return [
    {
      q: `How fast can Talent Trek launch in ${name}?`,
      a: "Most deployments go live in two to four weeks — we map a sample week of your calls, configure the assistant to your voice and workflows, then pilot alongside your team before full cutover.",
    },
    {
      q: "Will it sound like a robot to our customers?",
      a: "No — the assistant speaks with a natural Australian accent, follows your scripts and escalates politely the moment a conversation needs a human. Most callers don't notice, and the ones who do appreciate the speed.",
    },
    {
      q: `What does ${name} pricing look like?`,
      a: "Pricing scales with call and conversation volume, not seats. After a short pilot we agree on the metrics that matter — containment, bookings captured, response time — and you only keep paying while it beats them.",
    },
  ];
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return;
  const extras = INDUSTRY_EXTRAS[slug];
  const faqs = faqsFor(industry.name);
  const linked = SERVICES.filter((s) => industry.services.includes(s.name));

  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: `Talent Trek ${industry.name} AI`,
            description: extras?.summary ?? industry.tagline,
            path: `/industries/${slug}`,
          }),
          faqPageLd(faqs),
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: industry.name, url: `/industries/${slug}` },
        ]}
      />

      {/* Hero with particle wave */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dim via-transparent to-accent-dim" aria-hidden />
        <ParticleWave />
        <div className="container-site relative py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-muted">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span aria-hidden> / </span>
            <Link href="/industries" className="hover:text-accent">Industries</Link>
            <span aria-hidden> / </span>
            <span aria-current="page">{industry.name}</span>
          </nav>
                    <p className="eyebrow mb-3">{industry.tagline}</p>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="max-w-2xl text-4xl md:text-5xl">
                AI for{" "}
                <span className="grad-text">
                  {industry.name}
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-lg text-ink-muted">{extras?.summary ?? industry.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Book a Free Demo <ArrowRight className="arrow h-4 w-4" aria-hidden />
                </Link>
                <Link href="/services" className="btn btn-ghost">
                  See all services
                </Link>
              </div>
            </div>
            <div className="justify-self-center">
              <IndustryVisual slug={industry.slug} name={industry.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Pain → Solution */}
      <section className="section">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <AnimatedSection className="card p-7">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-accent">The pain we hear</h2>
            <ul className="space-y-2.5 text-ink-muted">
              {industry.pains.map((p) => (
                <li key={p} className="flex gap-2">
                  <CircleAlert
                    className="mt-0.5 h-4 w-4 flex-none text-[var(--accent-logo)]"
                    aria-hidden
                  />
                  {p}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection className="card p-7">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-accent">How Talent Trek solves it</h2>
            <ul className="space-y-2.5 text-ink-muted">
              {industry.solutions.map((s) => (
                <li key={s} className="flex gap-2">
                  <CircleCheck className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden /> {s}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Animated metrics */}
      <section className="section section-alt border-y border-line">
        <div className="container-site">
          <SectionHeading eyebrow="By the numbers" title={`What AI unlocks in ${industry.name}`} align="center" />
          <div className="mx-auto max-w-3xl">
            <MetricsRow metrics={extras.metrics} />
          </div>
        </div>
      </section>
      {/* Radar profile + linked services */}
      <section className="section">
        <div className="container-site grid items-start gap-10 md:grid-cols-2">
          <AnimatedSection>
            <PolyGraph values={extras.poly} />
          </AnimatedSection>
          <div>
            <SectionHeading
              eyebrow="What we deploy"
              title={`Services that power ${industry.name}`}
              align="left"
            />
            <ul className="space-y-4">
              {linked.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="card card-hover group flex items-center justify-between p-5"
                  >
                    <span>
                      <span className="font-display text-lg font-bold">{s.name}</span>
                      <span className="mt-1 block text-sm text-ink-muted">{s.tagline}</span>
                    </span>
                    <ArrowRight
                      className="h-5 w-5 flex-none text-accent transition-transform duration-base group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt border-y border-line">
        <div className="container-site max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${industry.name} questions, answered`} align="center" />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-site">
          <AnimatedSection className="card relative overflow-hidden p-10 text-center">
            <div
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-dim blur-3xl"
              aria-hidden
            />
            <h2 className="relative text-3xl">
              Ready to bring AI to your {industry.name.toLowerCase()} business?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-ink-muted">
              Book a free 30-minute demo. We&apos;ll map a sample week of your
              calls and show you exactly what AI could handle.
            </p>
            <Link href="/contact" className="btn btn-primary relative mt-6">
              Book a Free Demo <ArrowRight className="arrow h-4 w-4" aria-hidden />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}