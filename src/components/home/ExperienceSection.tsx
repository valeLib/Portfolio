import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  research: { bg: '#22c55e', text: '#22c55e', border: '#22c55e' },
};

const typeLabels: Record<Experience['type'], string> = {
  frontend: 'Frontend',
  fullstack: 'Full-Stack',
  xr: 'XR / Game Dev',
  research: 'Research',
};

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // Setup scroll-driven animations - restrained, editorial
  useGsapContext(
    () => {
      if (!containerRef.current || !timelineRef.current || prefersReducedMotion) return;

      const items = timelineRef.current.querySelectorAll('[data-timeline-item]');
      const progressBar = progressRef.current;

      // Initial state for cards - hidden, small upward motion only
      gsap.set(items, { opacity: 0, y: 12 });

      // Reveal animation for each card - simple, calm
      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 80%',
          end: 'top 30%',
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
            setActiveIndex(index);
          },
          onEnterBack: () => {
            setActiveIndex(index);
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

  return (
    <div ref={containerRef}>
        {/* Section header */}
        <div className="flex items-end justify-between gap-4 mb-12">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: 'var(--text)' }}
            >
              Experience
            </h2>
            <p style={{ color: 'var(--muted)' }}>
              Professional journey across frontend, full-stack, and XR development
            </p>
          </div>
          <Link
            to="/experience"
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            Full timeline
          </Link>
        </div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative">
          {/* Vertical timeline line - left side */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'var(--border-color)' }}
          >
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

          {/* Timeline items - show first 3 experiences */}
          <div className="space-y-8 md:space-y-12">
            {experiences.slice(0, 3).map((exp, index) => (
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

          {/* View more link */}
          <div className="mt-8 pl-12 md:pl-20">
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--accent)' }}
            >
              View all {experiences.length} positions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
    </div>
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

  return (
    <div data-timeline-item className="relative pl-12 md:pl-20">
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

      {/* Experience card - always readable, never disabled-looking */}
      <div
        className="glass-card p-5 md:p-6 transition-all duration-300"
        style={{
          borderColor: isActive ? colors.border : 'transparent',
          borderWidth: '1px',
          boxShadow: isActive
            ? `0 0 20px color-mix(in srgb, ${colors.bg} 15%, transparent)`
            : 'none',
          opacity: isActive ? 1 : 0.85,
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

          {/* Highlights - show first 2 only on home page */}
          <ul className="space-y-1.5 mb-4">
            {exp.highlights.slice(0, 2).map((highlight, i) => (
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
            {exp.highlights.length > 2 && (
              <li className="text-sm pl-3.5" style={{ color: 'var(--muted)' }}>
                +{exp.highlights.length - 2} more achievements
              </li>
            )}
          </ul>
        </div>

        {/* Technologies - show first 5, always visible */}
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.slice(0, 5).map((tech) => (
            <Tag key={tech} size="sm">
              {tech}
            </Tag>
          ))}
          {exp.technologies.length > 5 && (
            <span className="text-xs px-2 py-1" style={{ color: 'var(--muted)' }}>
              +{exp.technologies.length - 5}
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
