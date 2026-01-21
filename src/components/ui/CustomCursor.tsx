import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks';
import { useTheme } from '../../hooks/useTheme';

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();
  const trailIdRef = useRef(0);
  const rippleIdRef = useRef(0);

  // Check if device supports hover (not touch-only)
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    setIsTouchDevice(hasTouch && !hasPointer);
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;

    let lastTrailTime = 0;
    const trailInterval = 100;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsPointer(!!isInteractive);
     
        const now = Date.now();
        if (now - lastTrailTime > trailInterval) {
          lastTrailTime = now;
          trailIdRef.current++;
          setTrail(prev => [
            ...prev.slice(-7),
            { x: e.clientX, y: e.clientY, id: trailIdRef.current }
          ]);
        }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Use document for mousemove, documentElement for enter/leave (more reliable for viewport detection)
    document.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [prefersReducedMotion, isTouchDevice]);

  // Click ripple effect (dark mode)
  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice ) return;

    const handleClick = (e: MouseEvent) => {
      rippleIdRef.current++;
      setRipples(prev => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: rippleIdRef.current }
      ]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 600);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [prefersReducedMotion, isTouchDevice]);

  // Clean up old trail dots
  useEffect(() => {
    if (trail.length === 0) return;

    const timeout = setTimeout(() => {
      setTrail(prev => prev.slice(1));
    }, 100);

    return () => clearTimeout(timeout);
  }, [trail]);

  // Don't render on touch devices or if reduced motion
  if (prefersReducedMotion || isTouchDevice) return null;

  const cursorSize = isPointer ? 40 : 18;

  // Get CSS variables for theme-aware colors
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim();

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease, width 0.15s ease, height 0.15s ease',
        }}
      >
        {theme === 'light' ? (
          // Light mode: Soft green circle
          <div
            className="rounded-full transition-all duration-150"
            style={{
              width: cursorSize,
              height: cursorSize,
              backgroundColor: 'transparent',
              border: `2px solid ${accentColor}99`,
              boxShadow: `0 2px 15px ${accentColor}33`,
            }}
          />
        ) : (
          // Dark mode: Neon purple ring
          <div
            className="rounded-full transition-all duration-150"
            style={{
              width: cursorSize,
              height: cursorSize,
              backgroundColor: 'transparent',
              border: `2px solid ${primaryColor}`,
              boxShadow: `0 0 15px ${primaryColor}80, inset 0 0 10px ${primaryColor}33`,
            }}
          />
        )}
      </div>

      {/* Trail dots (light mode: strawberry seeds) */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            transform: 'translate(-50%, -50%)',
            width: 4 + index * 0.5,
            height: 4 + index * 0.5,
            backgroundColor: secondaryColor,
            opacity: (index + 1) / trail.length * 0.6,
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}

      {/* Ripples (dark mode: click effect) */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998] rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
            border: `2px solid ${primaryColor}`,
            boxShadow: `0 0 20px ${primaryColor}66`,
          }}
        />
      ))}

      {/* Ripple animation styles */}
      <style>{`
        @keyframes ripple {
          0% {
            width: 10px;
            height: 10px;
            opacity: 0.8;
          }
          100% {
            width: 80px;
            height: 80px;
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}
