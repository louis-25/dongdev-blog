// Design Ref: §5.3, §5.4 — 카테고리/태그 필터 (서버). URL 쿼리로 필터, q/sort 보존·page 리셋
import Link from "next/link";
import { X } from "lucide-react";
import { Tag } from "../ui/Tag";
import { buildBlogHref, type BlogSort } from "./query";
import type { TechKey } from "@/app/utils/SkillPicker";

interface BlogFiltersProps {
  categories: string[];
  tags: TechKey[];
  activeCategory?: string;
  activeTag?: string;
  q?: string;
  sort?: BlogSort;
}

export default function BlogFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
  q,
  sort,
}: BlogFiltersProps) {
  const pillBase =
    "inline-flex items-center rounded-full px-3 py-1 text-sm transition-colors";

  return (
    <div className="space-y-3">
      {/* 카테고리 칩 */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildBlogHref({ q, sort })}
          className={`${pillBase} ${
            !activeCategory
              ? "bg-brand/15 text-brand"
              : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
        >
          전체
        </Link>
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <Link
              key={category}
              // 활성 카테고리 재클릭 시 해제(category 제거), 태그도 함께 초기화
              href={buildBlogHref({
                q,
                sort,
                category: isActive ? undefined : category,
              })}
              className={`${pillBase} capitalize ${
                isActive
                  ? "bg-brand/15 text-brand"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>

      {/* 태그 칩 (선택 카테고리 컨텍스트 유지) */}
      {tags.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag}
              name={tag}
              isSelected={activeTag === tag}
              href={buildBlogHref({
                q,
                sort,
                category: activeCategory,
                tag: activeTag === tag ? undefined : tag,
              })}
            />
          ))}
        </div>
      ) : null}

      {/* 활성 필터 해제 */}
      {(activeCategory || activeTag || q) && (
        <Link
          href={buildBlogHref({})}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand"
        >
          <X className="size-3" />
          필터 초기화
        </Link>
      )}
    </div>
  );
}
