import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
          theme === "light" ? "text-yellow-500" : "text-gray-500"
        }`}
        aria-label="라이트 모드"
      >
        <SunIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
          theme === "dark" ? "text-blue-500" : "text-gray-500"
        }`}
        aria-label="다크 모드"
      >
        <MoonIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
          theme === "system" ? "text-green-500" : "text-gray-500"
        }`}
        aria-label="시스템 설정"
      >
        <ComputerDesktopIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
