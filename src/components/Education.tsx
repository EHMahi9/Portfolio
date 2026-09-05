import React from 'react';

export const Education: React.FC = () => {
  const courses = [
    'Algorithms',
    'Data Structures',
    'OOP',
    'Database Systems',
    'Operating Systems',
    'Web Development',
    'System Analysis'
  ];

  return (
    <section className="section-pad" id="education" aria-labelledby="education-title">
      <div className="container education-panel" data-tilt>
        <div>
          <p className="eyebrow">Education</p>
          <h2 id="education-title">Bachelor of Science in Software Engineering</h2>
          <p>Daffodil International University</p>
        </div>

        <div className="tag-list">
          {courses.map((course, index) => (
            <span key={index}>{course}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
