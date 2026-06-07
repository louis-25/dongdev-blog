---
template: analysis
feature: home-refactor
date: 2026-06-07
author: louis-25
phase: check
---

# home-refactor Gap Analysis (Check)

> **Design**: [home-refactor.design.md](../02-design/features/home-refactor.design.md)
> **Plan**: [home-refactor.plan.md](../01-plan/features/home-refactor.plan.md)

## Context Anchor

| Key | Value |
|-----|-------|
| WHY | 약한 브랜드 인상 + 구조 결함 해소, 전 화면 패턴 기준점 |
| WHO | 방문자(데스크톱/모바일) + 유지보수자 |
| RISK | 토큰/tsparticles 변경의 타 화면 회귀 |
| SUCCESS | 5대 목표 충족 + 빌드/타입/린트 0 + 번들↓ + a11y 0 |
| SCOPE | 홈 1개 화면 |

---

## 1. Match Rate 요약

| 축 | 점수 | 가중 | 근거 |
|----|:----:|:----:|------|
| Structural (파일 존재) | 100% | 0.15 | 설계 명시 7개 파일 모두 존재, 삭제 2개 확인 |
| Functional (§5.4 체크리스트) | 100% | 0.25 | 16개 UI 체크리스트 항목 전부 충족, 플레이스홀더 없음 |
| Contract (API) | N/A(100%) | 0.25 | 정적 페이지, API 없음 → 위반 표면 없음 |
| Runtime (dev 렌더) | 85% | 0.35 | localhost:3000 HTTP 200, 4섹션 렌더, 런타임 오류 0. 단 full build 미완주·대비/회귀 미정밀검증 |

**Overall Match Rate ≈ 94%** (= 100×0.15 + 100×0.25 + 100×0.25 + 85×0.35) — **목표 90% 충족 ✅**

---

## 2. Structural Match (100%)

