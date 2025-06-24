"use client";

import {
  motion,
  type TargetAndTransition,
  type HTMLMotionProps,
} from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface InteractiveProps {
  children: ReactNode;
  className?: string;
}

type InteractiveButtonProps = Omit<
  HTMLMotionProps<"button">,
  keyof InteractiveProps
> &
  InteractiveProps;

interface InteractiveLinkProps extends InteractiveProps {
  href: string;
}

const hoverScale: TargetAndTransition = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
};

const tapScale: TargetAndTransition = {
  scale: 0.95,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
};

export function InteractiveButton({
  children,
  className = "",
  ...props
}: InteractiveButtonProps) {
  return (
    <motion.button
      className={className}
      whileHover={hoverScale}
      whileTap={tapScale}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function InteractiveLink({
  children,
  href,
  className = "",
}: InteractiveLinkProps) {
  return (
    <Link href={href} passHref>
      <motion.div
        className={className}
        whileHover={hoverScale}
        whileTap={tapScale}
      >
        {children}
      </motion.div>
    </Link>
  );
}
