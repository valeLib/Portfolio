import { useState, useEffect, useCallback, useRef } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowSizeOptions {
  debounceMs?: number;
}

/**
 * Hook to get window dimensions with debounced resize handling.
 * Prevents excessive re-renders on window resize.
 */
export function useWindowSize({ debounceMs = 150 }: UseWindowSizeOptions = {}): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, debounceMs);
  }, [debounceMs]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);

  return windowSize;
}

/**
 * Hook to detect mobile viewport with debounced resize handling.
 * @param breakpoint - Pixel width to consider as mobile (default: 768)
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const { width } = useWindowSize();
  return width < breakpoint;
}

/**
 * Hook to detect tablet viewport with debounced resize handling.
 * @param breakpoint - Pixel width to consider as tablet (default: 1024)
 */
export function useIsTablet(breakpoint: number = 1024): boolean {
  const { width } = useWindowSize();
  return width < breakpoint;
}
