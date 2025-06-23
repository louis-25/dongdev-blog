import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold mb-8">블로그</h1>
      <div className="w-full max-w-2xl space-y-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <Link href={post.url} className="block">
              <h2 className="text-xl font-medium mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.date}>{post.formattedDate}</time>
                <span className="mx-2">•</span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
