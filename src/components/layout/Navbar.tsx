import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, isTechArt } from '../../config';
import { CvDownloadButton } from '../ui';
import { profile } from '../../content/profile';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/90 backdrop-blur-lg border-b border-dark-800'
          : 'bg-transparent'
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-display font-bold text-white hover:text-accent-400 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center text-sm">
              {isTechArt ? 'TA' : 'VL'}
            </span>
            <span className="hidden sm:inline">{profile.name.split(' ')[0]}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-accent-400 bg-accent-500/10'
                    : 'text-dark-300 hover:text-white hover:bg-dark-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* CV Download Button - shows when enabled */}
            <CvDownloadButton variant="ghost" size="sm" className="ml-2" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-white transition-colors"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-dark-800 mt-2 pt-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-accent-400 bg-accent-500/10'
                      : 'text-dark-300 hover:text-white hover:bg-dark-800/50'
                  }`}
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
    </nav>
  );
}
