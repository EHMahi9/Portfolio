import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  // Mobile drawer open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Header background blur on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  // Active navigation section
  const [activeSection, setActiveSection] = useState('home');
  // Theme state ('dark' or 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('mahi-portfolio-theme');
    const initialTheme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    updateMetaThemeColor(initialTheme);
  }, []);

  const updateMetaThemeColor = (currentTheme: 'dark' | 'light') => {
    const meta = document.querySelector("meta[name='theme-color']");
    if (meta) {
      meta.setAttribute('content', currentTheme === 'light' ? '#d9efff' : '#071a3d');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('mahi-portfolio-theme', nextTheme);
    updateMetaThemeColor(nextTheme);
  };

  // Scroll listener for header shadow/background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => document.body.classList.remove('nav-open');
  }, [isMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'process', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-38% 0px -54% 0px',
        threshold: 0.01
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} data-header>
      <div className="container header-layout">
        {/* Brand Logo */}
        <a className="brand" href="#home" aria-label="EHM Home">
          <img
            className="site-logo"
            src="/assets/brand/ehm-logo.svg?v=1"
            width="136"
            height="38"
            alt="EHM"
          />
        </a>

        {/* Primary Navigation */}
        <nav
          className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}
          id="primaryNavigation"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={activeSection === link.id ? 'is-active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <a
            className="button button-small button-ghost"
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>

          {/* Theme Toggle Button */}
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            aria-pressed={theme === 'light'}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === 'light' ? '\u263E' : '\u2600'}
            </span>
            <span className="theme-toggle-label">
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className={`menu-button ${isMenuOpen ? 'is-active' : ''}`}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="primaryNavigation"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
