import { Link } from 'react-router-dom';
import { Section } from '../components/layout';
import { useDocumentTitle } from '../hooks';

export function NotFound() {
  useDocumentTitle('Page Not Found');

  return (
    <Section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        {/* 404 Graphic */}
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-display font-bold text-dark-800 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-500/20 to-primary-500/20 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-accent-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="heading-2 text-white mb-4">Page Not Found</h1>

        <p className="text-dark-400 max-w-md mx-auto mb-8">
          Oops! The page you're looking for seems to have vanished into the void.
          Maybe it's just an illusion spell gone wrong.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/work" className="btn-secondary">
            View Projects
          </Link>
        </div>
      </div>
    </Section>
  );
}
