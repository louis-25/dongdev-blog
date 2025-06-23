import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function Home() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8">
          DongDev Blog
        </h1>
        <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-gray-600 dark:text-gray-400">
          Next.js와 React로 만드는 개발 블로그
        </p>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            최근 포스트
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {posts.map((post) => (
              <article
                key={post._id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <Link href={post.url} className="block">
                  <h3 className="text-lg sm:text-xl font-medium mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.date}>{post.formattedDate}</time>
                    <span className="hidden sm:inline mx-2">•</span>
                    <div className="flex flex-wrap gap-2">
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
        </section>
      </div>
    </main>
  );
}
