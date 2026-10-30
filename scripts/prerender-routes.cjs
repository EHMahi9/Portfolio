const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[prerender-routes] dist/index.html not found! Aborting.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Case Study Rich Semantic Static HTML
const caseStudyHtmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem 1.25rem; line-height: 1.65; color: #1e293b;">
  <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
    <p style="text-transform: uppercase; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; color: #0284c7; margin-bottom: 0.5rem;">Flagship Engineering Case Study</p>
    <h1 style="font-size: 2.25rem; line-height: 1.2; color: #0f172a; margin: 0 0 1rem;">Dr. Md. Momenul Islam Health Assistant</h1>
    <p style="font-size: 1.15rem; color: #475569; margin: 0 0 1.25rem;">
      Evidence-grounded medical information retrieval assistant prototype with multilingual semantic retrieval, deterministic safety triage, and zero ungrounded generative hallucinations.
    </p>
    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
      <a href="https://drmomenul.vercel.app" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600;">Launch Live Prototype ↗</a>
      <a href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View GitHub Repository ↗</a>
      <a href="/" style="display: inline-block; background: transparent; color: #475569; padding: 0.6rem 1rem; text-decoration: none; font-weight: 600;">← Back to Portfolio</a>
    </div>
    <p style="font-size: 0.85rem; color: #64748b; background: #f8fafc; border-left: 3px solid #0284c7; padding: 0.75rem 1rem; margin: 1rem 0 0;">
      <strong>Memorial &amp; Clinical Disclaimer:</strong> Built in memory of Dr. Md. Momenul Islam. Not affiliated with or endorsed by any clinician, health service, or medical regulatory body. This system is an educational and research prototype, not a medical device or diagnostic tool.
    </p>
  </header>

  <section style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.5rem; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">1. Problem &amp; Core Motivation</h2>
    <p>
      General-purpose generative AI chatbots (such as raw LLMs) present acute safety hazards in medical contexts: they generate plausible-sounding medical advice that frequently hallucinates ungrounded treatments, ignores emergency triage protocols, and lacks verifiable clinical source citations.
    </p>
    <p>
      In regions like Bangladesh, where access to verified clinical guidance is constrained and multilingual queries in Bangla and phonetically transliterated "Banglish" are ubiquitous, relying on unconstrained generative models can lead to dangerous delays in acute medical emergencies.
    </p>
  </section>

  <section style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.5rem; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">2. System Architecture &amp; RAG Pipeline</h2>
    <p>
      The system deliberately decouples retrieval from generative synthesis, operating an <strong>LLM-free deterministic answering architecture</strong>:
    </p>
    <ul style="padding-left: 1.5rem;">
      <li><strong>Verified Knowledge Base:</strong> 119 verified clinical passages curated from NHS England guidance covering primary care, symptoms, and red-flag conditions.</li>
      <li><strong>Dense Multilingual Embeddings:</strong> Utilizes <code>multilingual-e5-small</code> (384-dimensional dense vectors) to compute symmetric cosine similarity across English, Bangla, and Banglish token spaces.</li>
      <li><strong>Cross-Encoder Reranking:</strong> Retrieved candidate passages pass through <code>bge-reranker-v2-m3</code> for joint query-passage attention, filtering irrelevant matches.</li>
      <li><strong>Deterministic Emergency Triage:</strong> A rule-based clinical safety layer intercepts critical emergency keywords (e.g., crushing chest pain, acute shortness of breath, sudden hemiparesis) and immediately surfaces emergency hospital contact protocols without waiting for search retrieval.</li>
      <li><strong>100% Transparent Citation Grounding:</strong> Every response displays the exact NHS source passage, clinical category, and source link. Generative text generation is disabled by design to eliminate hallucination risk.</li>
    </ul>
  </section>

  <section style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.5rem; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">3. Engineering Challenges &amp; Solutions</h2>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin-top: 0;">Challenge A: High-Memory Inference on Constrained Hosting</h3>
      <p style="margin: 0; color: #334155;">
        Cross-encoder rerankers require significant memory (&gt;4GB RAM), which exceeds free serverless cloud limits. To resolve this, the architecture was partitioned: the high-memory retrieval and vector pipeline executes in a dedicated local environment, while the client interface, emergency triage logic, and interactive specifications are deployed to Vercel for public walkthrough.
      </p>
    </div>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin-top: 0;">Challenge B: Phonetic Banglish Normalization</h3>
      <p style="margin: 0; color: #334155;">
        Users frequently search in transliterated phonetic Banglish (e.g. <em>"matha betha"</em> for headache, <em>"buk e betha"</em> for chest pain). The retrieval engine applies phonetic normalization rules before embedding, mapping common phonetic variations into verified clinical symptom vectors.
      </p>
    </div>
  </section>

  <section style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.5rem; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">4. Empirical Verification &amp; Test Suite</h2>
    <p>All reported metrics reflect automated test runs executed against the project repository:</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1rem 0;">
      <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; text-align: center;">
        <strong style="font-size: 1.75rem; color: #0284c7; display: block;">39 / 39</strong>
        <span style="font-size: 0.85rem; color: #475569;">Backend &amp; API Tests Passed</span>
      </div>
      <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; text-align: center;">
        <strong style="font-size: 1.75rem; color: #0284c7; display: block;">12 / 12</strong>
        <span style="font-size: 0.85rem; color: #475569;">Frontend Storage Tests</span>
      </div>
      <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; text-align: center;">
        <strong style="font-size: 1.75rem; color: #0284c7; display: block;">5 / 5</strong>
        <span style="font-size: 0.85rem; color: #475569;">Emergency Safety Flows</span>
      </div>
      <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; text-align: center;">
        <strong style="font-size: 1.75rem; color: #0284c7; display: block;">100%</strong>
        <span style="font-size: 0.85rem; color: #475569;">Citation Grounding Rate</span>
      </div>
    </div>
  </section>

  <section style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.5rem; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">5. Technology Stack</h2>
    <ul style="padding-left: 1.5rem;">
      <li><strong>Frontend:</strong> React 18, TypeScript, Vite, Responsive CSS, Web Accessibility (WCAG compliant)</li>
      <li><strong>Backend &amp; API:</strong> FastAPI, Python 3.10, RESTful endpoints, CORS middleware</li>
      <li><strong>Vector Search &amp; RAG:</strong> sentence-transformers (multilingual-e5-small), Cross-Encoder (bge-reranker-v2-m3)</li>
      <li><strong>Data &amp; Evaluation:</strong> Curated NHS England corpus (119 verified clinical passages), pytest automated suite</li>
    </ul>
  </section>

  <footer style="border-top: 1px solid #e2e8f0; padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
    <a href="/" style="color: #0284c7; font-weight: 600; text-decoration: none;">← Return to Ebnul Hasan Mahi's Portfolio</a>
    <div>
      <a href="https://drmomenul.vercel.app" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600; text-decoration: none; margin-right: 1.5rem;">Live Demo ↗</a>
      <a href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600; text-decoration: none;">GitHub ↗</a>
    </div>
  </footer>
