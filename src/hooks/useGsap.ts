import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface UseGsapRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  markers?: boolean;
}

export function useGsapReveal<T extends HTMLElement>(
  options: UseGsapRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const {
    y = 30,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    start = 'top 85%',
    markers = false,
  } = options;

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const element = ref.current;
    const children = element.querySelectorAll('[data-gsap-reveal]');
    const targets = children.length > 0 ? children : element;

    gsap.set(targets, { y, opacity });

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start,
          markers,
        },
      });
    });

    return () => ctx.revert();
  }, [y, opacity, duration, delay, stagger, start, markers, prefersReducedMotion]);

  return ref;
}

interface UseGsapParallaxOptions {
  speed?: number;
  start?: string;
  end?: string;
}

export function useGsapParallax<T extends HTMLElement>(
  options: UseGsapParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = options;

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -30 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, start, end, prefersReducedMotion]);

  return ref;
}

export function useGsapFadeIn<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const element = ref.current;

    gsap.set(element, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, [delay, prefersReducedMotion]);

  return ref;
}
