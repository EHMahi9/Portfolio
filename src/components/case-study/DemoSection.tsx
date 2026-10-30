import React from 'react';

export const DemoSection: React.FC = () => {
  return (
    <section className="cs-section" id="demo" aria-labelledby="demo-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">System Walkthrough</p>
          <h2 id="demo-heading" className="cs-section-title">
            Demo
          </h2>
          <p className="cs-section-sub">
            End-to-end recording of the full local Python retrieval pipeline and conversational interface.
          </p>
        </div>

        <div className="cs-video-wrapper" style={{
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden',
          background: '#090d16',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
          marginBottom: '2rem'
        }}>
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster="/assets/media/flagship-demo-poster.webp"
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '520px' }}
          >
            <source src="/assets/media/flagship-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="cs-demo-walkthrough" style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem'
        }}>
          <h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem' }}>
            Recording Walkthrough Highlights
          </h3>
          <ul style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.7 }}>
            <li>English symptom query &rarr; retrieved NHS passage with citation</li>
            <li>Banglish query (<code>amar matha betha</code>) &rarr; phonetic normalization &rarr; same retrieval path</li>
            <li><code>chest pain</code> &rarr; deterministic emergency-triage rule fires, bypasses search, shows emergency contact</li>
            <li>Out-of-scope query &rarr; system declines rather than hallucinating</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
