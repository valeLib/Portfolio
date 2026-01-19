import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { Tag } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { frontendProjects, type FrontendProject } from '../../content/frontend-projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsGalleryProps {
  projects?: FrontendProject[];
  title?: string;
  description?: string;
}

export function ProjectsGallery({
  projects = frontendProjects,
  title = 'Frontend & Software Engineering',
  description = 'Production applications built with React, Vue, TypeScript, and modern web technologies. Focus on performance, accessibility, and scalable architecture.',
}: ProjectsGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || !trackRef.current || prefersReducedMotion) return;

      const container = containerRef.current;
      const track = trackRef.current;
      const cards = track.querySelectorAll('[data-project-card]');
      const totalCards = cards.length;

      // Calculate scroll distance based on number of cards
      const scrollDistance = (totalCards - 1) * 100; // percentage of viewport width per card

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

      // Animate individual cards - scale up when active, down when not
      cards.forEach((card, i) => {
        const cardProgress = i / (totalCards - 1);

        // Scale and opacity animation for each card
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
    [prefersReducedMotion, projects]
  );

  return (
    <Section className="min-h-screen overflow-hidden" noPadding fullWidth>
      <div ref={containerRef} className="h-screen flex flex-col">
        {/* Header */}
        <div className="container-main pt-8 pb-4 flex-shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>
                {title}
              </h2>
              <p className="max-w-2xl text-sm" style={{ color: 'var(--muted)' }}>
                {description}
              </p>
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
                    width: `${((activeIndex + 1) / projects.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--muted)' }}>
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 px-8"
            style={{ width: `${projects.length * 85}vw` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                data-project-card
                className="w-[75vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0"
              >
                <ProjectCard project={project} isActive={index === activeIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="container-main py-4 flex-shrink-0 text-center">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Scroll to browse projects
          </p>
        </div>
      </div>
    </Section>
  );
}

interface ProjectCardProps {
  project: FrontendProject;
  isActive?: boolean;
}

function ProjectCard({ project, isActive = false }: ProjectCardProps) {
  return (
    <div
      className="glass-card p-6 h-full flex flex-col transition-all duration-300"
      style={{
        borderColor: isActive ? 'var(--accent)' : undefined,
        borderWidth: isActive ? '1px' : undefined,
      }}
    >
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="px-2 py-1 text-xs font-medium rounded"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
            color: 'var(--accent)',
            border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Title & Company */}
      <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
        {project.title}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
        {project.company}
      </p>

      {/* Problem & Contribution */}
      <div className="space-y-3 mb-4 flex-1">
        <div>
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: 'var(--muted)' }}
          >
            Problem
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {project.problem}
          </p>
        </div>
        <div>
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: 'var(--muted)' }}
          >
            My Contribution
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {project.contribution}
          </p>
        </div>
        <div>
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: 'var(--muted)' }}
          >
            Outcome
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {project.outcome}
          </p>
        </div>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <Tag key={tech} size="sm">
            {tech}
          </Tag>
        ))}
      </div>

      {/* Live URL */}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          View Live Site
        </a>
      )}
    </div>
  );
}
