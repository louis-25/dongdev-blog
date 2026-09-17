# dongdev-blog

웹개발 기록을 남기는 개인 블로그. Next.js App Router + content-collections(MDX) 기반.

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
| `pnpm build` | content-collections 생성 후 Next 빌드 |
| `pnpm start` | 프로덕션 서버 |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` (생성물 `.content-collections/generated` 필요 — `pnpm dev`/`pnpm build`를 한 번 먼저 실행) |

커밋/PR 전 `pnpm typecheck` 와 `pnpm lint` 를 통과시킬 것. GitHub Actions `CI`(`.github/workflows/ci.yml`)가 push/PR마다 같은 검사를 한다.

## 글 작성

`posts/<YYYY-MM>/<slug>.mdx` 에 작성합니다. frontmatter 필수 항목:

```yaml
---
title: 제목
date: "2026-01-01" # YYYY-MM-DD
description: 한 줄 요약 # 비우면 빌드 실패
category: library # config/post.ts 의 CATEGORY_LIST 중 하나
tags: ["React", "nextjs"] # 기존 표기(대소문자)를 따를 것 — 섞이면 빌드 실패
thumbnail: "/posts/images/cover.png" # 선택. public/ 에 없으면 빌드 실패
published: true # false 면 초안: 컬렉션에서 빠져 목록·RSS·사이트맵·직접 URL 모두 404
---
```

파일명이 URL이 되므로(`/blog/<파일명>`) 폴더가 달라도 파일명이 겹치면 빌드가 실패합니다.

## 배포

`develop` 푸시 → Vercel 프리뷰 배포 → Vercel 대시보드에서 프로덕션 승격.
`main` 자동 배포는 [vercel.json](vercel.json) 에서 의도적으로 비활성화되어 있습니다.

## 규칙

프로젝트 전체 규칙은 [AGENTS.md](AGENTS.md) 를 참조하세요.
