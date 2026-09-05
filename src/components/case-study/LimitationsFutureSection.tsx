import React from 'react';

export const LimitationsFutureSection: React.FC = () => {
  return (
    <section className="cs-section" id="limitations-future" aria-labelledby="limitations-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">Honest Engineering Scope</p>
          <h2 id="limitations-heading" className="cs-section-title">
            Current limitations &amp; future roadmap.
          </h2>
          <p className="cs-section-sub">
            Medical systems demand radical transparency regarding what they can and cannot do.
          </p>
        </div>

        <div className="cs-comparison-grid">
          {/* Current Limitations */}
          <div className="cs-card cs-card-warning">
            <div className="cs-card-header">
              <span className="cs-card-badge warning">Current Scope</span>
              <h3>Active Limitations</h3>
            </div>
            <ul className="cs-list cs-list-warning">
              <li>
                <strong>Curated Corpus Boundary:</strong> Clinical knowledge is restricted to the 14 verified
                NHS England topics (119 chunks). Unindexed clinical queries receive out-of-scope notices.
              </li>
              <li>
                <strong>English Source Passages:</strong> While queries in Bangla and Banglish are mapped
                semantically, the underlying NHS guidance excerpts are rendered in their certified English text
                to prevent translation drift or clinical mistranslation.
              </li>
              <li>
                <strong>Generative Output Disabled:</strong> Synthesized conversational answers are intentionally
                turned off. Users read exact excerpts rather than summarized prose.
              </li>
              <li>
                <strong>Educational Prototype:</strong> The application is a technology demonstrator. It is not an
                Electronic Health Record (EHR) and never substitutes for examination by a licensed physician.
              </li>
            </ul>
          </div>

          {/* Future Roadmap */}
          <div className="cs-card cs-card-future">
            <div className="cs-card-header">
              <span className="cs-card-badge info">Planned Roadmap</span>
              <h3>Future Directions <small>(Not Current)</small></h3>
            </div>
            <ul className="cs-list cs-list-info">
              <li>
                <strong>Optional Authentication:</strong> Optional user sign-in to support persistent health logs
                without compromising the anonymous-first default.
              </li>
              <li>
                <strong>End-to-End Encrypted Cloud Backup:</strong> User-controlled zero-knowledge backup for
                conversation history across multiple devices.
              </li>
              <li>
                <strong>Expanded Source Governance:</strong> Ingestion of certified localized Bangladesh health
                guidance (DGHS protocols) vetted by clinical advisory panels.
              </li>
              <li>
                <strong>Strictly Constrained Generation:</strong> Investigating constrained decoders that can synthesize
                Bangla summaries exclusively utilizing extracted tokens from retrieved evidence.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
