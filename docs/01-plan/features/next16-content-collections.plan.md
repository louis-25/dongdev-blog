---
template: plan
version: 1.3
feature: next16-content-collections
date: 2026-09-14
author: louis-25
project: dongdev-blog
projectVersion: 0.1.0
status: Draft
---

# next16-content-collections Planning Document

> **Summary**: 유지보수가 중단된 Contentlayer 0.3.4(최종 배포 2023-06-29)와 2개 메이저 뒤처진 Next.js 14.1.3을 정리한다. Next 16.3.5로 올린 뒤 콘텐츠 파이프라인을 `@content-collections/*`로 이관하며, 두 단계를 각각 독립 배포 가능한 단위로 분리한다.
>
> **Project**: dongdev-blog
> **Version**: 0.1.0
> **Author**: louis-25
> **Date**: 2026-09-14
> **Status**: Draft

---

## Executive Summary

| Perspective | Content |
|-------------|---------|
| **Problem** | Contentlayer 0.3.4는 3년 2개월째 배포 없음(사실상 사망), Next 14.1.3은 2개 메이저 뒤처져 보안·성능 패치가 끊김. Next 16은 Turbopack이 기본이라 `withContentlayer` 같은 webpack 플러그인 래퍼가 동작하지 않음 |
| **Solution** | ① Next 16.3.5 업그레이드(React 18.2 유지) + `withContentlayer` 제거 → ② 콘텐츠 파이프라인을 `@content-collections/*`로 이관. 각 단계는 독립적으로 배포·롤백 가능 |
| **Function/UX Effect** | 사용자 관측 가능한 동작 변화 **0**. 빌드 속도 개선(Turbopack)과 유지보수 가능한 의존성 확보가 전부 |
| **Risk** | 렌더링 회귀(코드 하이라이트·TOC·이모지), 슬러그/URL 변화로 인한 기존 링크 깨짐 |

---

## Context Anchor

| 항목 | 값 |
|------|-----|
| 작업 브랜치 | `feat/next16-content-collections` |
| 분기 기준 | `develop` @ `e68b74a` |
| 선행 상태 | `pnpm typecheck` ✅ / `pnpm lint` ✅ / 작업 트리 clean |
| 발행 글 수 | 17편 (+ 초안 1편 `hello-world.mdx`) |
| 배포 흐름 | `develop` push → Vercel 프리뷰 → 대시보드에서 수동 승격 (`main` 자동 배포는 [vercel.json](../../../vercel.json)에서 의도적 비활성) |

---

## 1. Overview

### 1.1 Purpose

블로그를 **앞으로 3년 더 운영 가능한 의존성 위에** 올려놓는다. 기능 추가가 아니라 기반 교체이므로, 성공의 정의는 "아무것도 달라지지 않았음을 증명하는 것"이다.

### 1.2 Background

2026-09-14 npm 레지스트리 직접 조회 결과:

| 패키지 | 현재 | 최신 | 최종 배포 | 판정 |
|---|---|---|---|---|
| `contentlayer` | 0.3.4 | 0.3.4 | 2023-06-29 | 사망 |
| `next-contentlayer` | 0.3.4 | 0.3.4 | 2023-06-29 | 사망 |
| `next` | 14.1.3 | **16.3.5** | 2026-09-11 | 2개 메이저 뒤처짐 |
| `@content-collections/core` | — | 0.15.2 | 2026-06-16 | 활발 |
| `@content-collections/next` | — | 0.2.11 | 2026-02-14 | 활발, **peer에 `next: ^16` 명시** |
| `@content-collections/cli` | — | 0.1.9 | 2026-02-14 | 활발, `content-collections` 바이너리 제공 |
| `@content-collections/mdx` | — | 0.2.2 | 2025-03-10 | ⚠️ 18개월 정체 — 이 계획의 최대 약점 |

대안으로 검토한 것:

- **contentlayer2**(포크, 0.5.8 / 2025-05-03) — 16개월 정체. 같은 문제를 한 번 더 겪게 됨. 기각
- **Velite**(0.4.0) — 설계 사상은 가장 가깝지만 아직 0.x이고, `VeliteWebpackPlugin`이 Turbopack에서 동작하지 않으며 공식 우회법도 Next 16에서 실패 보고가 있음. **2순위 대안으로 보류**
- **fumadocs-mdx**(15.4.0) — 가장 활발하나 문서 사이트 전용 설계. 이미 구현된 검색·필터·페이지네이션과 역할이 겹침. 기각
- **Astro** — 블로그로는 우수하나 URL 상태 기반 검색·필터·페이지네이션과 shadcn 컴포넌트를 전면 재작성해야 함. 비용 대비 효익 불일치. 기각

