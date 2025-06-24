"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeInVariants } from "./variants";
import { useAnimation } from "./useAnimation";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  isVisible?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  isVisible = true,
}: FadeInProps) {
  const controls = useAnimation({ isVisible });

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
