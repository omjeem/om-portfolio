"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  fullWidth?: boolean;
}

export interface ButtonProps
  extends BaseButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

export interface ButtonLinkProps extends BaseButtonProps {
  href: string;
  external?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/20",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 focus:ring-2 focus:ring-secondary/20",
  outline:
    "bg-transparent border border-foreground/20 text-foreground hover:bg-foreground/5 focus:ring-2 focus:ring-foreground/10 dark:border-white/20 dark:text-white/90",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/5 focus:ring-2 focus:ring-foreground/10 dark:text-white/90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5 rounded-md",
  md: "px-4 py-2 rounded-md",
  lg: "text-lg px-6 py-2.5 rounded-lg",
};

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      className = "",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-medium transition-colors
          focus:outline-none disabled:opacity-50 disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon className="mr-2" size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className="ml-2" size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />
        )}
      </button>
    );
  }
);
ButtonComponent.displayName = "Button";

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      href,
      external = false,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      className = "",
      fullWidth = false,
      asChild,
      children,
      ...props
    },
    ref
  ) => {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    const buttonClass = `
      inline-flex items-center justify-center font-medium transition-colors
      focus:outline-none disabled:opacity-50 disabled:pointer-events-none
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${fullWidth ? "w-full" : ""}
      shadow-md dark:shadow-primary/20 font-medium btn-primary
      ${className}
    `;

    return (
      <Link
        href={href}
        className={buttonClass}
        {...linkProps}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon className="mr-2" size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className="ml-2" size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />
        )}
      </Link>
    );
  }
);
ButtonLink.displayName = "ButtonLink";

export { ButtonComponent as Button, ButtonLink }; 