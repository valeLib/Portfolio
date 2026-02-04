import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/layout';
import { Tag, CvDownloadButton } from '../components/ui';
import { ProjectsIntro, ProjectsGallery } from '../components/projects';
import { useDocumentTitle, useGsapContext, usePrefersReducedMotion } from '../hooks';
import { frontendProjects, gameDevProjects, type FrontendProject } from '../content/frontend-projects';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  useDocumentTitle('Projects');

  return (
    <>
      {/* Intro Section with pin */}
      <ProjectsIntro />

      {/* Main Projects Gallery */}
      <ProjectsGallery
        projects={frontendProjects}
        title="Frontend & Software Engineering"
        description="Production applications built with React, Vue, TypeScript, and modern web technologies. Focus on performance, accessibility, and scalable architecture."
      />

      {/* Project Approach Section */}
      <ProjectApproachSection />

      {/* Game Dev Section */}
      <GameDevSection projects={gameDevProjects} />

      {/* CTA */}
      <CTASection />
    </>
  );
}

function ProjectApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const cards = containerRef.current.querySelectorAll('[data-approach-card]');

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  const approaches = [
    {
      title: 'Performance First',
      description: 'Optimized for Core Web Vitals with efficient rendering and minimal bundle sizes.',
      color: 'var(--accent)',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
    },
    {
      title: 'Accessible',
      description: 'WCAG compliant with proper semantics, keyboard navigation, and screen reader support.',
      color: 'var(--accent-2)',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ),
    },
    {
      title: 'Maintainable',
      description: 'Clean architecture with TypeScript, proper testing, and comprehensive documentation.',
      color: 'var(--accent-3)',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      ),
    },
  ];

  return (
    <Section style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)' }}>
      <div ref={containerRef} className="max-w-3xl mx-auto text-center">
        <h2 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>
          Project Approach
        </h2>
        <p className="mb-8" style={{ color: 'var(--muted)' }}>
          Each project follows a structured approach focusing on performance, accessibility, and
          maintainable code. I believe in building solutions that scale well and provide excellent
          user experiences.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {approaches.map((approach) => (
            <div key={approach.title} data-approach-card className="glass-card p-6 text-center">
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `color-mix(in srgb, ${approach.color} 20%, transparent)` }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: approach.color }}
                >
                  {approach.icon}
                </svg>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {approach.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {approach.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

interface GameDevSectionProps {
  projects: FrontendProject[];
}

function GameDevSection({ projects }: GameDevSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const header = containerRef.current.querySelector('[data-gamedev-header]');
      const cards = containerRef.current.querySelectorAll('[data-gamedev-card]');

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

      gsap.from(cards, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    },
    containerRef,
    [prefersReducedMotion, projects]
  );

  return (
    <Section>
      <div ref={containerRef}>
        <div data-gamedev-header className="mb-6">
          <h3
            className="text-sm uppercase tracking-wider mb-2"
            style={{ color: 'var(--muted)' }}
          >
            Additional Experience
          </h3>
          <h2 className="heading-3 mb-2" style={{ color: 'var(--text)' }}>
            Game Development & XR
          </h2>
          <p className="max-w-xl text-sm" style={{ color: 'var(--muted)' }}>
            Cross-platform development experience with Unity and VR technologies.
          </p>
        </div>

        <div className="max-w-2xl space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              data-gamedev-card
              className="glass-card p-5"
              style={{ borderLeft: '4px solid color-mix(in srgb, var(--accent-2) 50%, transparent)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>
                    {project.title}
                  </h4>
                  <p className="text-sm mb-2" style={{ color: 'var(--accent-2)' }}>
                    {project.company}
                  </p>
                  <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                    {project.contribution}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Tag key={tech} size="sm">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTASection() {
  return (
    <Section style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 80%, transparent)' }}>
      <div className="text-center">
        <h2 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>
          Want to See More?
        </h2>
        <p className="mb-6 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
          Check out my work experience or get in touch to discuss your project.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
          <CvDownloadButton variant="secondary" />
        </div>
      </div>
    </Section>
  );
}