**유리한 선행 조건**: 이 프로젝트는 이미 `"build": "tsx scripts/contentlayer-build.ts && next build"` 로 **콘텐츠 생성을 번들러 플러그인이 아닌 선행 CLI 스텝**으로 돌리고 있다. Windows 종료버그 우회로 만든 구조가 결과적으로 Turbopack 대비가 되어 있어, 일반적인 Contentlayer 프로젝트보다 이관 난도가 낮다.

### 1.3 Related Documents

- [AGENTS.md](../../../AGENTS.md) — §4 콘텐츠 파이프라인, §6 서버/클라이언트 경계 규칙
- [docs/04-report/config-cleanup.report.md](../../04-report/config-cleanup.report.md) — Windows 빌드 래퍼 도입 경위
- [docs/04-report/category-enum.report.md](../../04-report/category-enum.report.md) — 카테고리 enum 단일 진실원

---

## 2. Scope

### 2.1 In Scope

**Phase 1 — Next 16 업그레이드**
- `next` 14.1.3 → 16.3.5, `eslint-config-next` 동반 상승
- [next.config.mjs](../../../next.config.mjs)에서 `withContentlayer()` 래퍼 제거
- 개발 모드 콘텐츠 감시를 `contentlayer dev --watch` 병행 실행으로 대체
- Turbopack 기본 전환에 따른 빌드/dev 검증

**Phase 2 — content-collections 이관**
- `contentlayer.config.ts` → `content-collections.ts` 스키마 이관 (Zod)
- `remark`/`rehype` 체인 이식 (커스텀 `rehypeWrapTocWithDetails` 포함)
- `contentlayer/generated` import 10개 파일 교체
- `useMDXComponent` → content-collections MDX 렌더러 교체
- [tsconfig.json](../../../tsconfig.json) paths, [scripts/contentlayer-build.ts](../../../scripts/contentlayer-build.ts), `package.json` 스크립트 정리
- [AGENTS.md](../../../AGENTS.md) §1·§2·§3·§4 갱신

### 2.2 Out of Scope

- **React 18.2 → 19.3 업그레이드** — Next 16의 peer가 `react: ^18.2.0 || ^19.0.0`이라 강제되지 않는다. 변수를 하나씩만 바꾸기 위해 별도 사이클로 분리
- **React Compiler 도입** — React 19 이후
- `framer-motion` → `motion` 패키지명 변경, `shiki` 0.14 → 4.x — 별도 사이클
- 글 내용·frontmatter 수정 (필드 구조가 동일하므로 불필요)
- 디자인·레이아웃·기능 변경 일체

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | 요구사항 | 우선순위 |
|---|---|---|
| FR-01 | 발행글 17편의 **URL이 한 글자도 변하지 않는다** (`/blog/{파일명}`) | P0 |
| FR-02 | 초안(`published: false`)은 목록·RSS·sitemap·직접 URL 4곳 모두에서 계속 차단된다 | P0 |
| FR-03 | MDX 렌더링 결과가 동일하다 — 코드 하이라이트(`dark-plus`), 헤딩 앵커, `<details>`로 감싼 TOC, 이모지 | P0 |
| FR-04 | 커스텀 MDX 컴포넌트(`CodeBlock`, `Alert`, `MdxImage`)가 계속 동작한다 | P0 |
| FR-05 | frontmatter 필수 필드 검증이 유지된다 (`title`, `date`, `description`, `category`, `published`) | P0 |
| FR-06 | `category` enum이 [config/post.ts](../../../config/post.ts)의 `CATEGORY_LIST`를 단일 진실원으로 계속 참조한다 | P0 |
| FR-07 | computed 필드 `url`·`formattedDate`·`slugAsParams`가 동일한 값을 산출한다 | P0 |
| FR-08 | 검색·태그·카테고리·정렬·페이지네이션이 기존과 동일하게 동작한다 | P0 |
| FR-09 | Windows에서 `pnpm build`가 완주한다 (현재 Contentlayer 종료버그로 래퍼가 필요한 상태) | P1 |

