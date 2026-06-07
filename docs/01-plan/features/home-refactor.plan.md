---
template: plan
version: 1.3
feature: home-refactor
date: 2026-06-07
author: louis-25
project: dongdev-blog
projectVersion: 0.1.0
status: Draft
---

# home-refactor Planning Document

> **Summary**: 홈 화면(`app/page.tsx`)을 파일럿으로 5대 목표(비주얼·스타일 코드·설정/빌드·컴포넌트 구조·사용성)를 적용해 리팩토링하고, 확정된 패턴을 나머지 화면으로 확장할 기준점을 만든다.
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
| **Problem** | 홈 화면이 무채색·범용 파티클 히어로로 브랜드 인상이 약하고, 중복 `<main>` 랜드마크·깨진 폰트 토큰·하드코딩 데이터 등 구조적 결함이 누적돼 있다. |
| **Solution** | 가벼운 독창적 히어로 + 블루 액센트 토큰 도입 + 홈 섹션 재구성 + 코드/설정 결함 수정을 한 화면에 통합 적용한다. |
| **Function/UX Effect** | 첫인상(LCP·시각 품질) 개선, 모바일에서도 카테고리/태그 탐색 가능, 최신 글 가독성 향상, tsparticles 제거로 초기 JS 번들 감소. |
| **Core Value** | "이 홈에서 확정한 디자인 토큰·컴포넌트 패턴"을 전 화면 확장의 단일 기준(Source of Truth)으로 삼는다. |

---

## Context Anchor

| Key | Value |
|-----|-------|
| **WHY** | 홈의 약한 브랜드 인상 + 누적된 구조적 결함을 해소하고, 전 화면 리팩토링의 패턴 기준점을 확보 |
| **WHO** | 블로그 방문자(데스크톱/모바일) + 유지보수자(개발자 본인) |
| **RISK** | tsparticles 제거/토큰 변경이 다른 화면(레이아웃·MDX·테마)에 회귀를 일으킬 수 있음 |
| **SUCCESS** | 5대 목표가 홈에서 측정 가능하게 충족 + 빌드/타입/린트 무오류 + 번들 감소 + a11y 위반 0 |
| **SCOPE** | Phase 1: 홈 화면 1개만. 다른 화면·전역 컴포넌트는 "최소 변경"으로 한정(공유 토큰 제외) |

---

## 1. Overview

### 1.1 Purpose

홈 화면을 리팩토링 파일럿으로 삼아, 비주얼/스타일/설정/구조/사용성 5개 축의 개선 패턴을 한 화면에서 검증하고 표준화한다.

### 1.2 Background

- 현재 홈은 `ParticlesBanner`(tsparticles) 히어로 + 2칼럼 카드(최신 글 / 유용한 사이트) 구성.
- 팔레트가 oklch chroma 0(완전 무채색)으로 브랜드 색이 없고, 강조 블루(`#47a3f3`)는 selection/MDX strong에만 산발적으로 사용.
- 레이아웃과 페이지에 `<main>`이 중복돼 접근성 랜드마크가 2개.
- `globals.css`의 `--font-sans/--font-mono`가 정의되지 않은 geist 변수를 참조(실제론 Inter 로드).

### 1.3 Related Documents

- 프로젝트 가이드: `AGENTS.md`, `CLAUDE.md`
- 디자인 스킬: `/frontend-design:frontend-design`
- 라이브러리 레퍼런스: context7 MCP (Next.js 14 / Tailwind v4 / framer-motion / Radix)

---

## 2. Scope

### 2.1 In Scope

- [ ] 홈 히어로를 tsparticles → 가벼운 CSS 그라디언트/그리드 + framer-motion 마이크로 인터랙션으로 교체
- [ ] 블루 액센트를 `--primary`/`--accent` 토큰으로 라이트/다크 모두 정식 도입 (globals.css)
- [ ] 홈 섹션 재구성: 히어로 → 최신 글(description 포함) → 카테고리/태그 빠른 탐색 → 유용한 사이트
- [ ] `<main>` 랜드마크 중복 제거 (페이지는 `<section>`/`<div>`로, 레이아웃의 `<main>` 단일 유지)
- [ ] 깨진 폰트 토큰 수정 (`--font-sans`를 실제 로드 폰트 Inter에 연결)
- [ ] 홈에서 사용하는 반복 JSX를 재사용 컴포넌트로 추출 (예: `PostListItem`, `LinkCard`)
- [ ] "유용한 사이트" 하드코딩 데이터를 `app/data/`로 분리
- [ ] `(post as any).date` 타입 캐스팅 제거
- [ ] 죽은 주석 코드 정리

