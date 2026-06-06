import { createContext, useContext, useEffect, useState } from "react";

const VALID_THEMES = ["light", "dark", "system"] as const;

type Theme = (typeof VALID_THEMES)[number];

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && VALID_THEMES.includes(value as Theme);
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with server-safe defaults to avoid hydration mismatch.
  // The blocking script in __root.tsx already has the correct class on <html>
  // before React hydrates, so there is no visual flash.
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // After mount: read localStorage and sync to actual stored preference.
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const validated = isTheme(stored) ? stored : "system";
    console.debug("ThemeProvider: stored theme=", stored, "validated=", validated);
    setThemeState(validated);
  }, []);

  // Whenever theme changes, resolve and apply to <html>.
  useEffect(() => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    console.debug("ThemeProvider: applying resolved theme=", resolved, "(theme=", theme, ")");
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, [theme]);

  // When theme is "system", watch for OS preference changes.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = mq.matches ? "dark" : "light";
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }

    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, [theme]);

  const setTheme = (next: Theme) => {
    console.debug("ThemeProvider.setTheme ->", next);
    localStorage.setItem("theme", next);
    setThemeState(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
