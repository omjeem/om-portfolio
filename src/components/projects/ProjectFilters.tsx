"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Filter } from "lucide-react";

interface ProjectFiltersProps {
  categories: string[];
}

export default function ProjectFilters({ categories }: ProjectFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Check the URL for the active category on component mount
  useEffect(() => {
    const category = searchParams.get("category") || "all";
    setActiveCategory(category);
  }, [searchParams]);

  // Create a new URL with updated search params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    router.push(`${pathname}?${createQueryString("category", category)}`);
    setIsMobileFiltersOpen(false); // Close mobile filters after selection
  };

  return (
    <div className="mb-8">
      {/* Mobile filter toggle button (shown on small screens) */}
      <div className="block md:hidden mb-4">
        <Button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          variant="outline"
          className="w-full justify-between"
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            {activeCategory === "all" ? "All Categories" : activeCategory}
          </span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {categories.length + 1}
          </span>
        </Button>
      </div>

      {/* Mobile filters (dropdown style) */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileFiltersOpen ? "auto" : 0,
          opacity: isMobileFiltersOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-2 p-2 bg-card-bg border border-card-border rounded-lg shadow-sm mb-4">
          <Button
            variant={activeCategory === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => handleCategoryChange("all")}
            className="justify-start"
          >
            All Projects
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category.toLowerCase() ? "primary" : "ghost"}
              size="sm"
              onClick={() => handleCategoryChange(category.toLowerCase())}
              className="justify-start"
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Desktop filters (horizontal buttons) */}
      <motion.div 
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        animate="show"
        className="hidden md:flex flex-wrap gap-2 items-center p-3 bg-card-bg border border-card-border rounded-lg"
      >
        <span className="text-sm font-medium mr-2">Filter by:</span>
        <Button
          variant={activeCategory === "all" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange("all")}
          className={cn(
            "rounded-full",
            activeCategory === "all" ? "bg-primary text-primary-foreground" : ""
          )}
        >
          All Projects
        </Button>
        
        {categories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              variant={activeCategory === category.toLowerCase() ? "primary" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category.toLowerCase())}
              className={cn(
                "rounded-full",
                activeCategory === category.toLowerCase() ? "bg-primary text-primary-foreground" : ""
              )}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 