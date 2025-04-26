"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard, { Project } from "./ProjectCard";
import ProjectFilters from "./ProjectFilters";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  // Extract unique categories from projects
  const categories = Array.from(
    new Set(projects.map((project) => project.category))
  );

  useEffect(() => {
    const category = searchParams.get("category");
    
    if (!category || category === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProjects(filtered);
    }
  }, [searchParams, projects]);

  return (
    <div className="space-y-8 w-full">
      <ProjectFilters categories={categories} />
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No projects found</h3>
          <p className="text-muted-foreground mt-2">
            Try selecting a different category or check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
} 