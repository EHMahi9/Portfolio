import React from 'react';

export const ResultsSection: React.FC = () => {
  return (
    <section className="cs-section" id="results" aria-labelledby="results-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">Empirical Verification</p>
          <h2 id="results-heading" className="cs-section-title">
            Verified test suite &amp; regression metrics.
          </h2>
          <p className="cs-section-sub">
            In safety-oriented engineering, claims must be backed by reproducible test suites.
            All reported metrics reflect automated test runs on the production repository.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="cs-card-grid cs-card-grid-4">
          <div className="cs-metric-card">
            <span className="cs-metric-num">39 / 39</span>
            <span className="cs-metric-label">Backend &amp; Live Tests</span>
            <p>100% pass rate covering FastAPI endpoints, semantic vector distances, and multilingual transliterations.</p>
          </div>

          <div className="cs-metric-card">
            <span className="cs-metric-num">12 / 12</span>
            <span className="cs-metric-label">Frontend Storage Tests</span>
            <p>Validating thread isolation, local storage serialization, schema migrations, and zero memory leaks.</p>
          </div>

          <div className="cs-metric-card">
            <span className="cs-metric-num">5 / 5</span>
            <span className="cs-metric-label">Clinical Flow Tests</span>
            <p>Rigorous verification of emergency escalation, ambiguity clarification, and out-of-scope refusals.</p>
          </div>

          <div className="cs-metric-card">
            <span className="cs-metric-num">100%</span>
            <span className="cs-metric-label">Production Build</span>
            <p>Vite + TypeScript production compilation cleanly executed with zero type warnings or unhandled exceptions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
