"use client";

// Design Ref: §5.3, §Decision Record — 검색/정렬은 URL을 갱신할 뿐(단일 진실원). page는 리셋
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import { buildBlogHref, type BlogSort } from "./query";

export default function BlogToolbar({ total }: { total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQ = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const sort: BlogSort = searchParams.get("sort") === "oldest" ? "oldest" : "newest";

  const [query, setQuery] = useState(currentQ);

  // URL(q)이 외부에서 바뀌면(필터 초기화 등) 입력 동기화
  useEffect(() => {
    setQuery(currentQ);
  }, [currentQ]);

  // 입력 디바운스 → URL 갱신(검색 변경 시 page 리셋)
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed === currentQ) return;
    const id = setTimeout(() => {
      router.replace(
        buildBlogHref({ q: trimmed || undefined, category, tag, sort }),
        { scroll: false }
      );
    }, 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const toggleSort = () => {
    const next: BlogSort = sort === "newest" ? "oldest" : "newest";
    router.replace(
      buildBlogHref({ q: currentQ || undefined, category, tag, sort: next }),
      { scroll: false }
    );
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="글 검색..."
          aria-label="글 검색"
          className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="text-sm text-muted-foreground">
          총 <span className="font-medium text-foreground">{total}</span>개
        </span>
        <button
          type="button"
          onClick={toggleSort}
          aria-label={`정렬: ${sort === "newest" ? "최신순" : "오래된순"}`}
          className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors hover:border-brand/50 hover:text-brand"
        >
          {sort === "newest" ? (
            <ArrowDownWideNarrow className="size-4" />
          ) : (
            <ArrowUpWideNarrow className="size-4" />
          )}
          {sort === "newest" ? "최신순" : "오래된순"}
        </button>
      </div>
    </div>
  );
}
