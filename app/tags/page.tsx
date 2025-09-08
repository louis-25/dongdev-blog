import { allPosts } from "contentlayer/generated";
import { TagList } from "../components/TagList";
import { TechKey } from "../utils/SkillPicker";

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
