"use client";

import { TechKey, TECHS } from "../utils/SkillPicker";
import { Tag } from "./ui/Tag";

interface TagListProps {
  tags: TechKey[];
  selectedTag?: TechKey;
  className?: string;
  showCount?: boolean;
  tagCounts?: Record<TechKey, number>;
  isClickable?: boolean;
}

export function TagList({
  tags,
  selectedTag,
  className = "",
  showCount = false,
  tagCounts,
  isClickable = true,
}: TagListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags?.map((tag) => {
        return (
          <Tag
            key={tag}
            name={`${tag}`}
            isSelected={tag === selectedTag}
            count={showCount && tagCounts ? tagCounts[tag] : undefined}
            isClickable={isClickable}
          ></Tag>
        );
      })}
    </div>
  );
}
