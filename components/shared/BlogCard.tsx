import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, User } from "lucide-react";
import {
  authorName,
  categoriesOf,
  featuredImage,
  formatDate,
  readingTime,
  stripHtml,
  type WPPost,
} from "@/lib/wordpress";
import AnimatedSection from "./AnimatedSection";

export default function BlogCard({ post }: { post: WPPost }) {
  const img = featuredImage(post);
  const cats = categoriesOf(post);

  return (
    <AnimatedSection>
      <article className="card card-hover group h-full overflow-hidden">
        <Link
          href={`/blog/${post.slug}`}
          className="flex h-full flex-col focus-visible:outline-none"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-alt">
            {img ? (
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary-dim to-accent-dim"
                aria-hidden
              />
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            {cats.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {cats.slice(0, 2).map((c) => (
                  <span key={c.id} className="tag">
                    {c.name}
                  </span>
                ))}
              </div>
            )}
            <h3 className="mb-2 text-lg leading-snug group-hover:text-accent">
              {stripHtml(post.title.rendered)}
            </h3>
            <p className="mb-5 line-clamp-3 text-sm text-ink-muted">
              {stripHtml(post.excerpt.rendered)}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" aria-hidden />
                {authorName(post)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {readingTime(post.content.rendered)} min read
              </span>
            </div>
          </div>
        </Link>
      </article>
    </AnimatedSection>
  );
}
