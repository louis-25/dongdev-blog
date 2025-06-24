import { useAnimation as useFramerAnimation } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";
import { useEffect } from "react";

interface UseAnimationProps {
  isVisible?: boolean;
  onComplete?: () => void;
}

export function useAnimation({
  isVisible = true,
  onComplete,
}: UseAnimationProps = {}) {
  const controls = useFramerAnimation();

  useEffect(() => {
    if (isVisible) {
      controls
        .start("visible")
        .then(() => {
          onComplete?.();
        })
        .catch(() => {});
    } else {
      controls.start("hidden").catch(() => {});
    }
  }, [controls, isVisible, onComplete]);

  return controls;
}

export function useInViewAnimation(
  inView: boolean,
  options: UseAnimationProps = {}
) {
  return useAnimation({ ...options, isVisible: inView });
}
