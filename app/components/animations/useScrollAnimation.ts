"use client";
import { useEffect, useRef } from "react";
import { useInView, useAnimate, UseInViewOptions } from "framer-motion";

interface ScrollAnimationOptions extends Omit<UseInViewOptions, "root"> {
  delay?: number;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options.once ?? true,
    amount: options.amount ?? 0.5,
    margin: options.margin,
  });

  useEffect(() => {
    if (isInView) {
      animate(
        scope.current,
        { opacity: [0, 1], y: [50, 0] },
        { duration: 0.6, delay: options.delay ?? 0 }
      );
    }
  }, [isInView, animate, scope, options.delay]);

  return { ref, scope };
}
