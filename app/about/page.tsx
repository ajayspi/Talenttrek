import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import StatsCounter from "@/components/home/StatsCounter";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import VoiceWave from "@/components/anim/VoiceWave";
import ParticleWave from "@/components/anim/ParticleWave";
import WaveBackground from "@/components/anim/WaveBackground";
import { Mic, MessagesSquare, Bot } from "lucide-react";
import {
  JsonLd,
  faqPageLd,
  organizationLd,
  personLd,
  websiteLd,
  localBusinessLd,
} from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { COMPANY_FAQS } from "@/lib/faqs";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Born in Melbourne's west, built for Australian accents and workflows. Meet the team behind Talent Trek's voice, chat and agent AI.",
  path: "/about",
});

/** Brand story — placeholder dates/copy are easily editable. */
const TIMELINE = [
  {
    year: "2022",
    title: "Founded in Melbourne's west",
    body: "Talent Trek starts as a two-person consultancy mapping phone workflows for hospitality operators who were losing orders after hours.",
  },
  {
    year: "2023",
    title: "First voice deployments",
    body: "Our first Voice Commerce lines go live in Melbourne cafes and clinics. Containment rates beat every projection in week one.",
  },
  {
    year: "2024",
    title: "DriveThru & one hundred lines",
    body: "Dynamic DriveThru launches for quick-service restaurants, and the platform passes one hundred live deployments.",
  },
  {
    year: "2025",
    title: "Agents with guardrails",
    body: "AI Agents go generally available — scoped permissions, action logs and human hand-off as standard, not add-ons.",
  },
  {
    year: "2026",
    title: "Six industries, one engine",
    body: "Talent Trek crosses 500 deployments across hospitality, automotive, retail, F&B, healthcare and IT — still Made in Melbourne.",
  },
];

const VALUES = [
  {
    title: "Clarity over cleverness",
    body: "AI should feel obvious to the user. If a flow needs explaining, we redesign it.",
  },
  {
    title: "Humans in the loop",
    body: "Automation handles the repetitive; people handle the sensitive. We design the hand-off.",
  },
  {
    title: "Outcomes, not demos",
    body: "We measure conversion, containment and satisfaction — not how many intents we built.",
  },
];

/** Team roster — initials avatars on token gradient visuals (no stock photography). */
const TEAM = [
  { name: "A. Nguyen", role: "Founder & CEO", initials: "AN" },
  { name: "S. Patel", role: "Head of Voice Engineering", initials: "SP" },
  { name: "M. O'Brien", role: "Lead Conversation Designer", initials: "MO" },
  { name: "J. Chen", role: "Solutions Architect", initials: "JC" },
  { name: "R. Williams", role: "Customer Success Lead", initials: "RW" },
  { name: "E. Kavanagh", role: "Partnerships", initials: "EK" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          websiteLd(),
          localBusinessLd(),
          faqPageLd(COMPANY_FAQS),
          ...TEAM.map((m) => personLd(m.name, m.role)),
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
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
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-sm text-ink-muted"
            >
              <a href="/" className="hover:text-accent">
                Home
              </a>
              <span aria-hidden> / </span>
              <span aria-current="page">About</span>
            </nav>
            <p className="eyebrow mb-3">About us</p>
            <h1 className="text-4xl md:text-5xl">
              The polite face of{" "}
              <span className="grad-text">
                AI
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-muted">
              We&apos;re a Melbourne team building voice, chat and agent AI
              that sounds human, respects your customers and measurably grows
              the business behind it.
            </p>
          </div>
          <div className="service-visual relative flex aspect-[16/10] flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-line p-8 shadow-card">
            <div className="relative flex items-center gap-3" aria-hidden>
              <span className="feat-icon inline-flex h-14 w-14 items-center justify-center rounded-2xl">
                <Mic className="h-7 w-7" />
              </span>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-dim text-accent">
                <MessagesSquare className="h-7 w-7" />
              </span>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-dim text-accent">
                <Bot className="h-7 w-7" />
              </span>
            </div>
            <VoiceWave className="relative h-16 w-full max-w-xs" bars={12} />
            <p className="relative text-sm font-bold text-ink-muted">
              Voice · Chat · Agents — Made in Melbourne
            </p>
          </div>
        </div>
        <WaveBackground />
      </section>

      {/* Story + timeline */}
      <section className="section">
        <div className="container-site grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
          <AnimatedSection>
            <p className="eyebrow mb-3">Our story</p>
            <h2 className="text-3xl md:text-4xl">
              From mapping call flows to six industries
            </h2>
            <p className="mt-4 text-lg text-ink-muted">
              Talent Trek exists because the phone is still how Australian
              business actually gets done — and too many calls still go
              unanswered, unbooked and unpaid.
            </p>
          </AnimatedSection>
          <ol className="relative space-y-8 border-l-2 border-line pl-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative">
                <span
                  className="absolute -left-[41px] mt-1.5 h-4 w-4 rounded-full border-2 border-accent bg-bg"
                  aria-hidden
                />
                <AnimatedSection>
                  <p className="font-display text-xl font-extrabold text-accent">
                    {t.year}
                  </p>
                  <h3 className="mt-1 text-lg">{t.title}</h3>
                  <p className="mt-1 text-ink-muted">{t.body}</p>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="section section-alt border-y border-line">
        <div className="container-site">
          <SectionHeading
            eyebrow="Values"
            title="What we stand for when we build"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <AnimatedSection key={v.title} className="card h-full p-7">
                <h3 className="text-xl text-accent">{v.title}</h3>
                <p className="mt-2 text-ink-muted">{v.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="Team"
            title="The people behind the polite face of AI"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <AnimatedSection key={m.initials} className="card p-6 text-center">
                <div
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-strong)] to-[var(--grad-to)] font-display text-2xl font-extrabold text-white"
                  aria-hidden
                >
                  {m.initials}
                </div>
                <h3 className="mt-4 text-lg">{m.name}</h3>
                <p className="text-sm font-semibold text-accent">{m.role}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* FAQ */}
      <section className="section">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Questions about Talent Trek" />
            <FAQAccordion items={COMPANY_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
