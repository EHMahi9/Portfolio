import React, { useEffect } from 'react';
import { Project } from '../types/project';

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-modal-header">
          <div>
            <span className="project-modal-category">{project.category}</span>
            <h2 id="modal-title" className="project-modal-title">{project.title}</h2>
          </div>
          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label="Close details"
          >
            &times;
          </button>
        </div>

        <div className="project-modal-body">
          {project.image && (
            <div className="project-modal-image-wrap">
              <img
                src={project.image}
                alt={project.imageAlt || project.title}
                className="project-modal-image"
              />
            </div>
          )}

          <div className="project-modal-section">
            <h3>Overview</h3>
            <p>{project.shortDescription || project.solution}</p>
          </div>

          <div className="project-modal-section">
            <h3>Main Technology Stack</h3>
            <div className="tag-list">
              {project.technologies.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
          </div>

          {project.challenges && project.challenges.length > 0 && (
            <div className="project-modal-section">
              <h3>Challenges Faced During Development</h3>
              <ul className="project-modal-list">
                {project.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {project.futurePlans && project.futurePlans.length > 0 && (
            <div className="project-modal-section">
              <h3>Potential Improvements &amp; Future Plans</h3>
              <ul className="project-modal-list">
                {project.futurePlans.map((fp, i) => (
                  <li key={i}>{fp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="project-modal-footer">
          {!project.demoUrl && project.demoVideoUrl ? (
            <a
              href={project.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Watch Demo
            </a>
          ) : project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`button button-primary ${project.isDemoDisabled ? 'button-disabled' : ''}`}
              onClick={project.isDemoDisabled ? (e) => e.preventDefault() : undefined}
            >
              {project.isDemoDisabled ? 'Demo Pending' : 'Live Demo'}
            </a>
          ) : null}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            GitHub (Client)
          </a>
          {project.caseStudyUrl && (
            <a
              href={project.caseStudyUrl}
              className="button button-ghost"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                window.history.pushState(null, '', project.caseStudyUrl!);
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Architecture &amp; Specs
            </a>
          )}
          <button type="button" className="button button-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
