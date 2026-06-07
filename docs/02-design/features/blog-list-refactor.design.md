---
template: design
version: 1.3
feature: blog-list-refactor
date: 2026-06-07
author: louis-25
project: dongdev-blog
projectVersion: 0.1.0
status: Draft
---

# blog-list-refactor Design Document

> **Summary**: `/blog`을 Pragmatic(C)로 리팩토링 — URL 단일 진실원(q/tag/category/sort/page) 서버 필터링 + `components/blog/*` 섹션 컴포넌트 + 공유 Tag `--brand` 통일.
>
> **Project**: dongdev-blog
> **Version**: 0.1.0
> **Author**: louis-25
> **Date**: 2026-06-07
> **Status**: Draft
> **Planning Doc**: [blog-list-refactor.plan.md](../../01-plan/features/blog-list-refactor.plan.md)

### Pipeline References

| Phase | Document | Status |
|-------|----------|--------|
| Phase 1~4 | Schema/Convention/Mockup/API | N/A (콘텐츠 블로그, 신규 없음) |

---

## Context Anchor

| Key | Value |
|-----|-------|
| **WHY** | 목록 탐색 사용성 부재 + 홈 대비 일관성 부족 해소, 전 화면 패턴 확장 |
| **WHO** | 글을 탐색·검색하는 방문자(데스크톱/모바일) + 유지보수자 |
| **RISK** | 공유 Tag(`--brand`) 변경이 홈 QuickNav·카테고리·태그 페이지에 시각 영향 |
| **SUCCESS** | 검색/필터/정렬/페이지네이션 동작 + 홈 패턴 일관 + 빌드/타입 무오류 + a11y 0 |
| **SCOPE** | `/blog` 목록 화면. 상세/About 등은 다음 사이클 |

---

## 1. Overview

### 1.1 Design Goals

- 검색·태그/카테고리 필터·정렬·결과수를 **URL 단일 진실원**으로 통합(서버 필터)
- 페이지네이션을 축약(말줄임) 처리해 글 증가에 견고
- 홈 패턴(`--brand`, 섹션 컴포넌트, 카드 호버) 일관 확장
- 공유 `Tag.tsx` 하드코딩 블루 → `--brand`/중립 토큰

### 1.2 Design Principles

- **URL이 진실원**: 모든 목록 상태는 쿼리스트링에. 클라 컴포넌트는 URL만 갱신.
- **서버 우선**: 필터/정렬/페이지는 서버 컴포넌트에서 계산. 본문 미전송.
- **최소 회귀**: 공유 Tag 변경은 토큰 매핑만(구조 불변), 사용처 검증.
- **점진 향상**: 검색은 입력 디바운스로 URL 갱신, JS 없이도 링크 기반 필터 동작.

---

## 2. Architecture Options

### 2.0 Architecture Comparison

