✅ 기능 우선순위표
| 우선순위 | 기능 | 설명 |
| ------------- | ---------------------------------------- | --------------- |
| 🟢 필수 (MVP) | MDX + Git 기반 Contentlayer | 콘텐츠 작성 및 타입 안정성 |
| 🟢 필수 (MVP) | pnpm + Next.js (App Router) + TypeScript | 기반 프레임워크 |
| 🟢 필수 (MVP) | Tailwind CSS + shadcn/ui | 빠른 UI 구성 |
| 🟢 필수 (MVP) | SSR + SSG 혼합 전략 + RSC | 렌더링 전략 |
| 🟢 필수 (MVP) | Framer Motion (기본 전환 애니메이션) | 페이지 전환, fade, slide 등 기본 수준
| 🟢 필수 (MVP) | 코드 하이라이트 + 복사 버튼 | 개발 블로그 필수 UX |
| 🟢 필수 (MVP) | 다크모드 (토글 기반) | 기본 UX 기대치 만족 |
| 🟢 필수 (MVP) | Vercel 배포 + PR Preview | CI/CD 워크플로우 정착 |
| 🟡 권장 (1차 확장) | RSS 피드 생성 (`next-feed`) | 구독자 확보 |
| 🟡 권장 (1차 확장) | 동적 OG 이미지 생성 (@vercel/og) | 공유 최적화 |
| 🟡 권장 (1차 확장) | 목차(TOC) + heading 링크 | 긴 글 읽기 편의 |
| 🟡 권장 (1차 확장) | 검색 기능 (Lunr, FlexSearch 등) | UX 강화 |
| 🟡 권장 (1차 확장) | MDX 확장 컴포넌트 | 유튜브, 알림 박스 등 |
| 🔵 후속 (2차 확장) | 댓글 기능 (Giscus 등) | 커뮤니케이션 기능 |
| 🔵 후속 (2차 확장) | 통계/조회수 | 피드백 수단 |
| 🔵 후속 (2차 확장) | PWA, 오프라인 캐시 | 앱 수준 UX |

1. 목표
   프론트엔드 개발자 개인 블로그로서 빠른 배포, 타입 안정성, 개발자 중심 콘텐츠 작성을 가능한 최소 기능으로 실현.

2. 사용 스택
   프레임워크: Next.js (App Router) + RSC

   언어: TypeScript

   스타일: Tailwind CSS + shadcn/ui

   콘텐츠 관리: MDX + Contentlayer + Git

   패키지 매니저: pnpm

   배포: Vercel (Edge Function, PR Preview 포함)

   애니메이션 Framer Motion

3. 필수 기능
   구분 내용
   페이지 /, /blog/[slug], /tags/[tag], /about, 404
   콘텐츠 Git 기반 작성, MDX 포스트, 태그 분류
   렌더링 혼합 SSR/SSG 전략, React Server Components
   SEO 기본 메타 태그, title/description 동적 구성
   UI/UX 다크모드, 코드 하이라이트 + 복사 버튼
   애니메이션 없음 (Framer Motion은 MVP 제외)
   이미지 Lazy Load + next/image 기본 사용
   테스트/검사 Type check + ESLint + Prettier (CI 연동 시 Husky)

4. 배포 워크플로우
   GitHub + Vercel PR Preview 자동화

5. 참고사항
   pnpm dlx shadcn@latest init 명령어로 프로젝트 기본 세팅해둔 상태

MDX 파일 변경 시 Contentlayer로 자동 빌드 반영
