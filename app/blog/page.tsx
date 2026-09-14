// Design Ref: §2.1 — 블로그 목록 서버 컴포넌트. URL 쿼리(q/tag/category/sort/page)로 필터·정렬·페이지 계산
import { allPosts } from "content-collections";
import { compareAsc, compareDesc } from "date-fns";
import { getCategoryTagsWithCounts } from "@/app/lib/posts";
import type { TechKey } from "@/app/utils/SkillPicker";
import BlogToolbar from "../components/blog/BlogToolbar";
import BlogFilters from "../components/blog/BlogFilters";
import PostListRow, {
  type BlogRowItem,
} from "../components/blog/PostListRow";
import BlogPagination from "../components/blog/BlogPagination";
import type { BlogSort } from "../components/blog/query";

const POSTS_PER_PAGE = 5;

function first(v: string | string[] | undefined): string | undefined {
  const s = Array.isArray(v) ? v[0] : v;
  return s && s.trim() ? s.trim() : undefined;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그",
  description: "검색·태그·카테고리로 찾아보는 전체 글 목록입니다.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const q = first(sp.q);
  const category = first(sp.category);
  const tag = first(sp.tag);
  const sort: BlogSort = first(sp.sort) === "oldest" ? "oldest" : "newest";

  // Plan SC: FR-02/FR-01 — published + category + tag + q 필터 (서버)
  const lowerQ = q?.toLowerCase();
  const filtered = allPosts.filter((post) => {
    if (!post.published) return false;
    if (category && post.category !== category) return false;
    if (tag && !(post.tags ?? []).includes(tag)) return false;
    if (lowerQ) {
      const haystack = [
        post.title,
        post.description,
        ...(post.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(lowerQ)) return false;
    }
    return true;
  });

  // Plan SC: FR-03 — 정렬(최신/오래된)
  const sorted = filtered.sort((a, b) =>
    sort === "oldest"
      ? compareAsc(new Date(a.date), new Date(b.date))
      : compareDesc(new Date(a.date), new Date(b.date))
  );

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const parsed = Number(first(sp.page) ?? "1");
  const currentPage = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, 1), totalPages)
    : 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts: BlogRowItem[] = sorted
    .slice(start, start + POSTS_PER_PAGE)
    .map((post) => ({
      title: post.title,
      description: post.description,
      url: post.url,
      formattedDate: post.formattedDate,
      tags: post.tags,
      thumbnail: post.thumbnail,
    }));

  // 필터 칩 데이터: 글 있는 카테고리 + (선택 시) 해당 카테고리 태그, 아니면 전체 태그
  const { categoryData } = getCategoryTagsWithCounts();
  const withPosts = categoryData.filter(({ tags }) => tags.length > 0);
  const categories = withPosts.map(({ category }) => category);
  const tagsToShow: TechKey[] = category
    ? withPosts.find((c) => c.category === category)?.tags ?? []
    : Array.from(new Set(withPosts.flatMap(({ tags }) => tags)));

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">블로그</h1>

      <div className="space-y-5">
        <BlogToolbar total={total} />
        <BlogFilters
          categories={categories}
          tags={tagsToShow}
          activeCategory={category}
          activeTag={tag}
          q={q}
          sort={sort}
        />
      </div>

      <div className="mt-6 space-y-4">
        {pagePosts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            조건에 맞는 글이 없습니다.
          </p>
        ) : (
          pagePosts.map((post) => <PostListRow key={post.url} post={post} />)
        )}
      </div>

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        q={q}
        tag={tag}
        category={category}
        sort={sort}
      />
    </div>
  );
}
