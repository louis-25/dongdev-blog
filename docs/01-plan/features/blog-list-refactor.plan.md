---
template: plan
version: 1.3
feature: blog-list-refactor
date: 2026-06-07
author: louis-25
project: dongdev-blog
projectVersion: 0.1.0
status: Draft
---

# blog-list-refactor Planning Document

> **Summary**: 블로그 목록(`/blog`) 화면에 홈에서 확정한 패턴(`--brand` 토큰·섹션 컴포넌트)을 확장 적용하고, 페이지 내 검색·필터·정렬·페이지네이션 개선으로 사용성을 강화한다.
>
> **Project**: dongdev-blog
> **Version**: 0.1.0
> **Author**: louis-25
> **Date**: 2026-06-07
> **Status**: Draft

---

## Executive Summary

| Perspective | Content |
|-------------|---------|
| **Problem** | `/blog` 목록에 페이지 내 검색·태그/카테고리 필터·정렬·결과수가 없고, 페이지네이션이 모든 번호를 나열하며, 홈 대비 브랜드 토큰·일관성이 부족 |
| **Solution** | 페이지 내 검색바 + 태그/카테고리 필터(URL 쿼리) + 결과수·정렬 + 축약 페이지네이션, 홈 패턴(`--brand`·섹션 컴포넌트) 확장, 공유 Tag를 `--brand`로 통일 |
| **Function/UX Effect** | 목록에서 바로 탐색·필터·정렬 가능, 글 증가에도 안정적인 페이지네이션, 홈↔목록 시각 일관성 |
| **Core Value** | 홈에서 검증한 디자인/컴포넌트 패턴을 두 번째 화면으로 확장해 전 화면 표준화 가속 |

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

### 1.1 Purpose

블로그 목록 화면의 탐색 사용성을 끌어올리고, 홈에서 확립한 디자인 토큰·컴포넌트 패턴을 일관되게 확장한다.

### 1.2 Background

- 현재 `/blog`는 단순 페이지네이션 목록. 검색은 상단 Navigation에만 존재.
- 페이지네이션이 `Array.from({length: totalPages})`로 모든 번호 렌더 → 확장성 문제.
- 카드가 `hover:bg-card/80`로 홈(`hover:border-brand/50`)과 불일치, 브랜드 토큰 미적용.
- 공유 `Tag.tsx`가 `bg-blue-100/blue-800` 하드코딩 → `--brand` 토큰 미사용.
- h1 "Blog Posts"(영문), 죽은 주석, 무효 `dark:prose-invert` 존재.

### 1.3 Related Documents

- 선행 사이클: [home-refactor.report.md](../../04-report/home-refactor.report.md) (패턴 기준)
- 디자인 토큰: `app/globals.css` `--brand`
- 라이브러리 레퍼런스: context7 MCP / 공식 문서(Next 14, Tailwind v4, framer-motion)

---

## 2. Scope

### 2.1 In Scope

- [ ] 페이지 내 **검색바** 추가 (기존 SearchBar 로직/경량 인덱스 재사용)
- [ ] **태그·카테고리 필터** (URL 쿼리 기반, 서버 필터링)
- [ ] **결과 수 표시 + 정렬**(최신순/오래된순) 토글
- [ ] **페이지네이션 축약**(1 … 4 5 6 … N) 또는 동등 UX
- [ ] 홈 패턴 확장: `--brand` 호버·포커스·액티브, 카드 스타일 일관
- [ ] 공유 `Tag.tsx` 하드코딩 블루 → `--brand`/중립 토큰 통일
- [ ] `components/blog/` 섹션·카드 컴포넌트화 (인라인 JSX 분리)
- [ ] h1 한국어화, 죽은 주석/무효 클래스 정리, 빈 상태 문구

### 2.2 Out of Scope

- 블로그 상세(`/blog/[slug]`), About, 태그/카테고리 단독 페이지의 본격 리팩토링(다음 사이클)
- 전역 Navigation 구조 변경(검색 로직 재사용만)
- config-cleanup(postcss/eslint/contentlayer-build/next.config) — 별도 사이클
- 서버 사이드 전문검색 엔진 도입(클라이언트 경량 인덱스로 충분)

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | 페이지 내 검색바(제목/설명/태그 매칭) | High | Pending |
| FR-02 | 태그/카테고리 필터 (URL 쿼리 `?tag=`/`?category=`) | High | Pending |
| FR-03 | 결과 수 표시 + 정렬(최신/오래된) 토글 | High | Pending |
| FR-04 | 페이지네이션 축약(말줄임) | High | Pending |
| FR-05 | `--brand` 토큰 일관 적용(카드 호버/포커스/액티브) | High | Pending |
| FR-06 | 공유 Tag.tsx `--brand`/토큰 통일 | Medium | Pending |
| FR-07 | `components/blog/` 컴포넌트화(PostListRow 등) | Medium | Pending |
| FR-08 | h1 한국어화 + 죽은코드/무효클래스 정리 | Low | Pending |
| FR-09 | 빈 상태/검색 결과 없음 문구 | Low | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement |
|----------|----------|-------------|
| Performance | 클라이언트 검색이 입력 응답성 유지(deferred) | 수동 체감 |
| Accessibility | 필터/정렬/검색 키보드·라벨, 색 대비 AA | 수동 검수 |
| Consistency | 홈↔목록 카드/토큰 일관 | 시각 비교 |
| Compatibility | Tag 토큰 변경이 타 화면 회귀 없음 | 홈/태그/카테고리 확인 |
| State | 필터·정렬·페이지가 URL에 반영(공유/뒤로가기) | 수동 |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] FR-01~09 구현
- [ ] `pnpm typecheck` 무오류
- [ ] `pnpm build:contentlayer` 성공
- [ ] 라이트/다크/모바일 확인

