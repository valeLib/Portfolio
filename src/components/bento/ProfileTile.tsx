import { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks';
import { useTheme } from '../../hooks/useTheme';

interface ProfileTileProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export function ProfileTile({ imageSrc, imageAlt, className = '' }: ProfileTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();

  // Liquid wobble effect on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    let animationId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 15;
      targetY = y * 15;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      // Smooth lerp towards target
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const mask = container.querySelector('.liquid-mask') as HTMLElement;
      if (mask) {
        // Create wobble effect with CSS transform
        mask.style.transform = `
          perspective(500px)
          rotateY(${currentX}deg)
          rotateX(${-currentY}deg)
          scale(1.02)
        `;
        // Subtle border-radius wobble
        const wobble = Math.sin(Date.now() * 0.002) * 2;
        mask.style.borderRadius = `
          ${50 + wobble}% ${50 - wobble}%
          ${50 + wobble}% ${50 - wobble}%
          / ${50 - wobble}% ${50 + wobble}%
          ${50 - wobble}% ${50 + wobble}%
        `;
      }

      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`
        relative w-full h-full
        flex items-center justify-center
        p-6
        ${className}
      `}
    >
      {/* SVG Filter for extra wobble (optional enhancement) */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquidWobble">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.01;0.015;0.01"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Profile image with liquid mask effect */}
      <div
        className="liquid-mask relative overflow-hidden transition-transform duration-100"
        style={{
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          boxShadow: theme === 'dark'
            ? '0 0 30px rgba(255, 45, 149, 0.2), 0 0 60px rgba(139, 92, 246, 0.1)'
            : '0 8px 30px rgba(75, 83, 53, 0.15)',
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
          style={{
            filter: prefersReducedMotion ? 'none' : 'url(#liquidWobble)',
          }}
        />

        {/* Overlay glow for dark mode */}
        {theme === 'dark' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 45, 149, 0.1), transparent 60%)',
            }}
          />
        )}
      </div>

      {/* Decorative ring */}
      <div
        className="absolute inset-4 rounded-full pointer-events-none"
        style={{
          border: theme === 'dark'
            ? '1px solid rgba(139, 92, 246, 0.3)'
            : '1px solid rgba(150, 161, 120, 0.3)',
          animation: prefersReducedMotion ? 'none' : 'pulse 4s ease-in-out infinite',
        }}
      />
    </div>
  );
}
