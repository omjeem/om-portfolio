import {
  PersonalInfo, 
  Education, 
  Project, 
  Skill, 
  Experience, 
  Testimonial, 
  SiteConfig 
} from '../types/interfaces';

// Import all JSON data directly
import personalData from '../../data/personal.json';
import educationData from '../../data/education.json';
import projectsData from '../../data/projects.json';
import skillsData from '../../data/skills.json';
import experiencesData from '../../data/experience.json';
import testimonialsData from '../../data/testimonials.json';
import siteConfigData from '../../data/site-config.json';

// Get personal information
export function getPersonalInfo(): PersonalInfo {
  return personalData as PersonalInfo;
}

// Get all education items
export function getEducation(): Education[] {
  return educationData as Education[];
}

// Get all projects
export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects();
  return projects.filter(project => project.featured);
}

// Get project by ID
export function getProjectById(id: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find(project => project.id === id);
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find(project => project.slug === slug);
}

// Get all project slugs
export function getAllProjectSlugs(): string[] {
  const projects = getAllProjects();
  return projects.map(project => project.slug as string);
}

// Get all unique project categories
export function getAllProjectCategories(): string[] {
  const projects = getAllProjects();
  const categories = new Set<string>();
  
  projects.forEach(project => {
    if (project.category && Array.isArray(project.category)) {
      project.category.forEach(cat => categories.add(cat));
    }
  });
  
  return Array.from(categories).sort();
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  const projects = getAllProjects();
  return projects.filter(project => project.category && project.category.includes(category));
}

// Get all skills
export function getAllSkills(): Skill[] {
  return skillsData as Skill[];
}

// Get skills by category
export function getSkillsByCategory(): Record<string, Skill[]> {
  const skills = getAllSkills();
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

// Get all experiences
export function getAllExperiences(): Experience[] {
  return experiencesData as Experience[];
}

// Get experience by ID
export function getExperienceById(id: string): Experience | undefined {
  const experiences = getAllExperiences();
  return experiences.find(experience => experience.id === id);
}

// Get all testimonials
export function getAllTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

// Get site configuration
export function getSiteConfig(): SiteConfig {
  return siteConfigData as SiteConfig;
}

// Get navigation items
export function getNavigation(): SiteConfig['navigation'] {
  const config = getSiteConfig();
  return config.navigation;
}

// Get header navigation items
export function getHeaderNavigation(): SiteConfig['navigation'] {
  const navigation = getNavigation();
  return navigation.filter(item => item.showInHeader);
}

// Get footer navigation items
export function getFooterNavigation(): SiteConfig['navigation'] {
  const navigation = getNavigation();
  return navigation.filter(item => item.showInFooter);
}

// Get theme settings
export function getTheme(): SiteConfig['theme'] {
  const config = getSiteConfig();
  return config.theme;
}

// Get active sections
export function getActiveSections(): SiteConfig['sections'] {
  const config = getSiteConfig();
  return config.sections;
} 