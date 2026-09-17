"use client";

import { useState } from "react";
import { Check, Share2, X } from "lucide-react";
import { copyText } from "@/app/lib/utils";

// 모바일은 네이티브 공유 시트, 미지원 브라우저(대부분의 데스크톱)는 링크 복사로 대체
export function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        // 사용자가 공유 시트를 닫은 것은 실패가 아니다. 그 외 오류는 복사로 넘어간다.
        if ((error as Error)?.name === "AbortError") return;
      }
    }

    setStatus((await copyText(url)) ? "copied" : "failed");
    setTimeout(() => setStatus("idle"), 2000);
  };

  const label =
    status === "copied"
      ? "링크 복사됨"
      : status === "failed"
      ? "복사 실패"
      : "공유하기";

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
    >
      {status === "copied" ? (
        <Check className="h-4 w-4" />
      ) : status === "failed" ? (
        <X className="h-4 w-4" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
      <span aria-live="polite">{label}</span>
    </button>
  );
}
