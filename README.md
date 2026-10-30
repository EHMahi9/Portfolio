# Ebnul Hasan Mahi — Software Engineering Portfolio

A modern, production-grade developer portfolio for **Ebnul Hasan Mahi**, a Software Engineering student and Full-Stack Developer based in Dhaka, Bangladesh.

Built with **React 18, TypeScript, and Vite**, designed with an emphasis on systems architecture, production engineering, performance, accessibility, and clean product presentation.

---

## Featured Engineering Projects

### 1. [Dr. Md. Momenul Islam](/assets/media/flagship-demo.mp4) *(Flagship)*
- **Domain**: Clinical Health Intelligence & Retrieval Systems
- **Core Stack**: React, TypeScript, FastAPI, multilingual-e5-small, bge-reranker-v2-m3
- **Summary**: An evidence-grounded health information assistant designed for Bangla, Banglish, and English users. Features an LLM-free production retrieval pipeline over verified NHS England clinical guidance, deterministic safety triage, and transparent evidence cards. Includes a dedicated in-app engineering case study with interactive system architecture tabs, query lifecycles, latency breakdowns, and safety matrices.

### 2. [NoboGhat](https://noboghatbangladesh.vercel.app/)
- **Domain**: Logistics & Booking Platform
- **Core Stack**: Java, Spring Boot, MySQL, JavaScript, JWT
- **Summary**: Decoupled inland waterway logistics platform with live cargo capacity tracking to mathematically prevent overbooking, role-based access control (Farmers, Traders, Boat Owners), and stateless JWT authentication.

### 3. [Hospital Doctor Duty Roster](https://hospital-doctor-duty-roster.vercel.app/)
- **Domain**: Healthcare Operations & Scheduling
- **Core Stack**: React, TypeScript, FastAPI, PostgreSQL, Docker
- **Summary**: Production scheduling system featuring automated shift conflict detection, leave management workflows, and PostgreSQL relational schema with migrations.

### 4. [HeliosTrack](https://helios-track-distributed-solar-moni.vercel.app/)
- **Domain**: Distributed Solar Fleet Monitoring
- **Core Stack**: JavaScript, Node.js, WebSockets (Socket.io), MySQL, Chart.js
- **Summary**: Real-time solar array monitoring dashboard with sub-second WebSocket telemetry, virtual battery controller, dynamic Chart.js analytics, and floating toast alert pipelines.

### Supporting Work: [PowerPulse BD](https://power-pulse-bd.vercel.app/#/dashboard)
- **Domain**: Energy Monitoring & Calculations
- **Core Stack**: Node.js, Express, Vanilla JS, REST API, Chart.js
- **Summary**: Modular dashboard for regional power outage feeds and a solar backup battery calculation engine.

---

## Technical Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite
- **Typography**: Inter (Body & Headings) + JetBrains Mono (Technical Data & Badges) via Google Fonts with zero-FOUC preconnects
- **Styling**: Modern CSS Design System (Custom Properties, BEM-inspired modularity, dark/light theme tokens, responsive clamp-based typography)
- **Visuals**: Flat, straight, orthogonal browser mockups with interactive screenshot switchers (no skewed 3D tilt or artificial distortion)
- **Stability**: Subpixel-anchored character slot glitch decryption effect with 0.00px layout shift
- **Routing**: Zero-dependency declarative history router supporting `/` and `/projects/dr-momenul-islam` case study
- **Deployment**: Vercel static hosting with strict Content Security Policy (CSP) and security headers

---

## Development & Verification

### Prerequisites
- Node.js (v18+)
- npm

### Commands

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Run automated portfolio verification checks
npm test

# Type-check and produce production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## License & Attribution

Designed and developed by **Ebnul Hasan Mahi**.
All project trademarks, clinical guidance references, and brand assets are property of their respective creators.