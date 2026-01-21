import { Link } from 'react-router-dom';
import { Section } from '../components/layout';
import { LottieDecor } from '../components/media';
import { useDocumentTitle } from '../hooks';
import { isTechArt } from '../config';
import error404Animation from '../assets/lottie/Error 404 on Laptop.lottie?url';

export function NotFound() {
  useDocumentTitle('Page Not Found');

  return (
    <Section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        {/* 404 Animation */}
        <div className="mb-8 flex justify-center">
          <LottieDecor
            src={error404Animation}
            className="w-64 h-64 md:w-80 md:h-80"
          />
        </div>

        <h1 className="heading-2 mb-4" style={{ color: 'var(--text-heading)' }}>Page Not Found</h1>

        <p className="text-dark-400 max-w-md mx-auto mb-8">
          Oops! The page you're looking for seems to have vanished into the void.
          Maybe it's just an illusion spell gone wrong.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to={isTechArt ? '/work' : '/projects'} className="btn-secondary">
            View Projects
          </Link>
        </div>
      </div>
    </Section>
  );
}