### 2.2 Out of Scope

- 블로그 목록/상세/About/태그/카테고리 등 **다른 화면의 본격 리팩토링** (다음 사이클)
- 전역 Navigation/Profile/Toc의 구조 변경 (공유 디자인 토큰 변경으로 인한 시각 영향만 검증)
- 설정/빌드 결함 중 홈과 무관한 항목(postcss 중복, contentlayer-build exit 0, next.config 플레이스홀더) — 별도 사이클에서 처리 권장
- 카테고리 enum 불일치 수정 (콘텐츠 추가 시 별도 처리)

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | tsparticles 히어로 제거 및 경량 히어로로 교체 | High | Pending |
| FR-02 | 블루 액센트 토큰을 primary/accent에 라이트·다크 모두 도입 | High | Pending |
| FR-03 | 홈 섹션 재구성(히어로/최신글/탐색/사이트) | High | Pending |
| FR-04 | `<main>` 랜드마크 중복 제거 | High | Pending |
| FR-05 | 폰트 토큰 수정 (Inter 연결) | Medium | Pending |
| FR-06 | 최신 글에 description·날짜 표시 + 카드 컴포넌트화 | Medium | Pending |
| FR-07 | 모바일에서 카테고리/태그 탐색 동선 제공 | Medium | Pending |
| FR-08 | "유용한 사이트" 데이터 `app/data/`로 분리 | Low | Pending |
| FR-09 | 타입 캐스팅 제거 + 죽은 코드 정리 | Low | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| Performance | tsparticles 제거로 홈 초기 클라이언트 JS 감소 | `pnpm build` 번들 출력 비교 (before/after) |
| Performance | LCP 저하 없음(히어로가 이미지/무거운 JS에 의존하지 않음) | Vercel Speed Insights / Lighthouse |
| Accessibility | 랜드마크 단일 `<main>`, 색 대비 WCAG AA | 수동 검수 + 브라우저 a11y 검사 |
| Maintainability | 홈 JSX 중복 제거, 데이터/뷰 분리 | 코드 리뷰 |
| Compatibility | 토큰 변경이 다른 화면 시각 회귀 없음 | 주요 화면 수동 확인(홈/목록/상세/About) |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] FR-01~FR-09 구현 완료
- [ ] `pnpm typecheck` 무오류
- [ ] `pnpm lint` 무오류
- [ ] `pnpm build` 성공 (contentlayer 포함)
- [ ] 라이트/다크 양쪽 시각 확인

### 4.2 Quality Criteria

- [ ] `<main>` 랜드마크 1개만 존재
- [ ] tsparticles가 홈 경로 클라이언트 번들에서 제거됨
- [ ] 액센트 색 대비 WCAG AA 충족
- [ ] 다른 화면(목록/상세/About) 시각 회귀 없음

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| 공유 토큰(primary/accent) 변경이 버튼·뱃지·MDX 등 전역 시각에 회귀 | High | Medium | Design 단계에서 토큰 영향 인벤토리 작성, 변경 후 주요 화면 수동 확인 |
| tsparticles 제거 시 다른 곳에서 참조 | Medium | Low | 의존성 사용처 grep 확인 후 제거 (Impact Analysis §6) |
| framer-motion 히어로 애니메이션이 모바일 성능 저하 | Medium | Low | reduced-motion 대응 + 경량 트랜지션만 사용 |
| 폰트 토큰 수정이 기존 텍스트 렌더링 변경 | Low | Medium | Inter는 이미 body에 적용 중 → 토큰만 일치시켜 영향 최소 |

---

## 6. Impact Analysis

### 6.1 Changed Resources

| Resource | Type | Change Description |
|----------|------|--------------------|
| `app/page.tsx` | Component | 섹션 재구성, 컴포넌트 추출, 타입/주석 정리 |
| `app/globals.css` | Config(tokens) | `--primary`/`--accent` 블루화, `--font-sans` 수정 |
| `app/components/ParticlesBanner*.tsx` | Component | 제거 또는 신규 히어로로 대체 |
| `app/data/` | Data | 유용한 사이트 데이터 신설 |

### 6.2 Current Consumers

