"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { getPersonalInfo } from "@/lib/data";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "framer-motion";

// Load data
const personalInfo = getPersonalInfo();

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR fallback
    return (
      <section className="min-h-[90vh] flex items-center">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {personalInfo.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                {personalInfo.headline}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">Hello, I&apos;m</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {personalInfo.headline}
            </p>
            <p className="text-lg mb-8 max-w-2xl">
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <ButtonLink href="/projects" icon={ArrowRight} iconPosition="right">
                View My Work
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Get in Touch
              </ButtonLink>
            </div>
            <div className="flex gap-4">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors p-2 rounded-full hover:bg-foreground/5"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors p-2 rounded-full hover:bg-foreground/5"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-foreground/70 hover:text-foreground transition-colors p-2 rounded-full hover:bg-foreground/5"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-card-border shadow-xl">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 280px, 400px"
                onError={(e) => {
                  // Show fallback for missing profile image
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite loop
                  target.src = `/api/placeholder?width=400&height=400&text=${personalInfo.name.charAt(0)}&color=0070F3&textColor=FFFFFF`;
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 