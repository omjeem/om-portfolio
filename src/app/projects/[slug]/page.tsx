import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs, getPersonalInfo } from "@/lib/data";
import ProjectDetail from "@/components/projects/ProjectDetail";
import JsonLd from "@/components/SEO/JsonLd";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  const personalInfo = getPersonalInfo();
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found."
    };
  }

  return {
    title: `${project.title} | ${personalInfo.name}`,
    description: project.longDescription || project.description,
    keywords: [...project.technologies, ...project.category, personalInfo.name, "project", "portfolio"],
    openGraph: {
      title: `${project.title} | ${personalInfo.name}`,
      description: project.description,
      type: "article",
      url: `/projects/${slug}`,
      images: [
        {
          url: project.imageUrls?.[0] || project.thumbnailUrl || "/data/om-mishra.jpg",
          width: 1200,
          height: 630,
          alt: project.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${personalInfo.name}`,
      description: project.description,
      images: [project.imageUrls?.[0] || project.thumbnailUrl || "/data/om-mishra.jpg"]
    }
  };
}

export default function Page({ params }: any) {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  // Define breadcrumbs items for structured data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.title, url: `/projects/${slug}` }
  ];
  
  return (
    <>
      <JsonLd type="Project" data={project} />
      <JsonLd type="BreadcrumbList" data={{ items: breadcrumbItems }} />
      <ProjectDetail project={project} />
    </>
  );
} 