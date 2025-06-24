"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { InteractiveButton } from "./ui/interactive";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <InteractiveButton
        onClick={() => setTheme("light")}
        className={`p-2 rounded-lg ${
          theme === "light"
            ? "bg-gray-200 dark:bg-gray-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-label="라이트 모드"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </InteractiveButton>

      <InteractiveButton
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-lg ${
          theme === "dark"
            ? "bg-gray-200 dark:bg-gray-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-label="다크 모드"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </InteractiveButton>

      <InteractiveButton
        onClick={() => setTheme("system")}
        className={`p-2 rounded-lg ${
          theme === "system"
            ? "bg-gray-200 dark:bg-gray-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-label="시스템 설정"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </InteractiveButton>
    </div>
  );
}
