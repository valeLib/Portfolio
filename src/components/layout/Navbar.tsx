import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS, isUnified } from '../../config';
import { CvDownloadButton, ThemeToggle } from '../ui';
import { usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHome = location.pathname === '/';

  useLayoutEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    if (prefersReducedMotion || !isHome) {
      setIsScrolled(true);
      gsap.set(nav, { opacity: 1, y: 0, pointerEvents: 'auto' });
      return;
    }

    setIsScrolled(false);
    gsap.set(nav, { opacity: 0, y: -12, pointerEvents: 'none' });
  }, [isHome, prefersReducedMotion]);

  useEffect(() => {
    if (!navRef.current || prefersReducedMotion || !isHome) return;
    const nav = navRef.current;

    const showNav = () => {
      setIsScrolled(true);
      gsap.to(nav, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', pointerEvents: 'auto' });
    };

    const hideNav = () => {
      setIsScrolled(false);
      gsap.to(nav, { opacity: 0, y: -12, duration: 0.2, ease: 'power2.out', pointerEvents: 'none' });
    };

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top+=1',
      end: 'bottom bottom',
      onEnter: showNav,
      onLeaveBack: hideNav,
    });

    return () => {
      trigger.kill();
    };
  }, [isHome, prefersReducedMotion]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className={`mx-4 md:mx-6 ${isScrolled || isMobileMenuOpen ? 'glass-nav' : ''}`}>
        <div className="container-main">
          <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-lg font-display font-bold transition-colors"
            style={{ color: 'var(--text)' }}
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
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
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
                      e.currentTarget.style.color = 'var(--text)';
                      e.currentTarget.style.backgroundColor = 'var(--surface)';
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden pb-4 border-t mt-2 pt-4"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-3 rounded-lg font-medium transition-all duration-200"
                  style={{
                    color: location.pathname === link.path ? 'var(--accent)' : 'var(--muted)',
                    backgroundColor: location.pathname === link.path ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              {/* CV Download Button in mobile menu */}
              <div className="px-4 pt-2">
                <CvDownloadButton variant="secondary" size="md" className="w-full" />
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
}
