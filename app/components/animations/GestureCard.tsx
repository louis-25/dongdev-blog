"use client";
import { motion } from "framer-motion";
import { useGesture } from "./useGesture";
import { ReactNode } from "react";

interface GestureCardProps {
  children: ReactNode;
  className?: string;
  onSwipe?: (direction: "left" | "right") => void;
}

export const GestureCard = ({
  children,
  className = "",
  onSwipe,
}: GestureCardProps) => {
  const { controls, gestureProps } = useGesture({
    // swipeThreshold: 100,
    // dragElastic: 0.7,
  });

  return (
    <motion.div
      className={`relative active:cursor-grabbing touch-none transform-gpu will-change-transform ${className}`}
      animate={controls}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.2 }}
      // {...gestureProps}
    >
      {children}
    </motion.div>
  );
};
