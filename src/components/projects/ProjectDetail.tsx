"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar, Tags, Briefcase } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import Section, { SectionHeader } from "@/components/ui/Section";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Project } from "@/types/interfaces";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get the current image to display
  const currentImage = project.imageUrls && project.imageUrls.length > 0
    ? project.imageUrls[currentImageIndex]
    : project.thumbnailUrl;

  return (
    <Section>
      <motion.div 
        className="mb-8"
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
      >
        <ButtonLink 
          href="/projects" 
          variant="ghost" 
          size="sm"
          icon={ArrowLeft}
          iconPosition="left"
        >
          Back to Projects
        </ButtonLink>
      </motion.div>

      <motion.div 
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Project Images */}
        <motion.div 
          variants={fadeIn("right", 0.3)}
          className="space-y-4"
        >
          <div className="relative aspect-video rounded-lg overflow-hidden border border-card-border shadow-md group">
            <Image
              src={currentImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {project.featured && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="primary" className="font-medium shadow-lg">
                  Featured Project
                </Badge>
              </div>
            )}
          </div>

          {/* Image gallery */}
          {project.imageUrls && project.imageUrls.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-thin">
              {project.imageUrls.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${project.title} preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Project Details */}
        <motion.div variants={fadeIn("left", 0.3)}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="primary">{tech}</Badge>
            ))}
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
            {project.longDescription ? (
              <div>
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p>{project.description}</p>
            )}
          </div>
          
          <div className="space-y-4 mb-8 bg-card-bg border border-card-border rounded-lg p-5">
            {project.role && (
              <div className="flex items-center text-foreground">
                <Briefcase size={18} className="mr-2 text-primary" />
                <span className="font-medium">Role:</span>
                <span className="ml-2">{project.role}</span>
              </div>
            )}
            
            <div className="flex items-center text-foreground">
              <Calendar size={18} className="mr-2 text-primary" />
              <span className="font-medium">Timeline:</span>
              <span className="ml-2">
                {formatDate(project.startDate, { month: 'short', year: 'numeric' })}
                {project.endDate && ` - ${formatDate(project.endDate, { month: 'short', year: 'numeric' })}`}
                {!project.endDate && " - Present"}
              </span>
            </div>
            
            {project.category && (
              <div className="flex items-center text-foreground">
                <Tags size={18} className="mr-2 text-primary" />
                <span className="font-medium">Category:</span>
                <span className="ml-2">{Array.isArray(project.category) ? project.category.join(', ') : project.category}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ButtonLink 
                  href={project.githubUrl} 
                  external 
                  icon={Github}
                  iconPosition="left"
                >
                  GitHub Repository
                </ButtonLink>
              </motion.div>
            )}
            
            {project.liveUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ButtonLink 
                  href={project.liveUrl} 
                  variant="secondary" 
                  external 
                  icon={ExternalLink}
                  iconPosition="left"
                >
                  Live Demo
                </ButtonLink>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Challenges and Solutions */}
      {(project?.challenges?.length > 0 || project?.solutions?.length > 0) && (
        <motion.div 
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {project.challenges?.length > 0 && (
            <div className="bg-card-bg border border-card-border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                {/* <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <span className="text-primary font-semibold">C</span>
                </span> */}
                Challenges
              </h2>
              <ul className="space-y-3 list-none">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span className="text-foreground/90">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {project.solutions?.length > 0 && (
            <div className="bg-card-bg border border-card-border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                {/* <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <span className="text-primary font-semibold">S</span>
                </span> */}
                Solutions
              </h2>
              <ul className="space-y-3 list-none">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span className="text-foreground/90">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Related Projects Section - Could be implemented in the future */}
    </Section>
  );
} 