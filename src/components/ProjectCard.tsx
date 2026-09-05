import React from 'react';
import { Project } from '../types/project';
import { RoadPulseMockup } from './RoadPulseMockup';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Label for primary action button ("Try now" vs "Live demo" vs "Demo pending")
  const getActionLabel = () => {
    if (project.isDemoDisabled) return 'Demo pending';
    if (
      project.id === 'proj-power-pulse' ||
      project.id === 'proj-noboghat' ||
      project.id === 'proj-roadpulse'
    ) {
      return 'Try now';
    }
    return 'Live demo';
  };

  return (
    <article
      className={`project-showcase ${project.isReversed ? 'is-reversed' : ''}`}
      id={project.id}
    >
      {/* Visual Mockup Column */}
      {project.isCustomMockup ? (
        <RoadPulseMockup />
      ) : (
        <figure className="browser-mockup">
          <div className="browser-bar" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <small>{project.browserUrl}</small>
          </div>
          <div className="browser-screen">
            {project.image && (
              <img
                src={project.image}
                width={1500}
                height={844}
                loading="lazy"
                decoding="async"
                alt={project.imageAlt || project.title}
              />
            )}
          </div>
        </figure>
      )}

      {/* Content Column */}
      <div className="project-content">
        <div className="project-topline">
          <span>{project.category}</span>
          <strong>{project.badge}</strong>
        </div>

        <h3>{project.title}</h3>

        <dl className="project-facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>Solution</dt>
            <dd>{project.solution}</dd>
          </div>
        </dl>

        <ul className="feature-list">
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <div className="tag-list">
          {project.technologies.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
        </div>

        <div className="project-actions">
          {project.isDemoDisabled ? (
            <a
              className="button button-primary button-disabled"
              href={project.demoUrl}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
            >
              {getActionLabel()}
            </a>
          ) : (
            <a
              className="button button-primary"
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getActionLabel()}
            </a>
          )}

          <a
            className="button button-secondary"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
};
