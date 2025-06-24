import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { InteractiveLink } from "../components/ui/interactive";

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="prose dark:prose-invert">
      <h1 className="mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <InteractiveLink
            key={post._id}
            href={post.url}
            className="block no-underline"
          >
            <article className="group">
              <h2 className="mb-2 text-xl">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                {new Date(post.date).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </article>
          </InteractiveLink>
        ))}
      </div>
    </div>
  );
}
