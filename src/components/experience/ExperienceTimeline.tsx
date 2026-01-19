import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { Tag } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { experiences, type Experience } from '../../content/experience';

gsap.registerPlugin(ScrollTrigger);

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

export function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Setup scroll-driven animations
  useGsapContext(
    () => {
      if (!containerRef.current || !timelineRef.current || prefersReducedMotion) return;

      const items = timelineRef.current.querySelectorAll('[data-timeline-item]');
      const progressBar = progressRef.current;

      // Initial state for cards - visible but ready for reveal animation
      gsap.set(items, { opacity: 0, y: 12 });

      // Reveal animation for each card
      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 80%',
          end: 'top 30%',
          onEnter: () => {
            // Reveal card
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
}

function TimelineItem({ exp, isActive, isCurrent }: TimelineItemProps) {
  const colors = typeColors[exp.type];

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

        {/* Description */}
        <p className="mb-4 text-sm md:text-base" style={{ color: 'var(--muted)' }}>
          {exp.description}
        </p>

        {/* Highlights - show first 2 always, rest can expand */}
        <ul className="space-y-1.5 mb-4">
          {exp.highlights.slice(0, 3).map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm"
              style={{ color: 'var(--muted)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: colors.bg }}
              />
              {highlight}
            </li>
          ))}
          {exp.highlights.length > 3 && (
            <li className="text-sm pl-3.5" style={{ color: 'var(--muted)' }}>
              +{exp.highlights.length - 3} more achievements
            </li>
          )}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.slice(0, 6).map((tech) => (
            <Tag key={tech} size="sm">
              {tech}
            </Tag>
          ))}
          {exp.technologies.length > 6 && (
            <span className="text-xs px-2 py-1" style={{ color: 'var(--muted)' }}>
              +{exp.technologies.length - 6}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
