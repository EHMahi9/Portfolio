import React from 'react';
import { projectsData } from '../data/projectsData';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  return (
    <section className="section-pad projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading projects-heading">
          <p className="eyebrow">Featured work</p>
          <h2 id="projects-title">Projects presented like products.</h2>
          <p>
            Each case study highlights the problem, my role, the solution, and the technical
            decisions behind it.
          </p>
        </div>

        {/* Project Showcase Stack */}
        <div className="project-stack">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
