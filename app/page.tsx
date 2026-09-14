// Design Ref: §2.1 — 홈 서버 컴포넌트. 섹션 컴포넌트 조립만 담당 (본문은 클라이언트로 미전송)
import { allPosts } from "contentlayer/generated";
import { getCategoryTagsWithCounts } from "@/app/lib/posts";
import { usefulSites } from "@/app/data/usefulSites";
import Hero from "./components/home/Hero";
import LatestPosts, {
  type LatestPostItem,
} from "./components/home/LatestPosts";
import QuickNav from "./components/home/QuickNav";
import UsefulSites from "./components/home/UsefulSites";

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // Plan SC: FR-06 — 최신 글 6개(설명 포함). Plan SC: FR-09 — any 캐스팅 제거(정렬은 숫자 타임스탬프)
  const latestPosts: LatestPostItem[] = allPosts
    .filter((post) => post.published)
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
    .map((post) => ({
      title: post.title,
      url: post.url,
      date: post.date,
      description: post.description,
    }));

  const { categoryData } = getCategoryTagsWithCounts();

  // Design Ref: §5.1 — 중복 <main> 제거. 레이아웃(layout.tsx)의 단일 <main> 사용
  return (
    <div className="space-y-2">
      <Hero />
      <LatestPosts posts={latestPosts} />
      <QuickNav categoryData={categoryData} />
      <UsefulSites sites={usefulSites} />
    </div>
  );
}
