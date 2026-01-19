import { useRef, useEffect, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '../../hooks';
import { useTheme } from '../../hooks/useTheme';

interface TechItem {
  icon: ReactNode;
  name: string;
  color?: string;
}

interface TechStackTileProps {
  items: TechItem[];
  title?: string;
  className?: string;
}

export function TechStackTile({ items, title = 'Tech Stack', className = '' }: TechStackTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Light mode: Floating animation
  // Dark mode: Neon flicker on hover
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const icons = containerRef.current.querySelectorAll('.tech-icon');

    if (theme === 'light') {
      // Floating petal animation for light mode
      icons.forEach((icon, i) => {
        gsap.to(icon, {
          y: `random(-8, 8)`,
          x: `random(-4, 4)`,
          rotation: `random(-5, 5)`,
          duration: 2 + Math.random() * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.1,
        });
      });
    }

    return () => {
      icons.forEach(icon => {
        gsap.killTweensOf(icon);
      });
    };
  }, [theme, prefersReducedMotion, items]);

  // Neon flicker animation for dark mode on hover
  const handleMouseEnter = (index: number, el: HTMLElement | null) => {
    if (prefersReducedMotion || theme !== 'dark' || !el) return;
    setHoveredIndex(index);

    // Flicker animation
    const tl = gsap.timeline();
    tl.to(el, { opacity: 0.6, duration: 0.05 })
      .to(el, { opacity: 1, duration: 0.05 })
      .to(el, { opacity: 0.8, duration: 0.05 })
      .to(el, { opacity: 1, duration: 0.05 })
      .to(el, {
        boxShadow: '0 0 20px var(--primary), 0 0 40px var(--primary)',
        scale: 1.1,
        duration: 0.2,
      });
  };

  const handleMouseLeave = (el: HTMLElement | null) => {
    if (!el) return;
    setHoveredIndex(null);
    gsap.to(el, {
      boxShadow: 'none',
      scale: 1,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`
        p-4 md:p-6
        h-full
        flex flex-col
        ${className}
      `}
    >
      <h3
        className="text-sm font-medium mb-4"
        style={{ color: 'var(--muted)' }}
      >
        {title}
      </h3>

      <div className="flex-1 flex flex-wrap gap-3 items-center justify-center content-center">
        {items.map((item, index) => (
          <div
            key={index}
            className={`
              tech-icon
              relative
              flex flex-col items-center gap-1
              p-3 rounded-xl
              cursor-pointer
              transition-colors duration-200
            `}
            style={{
              backgroundColor: theme === 'light'
                ? 'color-mix(in srgb, var(--secondary) 15%, transparent)'
                : hoveredIndex === index
                  ? 'color-mix(in srgb, var(--primary) 15%, transparent)'
                  : 'color-mix(in srgb, var(--surface-2) 50%, transparent)',
              border: theme === 'dark'
                ? `1px solid ${hoveredIndex === index ? 'var(--primary)' : 'transparent'}`
                : '1px solid transparent',
            }}
            onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            {/* Icon */}
            <span
              className="text-2xl md:text-3xl"
              style={{
                filter: theme === 'dark' && hoveredIndex === index
                  ? 'drop-shadow(0 0 8px var(--primary))'
                  : 'none',
              }}
            >
              {item.icon}
            </span>

            {/* Name (visible on hover or always in light mode) */}
            <span
              className={`
                text-xs font-medium
                transition-opacity duration-200
                ${theme === 'light' || hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
              `}
              style={{ color: 'var(--text)' }}
            >
              {item.name}
            </span>

            {/* Light mode: Petal decoration */}
            {theme === 'light' && (
              <div
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: 'var(--secondary)',
                  opacity: 0.6,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
