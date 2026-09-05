import React, { useRef, useEffect } from 'react';

// Pure CSS & DOM mockup component for the RoadPulse project
export const RoadPulseMockup: React.FC = () => {
  const mockupRef = useRef<HTMLElement>(null);

  // Pointer-following 3D micro-tilt effect on the browser mockup
  useEffect(() => {
    const mockup = mockupRef.current;
    if (!mockup) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mockup.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      const rotateX = ((y / rect.height) - 0.5) * -5;

      mockup.classList.add('is-tilting');
      mockup.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    };

    const handlePointerLeave = () => {
      mockup.classList.remove('is-tilting');
      mockup.style.transform = '';
    };

    mockup.addEventListener('pointermove', handlePointerMove);
    mockup.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      mockup.removeEventListener('pointermove', handlePointerMove);
      mockup.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <figure ref={mockupRef} className="browser-mockup roadpulse-mockup" data-tilt>
      {/* Browser Bar */}
      <div className="browser-bar" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <small>roadpulse - traffic monitoring platform</small>
      </div>

      {/* Screen area with custom CSS layout */}
      <div
        className="browser-screen roadpulse-screen"
        aria-label="RoadPulse traffic monitoring interface concept"
      >
        <div className="roadpulse-map-grid" aria-hidden="true"></div>
        <div className="roadpulse-route route-one" aria-hidden="true"></div>
        <div className="roadpulse-route route-two" aria-hidden="true"></div>

        <div className="roadpulse-panel">
          <p>RoadPulse</p>
          <strong>Dhaka traffic status</strong>
          <span className="roadpulse-status">
            <i></i> Moderate congestion
          </span>
        </div>

        <div className="roadpulse-alert">
          <span>Live alert</span>
          <strong>Incident awaiting verification</strong>
        </div>

        <div className="roadpulse-legend" aria-hidden="true">
          <span>
            <i className="clear"></i>Clear
          </span>
          <span>
            <i className="slow"></i>Slow
          </span>
          <span>
            <i className="blocked"></i>Blocked
          </span>
        </div>
      </div>
    </figure>
  );
};
