import { createContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean; duration?: number }) => void;
}

export const LenisContext = createContext<LenisContextType | undefined>(undefined);

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  // Initialize Lenis
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Don't initialize Lenis if user prefers reduced motion
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Disable GSAP lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    // Store ticker callback reference for proper cleanup
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    // Connect Lenis to GSAP ticker
    gsap.ticker.add(tickerCallback);

    // Sync Lenis with ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Set scroll proxy for ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return lenisInstance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Refresh ScrollTrigger when Lenis updates
    ScrollTrigger.defaults({ scroller: document.body });

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Handle route changes - scroll to top and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      // Scroll to top immediately on route change
      lenisRef.current.scrollTo(0, { immediate: true });

      // Give DOM time to settle, then refresh ScrollTrigger
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    } else {
      // If Lenis isn't active (reduced motion), use native scroll
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // ScrollTo helper
  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      // Fallback for when Lenis is disabled
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
