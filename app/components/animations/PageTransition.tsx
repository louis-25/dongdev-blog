"use client";
import { usePathname } from "next/navigation";

// 페이지 진입 애니메이션 — 기존 app/template.tsx를 대체한다.
//
// template.tsx를 쓰지 않는 이유: Next 16.3.5 개발 모드에서는 app/template.tsx가
// 존재하기만 해도(내용이 `<>{children}</>`여도) 초기 로드마다
// "Each child in a list should have a unique key prop. Check the render method of
// `OuterLayoutRouter`" 콘솔 에러가 난다. 프레임워크 쪽 문제라 템플릿을 없애고
// 같은 동작을 key 리마운트로 재현한다.
//
// key를 최상위 세그먼트로 두는 이유: 루트 template은 루트 바로 아래 세그먼트가 바뀔 때만
// 리마운트됐다(/blog → /about 은 애니메이션, /blog → /blog/글 은 유지).
// pathname 전체를 key로 쓰면 이 동작이 달라진다.
//
// framer-motion 대신 CSS(tailwindcss-animate)를 쓰는 이유: motion의 initial 값은 SSR HTML에
// `opacity:0` 인라인 스타일로 박혀서, 본문이 JS 하이드레이션이 끝날 때까지 보이지 않았다(LCP 지연).
// CSS 애니메이션은 첫 페인트와 함께 시작해 JS를 기다리지 않는다.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const segment = usePathname().split("/")[1] ?? "";
  return (
    <div
      key={segment}
      className="animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out motion-reduce:animate-none"
    >
      {children}
    </div>
  );
}
