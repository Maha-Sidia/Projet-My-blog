"use client";

import { useThemeStore } from "../store/theme.store";
import { Sun, Moon } from "lucide-react"; 
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 p-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {theme === "light" ? (
        <>
          <Moon size={18} /> <span>Dark</span>
        </>
      ) : (
        <>
          <Sun size={18} /> <span>Light</span>
        </>
      )}
    </button>
  );
}
