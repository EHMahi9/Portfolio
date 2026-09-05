import React, { useState, useEffect, useRef } from 'react';

// Theme options supported by the application
type Theme = 'dark' | 'light';

// Navigation link structure
interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

// Static navigation list placed outside component so it is not re-created on every render
const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

export const Navbar: React.FC = () => {
  // useState stores whether the mobile navigation drawer is open; updates trigger a re-render
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Controls header background blur & shadow after scrolling past 24px
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  // Holds the ID of the section currently in view to highlight the corresponding nav link
  const [activeSection, setActiveSection] = useState<string>('home');
  // Current active theme
  const [theme, setTheme] = useState<Theme>('dark');

  // useRef provides direct references to DOM nodes without causing re-renders
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Helper to close mobile menu
  const closeMenu = () => setIsMenuOpen(false);

  // Helper to toggle mobile menu using functional updater to avoid stale state
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Update HTML meta tag for mobile browser address bar color
  const updateMetaThemeColor = (currentTheme: Theme) => {
    const meta = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");
    if (meta) {
      meta.setAttribute('content', currentTheme === 'light' ? '#d9efff' : '#071a3d');
    }
  };

  // Switch between dark and light themes and persist selection to localStorage
  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('mahi-portfolio-theme', nextTheme);
    updateMetaThemeColor(nextTheme);
  };

  // useEffect with [] runs once on mount to initialize theme from localStorage or OS preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('mahi-portfolio-theme');
    const initialTheme: Theme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? (savedTheme as Theme)
        : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    updateMetaThemeColor(initialTheme);
  }, []);

  // Window scroll listener: updates isScrolled state for header visual style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Effect cleanup: removes listener when component unmounts to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Locks body scroll while mobile drawer is open by toggling a CSS class on <body>
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }

    // Always clean up class if component unmounts while menu is open
    return () => document.body.classList.remove('nav-open');
  }, [isMenuOpen]);

  // Keyboard accessibility: close drawer when user presses Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Closes drawer on clicks outside both the navigation panel and hamburger button
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideNav = navRef.current?.contains(target);
      const isInsideButton = menuButtonRef.current?.contains(target);

      // If click is outside both elements, close the menu
      if (!isInsideNav && !isInsideButton) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Window resize: auto-close mobile drawer when viewport widens past 860px desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver detects which section is visible in the viewport to highlight active link
  useEffect(() => {
    const elements = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
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
    // Disconnect observer on unmount to release resources
    return () => observer.disconnect();
  }, []);

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

        {/* Primary Navigation Drawer */}
        <nav
          ref={navRef}
          className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}
          id="primaryNavigation"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={activeSection === item.id ? 'is-active' : ''}
              onClick={closeMenu}
            >
              {item.label}
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
            ref={menuButtonRef}
            className={`menu-button ${isMenuOpen ? 'is-active' : ''}`}
            type="button"
            data-menu-button
            onClick={toggleMenu}
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