| Criteria | A: Minimal | B: Clean | C: Pragmatic |
|----------|:-:|:-:|:-:|
| 접근 | page.tsx 내부 | useBlogQuery 훅 | components/blog/* + URL 진실원 |
| New Files | 1~2 | 7+ | 4 |
| Modified | 2 | 3 | 3 |
| 복잡도 | Low | High | Medium |
| 회귀 위험 | Low | Medium | Low |
| 추천 | 빠른 적용 | 장기 | **선택됨** |

**Selected**: **Option C (Pragmatic)** — **Rationale**: 홈과 동일 전략으로 일관성 확보, URL 단일 진실원으로 검색/필터/정렬/페이지 상태 결합 복잡도를 제거(이중 상태 없음), 기존 `pagination.tsx`/`SearchBar` 패턴 재사용.

### 2.1 Component Diagram

```
app/blog/page.tsx (Server Component, async)
│  searchParams: { q?, tag?, category?, sort?, page? }
│  1) allPosts.filter(published)
│  2) + category/tag/q 필터  3) sort  4) slice(page)
│
├─▶ <BlogToolbar q sort total />     (client: 검색입력+정렬 → URL 갱신)
├─▶ <BlogFilters categoryData active /> (client/링크: 태그·카테고리 칩)
├─▶ <PostListRow post /> × N          (server: 목록 행 카드)
└─▶ <BlogPagination current total base /> (server: 축약 페이지)
```

### 2.2 Data Flow

```
사용자 입력(검색/정렬) ─▶ router.replace(?q=&sort=) ─▶ 서버 재렌더
태그/카테고리 칩 클릭  ─▶ <Link ?tag=&category=>   ─▶ 서버 재렌더
서버: allPosts → filter(published, category, tag, q) → sort → paginate
(본문 미전송, AGENTS §6 경계 준수)
```

### 2.3 Dependencies

| Component | Depends On | Purpose |
|-----------|-----------|---------|
| page.tsx | allPosts, getCategoryTagsWithCounts | 필터/집계 |
| BlogToolbar | next/navigation(useRouter, useSearchParams) | URL 갱신(검색/정렬) |
| BlogFilters | TagList(기존), next/link | 태그/카테고리 필터 |
| PostListRow | next/link, next/image | 행 카드 |
| BlogPagination | ui/pagination(+Ellipsis) | 축약 페이지 |

---

## 3. Data Model

```typescript
// 목록 쿼리 (URL 진실원)
interface BlogQuery {
  q?: string;          // 검색어 (제목/설명/태그)
  tag?: string;        // 태그 필터
  category?: string;   // 카테고리 필터 (library|framework|language|...)
  sort?: "newest" | "oldest";  // 기본 newest
  page?: number;       // 1-base
}

// 행 뷰 모델 (page.tsx에서 매핑, 본문 제외)
interface BlogRowItem {
  _id: string;
  title: string;
  description: string;
  url: string;
  formattedDate: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
}
```

### 3.3 Database Schema

N/A — Contentlayer 정적.

---

## 4. API Specification

N/A — 서버 컴포넌트 렌더. 신규 라우트 없음. 상태는 URL 쿼리스트링으로 전달.

---

## 5. UI/UX Design

### 5.1 Screen Layout

```
┌───────────────────────────────────────────────┐
│  블로그                                         │
│  ┌─ Toolbar ─────────────────────────────────┐ │
│  │ [🔍 검색...]            총 N개  [최신순 ▾] │ │
│  └───────────────────────────────────────────┘ │
│  Filters: [전체] [library] [framework] ...      │
│           활성 태그: #react ✕                    │
│                                                 │
│  ┌─ PostListRow ─────────────────────────────┐ │
│  │ 제목                              [썸네일] │ │
│  │ 설명 …                                     │ │
│  │ #tag #tag         2024-05-01               │ │
│  └───────────────────────────────────────────┘ │
│  … (5개/페이지)                                  │
│                                                 │
│         ‹ Prev  1 … 4 [5] 6 … 12  Next ›        │
└───────────────────────────────────────────────┘
```

### 5.2 User Flow

```
/blog 도착 → (선택) 검색어 입력/카테고리·태그 필터 → 결과수 확인
→ 정렬 변경 → 페이지 이동 → 글 상세
(모든 상태 URL 반영 → 공유/뒤로가기 일관)
```

### 5.3 Component List

| Component | Location | Responsibility |
|-----------|----------|----------------|
| BlogToolbar | `app/components/blog/BlogToolbar.tsx` | 검색 입력(디바운스)+정렬 토글+결과수 (client) |
| BlogFilters | `app/components/blog/BlogFilters.tsx` | 카테고리/태그 필터 칩, 활성표시·해제 |
| PostListRow | `app/components/blog/PostListRow.tsx` | 글 행 카드 (server) |
| BlogPagination | `app/components/blog/BlogPagination.tsx` | 축약 페이지(쿼리 보존) |
| Tag (수정) | `app/components/ui/Tag.tsx` | `--brand`/중립 토큰화 |
| page.tsx (수정) | `app/blog/page.tsx` | 서버 필터/정렬/페이지 + 조립 |

### 5.4 Page UI Checklist

#### 블로그 목록 (`/blog`)

- [ ] Toolbar: 검색 입력 (placeholder "검색...", 입력 시 `?q=` 디바운스 갱신)
- [ ] Toolbar: 결과 수 "총 N개" 표시
- [ ] Toolbar: 정렬 토글(최신순/오래된순) → `?sort=`
- [ ] Filters: "전체" + 카테고리 칩(글 있는 것만) → `?category=`
- [ ] Filters: 태그 칩 → `?tag=` (TagList 재사용)
- [ ] Filters: 활성 필터 표시 + 해제(✕) 동선
- [ ] List: PostListRow에 제목/설명/태그/날짜(+썸네일 조건부)
- [ ] List: `--brand` 호버(`hover:border-brand/50`) 일관
- [ ] List: 결과 없음 빈 상태 문구("조건에 맞는 글이 없습니다")
- [ ] Pagination: 축약(1 … current±1 … N), Prev/Next, 활성 표시
- [ ] Pagination: q/tag/category/sort 쿼리 보존
- [ ] h1 한국어 "블로그"
- [ ] 라이트/다크/모바일 정상
- [ ] Tag: selected=`--brand`, default=중립 토큰 (홈 회귀 없음)

---

## 6. Error Handling

| 상황 | 처리 |
|------|------|
| q/필터 결과 0 | 빈 상태 문구 + 필터 해제 링크 |
| page 범위 초과/비정상 | clamp(1..totalPages) (기존 로직 유지) |
| 잘못된 sort 값 | 기본 newest로 폴백 |
| 잘못된 category/tag | 결과 0 → 빈 상태 |

### 6.2 a11y

- 정렬/필터 컨트롤 `aria-label`, 활성 칩 `aria-pressed`/`aria-current`
- 페이지네이션 기존 `aria-label`/`aria-current` 유지

---

## 7. Security Considerations

- [x] 사용자 입력(q)은 필터링에만 사용(렌더 시 텍스트로 escape, dangerouslySetInnerHTML 없음)
- [x] 외부 입력으로 인한 경로 조작 없음(화이트리스트 category/tag 매칭)
- [x] 본문 클라이언트 미전송
- [ ] N/A: 인증/Rate Limiting (정적)

---

## 8. Test Plan

> 자동화 테스트 인프라 없음 → 수동 + 빌드 검증.

### 8.1 Scope

| Type | Target | Tool | Phase |
|------|--------|------|-------|
| Type | `pnpm typecheck` | tsc | Do/Check |
| Build | `pnpm build:contentlayer` | pnpm | Check |
| Manual | §5.4 체크리스트 + URL 상태 | 브라우저 | Check |

### 8.2 Manual Scenarios

| # | 시나리오 | 기대 |
|---|----------|------|
| 1 | `/blog` 로드 | 툴바/필터/목록/페이지 렌더, 총 N개 |
| 2 | 검색어 입력 | `?q=` 갱신, 결과·총개수 변동 |
| 3 | 카테고리 칩 클릭 | `?category=` 필터, 활성 표시 |
| 4 | 태그 칩 클릭 | `?tag=` 필터 |
| 5 | 정렬 토글 | `?sort=oldest` 순서 반전 |
| 6 | 페이지 이동 | 쿼리 보존된 채 page 이동, 축약 표시 |
| 7 | 결과 0 | 빈 상태 + 해제 링크 |
| 8 | 뒤로가기/공유 URL | 동일 상태 복원 |
| 9 | 다크/모바일 | 정상 |
| 10 | 홈 QuickNav/태그/카테고리 | Tag 토큰 변경 후 회귀 없음 |

---

## 9. Clean Architecture

| Layer | 위치 |
|-------|------|
| Presentation | `app/blog/page.tsx`, `app/components/blog/*`, `ui/Tag.tsx` |
| Domain | URL 쿼리 타입(BlogQuery), 행 뷰 타입 |
| Infrastructure | `contentlayer/generated`, `app/lib/posts.ts`(집계 재사용) |

---

## 10. Coding Convention Reference

| Item | Convention |
|------|-----------|
| Naming | 컴포넌트 PascalCase, `components/blog/` |
| Styling | Tailwind v4 + `--brand` + `cn()` |
| Client boundary | BlogToolbar/Tag만 client, 나머지 서버 |
| State | URL 쿼리 단일 진실원, `useSearchParams`/`router.replace` |

---

## 11. Implementation Guide

### 11.1 File Structure

```
app/
├─ blog/page.tsx                 # (수정) 서버 필터/정렬/페이지 + 조립
└─ components/
   ├─ blog/
   │  ├─ BlogToolbar.tsx         # (신규) client: 검색+정렬+결과수
   │  ├─ BlogFilters.tsx         # (신규) 카테고리/태그 필터
   │  ├─ PostListRow.tsx         # (신규) 행 카드
   │  └─ BlogPagination.tsx      # (신규) 축약 페이지
   └─ ui/Tag.tsx                 # (수정) --brand 토큰화
```

### 11.2 Implementation Order

1. [ ] **Tag 토큰화**: `ui/Tag.tsx` blue/gray → `--brand`/중립 (사용처 grep 후)
2. [ ] **PostListRow**: 행 카드 컴포넌트(홈 카드 스타일 일관)
3. [ ] **BlogFilters**: 카테고리/태그 칩 + 활성/해제 (TagList 재사용)
4. [ ] **BlogToolbar**: 검색(디바운스 router.replace)+정렬+결과수 (client)
5. [ ] **BlogPagination**: 축약 페이지 계산 + 쿼리 보존(PaginationEllipsis 활용)
6. [ ] **page.tsx**: searchParams로 filter(published+category+tag+q)+sort+paginate, 조립, h1 한국어, 죽은코드/무효클래스 제거
7. [ ] **검증**: typecheck / build:contentlayer + 수동(필터/정렬/검색/페이지/다크/모바일/홈 회귀)

### 11.3 Session Guide

#### Module Map

| Module | Scope Key | Description | Est. Turns |
|--------|-----------|-------------|:----------:|
| 토큰+행 | `module-1` | Tag 토큰화 + PostListRow | 4-6 |
| 필터+툴바 | `module-2` | BlogFilters + BlogToolbar(검색/정렬) | 8-12 |
| 페이지+조립 | `module-3` | BlogPagination + page.tsx 서버 로직 + 검증 | 6-10 |

#### Recommended Session Plan

| Session | Phase | Scope | Turns |
|---------|-------|-------|:-----:|
| 1 | Plan+Design | 전체 | 완료 |
| 2 | Do | `--scope module-1,module-2` | 15-25 |
| 3 | Do+Check | `--scope module-3` + 검증 | 10-15 |

---

## 주요 설계 결정 (Decision Record)

| 결정 | 선택 | 근거 |
|------|------|------|
| 컴포넌트 전략 | Pragmatic(C) | 홈 일관 + 확장성/안전성 균형 (Checkpoint 3) |
| 상태 모델 | URL 단일 진실원(서버 필터) | 검색+필터+정렬+페이지 결합 복잡도 제거, 공유/SEO/뒤로가기 |
| 검색 역할 | 목록 `?q=` 필터(나브 SearchBar는 즉시이동 유지) | 역할 분리로 이중 상태 방지 |
| Tag 토큰 | `--brand`/중립으로 통일 | 하드코딩 블루 제거, 홈 QuickNav까지 일관(Plan 승인) |
| 페이지네이션 | 기존 ui+Ellipsis 축약 | 새 프리미티브 불필요 |

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-06-07 | 초안 (Option C, URL 단일 진실원) | louis-25 |
