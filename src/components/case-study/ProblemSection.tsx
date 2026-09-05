import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="cs-section" id="problem" aria-labelledby="problem-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">The Problem &amp; Core Motivation</p>
          <h2 id="problem-heading" className="cs-section-title">
            Why general-purpose AI is hazardous for medical questions.
          </h2>
          <p className="cs-section-sub">
            When people face sudden symptoms, they increasingly turn to conversational AI chatbots.
            However, probabilistic text generation introduces severe clinical vulnerabilities.
          </p>
        </div>

        {/* Two-Column Comparison: Generative Chatbots vs Constrained Information Assistant */}
        <div className="cs-comparison-grid">
          {/* Risk Card */}
          <div className="cs-card cs-card-danger">
            <div className="cs-card-header">
              <span className="cs-card-badge danger">The Risk</span>
              <h3>Unconstrained Generative Chatbots</h3>
            </div>
            <ul className="cs-list cs-list-danger">
              <li>
                <strong>Plausible Hallucinations:</strong> Standard large language models generate fluent,
                convincing text based on token probabilities rather than verified clinical evidence.
              </li>
              <li>
                <strong>Lack of Transparent Grounding:</strong> Answers cannot easily be traced to a specific,
                certified medical authority or peer-reviewed clinical document.
              </li>
              <li>
                <strong>Delayed Emergency Intervention:</strong> Conversational bots often attempt to answer
                acute red-flag symptoms with lifestyle tips instead of urgent escalation.
              </li>
              <li>
                <strong>False Sense of Diagnostic Authority:</strong> Encouraging users to believe a software
                system has "diagnosed" their underlying health condition.
              </li>
            </ul>
          </div>

          {/* Constrained Solution Card */}
          <div className="cs-card cs-card-solution">
            <div className="cs-card-header">
              <span className="cs-card-badge success">Our Engineering Approach</span>
              <h3>Evidence-First Health Retrieval</h3>
            </div>
            <ul className="cs-list cs-list-success">
              <li>
                <strong>Trusted Source Retrieval:</strong> Answers are bound strictly to verified clinical
                documents from NHS England—no unvetted web crawling or guessing.
              </li>
              <li>
                <strong>Deterministic Safety Handling:</strong> Emergency indicators bypass text retrieval
                entirely and trigger immediate escalation protocols.
              </li>
              <li>
                <strong>Uncertainty-Aware Clarification:</strong> When user symptoms are vague or ambiguous,
                the assistant asks targeted follow-up questions instead of speculating.
              </li>
              <li>
                <strong>Transparent Evidence Cards:</strong> Every retrieved guidance card highlights the exact
                original NHS source title, topic, and clinical excerpt for full user inspection.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
