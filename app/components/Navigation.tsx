"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 bg-opacity-90 backdrop-blur">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            DongDev
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="메뉴 열기"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* 데스크톱 메뉴 */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link
                href="/"
                className={`${
                  pathname === "/"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`${
                  isActive("/blog")
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${
                  isActive("/about")
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                소개
              </Link>
            </li>
          </ul>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden border-t border-gray-200 dark:border-gray-800 py-4`}
        >
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className={`block px-2 py-1 rounded-md ${
                  pathname === "/"
                    ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`block px-2 py-1 rounded-md ${
                  isActive("/blog")
                    ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block px-2 py-1 rounded-md ${
                  isActive("/about")
                    ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                소개
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