</div>
`;

// Resume Rich Semantic Static HTML
const resumeHtmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 860px; margin: 0 auto; padding: 2rem 1.25rem; line-height: 1.65; color: #1e293b;">
  <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
    <h1 style="font-size: 2.25rem; color: #0f172a; margin: 0 0 0.5rem;">Ebnul Hasan Mahi</h1>
    <p style="font-size: 1.1rem; font-weight: 600; color: #0284c7; margin: 0 0 0.75rem;">Full-Stack Developer &amp; Software Engineering Student</p>
    <p style="font-size: 0.95rem; color: #475569; margin: 0 0 1rem;">
      <a href="mailto:ebnulhasanmahi001@gmail.com" style="color: #0284c7;">ebnulhasanmahi001@gmail.com</a> •
      <a href="tel:+8801879450876" style="color: #0284c7;">+880 1879 450 876</a> •
      <a href="https://www.linkedin.com/in/ebnul-hasan-mahi/" target="_blank" rel="noopener noreferrer" style="color: #0284c7;">LinkedIn</a> •
      <a href="https://github.com/EHMahi9" target="_blank" rel="noopener noreferrer" style="color: #0284c7;">GitHub</a> •
      <a href="https://www.ebnulhasanmahi.me" style="color: #0284c7;">ebnulhasanmahi.me</a>
    </p>
    <a href="/assets/documents/resume.pdf" download="Ebnul_Hasan_Mahi_Resume.pdf" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">⬇ Download Resume PDF</a>
  </header>

  <section style="margin-bottom: 1.75rem;">
    <h2 style="font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Professional Summary</h2>
    <p style="margin: 0.5rem 0 0; color: #334155;">
      Software engineering student (CGPA: 3.67) building structured web applications with TypeScript, Next.js, React, and MongoDB, actively expanding backend capabilities in Express. Grounded in defensive engineering principles, role-based authorization, and core computer science fundamentals. Committed to clean architecture, reliable fundamentals, and practical software design.
    </p>
  </section>

  <section style="margin-bottom: 1.75rem;">
    <h2 style="font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Technical Skills</h2>
    <ul style="padding-left: 1.25rem; margin: 0.5rem 0 0; color: #334155;">
      <li><strong>Core Full-Stack:</strong> TypeScript, Next.js, React.js, MongoDB, Express.js (In Progress), JavaScript (ES6+), Tailwind CSS</li>
      <li><strong>Defensive Engineering &amp; Backend:</strong> Role-Based Authorization (RBAC), Input Validation, JWT, RESTful APIs, Node.js</li>
      <li><strong>Databases:</strong> MongoDB, MySQL, PostgreSQL</li>
      <li><strong>CS Foundations &amp; Tools:</strong> Data Structures &amp; Algorithms, Object-Oriented Programming (Java, C/C++), Git, GitHub, Postman, Vite, Vercel</li>
    </ul>
  </section>

  <section style="margin-bottom: 1.75rem;">
    <h2 style="font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Featured Projects</h2>
    
    <div style="margin-top: 1rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0;">Dr. Md. Momenul Islam Health Assistant <span style="font-weight: 400; font-size: 0.9rem; color: #64748b;">— React, TypeScript, FastAPI, Python, RAG</span></h3>
      <p style="font-size: 0.85rem; color: #0284c7; margin: 0.2rem 0 0.4rem;">
        <a href="https://drmomenul.vercel.app" target="_blank" rel="noopener noreferrer">Live Demo</a> |
        <a href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <a href="/projects/dr-momenul-islam">Detailed Case Study</a>
      </p>
      <ul style="padding-left: 1.25rem; margin: 0; color: #334155; font-size: 0.95rem;">
        <li>Evidence-grounded medical information assistant built around 119 verified NHS England clinical guidance passages.</li>
        <li>Multilingual semantic retrieval across English, Bangla, and Banglish using multilingual-e5-small and bge-reranker-v2-m3.</li>
        <li>Deterministic emergency triage protocols that intercept acute symptoms and bypass generative AI hallucinations.</li>
      </ul>
    </div>

    <div style="margin-top: 1rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0;">NoboGhat <span style="font-weight: 400; font-size: 0.9rem; color: #64748b;">— Next.js, React, Java, Spring Boot, MySQL, JWT</span></h3>
      <p style="font-size: 0.85rem; color: #0284c7; margin: 0.2rem 0 0.4rem;">
        <a href="https://noboghatbangladesh.vercel.app/" target="_blank" rel="noopener noreferrer">Live Platform</a> |
        <a href="https://github.com/EHMahi9/NoboGhat-Bangladesh" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
      <ul style="padding-left: 1.25rem; margin: 0; color: #334155; font-size: 0.95rem;">
        <li>Decoupled inland waterway logistics and cargo booking platform with Next.js frontend and Java/Spring Boot backend.</li>
        <li>Database row locking on booking transactions to mathematically prevent boat cargo overfilling.</li>
        <li>Role-based access control for farmers, traders, boat owners, and administrators with bilingual UI (Bangla/English).</li>
      </ul>
    </div>

    <div style="margin-top: 1rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0;">Hospital Doctor Duty Roster <span style="font-weight: 400; font-size: 0.9rem; color: #64748b;">— React, TypeScript, FastAPI, PostgreSQL, Docker</span></h3>
      <p style="font-size: 0.85rem; color: #0284c7; margin: 0.2rem 0 0.4rem;">
        <a href="https://hospital-doctor-duty-roster.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a> |
        <a href="https://github.com/EHMahi9/hospital-doctor-duty-roster" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
      <ul style="padding-left: 1.25rem; margin: 0; color: #334155; font-size: 0.95rem;">
        <li>Constraint-based medical duty scheduling algorithm with fairness scoring and automated regression test suite.</li>
        <li>Role-based staff dashboards and leave management workflows backed by a relational PostgreSQL schema.</li>
      </ul>
    </div>

    <div style="margin-top: 1rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0;">HeliosTrack <span style="font-weight: 400; font-size: 0.9rem; color: #64748b;">— JavaScript, Node.js, WebSockets, MySQL, Chart.js</span></h3>
      <p style="font-size: 0.85rem; color: #0284c7; margin: 0.2rem 0 0.4rem;">
        <a href="https://helios-track-distributed-solar-moni.vercel.app/" target="_blank" rel="noopener noreferrer">Live Dashboard</a> |
        <a href="https://github.com/EHMahi9/HeliosTrack---Distributed-Solar-Monitoring-System" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
      <ul style="padding-left: 1.25rem; margin: 0; color: #334155; font-size: 0.95rem;">
        <li>Real-time solar array monitoring dashboard streaming live Socket.io telemetry updates at 5-second intervals.</li>
        <li>Interactive Chart.js real-time visualizer, virtual battery controller, and Aiven Cloud MySQL integration.</li>
      </ul>
    </div>
  </section>

  <section style="margin-bottom: 1.75rem;">
    <h2 style="font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Education &amp; Training</h2>
    <ul style="padding-left: 1.25rem; margin: 0.5rem 0 0; color: #334155;">
      <li><strong>B.Sc. in Computer Science &amp; Engineering</strong> — Daffodil International University (In Progress, CGPA: 3.67)</li>
      <li><strong>Full-Stack Web Development Training</strong> — Programming Hero (Batch 14, In Progress)</li>
    </ul>
  </section>

  <footer style="border-top: 1px solid #e2e8f0; padding-top: 1rem; font-size: 0.9rem; color: #64748b;">
    <a href="/" style="color: #0284c7; font-weight: 600; text-decoration: none;">← Return to Portfolio Homepage</a>
  </footer>
</div>
`;

