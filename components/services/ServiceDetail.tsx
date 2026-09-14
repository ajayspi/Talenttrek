"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Car,
  CircleCheck,
  Database,
  Globe,
  MessageSquare,
  Mic,
  Phone,
  Square,
  CalendarDays,
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
import HeroGsap from "./HeroGsap";

const ICONS: Record<ServiceIcon, typeof Mic> = {
  mic: Mic,
  chat: MessageSquare,
  drive: Car,
  agent: Bot,
  square: Square,
  crm: MessageSquare,
  database: Database,
  phone: Phone,
  calendar: CalendarDays,
  globe: Globe,
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Shared detail template for the service pages:
 * hero › problem › 6 features › 4-step HowTo › 3 use cases › FAQ › CTA.
 * JSON-LD (Service + HowTo + FAQPage + Breadcrumb) is emitted by each page.
 */
export default function ServiceDetail({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section").forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 80%",
          onEnter: () => {
            gsap.from(sec.querySelectorAll(".st-animate"), {
              y: 30,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.08,
            });
          },
          once: true,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageEventTracker event="service_view" label={service.name} />

      {/* GSAP Hero */}
      <HeroGsap name={service.name} tagline={service.tagline} short={service.short} />

      {/* Problem */}
      <section className="section">
        <div className="container-site">
          <div className="st-animate mx-auto max-w-3xl text-center">
            <SectionHeading eyebrow="The problem" title={service.problem.title} />
            <p className="mt-4 text-lg text-ink-muted">{service.problem.body}</p>
          </div>
          <div className="st-animate mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.problem.points.map((p) => (
              <AnimatedSection key={p} className="card flex items-start gap-3 p-5">
                <span
                  className="mt-0.5 text-accent"
                  aria-hidden
                >
                  <CircleCheck className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-ink">{p}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

            {/* Features */}
      <section className="section section-alt border-y border-line">
        <div className="container-site">
          <SectionHeading
            eyebrow="Features"
            title={`What you get with ${service.name}`}
            className="st-animate"
          />
          <div className="st-animate grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            className="st-animate"
          />
          <ol className="st-animate grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <SectionHeading eyebrow="Use cases" title="Where it shines" className="st-animate" />
          <div className="st-animate grid gap-6 md:grid-cols-3">
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
          <div className="st-animate mx-auto max-w-3xl">
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

