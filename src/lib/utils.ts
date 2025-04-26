import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function for conditionally joining class names together.
 * Combines clsx for conditional classes with tailwind-merge to handle conflicting Tailwind classes.
 * 
 * @param inputs - Class values to be conditionally joined
 * @returns A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string.
 * 
 * @param dateString - Date string in ISO format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string, 
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

/**
 * Truncate a string to a specified length and add ellipsis if needed.
 * 
 * @param str - String to truncate
 * @param length - Maximum length before truncation
 * @returns Truncated string
 */
export function truncate(str: string, length: number): string {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
} 