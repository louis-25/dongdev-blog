import { allPosts } from "content-collections";
import { compareDesc } from "date-fns";
import { notFound } from "next/navigation";
import { TagList } from "@/app/components/TagList";
import { InteractiveLink } from "@/app/components/ui/interactive";
import { TechKey } from "@/app/utils/SkillPicker";

interface TagPageProps {
  // Next 16부터 params는 Promise다 (동기 접근 제거됨)
  params: Promise<{
    tag: string;
  }>;
}

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent((await params).tag);
  return {
    title: `#${tag}`,
    description: `${tag} 태그가 달린 글 모음입니다.`,
    alternates: { canonical: `/tags/${encodeURIComponent(tag)}` },
  };
}

export function generateStaticParams() {
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag) as TechKey;

  const posts = allPosts
    .filter((post) => post.published && post.tags?.includes(decodedTag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  if (posts.length === 0) {
    notFound();
  }

  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags || []))
  ).sort() as TechKey[];
  const tagCounts: Record<string, number> = {};
  for (const post of allPosts) {
    const tags = (post.tags as TechKey[] | undefined) ?? [];
    for (const tag of tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }
  return (
    <div className="prose dark:prose-invert">
      {/* <h1 className="mb-4">태그: {decodedTag}</h1> */}
      <h1 className="text-3xl font-bold mb-4">Tags</h1>
      {/* <TechTags tags={allTags} size="sm" selectedTag={decodedTag} /> */}
      <TagList
        tags={allTags}
        selectedTag={decodedTag}
        className="mb-8"
        showCount
        tagCounts={tagCounts}
      />
      <div className="space-y-6">
        {posts.map((post) => (
          <InteractiveLink
            key={post.url}
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