### 4.2 Quality Criteria

- [ ] 검색·필터·정렬·페이지네이션 동작(URL 반영)
- [ ] Tag 토큰 변경 후 홈/태그/카테고리 회귀 없음
- [ ] 색 대비 AA

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| 공유 Tag `--brand` 변경의 타 화면 회귀 | Medium | Medium | Design에서 Tag 사용처 인벤토리, 변경 후 홈/태그/카테고리 수동 확인 |
| 필터+검색+페이지네이션 상태 조합 복잡도 | Medium | Medium | URL 쿼리를 단일 진실원으로(서버 필터), 클라 검색은 보조 |
| 클라이언트 검색을 서버 목록과 이중화 시 혼란 | Medium | Low | 검색바는 즉시 이동(기존 UX) 또는 목록 필터와 역할 명확화(Design에서 확정) |
| 페이지네이션 축약 로직 버그 | Low | Medium | 경계값(1,2,N-1,N) 수동 테스트 |

---

## 6. Impact Analysis

### 6.1 Changed Resources

| Resource | Type | Change |
|----------|------|--------|
| `app/blog/page.tsx` | Component | 검색/필터/정렬/페이지네이션/컴포넌트화 |
| `app/components/ui/Tag.tsx` | Shared Component | 하드코딩 블루 → `--brand`/토큰 |
| `app/components/blog/*` | Component | 신규(목록 행/필터/정렬/검색) |
| `app/components/ui/pagination.tsx` | Shared(가능) | 축약 렌더 보조(필요 시) |

### 6.2 Current Consumers

| Resource | Code Path | Impact |
|----------|-----------|--------|
| `Tag.tsx` | `TagList` → 홈 QuickNav, `/blog`, `/tags`, `/category`, SearchBar | Needs verification (시각) |
| `TagList.tsx` | 홈/목록/검색 | 재사용(로직 불변 예정) |
| `pagination.tsx` | `/blog` | 축약 적용 시 확인 |

### 6.3 Verification

- [ ] Tag 토큰 변경 후 홈 QuickNav/태그/카테고리/검색 드롭다운 시각 확인
- [ ] 필터/정렬/검색/페이지 URL 조합 동작 확인

---

## 7. Architecture Considerations

### 7.2 Key Architectural Decisions

| Decision | Selected | Rationale |
|----------|----------|-----------|
| Framework | Next.js 14 App Router | 기존 |
| Styling | Tailwind v4 + `--brand` | 홈 패턴 확장 |
| 필터 상태 | URL 쿼리(서버 필터) | 공유/뒤로가기/SEO |
| 검색 | 클라 경량 인덱스(기존 SearchBar 재사용) | 추가 인프라 불필요 |
| 컴포넌트 | `components/blog/` (Pragmatic) | 홈과 동일 전략 |

### 7.3 Folder Preview

```
app/
├─ blog/page.tsx              # (수정) 서버 조립 + 필터/정렬/페이지 계산
└─ components/blog/           # (신규)
   ├─ PostListRow.tsx         # 목록 행 카드
   ├─ BlogToolbar.tsx         # 검색 + 정렬 + 결과수 (client)
   ├─ BlogFilters.tsx         # 태그/카테고리 필터 (client/링크)
   └─ BlogPagination.tsx      # 축약 페이지네이션
app/components/ui/Tag.tsx     # (수정) --brand 토큰
```

---

## 8. Convention Prerequisites

### 8.1 Existing

- [x] `AGENTS.md`/`CLAUDE.md` 규칙
- [x] 홈 리팩토링 패턴(`--brand`, `components/home/*`) — 기준 패턴
- [x] TypeScript strict

### 8.2 To Verify

| Category | To Define | Priority |
|----------|-----------|:--------:|
| 필터 URL 스킴 | `?tag=&category=&sort=&page=` 합의 | High |
| 컴포넌트 위치 | `components/blog/` 신설 | High |
| Tag 토큰 매핑 | selected=brand, default=중립 | High |

### 8.3 Env Vars

| Variable | 필요? |
|----------|:-----:|
| (없음) | ☐ |

---

## 9. Next Steps

1. [ ] `/pdca design blog-list-refactor` — 3가지 설계안(특히 검색바 역할·필터 상태 모델)
2. [ ] Checkpoint 3 설계 선택
3. [ ] 구현

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-06-07 | 초안 (홈 패턴 확장 + 목록 사용성) | louis-25 |
