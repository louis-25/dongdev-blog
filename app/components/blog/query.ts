// Design Ref: §2.2, §Decision Record — URL 단일 진실원. 모든 목록 상태를 쿼리스트링으로 직렬화
export type BlogSort = "newest" | "oldest";

export interface BlogQueryState {
  q?: string;
  tag?: string;
  category?: string;
  sort?: BlogSort;
  page?: number;
}

// 빈 값/기본값은 생략해 깔끔한 URL 유지. 필터/검색/정렬 변경 시 page는 호출부에서 리셋
export function buildBlogHref(state: BlogQueryState): string {
  const p = new URLSearchParams();
  if (state.q) p.set("q", state.q);
  if (state.category) p.set("category", state.category);
  if (state.tag) p.set("tag", state.tag);
  if (state.sort && state.sort !== "newest") p.set("sort", state.sort);
  if (state.page && state.page > 1) p.set("page", String(state.page));
  const qs = p.toString();
  return qs ? `/blog?${qs}` : "/blog";
}
