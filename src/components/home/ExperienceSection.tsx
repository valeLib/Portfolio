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

  // Setup scroll-driven animations - Reference design cinematic style
  useGsapContext(
    () => {
      if (!containerRef.current || !timelineRef.current || prefersReducedMotion) return;

      const items = timelineRef.current.querySelectorAll('[data-timeline-item]');
      const dots = timelineRef.current.querySelectorAll('[data-timeline-dot]');
      const progressBar = progressRef.current;

      // Cinematic entrance: cards slide from alternating sides
      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const xOffset = isMobile ? -50 : (isEven ? -50 : 50);
        
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          },
          opacity: 0,
          x: xOffset,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
      
      // Dots scale in with bounce effect
      dots.forEach((dot) => {
        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: 'top 85%',
          },
          scale: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
          delay: 0.2,
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
    [prefersReducedMotion, isMobile]
  );

  return (
    <div ref={containerRef}>
        {/* Section header - Reference design style */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
             Experience
          </h2>
          <div className="accent-line-pink mb-4" />
          <p style={{ color: 'var(--muted)' }} className="max-w-2xl">
            Professional journey across frontend, full-stack, and XR development
          </p>
        </div>

        {/* Timeline container - Center-aligned with alternating cards */}
        <div ref={timelineRef} className="relative">
          {/* Center vertical timeline line with gradient */}
          <div
            className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(167, 139, 250, 0.5) 20%, rgba(252, 119, 153, 0.5) 50%, rgba(167, 139, 250, 0.5) 80%, transparent 100%)',
            }}
          >
            {/* Animated progress overlay */}
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                background: 'linear-gradient(180deg, #a78bfa, #fc7799)',
                height: '100%',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Timeline items - show first 3 experiences */}
          <div className="space-y-4">
            {experiences.slice(0, 3).map((exp, index) => (
              <TimelineItem
                key={exp.id}
                exp={exp}
                index={index}
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
          <div className="mt-10 text-center">
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#fc7799] transition-colors"
              style={{ color: 'var(--accent-2)' }}
            >
              View all {experiences.length} positions →
            </Link>
          </div>
        </div>
    </div>
  );
}

interface TimelineItemProps {
  exp: Experience;
  index: number;
  isActive: boolean;
  isCurrent: boolean;
  isMobile: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function TimelineItem({ exp, index, isActive, isCurrent, isMobile, isExpanded, onToggleExpand }: TimelineItemProps) {
  const colors = typeColors[exp.type];
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLUListElement>(null);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isEven = index % 2 === 0;

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

    const highlights = highlightsRef.current.querySelectorAll('[data-highlight]');
    
    if (highlightsExpanded) {
      gsap.to(highlights, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.05,
      });
    } else {
      gsap.to(highlights, {
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
      className={`relative flex items-center justify-between ${isMobile ? '' : (isEven ? 'md:flex-row' : 'md:flex-row-reverse')} group`}
    >
      {/* Pink glowing dot - Center aligned */}
      <div 
        data-timeline-dot
        className="absolute left-5 md:left-1/2 w-10 h-10 flex items-center justify-center rounded-full -translate-x-1/2 z-10"
        style={{
          backgroundColor: 'var(--bg)',
          border: '4px solid var(--bg)',
        }}
      >
        <div 
          className="w-4 h-4 rounded-full bg-[#fc7799] transition-all duration-300"
          style={{
            boxShadow: isActive ? '0 0 10px #fc7799, 0 0 20px rgba(252, 119, 153, 0.5)' : '0 0 5px #fc7799',
          }}
        />
      </div>

      {/* Experience card - Positioned on alternating sides */}
      <div 
        className={`${isMobile ? 'w-full ml-12' : 'md:w-[calc(50%-40px)]'} glass-card-hover p-6 md:p-8 transition-all duration-300`}
        style={{
          opacity: isActive ? 1 : 0.85,
        }}
      >
        {/* Header with role and period */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-[#fc7799] transition-colors">
            {exp.role}
          </h3>
          <span 
            className="text-sm font-mono flex items-center gap-1 px-2 py-1 rounded self-start"
            style={{
              backgroundColor: 'rgba(167, 139, 250, 0.15)',
              color: 'var(--accent-2)',
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {exp.period}
          </span>
        </div>

        {/* Company */}
        <h4 className="text-lg font-medium flex items-center gap-2 mb-3" style={{ color: 'var(--accent-2)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {exp.company}
        </h4>

        {/* Description - Always visible */}
        <p className="mb-2 leading-relaxed" style={{ color: 'var(--text)' }}>
          {exp.description}
        </p>

        {/* Expandable highlights on mobile */}
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{
            height: isMobile && !isExpanded ? 0 : 'auto',
            opacity: isMobile && !isExpanded ? 0 : 1,
          }}
        >

          {/* Highlights - all hidden initially, shown when expanded */}
          <ul ref={highlightsRef} className="space-y-1.5 mb-4">
            {exp.highlights.map((highlight, i) => (
              <li
                key={i}
                data-highlight
                className="flex items-start gap-2 text-sm overflow-hidden"
                style={{
                  color: 'var(--muted)',
                  height: ((isMobile && isExpanded) || highlightsExpanded) ? 'auto' : 0,
                  opacity: ((isMobile && isExpanded) || highlightsExpanded) ? 1 : 0,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#fc7799]"
                />
                {highlight}
              </li>
            ))}
            {/* Expand/collapse button - desktop only */}
            {!isMobile && exp.highlights.length > 0 && (
              <li>
                <button
                  onClick={() => setHighlightsExpanded(!highlightsExpanded)}
                  className="text-sm hover:text-[#fc7799] transition-colors duration-200 flex items-center gap-1"
                  style={{ color: 'var(--accent-2)' }}
                  aria-expanded={highlightsExpanded}
                >
                  {highlightsExpanded ? (
                    <>Hide details</>
                  ) : (
                    <>Show {exp.highlights.length} {exp.highlights.length === 1 ? 'detail' : 'details'}</>
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
          </ul>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {exp.technologies.slice(0, 4).map((tech) => (
            <span 
              key={tech}
              className="text-xs font-medium px-3 py-1 rounded-full border transition-colors duration-200"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {tech}
            </span>
          ))}
          {exp.technologies.length > 4 && (
            <span className="text-xs px-3 py-1" style={{ color: 'var(--muted)' }}>
              +{exp.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Current badge */}
        {isCurrent && (
          <div 
            className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider"
            style={{
              backgroundColor: 'rgba(252, 119, 153, 0.15)',
              color: '#fc7799',
              border: '1px solid rgba(252, 119, 153, 0.3)',
            }}
          >
            CURRENT
          </div>
        )}

        {/* Mobile expand/collapse button */}
        {isMobile && (
          <button
            onClick={onToggleExpand}
            className="mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-200 active:scale-95 hover:bg-[rgba(252,119,153,0.1)]"
            style={{
              backgroundColor: 'rgba(167, 139, 250, 0.1)',
              color: 'var(--accent-2)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
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
