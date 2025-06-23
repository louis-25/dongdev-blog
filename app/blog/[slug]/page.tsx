import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split("/").pop(),
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath.split("/").pop() === params.slug
  );

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          <time dateTime={post.date}>{post.formattedDate}</time>
          <span className="hidden sm:inline">•</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-blue-500 dark:text-blue-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="prose prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none">
        <MDXContent />
      </div>
    </article>
  );
}
