import { Link } from 'react-router-dom';
import { socials, contactEmail } from '../../content/socials';
import { SocialIcon } from '../ui/SocialIcon';
import { isTechArt } from '../../config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative z-80"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div className="container-main py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-display font-bold transition-colors"
              style={{ color: 'var(--text)' }}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  color: 'var(--bg)',
                }}
              >
                {isTechArt ? 'TA' : 'FE'}
              </span>
              <span>{isTechArt ? 'TechArtist' : 'Frontend Dev'}</span>
            </Link>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            {isTechArt ? (
              <>
                <Link to="/work" className="transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  Work
                </Link>
                <Link to="/gallery" className="transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  Gallery
                </Link>
              </>
            ) : (
              <>
                <Link to="/projects" className="transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  Projects
                </Link>
                <Link to="/experience" className="transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
                  Experience
                </Link>
              </>
            )}
            <Link to="/about" className="transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>
              About
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--muted)' }}
            >
              Email
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.slice(0, 4).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                style={{
                  backgroundColor: 'var(--bg)',
                  color: 'var(--muted)',
                }}
                aria-label={social.name}
              >
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
