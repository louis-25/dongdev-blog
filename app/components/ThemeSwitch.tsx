"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { InteractiveButton } from "./ui/interactive";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div className="flex items-center">
      <InteractiveButton
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label={
          currentTheme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
        }
      >
        {currentTheme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </InteractiveButton>
    </div>
  );
}
