import { useRef, useLayoutEffect, useMemo, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Section } from '../layout';
import { ScrollIndicator } from '../ui';
import { CatScene } from '../media';
import { usePrefersReducedMotion } from '../../hooks';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Responsive space width between "Liberona" and "Zuñiga"
  const [spaceWidth, setSpaceWidth] = useState('0.8em');

  useEffect(() => {
    const updateSpaceWidth = () => {
      const width = window.innerWidth;
      if (width >= 1280) { // xl breakpoint
        setSpaceWidth('1.4em');
      } else if (width >= 768) { // md breakpoint
        setSpaceWidth('1.2em');
      } else { // mobile
        setSpaceWidth('0.4em');
      }
    };

    updateSpaceWidth();
    window.addEventListener('resize', updateSpaceWidth);
    return () => window.removeEventListener('resize', updateSpaceWidth);
  }, []);

  // Full name for display and accessibility
  const fullName = 'Valentina Liberona Zuñiga';

  // Split name into two lines: "Valentina" and "Liberona Zuñiga"
  const nameLines = useMemo(() => [
    { text: 'Valentina', size: 'large' },
    { text: 'Liberona Zuñiga', size: 'normal' }
  ], []);

  // Split each line into characters for typewriter effect
  const linesWithChars = useMemo(() => 
    nameLines.map(line => ({
      ...line,
      chars: line.text.split('')
    })), [nameLines]
  );

  // Typewriter animation - manual character splitting
  useLayoutEffect(() => {
    if (!nameRef.current) return;

    const chars = nameRef.current.querySelectorAll('[data-char]');
    const cat = catRef.current;

    // For reduced motion, show everything immediately
    if (prefersReducedMotion) {
      if (cat) gsap.set(cat, { clearProps: 'all' });
      return;
    }

    // Set initial state
    gsap.set(chars, { opacity: 0 });
    if (cat) gsap.set(cat, { opacity: 0, y: 20, scale: 0.9 });

    // Create timeline
    const tl = gsap.timeline();

    // Typewriter reveal animation - fade in each character sequentially
    tl.to(chars, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.1,
      ease: 'none',
      delay: 0.3,
    });

    // Cat appears after text animation completes
    if (cat) {
      tl.to(cat, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)',
      }, '-=0.1'); // Slight overlap with last characters
    }
  }, [prefersReducedMotion]);

  // For reduced motion, show everything immediately
  const showAll = prefersReducedMotion;

  return (
    <Section className="relative overflow-hidden -mt-16 md:-mt-20" noPadding fullWidth id="hero">
      <div ref={containerRef} className="min-h-screen relative flex flex-col">
        {/* Hero background layers */}
        <div className="absolute inset-0 hero-bg pointer-events-none z-1" />
        <div className="absolute inset-0 hero-stars pointer-events-none z-2" />
        <div className="absolute inset-0 hero-grain pointer-events-none z-3" />

        {/* Hero content - centered */}
        <div className="flex-1 flex items-center relative z-10">
          <div className="container-main section-padding mt-16 pt-24 md:py-32 md:mt-0 relative w-full">
            <div className="relative flex flex-col items-center text-center">
              {/* Name - Primary headline with typewriter effect */}
              <h1
                ref={nameRef}
                className="hero-title"
                aria-label={fullName}
              >
                {linesWithChars.map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    className={
                      line.size === 'large'
                        ? 'hero-title-word text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] leading-none'
                        : 'hero-title-outline text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-none pb-4'
                    }
                  >
                    {line.chars.map((char, charIndex) => (
                      <span
                        key={`${lineIndex}-${charIndex}`}
                        data-char
                        style={{ 
                          display: 'inline-block',
                          whiteSpace: char === ' ' ? 'pre' : 'normal',
                          opacity: prefersReducedMotion ? 1 : 0,
                          // Add extra spacing between words on second line
                          width: char === ' ' && lineIndex === 1 ? spaceWidth : undefined
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
              </h1>

              {/* Visual: 3D Cat Model - positioned to overlap between words */}
              <div 
                ref={catRef}
                className="relative -mt-10 ml-24 md:-mt-20 lg:-mt-32 lg:ml-52 w-full max-w-xs md:max-w-sm z-20"
                style={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                <div className="aspect-square rounded-2xl overflow-visible opacity-80">
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
