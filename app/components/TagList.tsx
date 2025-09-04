"use client";

import { Tag } from "./ui/Tag";

interface TagListProps {
  tags: string[];
  selectedTag?: string;
  className?: string;
  showCount?: boolean;
  tagCounts?: Record<string, number>;
}

export function TagList({
  tags,
  selectedTag,
  className = "",
  showCount = false,
  tagCounts,
}: TagListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags?.map((tag) => (
        <Tag
          key={tag}
          name={tag}
          isSelected={tag === selectedTag}
          count={showCount && tagCounts ? tagCounts[tag] : undefined}
        />
      ))}
    </div>
  );
}
