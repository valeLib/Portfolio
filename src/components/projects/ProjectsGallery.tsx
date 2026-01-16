import { useRef } from 'react';
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
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const header = containerRef.current.querySelector('[data-gallery-header]');
      const cards = containerRef.current.querySelectorAll('[data-project-card]');

      // Header reveal
      gsap.from(header, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true,
        },
      });

      // Batch reveal cards (3 at a time)
      const batchSize = 3;
      for (let i = 0; i < cards.length; i += batchSize) {
        const batch = Array.from(cards).slice(i, i + batchSize);
        gsap.from(batch, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: batch[0],
            start: 'top 80%',
            once: true,
          },
        });
      }
    },
    containerRef,
    [prefersReducedMotion, projects]
  );

  return (
    <Section>
      <div ref={containerRef}>
        <div data-gallery-header className="mb-8">
          <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>
            {title}
          </h2>
          <p className="max-w-2xl" style={{ color: 'var(--muted)' }}>
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} data-project-card>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: FrontendProject }) {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
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
