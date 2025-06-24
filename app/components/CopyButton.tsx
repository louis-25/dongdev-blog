"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <button
      className="copy-button"
      onClick={copyToClipboard}
      data-copied={copied}
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
