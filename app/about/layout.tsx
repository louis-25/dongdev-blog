import { pageMetadata } from "@/app/lib/metadata";
import { AboutTabs } from "./AboutTabs";

export const metadata = pageMetadata({
  title: "소개",
  description: "DongDev의 경력과 사용 기술을 소개합니다.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Design Ref: layout의 단일 <main> 사용 — 페이지는 <div>로 (랜드마크 중복 제거)
    <div className="flex min-h-screen flex-col items-center">
      <article className="w-full max-w-4xl">
        {/* 탭 UI라 눈에 보이는 제목은 없지만 페이지 주제를 스크린리더·검색엔진에 알린다 */}
        <h1 className="sr-only">소개</h1>
        <AboutTabs />
        {children}
      </article>
    </div>
  );
}
