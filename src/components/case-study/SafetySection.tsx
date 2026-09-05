import React from 'react';

export const SafetySection: React.FC = () => {
  return (
    <section className="cs-section" id="safety" aria-labelledby="safety-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">Clinical Safety Architecture</p>
          <h2 id="safety-heading" className="cs-section-title">
            Deterministic triage: Emergency escalation over guidance.
          </h2>
          <p className="cs-section-sub">
            In medical interactions, missing an acute clinical emergency is catastrophic.
            The pipeline classifies every turn into four distinct tiers before rendering evidence.
          </p>
        </div>

        {/* 4 Classification Tiers */}
        <div className="cs-tiers-grid">
          <div className="cs-tier-card">
            <span className="cs-tier-tag tier-normal">Tier 1: Ordinary Query</span>
            <h4>Answerable Clinical Query</h4>
            <p>
              Query clearly aligns with verified NHS clinical topics (e.g. <em>&ldquo;oral rehydration for dehydration&rdquo;</em>).
              Matches trusted chunks with high confidence score and renders grounded evidence cards.
            </p>
          </div>

          <div className="cs-tier-card">
            <span className="cs-tier-tag tier-ambiguous">Tier 2: Ambiguous Query</span>
            <h4>Uncertainty &amp; Clarification</h4>
            <p>
              Input indicates symptoms but lacks clinical specificity. Rather than offering premature advice,
              the assistant prompts targeted clarifying questions.
            </p>
          </div>

          <div className="cs-tier-card cs-tier-critical">
            <span className="cs-tier-tag tier-emergency">Tier 3: Emergency Red-Flag</span>
            <h4>Urgent Escalation (999)</h4>
            <p>
              Detects life-threatening symptoms (cardiac signs, respiratory distress, anaphylaxis).
              Immediately suppresses normal information and presents prominent emergency escalation advice.
            </p>
          </div>

          <div className="cs-tier-card">
            <span className="cs-tier-tag tier-scope">Tier 4: Out-of-Scope</span>
            <h4>Transparent Boundary</h4>
            <p>
              Query involves off-topic queries or conditions not present in the 14 verified NHS guidelines.
              Transparently declines to speculate and advises consulting a qualified doctor.
            </p>
          </div>
        </div>

        {/* Concrete Safety Example Walkthrough */}
        <div className="cs-scenario-box">
          <div className="cs-scenario-header">
            <h3>Real-World Clinical Safety Progression</h3>
            <span className="cs-pill">Bangla / Banglish Triage</span>
          </div>

          <div className="cs-scenario-steps">
            {/* Step A */}
            <div className="cs-scenario-item">
              <div className="cs-scenario-query">
                <span className="cs-speaker user">User Query 1</span>
                <code>&ldquo;amar buk e betha&rdquo;</code>
                <span className="translation">(Translation: &ldquo;I have chest pain&rdquo;)</span>
              </div>
              <div className="cs-scenario-action ambiguous">
                <span className="cs-action-label">System Behavior: Ambiguous Query Triage</span>
                <p>
                  Chest pain can range from mild muscular strain or gastroesophageal reflux to acute myocardial infarction.
                  Because critical discriminators are missing, the system does not guess. It prompts:
                </p>
                <blockquote>
                  &ldquo;Chest pain requires careful attention. Does the pain feel like heavy pressure or tightness?
                  Does it radiate to your arm, neck, or jaw, or are you feeling short of breath?&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Step B */}
            <div className="cs-scenario-item">
              <div className="cs-scenario-query">
                <span className="cs-speaker user">User Follow-Up</span>
                <code>&ldquo;amar buk e betha, shash niteo koshto hocche&rdquo;</code>
                <span className="translation">(Translation: &ldquo;Chest pain, and having difficulty breathing&rdquo;)</span>
              </div>
              <div className="cs-scenario-action emergency">
                <span className="cs-action-label">System Behavior: Immediate Emergency Escalation</span>
                <p>
                  The combination of chest discomfort with dyspnea (difficulty breathing) triggers deterministic red-flag escalation.
                  Normal informational retrieval is <strong>immediately overridden</strong>.
                </p>
                <div className="cs-emergency-callout">
                  <div className="cs-emergency-icon" aria-hidden="true">&Delta;</div>
                  <div>
                    <strong>CRITICAL MEDICAL NOTICE:</strong>
                    <p>
                      These combined symptoms may indicate a medical emergency (such as acute coronary syndrome).
                      <strong> Immediately call Bangladesh Emergency Services at 999 or proceed to the nearest hospital emergency room.</strong>
                      Do not wait for online symptom guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="cs-disclaimer-note">
            <em>Important Notice: The assistant provides immediate triage guidance to help users recognize urgency;
            it is a software interface and does not automatically dial or contact emergency services on the user&rsquo;s behalf.</em>
          </p>
        </div>
      </div>
    </section>
  );
};
