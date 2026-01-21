import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

type RhythmType = 'hero' | 'content' | 'image' | 'cta' | 'transition';

interface RhythmSectionProps {
  children: React.ReactNode;
  rhythm: RhythmType;
  className?: string;
  id?: string;
}

const rhythmStyles: Record<
  RhythmType,
  {
    spacing: string;
    background: string;
    reveal?: boolean;
  }
> = {
  hero: {
    spacing: 'py-24 md:py-32 lg:py-40',
    background: 'var(--bg)',
    reveal: false, // Hero is always visible
  },
  content: {
    spacing: 'py-16 md:py-24',
    background: 'var(--bg)',
    reveal: true,
  },
  image: {
    spacing: 'py-20 md:py-32',
    background: 'color-mix(in srgb, var(--surface) 30%, transparent)',
    reveal: true,
  },
  cta: {
    spacing: 'py-24 md:py-32 lg:py-40',
    background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)',
    reveal: true,
  },
  transition: {
    spacing: 'py-12 md:py-16',
    background: 'transparent',
    reveal: false,
  },
};

export function RhythmSection({
  children,
  rhythm,
  className = '',
  id,
}: RhythmSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const style = rhythmStyles[rhythm];

  // Reveal animation for content sections
  useGsapContext(
    () => {
      if (!sectionRef.current || !style.reveal || prefersReducedMotion) return;

      const section = sectionRef.current;

      // Set initial state
      gsap.set(section, { opacity: 0, y: 12 });

      // Reveal on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });
    },
    sectionRef,
    [rhythm, prefersReducedMotion]
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full ${style.spacing} ${className}`}
      style={{
        background: style.background,
        opacity: !style.reveal || prefersReducedMotion ? 1 : undefined,
      }}
    >
      {/* Decorative border for rhythm separation */}
      {rhythm === 'transition' && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px"
          style={{ backgroundColor: 'var(--border-color)' }}
        />
      )}

      <div className="container-main">{children}</div>
    </section>
  );
}
