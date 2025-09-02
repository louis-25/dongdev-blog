import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { ScrollReveal } from "./components/animations/ScrollReveal";

export default function Home() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="prose dark:prose-invert">
      <ScrollReveal>
        <h1 className="mb-8">블로그</h1>
      </ScrollReveal>

      <div className="space-y-6">
        {posts.map((post, idx) => (
          <ScrollReveal key={post._id} delay={idx * 0.1}>
            <article className="flex flex-col space-y-2">
              <Link href={post.url} className="no-underline">
                <h2 className="mb-2">{post.title}</h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
              <div className="flex gap-2">
                {post.tags?.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 no-underline"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              <time className="text-sm text-gray-500">
                {post.formattedDate}
              </time>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
