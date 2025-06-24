"use client";
import { ReactNode } from "react";
import { useScrollAnimation } from "./useScrollAnimation";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  amount?: "some" | "all" | number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  delay,
  amount,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const { ref, scope } = useScrollAnimation({
    delay,
    amount,
    once,
  });

  return (
    <div ref={ref} className={className}>
      <div ref={scope} className="opacity-0">
        {children}
      </div>
    </div>
  );
}
