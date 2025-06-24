"use client";

import { ThemeSwitch } from "./ThemeSwitch";
import { InteractiveLink } from "./ui/interactive";

export function Navigation() {
  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-6">
        <InteractiveLink href="/" className="text-lg font-semibold">
          DongDev
        </InteractiveLink>
        <InteractiveLink
          href="/blog"
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          Blog
        </InteractiveLink>
        <InteractiveLink
          href="/about"
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          About
        </InteractiveLink>
      </div>
      <ThemeSwitch />
    </nav>
  );
}
