import { Metadata } from "next";
import { getAllProjects, getAllProjectCategories, getPersonalInfo } from "@/lib/data";
import Section, { SectionHeader } from "@/components/ui/Section";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectFilters from "@/components/projects/ProjectFilters";
import JsonLd from "@/components/SEO/JsonLd";

// Get personal info for metadata
const personalInfo = getPersonalInfo();

export const metadata: Metadata = {
  title: `Projects | ${personalInfo.name} - ${personalInfo.title}`,
  description: `Explore the portfolio of projects by ${personalInfo.name}, including ${personalInfo.title.toLowerCase()} work like web applications, AI integrations, and other software development.`,
  keywords: ["projects", "portfolio", "web development", "full stack", "software engineer", personalInfo.name, ...getAllProjectCategories()],
  openGraph: {
    title: `Projects | ${personalInfo.name} - ${personalInfo.title}`,
    description: `Explore the portfolio of projects by ${personalInfo.name}, including ${personalInfo.title.toLowerCase()} work like web applications, AI integrations, and other software development.`,
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${personalInfo.name} - ${personalInfo.title}`,
    description: `Explore the portfolio of projects by ${personalInfo.name}, including ${personalInfo.title.toLowerCase()} work like web applications, AI integrations, and other software development.`,
  }
};

export default function ProjectsPage() {
  // Get all projects and categories
  const projects = getAllProjects();
  const categories = getAllProjectCategories();

  // Define breadcrumbs items for structured data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" }
  ];

  return (
    <>
      <JsonLd type="BreadcrumbList" data={{ items: breadcrumbItems }} />
      <Section>
        <SectionHeader
          title="My Projects"
          subtitle="A showcase of my work, side projects, and open source contributions"
          centered
          className=""
        />

        {/* <ProjectFilters categories={categories} /> */}
        
        <ProjectsGrid projects={projects} />
      </Section>
    </>
  );
} 