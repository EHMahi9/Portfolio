import React from 'react';

export const Process: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Understand',
      description:
        'Clarify the user, constraints, core flows, and the data the system needs to manage.'
    },
    {
      num: '02',
      title: 'Design',
      description:
        'Sketch the interface, API shape, database model, and technical boundaries before implementation.'
    },
    {
      num: '03',
      title: 'Build',
      description:
        'Write modular, readable code with focused components, routes, services, and validation.'
    },
    {
      num: '04',
      title: 'Verify',
      description:
        'Test real flows, check responsiveness, improve accessibility, and reduce friction.'
    }
  ];

  return (
    <section className="section-pad soft-section" id="process" aria-labelledby="process-title">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading">
          <p className="eyebrow">Workflow</p>
          <h2 id="process-title">How I move from idea to working software.</h2>
        </div>

        {/* 4-Step Process Grid */}
        <div className="process-grid">
          {steps.map((step) => (
            <article key={step.num}>
              <span>{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
