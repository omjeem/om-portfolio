"use client";

import { useState } from "react";
import { getPersonalInfo } from "@/lib/data";
import Section, { SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";

// Load data
const personalInfo = getPersonalInfo();

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitResult({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    });

    // Reset form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Section id="contact">
      <SectionHeader 
        title="Get In Touch" 
        subtitle="Have a question or want to work together? Feel free to reach out!"
        centered
        className="flex flex-col items-center text-center"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Location</h4>
                <p className="text-foreground/80">{personalInfo.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Linkedin size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">LinkedIn</h4>
                <a 
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Github size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">GitHub</h4>
                <a 
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-card-border rounded-md bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-card-border rounded-md bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-card-border rounded-md bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-card-border rounded-md bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            
            <div>
              <Button
                type="submit"
                icon={Send}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
            
            {submitResult && (
              <div 
                className={`p-4 rounded-md ${
                  submitResult.success 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {submitResult.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
} 