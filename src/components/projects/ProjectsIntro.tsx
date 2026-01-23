import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { CvDownloadButton } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const title = containerRef.current.querySelector('[data-intro="title"]');
      const description = containerRef.current.querySelector('[data-intro="description"]');
      const cta = containerRef.current.querySelector('[data-intro="cta"]');
      const decoration = containerRef.current.querySelector('[data-intro="decoration"]');

      // VISIBLE at scroll=0: title is shown immediately
      // Scroll reveals secondary elements
      gsap.set(title, { opacity: 1, y: 0 });
      gsap.set([description, cta], { opacity: 0, y: 20 });
      gsap.set(decoration, { opacity: 0, scale: 0.9 });

      // Create timeline with short pin - scroll reveals secondary content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=50%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      tl.to(description, { opacity: 1, y: 0, duration: 0.4 }, 0)
        .to(cta, { opacity: 1, y: 0, duration: 0.4 }, 0.2)
        .to(decoration, { opacity: 0.2, scale: 1, duration: 0.5 }, 0.1);
    },
    containerRef,
    [prefersReducedMotion]
  );

  const showAll = prefersReducedMotion;

  return (
    <Section className="page-safe-top relative overflow-hidden" noPadding>
      <div ref={containerRef} className="min-h-screen flex items-center">
        <div className="container-main section-padding pt-24">
          <div className="max-w-3xl relative">
            <h1
              data-intro="title"
              className="heading-1 mb-4"
              style={{ color: 'var(--text)' }}
            >
              Featured <span className="text-gradient">Projects</span>
            </h1>

            <p
              data-intro="description"
              className="text-xl mb-6"
              style={{ color: 'var(--muted)', opacity: showAll ? 1 : undefined }}
            >
              A selection of projects showcasing my work in frontend development, web applications,
              and software engineering.
            </p>

            <div
              data-intro="cta"
              className="flex flex-wrap items-center gap-4"
              style={{ opacity: showAll ? 1 : undefined }}
            >
              <Link to="/experience" className="btn-secondary">
                View Experience
              </Link>
              <CvDownloadButton variant="ghost" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
