import React from 'react';
import { projectsData, archivedProjects } from '../data/projectsData';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  return (
    <section className="section-pad projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading projects-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="projects-title">Projects presented like products.</h2>
          <p>
            Focused software applications highlighting systems architecture, data models,
            and real-world utility.
          </p>
        </div>

        {/* Primary Project Showcase Stack (01 to 06) */}
        <div className="project-stack">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Work — Supporting Projects & Archives */}
        {archivedProjects.length > 0 && (
          <div className="other-work-section">
            <div className="other-work-header">
              <p className="eyebrow">Other work</p>
              <h3 className="other-work-title">Additional systems &amp; prototypes</h3>
              <p className="other-work-sub">
                Earlier applications and exploratory tools built with modular backends and real-time feeds.
              </p>
            </div>

            <div className="other-work-grid">
              {archivedProjects.map((project) => (
                <article key={project.id} className="other-work-card" id={project.id}>
                  <div className="other-work-topline">
                    <span>{project.category}</span>
                    <strong>{project.badge}</strong>
                  </div>
                  <h4>{project.title}</h4>
                  <p className="other-work-desc">{project.shortDescription}</p>
                  <div className="tag-list">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a
                      className="button button-small button-primary"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try now
                    </a>
                    <a
                      className="button button-small button-secondary"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