// Projects Directory Rich Static HTML
const projectsDirectoryHtmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem 1.25rem; line-height: 1.65; color: #1e293b;">
  <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
    <h1 style="font-size: 2.25rem; color: #0f172a; margin: 0 0 0.5rem;">Selected Projects</h1>
    <p style="font-size: 1.1rem; color: #475569; margin: 0 0 1rem;">
      Production-minded full-stack web applications, real-time systems, and defensive engineering prototypes built by Ebnul Hasan Mahi.
    </p>
    <a href="/" style="color: #0284c7; font-weight: 600; text-decoration: none;">← Return to Portfolio Homepage</a>
  </header>

  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <article style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; background: #ffffff;">
      <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0 0 0.5rem;">01. Dr. Md. Momenul Islam Health Assistant (Flagship)</h2>
      <p style="color: #475569; margin: 0 0 1rem;">Evidence-grounded medical information retrieval assistant prototype with multilingual semantic retrieval, deterministic safety triage, and zero ungrounded generative hallucinations.</p>
      <p style="font-size: 0.9rem; color: #334155; margin: 0 0 1rem;"><strong>Tech Stack:</strong> React, TypeScript, FastAPI, Python, RAG (multilingual-e5-small, bge-reranker-v2-m3)</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://drmomenul.vercel.app" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600;">Live Prototype ↗</a>
        <a href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600;">GitHub Repository ↗</a>
        <a href="/projects/dr-momenul-islam" style="color: #0284c7; font-weight: 600;">Full Architecture Case Study ↗</a>
      </div>
    </article>

    <article style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; background: #ffffff;">
      <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0 0 0.5rem;">02. NoboGhat</h2>
      <p style="color: #475569; margin: 0 0 1rem;">Decoupled inland waterway cargo logistics platform with live capacity tracking to prevent boat overfilling, stateless JWT authentication, and role-based access control.</p>
      <p style="font-size: 0.9rem; color: #334155; margin: 0 0 1rem;"><strong>Tech Stack:</strong> Next.js, React, Java, Spring Boot, MySQL, JWT</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://noboghatbangladesh.vercel.app/" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600;">Live Platform ↗</a>
        <a href="https://github.com/EHMahi9/NoboGhat-Bangladesh" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600;">GitHub Repository ↗</a>
      </div>
    </article>

    <article style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; background: #ffffff;">
      <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0 0 0.5rem;">03. Hospital Doctor Duty Roster</h2>
      <p style="color: #475569; margin: 0 0 1rem;">Role-based medical duty scheduling platform featuring constraint-based conflict detection algorithms with fairness scoring and automated regression test suite.</p>
      <p style="font-size: 0.9rem; color: #334155; margin: 0 0 1rem;"><strong>Tech Stack:</strong> React, TypeScript, FastAPI, PostgreSQL, Docker</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://hospital-doctor-duty-roster.vercel.app/" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600;">Live Demo ↗</a>
        <a href="https://github.com/EHMahi9/hospital-doctor-duty-roster" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600;">GitHub Repository ↗</a>
      </div>
    </article>

    <article style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; background: #ffffff;">
      <h2 style="font-size: 1.4rem; color: #0f172a; margin: 0 0 0.5rem;">04. HeliosTrack</h2>
      <p style="color: #475569; margin: 0 0 1rem;">Distributed solar fleet monitoring dashboard streaming live Socket.io telemetry updates at 5-second intervals, with interactive Chart.js visualization and virtual battery analytics.</p>
      <p style="font-size: 0.9rem; color: #334155; margin: 0 0 1rem;"><strong>Tech Stack:</strong> JavaScript, Node.js, WebSockets, MySQL, Chart.js</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://helios-track-distributed-solar-moni.vercel.app/" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600;">Live Dashboard ↗</a>
        <a href="https://github.com/EHMahi9/HeliosTrack---Distributed-Solar-Monitoring-System" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600;">GitHub Repository ↗</a>
      </div>
    </article>
  </div>
