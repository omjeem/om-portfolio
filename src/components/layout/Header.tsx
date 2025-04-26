"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getHeaderNavigation, getPersonalInfo } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import { Menu, X, Sun, Moon, Laptop } from "lucide-react";

// Load data
const navigation = getHeaderNavigation();
const personalInfo = getPersonalInfo();

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Safely access theme context
  const themeContext = useTheme();
  const theme = themeContext?.theme || "system";
  const setTheme = themeContext?.setTheme || (() => {});

  // Check if we're at the top of the page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Safe theme toggle functions
  const handleSetTheme = (newTheme: "light" | "dark" | "system") => {
    try {
      setTheme(newTheme);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and name */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">{personalInfo.name.split(" ")[0]}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-foreground/80 hover:text-foreground transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Switcher */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => handleSetTheme("light")}
                className={`p-2 rounded-full ${
                  theme === "light" ? "bg-primary/10 text-primary" : "text-foreground/60 hover:text-foreground"
                }`}
                aria-label="Light mode"
              >
                <Sun size={18} />
              </button>
              <button
                onClick={() => handleSetTheme("dark")}
                className={`p-2 rounded-full ${
                  theme === "dark" ? "bg-primary/10 text-primary" : "text-foreground/60 hover:text-foreground"
                }`}
                aria-label="Dark mode"
              >
                <Moon size={18} />
              </button>
              <button
                onClick={() => handleSetTheme("system")}
                className={`p-2 rounded-full ${
                  theme === "system" ? "bg-primary/10 text-primary" : "text-foreground/60 hover:text-foreground"
                }`}
                aria-label="System preference"
              >
                <Laptop size={18} />
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-foreground/10 shadow-lg">
          <nav className="container mx-auto py-4 px-4 flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="py-3 text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 py-4 mt-2 border-t border-foreground/10">
              <button
                onClick={() => handleSetTheme("light")}
                className={`p-2 rounded-full ${
                  theme === "light" ? "bg-primary/10 text-primary" : "text-foreground/60"
                }`}
                aria-label="Light mode"
              >
                <Sun size={18} />
                <span className="ml-2">Light</span>
              </button>
              <button
                onClick={() => handleSetTheme("dark")}
                className={`p-2 rounded-full ${
                  theme === "dark" ? "bg-primary/10 text-primary" : "text-foreground/60"
                }`}
                aria-label="Dark mode"
              >
                <Moon size={18} />
                <span className="ml-2">Dark</span>
              </button>
              <button
                onClick={() => handleSetTheme("system")}
                className={`p-2 rounded-full ${
                  theme === "system" ? "bg-primary/10 text-primary" : "text-foreground/60"
                }`}
                aria-label="System preference"
              >
                <Laptop size={18} />
                <span className="ml-2">System</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 