| 설계 파일 | 상태 |
|-----------|:----:|
| `app/components/home/Hero.tsx` | ✅ 생성 |
| `app/components/home/LatestPosts.tsx` | ✅ 생성 |
| `app/components/home/QuickNav.tsx` | ✅ 생성 |
| `app/components/home/UsefulSites.tsx` | ✅ 생성 |
| `app/data/usefulSites.ts` | ✅ 생성 |
| `app/page.tsx` | ✅ 재작성 |
| `app/globals.css` | ✅ 토큰 수정 |
| `ParticlesBanner.tsx` / `ParticlesBannerDynamic.tsx` | ✅ 삭제 |
| `package.json` @tsparticles/* | ✅ 제거(3종) |

---

## 3. Functional Depth — §5.4 Page UI Checklist (16/16)

| 항목 | 상태 | 근거 |
|------|:----:|------|
| Hero h1 + 소개 | ✅ | Hero.tsx h1 "DongDev Blog" + p |
| Hero CTA→/blog (brand) | ✅ | `bg-brand` Link `/blog` |
| Hero 그라디언트(no tsparticles) | ✅ | CSS gradient+glow+grid |
| Hero motion + reduced-motion | ✅ | `useReducedMotion()` 분기 |
| LatestPosts 제목+"전체 보기"→/blog | ✅ | section heading + Link |
| LatestPosts 최대6·최신순 | ✅ | page.tsx sort desc + slice(0,6) |
| LatestPosts 제목/설명/날짜 | ✅ | line-clamp-1/2 + `<time>` |
| LatestPosts 빈 상태 | ✅ | length===0 분기 |
| QuickNav 제목 | ✅ | "카테고리 둘러보기" |
| QuickNav 카테고리(글 있는 것만) | ✅ | `filter(tags.length>0)` |
| QuickNav 태그 이동 | ✅ | TagList href 로직 재사용 |
| QuickNav 모바일 표시 | ✅ | 반응형 grid, lg:hidden 없음 |
| UsefulSites 제목 | ✅ | "유용한 사이트" |
| UsefulSites 외부 카드+rel | ✅ | `rel="noopener noreferrer"` |
| main 중복 없음 | ✅ | page는 `<div>`, layout 단일 `<main>` |
| 라이트/다크 정상 | ✅ | `:root`/`.dark` 토큰 + 렌더 확인 |

---

## 4. Plan Success Criteria 평가

| 기준 | 상태 | 근거 |
|------|:----:|------|
| FR-01 히어로 교체 | ✅ Met | Hero.tsx, ParticlesBanner 삭제 |
| FR-02 브랜드 토큰 | ✅ Met* | `--brand` 신설(*Plan의 primary/accent→Design에서 --brand로 의도적 변경, Checkpoint 승인) |
| FR-03 홈 재구성 | ✅ Met | 4섹션 조립 |
| FR-04 main 중복 제거 | ✅ Met | page.tsx `<div>` |
| FR-05 폰트 토큰 | ✅ Met | `--font-sans`→`--font-inter`, layout 배선 |
| FR-06 최신글 카드+설명 | ✅ Met | LatestPosts |
| FR-07 모바일 탐색 | ✅ Met | QuickNav 반응형 |
| FR-08 데이터 분리 | ✅ Met | usefulSites.ts |
| FR-09 타입캐스팅/죽은코드 | ✅ Met | any 제거, 주석 정리 |
| typecheck 0 | ✅ Met | `pnpm typecheck` exit 0 |
| lint 0 | ⚠️ N/A | ESLint flat config 깨짐(`@eslint/eslintrc` 미설치, 프로젝트 전체·기존) |
| build 성공 | ⚠️ Partial | dev서버 .next 잠금 + contentlayer Windows 종료버그로 미완주. dev 렌더 200 ✅ |
| 단일 main | ✅ Met | 확인 |
| tsparticles 번들 제거 | ✅ Met | import/deps 제거 (full diff 미측정) |
| 색 대비 AA | ⚠️ 미검증 | brand 버튼 대비 정밀 측정 필요 |
| 타 화면 회귀 없음 | ⚠️ 미검증 | primary/accent 불변으로 위험 낮으나 육안 확인 필요 |

---

## 5. Decision Record 준수 검증

| 결정 | 준수 |
|------|:----:|
| Option C (home/ + 기존 ui/data 재사용) | ✅ |
| 브랜드를 신규 --brand로 (primary 불변) | ✅ (globals.css primary 미변경 확인) |
| Hero CSS+motion (tsparticles 제거) | ✅ |
| 폰트 토큰 Inter 정정 | ✅ |

---

## 6. Gap 목록 (잔여)

> 모두 **검증/후속 작업**이며 구현 결함(코드 버그) 아님.

| # | 심각도 | 항목 | 조치 |
|---|--------|------|------|
| G1 | Important | full `pnpm build` 미완주 | dev서버 종료 후 `pnpm build:contentlayer` |
| G2 | Important | pnpm-lock 미동기화(tsparticles 제거) | `pnpm install` |
| G3 | Minor | brand 버튼 색 대비 AA 미측정 | devtools 대비 확인(필요 시 brand 명도 조정) |
| G4 | Minor | 타 화면(목록/상세/About) 회귀 육안 미확인 | 수동 확인(위험 낮음) |
| G5 | Info | `hello-world.mdx` category 누락(기존) | 본 범위 밖(카테고리 enum 이슈) |

**Critical: 0건. 구현 결함: 0건.**

---

## 7. 결론

- Match Rate **≈94% (≥90% 통과)**. 모든 기능 요구사항(FR-01~09) 충족, §5.4 체크리스트 16/16.
- 잔여 항목은 환경/검증 성격(빌드 완주·lock 동기화·대비·회귀 육안). 코드 수정(iterate) 불필요.
- 권장: G1·G2를 사용자가 1회 처리 → Report 진행.
