# AGENTS.md — dongdev-blog

> AI 에이전트(Claude Code 등)를 위한 프로젝트 작업 가이드.
> 코드를 수정하기 전에 이 문서를 먼저 읽고, 아래 규칙과 구조를 따른다.

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 유형 | 개인 기술 블로그 (정적 콘텐츠 중심) |
| 프레임워크 | Next.js 14.1.3 (App Router) |
| 언어 | TypeScript 5 / React 18.2 |
| 콘텐츠 | Contentlayer 0.3.4 + MDX |
| 스타일 | Tailwind CSS v4 + Emotion + Radix UI (shadcn 스타일) |
| 애니메이션 | framer-motion 12 |
| 패키지 매니저 | **pnpm 10.17** (npm/yarn 사용 금지) |
| 배포 | Vercel (주) / GitHub Pages (`deploy:gh` 대체) |

## 2. 필수 명령어

```bash
pnpm install          # 의존성 설치 (postinstall로 patch-package 실행)
pnpm dev              # 개발 서버
pnpm build            # contentlayer build + next build
pnpm build:contentlayer  # tsx 래퍼로 contentlayer 빌드 후 next build (Windows 안전)
pnpm lint             # next lint (eslint 8)
pnpm typecheck        # tsc --noEmit
pnpm deploy:gh        # gh-pages 브랜치로 정적 배포
```

> **커밋/PR 전 반드시** `pnpm typecheck` 와 `pnpm lint` 를 통과시킬 것.

## 3. 디렉터리 구조

```
dongdev-blog/
├─ app/                        # Next.js App Router 루트
│  ├─ page.tsx                 # 홈
│  ├─ layout.tsx / template.tsx# 전역 레이아웃 / 트랜지션 래퍼
│  ├─ not-found.tsx
│  ├─ about/                   # 이력·경력 페이지
│  ├─ blog/                    # 글 목록
│  │  └─ [slug]/               # 글 상세 (동적)
│  ├─ category/[category]/     # 카테고리별 목록
│  ├─ tags/ + tags/[tag]/      # 태그 인덱스 / 태그별 목록
│  ├─ api/
│  │  ├─ feed/route.ts         # RSS 피드 (feed 라이브러리)
│  │  └─ og/route.tsx          # 동적 OG 이미지
│  ├─ components/
│  │  ├─ ui/                   # Radix 기반 프리미티브 (button, dialog, tabs ...)
│  │  ├─ animations/           # framer-motion 래퍼 + 훅
│  │  ├─ mdx/                  # MDX 전용 (CodeBlock, Alert, MdxImage)
│  │  └─ *.tsx                 # Navigation, SearchBar, Toc, ThemeSwitch 등
│  ├─ data/                    # 경력/프로젝트 정적 데이터 (career, projects, useAbout)
│  ├─ lib/                     # posts.ts(서버 데이터), utils.ts
│  └─ utils/                   # IconPicker, SkillPicker, scrollToTop
├─ posts/                      # MDX 글 원본 (YYYY-MM/ 폴더 구조)
├─ config/post.ts             # 카테고리 상수
├─ contentlayer.config.ts     # 콘텐츠 스키마 + remark/rehype 파이프라인
├─ scripts/contentlayer-build.ts  # Windows-safe contentlayer 빌드 래퍼
├─ public/                     # 정적 자산 (icons, posts/images, favicon)
└─ next.config.mjs            # withContentlayer 래핑
```

## 4. 콘텐츠 파이프라인 (Contentlayer)

- 원본: `posts/**/*.mdx` → 빌드 시 `contentlayer/generated`(= `.contentlayer/generated`)로 변환.
- `Post` 도큐먼트 **필수 frontmatter**: `title`, `date`, `description`, `category`, `published`.
  선택: `thumbnail`, `tags`.
- **computed 필드**: `url`(`/blog/{파일명}`), `formattedDate`, `slugAsParams`.
  - URL/슬러그는 **파일명만** 사용한다(폴더 경로 제외). 따라서 파일명은 전역에서 유일해야 한다.
- rehype/remark 체인: `remark-gemoji`, `rehype-pretty-code`(shiki, `dark-plus` 테마), `rehype-slug`,
  `rehype-autolink-headings`, `rehype-toc` → **커스텀 플러그인 `rehypeWrapTocWithDetails`** 로 TOC를 `<details>` 토글로 감쌈.

### 새 글 추가 절차
1. `posts/YYYY-MM/<유일한-파일명>.mdx` 생성.
2. frontmatter에 필수 필드 작성, `published: true` 설정.
3. 이미지는 `public/posts/images/` 에 두고 `/posts/images/...` 로 참조.
4. `pnpm dev` 또는 `pnpm build` 로 contentlayer 재생성 확인.

## 5. 경로 별칭 (tsconfig paths)

```
@/*                    → ./*
@/ui/*                 → ./app/components/ui/*
contentlayer/generated → ./.contentlayer/generated
```
상대경로(`../../`) 대신 별칭을 사용한다.

## 6. 서버/클라이언트 경계 규칙 (중요)

- **`allPosts`(전체 MDX 본문 포함)는 서버 컴포넌트/서버 모듈에서만 import** 한다.
- 클라이언트로는 `app/lib/posts.ts` 의 경량 함수만 전달한다:
  - `getSearchIndex()` → 검색용 최소 필드(`title, description, url, tags`)
  - `getCategoryTagsWithCounts()` → 카테고리/태그 집계
- 클라이언트 컴포넌트(`"use client"`)에서 `contentlayer/generated` 를 직접 import하지 말 것.
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

1. **카테고리 정의 불일치**: `config/post.ts`는 6종(`library, style, devops, framework, language, ai`)이지만
   `contentlayer.config.ts`의 `category` enum은 3종(`library, framework, language`)만 허용한다.
   새 카테고리의 글을 추가하려면 **enum도 함께 갱신**해야 빌드가 통과한다. (예: `hello-world.mdx`는 category 누락으로 빌드 시 스킵됨)
2. ✅ **(해결됨, config-cleanup)** PostCSS 설정 중복 → `postcss.config.mjs` 제거, `postcss.config.js` 단일.
3. ✅ **(해결됨, config-cleanup)** `next.config.mjs` 플레이스홀더(`repo`/`isProd`/주석) 정리.
4. ✅ **(해결됨, config-cleanup)** `build` 스크립트가 Windows에서 contentlayer 종료버그로 실패 → `build`를 `tsx scripts/contentlayer-build.ts && next build`로 통일(cross-platform). CI는 `vercel build` 사용으로 무관. `scripts/contentlayer-build.ts`는 Windows 종료버그 우회용으로 exit 0 유지(실 빌드 게이트는 후속 `next build`).
5. ✅ **(해결됨, config-cleanup)** ESLint flat config(`eslint.config.mjs` + 미설치 `@eslint/eslintrc`)가 깨져 있던 문제 → `.eslintrc.json`(`next/core-web-vitals`)로 교체, `pnpm lint` 정상.
6. 다수 AI 도구 룰 공존(`.cursor`, `.roo`, `.clinerules`, `.trae`, `.windsurfrules`, `.github/instructions`).
   에이전트 작업 규칙은 **이 AGENTS.md / CLAUDE.md 를 우선**한다.

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
