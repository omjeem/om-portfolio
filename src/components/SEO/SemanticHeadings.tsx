"use client";

import React from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * SemanticHeading - A component to create properly structured headings 
 * for better SEO and accessibility
 */
export default function SemanticHeading({ 
  level, 
  id, 
  className = "",
  children 
}: HeadingProps) {
  // Set default classes based on heading level
  const defaultClasses = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
    2: "text-3xl md:text-4xl font-bold mb-5",
    3: "text-2xl md:text-3xl font-semibold mb-4",
    4: "text-xl md:text-2xl font-semibold mb-3",
    5: "text-lg md:text-xl font-medium mb-2",
    6: "text-base md:text-lg font-medium mb-2"
  };
  
  // Generate a slug ID if not provided
  const headingId = id || (typeof children === 'string' 
    ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    : undefined);
  
  // Combine default classes with custom classes
  const headingClasses = `${defaultClasses[level]} ${className}`;

  // Render the appropriate heading level with consistent styling
  switch (level) {
    case 1:
      return <h1 id={headingId} className={headingClasses}>{children}</h1>;
    case 2:
      return <h2 id={headingId} className={headingClasses}>{children}</h2>;
    case 3:
      return <h3 id={headingId} className={headingClasses}>{children}</h3>;
    case 4:
      return <h4 id={headingId} className={headingClasses}>{children}</h4>;
    case 5:
      return <h5 id={headingId} className={headingClasses}>{children}</h5>;
    case 6:
      return <h6 id={headingId} className={headingClasses}>{children}</h6>;
    default:
      return <h2 id={headingId} className={headingClasses}>{children}</h2>;
  }
} 