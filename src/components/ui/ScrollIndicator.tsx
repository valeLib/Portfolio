import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LottieDecor } from '../media';
import mouseScrollAnimation from '../../assets/lottie/Mouse scroll animation.lottie?url';
import { usePrefersReducedMotion } from '../../hooks';
import { useTheme } from '../../hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

export function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    if (!indicatorRef.current || prefersReducedMotion) return;

    const indicator = indicatorRef.current;

    // Initial entrance animation - appears after hero animations
    gsap.set(indicator, { autoAlpha: 0, y: -10 });
    
    gsap.to(indicator, {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      delay: 3.5, // Appears after text (3.2s) + cat animation (0.6s) - slight overlap
    });

    // Fade out indicator as user starts scrolling
    const fadeOut = gsap.to(indicator, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.in',
      paused: true,
    });

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '+=100',
      onUpdate: (self) => {
        // Fade out as user scrolls past 100px
        fadeOut.progress(self.progress);
      },
    });

    return () => {
      fadeOut.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === document.body) {
          trigger.kill();
        }
      });
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  // Get --text color for theme-aware styling
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
    >
      <div 
        className="w-14 h-14 md:w-20 md:h-20"
        style={{
          filter: theme === 'light' 
            ? 'brightness(0.7) contrast(1.1)' 
            : 'brightness(1.1) contrast(1.05)',
          color: textColor,
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        <LottieDecor
          src={mouseScrollAnimation}
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
