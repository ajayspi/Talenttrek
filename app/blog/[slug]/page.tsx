import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { CalendarDays, Clock, User } from "lucide-react";
import {
  authorName,
  featuredImage,
  formatDate,
  getPost,
  getPosts,
  getRelatedPosts,
  readingTime,
  stripHtml,
} from "@/lib/wordpress";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import BlogCard from "@/components/shared/BlogCard";
import ParticleWave from "@/components/anim/ParticleWave";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogScrollTracker from "@/components/shared/BlogScrollTracker";
import { JsonLd, organizationLd, personLd } from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const revalidate = 3600; // ISR — revalidate hourly

export async function generateStaticParams() {
  const posts = await getPosts(50);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const img = featuredImage(post);
  return buildMetadata({
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered).slice(0, 158),
    path: `/blog/${slug}`,
    image: img?.url,
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Sanitise WP content.rendered with DOMPurify, then inject slug ids into
 * H2/H3 so the Table of Contents can deep-link to them.
 */
function processContent(html: string): { html: string; toc: TocEntry[] } {
  const clean = DOMPurify.sanitize(html, {
    ADD_ATTR: ["target", "loading"],
    FORBID_TAGS: ["style", "script"],
  });
  const toc: TocEntry[] = [];
  const withIds = clean.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const text = stripHtml(inner);
      const id = slugify(text);
      toc.push({ id, text, level: Number(level) as 2 | 3 });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    },
  );
  return { html: withIds, toc };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { html, toc } = processContent(post.content.rendered);
  const img = featuredImage(post);
  const related = await getRelatedPosts(post, 3);
  const title = stripHtml(post.title.rendered);
  const readMins = readingTime(post.content.rendered);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description: stripHtml(post.excerpt.rendered),
            image: img?.url,
            datePublished: post.date,
            dateModified: post.modified,
            mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
            author: { "@type": "Person", name: authorName(post) },
            publisher: { "@id": `${SITE.url}/#organization` },
          },
          personLd(authorName(post), "Contributor"),
          organizationLd(),
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: title, url: `/blog/${post.slug}` },
        ]}
      />
      <BlogScrollTracker slug={post.slug} />

      {/* Article hero */}
      <article>
        <header className="relative overflow-hidden border-b border-line bg-gradient-to-br from-primary-dim via-transparent to-accent-dim">
          <ParticleWave />
          <div className="container-site relative py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-muted">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span aria-hidden> / </span>
              <Link href="/blog" className="hover:text-accent">
                Blog
              </Link>
            </nav>
            <h1 className="max-w-3xl text-3xl leading-tight md:text-5xl">
              {title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden /> {authorName(post)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden />{" "}
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden /> {readMins} min read
              </span>
            </div>
          </div>
        </header>

        {img && (
          <div className="container-site py-10">
            <div className="relative mx-auto aspect-[16/8] max-w-4xl overflow-hidden rounded-2xl shadow-card">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Body + TOC */}
        <div className="container-site grid gap-12 pb-16 lg:grid-cols-[1fr_260px]">
          <div
            className="article-body mx-auto w-full max-w-3xl"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {toc.length > 0 && (
            <nav
              aria-label="Table of contents"
              className="h-max lg:sticky lg:top-28"
            >
              <div className="card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">
                  On this page
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {toc.map((entry) => (
                    <li
                      key={entry.id}
                      className={entry.level === 3 ? "pl-4" : undefined}
                    >
                      <a
                        href={`#${entry.id}`}
                        className="text-ink-muted transition-colors hover:text-accent"
                      >
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section section-alt border-t border-line">
          <div className="container-site">
            <SectionHeading eyebrow="Keep reading" title="Related posts" />
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

