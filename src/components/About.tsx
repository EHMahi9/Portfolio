import React from 'react';

export const About: React.FC = () => {
  const keySignals = [
    {
      kicker: 'Institution',
      value: 'Daffodil International University',
      sub: 'B.Sc. in Software Engineering (2nd Year)'
    },
    {
      kicker: 'Core Trajectory',
      value: 'Systems & Network Security',
      sub: 'Penetration testing & secure architecture'
    },
    {
      kicker: 'Low-Level Core',
      value: 'C, Java & Arduino',
      sub: 'Memory management, OOP & microcontrollers'
    },
    {
      kicker: 'Web Systems',
      value: 'FastAPI, React, TypeScript',
      sub: 'PostgreSQL, REST APIs & Docker'
    }
  ];

  const focusAreas = [
    {
      num: '01',
      title: 'Backend & Full-Stack',
      description:
        'Building secure APIs, managing PostgreSQL databases, and connecting them to clean React frontends.'
    },
    {
      num: '02',
      title: 'Low-Level Logic',
      description:
        'Writing algorithmic logic in Python, working with C memory models, and programming Arduino microcontrollers.'
    },
    {
      num: '03',
      title: 'Cybersecurity Focus',
      description:
        'Analyzing system vulnerabilities, network security models, and studying penetration testing fundamentals.'
    }
  ];

  return (
    <section className="section-pad about-section" id="about" aria-labelledby="about-title">
      <div className="container two-column">
        {/* Sticky Section Intro */}
        <div className="section-intro">
          <p className="eyebrow">About me</p>
          <h2 id="about-title">Understanding systems from the ground up.</h2>
          <p className="about-lead">
            Software engineering student building production web applications and APIs,
            with an active focus on low-level fundamentals and an engineering trajectory toward systems security.
          </p>
        </div>

        {/* Content Stack: Key Signals Grid + Focus Cards */}
        <div className="content-stack">
          {/* Quick-Scan Signal Grid */}
          <div className="about-signals-grid" aria-label="Key background signals">
            {keySignals.map((signal, idx) => (
              <div key={idx} className="about-signal-card">
                <span className="about-signal-kicker">{signal.kicker}</span>
                <strong className="about-signal-value">{signal.value}</strong>
                <span className="about-signal-sub">{signal.sub}</span>
              </div>
            ))}
          </div>

          {/* Core Focus Cards */}
          <div className="focus-grid">
            {focusAreas.map((focus) => (
              <article key={focus.num} className="focus-card">
                <span className="focus-card-num">{focus.num}</span>
                <h3>{focus.title}</h3>
                <p>{focus.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
