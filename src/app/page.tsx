"use client";

import { getActiveSections } from '@/lib/data';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

// Get active sections configuration
const activeSections = getActiveSections();

export default function Home() {
  return (
    <>
      {/* Hero section is always shown */}
      <Hero />
      
      {/* Conditionally render sections based on configuration */}
      {activeSections.about && <About />}
      {activeSections.projects && <Projects />}
      {activeSections.skills && <Skills />}
      {activeSections.experience && <Experience />}
      {activeSections.education && <Education />}
      {activeSections.contact && <Contact />}
    </>
  );
}
