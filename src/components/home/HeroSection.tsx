import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Section } from '../layout';
import { CvDownloadButton, ScrollIndicator } from '../ui';
import { CatScene } from '../media';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { profile } from '../../content/profile';
import { isGameDev } from '../../config';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Cycling roles state
  const roles = profile.roles || [profile.title];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Name animation on page load (word reveal)
  useGsapContext(
    () => {
      if (!nameRef.current || !contentRef.current || prefersReducedMotion) return;

      const nameWords = nameRef.current.querySelectorAll('[data-word]');
      const secondaryElements = contentRef.current.querySelectorAll('[data-hero-secondary]');

      // Initial state
      gsap.set(nameWords, { opacity: 0, y: 12 });
      gsap.set(secondaryElements, { opacity: 0, y: 12 });

      // Name reveal animation - triggers once on page load
      const tl = gsap.timeline({ delay: 0.2 });

      // Animate name words with stagger
      tl.to(nameWords, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Then animate secondary elements (roles, subline, CTA)
      tl.to(secondaryElements, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.2');
    },
    containerRef,
    [prefersReducedMotion]
  );

  // Roles cycling animation
  useEffect(() => {
    if (prefersReducedMotion || roles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000); // Change role every 3 seconds

    return () => clearInterval(interval);
  }, [prefersReducedMotion, roles.length]);

  // Animate role change
  useEffect(() => {
    if (!rolesRef.current || prefersReducedMotion) return;

    const roleElement = rolesRef.current.querySelector('[data-current-role]');
    if (!roleElement) return;

    gsap.fromTo(
      roleElement,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [currentRoleIndex, prefersReducedMotion]);

  // Full name with word splitting for animation
  const fullName = profile.fullName || profile.name;
  const nameWords = fullName.split(' ');

  // For reduced motion, show everything immediately
  const showAll = prefersReducedMotion;

  return (
    <Section className="relative overflow-hidden" noPadding fullWidth id="hero">
      <div ref={containerRef} className="min-h-screen relative flex flex-col">
        {/* Hero content - centered */}
        <div className="flex-1 flex items-center relative">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl transition-colors"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}
            />
            <div
              className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl transition-colors"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent-2) 8%, transparent)' }}
            />
          </div>

          <div className="container-main section-padding py-24 md:py-32 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content - Primary focus */}
            <div ref={contentRef} className="order-2 lg:order-1">
              {/* Availability badge */}
              <div
                data-hero-secondary
                className="mb-6"
                style={{ opacity: showAll ? 1 : undefined }}
              >
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  {profile.availability}
                </span>
              </div>

              {/* Name - Primary headline with word animation */}
              <h1
                ref={nameRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                style={{ color: 'var(--text)' }}
              >
                {nameWords.map((word, index) => (
                  <span
                    key={index}
                    data-word
                    className="inline-block mr-[0.25em]"
                    style={{ opacity: showAll ? 1 : undefined }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Cycling roles - Secondary */}
              <div
                ref={rolesRef}
                data-hero-secondary
                className="mb-6 h-8 md:h-10"
                style={{ opacity: showAll ? 1 : undefined }}
              >
                <p
                  data-current-role
                  className="text-xl md:text-2xl font-medium text-gradient"
                >
                  {roles[currentRoleIndex]}
                </p>
              </div>

              {/* Subline */}
              <p
                data-hero-secondary
                className="text-lg md:text-xl mb-8 max-w-lg leading-relaxed"
                style={{ color: 'var(--muted)', opacity: showAll ? 1 : undefined }}
              >
                {profile.heroSubheadline}
              </p>

              {/* CTA - One primary action */}
              <div
                data-hero-secondary
                className="flex flex-wrap items-center gap-4"
                style={{ opacity: showAll ? 1 : undefined }}
              >
                {isGameDev ? (
                  <Link to="/tech-art" className="btn-primary">
                    View Gallery
                  </Link>
                ) : (
                  <>
                    <Link to="/experience" className="btn-primary">
                      View Experience
                    </Link>
                    <CvDownloadButton variant="ghost" />
                  </>
                )}
              </div>
            </div>

            {/* Visual: 3D Cat Model - Secondary, ambient */}
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square lg:aspect-auto lg:h-[480px] rounded-2xl overflow-visible opacity-90">
                <CatScene />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Scroll Indicator - appears at bottom, fades on scroll */}
        <ScrollIndicator />
      </div>
    </Section>
  );
}
