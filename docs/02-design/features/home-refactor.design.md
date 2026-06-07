---
template: design
version: 1.3
feature: home-refactor
date: 2026-06-07
author: louis-25
project: dongdev-blog
projectVersion: 0.1.0
status: Draft
---

# home-refactor Design Document

> **Summary**: 홈 화면을 Pragmatic(C) 전략으로 리팩토링 — `app/components/home/` 섹션 컴포넌트 신설 + 기존 ui/데이터 함수 재사용, 경량 히어로 교체, `--brand` 블루 토큰 신설.
>
> **Project**: dongdev-blog
> **Version**: 0.1.0
> **Author**: louis-25
> **Date**: 2026-06-07
> **Status**: Draft
> **Planning Doc**: [home-refactor.plan.md](../../01-plan/features/home-refactor.plan.md)

### Pipeline References

| Phase | Document | Status |
|-------|----------|--------|
| Phase 1 | Schema | N/A (콘텐츠 블로그, 신규 스키마 없음) |
| Phase 2 | Conventions | N/A (AGENTS.md/CLAUDE.md 준수) |
| Phase 3 | Mockup | N/A (본 문서 §5에 레이아웃 정의) |
| Phase 4 | API Spec | N/A (정적 페이지, API 없음) |

---

## Context Anchor

| Key | Value |
|-----|-------|
| **WHY** | 홈의 약한 브랜드 인상 + 누적된 구조적 결함 해소, 전 화면 리팩토링 패턴 기준점 확보 |
| **WHO** | 블로그 방문자(데스크톱/모바일) + 유지보수자(개발자 본인) |
| **RISK** | tsparticles 제거/토큰 변경이 다른 화면(레이아웃·MDX·테마)에 회귀를 일으킬 수 있음 |
| **SUCCESS** | 5대 목표가 홈에서 측정 가능하게 충족 + 빌드/타입/린트 무오류 + 번들 감소 + a11y 위반 0 |
| **SCOPE** | Phase 1: 홈 화면만. 다른 화면·전역 컴포넌트는 최소 변경(공유 토큰 제외) |

---

## Design Anchor

> Pencil MCP 미사용. 아래는 본 리팩토링에서 잠그는 디자인 토큰.

