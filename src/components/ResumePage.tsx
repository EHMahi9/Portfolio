import React, { useState, useEffect } from 'react';
import { Footer } from './Footer';

interface ResumePageProps {
  onBackToPortfolio: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onBackToPortfolio }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('mahi-portfolio-theme', nextTheme);
    const meta = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");
    if (meta) {
      meta.setAttribute('content', nextTheme === 'light' ? '#d9efff' : '#071a3d');
    }
  };

  return (
    <div className="resume-page-wrapper">
      {/* Sticky Navigation Bar */}
      <header className="cs-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="cs-container cs-nav-inner">
          <div className="cs-nav-brand">
            <button
              type="button"
              onClick={onBackToPortfolio}
              className="cs-nav-home-btn"
              aria-label="Return to portfolio homepage"
            >
              <span className="brand-dot" aria-hidden="true" />
              <strong>&larr; Back to Portfolio</strong>
            </button>
            <span className="cs-nav-sep" aria-hidden="true">/</span>
            <span className="cs-nav-title">Resume</span>
          </div>

          <div className="cs-nav-controls">
            <a
              href="/assets/documents/resume.pdf"
              download="Ebnul_Hasan_Mahi_Resume.pdf"
              className="button button-small button-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                {theme === 'light' ? '\u263E' : '\u2600'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Resume Content Container */}
      <main className="container" style={{ maxWidth: '860px', margin: '40px auto 80px', padding: '0 20px' }}>
        <article className="resume-sheet">
          {/* Header */}
          <header className="resume-header">
            <h1 className="resume-name">Ebnul Hasan Mahi</h1>
            <p className="resume-contact-bar">
              <a href="mailto:ebnulhasanmahi001@gmail.com">ebnulhasanmahi001@gmail.com</a>
              <span className="sep">•</span>
              <a href="tel:+8801879450876">+880 1879 450 876</a>
              <span className="sep">•</span>
              <a href="https://www.linkedin.com/in/ebnul-hasan-mahi/" target="_blank" rel="noopener noreferrer">linkedin.com/in/ebnul-hasan-mahi</a>
              <span className="sep">•</span>
              <a href="https://github.com/EHMahi9" target="_blank" rel="noopener noreferrer">github.com/EHMahi9</a>
              <span className="sep">•</span>
              <a href="https://www.ebnulhasanmahi.me" target="_blank" rel="noopener noreferrer">ebnulhasanmahi.me</a>
            </p>
          </header>

          <hr className="resume-divider" />

          {/* Professional Summary */}
          <section className="resume-section">
            <h2 className="resume-section-title">PROFESSIONAL SUMMARY</h2>
            <p className="resume-text">
              Software engineering student (CGPA: 3.67) building structured web applications with TypeScript, Next.js, React, and MongoDB,
              actively expanding backend capabilities in Express. Grounded in defensive engineering principles, role-based authorization,
              and core computer science fundamentals. Committed to clean architecture, reliable fundamentals, and practical software design.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="resume-section">
            <h2 className="resume-section-title">TECHNICAL SKILLS</h2>
            <ul className="resume-skills-list">
              <li><strong>Core Full-Stack:</strong> TypeScript, Next.js, React.js, MongoDB, Express.js (In Progress), JavaScript (ES6+), Tailwind CSS</li>
              <li><strong>Defensive Engineering &amp; Backend:</strong> Role-Based Authorization (RBAC), Input Validation, JWT, RESTful APIs, Node.js</li>
              <li><strong>Databases:</strong> MongoDB, MySQL, PostgreSQL</li>
              <li><strong>CS Foundations &amp; Tools:</strong> Data Structures &amp; Algorithms, Object-Oriented Programming (Java, C/C++), Git, GitHub, Postman, Vite, Vercel</li>
            </ul>
          </section>

          {/* Featured Projects */}
          <section className="resume-section">
            <h2 className="resume-section-title">FEATURED PROJECTS</h2>

            <div className="resume-entry">
              <div className="resume-entry-header">
                <div className="resume-entry-title">
                  <strong>Dr. Md. Momenul Islam Health Assistant</strong>
                  <span className="resume-entry-stack"> — React, TypeScript, FastAPI, Python, RAG</span>
                </div>
                <div className="resume-entry-links">
                  <a href="https://drmomenul.vercel.app" target="_blank" rel="noopener noreferrer">Live Prototype</a> |{' '}
                  <a href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
              <p className="resume-entry-sub">Evidence-grounded health information assistant prototype — Built in memory of Dr. Md. Momenul Islam</p>
              <ul className="resume-bullets">
                <li>Developed a multilingual health assistant interface addressing queries across English, Bangla, and Banglish.</li>
                <li>Grounded information using curated NHS clinical sources with transparent source provenance tracking and safety disclaimers.</li>
                <li>Implemented out-of-scope refusal protocols and emergency routing to avoid ungrounded generative health advice.</li>
                <li>Built a modern, accessible web interface with responsive conversation flow.</li>
                <li><em>Architecture Note:</em> Retrieval pipeline runs on a high-memory local environment; web deployment hosts full client triage interface.</li>
              </ul>
            </div>

            <div className="resume-entry">
              <div className="resume-entry-header">
                <div className="resume-entry-title">
                  <strong>NoboGhat</strong>
                  <span className="resume-entry-stack"> — Next.js, React, Java, Spring Boot, MySQL, JWT</span>
                </div>
                <div className="resume-entry-links">
                  <a href="https://noboghatbangladesh.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a> |{' '}
                  <a href="https://github.com/EHMahi9/NoboGhat-Bangladesh" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
              <p className="resume-entry-sub">Decoupled inland waterway logistics &amp; cargo booking platform</p>
              <ul className="resume-bullets">
                <li>Developed a responsive, accessible frontend using Next.js and Tailwind CSS with server-side rendering.</li>
                <li>Engineered decoupled backend services with Java, Spring Boot, and MySQL for boat discovery and capacity-aware cargo booking.</li>
                <li>Implemented live cargo capacity tracking and role-based access control for farmers, traders, and boat operators.</li>
              </ul>
            </div>

            <div className="resume-entry">
              <div className="resume-entry-header">
                <div className="resume-entry-title">
                  <strong>HeliosTrack</strong>
                  <span className="resume-entry-stack"> — React, Node.js, Express, MySQL, WebSockets, Chart.js</span>
                </div>
                <div className="resume-entry-links">
                  <a href="https://helios-track-distributed-solar-moni.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a> |{' '}
                  <a href="https://github.com/EHMahi9/HeliosTrack---Distributed-Solar-Monitoring-System" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
              <p className="resume-entry-sub">Real-time distributed solar array monitoring dashboard</p>
              <ul className="resume-bullets">
                <li>Designed and built a telemetry dashboard featuring live Socket.io telemetry updates streamed every 5 seconds.</li>
                <li>Integrated interactive Chart.js grid and virtual battery controller to visualize distributed solar array performance.</li>
                <li>Connected Node.js API with Aiven Cloud MySQL database for reliable persistence and fast querying of inverter metrics.</li>
              </ul>
            </div>
          </section>

          {/* Education & Training */}
          <section className="resume-section">
            <h2 className="resume-section-title">EDUCATION & TRAINING</h2>
            <div className="resume-entry">
              <div className="resume-entry-header">
                <strong>Bachelor of Science in Computer Science & Engineering</strong>
                <span>In Progress</span>
              </div>
              <p className="resume-entry-sub">Current CGPA: 3.67</p>
            </div>
            <div className="resume-entry" style={{ marginTop: '12px' }}>
              <div className="resume-entry-header">
                <strong>Full-Stack Web Development Training</strong>
                <span>Programming Hero (Batch 14, In Progress)</span>
              </div>
              <p className="resume-entry-sub">Intensive practical coursework covering modern JavaScript, React, Next.js, Node.js, Express, Better Auth, and MongoDB.</p>
            </div>
          </section>

          {/* Direct PDF Download Action Footnote */}
          <div className="resume-download-banner">
            <div>
              <strong>Looking for the original PDF file?</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'inherit' }}>You can download the static PDF document directly.</p>
            </div>
            <a
              href="/assets/documents/resume.pdf"
              download="Ebnul_Hasan_Mahi_Resume.pdf"
              className="button button-small button-primary"
            >
              Download PDF Version
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
