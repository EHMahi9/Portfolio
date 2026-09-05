import React from 'react';

interface TechCategory {
  category: string;
  items: { name: string; description: string }[];
}

const techStackData: TechCategory[] = [
  {
    category: 'Frontend Engineering',
    items: [
      { name: 'React', description: 'Declarative component hierarchy with zero heavy state library bloat' },
      { name: 'TypeScript', description: 'Strict typing across medical query models and UI states' },
      { name: 'Vite', description: 'Optimized bundler providing fast HMR and lightweight production chunks' },
      { name: 'Tailwind CSS', description: 'Utility-first styling powering the responsive assistant interface' }
    ]
  },
  {
    category: 'Backend & Inference API',
    items: [
      { name: 'Python', description: 'Core language for ML inference, tokenization, and vector manipulation' },
      { name: 'FastAPI', description: 'High-throughput async web framework with automatic OpenAPI documentation' }
    ]
  },
  {
    category: 'AI & Semantic Retrieval',
    items: [
      { name: 'multilingual-e5-small', description: 'Dense sentence embedding supporting Bangla, Banglish, and English' },
      { name: 'bge-reranker-v2-m3', description: 'Cross-encoder model for high-precision query-passage relevance scoring' }
    ]
  },
  {
    category: 'Knowledge & Safety Governance',
    items: [
      { name: 'NHS England Guidance', description: 'Curated corpus of 14 verified topics across 119 clinical chunks' },
      { name: 'Deterministic Triage Engine', description: 'Pattern-matched emergency escalation overriding standard retrieval' },
      { name: 'Generation: Disabled', description: 'Zero external LLM calls (OpenAI, Gemini, Claude intentionally suppressed)' }
    ]
  },
  {
    category: 'Persistence & Infrastructure',
    items: [
      { name: 'localStorage', description: 'Client-side encrypted-ready session persistence with zero cloud tracking' },
      { name: 'Vercel', description: 'Global CDN edge deployment for the frontend application' },
      { name: 'Docker & Tailscale Funnel', description: 'Containerized self-hosted inference node with secure TLS mesh tunneling' }
    ]
  }
];

export const TechStackSection: React.FC = () => {
  return (
    <section className="cs-section" id="tech-stack" aria-labelledby="tech-heading">
      <div className="cs-container">
        <div className="cs-section-header">
          <p className="cs-eyebrow">Technical Architecture</p>
          <h2 id="tech-heading" className="cs-section-title">
            Complete technology stack.
          </h2>
          <p className="cs-section-sub">
            A balanced architecture combining modern frontend ergonomics, self-hosted Python inference,
            and deterministic safety filters.
          </p>
        </div>

        <div className="cs-tech-grid">
          {techStackData.map((group) => (
            <div key={group.category} className="cs-tech-card">
              <h4>{group.category}</h4>
              <ul className="cs-tech-list">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