| Resource | Operation | Code Path | Impact |
|----------|-----------|-----------|--------|
| `--primary`/`--accent` 토큰 | READ | `ui/button.tsx`, `ui/badge.tsx`, `Profile`, `globals.css` MDX/toc | Needs verification (시각 회귀) |
| `--font-sans`/`--font-mono` | READ | `@theme inline` → 전역 | Needs verification |
| `ParticlesBanner` | IMPORT | `app/page.tsx`만 사용(예상) | Do 단계 grep로 확정 |
| `<main>` (layout) | LAYOUT | 모든 페이지 | None (단일화는 안전 방향) |

### 6.3 Verification

- [ ] 토큰 변경 후 버튼/뱃지/Profile/MDX 시각 확인
- [ ] `ParticlesBanner` 사용처가 홈뿐임을 grep로 확인 후 제거
- [ ] 폰트 토큰 수정 후 전역 텍스트 렌더 확인

---

## 7. Architecture Considerations

### 7.1 Project Level Selection

| Level | Characteristics | Recommended For | Selected |
|-------|-----------------|-----------------|:--------:|
| **Starter** | 단순 구조 | 정적 사이트/포트폴리오 | ☐ |
| **Dynamic** | 기능 모듈, BaaS | 백엔드 있는 웹앱 | ☐ |
| **Enterprise** | 엄격한 레이어 분리 | 대규모 시스템 | ☐ |

> 본 프로젝트는 콘텐츠 중심 블로그(App Router + Contentlayer). 레벨 분류상 Starter~Dynamic 경계지만, 기존 `app/` 구조를 유지하므로 레벨 변경 없음.

### 7.2 Key Architectural Decisions

| Decision | Options | Selected | Rationale |
|----------|---------|----------|-----------|
| Framework | Next.js / React / Vue | **Next.js 14 (App Router)** | 기존 스택 유지 |
| Styling | Tailwind / CSS Modules / Emotion | **Tailwind v4 우선** | 스타일 이원화 축소 목표(신규 Emotion 지양) |
| Animation | framer-motion / CSS | **framer-motion + CSS** | 기존 animations 래퍼 재사용 |
| Hero | tsparticles / CSS+motion / 정적 | **CSS 그라디언트 + framer-motion** | 번들 경량화 + 독창성 |
| Data 위치 | 인라인 / `app/data` | **`app/data`** | 데이터/뷰 분리 |
| Testing | 수동 / Playwright | **수동 + 빌드 검증** | 정적 페이지, 현재 테스트 인프라 없음 |

### 7.3 Clean Architecture Approach

```
홈 리팩토링 후 구조(예상):
app/
├─ page.tsx                 # 서버 컴포넌트, 섹션 조립
├─ data/
│  └─ usefulSites.ts        # 유용한 사이트 데이터 분리
├─ components/
│  ├─ home/                 # (신규) 홈 전용 컴포넌트
│  │  ├─ Hero.tsx           # 경량 히어로 (client, motion)
│  │  ├─ LatestPosts.tsx    # 최신 글 섹션
│  │  └─ QuickNav.tsx       # 카테고리/태그 탐색
│  └─ ui/                   # 기존 프리미티브 재사용
└─ globals.css              # 액센트/폰트 토큰 수정
```

---

## 8. Convention Prerequisites

### 8.1 Existing Project Conventions

- [x] `CLAUDE.md` / `AGENTS.md` 코딩 규칙 존재
- [ ] `docs/01-plan/conventions.md` 없음
- [x] ESLint (`eslint.config.mjs`)
- [ ] Prettier 설정 없음
- [x] TypeScript (`tsconfig.json`, strict)

### 8.2 Conventions to Define/Verify

| Category | Current State | To Define | Priority |
|----------|---------------|-----------|:--------:|
| **Naming** | 부분 존재 | 컴포넌트 PascalCase, 폴더형 index.tsx (AGENTS 준수) | High |
| **Folder structure** | 존재 | `components/home/` 신설 패턴 확정 | High |
| **Styling** | 이원화 | Tailwind 우선 + cn()/cva 일관화 | High |
| **Import order** | 미정 | 경로 별칭(@/) 우선 | Medium |

### 8.3 Environment Variables Needed

| Variable | Purpose | Scope | To Be Created |
|----------|---------|-------|:-------------:|
| (없음) | 홈 리팩토링은 env 변경 불필요 | - | ☐ |

---

## 9. Next Steps

1. [ ] context7 MCP 연결 확인
2. [ ] Design 문서 작성 (`home-refactor.design.md`) — 3가지 아키텍처 옵션 제시
3. [ ] Checkpoint 3(설계안 선택) 후 구현 시작

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-06-07 | 초안 작성 (홈 리팩토링 파일럿) | louis-25 |
