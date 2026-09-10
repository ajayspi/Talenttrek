import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import BlogCard from "@/components/shared/BlogCard";
import ParticleWave from "@/components/anim/ParticleWave";
import WaveBackground from "@/components/anim/WaveBackground";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { JsonLd, websiteLd } from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getPosts } from "@/lib/wordpress";

export const revalidate = 3600; // ISR — revalidate hourly

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical guidance on voice AI, chat automation and agent guardrails — written plainly for Australian operators.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts(12);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Talent Trek Blog",
            url: "/blog",
            publisher: { "@id": "/#organization" },
          },
          websiteLd(),
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
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
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span aria-hidden> / </span>
            <span aria-current="page">Blog</span>
          </nav>
          <p className="eyebrow mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl">Practical AI, written plainly</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-muted">
            Guidance, field notes and honest lessons from deploying voice,
            chat and agent AI across Australian businesses.
          </p>
        </div>
        <WaveBackground />
      </section>

      {/* Grid */}
      <section className="section">
        <div className="container-site">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <AnimatedSection className="card mx-auto max-w-xl p-10 text-center">
              <h2 className="text-xl">Posts are coming soon</h2>
              <p className="mt-2 text-ink-muted">
                We&apos;re writing the first batch of articles now — check
                back shortly, or{" "}
                <Link href="/contact" className="font-bold text-accent underline">
                  ask us anything directly
                </Link>
                .
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
