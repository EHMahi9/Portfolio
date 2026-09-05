import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBand } from './components/StatsBand';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';

export const App: React.FC = () => {
  // Reading progress percentage (0 - 100) for the top progress bar
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  // Controls visibility of the floating back-to-top button
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Track window scroll for progress bar and back-to-top button
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // requestAnimationFrame throttles state updates to match screen refresh rate (60fps)
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        setScrollProgress(progress);
        setShowBackToTop(window.scrollY > 640);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Effect cleanup: runs on unmount to prevent memory leaks from dangling window listeners
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll back to top
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  // Subtle 3D tilt and mouse spotlight effect on interactive [data-tilt] cards.
  // Note: We update CSS custom properties directly on the DOM elements instead of storing
  // mouse coordinates in React state. This prevents re-rendering the App component on every mouse move.
  useEffect(() => {
    const canTilt =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canTilt) return;

    const tiltElements = document.querySelectorAll<HTMLElement>('[data-tilt]');

    const cleanups: (() => void)[] = [];

    tiltElements.forEach((el) => {
      let frameId: number | null = null;
      let pointerX = 0;
      let pointerY = 0;

      const updateTilt = () => {
        const bounds = el.getBoundingClientRect();
        const x = (pointerX - bounds.left) / bounds.width - 0.5;
        const y = (pointerY - bounds.top) / bounds.height - 0.5;

        el.style.setProperty('--tilt-x', `${(y * -5).toFixed(2)}deg`);
        el.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
        el.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
        frameId = null;
      };

      const handlePointerMove = (e: PointerEvent) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
        if (frameId === null) {
          frameId = requestAnimationFrame(updateTilt);
        }
      };

      const handlePointerLeave = () => {
        if (frameId !== null) cancelAnimationFrame(frameId);
        frameId = null;
        el.style.removeProperty('--tilt-x');
        el.style.removeProperty('--tilt-y');
      };

      el.addEventListener('pointermove', handlePointerMove);
      el.addEventListener('pointerleave', handlePointerLeave);

      cleanups.push(() => {
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerleave', handlePointerLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      {/* Keyboard accessibility skip-link */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Ambient drifting background and code particles */}
      <BackgroundEffects />

      {/* Top reading progress indicator */}
      <div
        className="scroll-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main">
        <Hero />
        <StatsBand />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <button
        id="backToTop"
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        Top
      </button>
    </>
  );
};
