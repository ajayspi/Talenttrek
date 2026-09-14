import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const PRODUCTS = [
  {
    src: "/site/product-1.png",
    alt: "AI voice agent taking a customer order",
    label: "Voice AI ordering",
  },
  {
    src: "/site/product-2.png",
    alt: "AI chat assistant answering on web and SMS",
    label: "Chat & SMS automation",
  },
  {
    src: "/site/product-3.png",
    alt: "Autonomous AI agent working inside business tools",
    label: "Autonomous AI agents",
  },
  {
    src: "/site/product-4.png",
    alt: "CRM and POS integrations connected to the AI platform",
    label: "CRM & integrations",
  },
];

/**
 * "Our product / Recent AI solutions" showcase — mirrors the WordPress
 * homepage section: large showcase visual with a floating animated demo
 * card, four product tiles and a demo CTA.
 */
export default function ProductShowcase() {
  return (
    <section className="section" aria-labelledby="product-showcase">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual side */}
          <AnimatedSection className="relative">
            <div className="group relative overflow-hidden rounded-3xl border border-line shadow-card">
              <Image
                src="/site/product-showcase.png"
                alt="Talent Trek AI platform — voice, chat and agent solutions working across channels"
                width={1536}
                height={758}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            {/* Floating animated demo card */}
            <div className="absolute -bottom-8 -right-3 hidden w-44 animate-drift-slow overflow-hidden rounded-2xl border border-line bg-surface shadow-card md:block lg:-right-8">
              <Image
                src="/site/hero-animation.gif"
                alt="Animated demo of an AI assistant conversation"
                width={400}
                height={400}
                unoptimized
                sizes="176px"
                className="h-auto w-full"
              />
            </div>
          </AnimatedSection>

          {/* Copy + product tiles */}
          <div>
            <AnimatedSection>
              <p className="eyebrow mb-3">Our product</p>
              <h2 id="product-showcase" className="text-3xl md:text-4xl">
                Recent AI solutions, built for real work
              </h2>
              <p className="mt-4 text-lg text-ink-muted">
                We develop intelligent AI agents that solve real business
                challenges — answering, booking, selling and following up
                across every channel your customers use.
              </p>
            </AnimatedSection>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {PRODUCTS.map((p) => (
                <AnimatedSection key={p.src} className="card group overflow-hidden p-4">
                  <div className="overflow-hidden rounded-xl border border-line">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={512}
                      height={512}
                      sizes="(min-width: 1024px) 20vw, 45vw"
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold">{p.label}</p>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection>
              <Link href="/contact" className="btn btn-primary mt-8">
                Get a Demo <ArrowRight className="arrow h-4 w-4" aria-hidden />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
