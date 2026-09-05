// Interface representing an individual screenshot with accessibility metadata
export interface ProjectScreenshot {
  src: string;
  alt: string;
  label: string; // e.g. "Consultation Interface", "Architecture & Specs"
}

// Interface representing a single project case study
export interface Project {
  id: string;
  title: string;
  category: string;
  badge: string; // e.g. "Live", "Academic"
  featured?: boolean; // Flag to designate primary flagship project
  featuredLevel?: 'flagship' | 'featured';
  role: string;
  shortDescription?: string; // Concise one-line value proposition
  differentiator?: string; // Core architectural differentiator e.g. "LLM-free production generation"
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  image?: string; // WebP screenshot path in /assets/images/optimized/
  imageAlt?: string;
  screenshots?: ProjectScreenshot[]; // Optional user-switched supporting screenshots
  browserUrl: string; // Simulated address in the browser bar
  demoUrl: string; // Live site or demo link
  githubUrl: string; // GitHub repository link
  caseStudyUrl?: string; // Link to detailed case study or architecture docs
  isDemoDisabled?: boolean;
  isReversed?: boolean; // Alternates mockup/content placement
  isCustomMockup?: boolean; // True for RoadPulse pure CSS mockup
  // Case-study foundation fields (prepared for future case-study views)
  limitations?: string[];
  futureDirections?: string[];
}
