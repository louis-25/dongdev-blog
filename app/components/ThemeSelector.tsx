"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";

const themes = [
  { name: "GitHub Dark", value: "github-dark" },
  { name: "GitHub Light", value: "github-light" },
  { name: "Dracula", value: "dracula" },
  { name: "Nord", value: "nord" },
];

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState("github-dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("code-theme") || "github-dark";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-code-theme", savedTheme);
  }, []);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("code-theme", theme);
    document.documentElement.setAttribute("data-code-theme", theme);
  };

  return (
    <div className="flex gap-2 mb-4">
      {themes.map((theme) => (
        <Button
          key={theme.value}
          variant={currentTheme === theme.value ? "default" : "outline"}
          size="sm"
          onClick={() => handleThemeChange(theme.value)}
        >
          {theme.name}
        </Button>
      ))}
    </div>
  );
}
