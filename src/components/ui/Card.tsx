import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
  className?: string;
  children: ReactNode;
  href?: string;
  hoverable?: boolean;
}

export function Card({
  className = "",
  children,
  href,
  hoverable = true,
}: CardProps) {
  const cardClasses = `
    bg-card-bg border border-card-border rounded-lg overflow-hidden
    ${hoverable ? "transition-transform hover:-translate-y-1 hover:shadow-md" : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {children}
      </Link>
    );
  }

  return <div className={cardClasses}>{children}</div>;
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait";
  className?: string;
}

export function CardImage({
  src,
  alt,
  aspectRatio = "auto",
  className = "",
}: CardImageProps) {
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <div className={`relative ${aspectRatioClasses[aspectRatio]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={(e) => {
          // Show fallback for missing images
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop
          
          // Create URL-friendly alt text for placeholder
          const placeholderText = alt.replace(/\s+/g, '-').substring(0, 20);
          target.src = `/api/placeholder?width=600&height=400&text=${placeholderText}&color=0070F3&textColor=FFFFFF`;
        }}
      />
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

export function CardHeader({
  className = "",
  children,
}: CardHeaderProps) {
  return <div className={`p-5 pb-0 ${className}`}>{children}</div>;
}

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

export function CardContent({
  className = "",
  children,
}: CardContentProps) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

export function CardTitle({
  className = "",
  children,
}: CardTitleProps) {
  return <h3 className={`text-xl font-bold mb-2 ${className}`}>{children}</h3>;
}

interface CardDescriptionProps {
  className?: string;
  children: ReactNode;
}

export function CardDescription({
  className = "",
  children,
}: CardDescriptionProps) {
  return (
    <p className={`text-muted-foreground ${className}`}>{children}</p>
  );
}

interface CardFooterProps {
  className?: string;
  children: ReactNode;
}

export function CardFooter({
  className = "",
  children,
}: CardFooterProps) {
  return (
    <div className={`px-5 py-4 border-t border-card-border mt-auto ${className}`}>
      {children}
    </div>
  );
} 