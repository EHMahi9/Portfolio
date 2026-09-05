// Interface representing a single project case study
export interface Project {
  id: string;
  title: string;
  category: string;
  badge: string; // e.g. "Live", "Academic"
  role: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  image?: string; // WebP screenshot path in /assets/images/optimized/
  imageAlt?: string;
  browserUrl: string; // Simulated address in the browser bar
  demoUrl: string; // Live site or demo link
  githubUrl: string; // GitHub repository link
  isDemoDisabled?: boolean;
  isReversed?: boolean; // Alternates mockup/content placement
  isCustomMockup?: boolean; // True for RoadPulse pure CSS mockup
}
