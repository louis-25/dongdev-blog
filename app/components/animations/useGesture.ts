"use client";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";

interface GestureConfig {
  swipeThreshold?: number;
  dragElastic?: number;
  dragMomentum?: boolean;
}

export const useGesture = (config: GestureConfig = {}) => {
  const controls = useAnimation();
  const {
    swipeThreshold = 50,
    dragElastic = 0.5,
    dragMomentum = true,
  } = config;

  useEffect(() => {
    controls.start({ scale: 1, opacity: 1 });
  }, [controls]);

  const gestureProps = {
    drag: true,
    dragElastic,
    dragMomentum,
    initial: { scale: 1, opacity: 1 },
    whileDrag: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    onDragEnd: (event: any, info: any) => {
      const offset = info.offset.x;
      const velocity = info.velocity.x;

      if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 500) {
        const direction = offset > 0 ? 1 : -1;
        controls.start({
          x: direction * 200,
          opacity: 0,
          transition: { duration: 0.3 },
        });
      } else {
        controls.start({
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        });
      }
    },
  };

  return { controls, gestureProps };
};
