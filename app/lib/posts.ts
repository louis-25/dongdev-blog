import { allPosts } from "content-collections";
import { CATEGORY_LIST } from "@/config/post";
import type { TechKey } from "@/app/utils/SkillPicker";

// 서버 전용 모듈: allPosts(전체 MDX 본문 포함)를 여기서만 소비하고,
// 클라이언트로는 아래의 경량 데이터만 전달해 번들에 본문이 실리지 않게 한다.

export type PostSearchItem = {
  title: string;
  description: string;
  url: string;
  tags?: string[];
};

export type CategoryData = {
  category: string;
  tags: TechKey[];
  tagCounts: Record<TechKey, number>;
};

export function getCategoryTagsWithCounts(): { categoryData: CategoryData[] } {
  const countsByCategory: Record<string, Record<TechKey, number>> = {};
  const tagsByCategory: Record<string, TechKey[]> = {};

  for (const category of CATEGORY_LIST) {
    countsByCategory[category] = {} as Record<TechKey, number>;
    tagsByCategory[category] = [] as TechKey[];
  }

  for (const post of allPosts) {
    if (!post.published) continue;
    const category = post.category as string;
    if (!CATEGORY_LIST.includes(category)) continue;
    const tags = (post.tags as TechKey[] | undefined) ?? [];
    for (const tag of tags) {
      const current = countsByCategory[category][tag] ?? 0;
      countsByCategory[category][tag] = current + 1;
    }
  }

  for (const category of CATEGORY_LIST) {
    const tagCounts = countsByCategory[category];
    const tags = Object.keys(tagCounts).sort((a, b) =>
      a.localeCompare(b)
    ) as TechKey[];
    tagsByCategory[category] = tags;
  }

  const categoryData = CATEGORY_LIST.map((category) => ({
    category,
    tags: tagsByCategory[category],
    tagCounts: countsByCategory[category],
  }));

  return { categoryData };
}

// 검색에 필요한 최소 필드만 추린 경량 인덱스 (본문 제외)
export function getSearchIndex(): PostSearchItem[] {
  return allPosts
    .filter((post) => post.published)
    .map((post) => ({
      title: post.title,
      description: post.description,
      url: post.url,
      tags: post.tags,
    }));
}
