import React from 'react';

export const About: React.FC = () => {
  const focusAreas = [
    {
      num: '01',
      title: 'Full-Stack Web',
      description:
        'Building modular frontends in Next.js and React with TypeScript, connecting them to structured backends.'
    },
    {
      num: '02',
      title: 'Data Modeling & MongoDB',
      description:
        'Structuring document schemas in MongoDB, managing query performance, and ensuring consistent data persistence.'
    },
    {
      num: '03',
      title: 'Defensive Engineering',
      description:
        'Learning Express backend design with an emphasis on role-based authorization, input validation, and secure authentication.'
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
            My technical journey combines hands-on web development with strong computer science
            fundamentals. As a second-year Software Engineering student at Daffodil International
            University, I ground my practical application work in core engineering principles—from
            object-oriented programming in Java and memory concepts in C, to clean full-stack architecture.
          </p>
          <p>
            I approach full-stack engineering with an emphasis on defensive coding and software reliability.
            Working with TypeScript, Next.js, React, and MongoDB, and expanding into Express backends,
            I focus on role authorization, clean data validation, and predictable error handling, believing
            that good software must be dependable under unexpected user input and edge cases.
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
