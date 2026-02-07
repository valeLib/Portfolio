import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS, isUnified } from '../../config';
import { CvDownloadButton, ThemeToggle } from '../ui';
import { usePrefersReducedMotion, useLenis } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollTo } = useLenis();
  const isHome = location.pathname === '/';

  useLayoutEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    if (prefersReducedMotion || !isHome) {
      setIsRevealed(true);
      gsap.set(nav, { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto' });
      return;
    }

    setIsRevealed(false);
    gsap.set(nav, { opacity: 0, y: 0, filter: 'blur(8px)', pointerEvents: 'none' });
    
    // Delayed dissolve reveal on home page
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
      gsap.to(nav, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
    }, 1500); // Delay after hero settles

    return () => clearTimeout(revealTimer);
  }, [isHome, prefersReducedMotion]);

  // Track scroll position for navbar styling
  useEffect(() => {
    if (!isHome) {
      setIsScrolled(window.scrollY > 20);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top-=50',
      end: 'bottom bottom',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    return () => {
      trigger.kill();
    };
  }, [isHome]);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ animation: 'fade-in 0.2s ease-out' }}
        />
      )}
      
      <nav
        ref={navRef}
        className="fixed top-3 left-0 right-0 z-80 px-4 md:px-6 max-w-3xl mx-auto"
        style={{
          maskImage: !prefersReducedMotion && !isRevealed ? 'linear-gradient(black 10%, transparent 90%)' : 'none',
          WebkitMaskImage: !prefersReducedMotion && !isRevealed ? 'linear-gradient(black 10%, transparent 90%)' : 'none',
        }}
      >
      <div className={`glass-nav transition-all duration-300 ${!isRevealed && !prefersReducedMotion ? 'opacity-0' : ''} ${
        isScrolled || isMobileMenuOpen
          ? 'backdrop-blur-lg border-b'
          : 'bg-transparent'
      }`}>
        <div className="px-3 md:px-5 max-w-6xl mx-auto">
          <div className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-base font-display font-bold transition-colors"
            style={{ color: 'var(--accent-3)' }}
            onClick={(e) => {
              // If already on home page, scroll to top instead of navigating
              if (isHome) {
                e.preventDefault();
                scrollTo(0, { duration: 1.2 });
              }
            }}
          >
            Home
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              const isSecondary = 'secondary' in link && link.secondary === true;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                    backgroundColor: isActive
                      ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                      : 'transparent',
                    fontSize: isSecondary && isUnified ? '0.875rem' : undefined,
                    opacity: isSecondary && isUnified ? 0.9 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--muted)';
                      e.currentTarget.style.backgroundColor = 'var(--accent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--muted)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* CV Download Button - shows when enabled */}
            <CvDownloadButton variant="ghost" size="sm" className="ml-2" />
            {/* Theme Toggle */}
            <ThemeToggle className="ml-1" />
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors"
              style={{
                color: 'var(--muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted)';
              }}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
            </button>
          </div>
          </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 mt-2 mobile-menu-panel">
            <div className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm"
                  style={{
                    color: location.pathname === link.path ? 'var(--accent)' : 'var(--text)',
                    backgroundColor: location.pathname === link.path 
                      ? 'color-mix(in srgb, var(--accent) 15%, transparent)' 
                      : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              {/* CV Download Button in mobile menu */}
              <div className="pt-2">
                <CvDownloadButton variant="secondary" size="md" className="w-full" />
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      </nav>
    </>
  );
}
