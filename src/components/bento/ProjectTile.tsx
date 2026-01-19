import { useRef, useEffect, ReactNode } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { usePrefersReducedMotion } from '../../hooks';
import { useTheme } from '../../hooks/useTheme';

interface ProjectTileProps {
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  href?: string;
  icon?: ReactNode;
  className?: string;
}

export function ProjectTile({
  title,
  description,
  image,
  tags = [],
  href,
  icon,
  className = '',
}: ProjectTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();

  // Initialize vanilla-tilt
  useEffect(() => {
    const tile = tileRef.current;
    if (!tile || prefersReducedMotion) return;

    VanillaTilt.init(tile, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': theme === 'dark' ? 0.15 : 0.1,
      scale: 1.02,
      perspective: 1000,
    });

    return () => {
      if ((tile as HTMLElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt) {
        (tile as HTMLElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt?.destroy();
      }
    };
  }, [prefersReducedMotion, theme]);

  const content = (
    <div
      ref={tileRef}
      className={`
        group
        relative
        h-full
        rounded-2xl
        overflow-hidden
        transition-all duration-300 ease-out
        cursor-pointer
        ${className}
      `}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background image or gradient */}
      {image ? (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(to top, rgba(15, 5, 16, 0.95), rgba(15, 5, 16, 0.3))'
                : 'linear-gradient(to top, rgba(253, 252, 240, 0.95), rgba(253, 252, 240, 0.3))',
            }}
          />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(135deg, var(--surface-2), var(--surface))'
              : 'linear-gradient(135deg, var(--surface), var(--surface-2))',
          }}
        />
      )}

      {/* Glassmorphism overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'var(--glass)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Neon border glow for dark mode on hover */}
      {theme === 'dark' && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255, 45, 149, 0.5), 0 0 20px rgba(255, 45, 149, 0.2)',
          }}
        />
      )}

      {/* Content */}
      <div
        className="relative h-full p-5 flex flex-col justify-end"
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Icon */}
        {icon && (
          <div
            className="mb-3 text-3xl"
            style={{
              filter: theme === 'dark' ? 'drop-shadow(0 0 8px var(--primary))' : 'none',
            }}
          >
            {icon}
          </div>
        )}

        {/* Title */}
        <h3
          className="text-lg font-display font-semibold mb-1 group-hover:text-[var(--primary)] transition-colors duration-200"
          style={{ color: 'var(--text)' }}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p
            className="text-sm mb-3 line-clamp-2"
            style={{ color: 'var(--muted)' }}
          >
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: theme === 'dark'
                    ? 'color-mix(in srgb, var(--secondary) 20%, transparent)'
                    : 'color-mix(in srgb, var(--primary) 15%, transparent)',
                  color: theme === 'dark' ? 'var(--secondary)' : 'var(--primary)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover arrow indicator */}
      <div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2"
        style={{ color: 'var(--primary)' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
