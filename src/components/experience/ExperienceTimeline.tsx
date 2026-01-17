import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { Tag } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { experiences, type Experience } from '../../content/experience';

gsap.registerPlugin(ScrollTrigger);

type FilterType = 'all' | Experience['type'];

const filterLabels: Record<FilterType, string> = {
  all: 'All',
  frontend: 'Frontend',
  fullstack: 'Full-Stack',
  xr: 'XR / Game Dev',
  research: 'Research',
};

const typeColors: Record<Experience['type'], { bg: string; text: string; border: string }> = {
  frontend: { bg: 'var(--accent)', text: 'var(--accent)', border: 'var(--accent)' },
  fullstack: { bg: 'var(--accent-2)', text: 'var(--accent-2)', border: 'var(--accent-2)' },
  xr: { bg: '#f97316', text: '#f97316', border: '#f97316' },
  research: { bg: '#22c55e', text: '#22c55e', border: '#22c55e' },
};

export function ExperienceTimeline() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const filteredExperiences =
    filter === 'all' ? experiences : experiences.filter((exp) => exp.type === filter);

  useGsapContext(
    () => {
      if (!containerRef.current || !trackRef.current || prefersReducedMotion) return;

      const container = containerRef.current;
      const track = trackRef.current;
      const cards = track.querySelectorAll('[data-timeline-item]');
      const totalCards = cards.length;

      if (totalCards === 0) return;

      // Calculate scroll distance based on number of cards
      const scrollDistance = (totalCards - 1) * 100;

      // Set initial state
      gsap.set(cards, { opacity: 0.4, scale: 0.9 });
      gsap.set(cards[0], { opacity: 1, scale: 1 });

      // Create horizontal scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalCards * 50}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const newIndex = Math.round(self.progress * (totalCards - 1));
            setActiveIndex(newIndex);
          },
        },
      });

      // Animate horizontal position of track
      tl.to(track, {
        x: `-${scrollDistance}%`,
        ease: 'none',
      });

      // Animate individual cards
      cards.forEach((card, i) => {
        const cardProgress = i / (totalCards - 1);

        tl.to(card, {
          opacity: 1,
          scale: 1,
          duration: 0.5 / totalCards,
        }, cardProgress - 0.1);

        if (i < totalCards - 1) {
          tl.to(card, {
            opacity: 0.4,
            scale: 0.9,
            duration: 0.5 / totalCards,
          }, cardProgress + 0.1);
        }
      });
    },
    containerRef,
    [prefersReducedMotion, filteredExperiences]
  );

  return (
    <Section className="min-h-screen overflow-hidden" noPadding fullWidth>
      <div ref={containerRef} className="h-screen flex flex-col">
        {/* Header with filters */}
        <div className="container-main pt-8 pb-4 flex-shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="heading-3 mb-2" style={{ color: 'var(--text)' }}>
                Timeline
              </h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {filteredExperiences.length} {filter === 'all' ? 'positions' : filterLabels[filter] + ' roles'}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(filterLabels) as FilterType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilter(type);
                    setActiveIndex(0);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor:
                      filter === type
                        ? 'var(--accent)'
                        : 'color-mix(in srgb, var(--surface) 50%, transparent)',
                    color: filter === type ? 'var(--bg)' : 'var(--muted)',
                  }}
                >
                  {filterLabels[type]}
                </button>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono" style={{ color: 'var(--accent)' }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <div
                className="w-24 h-0.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--border-color)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--accent)',
                    width: `${((activeIndex + 1) / filteredExperiences.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--muted)' }}>
                {String(filteredExperiences.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 px-8"
            style={{ width: `${filteredExperiences.length * 85}vw` }}
          >
            {filteredExperiences.map((exp, index) => (
              <div
                key={exp.id}
                data-timeline-item
                className="w-[75vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0"
              >
                <ExperienceCard exp={exp} isActive={index === activeIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="container-main py-4 flex-shrink-0 text-center">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Scroll to browse experience
          </p>
        </div>
      </div>
    </Section>
  );
}

interface ExperienceCardProps {
  exp: Experience;
  isActive?: boolean;
}

function ExperienceCard({ exp, isActive = false }: ExperienceCardProps) {
  return (
    <div
      className="glass-card p-6 h-full flex flex-col transition-all duration-300"
      style={{
        borderColor: isActive ? typeColors[exp.type].border : undefined,
        borderWidth: isActive ? '1px' : undefined,
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-1 text-xs font-medium rounded"
              style={{
                backgroundColor: `color-mix(in srgb, ${typeColors[exp.type].bg} 20%, transparent)`,
                color: typeColors[exp.type].text,
                border: `1px solid color-mix(in srgb, ${typeColors[exp.type].border} 30%, transparent)`,
              }}
            >
              {filterLabels[exp.type]}
            </span>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>
              {exp.period}
            </span>
          </div>
          <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
            {exp.role}
          </h3>
          <p style={{ color: 'var(--accent)' }}>{exp.company}</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {exp.location}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 flex-shrink-0" style={{ color: 'var(--muted)' }}>
        {exp.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-2 mb-4 flex-1 overflow-auto">
        {exp.highlights.map((highlight, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm"
            style={{ color: 'var(--muted)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            {highlight}
          </li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 flex-shrink-0">
        {exp.technologies.map((tech) => (
          <Tag key={tech} size="sm">
            {tech}
          </Tag>
        ))}
      </div>
    </div>
  );
}
