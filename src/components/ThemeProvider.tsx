"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create context with default values to avoid undefined errors
const defaultThemeContext: ThemeContextProps = {
  theme: "system",
  setTheme: () => null,
};

const ThemeContext = createContext<ThemeContextProps>(defaultThemeContext);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Initialize with system to prevent hydration mismatch
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // Set theme and mark component as mounted on client side
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    setMounted(true);
  }, []);

  // Apply theme class only after component is mounted (client-side)
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const root = document.documentElement;
      
      // Remove all theme classes
      root.classList.remove('light', 'dark');
      
      // Apply appropriate theme
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
      
      // Save to localStorage (only if changed by user)
      localStorage.setItem("theme", theme);
      
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== "system") return;
    
    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = () => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      };
      
      // Apply initially
      handleChange();
      
      // Listen for changes
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } catch (error) {
      console.error("Error setting up media query listener:", error);
    }
  }, [theme, mounted]);

  // Provide the context value
  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
} 