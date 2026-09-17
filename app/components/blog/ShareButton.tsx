"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

// 모바일은 네이티브 공유 시트, 미지원 브라우저(대부분의 데스크톱)는 링크 복사로 대체
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      // 사용자가 공유 시트를 닫으면 AbortError로 reject된다 — 실패가 아니므로 무시
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "링크 복사됨" : "공유하기"}
    </button>
  );
}
