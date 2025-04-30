"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * HeroImage component for optimized hero images
 * - Uses priority loading for LCP (Largest Contentful Paint) optimization
 * - Implements responsive sizing
 * - Includes proper alt text for accessibility and SEO
 * - Handles image loading states
 */
export default function HeroImage({
  src,
  alt,
  width = 1200,
  height = 800,
  className = "",
  priority = true
}: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder blur image for better loading experience
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMEEQAFBhITITFBcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEh/9oADAMBAAIRAxEAPwCdaX0bncukqKvUNRTrT5inLm6O12A2gdvbkkg+7EsSxP/Z";

  // Use placeholder component during SSR to avoid hydration issues
  if (!mounted) {
    return (
      <div 
        className={`relative bg-muted ${className}`}
        style={{
          width: '100%',
          height: height || 'auto',
          aspectRatio: width && height ? width / height : undefined,
        }}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
} 