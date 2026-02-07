"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeId, getThemeById } from "@/lib/themes";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "mermaidcore",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("mermaidcore");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ai-qadam-theme") as ThemeId | null;
    if (stored) {
      setThemeState(stored);
      applyTheme(stored);
    }
    setMounted(true);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    localStorage.setItem("ai-qadam-theme", id);
    applyTheme(id);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyTheme(id: ThemeId) {
  const config = getThemeById(id);
  const html = document.documentElement;
  if (config.dataAttribute) {
    html.setAttribute("data-theme", config.dataAttribute);
  } else {
    html.removeAttribute("data-theme");
  }
}

export function useTheme() {
  return useContext(ThemeContext);
}
