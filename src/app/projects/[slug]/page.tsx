import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data";
import ProjectDetail from "@/components/projects/ProjectDetail";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found."
    };
  }

  return {
    title: `${project.title} | Project Details`,
    description: project.description
  };
}

export default function Page({ params }: any) {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetail project={project} />;
} 