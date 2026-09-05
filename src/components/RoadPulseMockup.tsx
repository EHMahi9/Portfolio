import React from 'react';

// Pure CSS & DOM mockup component for the RoadPulse project
export const RoadPulseMockup: React.FC = () => {
  return (
    <figure className="browser-mockup roadpulse-mockup">
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
