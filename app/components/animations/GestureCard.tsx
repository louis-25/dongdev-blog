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
    swipeThreshold: 100,
    dragElastic: 0.7,
  });

  return (
    <motion.div
      className={`relative cursor-grab active:cursor-grabbing touch-none ${className}`}
      animate={controls}
      {...gestureProps}
    >
      {children}
    </motion.div>
  );
};
