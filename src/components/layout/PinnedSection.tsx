import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  bgClassName?: string; // Background classes for full-width section
  pinDuration?: number; // Duration in pixels to pin (default: 100vh)
  index?: number; // For z-index stacking
}

export function PinnedSection({
  children,
  id,
  className = '',
  bgClassName = '',
  pinDuration,
  index = 0,
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      // Calculate pin duration (default to viewport height)
      const duration = pinDuration || window.innerHeight * 1.05;

      // Create pin ScrollTrigger
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${duration}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        markers: false, // Set to true for debugging
      });
    }, section);

    // Refresh after images/fonts load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [pinDuration, prefersReducedMotion]);

  // If reduced motion, render without pinning
  if (prefersReducedMotion) {
    return (
      <section
        id={id}
        className={`section-padding ${className}`}
      >
        <div className="container-main">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen relative ${bgClassName}`}
      style={{ zIndex: index }}
    >
      <div className="section-padding h-full flex items-center">
        <div className={`container-main w-full ${className}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
