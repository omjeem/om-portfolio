"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  fallbackSrc?: string;
  caption?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  alt,
  fallbackSrc,
  caption,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isError, setIsError] = useState(false);

  // Handle image loading error
  const handleError = () => {
    if (fallbackSrc) {
      setIsError(true);
    }
  };

  return (
    <figure className="relative">
      <Image
        {...props}
        alt={alt} // Required for accessibility and SEO
        onError={handleError}
        src={isError && fallbackSrc ? fallbackSrc : props.src}
        priority={priority} // Loading priority for LCP images
        loading={priority ? "eager" : "lazy"} // Eager loading for important images, lazy for others
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"} // Responsive sizing
        className={`${props.className || ''} transition-opacity opacity-100 duration-500`}
      />
      {caption && (
        <figcaption className="text-sm text-center mt-2 text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
} 