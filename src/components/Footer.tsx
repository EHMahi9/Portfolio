import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        {/* Brand & Short Bio */}
        <div>
          <a className="brand" href="#home" aria-label="EHM Home">
            <img
              className="site-logo"
              src="/assets/brand/ehm-logo.svg?v=1"
              width="136"
              height="38"
              alt="EHM"
            />
          </a>
          <p>
            Software Engineering Student and Full-Stack Developer based in Dhaka,
            Bangladesh.
          </p>
        </div>

        {/* Footer Navigation Links */}
        <nav className="footer-links" aria-label="Footer links">
          <a href="#projects">Projects</a>
          <a href="/assets/documents/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <a href="/assets/documents/resume.pdf" download="Ebnul_Hasan_Mahi_Resume.pdf">
            Download PDF
          </a>
          <a href="mailto:vaibongo20@gmail.com">Email</a>
        </nav>

        {/* Copyright Line */}
        <p className="copyright">
          &copy; <span className="current-year">{currentYear}</span> Ebnul Hasan Mahi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
