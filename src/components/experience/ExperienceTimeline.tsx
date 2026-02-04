import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { Tag } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { experiences, type Experience } from '../../content/experience';

gsap.registerPlugin(ScrollTrigger);

// Hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

const typeColors: Record<Experience['type'], { bg: string; text: string; border: string }> = {
  frontend: { bg: 'var(--accent)', text: 'var(--accent)', border: 'var(--accent)' },
  fullstack: { bg: 'var(--accent-2)', text: 'var(--accent-2)', border: 'var(--accent-2)' },
  xr: { bg: '#f97316', text: '#f97316', border: '#f97316' },
  research: { bg: 'var(--accent-3)', text: 'var(--accent-3)', border: 'var(--accent-3)' },
};

const typeLabels: Record<Experience['type'], string> = {
  frontend: 'Frontend',
  fullstack: 'Full-Stack',
  xr: 'XR / Game Dev',
  research: 'Research',
};

export function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // Setup scroll-driven animations - cinematic card entrance
  useGsapContext(
    () => {
      if (!containerRef.current || !timelineRef.current || prefersReducedMotion) return;

      const items = timelineRef.current.querySelectorAll('[data-timeline-item]');
      const progressBar = progressRef.current;

      // Cinematic entrance: cards rise from below with scale
      items.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          },
        });
      });

      // Progress bar animation - fills as user scrolls through timeline
      if (progressBar) {
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(progressBar, {
              scaleY: self.progress,
            });
          },
        });
      }
    },
    containerRef,
    [prefersReducedMotion]
  );

  // For reduced motion, show all items immediately
  useEffect(() => {
    if (prefersReducedMotion && timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('[data-timeline-item]');
      items.forEach((item) => {
        (item as HTMLElement).style.opacity = '1';
        (item as HTMLElement).style.transform = 'none';
      });
    }
  }, [prefersReducedMotion]);

  return (
    <Section>
      <div ref={containerRef}>
        {/* Timeline container */}
        <div ref={timelineRef} className="relative">
          {/* Vertical timeline line - left side on desktop, left edge on mobile */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {/* Progress overlay */}
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                backgroundColor: 'var(--accent)',
                height: '100%',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                exp={exp}
                isActive={index === activeIndex}
                isCurrent={index === 0}
                isMobile={isMobile}
                isExpanded={expandedCardId === exp.id}
                onToggleExpand={() => {
                  setExpandedCardId(expandedCardId === exp.id ? null : exp.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

interface TimelineItemProps {
  exp: Experience;
  isActive: boolean;
  isCurrent: boolean;
  isMobile: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function TimelineItem({ exp, isActive, isCurrent, isMobile, isExpanded, onToggleExpand }: TimelineItemProps) {
  const colors = typeColors[exp.type];
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLUListElement>(null);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animate expansion/collapse on mobile
  useEffect(() => {
    if (!isMobile || !contentRef.current || prefersReducedMotion) return;

    if (isExpanded) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isExpanded, isMobile, prefersReducedMotion]);

  // Animate highlights expansion on desktop only
  useEffect(() => {
    if (!highlightsRef.current || prefersReducedMotion || isMobile) return;

    const extraHighlights = highlightsRef.current.querySelectorAll('[data-extra-highlight]');
    
    if (highlightsExpanded) {
      gsap.to(extraHighlights, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.05,
      });
    } else {
      gsap.to(extraHighlights, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [highlightsExpanded, prefersReducedMotion, isMobile]);

  return (
    <div
      data-timeline-item
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline node */}
      <div
        data-timeline-node
        className="absolute left-4 md:left-8 w-3 h-3 rounded-full -translate-x-1/2 transition-all duration-300"
        style={{
          backgroundColor: isActive ? colors.bg : 'var(--surface)',
          border: `2px solid ${isActive ? colors.border : 'var(--border-color)'}`,
          boxShadow: isActive ? `0 0 12px ${colors.bg}` : 'none',
          top: '1.5rem',
        }}
      />

      {/* Current indicator */}
      {isCurrent && (
        <div
          className="absolute left-4 md:left-8 -translate-x-1/2 -top-6 text-xs font-medium px-2 py-0.5 rounded"
          style={{
            backgroundColor: colors.bg,
            color: 'var(--bg)',
          }}
        >
          Current
        </div>
      )}

      {/* Experience card */}
      <div
        className="glass-card p-5 md:p-6 transition-all duration-300"
        style={{
          borderColor: isActive ? colors.border : 'transparent',
          borderWidth: '1px',
          boxShadow: isActive ? `0 0 20px color-mix(in srgb, ${colors.bg} 15%, transparent)` : 'none',
          transform: isActive ? 'scale(1)' : 'scale(0.99)',
          opacity: isActive ? 1 : 0.85, // Never below 70% as per spec
        }}
      >
        {/* Card header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            {/* Type badge and period */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="px-2 py-0.5 text-xs font-medium rounded"
                style={{
                  backgroundColor: `color-mix(in srgb, ${colors.bg} 15%, transparent)`,
                  color: colors.text,
                  border: `1px solid color-mix(in srgb, ${colors.border} 25%, transparent)`,
                }}
              >
                {typeLabels[exp.type]}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                {exp.period}
              </span>
            </div>

            {/* Role and company */}
            <h3 className="text-lg md:text-xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
              {exp.role}
            </h3>
            <p className="font-medium" style={{ color: colors.text }}>
              {exp.company}
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {exp.location}
            </p>
          </div>
        </div>

        {/* Expandable content on mobile */}
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{
            height: isMobile && !isExpanded ? 0 : 'auto',
            opacity: isMobile && !isExpanded ? 0 : 1,
          }}
        >
          {/* Description */}
          <p className="mb-4 text-sm md:text-base" style={{ color: 'var(--muted)' }}>
            {exp.description}
          </p>

          {/* Highlights - show first 4, rest can expand on desktop only */}
          <ul ref={highlightsRef} className="space-y-1.5 mb-4">
            {exp.highlights.slice(0, 4).map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm"
                style={{ color: 'var(--muted)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: colors.bg }}
                />
                {highlight}
              </li>
            ))}
            {exp.highlights.length > 4 && (
              <>
                {/* Extra highlights - always shown on mobile when card expanded, collapsible on desktop */}
                {exp.highlights.slice(4).map((highlight, i) => (
                  <li
                    key={i + 4}
                    data-extra-highlight
                    className="flex items-start gap-2 text-sm overflow-hidden"
                    style={{
                      color: 'var(--muted)',
                      height: ((isMobile && isExpanded) || highlightsExpanded) ? 'auto' : 0,
                      opacity: ((isMobile && isExpanded) || highlightsExpanded) ? 1 : 0,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: colors.bg }}
                    />
                    {highlight}
                  </li>
                ))}
                {/* Expand/collapse button - desktop only */}
                {!isMobile && (
                  <li>
                    <button
                      onClick={() => setHighlightsExpanded(!highlightsExpanded)}
                      className="text-sm pl-3.5 hover:underline transition-colors duration-200 flex items-center gap-1"
                      style={{ color: colors.text }}
                      aria-expanded={highlightsExpanded}
                    >
                      {highlightsExpanded ? (
                        <>Show less</>
                      ) : (
                        <>Show {exp.highlights.length - 4} more</>
                      )}
                      <svg
                        className="w-3 h-3 transition-transform duration-200"
                        style={{ transform: highlightsExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Technologies - always visible */}
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.slice(0, 8).map((tech) => (
            <Tag key={tech} size="sm">
              {tech}
            </Tag>
          ))}
          {exp.technologies.length > 8 && (
            <span className="text-xs px-2 py-1" style={{ color: 'var(--muted)' }}>
              +{exp.technologies.length - 8}
            </span>
          )}
        </div>

        {/* Mobile expand/collapse button */}
        {isMobile && (
          <button
            onClick={onToggleExpand}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-200 active:scale-95"
            style={{
              backgroundColor: `color-mix(in srgb, ${colors.bg} 10%, transparent)`,
              color: colors.text,
              border: `1px solid color-mix(in srgb, ${colors.border} 20%, transparent)`,
            }}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Show less details' : 'Show more details'}
          >
            <span className="text-sm font-medium">
              {isExpanded ? 'Read less' : 'Read more'}
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-200"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
