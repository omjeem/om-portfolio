"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Project } from "@/types/interfaces";
import { getAllProjects } from "@/lib/data";
import { motion } from "framer-motion";

import Section, { SectionHeader } from "@/components/ui/Section";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectCard, { mapProjectData } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/Button";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6); // For "Load More" functionality
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const allProjects = await getAllProjects();
        
        if (!allProjects || allProjects.length === 0) {
          throw new Error("No projects found");
        }
        
        // Extract unique categories from projects
        const allCategories = allProjects.flatMap(project => project.category);
        const uniqueCategories = ["All", ...new Set(allCategories)];
        
        setProjects(allProjects);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Failed to load projects. Please try again later.");
        // Use empty arrays if fetch fails
        setProjects([]);
        setCategories(["All"]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Reset visible projects count when category changes
  useEffect(() => {
    setVisibleProjects(6);
  }, [categoryParam]);

  // Filter projects based on category
  const filteredProjects = categoryParam && categoryParam !== "All"
    ? projects.filter(project => project.category.includes(categoryParam))
    : projects;

  // Sort projects to show featured ones first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  // Limit visible projects
  const displayedProjects = sortedProjects.slice(0, visibleProjects);
  console.log("Displayed projects: >>> ", displayedProjects);
  
  // Load more projects
  const handleLoadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <Container>
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <SectionHeader
            title="Projects"
            subtitle="Showcasing my work and demonstrating my skills in building scalable web applications"
          />
        </motion.div>

        {/* Project Filters */}
        {/* {categories.length > 0 && (
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-8"
          >
            <ProjectFilters categories={categories} />
          </motion.div>
        )} */}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          /* Projects Grid */
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-8"
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeIn("up", 0.1 * (index + 1))}
                >
                  <ProjectCard project={mapProjectData(project)} />
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {sortedProjects.length === 0 && !isLoading && !error && (
              <div className="col-span-full text-center py-10">
                <h3 className="text-xl font-medium text-foreground">No projects found</h3>
                <p className="text-muted-foreground mt-2">
                  Try selecting a different category or check back later.
                </p>
              </div>
            )}

            {/* Load More Button */}
            {displayedProjects.length < sortedProjects.length && (
              <motion.div
                variants={fadeIn("up", 0.6)}
                className="flex justify-center mt-8"
              >
                <Button 
                  onClick={handleLoadMore}
                  variant="outline"
                  className="px-8"
                >
                  Load More Projects
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </Container>
    </section>
  );
} 