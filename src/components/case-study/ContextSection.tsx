import React from 'react';

export const ContextSection: React.FC = () => {
  return (
    <section className="cs-section" id="context" aria-labelledby="context-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">Context Engineering &amp; Conversation Isolation</p>
          <h2 id="context-heading" className="cs-section-title">
            Context-aware dialogue without clinical cross-contamination.
          </h2>
          <p className="cs-section-sub">
            In conversational healthcare, blindly appending chat history creates dangerous medical confusion.
            Dr. Md. Momenul Islam implements deterministic topic continuity classification.
          </p>
        </div>

        {/* 3 Topic Continuity States */}
        <div className="cs-card-grid cs-card-grid-3">
          <div className="cs-card">
            <span className="cs-pill cs-pill-reset">State: NEW_TOPIC</span>
            <h3>Strict Context Reset</h3>
            <p>
              Triggered when the user pivots to an unrelated clinical subject.
              Previous turn symptoms are scrubbed from active retrieval memory so previous diagnoses
              do not pollute new vector embeddings.
            </p>
          </div>

          <div className="cs-card">
            <span className="cs-pill cs-pill-dep">State: CONTEXT_DEPENDENT</span>
            <h3>Anaphora &amp; Pronoun Linking</h3>
            <p>
              Triggered when the user asks a dependent question (e.g. <em>&ldquo;how long will it last?&rdquo;</em>).
              The system anchors the inquiry to the active condition established in the immediately prior turn.
            </p>
          </div>

          <div className="cs-card">
            <span className="cs-pill cs-pill-refine">State: SAME_TOPIC_REFINEMENT</span>
            <h3>Anatomical &amp; Symptom Specialization</h3>
            <p>
              Triggered when the user provides additional precision on the same anatomical region or symptom
              (e.g. specifying pain location or duration).
            </p>
          </div>
        </div>

        {/* Context Transition Examples */}
        <div className="cs-comparison-grid">
          {/* Example 1: Context Reset */}
          <div className="cs-card cs-card-terminal">
            <div className="cs-card-header">
              <span className="cs-card-badge danger">Context Reset Flow</span>
              <h4>Preventing Cross-Contamination</h4>
            </div>
            <div className="cs-terminal-flow">
              <div className="cs-turn">
                <span className="turn-idx">Turn 1</span>
                <p><strong>Query:</strong> &ldquo;My child has a high fever for 2 days.&rdquo;</p>
                <span className="turn-meta">Active context: Pediatric Febrile Illness</span>
              </div>
              <div className="cs-turn-divider" aria-hidden="true">&darr; User shifts topic</div>
              <div className="cs-turn alert">
                <span className="turn-idx">Turn 2</span>
                <p><strong>Query:</strong> &ldquo;amar buk e betha&rdquo; <em>(Chest pain)</em></p>
                <span className="turn-badge badge-reset">NEW_TOPIC Classified</span>
                <p className="turn-result">
                  Child fever symptoms are <strong>strictly purged</strong> from the active query context.
                  Retrieval focuses exclusively on adult/acute chest pain guidance without pediatric fever pollution.
                </p>
              </div>
            </div>
          </div>

          {/* Example 2: Context Preservation */}
          <div className="cs-card cs-card-terminal">
            <div className="cs-card-header">
              <span className="cs-card-badge success">Context Preservation Flow</span>
              <h4>Anatomical Refinement</h4>
            </div>
            <div className="cs-terminal-flow">
              <div className="cs-turn">
                <span className="turn-idx">Turn 1</span>
                <p><strong>Query:</strong> &ldquo;amar pa betha korche&rdquo; <em>(My leg is hurting)</em></p>
                <span className="turn-meta">Active context: Lower Limb Pain</span>
              </div>
              <div className="cs-turn-divider" aria-hidden="true">&darr; User refines location</div>
              <div className="cs-turn success">
                <span className="turn-idx">Turn 2</span>
                <p><strong>Query:</strong> &ldquo;gorar kache&rdquo; <em>(Near the heel / ankle)</em></p>
                <span className="turn-badge badge-preserve">SAME_TOPIC_REFINEMENT</span>
                <p className="turn-result">
                  Leg pain context is <strong>preserved and merged</strong> into &ldquo;leg pain near heel/ankle&rdquo;,
                  accurately steering retrieval toward Achilles tendonitis and ankle sprain guidance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Conversation Isolation */}
        <div className="cs-card cs-card-threads">
          <div className="cs-thread-header">
            <h3>Multi-Threaded Session Architecture</h3>
            <span className="cs-pill">Isolated Browser State</span>
          </div>
          <p>
            Users often investigate distinct clinical concerns across different sessions or family members.
            The frontend maintains independent conversation threads:
          </p>

          <div className="cs-threads-visual">
            <div className="cs-thread-col">
              <div className="thread-chip">Conversation A</div>
              <strong>Pediatric Fever</strong>
              <span>Isolated turn history, clinical state, and NHS pediatric chunks</span>
            </div>
            <div className="cs-thread-col active">
              <div className="thread-chip active">Conversation B (Active)</div>
              <strong>Chest Pain Triage</strong>
              <span>Active evaluation of cardiac warning signs; 0% context leakage from Thread A</span>
            </div>
            <div className="cs-thread-col">
              <div className="thread-chip">Conversation C</div>
              <strong>Leg / Ankle Injury</strong>
              <span>Musculoskeletal guidance and recovery protocols; strictly separated</span>
            </div>
          </div>

          <p className="cs-thread-footer">
            Each conversation thread strictly encapsulates its own messages and active clinical context.
            Switching conversations in the UI instantly swaps the active session scope without leaking symptoms.
            All threads are persisted locally in the user&rsquo;s browser via <code>localStorage</code>.
          </p>
        </div>
      </div>
    </section>
  );
};
