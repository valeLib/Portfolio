import { useRef, useEffect, useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Creates a scoped GSAP context for a component with automatic cleanup.
 * All GSAP animations created within the callback will be automatically
 * reverted when the component unmounts.
 *
 * @param callback - Function that receives the gsap.Context and creates animations
 * @param scope - Optional ref to scope selector queries (e.g., ".my-class" will only match within scope)
 * @param deps - Dependency array for the effect
 */
export function useGsapContext<T extends HTMLElement = HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  scope?: RefObject<T | null>,
  deps: React.DependencyList = []
) {
  const ctx = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Create context with optional scope
    ctx.current = gsap.context(() => {
      callback(ctx.current!);
    }, scope?.current ?? undefined);

    // Cleanup: revert all animations in this context
    return () => {
      ctx.current?.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}

/**
 * Simplified hook for common scroll-triggered animations.
 * Returns a ref to attach to the container element.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animationCallback: (ctx: gsap.Context, container: T) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<T>(null);

  useGsapContext(
    (ctx) => {
      if (containerRef.current) {
        animationCallback(ctx, containerRef.current);
      }
    },
    containerRef as RefObject<T | null>,
    deps
  );

  return containerRef;
}
