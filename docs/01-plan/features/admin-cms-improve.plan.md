# admin-cms-improve — `/admin`(Sveltia CMS) 개선 계획

> 작성: 2026-09-21 · Claude(코디네이터) + Codex(독립 리뷰 2라운드, Orca run `run_14f51c4b6427`)
> 대상: `public/admin/{index.html,config.yml}` 와 그 계약 상대(`content-collections.ts`, `AGENTS.md §9-1`)
> 상태: **#1~#12 구현 완료(2026-09-21, 미커밋)**. build·typecheck·lint 통과, config.yml은 0.213.4 스키마 검증 통과,
> 두 초안 게이트(중복 슬러그·썸네일)는 임시 파일로 실패를 확인. **남은 것: 폰 실기기 1회 확인**(§2 검증 둘째 줄).
> 원칙: 1인·폰 우선 블로그. 새 의존성 0, 새 파일 0을 목표로 한다.

## 1. 확인된 사실 (둘 다 검증)

| # | 사실 | 근거 |
|---|------|------|
| F1 | 발행 상태(`published: true`)의 테스트 글이 남아 목록·RSS·sitemap에 노출된다 | `posts/2026-09/글-작성-테스트.mdx:9` |
| F2 | 기존 글의 `blog` 태그가 CMS options에 없다 → CMS로 그 글을 열어 저장하면 태그가 유실될 수 있다 | `posts/hello-world.mdx:6` ↔ `config.yml:57-67` |
| F3 | AGENTS §9-1이 "인증 서버 없음 / `auth_methods: [token]`"이라 적지만 실제는 OAuth Worker + `[oauth, token]` | `AGENTS.md:190-201` ↔ `config.yml:11-16` |
| F4 | unpkg 스크립트에 SRI 없음. 0.213.4의 sha384는 양쪽이 각자 계산해 일치 | `index.html:16` |
| F5 | 슬러그 중복·썸네일 존재 검사가 초안에는 적용되지 않는다(초안은 `transform`에서 skip → `onSuccess`가 못 봄). 발행 버튼을 누르는 순간에야 빌드가 깨진다 | `content-collections.ts:139,141-149,197-205` |
| F6 | 고정 태그 select는 폰에서 새 태그를 쓸 수 없게 만든다(config.yml은 CMS 안에서 못 고침) | `config.yml:50-67` |
| F7 | 추천 옵션은 전부 0.213.4 JSON Schema에 존재 확인: `commit_messages`, `view_filters`, `summary`, `editor.preview`, datetime `default`, image `choose_url` | unpkg schema |

## 2. 실행 계획

### P0 — 한 커밋, 전부 S
1. **테스트 글 삭제** (F1): `posts/2026-09/글-작성-테스트.mdx` + 같이 올라간 이미지.
2. **AGENTS §9-1 정정** (F3): OAuth 기본 + token 비상용, Worker `ALLOWED_DOMAINS`, 토큰 revoke 절차 4~5줄.
3. **SRI 추가** (F4): `integrity="sha384-+8RqGMj37Dk0jEygUTA0V4kuL33YKjEWS4c84G8OqXQZY6ceSHa/EbKkIhL4zIcT" crossorigin="anonymous"`.
   버전 올릴 때 해시도 갱신해야 한다는 주석을 같은 줄 위에 남긴다.
4. **태그를 자유 입력으로** (F2·F6): `widget: select` → `widget: list`(문자열 리스트). options 목록 삭제.
   대소문자 충돌은 기존 `onSuccess` 가드(`content-collections.ts:206-213`)가 계속 막는다.
   → F2가 저절로 해소되고, **config↔글 태그 동기화 검증기 자체가 필요 없어진다**(YAML 파서 의존성도 불필요).

### P1 — 폰 작성 UX, 전부 S (`config.yml`만 수정)
5. `date`에 `default: "{{now}}"`.
6. `backend.commit_messages`: `create/update/delete: "post: {{slug}}"`, `uploadMedia: "post(media): {{path}}"` — 기본 `Create 글 "…" +1` 대체.
7. `view_filters`에 발행/초안 필터, `summary`에 날짜 + 초안 표시(템플릿은 실제 UI에서 1회 확인).
8. 컬렉션 `editor: { preview: false }` — 미리보기 패널은 `<Alert>`·MDX를 못 그려 폰 화면만 차지한다. 최종 확인은 Vercel preview.
9. `body.hint`에 복붙용 스니펫: `<Alert type="warning">…</Alert>`(type은 info/warning/error/success), 이미지 경로 규칙.
10. `thumbnail`에 `choose_url: false` — 외부 URL은 어차피 썸네일 존재 검사에서 빌드 실패한다.

