import { Link } from 'react-router-dom';
import { Section } from '../components/layout';
import { Tag, CvDownloadButton } from '../components/ui';
import { LottieDecor } from '../components/media';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import {
  frontendProjects,
  gameDevProjects,
  type FrontendProject,
} from '../content/frontend-projects';
import catAnimation from '../assets/lottie/cat-decoration.json';

// Project Card Component for Frontend Projects
function FrontendProjectCard({ project }: { project: FrontendProject }) {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 text-xs font-medium rounded bg-accent-500/20 text-accent-400 border border-accent-500/30">
          {project.category}
        </span>
      </div>

      {/* Title & Company */}
      <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
      <p className="text-accent-400 text-sm mb-4">{project.company}</p>

      {/* Problem & Contribution */}
      <div className="space-y-3 mb-4 flex-1">
        <div>
          <p className="text-dark-500 text-xs uppercase tracking-wider mb-1">Problem</p>
          <p className="text-dark-300 text-sm">{project.problem}</p>
        </div>
        <div>
          <p className="text-dark-500 text-xs uppercase tracking-wider mb-1">My Contribution</p>
          <p className="text-dark-300 text-sm">{project.contribution}</p>
        </div>
        <div>
          <p className="text-dark-500 text-xs uppercase tracking-wider mb-1">Outcome</p>
          <p className="text-dark-300 text-sm">{project.outcome}</p>
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
          className="inline-flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300 transition-colors"
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

// Compact Project Card for Secondary Section
function CompactProjectCard({ project }: { project: FrontendProject }) {
  return (
    <div className="glass-card p-5 border-l-4 border-primary-500/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-1">{project.title}</h4>
          <p className="text-primary-400 text-sm mb-2">{project.company}</p>
          <p className="text-dark-400 text-sm mb-3">{project.contribution}</p>
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
  );
}

export function Projects() {
  useDocumentTitle('Projects');
  const headerRef = useGsapReveal<HTMLDivElement>();
  const frontendRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const gameDevRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <>
      {/* Header */}
      <Section className="pb-8 relative overflow-hidden">
        <div ref={headerRef}>
          <div data-gsap-reveal className="max-w-3xl relative">
            <h1 className="heading-1 text-white mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-dark-300 mb-6">
              A selection of projects showcasing my work in frontend development, web applications,
              and software engineering.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/experience" className="btn-secondary">
                View Experience
              </Link>
              <CvDownloadButton variant="ghost" />
            </div>
          </div>
        </div>

        {/* Lottie decoration */}
        <LottieDecor
          src={JSON.stringify(catAnimation)}
          className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
        />
      </Section>

      {/* PRIMARY SECTION: Frontend / Software Engineering */}
      <Section className="pt-0">
        <div ref={frontendRef}>
          <div data-gsap-reveal className="mb-8">
            <h2 className="heading-2 text-white mb-2">Frontend & Software Engineering</h2>
            <p className="text-dark-400 max-w-2xl">
              Production applications built with React, Vue, TypeScript, and modern web technologies.
              Focus on performance, accessibility, and scalable architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontendProjects.map((project) => (
              <div key={project.id} data-gsap-reveal>
                <FrontendProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Project Approach Section */}
      <Section className="bg-dark-950/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-3 text-white mb-4">Project Approach</h2>
          <p className="text-dark-400 mb-8">
            Each project follows a structured approach focusing on performance, accessibility, and
            maintainable code. I believe in building solutions that scale well and provide excellent
            user experiences.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-500/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Performance First</h3>
              <p className="text-dark-400 text-sm">
                Optimized for Core Web Vitals with efficient rendering and minimal bundle sizes.
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Accessible</h3>
              <p className="text-dark-400 text-sm">
                WCAG compliant with proper semantics, keyboard navigation, and screen reader support.
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Maintainable</h3>
              <p className="text-dark-400 text-sm">
                Clean architecture with TypeScript, proper testing, and comprehensive documentation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECONDARY SECTION: Game Development */}
      <Section>
        <div ref={gameDevRef}>
          <div data-gsap-reveal className="mb-6">
            <h3 className="text-dark-400 text-sm uppercase tracking-wider mb-2">
              Additional Experience
            </h3>
            <h2 className="heading-3 text-white mb-2">Game Development & XR</h2>
            <p className="text-dark-400 max-w-xl text-sm">
              Cross-platform development experience with Unity and VR technologies.
            </p>
          </div>

          <div className="max-w-2xl space-y-4">
            {gameDevProjects.map((project) => (
              <div key={project.id} data-gsap-reveal>
                <CompactProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-dark-950/50">
        <div className="text-center">
          <h2 className="heading-3 text-white mb-4">Want to See More?</h2>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">
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
    </>
  );
}
