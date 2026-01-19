import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tag } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { getAllFrontendProjects, type FrontendProject } from '../../content/frontend-projects';
import { isFrontend } from '../../config';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Get projects
  const projects = isFrontend ? getAllFrontendProjects().slice(0, 4) : [];

  // Simple reveal animation
  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const items = containerRef.current.querySelectorAll('[data-project-item]');

      gsap.set(items, { opacity: 0, y: 12 });

      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          },
        });
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  if (!isFrontend || projects.length === 0) return null;

  return (
    <div ref={containerRef}>
        {/* Section header */}
        <div className="flex items-end justify-between gap-4 mb-12">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: 'var(--text)' }}
            >
              Selected Work
            </h2>
            <p style={{ color: 'var(--muted)' }}>
              Projects showcasing frontend architecture and UI systems
            </p>
          </div>
          <Link
            to="/projects"
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            View all
          </Link>
        </div>

        {/* Projects list - Editorial vertical layout */}
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
    </div>
  );
}

interface ProjectItemProps {
  project: FrontendProject;
}

function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div
      data-project-item
      className="group py-6 border-b transition-colors"
      style={{ borderColor: 'var(--border-color)' }}
    >
      {/* Project info */}
      <div className="flex-1 min-w-0">
        {/* Company tag */}
        <span
          className="text-xs font-medium uppercase tracking-wider mb-2 block"
          style={{ color: 'var(--accent)' }}
        >
          {project.company}
        </span>

        {/* Title */}
        <h3
          className="text-lg md:text-xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors"
          style={{ color: 'var(--text)' }}
        >
          {project.title}
        </h3>

        {/* One-line impact/contribution */}
        <p
          className="text-sm md:text-base mb-3 max-w-2xl"
          style={{ color: 'var(--muted)' }}
        >
          {project.contribution}
        </p>

        {/* Compact tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <Tag key={tech} size="sm">
              {tech}
            </Tag>
          ))}
          {project.technologies.length > 5 && (
            <span
              className="text-xs px-2 py-0.5"
              style={{ color: 'var(--muted)' }}
            >
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
