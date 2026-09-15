import { allPosts } from "content-collections";
import { TagList } from "../components/TagList";
import { TechKey } from "../utils/SkillPicker";

import { pageMetadata } from "@/app/lib/metadata";

export const metadata = pageMetadata({
  title: "태그",
  description: "글에 사용된 전체 태그 목록입니다.",
  path: "/tags",
});

export default function TagsPage() {
  const tagCounts = allPosts
    .filter((post) => post.published)
    .flatMap((post) => post.tags || [])
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const tags = Object.keys(tagCounts).sort() as TechKey[];

  return (
    <div className="prose dark:prose-invert">
      <h1 className="mb-8">태그</h1>
      <TagList tags={tags} showCount tagCounts={tagCounts} />
    </div>
  );
}
