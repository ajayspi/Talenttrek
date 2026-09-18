import type { Metadata } from "next";
import { INDUSTRIES } from "@/lib/industries";
import { buildMetadata } from "@/lib/metadata";
import IndustryCard from "@/components/industries/IndustryCard";
import ParticleWave from "@/components/anim/ParticleWave";
import WaveBackground from "@/components/anim/WaveBackground";
import AnimatedIconRow from "@/components/anim/AnimatedIconRow";
import HeroIconScene from "@/components/anim/HeroIconScene";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { JsonLd, faqPageLd, serviceLd } from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "AI solutions shaped to hospitality & wellness, automotive, retail, food & beverage, healthcare and IT — the sectors where phone and order volume is highest.",
  path: "/industries",
});

const INDUSTRY_FAQS = [
  {
    q: "Which industries see the fastest results?",
    a: "Hospitality and F&B usually see results in the first week — call and order volume is highest, so containment pays back fastest. Automotive and healthcare follow within the first month.",
  },
  {
    q: "Do you handle industry-specific compliance?",
    a: "Yes — healthcare deployments follow Australian Privacy Principles with clinical escalation rules, and we log every interaction for auditability across all industries.",
  },
  {
    q: "Can one assistant cover multiple channels?",
    a: "Absolutely — one brain can answer the phone, the web chat and SMS, so a conversation that starts on one channel finishes on another without repeating anything.",
  },
  {
    q: "What if our industry isn't listed?",
    a: "The engine is industry-agnostic — if your business has repetitive calls, bookings or enquiries, we can scope it. Contact us with a sample week of calls and we'll give you an honest read.",
  },
  {
    q: "How do you measure success in our industry?",
    a: "We agree on metrics up front — bookings captured, containment rate, average basket, response time — and report against them monthly, in plain English.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Talent Trek industry solutions",
            description:
              "Voice, chat and agent AI configured for hospitality, automotive, retail, F&B, healthcare and IT.",
            path: "/industries",
          }),
          faqPageLd(INDUSTRY_FAQS),
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
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
              <a href="/" className="hover:text-accent">
                Home
              </a>
              <span aria-hidden> / </span>
              <span aria-current="page">Industries</span>
            </nav>
            <p className="eyebrow mb-3">Industries</p>
            <h1 className="max-w-3xl text-4xl md:text-5xl">
              AI solutions shaped to{" "}
              <span className="grad-text">
                your industry
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">
              The same engine, configured for the calls, menus, compliance and
              peaks your sector is known for. Expand an industry to see the
              pain points we hear most — and how we solve them.
            </p>
            <AnimatedIconRow
              kind="industry"
              id="index"
              caption="Six industries, one platform"
              className="mt-7"
            />
          </div>
          <HeroIconScene
            kind="industry"
            id="index"
            label="Tuned to your sector"
          />
        </div>
        <WaveBackground />
      </section>

      {/* Expandable industry cards */}
      <section className="section">
        <div className="container-site">
          <div className="mx-auto max-w-4xl space-y-4">
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt border-t border-line">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Cross-industry questions"
              align="center"
            />
            <FAQAccordion items={INDUSTRY_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
