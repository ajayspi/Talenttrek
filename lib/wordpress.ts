/**
 * Typed WordPress REST fetcher. All calls are ISR-cached (revalidate 3600)
 * and fail soft: on timeout or non-200 they return null/[] so a WordPress
 * outage can never take the Next.js site down with it.
 */
import { SITE } from "./site";

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: { width?: number; height?: number };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface WPEmbedded {
  author?: WPAuthor[];
  "wp:featuredmedia"?: WPMedia[];
  "wp:term"?: WPTerm[][];
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories?: number[];
  _embedded?: WPEmbedded;
}

const REVALIDATE = 3600;

async function wpFetch<T>(path: string, revalidate = REVALIDATE): Promise<T | null> {
  try {
    const res = await fetch(`${SITE.wpUrl}/wp-json/wp/v2${path}`, {
      next: { revalidate },
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getPosts(perPage = 9): Promise<WPPost[]> {
  const data = await wpFetch<WPPost[]>(
    `/posts?_embed&per_page=${perPage}&orderby=date&order=desc`,
  );
  return data ?? [];
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const data = await wpFetch<WPPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed`,
  );
  return data && data.length > 0 ? data[0] : null;
}

export async function getRelatedPosts(
  post: WPPost,
  perPage = 3,
): Promise<WPPost[]> {
  const cat = firstCategoryId(post);
  const base = `/posts?_embed&per_page=${perPage + 1}&exclude=${post.id}`;
  const path = cat ? `${base}&categories=${cat}` : base;
  const data = await wpFetch<WPPost[]>(path);
  return (data ?? []).slice(0, perPage);
}

/* ---------------- helpers ---------------- */

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&ldquo;/g, '"')
    .replace(/&#8221;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function readingTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function featuredImage(post: WPPost): { url: string; alt: string } | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return null;
  return { url: media.source_url, alt: media.alt_text || stripHtml(post.title.rendered) };
}

export function authorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? "Talent Trek";
}

export function categoriesOf(post: WPPost): WPTerm[] {
  return post._embedded?.["wp:term"]?.[0] ?? [];
}

export function firstCategoryId(post: WPPost): number | null {
  return post.categories && post.categories.length > 0 ? post.categories[0] : null;
}
