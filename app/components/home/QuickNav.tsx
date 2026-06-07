// Design Ref: §5.3, §2.3 — 카테고리/태그 빠른 탐색 (서버). 기존 TagList·getCategoryTagsWithCounts 재사용
// Plan SC: FR-07 — Profile은 데스크톱 전용이므로 홈에서 모바일에도 탐색 동선 제공
import Link from "next/link";
import { TagList } from "../TagList";
import type { TechKey } from "@/app/utils/SkillPicker";
import type { CategoryData } from "@/app/lib/posts";

export default function QuickNav({
  categoryData,
}: {
  categoryData: CategoryData[];
}) {
  const visible = categoryData.filter(({ tags }) => tags.length > 0);
  if (visible.length === 0) return null;

  return (
    <section aria-labelledby="quicknav-heading" className="mt-12">
      <h2 id="quicknav-heading" className="text-xl font-semibold">
        카테고리 둘러보기
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map(({ category, tags, tagCounts }) => {
          const total = Object.values(tagCounts || {}).reduce(
            (sum, n) => sum + (n ?? 0),
            0
          );
          return (
            <div
              key={category}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <Link
                  href={`/category/${category}`}
                  className="text-sm font-semibold capitalize hover:text-brand"
                >
                  {category}
                </Link>
                <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-xs tabular-nums text-muted-foreground">
                  {total}
                </span>
              </div>
              <TagList
                tags={tags}
                showCount
                tagCounts={tagCounts as Record<TechKey, number>}
                category={category}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
