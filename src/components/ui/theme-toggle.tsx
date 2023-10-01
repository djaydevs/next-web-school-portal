"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export default function ThemeToggle({}) {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <span className="sr-only">Toggle theme</span>
      {currentTheme === "dark" ? (
        <Button
          title="Toggle theme"
          aria-label="Toggle theme"
          variant="ghost"
          size="icon"
          onClick={() => setTheme("light")}
        >
          <Icons.Moon className="h-8 w-8 p-1" />
        </Button>
      ) : (
        <Button
          title="Toggle theme"
          aria-label="Toggle theme"
          variant="ghost"
          size="icon"
          onClick={() => setTheme("dark")}
        >
          <Icons.Sun className="h-8 w-8 p-1" />
        </Button>
      )}
    </>
  );
}
