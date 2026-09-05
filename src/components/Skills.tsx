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
          {/* Card 1: Full-stack web (Wide) */}
          <article className="skill-card wide" data-tilt>
            <p className="card-kicker">Full-stack web</p>
            <h3>React frontends with API-driven backends</h3>
            <p>
              Project work includes React/TypeScript interfaces, FastAPI services,
              Node.js/Express routes, REST APIs, JWT authentication, and Vercel deployment.
            </p>
            <div className="tag-list">
              <span>React</span>
              <span>TypeScript</span>
              <span>FastAPI</span>
              <span>Node.js</span>
              <span>Express</span>
              <span>REST API</span>
            </div>
          </article>

          {/* Card 2: Data and backend */}
          <article className="skill-card" data-tilt>
            <p className="card-kicker">Data and backend</p>
            <h3>Data models, auth, and persistence</h3>
            <div className="tag-list">
              <span>PostgreSQL</span>
              <span>Alembic</span>
              <span>JWT</span>
              <span>Docker</span>
              <span>Git</span>
            </div>
          </article>

          {/* Card 3: Programming */}
          <article className="skill-card" data-tilt>
            <p className="card-kicker">Programming</p>
            <h3>Strong Java and Python foundations</h3>
            <div className="tag-list">
              <span>Java</span>
              <span>Python</span>
              <span>OOP</span>
              <span>HashMap</span>
              <span>ArrayList</span>
            </div>
          </article>

          {/* Card 4: Frontend quality */}
          <article className="skill-card" data-tilt>
            <p className="card-kicker">Frontend quality</p>
            <h3>Accessible, responsive UI systems</h3>
            <div className="tag-list">
              <span>HTML5</span>
              <span>CSS3</span>
              <span>JavaScript</span>
              <span>Accessibility</span>
              <span>Performance</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
