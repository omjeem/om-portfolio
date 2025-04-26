import Link from "next/link";
import { getFooterNavigation, getPersonalInfo } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

// Load data
const navigation = getFooterNavigation();
const personalInfo = getPersonalInfo();

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-bg border-t border-card-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{personalInfo.name}</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              {personalInfo.bio}
            </p>
            <div className="flex space-x-4">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>{personalInfo.location}</li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
              {personalInfo.phone && (
                <li>
                  <a
                    href={`tel:${personalInfo.phone.replace(/\D/g, "")}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-card-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-foreground/60 mt-2 md:mt-0">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
} 