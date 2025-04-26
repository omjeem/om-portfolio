import Image from "next/image";
import { getAllExperiences } from "@/lib/data";
import Section, { SectionHeader } from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";

// Load data - sort by most recent first
const experiences = getAllExperiences().sort((a, b) => {
  const dateA = new Date(a.startDate).getTime();
  const dateB = new Date(b.startDate).getTime();
  return dateB - dateA;
});

// Format date to display month and year
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader 
        title="Work Experience" 
        subtitle="My professional journey and the companies I've worked with"
      />
      
      <div className="mt-12 relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-card-border"></div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Content */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div 
                  className={`
                    bg-card-bg border border-card-border rounded-lg p-6 shadow-sm
                    ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}
                  `}
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.position}</h3>
                      <div className="flex items-center mt-1">
                        {exp.logoUrl && (
                          <div className="w-6 h-6 relative mr-2">
                            <Image
                              src={exp.logoUrl}
                              alt={exp.company}
                              fill
                              className="object-contain"
                              onError={(e) => {
                                // Show fallback for missing logo
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                const initials = exp.company
                                  .split(' ')
                                  .map(word => word[0])
                                  .join('')
                                  .substring(0, 2);
                                target.src = `/api/placeholder?width=200&height=200&text=${initials}&color=0070F3&textColor=FFFFFF`;
                              }}
                            />
                          </div>
                        )}
                        <p className="text-lg text-foreground/80">{exp.company}</p>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 text-muted-foreground">
                      <span>
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </span>
                      <div className="text-sm mt-1">{exp.location}</div>
                    </div>
                  </div>
                  
                  <p className="mb-4">{exp.description}</p>
                  
                  {exp.responsibilities && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        {exp.responsibilities.map((responsibility, i) => (
                          <li key={i} className="text-foreground/80">{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-foreground/80">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Timeline marker */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-4 md:translate-y-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
} 