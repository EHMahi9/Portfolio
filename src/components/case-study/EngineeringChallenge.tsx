import React from 'react';

export const EngineeringChallenge: React.FC = () => {
  return (
    <section className="cs-section" id="challenge" aria-labelledby="challenge-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">Engineering Deep-Dive</p>
          <h2 id="challenge-heading" className="cs-section-title">
            Real engineering challenge: From retrieval bug to context isolation.
          </h2>
          <p className="cs-section-sub">
            Building safety-critical systems reveals subtle architectural failure modes that standard
            RAG tutorials overlook. Here is how a silent retrieval bug was diagnosed and resolved.
          </p>
        </div>

        {/* Narrative Box */}
        <div className="cs-narrative-card">
          <div className="cs-narrative-phase">
            <div className="phase-marker danger">01</div>
            <div className="phase-body">
              <h4>The Bug: Unconditional Context Merging</h4>
              <p>
                During early multi-turn testing, a user submitted a detailed query regarding pediatric febrile convulsions
                (<em>&ldquo;child fever above 102F&rdquo;</em>). Three turns later in the same session, the user suddenly entered
                an acute personal complaint: <code>&ldquo;amar buk e betha&rdquo;</code> (<em>&ldquo;I have chest pain&rdquo;</em>).
              </p>
              <div className="cs-code-callout">
                <span className="code-label">Observed Pipeline Failure:</span>
                <code>
                  Query vector = Embed(&ldquo;child fever above 102F [SEP] amar buk e betha&rdquo;)
                  <br />
                  Top Retrieved Chunk: &ldquo;Febrile Seizures in Children under 5&rdquo; (Similarity: 0.81)
                  <br />
                  Cardiac Emergency Triage: <strong>FAILED TO TRIGGER (Suppressed by fever noise)</strong>
                </code>
              </div>
              <p>
                Because the conversation loop unconditionally concatenated previous turn summaries into the embedding prompt,
                the dense retriever weighted the cumulative pediatric fever terms higher than the single new chest pain phrase.
                The life-threatening symptom was dangerously buried under historical conversation noise.
              </p>
            </div>
          </div>

          <div className="cs-narrative-phase">
            <div className="phase-marker warning">02</div>
            <div className="phase-body">
              <h4>Root Cause Analysis</h4>
              <p>
                A standard conversational buffer assumes conversational continuity. But in clinical health information,
                human users frequently switch from asking questions about a family member to an urgent acute personal crisis.
                Treating multi-turn dialogue as a single growing bag of tokens is fundamentally unsafe.
              </p>
            </div>
          </div>

          <div className="cs-narrative-phase">
            <div className="phase-marker success">03</div>
            <div className="phase-body">
              <h4>The Solution: Deterministic Topic Continuity Classifier</h4>
              <p>
                We introduced a strict pre-retrieval classification step before vector generation:
              </p>
              <ol className="cs-solution-steps">
                <li>
                  <strong>Symptom Entity Extraction:</strong> Identify anatomical references, symptom descriptors, and emergency triggers in the new query.
                </li>
                <li>
                  <strong>Continuity Decision:</strong> Compare the extracted entities against the prior active context.
                  If the new turn introduces disjoint organ systems (e.g. <em>Pediatric / Temperature</em> vs <em>Thoracic / Cardiac</em>) without connecting conjunctions,
                  it is classified as <code>NEW_TOPIC</code>.
                </li>
                <li>
                  <strong>Strict Context Purge:</strong> When <code>NEW_TOPIC</code> fires, the historical summary buffer is purged to zero length before embedding.
                  The chest pain query is evaluated in complete isolation, immediately triggering emergency triage.
                </li>
              </ol>
              <div className="cs-code-callout success">
                <span className="code-label">Post-Fix Pipeline Output:</span>
                <code>
                  Classification: <strong>NEW_TOPIC (Score: 0.98)</strong> &rarr; Context purged
                  <br />
                  Emergency Scan: <strong>DETECTED [Chest Pain] &rarr; Triage Escalation Active</strong>
                  <br />
                  Output: Immediate 999 Medical Emergency Escalation Notice
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
