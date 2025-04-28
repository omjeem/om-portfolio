"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn, floatAnimation } from "@/lib/animations";
import { Project as ProjectType } from "@/types/interfaces";

// Simplified Project interface for component use
export interface Project {
  id: string;
  slug: string; // Make slug a required field for proper routing
  title: string;
  description: string;
  image: string; // Maps to thumbnailUrl in the full interface
  link?: string; // Maps to liveUrl in the full interface
  github?: string; // Maps to githubUrl in the full interface
  technologies: string[];
  category: string; // We'll use the first category from the array
  featured?: boolean;
}

// Helper to convert from full Project type to component Project type
export function mapProjectData(project: ProjectType): Project {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    description: project.description,
    image: project.imageUrls?.[0] || project.thumbnailUrl, // Use first image or thumbnail
    link: project.liveUrl,
    github: project.githubUrl,
    technologies: project.technologies,
    category: Array.isArray(project.category) ? project.category[0] : project.category,
    featured: project.featured,
  };
}

interface ProjectCardProps {
  project: Project;
  compact?: boolean; // Add compact prop for smaller cards
  index?: number; // For staggered animations
}

export function ProjectCard({ project, compact = false, index = 0 }: ProjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  console.log("ProjectCard rendered with project:", project);
  return (
    <motion.div
      variants={fadeIn("up", 0.1 * (index + 1))}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Card 
        className={cn(
          "group h-full overflow-hidden transition-all duration-300 border border-card-border hover:border-primary/50 hover:shadow-lg",
          // Only apply featured styling when not in compact mode
          !compact && project.featured && "sm:col-span-2"
        )}
      >
        <div className={cn(
          "relative w-full overflow-hidden",
          compact ? "aspect-[4/3]" : "aspect-[16/9]"
        )}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovering ? "scale-110" : "scale-100"
            )}
          />
          {project.featured && !compact && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="primary" className="font-medium">Featured</Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              {project.link && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonLink 
                    href={project.link}
                    variant="primary" 
                    size={compact ? "sm" : "md"}
                    className="shadow-md"
                    external
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {!compact && "Live Demo"}
                  </ButtonLink>
                </motion.div>
              )}
              {project.github && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonLink 
                    href={project.github}
                    variant="outline" 
                    size={compact ? "sm" : "md"}
                    className="bg-background/90 backdrop-blur-sm"
                    external
                  >
                    <Github className={cn("h-4 w-4", !compact && "mr-2")} />
                    {!compact && "GitHub"}
                  </ButtonLink>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        <CardHeader className={cn(compact && "p-4")}>
          <CardTitle className={cn("line-clamp-1", compact && "text-base")}>
            {project.title}
          </CardTitle>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.technologies.slice(0, compact ? 2 : 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="font-normal text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > (compact ? 2 : 3) && (
              <Badge variant="outline" className="font-normal text-xs">
                +{project.technologies.length - (compact ? 2 : 3)} more
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className={cn(compact && "p-4 pt-0")}>
          <CardDescription className={cn(
            compact ? "line-clamp-1 text-xs" : "line-clamp-2" 
          )}>
            {project.description}
          </CardDescription>
        </CardContent>
        
        <CardFooter className={cn(compact && "p-4")}>
          <motion.div 
            className="ml-auto"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ButtonLink 
              href={`/projects/${project.slug}`}
              variant="ghost" 
              size="sm" 
              className="group text-xs"
            >
              View Details
              <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ProjectCard; 