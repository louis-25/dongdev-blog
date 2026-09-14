import { Feed } from "feed";
import { allPosts } from "content-collections";
import { SITE } from "@/config/site";

export async function GET() {
  const feed = new Feed({
    title: SITE.name,
    description: SITE.description,
    id: `${SITE.url}/`,
    link: `${SITE.url}/`,
    language: "ko",
    favicon: `${SITE.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    author: {
      name: SITE.author,
      link: `${SITE.url}/about`,
    },
  });

  allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      const link = `${SITE.url}${post.url}`;
      feed.addItem({
        title: post.title,
        id: link,
        link,
        // 본문은 MDX 원문(import/JSX 포함)이라 리더에서 깨진다. 요약만 싣고 본문은 링크로 유도.
        description: post.description,
        date: new Date(post.date),
        category: (post.tags ?? []).map((name) => ({ name })),
      });
    });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
