import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import StatsCounter from "@/components/home/StatsCounter";
import ServicesGrid from "@/components/home/ServicesGrid";
import IndustriesStrip from "@/components/home/IndustriesStrip";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import BlogCard from "@/components/shared/BlogCard";
import FAQAccordion from "@/components/shared/FAQAccordion";
import {
  faqPageLd,
  howToLd,
  localBusinessLd,
  organizationLd,
  websiteLd,
  JsonLd,
} from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getPosts } from "@/lib/wordpress";
import { COMPANY_FAQS } from "@/lib/faqs";

const HOW_IT_WORKS = [
  {
    title: "Discover",
    body: "We map your call flows, menus, FAQs and customer pain points before a line of code.",
  },
  {
    title: "Forge",
    body: "We wire the platform to your channels, phones and stack — typed, tested, safe.",
  },
  {
    title: "Go live",
    body: "Deployable standalone or as part of a connected experience. No rip and replace.",
  },
];

export default async function HomePage() {
  // Latest 3 posts from WP REST (ISR-cached, fails soft to []).
  const posts = await getPosts(3);

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          websiteLd(),
          localBusinessLd(),
          howToLd({
            name: "How Talent Trek deploys AI",
            description:
              "The three-step path from first conversation to a live AI deployment.",
            steps: HOW_IT_WORKS,
          }),
          faqPageLd(COMPANY_FAQS),
        ]}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }]} />

      <Hero />
      <StatsCounter />
      <ServicesGrid />
      <IndustriesStrip />
      <PartnersMarquee />

      {/* How it works — 3-step HowTo */}
      <section className="section" aria-labelledby="how-it-works">
        <div className="container-site">
          <SectionHeading
            eyebrow="How it works"
            title="From first call to live AI in three steps"
            lede="A transparent path — you approve scripts, intents and success metrics before anything goes live."
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title}>
                <AnimatedSection className="card h-full p-7">
                  <span className="font-display text-4xl font-extrabold text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-xl">{step.title}</h3>
                  <p className="mt-2 text-ink-muted">{step.body}</p>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="section section-alt border-y border-line"
        aria-labelledby="testimonials"
      >
        <div className="container-site">
          <SectionHeading
            eyebrow="Testimonials"
            title="What operators say after go-live"
          />
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Blog — latest 3 from WP REST */}
      <section className="section" aria-labelledby="latest-blog">
        <div className="container-site">
          <SectionHeading
            eyebrow="Blog"
            title="Practical AI guidance, written plainly"
          />
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <AnimatedSection className="card mx-auto max-w-xl p-8 text-center">
              <h3 className="text-xl">New articles are on the way</h3>
              <p className="mt-2 text-ink-muted">
                We&apos;re writing practical guides on voice AI, chat
                automation and agent guardrails. Check back soon.
              </p>
            </AnimatedSection>
          )}
          {posts.length > 0 && (
            <div className="mt-10 text-center">
              <Link href="/blog" className="btn btn-ghost">
                Read the blog <ArrowRight className="arrow h-4 w-4" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section section-alt border-y border-line"
        aria-labelledby="home-faq"
      >
        <div className="container-site">
          <SectionHeading eyebrow="FAQ" title="Questions about Talent Trek" />
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={COMPANY_FAQS} />
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="section" aria-labelledby="home-cta">
        <div className="container-site">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-deep px-8 py-16 text-center text-deep-text md:px-16">
              <h2 id="home-cta" className="relative text-3xl md:text-4xl">
                Book a <span className="text-deep-accent">Free Demo</span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-deep-text">
                Call 1800 860 624 or send a message — we reply fast, in plain
                English.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn btn-primary-deep">
                  Book a Free Demo{" "}
                  <ArrowRight className="arrow h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
