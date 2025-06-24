"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { scaleInVariants } from "./variants";
import { useAnimation } from "./useAnimation";

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  isVisible?: boolean;
}

export default function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  isVisible = true,
}: ScaleInProps) {
  const controls = useAnimation({ isVisible });

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={scaleInVariants}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1], // cubic-bezier easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
