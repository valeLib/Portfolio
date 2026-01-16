import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { Tag } from '../ui';
import { LottieDecor } from '../media';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { experiences, type Experience } from '../../content/experience';
import catAnimation from '../../assets/lottie/cat-decoration.json';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const filteredExperiences =
    filter === 'all' ? experiences : experiences.filter((exp) => exp.type === filter);

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      // Desktop: Pin sidebar while timeline scrolls
      ScrollTrigger.matchMedia({
        // Desktop
        '(min-width: 768px)': function () {
          if (sidebarRef.current && containerRef.current) {
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: 'top 100px',
              end: 'bottom bottom',
              pin: sidebarRef.current,
              pinSpacing: false,
            });
          }
        },
      });

      // Animate timeline items
      const items = containerRef.current.querySelectorAll('[data-timeline-item]');
      const dots = containerRef.current.querySelectorAll('[data-timeline-dot]');

      items.forEach((item, idx) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            once: true,
          },
        });

        // Animate dot when item enters
        if (dots[idx]) {
          gsap.from(dots[idx], {
            scale: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              once: true,
            },
          });
        }
      });
    },
    containerRef,
    [prefersReducedMotion, filteredExperiences]
  );

  return (
    <Section>
      <div ref={containerRef} className="relative">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          {/* Sidebar - pinned on desktop */}
          <div ref={sidebarRef} className="md:h-fit">
            <div className="sticky top-24">
              <h2 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>
                Timeline
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                Filter by role type
              </p>

              {/* Filters */}
              <div className="flex flex-wrap md:flex-col gap-2">
                {(Object.keys(filterLabels) as FilterType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-left"
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
            </div>
          </div>

          {/* Timeline content */}
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-px"
              style={{ backgroundColor: 'var(--border-color)' }}
            />

            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                data-timeline-item
                className="relative pl-12 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  data-timeline-dot
                  className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: `3px solid ${typeColors[exp.type].border}`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: typeColors[exp.type].bg }}
                  />
                </div>

                {/* Card */}
                <div className="glass-card p-6">
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
                  <p className="mb-4" style={{ color: 'var(--muted)' }}>
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-4">
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
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Tag key={tech} size="sm">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* End decoration */}
            <div className="relative pl-12 flex items-center">
              <div
                className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <LottieDecor
                  data={JSON.stringify(catAnimation)}
                  className="w-6 h-6 opacity-50"
                />
              </div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                The journey continues...
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
