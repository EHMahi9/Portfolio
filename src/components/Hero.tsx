import React, { useState, useEffect, useCallback, useRef } from 'react';

export const Hero: React.FC = () => {
  const originalName = 'Ebnul Hasan Mahi';
  const [displayName, setDisplayName] = useState(originalName);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchIntervalRef = useRef<number | null>(null);

  // 1. Cyber-Security Decryption / Glitch Effect
  const triggerDecryption = useCallback(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';
    let iteration = 0;

    if (glitchIntervalRef.current) {
      clearInterval(glitchIntervalRef.current);
    }

    setIsGlitching(true);

    glitchIntervalRef.current = window.setInterval(() => {
      setDisplayName(
        originalName
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return originalName[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('')
      );

      if (iteration >= originalName.length) {
        if (glitchIntervalRef.current) {
          clearInterval(glitchIntervalRef.current);
        }
        setIsGlitching(false);
        setDisplayName(originalName);
      }

      iteration += 1 / 3;
    }, 30);
  }, [originalName]);

  // Run decryption effect once on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      triggerDecryption();
    }
    return () => {
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, [triggerDecryption]);

  // 2. Rotating Role Title every 2.6 seconds
  const roles = ['Software Engineer', 'Full-Stack Developer', 'Backend Enthusiast'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="hero section-pad" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid">
        {/* Left Column: Copy & Actions */}
        <div className="hero-copy">
          <p
            className="eyebrow"
            style={{
              color: 'var(--accent)',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              marginBottom: '10px'
            }}
          >
            Available for Junior Roles &amp; Internships
          </p>

          <h1
            id="hero-title"
            className={isGlitching ? 'is-glitching' : ''}
            onMouseEnter={triggerDecryption}
            style={{ cursor: 'crosshair' }}
          >
            {displayName}
          </h1>

          <h2 className="hero-role" id="heroRole">
            {roles[roleIndex]}
          </h2>

          <p>
            I engineer secure, scalable backend systems and explore the offensive side of
            network security. I bridge the gap between clean full-stack architecture and
            system-level vulnerabilities.
          </p>

          <div className="hero-meta">
            <span>Full-Stack Developer</span>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View featured projects
            </a>
            <a className="button button-secondary" href="mailto:vaibongo20@gmail.com">
              Contact me
            </a>
          </div>

          <nav className="social-row" aria-label="Social links">
            <a
              href="https://github.com/EHMahi9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ebnul-hasan-mahi-580b07395/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <a href="mailto:vaibongo20@gmail.com" aria-label="Email Ebnul Hasan Mahi">
              Email
            </a>
          </nav>
        </div>

        {/* Right Column: Visual Portrait & Focus Card */}
        <aside className="hero-visual" aria-label="Profile summary">
          <div className="portrait-block float-animation">
            <img
              src="/assets/images/optimized/unnamed.jpg"
              width="700"
              height="697"
              alt="Portrait of Ebnul Hasan Mahi"
              decoding="async"
              loading="eager"
            />
          </div>

          <div className="hero-card">
            <p className="card-kicker">Current focus</p>
            <h2>System security, embedded logic, and production-ready web apps.</h2>
            <dl className="signal-list">
              <div>
                <dt>Core languages</dt>
                <dd>Python, Java, C, JavaScript</dd>
              </div>
              <div>
                <dt>Systems &amp; Logic</dt>
                <dd>Arduino embedded systems, Data Structures, OOP</dd>
              </div>
              <div>
                <dt>Future trajectory</dt>
                <dd>Network security, penetration testing, ethical hacking</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
};