### P1 — 초안도 빌드 게이트에 (F5), `content-collections.ts`만 수정
11. 썸네일 존재 검사를 draft skip(139행) **위로** 이동 (줄 이동 1건).
12. 슬러그 중복 검사를 초안 포함으로: 모듈 최상단에서 `readdirSync("posts", { recursive: true })`로 `.mdx` basename을 모아
    소문자 기준 중복이면 throw(~8줄). `pnpm build`·Vercel·CI·watch 모두 같은 경로를 타므로 CI step·package.json 수정이 없다.
    기존 `onSuccess`의 슬러그 검사는 이걸로 대체하고 삭제.

### 검증
- `pnpm build && pnpm typecheck && pnpm lint`.
- 폰에서 1회: 로그인 → 초안 생성(새 태그 + 이미지 + `<Alert>`) → 저장 → 재열기(본문 원형 유지) → Vercel preview 확인 → 삭제. 커밋 메시지 형식 확인.

## 3. 하지 않는 것 (합의된 YAGNI)

| 안 | 이유 | 다시 볼 조건 |
|----|------|-------------|
| CMS↔Zod 필드 패리티 검증 스크립트 + `yaml` devDependency | 태그를 자유 입력으로 바꾸면 남는 drift는 category뿐이고, 그건 Zod enum이 빌드에서 시끄럽게 실패한다 | 컬렉션/필드가 늘어날 때 |
| CSP (Report-Only 포함) | 리포트 수집처도 읽을 사람도 없고, 잘못 걸면 OAuth 로그인만 깨진다 | 관측 체계가 생기면 |
| Editorial Workflow (`publish_mode`) | 1인 운영에 PR 단계만 추가. 현 develop→preview→수동 승격이 이미 같은 역할 | 공동 저자가 생기면 |
| `skip_ci` | preview·CI가 발행 안전망이다 | — |
| 본문 rich text 모드 | raw `<img>`·`<Alert>` 왕복 안전성 미증명 | — |
| Sveltia self-host / npm 편입 | 버전 고정 + SRI로 충분 | unpkg 신뢰 문제가 생기면 |
| `preview_path` → 프로덕션 링크 | 초안은 프로덕션에 없어 404로 오해를 준다 | — |
| description 공백 가드(`.trim()`) | 발생 이력 없음 | 한 번이라도 발생하면 (P2) |
| 0.213.4 → 0.217.0 업그레이드 | 필요한 옵션이 전부 현 버전에 있다 | 버그/보안 수정이 필요할 때 (SRI 해시 동시 갱신) |
| OAuth Worker 정기 감사 | 1인 운영 | Worker 설정·권한을 바꿀 때 |

## 4. Claude ↔ Codex 논의 기록

| 쟁점 | Codex 1차 | Claude 반론 | 결론 |
|------|-----------|-------------|------|
| 태그 검증 방향 | 사용 태그 == options | 부분집합이어야 함(옵션 선등록이 CI를 깨뜨림) | Codex 동의 → 이후 R5로 검증 자체가 소멸 |
| 검증기 범위 | 필드·타입·required까지 4종, 노력 M | 1인 블로그엔 과함, S로 축소 | Codex 동의 |
| 검증 위치 | 새 스크립트 + CI step | `onSuccess`에 넣자 | Codex 반대(초안이 안 보임) — 타당. 최종안은 Claude 절충: 모듈 최상단 파일 스캔(#12) |
| 고정 태그 vs 자유 입력 | (언급 없음) | 폰에서 새 태그 불가 | Codex: 폰 우선이면 자유 입력 권장. 오타 태그는 사후 정리로 수용 |
| `editor.preview` | true 유지 | MDX를 못 그리니 끄자 | Codex 철회, false 채택 |
| description 공백 가드 | P0 | P2 이하 | Codex 동의 |
| CSP | Report-Only 후 enforce | 전면 보류 | Codex 동의 |
| YAML 파서 가용성 | — | 기존 의존성으로 되나? | Codex 실측: `yaml`·`js-yaml` 모두 루트에서 resolve 불가 → 의존성 없는 설계로 선회 |

## 5. 결정 필요 (기본값 있음)
- **#4 태그 자유 입력**: 기본값 = 채택. 고정 목록을 유지하고 싶다면 `blog`만 options에 추가하고 #4를 뺀다(이 경우 F6은 남는다).
