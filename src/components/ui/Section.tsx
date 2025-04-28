import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  background?: "default" | "alt";
}

export default function Section({
  id,
  className = "",
  children,
  background = "default",
}: SectionProps) {
  const bgClass = background === "alt" ? "bg-card-bg" : "bg-background";

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${bgClass} ${className}`}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-start text-center mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
} 