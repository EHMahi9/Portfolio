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
  const roles = ['Full-Stack Developer', 'Software Engineer', 'Backend Enthusiast'];
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
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true"></span>
            SOFTWARE ENGINEERING STUDENT
          </p>

          <h1
            id="hero-title"
            className={isGlitching ? 'is-glitching' : ''}
            onMouseEnter={triggerDecryption}
            aria-label={originalName}
          >
            {words.map((word, wordIdx) => {
              // Word start indices in "Ebnul Hasan Mahi":
              // "Ebnul" starts at 0
              // "Hasan" starts at 6
              // "Mahi" starts at 12
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
          </h1>

          <h2 className="hero-role" id="heroRole">
            {roles[roleIndex]}
          </h2>

          <p className="hero-lead">
            I build practical software products, web applications, backend systems, and APIs
            with an emphasis on clean architecture, security, and performance.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work
            </a>
            <a className="button button-secondary" href="#contact">
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
              href="https://www.linkedin.com/in/ebnul-hasan-mahi-580b07395/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <span className="social-separator" aria-hidden="true">/</span>
            <a href="mailto:vaibongo20@gmail.com" aria-label="Email Ebnul Hasan Mahi">
              Email
            </a>
          </nav>
        </div>

        {/* Right Column: Visual Portrait & Focus Card */}
        <aside className="hero-visual" aria-label="Profile summary">
          {/* Portrait Asset */}
          <div className="portrait-block">
            <img
              src="/assets/images/optimized/unnamed.jpg"
              width="700"
              height="697"
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
              System security, backend systems, and production web applications.
            </h3>

            <dl className="signal-list">
              <div>
                <dt>Core Stack</dt>
                <dd>Python, Java, C, TypeScript, React</dd>
              </div>
              <div>
                <dt>Systems &amp; Architecture</dt>
                <dd>Backend APIs, PostgreSQL, OOP, Arduino Embedded Systems</dd>
              </div>
              <div>
                <dt>Trajectory</dt>
                <dd>Network security, system integrity, penetration testing</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
};
