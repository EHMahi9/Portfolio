import React from 'react';

export const PrivacySection: React.FC = () => {
  return (
    <section className="cs-section" id="privacy" aria-labelledby="privacy-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">Data Architecture &amp; User Privacy</p>
          <h2 id="privacy-heading" className="cs-section-title">
            Anonymous-first design with local-only storage.
          </h2>
          <p className="cs-section-sub">
            Health inquiries represent exceptionally sensitive personal information.
            The platform adopts a zero-retention posture on the server.
          </p>
        </div>

        {/* 3 Privacy Pillars */}
        <div className="cs-card-grid cs-card-grid-3">
          <div className="cs-card">
            <span className="cs-pill cs-pill-secure">Anonymous-First</span>
            <h3>No Account or Sign-Up</h3>
            <p>
              Users can access the full clinical retrieval pipeline immediately.
              No phone numbers, email addresses, names, or national ID verifications are required.
            </p>
          </div>

          <div className="cs-card">
            <span className="cs-pill cs-pill-secure">Client-Side Persistence</span>
            <h3>Local Browser Storage</h3>
            <p>
              All past conversations, symptom threads, and clinical cards reside exclusively
              in the user&rsquo;s browser <code>localStorage</code>. Data never syncs to a remote user database.
            </p>
          </div>

          <div className="cs-card">
            <span className="cs-pill cs-pill-secure">Stateless Backend</span>
            <h3>Zero Cloud Conversation Logs</h3>
            <p>
              The FastAPI backend receives queries strictly for stateless embedding and reranking.
              Queries are evaluated in-memory and immediately discarded without database persistence.
            </p>
          </div>
        </div>

        {/* Compliance Integrity Statement */}
        <div className="cs-card cs-card-transparency">
          <h4>Compliance &amp; Medical Disclaimer Integrity</h4>
          <p>
            We believe engineering credibility requires absolute honesty about regulatory scope.
            <strong> Dr. Md. Momenul Islam does not claim formal HIPAA, GDPR, or certified medical device compliance.</strong>
          </p>
          <p>
            It is engineered as an educational and technical research prototype demonstrating
            evidence-grounded retrieval techniques. It should not be used as an institutional electronic health records (EHR) system
            or as a replacement for clinical evaluation by a certified physician.
          </p>
        </div>
      </div>
    </section>
  );
};
