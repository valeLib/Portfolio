import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/layout';
import { CvDownloadButton } from '../components/ui';
import { ExperienceTimeline } from '../components/experience';
import { useDocumentTitle, useGsapContext, usePrefersReducedMotion } from '../hooks';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  useDocumentTitle('Experience');

  return (
    <>
      {/* Header */}
      <ExperienceHeader />

      {/* Timeline */}
      <ExperienceTimeline />

      {/* CTA */}
      <CTASection />
    </>
  );
}

function ExperienceHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      // Only animate secondary elements - title is always visible
      const secondaryElements = containerRef.current.querySelectorAll('[data-header-secondary]');

      gsap.fromTo(
        secondaryElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <Section className="page-safe-top pb-8">
      <div ref={containerRef}>
        <div className="max-w-3xl">
          <h1
            className="heading-1 mb-4"
            style={{ color: 'var(--text)' }}
          >
            Work <span className="text-gradient">Experience</span>
          </h1>

          <p
            data-header-secondary
            className="text-xl mb-6"
            style={{ color: 'var(--muted)' }}
          >
            My professional journey across frontend development, full-stack engineering, and XR
            applications.
          </p>

          <div data-header-secondary className="flex flex-wrap items-center gap-4">
            <CvDownloadButton variant="secondary" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  return (
    <Section style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)' }}>
      <div className="text-center">
        <h2 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>
          Interested in Working Together?
        </h2>
        <p className="mb-6 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
          I'm always open to discussing new opportunities and interesting projects.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
          <CvDownloadButton variant="secondary" />
        </div>
      </div>
    </Section>
  );
}
