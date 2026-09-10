import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import ContactForm from "@/components/shared/ContactForm";
import ParticleWave from "@/components/anim/ParticleWave";
import WaveBackground from "@/components/anim/WaveBackground";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import {
  JsonLd,
  contactPageLd,
  faqPageLd,
  localBusinessLd,
  websiteLd,
} from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Call 1800 860 624, email info@talenttrek.com.au or send a message — we reply fast, in plain English. 312/86 Overton Rd, Williams Landing.",
  path: "/contact",
});

const CONTACT_FAQS = [
  {
    q: "What happens after I send a message?",
    a: "We reply within one business day — usually with a couple of questions and a suggested time for a discovery call. No sales scripts, no pressure.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. Deployments are scoped from single-site operators to multi-location groups — the pilot is sized to your volume, not the other way round.",
  },
  {
    q: "Can you call me instead?",
    a: "Of course — call 1800 860 624 any time. If we're mid-deployment you'll get a callback the same business day.",
  },
  {
    q: "What should I prepare for the first call?",
    a: "A sample of your real conversations helps most: a call flow, menu, FAQ list or enquiry inbox. Nothing polished — raw and recent beats perfect.",
  },
  {
    q: "Is the demo really free?",
    a: "Yes. The demo includes a walkthrough on your own sample conversations and a scoped proposal with measurable outcomes. If we're not the right fit, we'll say so.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[contactPageLd(), localBusinessLd(), websiteLd(), faqPageLd(CONTACT_FAQS)]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface via-primary-dim/15 to-surface">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-dim/30 via-transparent to-accent-dim/30"
          aria-hidden
        />
        <ParticleWave />
        <div className="container-site relative py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-muted">
            <a href="/" className="hover:text-accent">
              Home
            </a>
            <span aria-hidden> / </span>
            <span aria-current="page">Contact</span>
          </nav>
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="max-w-3xl text-4xl md:text-5xl">
            Talk about your{" "}
            <span className="grad-text">
              customer conversations
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-muted">
            Call 1800 860 624 or send a message — we reply fast, in plain
            English.
          </p>
        </div>
        <WaveBackground />
      </section>

      {/* Form + details + map */}
      <section className="section">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <AnimatedSection>
            <ContactForm />
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection className="card p-7">
              <h2 className="text-xl">Studio details</h2>
              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3.5">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-dim text-accent">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-ink-muted">
                      Phone (toll-free)
                    </span>
                    <a
                      href={SITE.phone.href}
                      className="font-bold text-ink hover:text-accent"
                    >
                      {SITE.phone.display}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-dim text-accent">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-ink-muted">
                      Email
                    </span>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="font-bold text-ink hover:text-accent"
                    >
                      {SITE.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-dim text-accent">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-ink-muted">
                      Studio
                    </span>
                    <span className="font-bold text-ink">
                      {SITE.address.full}
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-dim text-accent">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-ink-muted">
                      Hours
                    </span>
                    <span className="font-bold text-ink">
                      Mon–Fri, 9am–5pm AEST
                    </span>
                    <span className="block text-sm text-ink-muted">
                      The AI answers 24/7 — so do our demos.
                    </span>
                  </span>
                </li>
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-sm text-ink-muted">
                ABN {SITE.abn}
              </p>
            </AnimatedSection>

            <AnimatedSection className="card overflow-hidden">
              <iframe
                src={SITE.mapEmbedUrl}
                title={`Map showing ${SITE.name} at ${SITE.address.full}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0"
                allowFullScreen
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt border-t border-line">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Before you contact us"
              align="center"
            />
            <FAQAccordion items={CONTACT_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
