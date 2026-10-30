import React, { useState, useEffect, useCallback, useRef } from 'react';

export const Hero: React.FC = () => {
  const originalName = 'Ebnul Hasan Mahi';
  const words = ['Ebnul', 'Hasan', 'Mahi'];
  const [displayChars, setDisplayChars] = useState<string[]>(originalName.split(''));
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchIntervalRef = useRef<number | null>(null);

  // 1. Subtle, Professional Character Decryption Effect with Subpixel-Stable Slots
  const triggerDecryption = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const upperLetters = 'ABCDEFGHJKLNPQRSTUVXYZ0123456789';
    const lowerLetters = 'abcdefghijklnopqrstuvxyz0123456789';
    const wideLetters = 'WM80';
    const narrowLetters = 'il1!|';
    let iteration = 0;

    if (glitchIntervalRef.current) {
      clearInterval(glitchIntervalRef.current);
    }

    setIsGlitching(true);

    glitchIntervalRef.current = window.setInterval(() => {
      setDisplayChars(
        originalName.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return originalName[index];
          if (char === 'i' || char === 'l') {
            return narrowLetters[Math.floor(Math.random() * narrowLetters.length)];
          }
          if (char === 'm' || char === 'M' || char === 'w' || char === 'W') {
            return wideLetters[Math.floor(Math.random() * wideLetters.length)];
          }
          if (char === char.toUpperCase()) {
            return upperLetters[Math.floor(Math.random() * upperLetters.length)];
          }
          return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
        })
      );

      if (iteration >= originalName.length) {
        if (glitchIntervalRef.current) {
          clearInterval(glitchIntervalRef.current);
        }
        setIsGlitching(false);
        setDisplayChars(originalName.split(''));
      }

      iteration += 1 / 2;
    }, 28);
  }, [originalName]);

  // Run decryption effect once on mount if motion is enabled
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      triggerDecryption();
    }
    return () => {
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, [triggerDecryption]);

  // 2. Rotating Role Title every 2.8 seconds
  const roles = ['Full-Stack Developer', 'Frontend & Web Developer', 'Software Engineering Student'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="hero section-pad" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid">
        {/* Left Column: Copy & Actions */}
        <div className="hero-copy">
          {/* Mobile-Only Avatar */}
          <div className="hero-mobile-avatar" aria-hidden="true">
            <img
              src="/assets/images/optimized/portrait.webp"
              width="140"
              height="140"
              alt="Portrait of Ebnul Hasan Mahi"
              decoding="async"
              loading="eager"
            />
          </div>

          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true"></span>
            SOFTWARE ENGINEERING STUDENT
          </p>

          <h1
            id="hero-title"
            className={isGlitching ? 'is-glitching' : ''}
            onMouseEnter={triggerDecryption}
          >
            <span className="sr-only">{originalName}</span>
            <span aria-hidden="true" className="hero-title-visual">
              {words.map((word, wordIdx) => {
                const wordStartIndex = wordIdx === 0 ? 0 : wordIdx === 1 ? 6 : 12;
                return (
                  <React.Fragment key={word}>
                    {wordIdx > 0 && <span className="hero-title-space"> </span>}
                    <span className="hero-title-word">
                      {word.split('').map((targetChar, charIdx) => {
                        const globalIdx = wordStartIndex + charIdx;
                        const currentChar = displayChars[globalIdx] || targetChar;
                        const isScrambled = isGlitching && currentChar !== targetChar;
                        return (
                          <span key={charIdx} className="hero-char-slot">
                            <span className="hero-char-ghost" aria-hidden="true">
                              {targetChar}
                            </span>
                            <span
                              className={`hero-char-glyph ${isScrambled ? 'is-scrambled' : 'is-resolved'}`}
                              aria-hidden="true"
                            >
                              {currentChar}
                            </span>
                          </span>
                        );
                      })}
                    </span>
                  </React.Fragment>
                );
              })}
            </span>
          </h1>

          <h2 className="hero-role" id="heroRole">
            {roles[roleIndex]}
          </h2>

          <p className="hero-lead">
            Software engineering student building structured web applications with TypeScript, Next.js,
            React, and MongoDB, learning Express backends with an emphasis on role authorization and defensive coding.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work
            </a>
            <a
              className="button button-secondary"
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a className="button button-ghost" href="#contact">
              Contact me
            </a>
          </div>

          <nav className="social-row" aria-label="Social links">
            <span className="social-row-label">Connect:</span>
            <a
              href="https://github.com/EHMahi9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <span className="social-separator" aria-hidden="true">/</span>
            <a
              href="https://www.linkedin.com/in/ebnul-hasan-mahi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <span className="social-separator" aria-hidden="true">/</span>
            <a href="mailto:ebnulhasanmahi001@gmail.com" aria-label="Email Ebnul Hasan Mahi">
              Email
            </a>
          </nav>
        </div>

        {/* Right Column: Visual Portrait & Focus Card */}
        <aside className="hero-visual" aria-label="Profile summary">
          {/* Portrait Asset */}
          <div className="portrait-block">
            <img
              src="/assets/images/optimized/portrait.webp"
              width="700"
              height="700"
              alt="Portrait of Ebnul Hasan Mahi"
              decoding="async"
              loading="eager"
              {...{ fetchpriority: 'high' }}
            />
          </div>

          {/* Current Focus Card */}
          <div className="hero-card" data-tilt>
            <div className="card-kicker-row">
              <span className="card-kicker">Current focus</span>
              <span className="focus-badge" aria-hidden="true">
                <span className="focus-dot"></span>
                Active
              </span>
            </div>

            <h3 className="hero-card-title">
              Structured web applications, defensive coding, and backend architecture.
            </h3>

            <dl className="signal-list">
              <div>
                <dt>Core Stack</dt>
                <dd>TypeScript, Next.js, React, MongoDB, Express (In Progress)</dd>
              </div>
              <div>
                <dt>Key Practices</dt>
                <dd>Input Validation, Role-Based Access, Safe Data Schemas</dd>
              </div>
              <div>
                <dt>Trajectory</dt>
                <dd>Reliable web systems, secure API services, resilient databases</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
};
