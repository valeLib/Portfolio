import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

interface ImageWallItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface ImageWallProps {
  items: ImageWallItem[];
  columns?: 2 | 3 | 4;
  onItemClick?: (item: ImageWallItem) => void;
}

export function ImageWall({ items, columns = 3, onItemClick }: ImageWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Wave reveal animation
  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const images = containerRef.current.querySelectorAll('[data-image-item]');

      // Set initial state
      gsap.set(images, { opacity: 0, y: 16 });

      // Create scroll trigger for wave reveal
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(images, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: {
              amount: 0.8, // Total stagger duration
              from: 'start',
              ease: 'power2.out',
            },
            ease: 'power2.out',
          });
        },
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div
      ref={containerRef}
      className={`grid ${gridCols[columns]} gap-4 md:gap-6`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          data-image-item
          className="group relative aspect-square overflow-hidden rounded-lg glass-card cursor-pointer"
          onClick={() => onItemClick?.(item)}
          style={{
            opacity: prefersReducedMotion ? 1 : undefined,
          }}
        >
          {/* Image */}
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--bg) 90%, transparent) 100%)',
            }}
          />

          {/* Title and subtitle */}
          {(item.title || item.subtitle) && (
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {item.title && (
                <h3
                  className="font-semibold mb-1 text-sm md:text-base"
                  style={{ color: 'var(--text)' }}
                >
                  {item.title}
                </h3>
              )}
              {item.subtitle && (
                <p className="text-xs md:text-sm" style={{ color: 'var(--muted)' }}>
                  {item.subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
