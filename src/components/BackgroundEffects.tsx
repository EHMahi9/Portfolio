import React, { useMemo } from 'react';

// Floating code particles in the background shell
export const BackgroundEffects: React.FC = () => {
  const symbols = ['{ }', '</>', '=>', '[]', '++', '===', '01', 'if()', '&&', '||', ';', '/>'];

  // Generate 30 particle properties once
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, index) => ({
      id: index,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: `${(Math.random() * 100).toFixed(1)}%`,
      animationDuration: `${(12 + Math.random() * 20).toFixed(1)}s`,
      animationDelay: `${(Math.random() * -10).toFixed(1)}s`,
      fontSize: `${(0.8 + Math.random() * 1.5).toFixed(2)}rem`
    }));
  }, []);

  return (
    <div className="page-shell" aria-hidden="true">
      <div className="code-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="code-particle"
            style={{
              left: p.left,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
              fontSize: p.fontSize
            }}
          >
            {p.symbol}
          </span>
        ))}
      </div>
    </div>
  );
};
