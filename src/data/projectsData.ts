import { Project } from '../types/project';

// Featured portfolio projects preserving exact details and copy
export const projectsData: Project[] = [
  {
    id: 'proj-hospital-roster',
    title: 'Hospital Doctor Duty Roster',
    category: 'Healthcare scheduling',
    badge: 'Live',
    role: 'Full-stack developer',
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
    id: 'proj-power-pulse',
    title: 'PowerPulse BD',
    category: 'Energy monitoring',
    badge: 'Live',
    role: 'Backend and dashboard developer',
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
    browserUrl: 'power-pulse-bd.vercel.app',
    demoUrl: 'https://power-pulse-bd.vercel.app/#/dashboard',
    githubUrl: 'https://github.com/EHMahi9?tab=repositories',
    isReversed: true
  },
  {
    id: 'proj-data-vault',
    title: 'Data Privacy Vault',
    category: 'Java security',
    badge: 'Academic',
    role: 'Java and OOP developer',
    problem: 'Sensitive user data needs controlled access, organization, and protection inside the application logic.',
    solution: 'A Java vault that applies encapsulation and HashMap-backed storage to organize protected user records.',
    features: [
      'Private internal storage through encapsulated methods',
      'User-to-data mapping with HashMap structures',
      'Security-focused OOP modeling and validation'
    ],
    technologies: ['Java', 'OOP', 'Encapsulation', 'HashMap'],
    image: '/assets/images/optimized/data-vault.webp',
    imageAlt: 'Data Privacy Vault project screenshot',
    browserUrl: 'java-security-system.local',
    demoUrl: '#contact',
    githubUrl: 'https://github.com/EHMahi9?tab=repositories',
    isDemoDisabled: true,
    isReversed: false
  },
  {
    id: 'proj-heliostrack',
    title: 'HeliosTrack',
    category: 'Full-Stack Energy Monitoring',
    badge: 'Live',
    role: 'Full-stack developer',
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
  },
  {
    id: 'proj-noboghat',
    title: 'NoboGhat',
    category: 'Logistics & Booking',
    badge: 'Live',
    role: 'Full-stack developer',
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
    isReversed: false
  },
  {
    id: 'proj-roadpulse',
    title: 'RoadPulse',
    category: 'System analysis and design',
    badge: 'Live',
    role: 'System analysis and design team member',
    problem: 'Commuters need reliable road-status information, while traffic authorities need one place to verify reports and publish timely alerts.',
    solution: 'A crowd-sourced traffic monitoring platform where verified incident reports update a color-coded live road map.',
    features: [
      'Guest map access plus role-based commuter, authority, and administrator workflows',
      'Incident reporting for accidents, congestion, blockages, hazards, and waterlogging',
      'Admin verification, public alerts, route advisory, and expiry of unverified reports'
    ],
    technologies: ['System Analysis', 'Leaflet', 'OpenStreetMap', 'Node.js', 'Express', 'MySQL'],
    browserUrl: 'roadpulse - traffic monitoring platform',
    demoUrl: 'https://road-pusle.vercel.app/',
    githubUrl: 'https://github.com/EHMahi9/RoadPusle-',
    isCustomMockup: true,
    isReversed: true
  }
];
