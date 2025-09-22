"use client";

import { usePathname, useRouter } from "next/navigation";
import { TechKey, TECHS } from "../utils/SkillPicker";
import { Tag } from "./ui/Tag";

interface TagListProps {
  tags: TechKey[];
  selectedTag?: TechKey;
  className?: string;
  showCount?: boolean;
  tagCounts?: Record<TechKey, number>;
  isClickable?: boolean;
  category?: string;
}

export function TagList({
  tags,
  selectedTag,
  className = "",
  showCount = false,
  tagCounts,
  isClickable = true,
  category,
}: TagListProps) {
  const pathname = usePathname();
  const currentTag = pathname.split("/").pop();
  // const isSelected = tag === selectedTag;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags?.map((tag) => {
        return (
          <Tag
            key={tag}
            name={`${tag}`}
            isSelected={tag === currentTag}
            count={showCount && tagCounts ? tagCounts[tag] : undefined}
            isClickable={isClickable}
            href={
              category
                ? `/category/${category}?tag=${encodeURIComponent(tag)}`
                : `/tags/${tag}`
            }
          ></Tag>
        );
      })}
    </div>
  );
}
