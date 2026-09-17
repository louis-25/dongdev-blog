"use client";

import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import { copyText } from "@/app/lib/utils";

export interface CopyButtonProps {
  // 클릭 시점에 읽는다 — 하이라이트된 <pre>의 textContent처럼 렌더 후에야 정해지는 값
  getValue: () => string;
}

export function CopyButton({ getValue }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    setStatus((await copyText(getValue())) ? "copied" : "failed");
    setTimeout(() => setStatus("idle"), 2000);
  };

  const label =
    status === "copied" ? "복사됨" : status === "failed" ? "복사 실패" : "코드 복사";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      data-copied={status === "copied"}
      className="copy-button"
    >
      {status === "copied" ? (
        <Check className="h-4 w-4" />
      ) : status === "failed" ? (
        <X className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {/* 아이콘만으로는 복사됐는지 알기 어려워 잠깐 문구를 함께 보여준다 (스크린리더에도 같은 문구를 알림) */}
      <span aria-live="polite" className="text-xs empty:hidden">
        {status === "idle" ? "" : label}
      </span>
    </button>
  );
}
