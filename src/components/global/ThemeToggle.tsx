"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Q to toggle theme
      if (e.ctrlKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        const currentTheme = theme === 'system' ? systemTheme : theme;
        setTheme(currentTheme === "dark" ? "light" : "dark");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme, setTheme, systemTheme]);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid Cumulative Layout Shift
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative inline-flex items-center justify-center p-2 w-9 h-9 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors text-foreground hover:text-accent"
      aria-label="Toggle theme (Ctrl+Q)"
      title="Toggle theme (Ctrl+Q)"
    >
      {currentTheme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-primary-foreground" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
}
