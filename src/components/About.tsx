import React from 'react';

export const About: React.FC = () => {
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
        'Writing algorithmic sorting logic in Python, working with C, and programming Arduino microcontrollers.'
    },
    {
      num: '03',
      title: 'Application Security',
      description:
        'Learning application security fundamentals, role-based authorization, and defensive engineering practices.'
    }
  ];

  return (
    <section className="section-pad" id="about" aria-labelledby="about-title">
      <div className="container two-column">
        {/* Sticky Section Intro */}
        <div className="section-intro">
          <p className="eyebrow">About me</p>
          <h2 id="about-title">I want to know how systems work from the ground up.</h2>
        </div>

        {/* Biography Content & Focus Cards */}
        <div className="content-stack">
          <p>
            My technical journey isn't just about building interfaces; it is about
            understanding the underlying architecture. As a second-year student at
            Daffodil International University, I spend my time mastering the
            fundamentals—from managing memory in C and object-oriented design in Java, to
            hardware-software integration with Arduino.
          </p>
          <p>
            I approach full-stack engineering by learning application security and applying 
            defensive principles to my own projects. Beyond assembling UI components and 
            API routes, I focus on role-based authorization, resilient database schemas, and 
            input validation, believing that good software engineering requires understanding 
            both how systems run and how they fail under edge cases.
          </p>
          <p>
            Outside of programming, I am a passionate football enthusiast and an avid gamer. 
            Whether following high-stakes football tournaments or immersing myself in tactical 
            and competitive gaming, I thrive on strategic decision-making, fast reflex coordination, 
            and the collaborative teamwork that gaming naturally cultivates.
          </p>

          <div className="focus-grid">
            {focusAreas.map((focus) => (
              <article key={focus.num} data-tilt>
                <span>{focus.num}</span>
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
