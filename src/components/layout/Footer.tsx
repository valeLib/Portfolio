import { Link } from 'react-router-dom';
import { socials, contactEmail } from '../../content/socials';
import { SocialIcon } from '../ui/SocialIcon';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="container-main py-12">
        {/* CTA Section */}
        <div className="text-center mb-12 pb-12 border-b border-dark-800">
          <h3 className="heading-3 text-white mb-4">Let's Create Something Magical</h3>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">
            Looking for a Tech Artist to bring your VFX vision to life? I'd love to hear about your project.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-display font-bold text-white hover:text-accent-400 transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center text-sm">
                TA
              </span>
              <span>TechArtist</span>
            </Link>
            <p className="text-dark-500 text-sm">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/work" className="text-dark-400 hover:text-white transition-colors">
              Work
            </Link>
            <Link to="/gallery" className="text-dark-400 hover:text-white transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="text-dark-400 hover:text-white transition-colors">
              About
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="text-dark-400 hover:text-white transition-colors"
            >
              Email
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.slice(0, 4).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
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
