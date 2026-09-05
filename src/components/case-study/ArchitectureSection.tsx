import React from 'react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="cs-section" id="architecture" aria-labelledby="architecture-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">System Architecture &amp; Pipeline</p>
          <h2 id="architecture-heading" className="cs-section-title">
            How it works: A deterministic clinical retrieval pipeline.
          </h2>
          <p className="cs-section-sub">
            The system prioritizes clinical safety at every turn. Instead of sending raw user prompts
            to an external generative API, every query traverses a sequential safety and retrieval pipeline.
          </p>
        </div>

        {/* Responsive HTML/CSS Flowchart Diagram */}
        <div className="cs-diagram-shell" aria-label="System Architecture Flowchart">
          <div className="cs-diagram-flow">
            {/* Step 1 */}
            <div className="cs-flow-node">
              <div className="cs-flow-badge">01</div>
              <div className="cs-flow-content">
                <strong>User Question</strong>
                <span>Bangla, Banglish, or English query input</span>
              </div>
            </div>

            <div className="cs-flow-connector" aria-hidden="true">&darr;</div>

            {/* Step 2 */}
            <div className="cs-flow-node">
              <div className="cs-flow-badge">02</div>
              <div className="cs-flow-content">
                <strong>Query Understanding</strong>
                <span>Language detection, normalization &amp; topic continuity check</span>
              </div>
            </div>

            <div className="cs-flow-connector" aria-hidden="true">&darr;</div>

            {/* Step 3 */}
            <div className="cs-flow-node cs-flow-alert">
              <div className="cs-flow-badge">03</div>
              <div className="cs-flow-content">
                <strong>Safety / Emergency Detection</strong>
                <span>Deterministic red-flag symptom scanning (chest pain, dyspnea, shock)</span>
              </div>
            </div>

            <div className="cs-flow-connector" aria-hidden="true">&darr;</div>

            {/* Step 4 */}
            <div className="cs-flow-node">
              <div className="cs-flow-badge">04</div>
              <div className="cs-flow-content">
                <strong>Semantic Retrieval</strong>
                <span>Dense vector embedding via <code>multilingual-e5-small</code> (384-dim)</span>
              </div>
            </div>

            <div className="cs-flow-connector" aria-hidden="true">&darr;</div>

            {/* Step 5 */}
            <div className="cs-flow-node">
              <div className="cs-flow-badge">05</div>
              <div className="cs-flow-content">
                <strong>Evidence Reranking</strong>
                <span>Cross-encoder precision scoring via <code>bge-reranker-v2-m3</code></span>
              </div>
            </div>

            <div className="cs-flow-connector" aria-hidden="true">&darr;</div>

            {/* Step 6 */}
            <div className="cs-flow-node cs-flow-success">
              <div className="cs-flow-badge">06</div>
              <div className="cs-flow-content">
                <strong>Trusted NHS Guidance</strong>
                <span>Ranked clinical passages with provenance metadata &amp; uncertainty handling</span>
              </div>
            </div>

            <div className="cs-flow-connector" aria-hidden="true">&darr;</div>

            {/* Step 7 */}
            <div className="cs-flow-node">
              <div className="cs-flow-badge">07</div>
              <div className="cs-flow-content">
                <strong>User Presentation</strong>
                <span>Evidence cards, clinical caveats, and recommended emergency actions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Product Evidence Screens */}
        <div className="cs-evidence-screens">
          <div className="cs-screen-card">
            <figure className="cs-figure">
              <img
                src="/assets/images/optimized/ai-medical-assistant.webp"
                alt="Dr. Md. Momenul Islam consultation interface showing multilingual consultation greeting, evidence first badge, and sample query triggers"
                width={1500}
                height={844}
                loading="lazy"
                decoding="async"
                className="cs-screen-img"
              />
              <figcaption className="cs-screen-caption">
                <strong>Production Consultation Interface:</strong> Displays the bilingual disclaimer,
                evidence-first mandate, and quick-inquiry symptom triggers for clinical evaluation.
              </figcaption>
            </figure>
          </div>

          <div className="cs-screen-card">
            <figure className="cs-figure">
              <img
                src="/assets/images/optimized/ai-medical-specs.webp"
                alt="Dr. Md. Momenul Islam system architecture modal showing embedding dimensions, reranker specs, and verified NHS dataset chunk metrics"
                width={1500}
                height={844}
                loading="lazy"
                decoding="async"
                className="cs-screen-img"
              />
              <figcaption className="cs-screen-caption">
                <strong>Architecture &amp; Specification Modal:</strong> Outlines model configurations,
                chunking parameters, semantic vector dimensions, and latency profiles for clinical transparent auditing.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