| Category | Tokens |
|----------|--------|
| **Colors** | brand(신규): light `oklch(0.62 0.17 250)`, dark `oklch(0.70 0.16 250)` (≈ #47a3f3 계열) · 기존 중립 primary/bg/fg 보존 |
| **Typography** | Inter (기존 로드). `--font-sans`를 Inter로 정정 |
| **Spacing** | 4px 그리드(Tailwind 기본). 섹션 간 `mt-8`~`mt-12`, 카드 패딩 `p-4`~`p-5` |
| **Radius** | 기존 `--radius: 0.625rem` 유지 (카드 `rounded-xl`, 항목 `rounded-md`) |
| **Tone** | 미니멀·정돈된 기술 블로그. 브랜드 블루는 강조점에만 절제 사용 |
| **Layout** | 단일 컬럼(max-w 기존 레이아웃), 섹션 수직 스택 |

---

## 1. Overview

### 1.1 Design Goals

- 경량·독창적 히어로로 tsparticles 의존 제거 (초기 클라이언트 JS 감소)
- 절제된 브랜드 블루 액센트로 시각 정체성 부여 (회귀 위험 최소화)
- 홈을 "블로그 사용성 중심"으로 재구성 (최신 글 → 탐색 → 부가)
- 섹션 컴포넌트화로 전 화면 확장 가능한 패턴 확립
- 누적 구조 결함(중복 main, 폰트 토큰, 타입 캐스팅) 제거

### 1.2 Design Principles

- **최소 회귀**: 기존 중립 토큰/공유 ui 변경 금지. 신규는 가산(additive)으로.
- **서버 우선**: page.tsx는 서버 컴포넌트, 인터랙션 필요한 Hero만 client.
- **데이터/뷰 분리**: 하드코딩 데이터는 `app/data/`로.
- **접근성 내장**: 단일 `<main>`, reduced-motion, 색 대비 AA.

---

## 2. Architecture Options

### 2.0 Architecture Comparison

| Criteria | Option A: Minimal | Option B: Clean | Option C: Pragmatic |
|----------|:-:|:-:|:-:|
| **Approach** | page.tsx 인라인 | 섹션+공유 ui 신설 | 섹션 컴포넌트+기존 ui 재사용 |
| **New Files** | 2 | 7+ | 4~5 |
| **Modified Files** | 2 | 3 | 2 |
| **Complexity** | Low | High | Medium |
| **Maintainability** | Medium | High | High |
| **Effort** | Low | High | Medium |
| **Risk** | Low(coupled) | Medium(공유 ui) | Low(balanced) |
| **Recommendation** | 빠른 적용 | 장기 | **선택됨** |

**Selected**: **Option C (Pragmatic)** — **Rationale**: 파일럿 단계에서 확장 가능한 섹션 패턴을 확립하되, 공유 ui 프리미티브 신설을 피해 회귀 검증 범위를 홈으로 한정. 기존 `Card`/`Badge`/`Separator`와 `getCategoryTagsWithCounts()`를 재사용.

### 2.1 Component Diagram

```
app/page.tsx (Server Component)
│  ── allPosts 정렬/slice (서버에서만)
│  ── getCategoryTagsWithCounts() (서버 집계)
│
├─▶ <Hero />            (client, framer-motion, useReducedMotion)
├─▶ <LatestPosts posts={lightItems} />   (server)
├─▶ <QuickNav categoryData={...} />       (server, 기존 TagList 재사용)
└─▶ <UsefulSites sites={usefulSites} />   (server, app/data 분리)
```

### 2.2 Data Flow

```
allPosts (서버) ─┐
                 ├─ 경량 매핑(title/url/date/description) ─▶ <LatestPosts>
getCategory...() ─┘                                       ─▶ <QuickNav>
app/data/usefulSites.ts ──────────────────────────────────▶ <UsefulSites>
(본문은 클라이언트로 전달되지 않음 — AGENTS §6 서버/클라이언트 경계 준수)
```

### 2.3 Dependencies

| Component | Depends On | Purpose |
|-----------|-----------|---------|
| page.tsx | Hero, LatestPosts, QuickNav, UsefulSites | 섹션 조립 |
| Hero | framer-motion, useReducedMotion | 모션 히어로 |
| QuickNav | TagList(기존), getCategoryTagsWithCounts | 카테고리/태그 탐색 |
| LatestPosts | next/link, dayjs | 최신 글 카드 |
| (제거) ParticlesBanner* | tsparticles | 삭제 대상 |

---

## 3. Data Model

> 신규 영속 데이터 없음. 뷰 모델(경량 타입)만 정의.

```typescript
// app/data/usefulSites.ts
export interface UsefulSite {
  name: string;
  url: string;
  desc: string;
}

// LatestPosts 뷰 모델 (page.tsx에서 매핑)
interface LatestPostItem {
  title: string;
  url: string;
  date: string;        // ISO
  description: string;
}
```

### 3.3 Database Schema

N/A — 정적 콘텐츠(Contentlayer). DB 없음.

---

## 4. API Specification

N/A — 홈은 서버 컴포넌트 렌더만 사용. 신규 라우트/엔드포인트 없음. (기존 `/api/feed`, `/api/og`는 본 범위 밖, 변경 없음.)

---

## 5. UI/UX Design

### 5.1 Screen Layout

```
┌───────────────────────────────────────────────┐
│  Navigation (기존, layout)                     │
├───────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐  │
│  │  HERO                                    │  │
│  │  - 은은한 브랜드 그라디언트 배경         │  │
│  │  - h1: DongDev Blog                      │  │
│  │  - 한 줄 소개 + CTA(블로그 보러가기)     │  │
│  │  - framer-motion fade/rise (reduced 대응)│  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│  최신 글  ────────────────────  [전체 보기 →]  │
│  ┌───────────┐ ┌───────────┐                   │
│  │ 제목       │ │ 제목       │  (카드: 제목+    │
│  │ 설명 2줄   │ │ 설명 2줄   │   설명+날짜)     │
│  │ 날짜       │ │ 날짜       │                  │
│  └───────────┘ └───────────┘  (최대 6개 grid)  │
│                                                 │
│  카테고리 둘러보기 ───────────────────────────  │
│  [library] [framework] [language] ... 태그 칩   │
│  (모바일에서도 노출 — 기존 Profile은 데스크톱만)│
│                                                 │
│  유용한 사이트 ───────────────────────────────  │
│  ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │ 링크  │ │ 링크  │ │ 링크  │  (외부 링크 카드) │
│  └──────┘ └──────┘ └──────┘                    │
└───────────────────────────────────────────────┘
```

### 5.2 User Flow

```
홈 도착 → 히어로 인상 → 최신 글 스캔(설명으로 클릭 판단)
        → 카테고리/태그로 관심 주제 탐색 → 글 상세
        (보조) 유용한 사이트 외부 이동
```

### 5.3 Component List

| Component | Location | Responsibility |
|-----------|----------|----------------|
| Hero | `app/components/home/Hero.tsx` | 브랜드 히어로 (client, motion) |
| LatestPosts | `app/components/home/LatestPosts.tsx` | 최신 글 6개 카드 (server) |
| QuickNav | `app/components/home/QuickNav.tsx` | 카테고리/태그 탐색 (server, TagList 재사용) |
| UsefulSites | `app/components/home/UsefulSites.tsx` | 외부 링크 카드 (server) |
| usefulSites (data) | `app/data/usefulSites.ts` | 링크 데이터 분리 |

### 5.4 Page UI Checklist

#### 홈 (`/`)

- [ ] Hero: `<h1>` "DongDev Blog" + 한 줄 소개
- [ ] Hero: CTA 링크 "블로그 보러가기" → `/blog` (브랜드 색 적용)
- [ ] Hero: 브랜드 그라디언트 배경 (tsparticles 미사용)
- [ ] Hero: framer-motion 진입 애니메이션 + reduced-motion 시 페이드만
- [ ] LatestPosts: 섹션 제목 "최신 글" + "전체 보기 →" 링크(→ `/blog`)
- [ ] LatestPosts: 최대 6개, 최신순 정렬
- [ ] LatestPosts: 각 카드에 제목(1줄 clamp) + 설명(2줄 clamp) + 날짜(YYYY-MM-DD)
- [ ] LatestPosts: 글 없을 때 빈 상태 문구
- [ ] QuickNav: 섹션 제목 "카테고리 둘러보기"
- [ ] QuickNav: 카테고리별 칩/링크 (글 있는 카테고리만)
- [ ] QuickNav: 태그 칩 클릭 시 `/category/{cat}?tag=` 또는 `/tags/{tag}` 이동
- [ ] QuickNav: 모바일에서도 표시
- [ ] UsefulSites: 섹션 제목 "유용한 사이트"
- [ ] UsefulSites: 외부 링크 카드(name+desc), `target=_blank rel=noopener`
- [ ] 페이지에 `<main>` 중복 없음 (레이아웃의 단일 main만)
- [ ] 라이트/다크 모두 정상

---

## 6. Error Handling

| 상황 | 처리 |
|------|------|
| 발행 글 0개 | LatestPosts 빈 상태 문구 표시 ("아직 발행된 글이 없습니다") |
| 카테고리/태그 없음 | 해당 카테고리 항목 미표시 (기존 filter 로직 재사용) |
| 잘못된 날짜 | dayjs 파싱 실패 시 빈 문자열 또는 원본 노출(방어적) |

런타임 외부 의존(네트워크/DB) 없음 → 빌드 타임 정적 처리.

---

## 7. Security Considerations

- [x] 외부 링크 `rel="noopener noreferrer"` 적용 (탭내빙 방지)
- [x] 사용자 입력 없음 → XSS/주입 표면 없음
- [x] 본문 데이터 클라이언트 미전송 (서버 경계 유지)
- [ ] N/A: 인증/암호화/Rate Limiting (정적 홈)

---

## 8. Test Plan

> 본 프로젝트는 자동화 테스트 인프라 미구축(Playwright 없음). 정적 페이지 특성상 **수동 + 빌드 검증** 중심.

### 8.1 Test Scope

| Type | Target | Tool | Phase |
|------|--------|------|-------|
| Build | `pnpm build` (contentlayer+next) 성공 | pnpm | Do/Check |
| Type | `pnpm typecheck` 무오류 | tsc | Do/Check |
| Lint | `pnpm lint` 무오류 | eslint | Do/Check |
| Manual L2 | §5.4 체크리스트 항목 육안 확인 | 브라우저 | Check |
| Manual a11y | 단일 main, 탭 포커스, 색 대비 | 브라우저 devtools | Check |
| Bundle | tsparticles 제거 전후 번들 비교 | next build 출력 | Check |

### 8.2 Manual Verification Scenarios

| # | 시나리오 | 기대 결과 |
|---|----------|-----------|
| 1 | 홈 로드(데스크톱) | 히어로/최신글/탐색/사이트 모두 렌더 |
| 2 | 홈 로드(모바일 폭) | 카테고리 탐색 노출, 그리드 1열 |
| 3 | 다크 모드 토글 | 브랜드색·대비 정상 |
| 4 | "블로그 보러가기" 클릭 | `/blog` 이동 |
| 5 | 태그 칩 클릭 | 해당 태그/카테고리 페이지 이동 |
| 6 | reduced-motion ON | 히어로가 이동 없이 페이드만 |
| 7 | 글 0개(가정) | 빈 상태 문구 |

### 8.5 Seed Data Requirements

N/A — 기존 `posts/` MDX가 시드 역할.

---

## 9. Clean Architecture

### 9.1 Layer Structure (본 프로젝트 매핑)

| Layer | 본 기능에서의 위치 |
|-------|-------------------|
| Presentation | `app/page.tsx`, `app/components/home/*`, `globals.css` |
| Application | (해당 없음 — 단순 집계는 page.tsx/lib/posts) |
| Domain | `app/data/usefulSites.ts`(데이터), 뷰 타입 |
| Infrastructure | `contentlayer/generated`(빌드 산출), `app/lib/posts.ts` |

### 9.4 This Feature's Layer Assignment

| Component | Layer | Location |
|-----------|-------|----------|
| Hero/LatestPosts/QuickNav/UsefulSites | Presentation | `app/components/home/` |
| usefulSites | Domain(data) | `app/data/usefulSites.ts` |
| getCategoryTagsWithCounts | Infrastructure | `app/lib/posts.ts`(기존, 재사용) |

---

## 10. Coding Convention Reference

### 10.1 Naming

- 컴포넌트: PascalCase, `app/components/home/Hero.tsx` 등 (AGENTS 준수)
- 데이터: camelCase `usefulSites.ts`
- 경로 별칭 `@/` 우선

### 10.4 This Feature's Conventions

| Item | Convention |
|------|-----------|
| Styling | Tailwind v4 유틸 + `cn()`; 신규 Emotion 금지 |
| Color | 신규 `--brand` 토큰만 추가, 기존 중립 토큰 불변 |
| Client boundary | Hero만 `"use client"`, 나머지 서버 |
| Animation | framer-motion + `useReducedMotion()` |

---

## 11. Implementation Guide

### 11.1 File Structure

```
app/
├─ page.tsx                       # (수정) 서버 조립
├─ globals.css                    # (수정) --brand 토큰, --font-sans 정정
├─ data/
│  └─ usefulSites.ts              # (신규) 링크 데이터
└─ components/
   ├─ home/
   │  ├─ Hero.tsx                 # (신규) client, motion
   │  ├─ LatestPosts.tsx          # (신규) server
   │  ├─ QuickNav.tsx             # (신규) server, TagList 재사용
   │  └─ UsefulSites.tsx          # (신규) server
   ├─ ParticlesBanner.tsx         # (삭제)
   └─ ParticlesBannerDynamic.tsx  # (삭제)
```

### 11.2 Implementation Order

1. [ ] **토큰**: `globals.css`에 `--brand`(light/dark) 추가 + `@theme inline`에 `--color-brand` 연결 + `--font-sans`를 Inter로 정정
2. [ ] **데이터**: `app/data/usefulSites.ts` 생성 (기존 인라인 데이터 이전)
3. [ ] **Hero**: `home/Hero.tsx` — CSS 그라디언트 + framer-motion(reduced 대응)
4. [ ] **LatestPosts**: `home/LatestPosts.tsx` — 카드(제목/설명/날짜), 빈 상태
5. [ ] **QuickNav**: `home/QuickNav.tsx` — 카테고리/태그(TagList 재사용)
6. [ ] **UsefulSites**: `home/UsefulSites.tsx` — 외부 링크 카드
7. [ ] **page.tsx**: 섹션 조립, 중복 `<main>` 제거, `(post as any)` 캐스팅 제거, 죽은 코드 정리
8. [ ] **정리**: `ParticlesBanner*.tsx` 삭제 + `tsparticles` 의존성 사용처 grep 확인 후 package.json에서 제거
9. [ ] **검증**: typecheck / lint / build + 수동 확인(라이트·다크·모바일·reduced-motion)

### 11.3 Session Guide

#### Module Map

| Module | Scope Key | Description | Est. Turns |
|--------|-----------|-------------|:----------:|
| 토큰+데이터 | `module-1` | globals.css 토큰/폰트, usefulSites 데이터 | 3-5 |
| 섹션 컴포넌트 | `module-2` | Hero/LatestPosts/QuickNav/UsefulSites | 8-12 |
| 조립+정리 | `module-3` | page.tsx 재구성, tsparticles 제거, 검증 | 5-8 |

#### Recommended Session Plan

| Session | Phase | Scope | Turns |
|---------|-------|-------|:-----:|
| 1 | Plan+Design | 전체 | 완료 |
| 2 | Do | 전체 또는 `--scope module-1,module-2` | 15-25 |
| 3 | Do+Check | `--scope module-3` + 검증 | 10-15 |

---

## 주요 설계 결정 (Decision Record)

| 결정 | 선택 | 근거 |
|------|------|------|
| 컴포넌트 전략 | Pragmatic(C) | 확장성과 회귀 안전성 균형 (Checkpoint 3) |
| 브랜드 토큰 | **신규 `--brand`** (primary 변경 X) | `--primary`는 Button/MDX 광범위 사용 → 변경 시 회귀 큼. 가산 토큰이 안전 |
| `--accent` 미사용 | 보존 | 이미 버튼 hover 중립 배경으로 점유됨 |
| 히어로 | CSS 그라디언트+motion | tsparticles 번들 제거, reduced-motion 대응 |
| 폰트 토큰 | `--font-sans`→Inter | 미정의 geist 참조 버그 수정 |

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-06-07 | 초안 (Option C 선택, --brand 토큰 전략) | louis-25 |
