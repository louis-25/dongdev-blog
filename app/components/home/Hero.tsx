"use client";

// Design Ref: §5 UI/UX, §11 — tsparticles 제거, CSS 그라디언트 + framer-motion 경량 히어로
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  // Design Ref: §1.2 접근성 내장 — reduced-motion 시 이동 없이 페이드만
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-2xl"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
        >
          웹개발 기록 · 메모장 겸 블로그
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl"
        >
          DongDev <span className="text-brand">Blog</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          실무에서 얻은 인사이트와 시행착오를 바탕으로
          <br className="hidden sm:block" /> 웹 개발에 관한 글을 기록하는 공간입니다.
        </motion.p>

        <motion.div variants={item} className="mt-7">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            블로그 보러가기
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
