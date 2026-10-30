const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[prerender-routes] dist/index.html not found! Aborting.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Rich Semantic Case Study HTML (Exact match with React CaseStudyPage)
const caseStudyHtmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem 1.25rem; line-height: 1.65; color: #1e293b;">
  <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
    <p style="text-transform: uppercase; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; color: #0284c7; margin-bottom: 0.5rem;">Flagship Engineering Case Study</p>
    <h1 style="font-size: 2.25rem; line-height: 1.2; color: #0f172a; margin: 0 0 1rem;">Dr. Md. Momenul Islam Health Assistant</h1>
    <p style="font-size: 1.15rem; color: #475569; margin: 0 0 1.25rem;">
      Evidence-grounded medical information retrieval assistant prototype with multilingual semantic retrieval, deterministic safety triage, and zero ungrounded generative hallucinations.
    </p>
    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
      <a href="https://drmomenul.vercel.app" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600;">Launch Live Prototype &rarr;</a>
      <a href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600;">View GitHub Repository &rarr;</a>
      <a href="/" style="display: inline-block; background: transparent; color: #475569; padding: 0.6rem 1rem; text-decoration: none; font-weight: 600;">&larr; Back to Portfolio</a>
    </div>
    
    <div style="background: rgba(2, 132, 199, 0.08); border-left: 4px solid #0284c7; padding: 0.85rem 1.15rem; border-radius: 6px; margin: 1.25rem 0;">
      <strong style="color: #0369a1; display: block; margin-bottom: 0.25rem;">Architecture Note on Live Prototype:</strong>
      <p style="margin: 0; font-size: 0.9rem; color: #334155;">
        Full neural retrieval and cross-encoder reranking pipeline runs on a dedicated Python/FastAPI environment; the web deployment serves the client-side conversational triage interface. See GitHub for the complete model pipeline and reproducible setup.
      </p>
    </div>

    <p style="font-size: 0.85rem; color: #64748b; background: #f8fafc; border-left: 3px solid #64748b; padding: 0.75rem 1rem; margin: 1rem 0 0;">
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
    <ul style="padding-left: 1.5rem; color: #334155;">
      <li><strong>Verified Knowledge Base:</strong> 119 verified clinical passages curated from NHS England guidance covering primary care, symptoms, and red-flag conditions.</li>
      <li><strong>Dense Multilingual Embeddings:</strong> Utilizes <code>multilingual-e5-small</code> (384-dimensional dense vectors) to compute symmetric cosine similarity across English, Bangla, and Banglish token spaces.</li>
      <li><strong>Cross-Encoder Reranking:</strong> Applies <code>bge-reranker-v2-m3</code> to re-score the top-k candidate passages, providing high-precision relevance ranking that filters false semantic matches.</li>
      <li><strong>Deterministic Grounding:</strong> Answers are composed strictly from verified passage excerpts with explicit source attribution and SHA-256 provenance tracking. Generation of ungrounded text is completely suppressed.</li>
    </ul>
  </section>

  <section style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.5rem; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">3. Deterministic Safety Triage Tiers</h2>
    <p>
      The system classifies user queries into four distinct clinical safety tiers before any retrieval or rendering occurs:
    </p>
    <ol style="padding-left: 1.5rem; color: #334155;">
      <li><strong>Tier 1 (Ordinary Clinical Query):</strong> Clear symptom or condition match within verified NHS guidelines. Renders grounded evidence card with citations.</li>
      <li><strong>Tier 2 (Ambiguous Query):</strong> Vague symptoms lacking clinical specificity (e.g. general ache). Prompts targeted clarifying questions rather than premature guesses.</li>
      <li><strong>Tier 3 (Emergency Red-Flag):</strong> Acute, life-threatening symptoms (e.g. chest pain radiating to arm, acute shortness of breath). Immediately suppresses retrieval and presents prominent <strong>Bangladesh Emergency Services (999)</strong> escalation instructions.</li>
      <li><strong>Tier 4 (Out-of-Scope):</strong> Topics outside the 14 verified clinical conditions. Transparently declines to answer and advises consulting a qualified healthcare professional.</li>
    </ol>

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-top: 1.25rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin-top: 0;">Clinical Progression Example: Bangla / Banglish Triage</h3>
      <p style="margin: 0.5rem 0;"><strong>Step A (Ambiguous):</strong> User inputs <code>amar buk e betha</code> (<em>"I have chest pain"</em>). System does not guess; asks targeted clarifying questions regarding tightness, radiation, and shortness of breath.</p>
      <p style="margin: 0.5rem 0;"><strong>Step B (Emergency Escalation):</strong> User clarifies <code>amar buk e betha, shash niteo koshto hocche</code> (<em>"Chest pain, and having difficulty breathing"</em>). System instantly triggers <strong>Emergency Red-Flag Triage</strong>, displaying immediate 999 emergency contact warnings.</p>
    </div>
  </section>

  <section style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.5rem; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">4. Engineering Challenge: Multi-Turn Context Isolation</h2>
    <p>
      During multi-turn dialogue evaluation, an insidious conversational failure mode was discovered: concatenating previous turns into the embedding prompt caused cumulative symptom noise from prior topics to drown out acute emergency phrases.
    </p>
    <p>
      <strong>Solution:</strong> Engineered a deterministic topic continuity classifier. If a new turn introduces disjoint anatomical organ systems without connecting conjunctions, it is flagged as <code>NEW_TOPIC</code>, the previous context buffer is purged to zero length, and the emergency phrase is evaluated in complete isolation.
    </p>
  </section>

  <section style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.5rem; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">5. Technology Stack</h2>
    <ul style="padding-left: 1.5rem; color: #334155;">
      <li><strong>Frontend:</strong> React, TypeScript, Vite, Tailwind CSS</li>
      <li><strong>Backend:</strong> Python, FastAPI, Uvicorn</li>
      <li><strong>Semantic ML:</strong> <code>multilingual-e5-small</code> (384-dim bi-encoder), <code>bge-reranker-v2-m3</code> (cross-encoder)</li>
      <li><strong>Corpus:</strong> 119 semantic chunks from 14 verified NHS clinical conditions</li>
      <li><strong>Storage:</strong> Client-side localStorage for private session state</li>
    </ul>
  </section>

  <footer style="border-top: 1px solid #e2e8f0; padding-top: 1.5rem; margin-top: 3rem;">
    <p style="margin: 0; font-size: 0.95rem; color: #64748b;">
      <a href="/" style="color: #0284c7; text-decoration: none; font-weight: 600;">&larr; Return to Portfolio Homepage</a> |
      <a href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: none; font-weight: 600;">GitHub Repository &rarr;</a>
    </p>
  </footer>
