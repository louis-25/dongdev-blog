import { TechKey, TECHS } from "@/app/utils/SkillPicker";
import Link from "next/link";

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
  const lowerName = name.toLowerCase().replace(".", "");
  const tech = TECHS[lowerName as TechKey];
  const classes = `inline-flex items-center px-3 py-1 rounded-full text-sm transition-[color,background-color,transform] ${
    isClickable
      ? "cursor-pointer hover:scale-105 active:scale-95 motion-reduce:transform-none"
      : "cursor-default"
  } ${
    isSelected
      ? "bg-brand/15 text-brand hover:bg-brand/25"
      : "bg-muted text-muted-foreground hover:bg-muted/70"
  } ${className}`;
  const content = (
    <>
      {tech?.Icon && <tech.Icon className="w-4 h-4 mr-2" />}
      {tech?.label || name}
      {count !== undefined && (
        <span className="ml-2 text-xs opacity-70">({count})</span>
      )}
    </>
  );

  // 클릭 가능한 태그는 진짜 <a>로 렌더한다: 크롤러가 태그 페이지를 내부 링크로 발견하고
  // 키보드(Tab/Enter)·스크린리더로도 이동할 수 있다.
  if (!isClickable) return <span className={classes}>{content}</span>;
  return (
    <Link
      href={href ?? `/tags/${encodeURIComponent(name)}`}
      className={classes}
      aria-current={isSelected ? "true" : undefined}
    >
      {content}
    </Link>
  );
}
