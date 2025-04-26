"use client";

import { ReactNode, useState, useEffect } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function ClientThemeProvider({ 
  children 
}: { 
  children: ReactNode 
}) {
  const [mounted, setMounted] = useState(false);

  // Only show the UI after the component is mounted to avoid hydration errors
  useEffect(() => {
    // Add a small delay to ensure React has finished hydration
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Add the skip-animations class to the body until JS loads
  // to prevent animations from playing on page load
  useEffect(() => {
    document.body.classList.add('skip-animations');
    window.setTimeout(() => {
      document.body.classList.remove('skip-animations');
    }, 500);
  }, []);

  // Return simple structure during SSR to avoid hydration mismatches
  if (!mounted) {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <div className="h-16 border-b border-card-border"></div>
          <div className="flex-grow">
            {children}
          </div>
          <div className="bg-card-bg border-t border-card-border py-12"></div>
        </div>
      </>
    );
  }

  // Return full UI once mounted
  return (
    <ThemeProvider>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
} 