import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { CATEGORY_LIST } from "@/config/post";
import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.filter((post) => post.published);
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));
  // 발행 글이 없는 카테고리 페이지는 404이므로 싣지 않는다
  const categories = CATEGORY_LIST.filter((category) =>
    posts.some((post) => post.category === category)
  );

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
    ...categories.map((category) => ({
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
