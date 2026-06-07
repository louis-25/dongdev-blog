---
template: report
version: 1.1
feature: config-cleanup
date: 2026-06-07
author: louis-25
project: dongdev-blog
projectVersion: 0.1.0
---

# config-cleanup Completion Report

> **Status**: Complete · **PDCA Cycle**: #3 (경량 유지보수 사이클)
> AGENTS.md에 기록된 구조적 설정/빌드 결함을 일괄 정리.

## Executive Summary

| Perspective | Content |
|-------------|---------|
| **Problem** | postcss 설정 중복, 깨진 ESLint(flat config + 미설치 dep), next.config 플레이스홀더, Windows에서 실패하는 build 스크립트 |
| **Solution** | 중복/깨진 설정 제거 + Next 14 표준 ESLint 설정 + build 스크립트 cross-platform화 + next.config 정리 |
| **Function/UX Effect** | `pnpm lint` 정상 동작(0 errors), `pnpm build`가 Windows에서 동작, 설정 혼선 제거 |
| **Core Value** | 빌드/린트 품질 게이트 복구 → 이후 사이클의 자동 검증 신뢰성 확보 |

## 변경 내역

| # | 항목 | Before | After |
|---|------|--------|-------|
| 1 | ESLint | `eslint.config.mjs`(FlatCompat, `@eslint/eslintrc` 미설치 → 실행 불가) | `.eslintrc.json` `{extends: next/core-web-vitals}` → `next lint` 정상(0 errors) |
| 2 | PostCSS | `postcss.config.js` + `postcss.config.mjs` 중복 | `.mjs` 제거(자체 deprecated 주석), `.js` 단일 유지 |
| 3 | next.config | `repo="your-repo-name"` 플레이스홀더 + 미사용 `isProd` + 주석 cruft | 활성 설정만(reactStrictMode, swcMinify) |
| 4 | build 스크립트 | `"build": "contentlayer build && next build"`(Windows 종료버그) | `"build": "tsx scripts/contentlayer-build.ts && next build"`(cross-platform), 중복 `build:contentlayer` 제거 |

## 검증

| 항목 | 결과 |
|------|------|
| `next lint` | ✅ "No ESLint warnings or errors" (exit 0) — 기존 깨짐 해소 |
| `pnpm typecheck` | ✅ exit 0 |
| dev 렌더 `/`, `/blog` | ✅ 200 (postcss/스타일 파이프라인 정상) |
| CI 영향 | 없음 (preview.yml은 `vercel build` 사용, 로컬 build 스크립트와 무관) |

## 잔여/다음

- 카테고리 enum 불일치(contentlayer 3종 vs config 6종)는 별도 사이클(category-enum)에서 처리
- full `pnpm build`는 dev 서버 종료 후 1회 실행 권장(이제 Windows-safe)

## Changelog

**Changed:** `next.config.mjs`(정리), `package.json`(build 스크립트)
**Added:** `.eslintrc.json`
**Removed:** `postcss.config.mjs`, `eslint.config.mjs`

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-06-07 | config-cleanup 완료 |
