"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

// 탭마다 URL을 갖도록 Radix Tabs 대신 링크로 구성 (스타일은 ui/tabs와 동일)
const TABS = [
  { href: "/about", label: "About Me" },
  { href: "/about/career", label: "Career" },
];

export function AboutTabs() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="소개 탭"
      className="bg-muted text-muted-foreground mb-4 inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]"
    >
      {TABS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            data-state={active ? "active" : "inactive"}
            className={cn(
              "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 data-[state=active]:shadow-sm",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
