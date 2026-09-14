# dongdev-blog

웹개발 기록을 남기는 개인 블로그. Next.js App Router + Contentlayer(MDX) 기반.

## 개발

```bash
pnpm install
pnpm dev
```

`pnpm` 전용입니다 (`packageManager: pnpm@10.17.1`). npm/yarn/bun 은 사용하지 않습니다.

## 스크립트

| 명령 | 설명 |
| --- | --- |
| `pnpm dev` | 개발 서버 |
| `pnpm build` | Contentlayer 생성 후 Next 빌드 |
| `pnpm start` | 프로덕션 서버 |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |

커밋/PR 전 `pnpm typecheck` 와 `pnpm lint` 를 통과시킬 것.

## 글 작성

`posts/<YYYY-MM>/<slug>.mdx` 에 작성합니다. frontmatter 필수 항목:

```yaml
---
title: 제목
date: 2026-01-01
description: 한 줄 요약
category: library # config/post.ts 의 CATEGORY_LIST 중 하나
tags: [react, nextjs]
published: true # false 면 목록·RSS·사이트맵·직접 URL 모두에서 제외
---
```

## 배포

`develop` 푸시 → Vercel 프리뷰 배포 → Vercel 대시보드에서 프로덕션 승격.
`main` 자동 배포는 [vercel.json](vercel.json) 에서 의도적으로 비활성화되어 있습니다.

## 규칙

프로젝트 전체 규칙은 [AGENTS.md](AGENTS.md) 를 참조하세요.
