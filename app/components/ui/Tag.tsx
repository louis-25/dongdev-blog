"use client";

import { TechKey, TECHS } from "@/app/utils/SkillPicker";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TagProps {
  name: string;
  count?: number;
  className?: string;
  isSelected?: boolean;
  isClickable?: boolean;
  href?: string;
}

export function Tag({
  name,
  count,
  className = "",
  isSelected = false,
  isClickable = true,
  href,
}: TagProps) {
  const router = useRouter();
  const lowerName = name.toLowerCase().replace(".", "");
  const tech = TECHS[lowerName as TechKey];
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        if (!isClickable) return;
        e.preventDefault();
        e.stopPropagation();
        router.push(href ?? `/tags/${name}`);
      }}
      className={`inline-flex items-center px-3 py-1 ${
        isClickable ? "cursor-pointer" : "cursor-default"
      } rounded-full text-sm transition-colors ${
        isSelected
          ? "bg-brand/15 text-brand hover:bg-brand/25"
          : "bg-muted text-muted-foreground hover:bg-muted/70"
      } ${className}`}
    >
      {tech?.Icon && <tech.Icon className="w-4 h-4 mr-2" />}
      {/* {name} */}
      {tech?.label || name}
      {count !== undefined && (
        <span className="ml-2 text-xs opacity-70">({count})</span>
      )}
    </motion.span>
  );
}