</div>
`;

// Rich Semantic Resume HTML (Exact match with React ResumePage)
const resumeHtmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 860px; margin: 0 auto; padding: 2rem 1.25rem; line-height: 1.65; color: #1e293b;">
  <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
    <h1 style="font-size: 2.2rem; color: #0f172a; margin: 0 0 0.5rem;">Ebnul Hasan Mahi</h1>
    <p style="font-size: 0.95rem; color: #475569; margin: 0;">
      <a href="mailto:ebnulhasanmahi001@gmail.com" style="color: #0284c7;">ebnulhasanmahi001@gmail.com</a> &bull;
      <a href="tel:+8801879450876" style="color: #0284c7;">+880 1879 450 876</a> &bull;
      <a href="https://www.linkedin.com/in/ebnul-hasan-mahi/" target="_blank" rel="noopener noreferrer" style="color: #0284c7;">LinkedIn</a> &bull;
      <a href="https://github.com/EHMahi9" target="_blank" rel="noopener noreferrer" style="color: #0284c7;">GitHub</a> &bull;
      <a href="https://www.ebnulhasanmahi.me" style="color: #0284c7;">ebnulhasanmahi.me</a>
    </p>
    <div style="margin-top: 1rem;">
      <a href="/assets/documents/resume.pdf" download="Ebnul_Hasan_Mahi_Resume.pdf" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">Download Resume PDF &darr;</a>
      <a href="/" style="display: inline-block; margin-left: 0.75rem; color: #64748b; text-decoration: none; font-size: 0.9rem;">&larr; Back to Portfolio</a>
    </div>
  </header>

  <section style="margin-bottom: 1.75rem;">
    <h2 style="font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Professional Summary</h2>
    <p style="color: #334155; margin-top: 0.5rem;">
      Software engineering student (CGPA: 3.67) building structured web applications with TypeScript, Next.js, React, and MongoDB, actively expanding backend capabilities in Express. Grounded in defensive engineering principles, role-based authorization, and core computer science fundamentals.
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
      <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0;">Dr. Md. Momenul Islam Health Assistant <span style="font-weight: 400; font-size: 0.9rem; color: #64748b;">&bull; React, TypeScript, FastAPI, Python, RAG</span></h3>
      <p style="font-size: 0.85rem; color: #0284c7; margin: 0.2rem 0 0.4rem;">
        <a href="https://drmomenul.vercel.app" target="_blank" rel="noopener noreferrer">Live Demo</a> |
        <a href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <a href="/projects/dr-momenul-islam">Detailed Case Study</a>
      </p>
      <ul style="padding-left: 1.25rem; margin: 0; color: #334155; font-size: 0.95rem;">
        <li>Evidence-grounded medical information assistant built around 119 verified NHS England clinical guidance passages.</li>
        <li>Multilingual semantic retrieval across English, Bangla, and Banglish using multilingual-e5-small and cross-encoder reranking (bge-reranker-v2-m3).</li>
        <li>Deterministic emergency triage protocols that intercept acute symptoms and bypass generative AI hallucinations.</li>
      </ul>
    </div>

    <div style="margin-top: 1rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0;">NoboGhat <span style="font-weight: 400; font-size: 0.9rem; color: #64748b;">&bull; Next.js, React, Java, Spring Boot, MySQL, JWT</span></h3>
      <p style="font-size: 0.85rem; color: #0284c7; margin: 0.2rem 0 0.4rem;">
        <a href="https://noboghatbangladesh.vercel.app/" target="_blank" rel="noopener noreferrer">Live Platform</a> |
        <a href="https://github.com/EHMahi9/NoboGhat-Bangladesh" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
      <ul style="padding-left: 1.25rem; margin: 0; color: #334155; font-size: 0.95rem;">
        <li>Decoupled inland waterway logistics and cargo booking platform with Next.js frontend and Java/Spring Boot backend.</li>
        <li>Database pessimistic row locking (@Lock(LockModeType.PESSIMISTIC_WRITE)) on booking transactions to prevent cargo overfilling.</li>
        <li>Role-based access control for farmers, traders, boat owners, and administrators with bilingual UI (Bangla/English).</li>
      </ul>
    </div>

    <div style="margin-top: 1rem;">
      <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0;">Hospital Doctor Duty Roster <span style="font-weight: 400; font-size: 0.9rem; color: #64748b;">&bull; React, TypeScript, FastAPI, PostgreSQL, Docker</span></h3>
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
      <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0;">HeliosTrack <span style="font-weight: 400; font-size: 0.9rem; color: #64748b;">&bull; JavaScript, Node.js, WebSockets, MySQL, Chart.js</span></h3>
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
      <li><strong>B.Sc. in Computer Science &amp; Engineering</strong> &bull; Daffodil International University (In Progress, CGPA: 3.67)</li>
      <li><strong>Full-Stack Web Development Training</strong> &bull; Programming Hero (Batch 14, In Progress)</li>
    </ul>
  </section>

  <footer style="border-top: 1px solid #e2e8f0; padding-top: 1rem; font-size: 0.9rem; color: #64748b;">
    <p style="margin: 0;">
      <a href="/" style="color: #0284c7; text-decoration: none;">&larr; Back to Portfolio Homepage</a> |
      <a href="/assets/documents/resume.pdf" download="Ebnul_Hasan_Mahi_Resume.pdf" style="color: #0284c7; text-decoration: none;">Download Official PDF</a>
    </p>
  </footer>
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

  // Inject into BOTH real DOM root (<div id="root">) AND <noscript>
  if (meta.content) {
    updated = updated.replace(/<div id="root"><\/div>/s, `<div id="root">${meta.content}</div>`);
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
  console.log(`[prerender-routes] Generated static route with full DOM content: /${route}`);
});

console.log('[prerender-routes] All client routes pre-rendered with customized SEO metadata and full DOM HTML.');
