import Image from "next/image";
import { getEducation } from "@/lib/data";
import Section, { SectionHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

// Load data
const education = getEducation();

// Format date to display month and year
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Education() {
  return (
    <Section id="education" background="alt">
      <SectionHeader 
        title="Education & Certifications" 
        subtitle="My academic background and professional certifications"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {education.map((edu) => (
          <Card key={edu.id} className="flex flex-col h-full">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                {edu.logoUrl && (
                  <div className="w-16 h-16 relative flex-shrink-0 bg-white rounded-md p-2">
                    <Image
                      src={edu.logoUrl}
                      alt={edu.institution}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // Show fallback for missing logo
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        const initials = edu.institution
                          .split(' ')
                          .map(word => word[0])
                          .join('')
                          .substring(0, 2);
                        target.src = `/api/placeholder?width=200&height=200&text=${initials}&color=0070F3&textColor=FFFFFF`;
                      }}
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-lg">{edu.institution}</p>
                  <p className="text-muted-foreground">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {edu.location}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-foreground/80 mb-4">{edu.field}</p>
                {edu.description && (
                  <p className="text-foreground/80 mb-4">{edu.description}</p>
                )}
                
                {edu.achievements && edu.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-foreground/80">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
} 