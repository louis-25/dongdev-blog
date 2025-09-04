"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TagProps {
  name: string;
  count?: number;
  className?: string;
  isSelected?: boolean;
}

export function Tag({
  name,
  count,
  className = "",
  isSelected = false,
}: TagProps) {
  const router = useRouter();
  return (
    // <Link href={`/tags/${name}`}>
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/tags/${name}`);
      }}
      className={`inline-flex items-center px-3 py-1 cursor-pointer rounded-full text-sm ${
        isSelected
          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      } hover:bg-opacity-90 transition-colors ${className}`}
    >
      {name}
      {count !== undefined && (
        <span className="ml-2 text-xs opacity-70">({count})</span>
      )}
    </motion.span>
    // </Link>
  );
}
