import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useAnimation } from "./useAnimation";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  isVisible?: boolean;
}

export default function StaggerContainer({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  isVisible = true,
}: StaggerContainerProps) {
  const controls = useAnimation({ isVisible });

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
