"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Tag, Search } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";
import { SearchBar } from "./SearchBar";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/about", label: "About", icon: Tag },
  // { href: "/tags", label: "태그", icon: Tag },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center justify-between relative px-0 pb-0 fade overflow-hidden md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {navItems.map(({ href, label, icon }) => {
              return (
                <Link
                  key={href}
                  href={href}
                  className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 break-keep ${
                    pathname === href
                      ? "text-neutral-800 dark:text-neutral-200 font-bold"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          {/* 검색바 */}
          {/* <div className="flex items-center mr-4">
            <SearchBar />
          </div> */}
          <ThemeSwitch />
        </nav>
      </div>
    </aside>
    // <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
    //   <div className="max-w-xl mx-auto px-4 py-3">
    //     {/* 로고/브랜드 */}
    //     <div className="flex items-center justify-between mb-4">
    //       <Link
    //         href="/"
    //         className="text-xl font-bold text-foreground hover:text-primary transition-colors"
    //       >
    //         DongDev
    //       </Link>
    //       <div className="flex items-center gap-2">
    //         <ThemeSwitch />
    //       </div>
    //     </div>

    //     {/* 검색바 */}
    //     <div className="mb-4">
    //       <SearchBar />
    //     </div>

    //     {/* 네비게이션 링크 */}
    //     <div className="flex items-center justify-center gap-1">
    //       {navItems.map((item) => {
    //         const Icon = item.icon;
    //         const isActive =
    //           pathname === item.href ||
    //           (item.href !== "/" && pathname.startsWith(item.href));

    //         return (
    //           <Link
    //             key={item.href}
    //             href={item.href}
    //             className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
    //               isActive
    //                 ? "bg-primary text-primary-foreground shadow-xs"
    //                 : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    //             }`}
    //           >
    //             <Icon className="w-4 h-4" />
    //             <span>{item.label}</span>
    //           </Link>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </nav>
  );
}
