import React, { useRef, useEffect, useState } from 'react';
import { Project } from '../types/project';
import { RoadPulseMockup } from './RoadPulseMockup';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const mockupRef = useRef<HTMLElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Pointer-following 3D micro-tilt effect on the browser mockup
  useEffect(() => {
    const mockup = mockupRef.current;
    if (!mockup) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mockup.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      const rotateX = ((y / rect.height) - 0.5) * -5;

      mockup.classList.add('is-tilting');
      mockup.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    };

    const handlePointerLeave = () => {
      mockup.classList.remove('is-tilting');
      mockup.style.transform = '';
    };

    mockup.addEventListener('pointermove', handlePointerMove);
    mockup.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      mockup.removeEventListener('pointermove', handlePointerMove);
      mockup.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Format project number e.g. "01", "02"
  const projectNumber = index !== undefined ? String(index + 1).padStart(2, '0') : null;

  // Selected screenshot source, alt, and label
  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : project.image
    ? [{ src: project.image, alt: project.imageAlt || project.title, label: 'Primary' }]
    : [];

  const currentScreenshot = screenshots[activeImageIndex] || screenshots[0];

  // Label for primary action button ("Try now" vs "Live demo" vs "Demo pending")
  const getActionLabel = () => {
    if (project.isDemoDisabled) return 'Demo pending';
    if (
      project.id === 'proj-noboghat' ||
      project.id === 'proj-roadpulse'
    ) {
      return 'Try now';
    }
    return 'Live demo';
  };

  return (
    <article
      className={`project-showcase ${project.isReversed ? 'is-reversed' : ''} ${project.featured ? 'is-flagship' : ''}`}
      id={project.id}
    >
      {/* Visual Mockup Column */}
      {project.isCustomMockup ? (
        <RoadPulseMockup />
      ) : (
        <figure ref={mockupRef} className="browser-mockup" data-tilt>
          <div className="browser-bar" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <small>{project.browserUrl}</small>
          </div>
          <div className="browser-screen">
            {currentScreenshot && (
              <img
                key={currentScreenshot.src}
                src={currentScreenshot.src}
                width={1500}
                height={844}
                loading="lazy"
                decoding="async"
                alt={currentScreenshot.alt}
                className="mockup-img-fade"
              />
            )}
          </div>

          {/* User-controlled screenshot switcher (strictly manual, no auto-movement) */}
          {screenshots.length > 1 && (
            <div
              className="mockup-controls"
              role="tablist"
              aria-label={`${project.title} screenshots`}
            >
              {screenshots.map((shot, idx) => {
                const isSelected = activeImageIndex === idx;
                return (
                  <button
                    key={shot.src}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`View screenshot ${idx + 1}: ${shot.label}`}
                    className={`mockup-tab-btn ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <span className="mockup-tab-dot" aria-hidden="true" />
                    <span>{shot.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </figure>
      )}

      {/* Content Column — Concise Homepage Card Structure */}
      <div className="project-content">
        <div className="project-topline">
          <div className="topline-meta">
            {projectNumber && <span className="project-num-tag">{projectNumber}</span>}
            <span>{project.category}</span>
            {project.featured && (
              <span className="badge-flagship" aria-label="Flagship Project">
                Flagship
              </span>
            )}
          </div>
          <strong>{project.badge}</strong>
        </div>

        <h3>{project.title}</h3>

        {project.shortDescription && (
          <p className="project-tagline">{project.shortDescription}</p>
        )}

        {project.differentiator && (
          <div className="project-differentiator">
            <span className="differentiator-pill">
              <span className="differentiator-dot" aria-hidden="true"></span>
              {project.differentiator}
            </span>
          </div>
        )}

        <div className="tag-list">
          {project.technologies.map((tech, i) => (
            <span key={i}>{tech}</span>
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

          {project.caseStudyUrl && (
            <a
              className="button button-secondary button-case-study"
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Architecture &amp; Specs
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
