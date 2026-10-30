import React from 'react';

export const Skills: React.FC = () => {
  return (
    <section className="section-pad soft-section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading">
          <p className="eyebrow">Technical profile</p>
          <h2 id="skills-title">A focused stack for building usable software.</h2>
          <p>Tools are grouped by how I use them in real projects, not as a long keyword list.</p>
        </div>

        {/* Skill Cards Grid */}
        <div className="skill-grid">
          {/* Card 1: Core Full-Stack Web (Wide) */}
          <article className="skill-card wide" data-tilt>
            <p className="card-kicker">Core Full-Stack Web</p>
            <h3>Next.js &amp; React frontends with TypeScript</h3>
            <p>
              Building responsive, accessible web applications with TypeScript, Next.js, and React,
              connected to structured MongoDB persistence and expanding into Express backends.
            </p>
            <div className="tag-list">
              <span>TypeScript</span>
              <span>Next.js</span>
              <span>React</span>
              <span>MongoDB</span>
              <span>Express (In Progress)</span>
              <span>Tailwind CSS</span>
            </div>
          </article>

          {/* Card 2: Database & Persistence */}
          <article className="skill-card" data-tilt>
            <p className="card-kicker">Database &amp; Persistence</p>
            <h3>Structured data models &amp; MongoDB schemas</h3>
            <div className="tag-list">
              <span>MongoDB</span>
              <span>Mongoose</span>
              <span>MySQL</span>
              <span>PostgreSQL</span>
            </div>
          </article>

          {/* Card 3: Defensive Engineering */}
          <article className="skill-card" data-tilt>
            <p className="card-kicker">Defensive Engineering</p>
            <h3>Role-based access &amp; API validation</h3>
            <div className="tag-list">
              <span>Role-Based Access</span>
              <span>Input Validation</span>
              <span>JWT</span>
              <span>REST APIs</span>
            </div>
          </article>

          {/* Card 4: Computer Science Foundations */}
          <article className="skill-card" data-tilt>
            <p className="card-kicker">Computer Science Foundations</p>
            <h3>Core programming fundamentals</h3>
            <div className="tag-list">
              <span>Data Structures</span>
              <span>Algorithms</span>
              <span>OOP</span>
              <span>Java</span>
              <span>C/C++</span>
              <span>Git</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
