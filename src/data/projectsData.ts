import { Project } from '../types/project';

// Featured portfolio projects preserving exact details and copy
// Curated 4-project production lineup:
// 01. Dr. Md. Momenul Islam — FLAGSHIP
// 02. NoboGhat
// 03. Hospital Doctor Duty Roster
// 04. HeliosTrack
export const projectsData: Project[] = [
  {
    id: 'proj-dr-momenul',
    title: 'Dr. Md. Momenul Islam',
    category: 'Clinical Health Intelligence',
    badge: 'Live',
    featured: true,
    featuredLevel: 'flagship',
    role: 'Full-stack & ML systems developer',
    shortDescription: 'Evidence-grounded health information assistant for Bangla, Banglish, and English users.',
    differentiator: 'LLM-free production generation',
    problem: 'People increasingly use general-purpose AI systems for health questions, but free-form generation risks ungrounded hallucinations without transparent clinical sources.',
    solution: 'A safety-oriented medical information retrieval system built around trusted NHS clinical guidance, multilingual semantic retrieval, deterministic emergency triage, and transparent evidence cards.',
    features: [
      'Multilingual semantic retrieval across Bangla, Banglish, and English',
      'Curated NHS England knowledge base with 119 verified clinical passages',
      'Deterministic safety triage prioritizing emergency escalation over guidance',
      'LLM-free production pipeline eliminating ungrounded medical hallucinations'
    ],
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'RAG',
      'multilingual-e5-small',
      'bge-reranker-v2-m3'
    ],
    image: '/assets/images/optimized/ai-medical-assistant.webp',
    imageAlt: 'Dr. Md. Momenul Islam evidence-grounded health information assistant interface screenshot',
    screenshots: [
      {
        src: '/assets/images/optimized/ai-medical-assistant.webp',
        alt: 'Dr. Md. Momenul Islam evidence-grounded health information assistant consultation interface screenshot',
        label: 'Assistant Interface'
      },
      {
        src: '/assets/images/optimized/ai-medical-specs.webp',
        alt: 'Dr. Md. Momenul Islam system architecture and clinical specifications modal screenshot',
        label: 'Architecture & Specs'
      }
    ],
    browserUrl: 'drmomenul.vercel.app',
    demoUrl: 'https://drmomenul.vercel.app',
    githubUrl: 'https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam',
    caseStudyUrl: '/projects/dr-momenul-islam',
    isReversed: false,
    limitations: [
      'Medical knowledge base is limited to the active curated corpus',
      'NHS source passages are preserved in original English',
      'Generative LLM output is disabled to eliminate hallucination risk',
      'System is an information/education prototype, not an EHR or doctor replacement'
    ],
    futureDirections: [
      'Optional authentication and cross-device synchronization (Future)',
      'Optional cloud backup for user session history (Future)',
      'Expanded medical source governance across verified institutions (Future)',
      'Constrained, evidence-bound generation with strict provenance verification (Future)'
    ]
  },
  {
    id: 'proj-noboghat',
    title: 'NoboGhat',
    category: 'Logistics & Booking',
    badge: 'Live',
    role: 'Full-stack developer',
    shortDescription: 'Decoupled inland waterway logistics platform with live cargo capacity tracking and role-based booking.',
    differentiator: 'Live capacity tracking',
    problem: 'Inland waterway cargo transport suffers from manual booking, hidden pricing, and no real-time capacity tracking for small traders.',
    solution: 'A decoupled Spring Boot and MySQL backend serving a vanilla JS frontend for role-based boat management, route discovery, and capacity-aware cargo booking.',
    features: [
      'Role-based access control for Farmers, Traders, and Boat Owners',
      'Live cargo capacity tracking to mathematically prevent overbooking',
      'Stateless JWT authentication with secure BCrypt password hashing'
    ],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'JavaScript', 'JWT'],
    image: '/assets/images/optimized/noboghat-dashboard.webp',
    imageAlt: 'NoboGhat inland waterway logistics platform dashboard',
    browserUrl: 'noboghatbangladesh.vercel.app',
    demoUrl: 'https://noboghatbangladesh.vercel.app/',
    githubUrl: 'https://github.com/EHMahi9/NoboGhat-Bangladesh',
    isReversed: true
  },
  {
    id: 'proj-hospital-roster',
    title: 'Hospital Doctor Duty Roster',
    category: 'Healthcare scheduling',
    badge: 'Live',
    role: 'Full-stack developer',
    shortDescription: 'Role-based healthcare scheduling platform with staff dashboards, conflict resolution, and persistent shift data.',
    differentiator: 'Automated shift conflict detection',
    problem: 'Manual duty planning creates avoidable conflicts, unclear availability, and slow schedule updates.',
    solution: 'A role-based scheduling application with staff dashboards, leave workflows, secure auth, and persistent shift data.',
    features: [
      'JWT authentication and role-aware access',
      'Doctor scheduling and leave management',
      'PostgreSQL-backed data model with migrations'
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
    image: '/assets/images/optimized/roster-dashboard.webp',
    imageAlt: 'Hospital Doctor Duty Roster dashboard screenshot',
    browserUrl: 'hospital-doctor-duty-roster.vercel.app',
    demoUrl: 'https://hospital-doctor-duty-roster.vercel.app/',
    githubUrl: 'https://github.com/EHMahi9?tab=repositories',
    isReversed: false
  },
  {
    id: 'proj-heliostrack',
    title: 'HeliosTrack',
    category: 'Solar monitoring system',
    badge: 'Live',
    role: 'Full-stack developer',
    shortDescription: 'Real-time solar array monitoring dashboard with live WebSocket telemetry and virtual battery analytics.',
    differentiator: 'Sub-second WebSocket telemetry',
    problem: 'Monitoring distributed solar arrays requires real-time data visualization, reliable cloud storage, and immediate alerting without layout shifts or system crashes.',
    solution: 'An enterprise-grade dashboard featuring live WebSocket streaming, an interactive Chart.js grid, and a virtual battery controller powered by a Node.js backend and Aiven MySQL.',
    features: [
      'Real-time data streaming via Socket.io with dynamic UI updates',
      'Custom Virtual Battery logic, ROI calculator, and floating toast alerts',
      'Render-hosted Node.js API with Aiven Cloud MySQL integration'
    ],
    technologies: ['JavaScript', 'Node.js', 'WebSockets', 'MySQL', 'Chart.js'],
    image: '/assets/images/optimized/heliostrack-dashboard.webp',
    imageAlt: 'HeliosTrack distributed solar fleet monitoring dashboard screenshot',
    browserUrl: 'heliostrack.vercel.app',
    demoUrl: 'https://helios-track-distributed-solar-moni.vercel.app/',
    githubUrl: 'https://github.com/EHMahi9/HeliosTrack---Distributed-Solar-Monitoring-System',
    isReversed: true
  }
];

