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
    title: 'Dr. Md. Momenul Islam Health Assistant',
    category: 'Evidence-Grounded Health Assistant (Research Prototype)',
    badge: 'Research Prototype',
    featured: true,
    featuredLevel: 'flagship',
    role: 'Creator & Developer • In memory of Dr. Md. Momenul Islam',
    shortDescription: 'Evidence-grounded health information assistant prototype built in memory of Dr. Md. Momenul Islam (retrieval pipeline runs in local high-memory environment).',
    differentiator: 'Deterministic rule-based retrieval',
    problem: 'People increasingly use general-purpose AI systems for health questions, but free-form generation risks ungrounded hallucinations without transparent clinical sources.',
    solution: 'A safety-oriented medical information retrieval system built around trusted NHS clinical guidance, multilingual semantic retrieval, deterministic emergency triage, and transparent evidence cards. (Note: High-memory retrieval pipeline runs in local environment; web deployment provides full interface and triage walkthrough).',
    features: [
      'Deterministic rule-based medical retrieval strictly refusing to answer outside trusted sources',
      'Curated NHS England knowledge base with 119 verified clinical passages',
      'Multilingual semantic retrieval across Bangla, Banglish, and English',
      'Deterministic evidence retrieval with source citation verification and zero generative hallucination risk'
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
    ],
    challenges: [
      'Eliminating generative AI hallucinations in medical queries through deterministic NHS source retrieval.',
      'Normalizing and embedding phonetically transliterated Banglish (e.g., \'matha betha\', \'jor\') alongside formal English.',
      'Managing heavy memory and compute requirements for cross-encoder rerankers on free cloud hosting.'
    ],
    futurePlans: [
      'Expanding verified source governance to localized Bangladesh clinical guidance and hospital advisories.',
      'Quantizing embedding models (INT8/ONNX) to enable lightweight serverless inference under 512MB RAM.',
      'Adding voice speech-to-text queries in Bangla for non-literate community users.'
    ]
  },
  {
    id: 'proj-noboghat',
    title: 'NoboGhat',
    category: 'Logistics & Booking',
    badge: 'Live',
    role: 'Full-stack developer',
    shortDescription: 'Decoupled inland waterway logistics platform with live cargo capacity tracking and role-based booking.',
    differentiator: 'Row-locked cargo capacity tracking',
    problem: 'Inland waterway cargo transport suffers from manual booking, hidden pricing, and no real-time capacity tracking for small traders.',
    solution: 'A decoupled architecture featuring a Next.js frontend and Spring Boot / MySQL backend for role-based boat management, route discovery, and capacity-aware cargo booking.',
    features: [
      'Database row locking on bookings to prevent overfilling boats',
      'Role-based access control for Farmers, Boat Owners, and Admins',
      'Bilingual interface (Bangla and English) with simulated payment workflows',
      'Stateless JWT authentication with secure BCrypt password hashing'
    ],
    technologies: ['Next.js', 'React', 'Java', 'Spring Boot', 'MySQL', 'JWT'],
    image: '/assets/images/optimized/noboghat-dashboard.webp',
    imageAlt: 'NoboGhat inland waterway logistics platform dashboard',
    browserUrl: 'noboghatbangladesh.vercel.app',
    demoUrl: 'https://noboghatbangladesh.vercel.app/',
    githubUrl: 'https://github.com/EHMahi9/NoboGhat-Bangladesh',
    isReversed: true,
    challenges: [
      'Preventing race-condition cargo overbooking using pessimistic database hold locking across concurrent requests.',
      'Enforcing strict multi-tenant isolation so farmers, traders, and boat operators cannot access each other\'s consignments.',
      'Engineering a decoupled Next.js API Gateway that proxies and fails over to the Java/Spring Boot backend.'
    ],
    futurePlans: [
      'Real-time vessel GPS tracking using AIS and IoT water telemetry.',
      'Automated offline SMS waybill delivery notifications for remote ghats with low network connectivity.',
      'Integrated river weather radar alerts for seasonal storm and monsoon warnings.'
    ]
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
      'Constraint-based scheduling algorithm with fairness scoring and tests',
      'Role-based staff dashboards and leave management workflows',
      'PostgreSQL relational data model with automated test suite'
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
    image: '/assets/images/optimized/roster-dashboard.webp',
    imageAlt: 'Hospital Doctor Duty Roster dashboard screenshot',
    browserUrl: 'hospital-doctor-duty-roster.vercel.app',
    demoUrl: 'https://hospital-doctor-duty-roster.vercel.app/',
    githubUrl: 'https://github.com/EHMahi9/hospital-doctor-duty-roster',
    isReversed: false,
    challenges: [
      'Designing conflict-free shift scheduling algorithms accounting for leave requests, emergency coverage, and fair shift distribution.',
      'Enforcing role-based access control and persistent PostgreSQL database migrations for departmental staff data.',
      'Containerizing full-stack Python/FastAPI backend and React frontend with multi-stage Docker builds.'
    ],
    futurePlans: [
      'Automated AI-assisted roster generation using Constraint Satisfaction Problem (CSP) solvers.',
      'Push notification alerts via WebSockets for urgent shift swap requests and coverage.',
      'Exporting monthly departmental roster schedules directly to PDF, Excel, and Google Calendar.'
    ]
  },
  {
    id: 'proj-heliostrack',
    title: 'HeliosTrack',
    category: 'Solar monitoring system',
    badge: 'Live',
    role: 'Full-stack developer',
    shortDescription: 'Real-time solar array monitoring dashboard with live WebSocket telemetry and virtual battery analytics.',
    differentiator: 'Live Socket.io telemetry (5s intervals)',
    problem: 'Monitoring distributed solar arrays requires real-time data visualization, reliable cloud storage, and immediate alerting without layout shifts or system crashes.',
    solution: 'An enterprise-grade dashboard featuring live WebSocket streaming, an interactive Chart.js grid, and a virtual battery controller powered by a Node.js backend and Aiven MySQL.',
    features: [
      'Live Socket.io telemetry updates streamed every 5 seconds',
      'JWT authentication with BCrypt password hashing and login rate limiting',
      'Simulated IoT solar sensor telemetry (voltage, current, and battery metrics)',
      'Interactive Chart.js real-time visualization with Aiven Cloud MySQL storage'
    ],
    technologies: ['JavaScript', 'Node.js', 'WebSockets', 'MySQL', 'Chart.js'],
    image: '/assets/images/optimized/heliostrack-dashboard.webp',
    imageAlt: 'HeliosTrack distributed solar fleet monitoring dashboard screenshot',
    browserUrl: 'helios-track-distributed-solar-moni.vercel.app',
    demoUrl: 'https://helios-track-distributed-solar-moni.vercel.app/',
    githubUrl: 'https://github.com/EHMahi9/HeliosTrack---Distributed-Solar-Monitoring-System',
    isReversed: true,
    challenges: [
      'Streaming high-frequency WebSocket telemetry to Chart.js without UI memory leaks or frame rate stutters.',
      'Simulating realistic IoT hardware sensor data (voltage, current, power) via background Node.js child processes.',
      'Implementing automatic client-side reconnection and state resynchronization over unstable network connections.'
    ],
    futurePlans: [
      'Machine learning time-series energy forecasting based on next-day meteorological weather forecasts.',
      'Direct physical hardware integration via Modbus/RS485 inverter protocol adapters.',
      'Automated Telegram and WhatsApp emergency alert notifications on critical voltage drop detection.'
    ]
  }
];

// Preserved archive of PowerPulse BD (superseded by HeliosTrack)
export const archivedProjects: Project[] = [];

// Preserved reference (unlisted from active showcase)
export const unlistedPowerPulse: Project = {
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
    githubUrl: 'https://github.com/EHMahi9/Power-Pulse-Bd',
    isReversed: true
};
