"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { slideInVariants } from "./variants";
import { useAnimation } from "./useAnimation";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  isVisible?: boolean;
}

export default function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.5,
  className = "",
  isVisible = true,
}: SlideInProps) {
  const controls = useAnimation({ isVisible });

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={slideInVariants}
      custom={direction}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