### 3.2 Non-Functional Requirements

| ID | 요구사항 | 목표치 |
|---|---|---|
| NFR-01 | 서버/클라이언트 경계 유지 — 클라이언트 번들에 MDX 본문이 실리지 않을 것 ([AGENTS.md §6](../../../AGENTS.md)) | 회귀 없음 |
| NFR-02 | `pnpm typecheck` / `pnpm lint` 무경고 통과 | 필수 |
| NFR-03 | 프로덕션 빌드 시간 | 현재 이하 |
| NFR-04 | 의존성 최종 배포일 | 전부 12개월 이내 (`@content-collections/mdx` 예외는 §5에서 처리) |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] Phase 1 / Phase 2 각각 **독립 커밋**으로 분리되어, 어느 쪽이든 단독 revert 가능
- [ ] `pnpm typecheck` · `pnpm lint` 통과
- [ ] `pnpm build` 완주 (Windows 로컬 + Vercel 프리뷰 양쪽)
- [ ] 아래 **렌더링 동등성 검증** 전 항목 통과
- [ ] `contentlayer`·`next-contentlayer` 의존성이 `package.json`에서 완전히 제거됨
- [ ] [AGENTS.md](../../../AGENTS.md) 갱신 (§1 스택 표, §2 명령어, §3 구조, §4 파이프라인)

### 4.2 Quality Criteria — 렌더링 동등성 검증

기능 추가가 없는 마이그레이션이므로, **이관 전 스냅샷과 이관 후 출력의 차이가 0인지**가 유일한 품질 기준이다.

| 검증 항목 | 방법 | 기준 |
|---|---|---|
| URL 집합 | 이관 전후 `/sitemap.xml`의 `<loc>` 목록 diff | **완전 일치** |
| RSS 항목 | 이관 전후 `/rss.xml`의 `<item>` 수·`<link>` diff | **완전 일치** (17건) |
| 본문 HTML | 대표 글 3편의 `<article>` 렌더 결과 비교 | 구조 일치 |
| 코드 하이라이트 | `pnpm도입기`, `Docker 사용법` — shiki `dark-plus` 클래스 존재 | 유지 |
| TOC | `<details>`로 감싼 TOC가 상세 페이지에 존재 | 유지 |
| 초안 차단 | `/blog/hello-world` → 404, 홈 HTML·RSS·sitemap에 미출현 | 유지 |
| 클라이언트 번들 | 홈 HTML에 MDX 본문 문자열 미포함 | 유지 |

> **대표 글 3편 선정 기준**: 코드블록 다수(`pnpm도입기`) / 이미지·이모지 포함(`Docker 사용법`) / 긴 TOC(`GitLab CI/CD 파이프라인 구성하기`)

---

## 5. Risks and Mitigation

| # | 리스크 | 영향 | 확률 | 완화 |
|---|---|---|---|---|
| R-1 | **`@content-collections/mdx` 18개월 정체** — 이관 직후 또 낡은 의존성을 안게 될 수 있음 | 중 | 중 | Phase 2 착수 전 스파이크로 확인. 부적합 판정 시 **frontmatter/타이핑만 content-collections가 담당하고 MDX 컴파일은 `next-mdx-remote` v6(2026-02)가 담당**하는 분리 구성으로 전환. 이 경우도 스키마 이관 작업은 그대로 유효 |
| R-2 | **슬러그 산출 로직 차이로 URL 변경** — `flattenedPath.split("/").pop()` 규칙을 그대로 옮기지 못하면 17개 글의 링크가 전부 깨짐 | 치명 | 저 | §4.2의 sitemap diff를 **Phase 2 머지 게이트**로 설정. 불일치 시 머지 차단 |
| R-3 | **커스텀 `rehypeWrapTocWithDetails` 이식 실패** — contentlayer 내장 `rehypeToc` 출력 구조에 의존 | 중 | 중 | 스파이크에서 최우선 확인. 실패 시 TOC를 rehype 체인이 아닌 렌더 단계 컴포넌트로 재구현 (별도 사이클로 분리) |
| R-4 | **Turbopack 전환에 따른 Emotion SSR 회귀** — `@emotion/server`·`@emotion/cache`를 사용 중이며 Turbopack의 SWC 변환 경로가 다름 | 중 | 중 | Phase 1 단독 배포로 격리 검증. 회귀 시 Phase 1만 revert |
| R-5 | **Windows 빌드 래퍼가 실패를 삼킴** — [scripts/contentlayer-build.ts](../../../scripts/contentlayer-build.ts)가 `exit 0` 고정이라 콘텐츠 생성 실패가 조용히 통과 | 중 | 고 | Phase 2에서 래퍼를 제거하고 `content-collections build`를 직접 호출. **이관의 부수 이득으로 빌드 게이트가 정상화됨** |
| R-6 | Next 16 breaking change 누락 | 중 | 중 | Phase 1을 단독 커밋·단독 프리뷰 배포로 검증 후 Phase 2 착수 |

