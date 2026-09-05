import React from 'react';

export const RetrievalSection: React.FC = () => {
  return (
    <section className="cs-section" id="retrieval-ml" aria-labelledby="retrieval-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">AI / ML &amp; Clinical Knowledge</p>
          <h2 id="retrieval-heading" className="cs-section-title">
            Two-stage retrieval over certified NHS England guidance.
          </h2>
          <p className="cs-section-sub">
            Pretrained open weights are leveraged strictly for information indexing and reranking,
            completely decoupled from generative text generation.
          </p>
        </div>

        {/* Mandatory API Disclosure Callout */}
        <div className="cs-disclosure-banner" role="region" aria-label="API Architecture Disclosure">
          <div className="cs-disclosure-icon" aria-hidden="true">&iexcl;</div>
          <div className="cs-disclosure-content">
            <h4>Critical Architectural &amp; API Disclosure</h4>
            <p>
              <strong>Current production answering does not use OpenAI, Gemini, Claude, or another external generative AI API.</strong>
            </p>
            <p>
              Pretrained language models are run locally and self-hosted for semantic vector retrieval and
              cross-encoder evidence reranking. <strong>Generative LLM output is intentionally disabled</strong> to
              completely prevent medical hallucination, dosage fabrication, and ungrounded clinical extrapolation.
            </p>
          </div>
        </div>

        {/* Model Breakdown Grid */}
        <div className="cs-card-grid cs-card-grid-2">
          {/* Embedding Model */}
          <div className="cs-card">
            <div className="cs-card-topline">
              <span className="cs-pill">Dense Retriever</span>
              <span className="cs-mono">384-dim</span>
            </div>
            <h3>multilingual-e5-small</h3>
            <p>
              Transforms incoming queries and clinical chunks into dense vector representations.
              Trained specifically on multilingual semantic equivalence, allowing it to seamlessly bridge
              Bangla, phonetically transliterated Banglish (e.g. <em>&ldquo;matha betha&rdquo;</em>), and formal English clinical terminology.
            </p>
            <ul className="cs-feature-bullets">
              <li>Low inference latency (sub-120ms CPU execution)</li>
              <li>Symmetric cosine similarity retrieval across multilingual token spaces</li>
              <li>Generates top-K (10) preliminary candidates for reranking</li>
            </ul>
          </div>

          {/* Reranker Model */}
          <div className="cs-card">
            <div className="cs-card-topline">
              <span className="cs-pill">Cross-Encoder</span>
              <span className="cs-mono">m3 Architecture</span>
            </div>
            <h3>bge-reranker-v2-m3</h3>
            <p>
              Acts as the second-stage precision filter. Rather than relying solely on bi-encoder dot products,
              the cross-encoder performs deep bidirectional self-attention between the query and each candidate passage.
            </p>
            <ul className="cs-feature-bullets">
              <li>Evaluates full query-passage context interaction</li>
              <li>Filters false positives from keyword overlap or ambiguous symptom words</li>
              <li>Yields confidence scores used for uncertainty triage</li>
            </ul>
          </div>
        </div>

        {/* Curated Clinical Knowledge Base */}
        <div className="cs-card cs-card-highlight">
          <div className="cs-kb-header">
            <div>
              <p className="cs-eyebrow">Constrained Knowledge Corpus</p>
              <h3>Curated NHS England Clinical Corpus</h3>
            </div>
            <div className="cs-kb-stats">
              <div className="cs-kb-stat">
                <span className="num">14</span>
                <span className="lbl">Verified Topics</span>
              </div>
              <div className="cs-kb-stat">
                <span className="num">119</span>
                <span className="lbl">Clinical Chunks</span>
              </div>
            </div>
          </div>
          <p>
            Unlike search-augmented bots that pull unvetted forum discussions or commercial blogs,
            Dr. Md. Momenul Islam operates on a strictly closed, verified corpus extracted from official
            <strong> NHS England clinical guidelines</strong>.
          </p>
          <p>
            Topics cover acute community concerns, including fever management, diarrhea and rehydration,
            chest pain identification, asthma exacerbations, and pediatric warning signs.
            <strong> The system does not claim universal medical knowledge</strong>; if a query falls outside the
            indexed corpus, the assistant transparently reports that verified evidence is unavailable rather than guessing.
          </p>
        </div>
      </div>
    </section>
  );
};
