import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LottieDecor } from '../media';
import mouseScrollAnimation from '../../assets/lottie/Mouse scroll animation.lottie?url';
import { usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

export function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!indicatorRef.current || prefersReducedMotion) return;

    const indicator = indicatorRef.current;

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

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      style={{ opacity: 1 }}
    >
      <div className="w-12 h-12 md:w-16 md:h-16">
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
