import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Car,
  CircleCheck,
  MessageSquare,
  Mic,
  Phone,
} from "lucide-react";
import type { Service, ServiceIcon } from "@/lib/services";
import { SITE } from "@/lib/site";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import FAQAccordion from "@/components/shared/FAQAccordion";
import Badge from "@/components/shared/Badge";
import PageEventTracker from "@/components/shared/PageEventTracker";
import FeatureIcon from "@/components/anim/FeatureIcon";
import VoiceWave from "@/components/anim/VoiceWave";
import ServiceGlyph from "@/components/anim/ServiceGlyph";
import ParticleWave from "@/components/anim/ParticleWave";
import WaveBackground from "@/components/anim/WaveBackground";

const ICONS: Record<ServiceIcon, typeof Mic> = {
  mic: Mic,
  chat: MessageSquare,
  drive: Car,
  agent: Bot,
};

/**
 * Shared detail template for the four service pages:
 * hero → problem → 6 features → 4-step HowTo → 3 use cases → FAQ → CTA.
 * JSON-LD (Service + HowTo + FAQPage + Breadcrumb) is emitted by each page.
 */
export default function ServiceDetail({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];

  return (
    <>
      <PageEventTracker event="service_view" label={service.name} />

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
              <Link href="/" className="hover:text-accent">Home</Link>
              <span aria-hidden> / </span>
              <Link href="/services" className="hover:text-accent">Services</Link>
              <span aria-hidden> / </span>
              <span aria-current="page">{service.name}</span>
            </nav>
            <Badge>{service.tagline}</Badge>
            <h1 className="mt-4 text-4xl md:text-5xl">{service.name}</h1>
            <p className="mt-5 max-w-lg text-lg text-ink-muted">
              {service.short}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary">
                Book a demo <ArrowRight className="arrow h-4 w-4" aria-hidden />
              </Link>
              <a href={SITE.phone.href} className="btn btn-ghost">
                <Phone className="h-4 w-4" aria-hidden /> {SITE.phone.display}
              </a>
            </div>
          </div>
          <div className="service-visual relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden rounded-2xl border border-line shadow-card">
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 p-8">
              <div className="scale-[1.6]">
                <ServiceGlyph icon={service.icon} />
              </div>
              <VoiceWave className="h-20 w-full max-w-xs sm:h-24" bars={12} />
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-sm font-bold text-ink backdrop-blur">
                <Icon className="h-4 w-4 text-[var(--accent-logo)]" aria-hidden />
                {service.name} — live voice
              </span>
            </div>
          </div>
        </div>
        <WaveBackground />
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container-site grid items-start gap-10 md:grid-cols-2">
          <AnimatedSection>
            <p className="eyebrow mb-3">The problem</p>
            <h2 className="text-3xl">{service.problem.title}</h2>
            <p className="mt-4 text-lg text-ink-muted">{service.problem.body}</p>
          </AnimatedSection>
          <AnimatedSection className="card p-7" >
            <h3 className="mb-4 text-lg">Sound familiar?</h3>
            <ul className="space-y-3">
              {service.problem.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-muted">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent"
                    aria-hidden
                  />
                  {p}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section section-alt border-y border-line">
        <div className="container-site">
          <SectionHeading
            eyebrow="Features"
            title={`What you get with ${service.name}`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <AnimatedSection key={f.title} className="card h-full p-6">
                <FeatureIcon index={i} />
                <h3 className="mt-2 text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{f.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — HowTo */}
      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="How it works"
            title={`Getting ${service.name} live`}
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.howItWorks.map((step, i) => (
              <li key={step.title}>
                <AnimatedSection className="card h-full p-6">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-sm font-extrabold text-on-accent">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Use cases */}
      <section className="section section-alt border-y border-line">
        <div className="container-site">
          <SectionHeading eyebrow="Use cases" title="Where it shines" />
          <div className="grid gap-6 md:grid-cols-3">
            {service.useCases.map((u) => (
              <AnimatedSection key={u.title} className="card h-full p-7">
                <span className="tag">{u.industry}</span>
                <h3 className="mt-3 text-lg">{u.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{u.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="FAQ" title={`${service.name} questions`} />
            <FAQAccordion items={service.faq} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-site">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-deep px-8 py-14 text-center text-deep-text md:px-16">
              <div
                className="animate-drift absolute -left-16 -top-16 h-64 w-64 rounded-full bg-deep-glow blur-3xl"
                aria-hidden
              />
              <h2 className="relative text-3xl md:text-4xl">
                See {service.name} on{" "}
                <span className="text-deep-accent">your</span> customer calls
              </h2>
                            <p className="relative mx-auto mt-4 max-w-xl text-deep-text">
                Book a free demo — we&apos;ll walk through your workflows and
                scope a pilot with measurable outcomes.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn btn-primary-deep">
                  Book a demo <ArrowRight className="arrow h-4 w-4" aria-hidden />
                </Link>
                <a href={SITE.phone.href} className="btn btn-ghost-deep">
                  <Phone className="h-4 w-4" aria-hidden /> {SITE.phone.display}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