// Preserved archive of PowerPulse BD (superseded by HeliosTrack)
export const archivedProjects: Project[] = [
  {
    id: 'proj-power-pulse',
    title: 'PowerPulse BD',
    category: 'Energy monitoring',
    badge: 'Live',
    role: 'Backend and dashboard developer',
    shortDescription: 'Modular Node.js and Express dashboard for solar calculations, battery metrics, outage logs, and visual reports.',
    differentiator: 'Outage & solar feed analytics',
    problem: 'Energy data is difficult to interpret without clear status views, metrics, and outage context.',
    solution: 'A modular Node.js and Express dashboard for solar calculations, battery metrics, outage logs, and visual reports.',
    features: [
      'Service-oriented API routes for energy data',
      'Solar output and battery status visualization',
      'Dashboard, feed, admin, and report views'
    ],
    technologies: ['Node.js', 'Express', 'Vanilla JS', 'REST API', 'Chart.js'],
    image: '/assets/images/optimized/powerpulse-status.webp',
    imageAlt: 'PowerPulse BD energy status dashboard screenshot',
    screenshots: [
      {
        src: '/assets/images/optimized/powerpulse-status.webp',
        alt: 'PowerPulse BD live energy status dashboard and regional outage feed screenshot',
        label: 'Energy Status'
      },
      {
        src: '/assets/images/optimized/solar-monitor.webp',
        alt: 'PowerPulse BD solar backup estimator and calculation engine interface screenshot',
        label: 'Solar Estimator'
      }
    ],
    browserUrl: 'power-pulse-bd.vercel.app',
    demoUrl: 'https://power-pulse-bd.vercel.app/#/dashboard',
    githubUrl: 'https://github.com/EHMahi9?tab=repositories',
    isReversed: true
  }
];
