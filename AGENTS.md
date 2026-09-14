# AGENTS.md — dongdev-blog

> AI 에이전트(Claude Code 등)를 위한 프로젝트 작업 가이드.
> 코드를 수정하기 전에 이 문서를 먼저 읽고, 아래 규칙과 구조를 따른다.

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 유형 | 개인 기술 블로그 (정적 콘텐츠 중심) |
| 프레임워크 | Next.js 16.3.5 (App Router, **Turbopack 기본**) |
| 언어 | TypeScript 5 / React 19.3 |
| 콘텐츠 | **content-collections** (`@content-collections/*`) + MDX + Zod |
| 스타일 | Tailwind CSS v4 + Emotion + Radix UI (shadcn 스타일) |
| 애니메이션 | framer-motion 13 |
| 린트 | ESLint 9 (**flat config** `eslint.config.mjs`) |
| 패키지 매니저 | **pnpm 10.17** (npm/yarn 사용 금지) |
| 배포 | Vercel. `develop` push → 프리뷰 → 대시보드에서 수동 승격 (`main` 자동배포는 vercel.json에서 비활성) |

## 2. 필수 명령어

```bash
pnpm install          # 의존성 설치 (postinstall로 patch-package 실행)
pnpm dev              # content-collections watch + next dev 동시 실행 (concurrently)
pnpm build            # content-collections build && next build
pnpm lint             # eslint .  (next lint는 Next 16에서 제거됨)
pnpm typecheck        # tsc --noEmit
```

> Next 16은 Turbopack이 기본이고 Turbopack은 webpack 플러그인을 지원하지 않는다.
> 콘텐츠 생성은 번들러 플러그인이 아니라 **선행 CLI 스텝**으로 분리되어 있다.
> `next.config.mjs`에 webpack 설정을 주입하는 플러그인을 추가하면 빌드가 실패한다.

> **커밋/PR 전 반드시** `pnpm typecheck` 와 `pnpm lint` 를 통과시킬 것.

## 3. 디렉터리 구조

```
dongdev-blog/
├─ app/                        # Next.js App Router 루트
│  ├─ page.tsx                 # 홈
│  ├─ layout.tsx               # 전역 레이아웃 (페이지 진입 애니메이션은 animations/PageTransition)
│  ├─ not-found.tsx
│  ├─ about/                   # 이력·경력 페이지
│  ├─ blog/                    # 글 목록
│  │  └─ [slug]/               # 글 상세 (동적)
│  ├─ category/[category]/     # 카테고리별 목록
│  ├─ tags/ + tags/[tag]/      # 태그 인덱스 / 태그별 목록
│  ├─ rss.xml/route.ts        # RSS 피드 (feed 라이브러리)
│  ├─ sitemap.ts / robots.ts   # 사이트맵 · robots
│  ├─ api/og/route.tsx         # 동적 OG 이미지
│  ├─ components/
│  │  ├─ ui/                   # Radix 기반 프리미티브 (button, dialog, tabs ...)
│  │  ├─ animations/           # framer-motion 래퍼 + 훅
│  │  ├─ mdx/                  # MDX 전용 (CodeBlock, Alert, MdxImage)
│  │  └─ *.tsx                 # Navigation, SearchBar, Toc, ThemeSwitch 등
│  ├─ data/                    # 경력/프로젝트 정적 데이터 (career, projects, useAbout)
│  ├─ lib/                     # posts.ts(서버 데이터), utils.ts
│  └─ utils/                   # IconPicker, SkillPicker, scrollToTop
├─ posts/                      # MDX 글 원본 (YYYY-MM/ 폴더 구조)
├─ config/post.ts             # 카테고리 상수 (CATEGORY_LIST)
├─ config/site.ts             # 도메인·사이트명·설명 단일 진실원
├─ content-collections.ts     # 콘텐츠 스키마(Zod) + remark/rehype 파이프라인
├─ public/                     # 정적 자산 (icons, posts/images, favicon)
├─ eslint.config.mjs          # ESLint flat config
└─ next.config.mjs            # 플러그인 래핑 없음 (Turbopack)
```

