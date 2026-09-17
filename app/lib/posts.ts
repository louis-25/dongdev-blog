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
  return allPosts.map((post) => ({
    title: post.title,
    description: post.description,
    url: post.url,
    tags: post.tags,
  }));
}

export type PostLink = Pick<PostSearchItem, "title" | "description" | "url">;

const toLink = ({ title, description, url }: PostLink): PostLink => ({
  title,
  description,
  url,
});

// 글 하단 동선: 날짜순 이전(더 오래된)/다음(더 최신) 글 + 태그·카테고리가 겹치는 관련 글
export function getPostNeighbors(slug: string) {
  const sorted = [...allPosts].sort((a, b) => a.date.localeCompare(b.date));
  const i = sorted.findIndex((p) => p.slugAsParams === slug);
  const post = sorted[i];
  const tags = new Set(post?.tags ?? []);

  const related = sorted
    .filter((p) => p !== post)
    .map((p) => ({
      p,
      // 공유 태그 1개당 2점, 같은 카테고리 1점
      score:
        (p.tags ?? []).filter((t) => tags.has(t)).length * 2 +
        (p.category === post?.category ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, 3)
    .map(({ p }) => toLink(p));

  return {
    prev: i > 0 ? toLink(sorted[i - 1]) : null,
    next: i >= 0 && i < sorted.length - 1 ? toLink(sorted[i + 1]) : null,
    related,
  };
}
