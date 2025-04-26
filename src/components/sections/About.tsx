import Image from "next/image";
import { getPersonalInfo } from "@/lib/data";
import Section, { SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FileText } from "lucide-react";

// Load data
const personalInfo = getPersonalInfo();

export default function About() {
  return (
    <Section id="about" background="alt">
      <SectionHeader 
        title="About Me" 
        subtitle="Get to know me better and what drives my passion for development"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square w-full max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={personalInfo.profileImage}
            alt={`Photo of ${personalInfo.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            onError={(e) => {
              // Show fallback for missing profile image
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = `/api/placeholder?width=400&height=400&text=${personalInfo.name.charAt(0)}&color=0070F3&textColor=FFFFFF`;
            }}
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Hi, I&apos;m {personalInfo.name}!
          </h3>
          <div className="space-y-4 text-lg">
            <p>{personalInfo.longBio.split('. ')[0]}.</p>
            <p>{personalInfo.longBio.split('. ').slice(1, 3).join('. ')}.</p>
            <p>{personalInfo.longBio.split('. ').slice(3).join('. ')}</p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-1">Location</h4>
                <p>{personalInfo.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-1">Email</h4>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="hover:text-primary transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
            <div className="mt-6">
              <ButtonLink 
                href={personalInfo.resumeUrl} 
                icon={FileText} 
                variant="secondary"
                external
              >
                Download Resume
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
} 