## 4. 콘텐츠 파이프라인 (content-collections)

- 정의: `content-collections.ts` — `defineCollection` + **Zod 스키마**.
- 원본: `posts/**/*.mdx` → `content-collections`(= `.content-collections/generated`)로 변환.
  소비는 `import { allPosts } from "content-collections"`.
- **필수 frontmatter**: `title`, `date`, `description`, `category`, `published`.
  선택: `thumbnail`, `tags`. `content`(본문)는 스키마에 **명시 선언**해야 한다(암묵 추가는 deprecated).
- `category`는 `config/post.ts`의 `CATEGORY_LIST`를 `z.enum`으로 재사용 — 단일 진실원.
- **transform 산출 필드**: `mdx`(컴파일된 코드), `url`(`/blog/{파일명}`), `slugAsParams`, `formattedDate`.
  - URL/슬러그는 **파일명만** 사용한다(폴더 경로 제외). 따라서 파일명은 전역에서 유일해야 한다.
  - 슬러그 추출은 반드시 `doc._meta.path.split(/[\\/]/).pop()` — `_meta.path`가 **Windows에서는
    역슬래시**를 쓰므로 `"/"`로만 split하면 폴더명이 URL에 섞이고, Linux(Vercel)에서는 통과해
    플랫폼마다 URL이 달라진다.
- 렌더러: `useMDXComponent` from `@content-collections/mdx/react` (`app/components/MDXComponents.tsx`).
- rehype/remark 체인: `remark-gemoji`, `rehype-pretty-code`(shiki, `dark-plus` 테마), `rehype-slug`,
  `rehype-autolink-headings`, `rehype-toc` → **커스텀 플러그인 `rehypeWrapTocWithDetails`** 로 TOC를 `<details>` 토글로 감쌈.
- `rehypePrettyCode` 항목에 `as never` 캐스팅이 붙어 있다. mdx-bundler(unified@10)와
  rehype-pretty-code(unified@11)의 `Plugin` 타입 트리가 달라서이며 런타임 영향은 없다.

### 새 글 추가 절차
1. `posts/YYYY-MM/<유일한-파일명>.mdx` 생성.
2. frontmatter에 필수 필드 작성, `published: true` 설정.
3. 이미지는 `public/posts/images/` 에 두고 `/posts/images/...` 로 참조.
4. `pnpm dev` 가 `content-collections watch`를 함께 돌리므로 저장 즉시 반영된다.
5. 태그는 **대소문자를 통일**할 것 — `React`/`react`가 섞이면 태그 페이지가 둘로 갈라진다
   (Windows에서는 파일명 충돌로 한쪽이 덮어써진다).

## 5. 경로 별칭 (tsconfig paths)

```
@/*                    → ./*
@/ui/*                 → ./app/components/ui/*
content-collections    → ./.content-collections/generated
```
상대경로(`../../`) 대신 별칭을 사용한다.

## 6. 서버/클라이언트 경계 규칙 (중요)

- **`allPosts`(전체 MDX 본문 포함)는 서버 컴포넌트/서버 모듈에서만 import** 한다.
- 클라이언트로는 `app/lib/posts.ts` 의 경량 함수만 전달한다:
  - `getSearchIndex()` → 검색용 최소 필드(`title, description, url, tags`)
  - `getCategoryTagsWithCounts()` → 카테고리/태그 집계
- 클라이언트 컴포넌트(`"use client"`)에서 `content-collections` 를 직접 import하지 말 것.
  본문이 번들에 실려 번들 크기가 급증한다. (최근 perf 커밋들이 이 경계를 정리함.)

## 7. 스타일링 규칙

