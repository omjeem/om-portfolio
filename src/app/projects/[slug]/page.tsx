import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data";
import ProjectDetail from "@/components/projects/ProjectDetail";

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Project Details`,
    description: project.description,
  };
}

// Generate static params for all project slugs at build time
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  
  return slugs.map(slug => ({
    slug: slug,
  }));
}

export default async function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  // If project not found, show 404 page
  if (!project) {
    notFound();
  }
  
  return (
    <ProjectDetail project={project} />
  );
} 