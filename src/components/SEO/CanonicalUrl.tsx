"use client";

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface CanonicalUrlProps {
  path?: string;
}

/**
 * CanonicalUrl component for setting the canonical URL for SEO
 * This helps prevent duplicate content issues by specifying the preferred URL
 */
export default function CanonicalUrl({ path }: CanonicalUrlProps) {
  const pathname = usePathname();
  const baseUrl = "https://omjeemishra.vercel.app";
  const canonicalPath = path || pathname || '';
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
} 