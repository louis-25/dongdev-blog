"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Flag,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { cn } from "@/app/lib/utils";
import { TechKey } from "@/app/utils/SkillPicker";
import { TagList } from "../TagList";

export type TimelineIconType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "milestone";

export interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  icon?: TimelineIconType;
  skills?: TechKey[];
  /** 우측에 렌더될 세부 항목(아코디언). 없으면 표시하지 않음 */
  details?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItemProps[];
  className?: string; // 컨테이너 css 클래스
  /** 마지막 아이템 아래 라인을 끊을지 여부 (기본값: true) */
  cutLineAtEnd?: boolean;
}

/** 아이콘 매핑 */
const ICON_MAP: Record<TimelineIconType, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  milestone: Flag,
};

/** 색상 매핑 (라이트/다크 대응) */
const STYLE_MAP: Record<
  TimelineIconType,
  { dot: string; text: string; ring: string; line: string }
> = {
  info: {
    dot: "bg-blue-500",
    text: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    ring: "ring-blue-100 dark:ring-blue-900/40",
    line: "bg-gray-200 dark:bg-gray-700",
  },
  success: {
    dot: "bg-emerald-500",
    text: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    ring: "ring-emerald-100 dark:ring-emerald-900/40",
    line: "bg-gray-200 dark:bg-gray-700",
  },
  warning: {
    dot: "bg-amber-500",
    text: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    ring: "ring-amber-100 dark:ring-amber-900/40",
    line: "bg-gray-200 dark:bg-gray-700",
  },
  error: {
    dot: "bg-rose-500",
    text: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    ring: "ring-rose-100 dark:ring-rose-900/40",
    line: "bg-gray-200 dark:bg-gray-700",
  },
  milestone: {
    dot: "bg-violet-500",
    text: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    ring: "ring-violet-100 dark:ring-violet-900/40",
    line: "bg-gray-200 dark:bg-gray-700",
  },
};

function TimelineItem({
  date,
  title,
  description,
  icon = "info",
  skills,
  isFirst,
  isLast,
  cutLineAtEnd,
  details,
}: TimelineItemProps & {
  isFirst: boolean;
  isLast: boolean;
  cutLineAtEnd: boolean;
}) {
  const Icon = ICON_MAP[icon];
  const style = STYLE_MAP[icon];
  const idPrefix = React.useId();

  // 라인 X좌표는 left-8 고정 (2rem). 아이콘은 해당 좌표에 -translate-x-1/2로 중앙 정렬.
  const lineX = "left-8";
  const defaultInfo = () => {
    // 왼쪽: 기본 콘텐츠
    return (
      <div className="flex-1 min-w-0">
        <time className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
          {date}
        </time>
        <h3
          className={[
            "text-base sm:text-lg font-semibold text-gray-900 dark:text-white transition-colors",
            style.text,
          ].join(" ")}
        >
          {title}
        </h3>
        <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400 break-keep">
          {description}
        </p>
        {skills && (
          <div className="mt-2">
            <TagList tags={skills} isClickable={false} />
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="relative group pb-12">
      {/* 단일 라인 (아이템 범위 내에서 오프셋 조정) */}
      <span
        aria-hidden
        className={[
          "absolute w-px",
          isFirst ? "top-[1.5rem]" : "top-0",
          isLast && cutLineAtEnd ? "bottom-[1.5rem]" : "bottom-0",
          lineX,
          style.line,
          "-translate-x-1/2",
        ].join(" ")}
      />

      {/* 점(아이콘) */}
      <span
        className={[
          "absolute top-2",
          lineX,
          "-translate-x-1/2",
          "flex h-8 w-8 items-center justify-center rounded-full",
          style.dot,
          style.ring,
          "ring-4 shadow-md transition-transform duration-200 group-hover:scale-110",
        ].join(" ")}
      >
        <Icon className="h-4 w-4 text-white" />
      </span>

      {/* 본문 + 우측 아코디언 (반응형: 세로→가로) */}
      <div className="pl-20">
        <div className="flex flex-col md:flex-row md:items-start md:gap-6">
          {/* 오른쪽: 세부항목 아코디언 (있을 때만) */}
          {details ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`${idPrefix}-details`}>
                <AccordionTrigger className="text-sm sm:text-base pt-0 hover:no-underline items-center cursor-pointer">
                  {defaultInfo()}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 dark:text-gray-400 text-balance">
                  {details}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            defaultInfo()
          )}
        </div>
      </div>
    </div>
  );
}

export function Timeline({
  items,
  cutLineAtEnd = true,
  className,
}: TimelineProps) {
  return (
    <div className={cn("", className)}>
      <div className="relative">
        {items.map((item, idx) => (
          <TimelineItem
            {...item}
            key={`${item.date}-${idx}`}
            isFirst={idx === 0}
            isLast={idx === items.length - 1}
            cutLineAtEnd={cutLineAtEnd}
          />
        ))}
      </div>
    </div>
  );
}
