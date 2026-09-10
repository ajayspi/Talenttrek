import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getPosts } from "@/lib/wordpress";

/** Auto-generated sitemap: static routes + WP posts (fails soft to static). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/services/voice-commerce",
    "/services/chat-ai-automotive",
    "/services/dynamic-drivethru",
    "/services/ai-agent",
    "/industries",
    "/industries/hospitality-wellness",
    "/industries/automotive",
    "/industries/retail",
    "/industries/food-beverage",
    "/industries/healthcare",
    "/industries/information-technology",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/cookie-policy",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/blog" ? 0.8 : 0.7,
  }));

  const posts = await getPosts(100);
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.modified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
