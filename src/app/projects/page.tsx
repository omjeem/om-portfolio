import { Metadata } from "next";
import { getAllProjects, getAllProjectCategories } from "@/lib/data";
import Section, { SectionHeader } from "@/components/ui/Section";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectFilters from "@/components/projects/ProjectFilters";

export const metadata: Metadata = {
  title: "Projects | John Doe - Full Stack Developer",
  description: "Explore the portfolio of projects by John Doe, including web applications, mobile apps, and other software development work.",
};

export default function ProjectsPage() {
  // Get all projects and categories
  const projects = getAllProjects();
  const categories = getAllProjectCategories();

  return (
    <>
      <Section>
        <SectionHeader
          title="My Projects"
          subtitle="A showcase of my work, side projects, and open source contributions"
          centered
        />

        <ProjectFilters categories={categories} />
        
        <ProjectsGrid projects={projects} />
      </Section>
    </>
  );
} 