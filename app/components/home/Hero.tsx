// Design Ref: §5 UI/UX, §11 — tsparticles 제거, CSS 그라디언트 경량 히어로
// 진입 애니메이션은 CSS(tailwindcss-animate). framer-motion은 SSR HTML에 opacity:0을 남겨
// 홈 LCP(h1)를 하이드레이션 뒤로 밀었다. 서버 컴포넌트라 클라이언트 JS도 없다.
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// stagger: 항목별 지연 + fill-mode-backwards(지연 동안 시작 프레임 유지 → 깜빡임 방지)
// reduced-motion이면 애니메이션 없이 바로 표시
const item =
  "animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-backwards motion-reduce:animate-none";

export default function Hero() {
  return (
    <section
      aria-label="소개"
      className="relative overflow-hidden rounded-2xl border border-border px-6 py-14 sm:py-20 text-center"
    >
      {/* 브랜드 그라디언트 배경 + 은은한 글로우 (장식, 스크린리더 무시) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-transparent" />
        <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <span
          className={`${item} inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand`}
        >
          웹개발 기록 · 메모장 겸 블로그
        </span>

        <h1
          className={`${item} delay-75 mt-5 text-3xl font-bold tracking-tight sm:text-5xl`}
        >
          DongDev <span className="text-brand">Blog</span>
        </h1>

        <p
          className={`${item} delay-150 mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base`}
        >
          실무에서 얻은 인사이트와 시행착오를 바탕으로
          <br className="hidden sm:block" /> 웹 개발에 관한 글을 기록하는 공간입니다.
        </p>

        <div className={`${item} delay-200 mt-7`}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            블로그 보러가기
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
