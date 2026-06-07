// Design Ref: §3 Data Model — 홈 "유용한 사이트" 데이터를 뷰에서 분리
export interface UsefulSite {
  name: string;
  url: string;
  desc: string;
}

export const usefulSites: UsefulSite[] = [
  {
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org/",
    desc: "웹 표준/브라우저 API 참고서",
  },
  {
    name: "Next.js Docs",
    url: "https://nextjs.org/docs",
    desc: "Next.js 공식 문서",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    desc: "유틸리티-우선 CSS 프레임워크",
  },
  {
    name: "Framer Motion Examples",
    url: "https://framermotionexamples.com/",
    desc: "React 애니메이션 라이브러리",
  },
  {
    name: "Can I use",
    url: "https://caniuse.com/",
    desc: "브라우저 지원 현황",
  },
  {
    name: "Design Patterns",
    url: "https://patterns-dev-kr.github.io/",
    desc: "디자인 패턴 예제",
  },
];
