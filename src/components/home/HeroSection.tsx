import { useRef } from 'react';
import { gsap } from 'gsap';
import { Section } from '../layout';
import { ScrollIndicator } from '../ui';
import { CatScene } from '../media';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { profile } from '../../content/profile';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Landing animation on page load
  useGsapContext(
    () => {
      if (!nameRef.current || !contentRef.current || prefersReducedMotion) return;

      const nameWords = nameRef.current.querySelectorAll('[data-hero-title]');

      // Initial state
      gsap.set(nameWords, { opacity: 0, y: 24 });

      // Landing sequence
      const tl = gsap.timeline({ delay: 0.15 });

      // Title lines
      tl.to(nameWords, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  // Full name with word splitting for animation
  const fullName = profile.fullName || profile.name;
  const nameWords = fullName.split(' ');

  // For reduced motion, show everything immediately
  const showAll = prefersReducedMotion;

  return (
    <Section className="relative overflow-hidden -mt-16 md:-mt-20" noPadding fullWidth id="hero">
      <div ref={containerRef} className="min-h-screen relative flex flex-col">
        {/* Hero background layers */}
        <div className="absolute inset-0 hero-bg pointer-events-none" />
        <div className="absolute inset-0 hero-stars pointer-events-none" />
        <div className="absolute inset-0 hero-grain pointer-events-none" />

        {/* Hero content - centered */}
        <div className="flex-1 flex items-center relative z-10">
          <div className="container-main section-padding py-24 md:py-32 relative w-full">
            <div ref={contentRef} className="relative flex flex-col items-center text-center">
              {/* Name - Primary headline with word animation */}
              <h1
                ref={nameRef}
                className="hero-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl"
              >
                {nameWords.map((word, index) => (
                  <span
                    key={index}
                    data-hero-title
                    className="hero-title-word block"
                    style={{ opacity: showAll ? 1 : undefined }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Visual: 3D Cat Model */}
              <div className="mt-10 w-full max-w-md lg:max-w-lg lg:absolute lg:right-[-18%] lg:bottom-[-20%] opacity-80">
                <div className="aspect-square lg:aspect-auto lg:h-[440px] rounded-2xl overflow-visible">
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