</div>
`;

// About Page Rich Static HTML
const aboutHtmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 860px; margin: 0 auto; padding: 2rem 1.25rem; line-height: 1.65; color: #1e293b;">
  <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
    <h1 style="font-size: 2.25rem; color: #0f172a; margin: 0 0 0.5rem;">About Ebnul Hasan Mahi</h1>
    <p style="font-size: 1.1rem; color: #475569; margin: 0 0 1rem;">
      Software Engineering Student &amp; Full-Stack Developer
    </p>
    <a href="/" style="color: #0284c7; font-weight: 600; text-decoration: none;">← Return to Portfolio Homepage</a>
  </header>

  <section style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.3rem; color: #0f172a;">Engineering Philosophy &amp; Background</h2>
    <p>
      My technical journey combines hands-on web development with strong computer science fundamentals. As a second-year Software Engineering student at Daffodil International University (CGPA: 3.67), I ground my practical application work in core engineering principles—from object-oriented programming in Java and memory concepts in C, to clean full-stack architecture.
    </p>
    <p>
      I approach full-stack engineering with an emphasis on defensive coding and software reliability. Working with TypeScript, Next.js, React, and MongoDB, and expanding into Express backends, I focus on role authorization, clean data validation, and predictable error handling, believing that good software must be dependable under unexpected user input and edge cases.
    </p>
  </section>

  <section style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.3rem; color: #0f172a;">Core Focus Areas</h2>
    <ul>
      <li><strong>Full-Stack Web:</strong> Building modular frontends in Next.js and React with TypeScript, connecting them to structured backends.</li>
      <li><strong>Data Modeling &amp; Persistence:</strong> Structuring document schemas in MongoDB, managing query performance, and ensuring consistent data persistence.</li>
      <li><strong>Defensive Engineering:</strong> Learning Express backend design with an emphasis on role-based authorization, input validation, and secure authentication.</li>
    </ul>
  </section>

  <section style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.3rem; color: #0f172a;">Contact &amp; Connect</h2>
    <p>
      Email: <a href="mailto:ebnulhasanmahi001@gmail.com" style="color: #0284c7;">ebnulhasanmahi001@gmail.com</a><br>
      Phone: <a href="tel:+8801879450876" style="color: #0284c7;">+880 1879 450 876</a><br>
      GitHub: <a href="https://github.com/EHMahi9" target="_blank" rel="noopener noreferrer" style="color: #0284c7;">github.com/EHMahi9</a><br>
      LinkedIn: <a href="https://www.linkedin.com/in/ebnul-hasan-mahi/" target="_blank" rel="noopener noreferrer" style="color: #0284c7;">linkedin.com/in/ebnul-hasan-mahi</a>
    </p>
  </section>
</div>
`;

