import React, { useState, useEffect } from 'react';
import { CaseStudyHero } from './CaseStudyHero';
import { ProblemSection } from './ProblemSection';
import { ArchitectureSection } from './ArchitectureSection';
import { RetrievalSection } from './RetrievalSection';
import { SafetySection } from './SafetySection';
import { ContextSection } from './ContextSection';
import { PrivacySection } from './PrivacySection';
import { EngineeringChallenge } from './EngineeringChallenge';
import { ResultsSection } from './ResultsSection';
import { TechStackSection } from './TechStackSection';
import { LimitationsFutureSection } from './LimitationsFutureSection';
import { CaseStudyLinks } from './CaseStudyLinks';
import { Footer } from '../Footer';

interface CaseStudyPageProps {
  onBackToPortfolio: () => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ onBackToPortfolio }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  // Initialize theme
  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(currentTheme);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('mahi-portfolio-theme', nextTheme);
    const meta = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");
    if (meta) {
      meta.setAttribute('content', nextTheme === 'light' ? '#d9efff' : '#071a3d');
    }
  };

  return (
    <div className="case-study-page">
      {/* Case Study Sticky Navigation */}
      <header className="cs-nav">
        <div className="cs-container cs-nav-inner">
          <div className="cs-nav-brand">
            <button
              type="button"
              onClick={onBackToPortfolio}
              className="cs-nav-home-btn"
              aria-label="Return to portfolio homepage"
            >
              <span className="brand-dot" aria-hidden="true" />
              <strong>Ebnul Hasan Mahi</strong>
            </button>
            <span className="cs-nav-sep" aria-hidden="true">/</span>
            <span className="cs-nav-title">Flagship Case Study</span>
          </div>

          <div className="cs-nav-controls">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                {theme === 'dark' ? '\u2600' : '\u263E'}
              </span>
            </button>

            <button
              type="button"
              onClick={onBackToPortfolio}
              className="button button-small button-secondary cs-nav-exit-btn"
            >
              &larr; Portfolio
            </button>
          </div>
        </div>
      </header>

      {/* Main Case Study Article */}
      <main id="main" className="cs-main-content">
        <CaseStudyHero onBackToPortfolio={onBackToPortfolio} />
        <ProblemSection />
        <ArchitectureSection />
        <RetrievalSection />
        <SafetySection />
        <ContextSection />
        <PrivacySection />
        <EngineeringChallenge />
        <ResultsSection />
        <TechStackSection />
        <LimitationsFutureSection />
        <CaseStudyLinks onBackToPortfolio={onBackToPortfolio} />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
};
