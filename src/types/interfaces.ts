export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  longBio: string;
  headline: string;
  profileImage: string;
  location: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
    other?: { name: string; url: string }[];
  };
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
  achievements?: string[];
  logoUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnailUrl: string;
  imageUrls?: string[];
  technologies: string[];
  category: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  role?: string;
  challenges?: string[];
  solutions?: string[];
}

export interface Skill {
  id: string;
  name: string;
  icon?: string;
  category: string;
  proficiency: number; // 1-5 or 1-100
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  responsibilities: string[];
  achievements?: string[];
  technologies?: string[];
  logoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  imageUrl?: string;
  relationship: string;
  date: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    lightBackground: string;
    darkBackground: string;
    lightText: string;
    darkText: string;
  };
  sections: {
    hero: boolean;
    about: boolean;
    education: boolean;
    projects: boolean;
    skills: boolean;
    experience: boolean;
    testimonials: boolean;
    contact: boolean;
  };
  navigation: Array<{
    name: string;
    path: string;
    showInHeader: boolean;
    showInFooter: boolean;
  }>;
} 