import React from 'react';

interface CaseStudyHeroProps {
  onBackToPortfolio: () => void;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ onBackToPortfolio }) => {
  return (
    <header className="cs-hero">
      <div className="cs-container">
        {/* Breadcrumb & Navigation */}
        <nav className="cs-breadcrumb" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBackToPortfolio();
            }}
            className="cs-back-link"
          >
            &larr; Back to Portfolio
          </a>
          <span className="cs-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="cs-breadcrumb-current">Case Study</span>
        </nav>

        {/* Project Meta Badges */}
        <div className="cs-hero-badges">
          <span className="cs-badge cs-badge-flagship">Flagship Project</span>
          <span className="cs-badge cs-badge-clinical">Clinical Health Intelligence</span>
          <span className="cs-badge cs-badge-status">
            <span className="cs-status-dot" aria-hidden="true" />
            Live System
          </span>
          <span className="cs-badge cs-badge-diff">LLM-Free Production Generation</span>
        </div>

        {/* Title and Headline */}
        <h1 className="cs-hero-title">Dr. Md. Momenul Islam</h1>
        <p className="cs-hero-headline">
          Building a safer, evidence-grounded health information assistant.
        </p>

        {/* Supporting Description */}
        <p className="cs-hero-lead">
          Dr. Md. Momenul Islam is a Bangladesh-focused health information system designed to provide
          transparent, source-grounded guidance instead of unconstrained medical generation.
        </p>

        {/* Action Buttons */}
        <div className="cs-hero-actions">
          <a
            href="https://drmomenul.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary"
          >
            Live Demo
          </a>
          <a
            href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            View on GitHub
          </a>
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="button button-secondary cs-btn-back"
          >
            &larr; Back to Selected Work
          </button>
        </div>

        {/* Quick Facts Grid */}
        <div className="cs-quick-specs">
          <div className="cs-spec-item">
            <span className="cs-spec-label">Target Audience</span>
            <strong className="cs-spec-value">Bangla, Banglish &amp; English Users</strong>
          </div>
          <div className="cs-spec-item">
            <span className="cs-spec-label">Retrieval Architecture</span>
            <strong className="cs-spec-value">Two-Stage (E5-Small + BGE Reranker)</strong>
          </div>
          <div className="cs-spec-item">
            <span className="cs-spec-label">Clinical Knowledge Base</span>
            <strong className="cs-spec-value">14 NHS England Topics (119 Chunks)</strong>
          </div>
          <div className="cs-spec-item">
            <span className="cs-spec-label">Safety Handling</span>
            <strong className="cs-spec-value">Deterministic Emergency Triage (999)</strong>
          </div>
        </div>
      </div>
    </header>
  );
};
