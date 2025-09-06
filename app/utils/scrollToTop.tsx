"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 페이지 이동 시 상단으로 자연스럽게 스크롤
    // pathname 또는 검색 파라미터 변경 시 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, searchParams]);

  return null;
}
