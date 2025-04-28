"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Project as FullProject } from "@/types/interfaces";
import ProjectCard, { Project, mapProjectData } from "./ProjectCard";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

interface ProjectsGridProps {
  projects: FullProject[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const searchParams = useSearchParams();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get category from URL query parameter
  const categoryParam = searchParams.get("category");
  
  // Filter projects when category changes
  useEffect(() => {
    // Start loading
    setIsLoading(true);
    
    // Convert to component format
    const mappedProjects = projects.map(mapProjectData);
    
    // Apply filters
    let filtered = mappedProjects;
    if (categoryParam && categoryParam !== "all") {
      filtered = mappedProjects.filter(project => 
        project.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }
    
    // Reset visible count when changing categories
    setVisibleProjects(6);
    setFilteredProjects(filtered);
    
    // Simulate network delay for a smoother animation experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [categoryParam, projects]);

  // Handle loading more projects
  const handleLoadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };
  
  // Get projects to display
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center text-center"
        >
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </motion.div>
      </div>
    );
  }

  // If no projects match the filter
  if (filteredProjects.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <h3 className="text-xl font-medium mb-4">No projects found</h3>
        <p className="text-muted-foreground">
          {categoryParam 
            ? `No projects found in the "${categoryParam}" category.` 
            : "No projects available."}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {displayedProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
          />
        ))}
      </motion.div>
      
      {/* Load more button */}
      {hasMoreProjects && (
        <motion.div 
          variants={fadeIn("up", 0.5)}
          className="flex justify-center mt-12"
        >
          <Button 
            onClick={handleLoadMore} 
            variant="outline"
            className="min-w-[180px]"
          >
            Load More Projects
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
} 