const routeMetadata = {
  'resume': {
    title: 'Resume | Ebnul Hasan Mahi - Full-Stack Developer',
    canonical: 'https://www.ebnulhasanmahi.me/resume',
    description: 'Technical resume and engineering background of Ebnul Hasan Mahi, Full-Stack Developer and Software Engineering student.',
    ogTitle: 'Resume | Ebnul Hasan Mahi - Full-Stack Developer',
    ogDescription: 'Technical resume and engineering background of Ebnul Hasan Mahi, Full-Stack Developer and Software Engineering student.',
    ogUrl: 'https://www.ebnulhasanmahi.me/resume',
    content: resumeHtmlContent
  },
  'projects/dr-momenul-islam': {
    title: 'Case Study: Dr. Md. Momenul Islam Health Assistant | Ebnul Hasan Mahi',
    canonical: 'https://www.ebnulhasanmahi.me/projects/dr-momenul-islam',
    description: 'In-depth engineering case study of an evidence-grounded health assistant prototype using NHS clinical guidance, multilingual semantic retrieval, and deterministic safety triage.',
    ogTitle: 'Case Study: Dr. Md. Momenul Islam Health Assistant',
    ogDescription: 'In-depth engineering case study of an evidence-grounded health assistant prototype using NHS clinical guidance, multilingual semantic retrieval, and deterministic safety triage.',
    ogUrl: 'https://www.ebnulhasanmahi.me/projects/dr-momenul-islam',
    content: caseStudyHtmlContent
  },
  'projects': {
    title: 'Projects | Ebnul Hasan Mahi - Full-Stack Developer',
    canonical: 'https://www.ebnulhasanmahi.me/projects',
    description: 'Curated software engineering projects by Ebnul Hasan Mahi, including health retrieval RAG prototypes, inland waterway logistics, scheduling algorithms, and real-time telemetry.',
    ogTitle: 'Projects | Ebnul Hasan Mahi - Full-Stack Developer',
    ogDescription: 'Curated software engineering projects by Ebnul Hasan Mahi, including health retrieval RAG prototypes, inland waterway logistics, scheduling algorithms, and real-time telemetry.',
    ogUrl: 'https://www.ebnulhasanmahi.me/projects',
    content: projectsDirectoryHtmlContent
  },
  'about': {
    title: 'About | Ebnul Hasan Mahi - Full-Stack Developer',
    canonical: 'https://www.ebnulhasanmahi.me/about',
    description: 'Background, education, engineering philosophy, and technical stack of Ebnul Hasan Mahi, Software Engineering student at Daffodil International University.',
    ogTitle: 'About | Ebnul Hasan Mahi - Full-Stack Developer',
    ogDescription: 'Background, education, engineering philosophy, and technical stack of Ebnul Hasan Mahi, Software Engineering student at Daffodil International University.',
    ogUrl: 'https://www.ebnulhasanmahi.me/about',
    content: aboutHtmlContent
  }
};

