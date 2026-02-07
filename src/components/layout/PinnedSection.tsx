import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
  children: ReactNode;
  id: string;
  sectionClassName?: string;
  className?: string;
  bgClassName?: string; // Background classes for full-width section (deprecated, use bgStyle)
  bgStyle?: React.CSSProperties; // Inline background styles using CSS variables
  pinDuration?: number; // Duration in pixels to pin (default: 100vh)
  pinSpacing?: boolean;
  disablePin?: boolean;
  index?: number; // For z-index stacking
  dataAttributes?: Record<string, string>; // Data attributes for theme variants
}

export function PinnedSection({
  children,
  id,
  sectionClassName = '',
  className = '',
  bgClassName = '',
  bgStyle = {},
  pinDuration,
  pinSpacing = true,
  disablePin = false,
  index = 0,
  dataAttributes = {},
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;
    if (disablePin) return;

    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      // Calculate pin duration (default to viewport height)
      const duration = pinDuration || window.innerHeight * 1.05;

      // ===================================================
      // ENHANCED PIN WITH SMOOTH TRANSITIONS
      // ===================================================
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${duration}`,
        pin: true,
        pinSpacing,
        scrub: true,
        anticipatePin: 1,
        markers: false,
      });

      // ===================================================
      // SECTION SCALE ENTRANCE - Modern "Push Forward" Effect
      // ===================================================
      gsap.fromTo(section,
        {
          scale: 0.92,
          opacity: 0.7,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top center',
            scrub: 2,
          },
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
        }
      );

      // ===================================================
      // CONTENT BREATHING + MULTI-LAYER PARALLAX
      // ===================================================
      const content = section.querySelector('.container-main');
      if (content) {
        // Main content drift while pinned
        gsap.to(content, {
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${duration}`,
            scrub: 2.5,
          },
          y: 30, // Smooth downward drift
          ease: 'none',
        });

        // Individual cards get micro-parallax
        const cards = content.querySelectorAll('.glass-card, .glass-card-hover, h2, h3');
        cards.forEach((card: Element, index) => {
          const offset = (index % 3) * 8;
          gsap.to(card, {
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${duration}`,
              scrub: 3 + (index % 3) * 0.5,
            },
            y: offset + 10,
            ease: 'none',
          });
        });
      }

      // ===================================================
      // SUBTLE ROTATION FOR DEPTH (Modern Effect)
      // ===================================================
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
        },
        rotationX: 0.5, // Very subtle 3D rotation
        transformPerspective: 1000,
        ease: 'none',
      });
    }, section);

    // Refresh after images/fonts load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [pinDuration, pinSpacing, disablePin, prefersReducedMotion]);

  // If reduced motion, render without pinning
  if (prefersReducedMotion) {
    return (
      <section
        id={id}
        className={`section-padding ${bgClassName} ${sectionClassName}`}
        style={bgStyle}
        {...dataAttributes}
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
      className={`min-h-screen relative ${bgClassName} ${sectionClassName}`}
      style={{ zIndex: index, ...bgStyle }}
      {...dataAttributes}
    >
      <div className="section-padding h-full flex items-center">
        <div className={`container-main w-full ${className}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
