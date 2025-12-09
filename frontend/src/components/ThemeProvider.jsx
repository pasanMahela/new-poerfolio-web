import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeCtx = createContext({ theme: "dark", setTheme: () => {} });
export const useTheme = () => useContext(ThemeCtx);

export default function ThemeProvider({ children }) {
  const getInitial = () => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    try { localStorage.setItem("theme", theme); } catch {}
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