function injectRoute(html, meta) {
  let updated = html;

  // Replace <title>
  updated = updated.replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`);

  // Replace canonical
  updated = updated.replace(/<link rel="canonical" href=".*?"/s, `<link rel="canonical" href="${meta.canonical}"`);

  // Replace description
  updated = updated.replace(/<meta name="description" content=".*?"/s, `<meta name="description" content="${meta.description}"`);

  // Replace og:title
  updated = updated.replace(/<meta property="og:title" content=".*?"/s, `<meta property="og:title" content="${meta.ogTitle}"`);

  // Replace og:description
  updated = updated.replace(/<meta property="og:description" content=".*?"/s, `<meta property="og:description" content="${meta.ogDescription}"`);

  // Replace og:url
  updated = updated.replace(/<meta property="og:url" content=".*?"/s, `<meta property="og:url" content="${meta.ogUrl}"`);

  // Replace twitter:title
  updated = updated.replace(/<meta name="twitter:title" content=".*?"/s, `<meta name="twitter:title" content="${meta.ogTitle}"`);

  // Replace twitter:description
  updated = updated.replace(/<meta name="twitter:description" content=".*?"/s, `<meta name="twitter:description" content="${meta.ogDescription}"`);

  // Replace <noscript> block with custom semantic HTML for this exact route
  if (meta.content) {
    updated = updated.replace(/<noscript>.*?<\/noscript>/s, `<noscript>${meta.content}</noscript>`);
  }

  return updated;
}

Object.entries(routeMetadata).forEach(([route, meta]) => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  const customizedHtml = injectRoute(baseHtml, meta);
  fs.writeFileSync(path.join(targetDir, 'index.html'), customizedHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, `${route.replace('/', '-')}.html`), customizedHtml, 'utf8');
  console.log(`[prerender-routes] Generated static route with full semantic content: /${route}`);
});

console.log('[prerender-routes] All client routes pre-rendered with customized SEO metadata and full semantic HTML.');
