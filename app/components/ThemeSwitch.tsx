"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
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
        <Sun className="w-5 h-5" />
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
        <Moon className="w-5 h-5" />
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
        <Monitor className="w-5 h-5" />
      </InteractiveButton>
    </div>
  );
}
