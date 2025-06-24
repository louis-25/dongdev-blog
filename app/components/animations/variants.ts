import { Variants } from "framer-motion";

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideInVariants: Variants = {
  hidden: (direction: "left" | "right" | "up" | "down") => {
    const offsets = {
      left: { x: -50, y: 0 },
      right: { x: 50, y: 0 },
      up: { x: 0, y: -50 },
      down: { x: 0, y: 50 },
    };
    return {
      opacity: 0,
      x: offsets[direction].x,
      y: offsets[direction].y,
    };
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const staggerChildrenVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};
