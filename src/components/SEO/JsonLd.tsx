"use client";

import { getPersonalInfo } from "@/lib/data";
import { PersonalInfo } from "@/types/interfaces";
import Script from "next/script";

interface JsonLdProps {
  type?: "Person" | "WebSite" | "Project" | "BreadcrumbList" | "Article";
  data?: any;
}

export default function JsonLd({ type = "Person", data }: JsonLdProps) {
  const personalInfo: PersonalInfo = getPersonalInfo();
  
  const getJsonLdData = () => {
    switch (type) {
      case "Person":
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          name: personalInfo.name,
          jobTitle: personalInfo.title,
          description: personalInfo.bio,
          email: personalInfo.email,
          telephone: personalInfo.phone,
          url: "https://omjeemishra.vercel.app",
          sameAs: [
            personalInfo.socialLinks.github,
            personalInfo.socialLinks.linkedin,
            personalInfo.socialLinks.twitter,
            ...(personalInfo.socialLinks.other?.map(link => link.url) || [])
          ].filter(Boolean),
          image: personalInfo.profileImage,
          address: {
            "@type": "PostalAddress",
            addressLocality: personalInfo.location.split(",")[0].trim(),
            addressRegion: personalInfo.location.split(",")[1]?.trim(),
            addressCountry: personalInfo.location.split(",")[2]?.trim()
          }
        };
      
      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: personalInfo.name,
          url: "https://omjeemishra.vercel.app",
          description: personalInfo.bio,
          author: {
            "@type": "Person",
            name: personalInfo.name
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://omjeemishra.vercel.app/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        };
      
      case "Project":
        if (!data) return null;
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: data.title,
          description: data.description,
          applicationCategory: "WebApplication",
          author: {
            "@type": "Person",
            name: personalInfo.name
          },
          datePublished: data.startDate,
          screenshot: data.imageUrls?.[0] || data.thumbnailUrl,
          url: data.liveUrl || "",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
          },
          operatingSystem: "Any",
          keywords: data.technologies.join(", ")
        };

      case "Article":
        if (!data) return null;
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.title,
          description: data.description,
          image: data.image,
          datePublished: data.publishDate,
          dateModified: data.modifiedDate || data.publishDate,
          author: {
            "@type": "Person",
            name: personalInfo.name,
          },
          publisher: {
            "@type": "Organization",
            name: personalInfo.name,
            logo: {
              "@type": "ImageObject",
              url: "https://omjeemishra.vercel.app/favicons/apple-touch-icon.png"
            }
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://omjeemishra.vercel.app${data.url || ''}`
          },
          keywords: data.keywords?.join(", ") || ""
        };
      
      case "BreadcrumbList":
        if (!data || !data.items) return null;
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://omjeemishra.vercel.app${item.url}`
          }))
        };
        
      default:
        return null;
    }
  };

  const jsonLdData = getJsonLdData();
  
  if (!jsonLdData) return null;

  return (
    <Script 
      id={`json-ld-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      strategy="afterInteractive"
    />
  );
} 