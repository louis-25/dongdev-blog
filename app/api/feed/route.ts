import { Feed } from "feed";
import { allPosts } from "contentlayer/generated";

export async function GET() {
  const feed = new Feed({
    title: "DongDev Blog",
    description: "A blog about web development and technology",
    id: "https://dongdev-blog.vercel.app/",
    link: "https://dongdev-blog.vercel.app/",
    language: "ko",
    favicon: "https://dongdev-blog.vercel.app/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    author: {
      name: "DongDev",
      email: "dongdev@example.com",
      link: "https://dongdev-blog.vercel.app/about",
    },
  });

  allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `https://dongdev-blog.vercel.app${post.url}`,
        link: `https://dongdev-blog.vercel.app${post.url}`,
        description: post.description,
        date: new Date(post.date),
        content: post.body.raw,
      });
    });

  feed.addCategory("Technology");
  feed.addCategory("Web Development");

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
