"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Tag, Search } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";
import { SearchBar } from "./SearchBar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/about", label: "About", icon: Tag },
  // { href: "/tags", label: "태그", icon: Tag },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:top-20">
        <nav className="grid grid-cols-10 gap-6" id="nav">
          {/* 햄버거(태블릿 전용) */}
          <div className="col-span-3 order-1 md:flex lg:hidden items-center">
            <Sheet>
              <SheetTrigger>
                <button
                  aria-label="Open menu"
                  aria-expanded={open}
                  className="relative h-8 w-8 rounded-sm transition-colors hover:bg-muted/60"
                >
                  <span className="sr-only">Open menu</span>

                  <span
                    className={`absolute left-1/2 top-2.5 h-0.5 w-6 -translate-x-1/2 rounded bg-foreground transition-transform duration-300 ease-in-out ${
                      open ? "translate-y-1.5 rotate-45" : ""
                    }`}
                  />

                  <span
                    className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground transition-opacity duration-200 ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  <span
                    className={`absolute left-1/2 bottom-2.5 h-0.5 w-6 -translate-x-1/2 rounded bg-foreground transition-transform duration-300 ease-in-out ${
                      open ? "-translate-y-1.5 -rotate-45" : ""
                    }`}
                  />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="pt-4"
                showCloseButton={false}
              >
                <SheetHeader className="px-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle>Menu</SheetTitle>
                    <SheetClose className="rounded-xs p-1 opacity-70 transition-opacity hover:opacity-100">
                      <span className="sr-only">Close</span>
                      {/* X 아이콘은 내부 close 기본 버튼을 숨겼으므로 이곳에 배치 */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <div className="p-4">
                  <div className="flex flex-col">
                    {navItems.map(({ href, label }) => (
                      <SheetClose asChild key={href}>
                        <Link
                          href={href}
                          className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-2 px-1 my-1 break-keep ${
                            pathname === href
                              ? "text-neutral-800 dark:text-neutral-200 font-bold"
                              : "text-neutral-500 dark:text-neutral-400"
                          }`}
                        >
                          {label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-name">Name</Label>
                    <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-username">Username</Label>
                    <Input id="sheet-demo-username" defaultValue="@peduarte" />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">Save changes</Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet> */}
          </div>
          {/* 기본 메뉴(데스크톱 전용) */}
          <div className="col-span-3 order-1 hidden lg:flex">
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
          <div className="col-span-7 order-2 caret-none flex justify-between">
            <div className="max-w-[400px] w-full">
              <SearchBar />
            </div>
            <ThemeSwitch />
          </div>
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
