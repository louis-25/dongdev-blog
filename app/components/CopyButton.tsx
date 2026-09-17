"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export interface CopyButtonProps {
  // 클릭 시점에 읽는다 — 하이라이트된 <pre>의 textContent처럼 렌더 후에야 정해지는 값
  getValue: () => string;
}

export function CopyButton({ getValue }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(getValue());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "복사됨" : "코드 복사"}
      data-copied={copied}
      className="copy-button"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
