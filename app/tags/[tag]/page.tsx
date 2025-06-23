import { allPosts } from "contentlayer/generated";
import Link from "next/link";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).map((tag) => ({ tag }));
}

export default function TagPage({ params }: TagPageProps) {
  const posts = allPosts
    .filter((post) => post.published && post.tags.includes(params.tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
          #{params.tag}
        </h1>
        <div className="space-y-4 sm:space-y-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Link href={post.url} className="block">
                <h2 className="text-lg sm:text-xl font-medium mb-2">
                  {post.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>{post.formattedDate}</time>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className={`${
                          tag === params.tag
                            ? "text-blue-600 dark:text-blue-300 font-medium"
                            : "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        }`}
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
      </div>
    </main>
  );
}
