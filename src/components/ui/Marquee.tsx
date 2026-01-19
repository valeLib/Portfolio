import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '../../hooks';

interface MarqueeProps {
  items: string[];
  speed?: number; // Duration for one full cycle in seconds
  direction?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
  separator?: string;
}

export function Marquee({
  items,
  speed = 20,
  direction = 'left',
  className = '',
  style,
  separator = ' • ',
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!marqueeRef.current || prefersReducedMotion) return;

    const marquee = marqueeRef.current;
    const firstChild = marquee.querySelector('[data-marquee-content]') as HTMLElement;
    if (!firstChild) return;

    // Create animation
    const xPercent = direction === 'left' ? -100 : 0;
    const xPercentEnd = direction === 'left' ? 0 : -100;

    gsap.set(firstChild, { xPercent });

    const animation = gsap.to(firstChild, {
      xPercent: xPercentEnd,
      duration: speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(xPercentEnd, xPercent),
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed, direction, prefersReducedMotion]);

  // Create content string
  const content = items.join(separator);

  // For reduced motion, show static centered text
  if (prefersReducedMotion) {
    return (
      <div
        className={`overflow-hidden whitespace-nowrap ${className}`}
        style={style}
      >
        <div className="flex justify-center">
          <span className="inline-block px-4">{content}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={marqueeRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={style}
    >
      {/* Duplicate content for seamless loop */}
      <div data-marquee-content className="inline-flex">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="inline-block px-4">
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}

interface MarqueeBandProps {
  label: string;
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'muted';
}

export function MarqueeBand({
  label,
  items,
  speed = 25,
  direction = 'left',
  variant = 'muted',
}: MarqueeBandProps) {
  const variants = {
    primary: {
      bg: 'var(--accent)',
      text: 'var(--bg)',
    },
    secondary: {
      bg: 'var(--surface)',
      text: 'var(--text)',
    },
    muted: {
      bg: 'transparent',
      text: 'var(--muted)',
    },
  };

  const colors = variants[variant];

  return (
    <div
      className="py-3 border-y"
      style={{
        backgroundColor: colors.bg,
        borderColor: 'var(--border-color)',
      }}
    >
      <Marquee
        items={[label, ...items]}
        speed={speed}
        direction={direction}
        className="text-sm md:text-base font-medium tracking-wide uppercase"
        style={{ color: colors.text }}
        separator=" • "
      />
    </div>
  );
}