---

## 6. Impact Analysis

### 6.1 Changed Resources

| 구분 | 경로 | Phase | 변경 |
|---|---|---|---|
| 삭제 | `contentlayer.config.ts` | 2 | → `content-collections.ts` |
| 삭제 | [scripts/contentlayer-build.ts](../../../scripts/contentlayer-build.ts) | 2 | CLI 직접 호출로 대체 |
| 신규 | `content-collections.ts` | 2 | 스키마 + remark/rehype 체인 |
| 수정 | [next.config.mjs](../../../next.config.mjs) | 1 | `withContentlayer()` 제거 |
| 수정 | [package.json](../../../package.json) | 1·2 | 의존성 교체, `build`/`dev` 스크립트 |
| 수정 | [tsconfig.json](../../../tsconfig.json) | 2 | `contentlayer/generated` path 제거 |
| 수정 | [app/components/MDXComponents.tsx](../../../app/components/MDXComponents.tsx) | 2 | `useMDXComponent` 교체 |
| 수정 | [AGENTS.md](../../../AGENTS.md) | 2 | §1·§2·§3·§4 |

### 6.2 Current Consumers — `contentlayer/generated` import 10개 파일

| 파일 | 사용 | 비고 |
|---|---|---|
| [app/lib/posts.ts](../../../app/lib/posts.ts) | `allPosts` | **서버 전용 경계 모듈** — 최우선 이관 |
| [app/page.tsx](../../../app/page.tsx) | `allPosts` | 최신글 6 |
| [app/blog/page.tsx](../../../app/blog/page.tsx) | `allPosts` | 목록·필터·정렬 |
| [app/blog/[slug]/page.tsx](../../../app/blog/[slug]/page.tsx) | `allPosts` | 상세 + `generateStaticParams` |
| [app/category/[category]/page.tsx](../../../app/category/[category]/page.tsx) | `allPosts` | |
| [app/tags/page.tsx](../../../app/tags/page.tsx) | `allPosts` | |
| [app/tags/[tag]/page.tsx](../../../app/tags/[tag]/page.tsx) | `allPosts` | |
| [app/rss.xml/route.ts](../../../app/rss.xml/route.ts) | `allPosts` | |
| [app/sitemap.ts](../../../app/sitemap.ts) | `allPosts` | |
| [app/components/MDXComponents.tsx](../../../app/components/MDXComponents.tsx) | `useMDXComponent` | **유일한 렌더러 결합 지점** |

> 9개 파일은 `allPosts` 배열만 소비하므로 import 경로 교체로 끝난다. 실제 난이도는 `MDXComponents.tsx` 한 곳에 집중되어 있다.

### 6.3 Verification

```bash
# 이관 전 스냅샷 (develop 기준)
pnpm dev  # 별도 터미널
curl -s localhost:3000/sitemap.xml > /tmp/before-sitemap.xml
curl -s localhost:3000/rss.xml    > /tmp/before-rss.xml

# 이관 후
diff /tmp/before-sitemap.xml /tmp/after-sitemap.xml   # 기대: 차이 없음
diff /tmp/before-rss.xml    /tmp/after-rss.xml        # 기대: 차이 없음
```

---

## 7. Architecture Considerations

### 7.1 스키마 이관 매핑

Contentlayer와 content-collections는 설계 사상이 같아 대응이 1:1에 가깝다.

