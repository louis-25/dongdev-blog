import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { notFound } from "next/navigation";
import { TagList } from "@/app/components/TagList";
import { InteractiveLink } from "@/app/components/ui/interactive";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export function generateStaticParams() {
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).map((tag) => ({ tag }));
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);

  const posts = allPosts
    .filter((post) => post.published && post.tags?.includes(decodedTag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  if (posts.length === 0) {
    notFound();
  }

  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags || []))
  ).sort();

  return (
    <div className="prose dark:prose-invert">
      <h1 className="mb-4">태그: {decodedTag}</h1>
      <TagList tags={allTags} selectedTag={decodedTag} className="mb-8" />
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
