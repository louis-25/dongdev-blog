import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { CATEGORY_LIST } from "@/config/post";
import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.filter((post) => post.published);
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));

  return [
    { url: SITE.url, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/tags`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...posts.map((post) => ({
      url: `${SITE.url}${post.url}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...CATEGORY_LIST.map((category) => ({
      url: `${SITE.url}/category/${category}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...tags.map((tag) => ({
      url: `${SITE.url}/tags/${encodeURIComponent(tag)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