- 기본은 **Tailwind CSS v4** 유틸리티. `cn()`(`app/lib/utils.ts`, clsx + tailwind-merge)으로 클래스 병합.
- `ui/` 컴포넌트는 `class-variance-authority(cva)` 패턴을 따른다 — 새 변형은 기존 cva 구조를 재사용.
- Emotion은 일부 영역에서만 사용 중. **새 컴포넌트는 Tailwind를 우선**하고 Emotion 신규 도입은 지양.
- 테마는 `next-themes`(`ThemeSwitch`/`ThemeSelector`)로 관리.

## 8. 코딩 컨벤션

- 컴포넌트: 함수형 + 명명 export. 폴더형 컴포넌트는 `index.tsx` 진입점 사용.
- 서버 컴포넌트 기본, 인터랙션/훅 필요 시에만 `"use client"`.
- 타입은 명시적으로. `any` 지양(불가피하면 주석으로 사유).
- 애니메이션은 `app/components/animations/` 의 기존 래퍼/variants 재사용.
- 주석은 한국어 허용(기존 코드 스타일 유지).

## 9. 알려진 이슈 / 주의점

> 작업 중 관련 영역을 건드리면 함께 개선을 제안할 것.

1. ✅ **(해결됨, category-enum)** 카테고리 정의 불일치 → `content-collections.ts`가 `config/post.ts`의
   `CATEGORY_LIST`를 `z.enum`으로 직접 참조한다. 새 카테고리는 `config/post.ts`만 고치면 된다.
2. ✅ **(해결됨, config-cleanup)** PostCSS 설정 중복 → `postcss.config.mjs` 제거, `postcss.config.js` 단일.
3. ✅ **(해결됨, config-cleanup)** `next.config.mjs` 플레이스홀더(`repo`/`isProd`/주석) 정리.
4. ✅ **(해결됨, next16-content-collections)** contentlayer Windows 종료버그 → contentlayer 자체를
   제거하고 `content-collections build`로 교체. 래퍼 스크립트도 함께 삭제.
5. ✅ **(해결됨, next16-content-collections)** ESLint → `eslint.config.mjs` flat config + ESLint 9.
   `next lint`는 Next 16에서 제거되어 `eslint .` 를 직접 호출한다.
6. 다수 AI 도구 룰 공존(`.cursor`, `.roo`, `.clinerules`, `.trae`, `.windsurfrules`, `.github/instructions`).
   에이전트 작업 규칙은 **이 AGENTS.md / CLAUDE.md 를 우선**한다.
7. **태그 대소문자 혼용**: 발행글에 `React`(9편)와 `react`(1편)가 섞여 있다. Linux에서는 태그
   페이지가 둘로 갈라지고, Windows에서는 `React.html`/`react.html` 파일명이 충돌해 한쪽이 덮어써진다.
   `posts/2025-06/pnpm도입기.mdx`의 `tags: ["react"]`를 `["React"]`로 고치면 해소된다.
8. **lint 경고 4건**: `react-hooks/set-state-in-effect`(ThemeSelector, BlogToolbar),
   `react-hooks/static-components`(MDXComponents). 전부 의도된 패턴이라 `eslint.config.mjs`에서
   warn으로 낮췄다. 고치려면 동작이 바뀌므로 별도 사이클로 다룰 것.
9. **`app/template.tsx`를 만들지 말 것**: Next 16.3.5 개발 모드에서는 template 파일이 존재하기만 해도
   (내용이 `<>{children}</>`여도) 초기 로드마다 `OuterLayoutRouter` key 경고가 난다. 페이지 전환 효과는
   `app/components/animations/PageTransition.tsx`(최상위 세그먼트를 key로 리마운트)에서 처리한다.

## 10. Git / PR

- 작업 브랜치: `develop`, 메인: `main`.
- 커밋 메시지는 기존 컨벤션(`perf:`, `feat:`, 한국어 설명 혼용) 유지.
- 사용자가 명시적으로 요청할 때만 commit/push 한다.
- PR은 `gh` CLI 사용.
```bash
git commit -m "feat: ..."
gh pr create --base main --title "..." --body "..."
```

---
_본 문서는 dongdev-blog 구조 분석 기반으로 작성됨. 구조 변경 시 함께 갱신할 것._

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
