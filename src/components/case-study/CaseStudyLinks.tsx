import React from 'react';

interface CaseStudyLinksProps {
  onBackToPortfolio: () => void;
}

export const CaseStudyLinks: React.FC<CaseStudyLinksProps> = ({ onBackToPortfolio }) => {
  return (
    <section className="cs-section cs-section-footer" id="case-study-links" aria-labelledby="links-heading">
      <div className="cs-container">
        <div className="cs-links-box">
          <p className="cs-eyebrow">Explore the Project</p>
          <h2 id="links-heading" className="cs-links-title">
            Test the live assistant or review the code.
          </h2>
          <p className="cs-links-lead">
            The project is fully open-source with reproducible test suites, container configs, and dataset documentation.
          </p>

          <div className="cs-links-actions">
            <a
              href="https://drmomenul.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Launch Live Demo
            </a>
            <a
              href="https://github.com/EHMahi9/Dr.-Md.-Momenul-Islam"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              GitHub Repository
            </a>
            <button
              type="button"
              onClick={onBackToPortfolio}
              className="button button-secondary"
            >
              &larr; Return to Portfolio Showcase
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
