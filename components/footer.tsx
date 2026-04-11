"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rendering until the theme is known to avoid hydration mismatch
    return null;
  }

  return (
    <footer className="w-full py-6 text-center border-t border-gray-200 dark:border-gray-800 mt-8">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {currentYear} Crafted with ❤️ by <span className="font-semibold">Vansh Mundhra</span>
      </p>
      <p className="mt-2 text-gray-700 dark:text-gray-300 italic">
        “Great software isn’t written for machines — it’s crafted for people, to solve real problems and empower others to build on it.”
      </p>

    </footer>
  );
}
