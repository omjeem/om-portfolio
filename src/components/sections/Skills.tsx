"use client";

import { useState } from "react";
import Image from "next/image";
import { getSkillsByCategory } from "@/lib/data";
import Section, { SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// Load data
const skillsByCategory = getSkillsByCategory();

// Get all categories
const categories = Object.keys(skillsByCategory);

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (skillId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [skillId]: true
    }));
  };

  return (
    <Section id="skills" background="alt">
      <SectionHeader 
        title="Technical Skills" 
        subtitle="The technologies and tools I specialize in"
      />
      
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-8">
        {activeCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skillsByCategory[activeCategory].map((skill) => (
              <div 
                key={skill.id} 
                className="bg-card-bg border border-card-border rounded-lg p-4 flex flex-col items-center text-center transition-transform hover:-translate-y-1"
              >
                {skill.icon && !imageErrors[skill.id] ? (
                  <div className="w-12 h-12 mb-4 relative">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="object-contain"
                      onError={() => handleImageError(skill.id)}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">
                      {skill.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="font-medium mb-2">{skill.name}</h3>
                <div className="w-full bg-foreground/10 h-1.5 rounded-full mt-2">
                  <div 
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {skill.proficiency}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
} 