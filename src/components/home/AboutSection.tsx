import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { profile } from '../../content/profile';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Simple reveal animation - no pinning, editorial style
  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const container = containerRef.current;
      const header = container.querySelector('[data-about-header]');
      const content = container.querySelector('[data-about-content]');

      // Set initial state
      gsap.set([header, content], { opacity: 0, y: 12 });

      // Simple scroll-triggered fade-in
      ScrollTrigger.create({
        trigger: container,
        start: 'top 75%',
        onEnter: () => {
          gsap.to([header, content], {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
          });
        },
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <div ref={containerRef}>
        {/* Section header */}
        <div data-about-header className="mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: 'var(--text)' }}
          >
            About Me
          </h2>
          <p style={{ color: 'var(--primary)' }}>
            How I work and what I value
          </p>
        </div>

        {/* Editorial bio content - text first, clean, readable */}
        <div data-about-content className="max-w-3xl">
          <div
            className="prose prose-lg"
            style={{
              color: 'var(--text)',
              lineHeight: '1.75',
            }}
          >
            {/* Main bio - 4-6 lines, focus on how you work */}
            {profile.bio.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="mb-4 text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {paragraph}
              </p>
            ))}

            {/* Extended bio if available - technical focus areas */}
            {profile.bioExtended && (
              <>
                {profile.bioExtended.split('\n\n').map((paragraph, index) => (
                  <p
                    key={`ext-${index}`}
                    className="mb-4 text-base md:text-lg leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </>
            )}
          </div>

          {/* Link to full about page */}
          <div className="mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--accent)' }}
            >
              More about my background
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
    </div>
  );
}
