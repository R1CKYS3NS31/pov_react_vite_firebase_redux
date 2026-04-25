import { useCallback, useMemo, useState, useEffect } from "react";
import { theme } from "../ui/styles/themes";

const THEME_CHANGE_EVENT = "theme-change";

export const useUiSettings = () => {
  const [themeType, setThemeType] = useState(
    () => localStorage.getItem("themeType") || "light"
  );

  useEffect(() => {
    const handleThemeChange = (event) => {
      setThemeType(event.detail);
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  const activeTheme = useMemo(() => {
    return theme({ themeType });
  }, [themeType]);

  const toggleTheme = useCallback(() => {
    const nextTheme = themeType === "light" ? "dark" : "light";
    localStorage.setItem("themeType", nextTheme);
    
    // Dispatch event to sync all hook instances
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: nextTheme }));
  }, [themeType]);

  return {
    themeType,
    activeTheme,
    toggleTheme,
  };
};


