import React from 'react';

export const StatsBand: React.FC = () => {
  const stats = [
    { count: '6', label: 'Featured projects' },
    { count: '5', label: 'Live full-stack deployments' },
    { count: '10+', label: 'Technologies practiced' },
    { count: '100%', label: 'Built around real coursework and products' }
  ];

  return (
    <section className="stats-band" aria-label="Portfolio statistics">
      <div className="container stats-grid">
        {stats.map((stat, index) => (
          <article key={index} className="metric">
            <strong>{stat.count}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
};