| Contentlayer | content-collections | 비고 |
|---|---|---|
| `defineDocumentType()` | `defineCollection()` | |
| `filePathPattern: "**/*.mdx"` | `directory` + `include` | |
| `fields: { type: "string", required: true }` | `schema: z.object({ ... })` | Zod로 표현력 상승 |
| `type: "enum", options: CATEGORY_LIST` | `z.enum(CATEGORY_LIST)` | **FR-06 단일 진실원 유지** |
| `computedFields.url` | `transform()` 반환 객체 | |
| `contentType: "mdx"` | `@content-collections/mdx` compileMDX | **R-1 대상** |
| `makeSource({ mdx: { remarkPlugins, rehypePlugins } })` | `transform` 내 컴파일 옵션 | 체인 그대로 이식 |
| `allPosts` from `contentlayer/generated` | `allPosts` from `content-collections` | 심볼명 동일 |

### 7.2 Key Architectural Decisions

| # | 결정 | 근거 |
|---|---|---|
| AD-1 | **Phase 1과 Phase 2를 분리한다** | 프레임워크 업그레이드와 콘텐츠 파이프라인 교체를 한 커밋에 묶으면, 회귀 발생 시 원인 격리가 불가능해진다. 각각 프리뷰 배포로 독립 검증 |
| AD-2 | **React 18.2를 유지한 채 Next 16으로 간다** | Next 16 peer가 React 18.2를 허용한다. 한 번에 한 변수만 바꾼다 |
| AD-3 | **콘텐츠 생성을 번들러 플러그인이 아닌 선행 CLI 스텝으로 유지한다** | Turbopack이 webpack 플러그인을 지원하지 않는다. 현재 구조가 이미 이 패턴이므로 유지가 곧 이득 |
| AD-4 | **`@content-collections/mdx` 적합성을 Phase 2 착수 전 스파이크로 먼저 검증한다** | 유일하게 정체된 의존성이자 유일한 렌더러 결합 지점. 여기서 막히면 Phase 2 설계가 바뀐다 |
| AD-5 | **URL 불변을 머지 게이트로 삼는다** | 3~4년치 글의 외부 링크·검색 색인이 걸려 있다. 되돌릴 수 없는 유일한 실패 모드 |

### 7.3 Folder Preview

```
dongdev-blog/
├─ content-collections.ts        # 신규 — 스키마 + remark/rehype 체인
├─ contentlayer.config.ts        # 삭제
├─ scripts/contentlayer-build.ts # 삭제 (CLI 직접 호출)
├─ .content-collections/         # 생성물 (gitignore 대상)
└─ .contentlayer/                # 삭제 (gitignore 항목도 정리)
```

---

## 8. Convention Prerequisites

### 8.1 Existing

- 커밋: 한국어 conventional commit (`feat:`, `fix:`, `chore:`, `refactor:`)
- 경로 별칭 사용, 상대경로 지양 ([AGENTS.md §5](../../../AGENTS.md))
- 서버/클라이언트 경계 ([AGENTS.md §6](../../../AGENTS.md)) — 이관 후에도 `app/lib/posts.ts`가 유일한 경계 모듈

### 8.2 To Verify

- [ ] `.content-collections/`를 [.gitignore](../../../.gitignore)에 추가
- [ ] `.contentlayer/` 항목 제거 시점 결정 (Phase 2 완료 후)
- [ ] Vercel 빌드 캐시가 구 `.contentlayer` 산출물을 재사용하지 않는지 확인

### 8.3 Env Vars

변경 없음.

---

## 9. Next Steps

| 순서 | 작업 | 산출물 | 게이트 |
|---|---|---|---|
| 0 | **스파이크**: `@content-collections/mdx`로 대표 글 1편 렌더 + 커스텀 rehype 체인 이식 가능성 확인 | 판정 기록 | R-1·R-3 해소 |
| 1 | Phase 1 — Next 16 업그레이드 | 커밋 1 | `pnpm build` 완주 + 프리뷰 배포 육안 확인 |
| 2 | Phase 2 — content-collections 이관 | 커밋 2 | §4.2 렌더링 동등성 전 항목 |
| 3 | 문서 갱신 | AGENTS.md, design/analysis 문서 | — |
| 4 | PR → `develop` | | |

> **스파이크(0단계) 결과에 따라 Phase 2 설계가 달라진다.** `@content-collections/mdx`가 부적합하면 R-1 완화안(content-collections + next-mdx-remote 분리 구성)으로 전환하고, 이 문서의 §7.1 매핑표 마지막 행만 교체된다.

---

## Version History

| 버전 | 날짜 | 작성자 | 내용 |
|---|---|---|---|
| 1.0 | 2026-09-14 | louis-25 | 최초 작성 — Next 16 + content-collections 이관 계획 |
