"use client";

import Link from "next/link";
import { Rss } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";
import { SearchBar } from "./SearchBar";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              DongDev Blog
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/tags">Tags</Link>
            <Link href="/api/feed" className="flex items-center space-x-1">
              <span>RSS</span>
              <Rss className="w-4 h-4" />
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchBar />
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
