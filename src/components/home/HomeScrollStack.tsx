import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from '../ui';
import { ShowreelPlayer } from '../media';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { getFeaturedProjects } from '../../content/projects';
import { getLatestGalleryItems } from '../../content/gallery';
import { type FrontendProject } from '../../content/frontend-projects';
import { profile } from '../../content/profile';
import { isTechArt, isFrontend, TOOLS } from '../../config';

gsap.registerPlugin(ScrollTrigger);

interface HomeScrollStackProps {
  featuredProjects: ReturnType<typeof getFeaturedProjects> | null;
  frontendProjects?: FrontendProject[] | null;
  latestGallery: ReturnType<typeof getLatestGalleryItems>;
}

export function HomeScrollStack({ featuredProjects, frontendProjects, latestGallery }: HomeScrollStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Build panels array based on profile
  const panels: { id: string; content: ReactNode }[] = [];

  // Showreel - Tech Art only
  if (isTechArt && profile.showShowreel) {
    panels.push({ id: 'showreel', content: <ShowreelPanel /> });
  }

  // Featured Projects - use frontend or tech art projects based on profile
  if (isFrontend && frontendProjects) {
    panels.push({ id: 'projects', content: <FrontendProjectsPanel projects={frontendProjects} /> });
  } else if (featuredProjects) {
    panels.push({ id: 'projects', content: <ProjectsPanel projects={featuredProjects} /> });
  }

  // Skills
  panels.push({ id: 'skills', content: <SkillsPanel /> });

  // About
  panels.push({ id: 'about', content: <AboutPanel /> });

  // Gallery - Tech Art only
  if (isTechArt && profile.showGallery) {
    panels.push({ id: 'gallery', content: <GalleryPanel items={latestGallery} /> });
  }

  // Contact CTA
  panels.push({ id: 'contact', content: <ContactPanel /> });

  const totalPanels = panels.length;

  useGsapContext(
    () => {
      if (!stackRef.current || prefersReducedMotion || totalPanels === 0) return;

      const stack = stackRef.current;
      const panelEls = stack.querySelectorAll<HTMLElement>('[data-panel]');

      // Set initial state - first panel visible, rest below (ready to slide up and cover)
      panelEls.forEach((panel, i) => {
        gsap.set(panel, {
          yPercent: i === 0 ? 0 : 100,
          pointerEvents: i === 0 ? 'auto' : 'none',
          zIndex: i + 1, // Higher index = higher z-index (covers previous)
        });
      });

      // Create master timeline pinned for (N * 100vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: 'top top',
          end: `+=${totalPanels * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate panels in sequence - next panel slides up to cover current
      panelEls.forEach((panel, i) => {
        if (i === totalPanels - 1) return; // Last panel doesn't animate out

        const nextPanel = panelEls[i + 1];
        const progress = i / (totalPanels - 1);

        // Current panel: disable pointer events when covered
        tl.to(panel, {
          pointerEvents: 'none',
          duration: 0.5,
        }, progress);

        // Next panel slides up from below to cover current (fully opaque)
        tl.to(nextPanel, {
          yPercent: 0,
          pointerEvents: 'auto',
          duration: 0.5,
        }, progress);
      });
    },
    stackRef,
    [prefersReducedMotion, totalPanels]
  );

  // For reduced motion, render all panels stacked normally
  if (prefersReducedMotion) {
    return (
      <div>
        {panels.map((panel) => (
          <div key={panel.id} className="min-h-screen">
            {panel.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={stackRef} className="relative h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {panels.map((panel, index) => (
        <div
          key={panel.id}
          data-panel
          className="absolute inset-0 h-screen overflow-hidden will-change-transform"
          style={{
            backgroundColor: 'var(--bg)',
            zIndex: index + 1, // Higher index = higher z-index (covers previous)
          }}
        >
          <div className="h-full w-full" style={{ backgroundColor: 'inherit' }}>
            {panel.content}
          </div>
        </div>
      ))}
    </div>
  );
}

// =====================
// Panel Components
// =====================

function ShowreelPanel() {
  return (
    <div className="h-full flex items-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container-main section-padding w-full">
        <div className="text-center mb-8">
          <h2 className="heading-2 mb-4" style={{ color: 'var(--text)' }}>
            Showreel
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            A curated collection of my best VFX work, featuring magic systems, shader effects, and real-time particle systems.
          </p>
        </div>
        <ShowreelPlayer
          src="/placeholders/showreel.mp4"
          poster="/placeholders/showreel-poster.jpg"
          title="2024 Showreel"
        />
      </div>
    </div>
  );
}

function ProjectsPanel({ projects }: { projects: ReturnType<typeof getFeaturedProjects> }) {
  return (
    <div className="h-full flex items-center" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container-main section-padding w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>
              Featured Projects
            </h2>
            <p style={{ color: 'var(--muted)' }}>
              Case studies showcasing my approach to VFX and shader development.
            </p>
          </div>
          <Link to="/work" className="btn-ghost">
            View all projects
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FrontendProjectsPanel({ projects }: { projects: FrontendProject[] }) {
  return (
    <div className="h-full flex items-center" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container-main section-padding w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>
              Featured Work
            </h2>
            <p style={{ color: 'var(--muted)' }}>
              Projects showcasing frontend architecture, UI systems, and performance.
            </p>
          </div>
          <Link to="/projects" className="btn-ghost">
            View all projects
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card-hover p-6 flex flex-col"
            >
              {project.image && (
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <span className="text-xs font-medium mb-2" style={{ color: 'var(--accent)' }}>
                {project.company}
              </span>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {project.title}
              </h3>
              <p className="text-sm mb-4 flex-1" style={{ color: 'var(--muted)' }}>
                {project.contribution}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="tag text-xs">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsPanel() {
  const capabilities = isTechArt
    ? [
        {
          title: 'Unreal Engine',
          description: 'Primary engine of choice. Expert-level Niagara, Materials, and Blueprint development.',
          items: TOOLS.vfx.slice(0, 3),
          color: 'var(--accent)',
        },
        {
          title: 'Unity',
          description: 'VFX Graph and Shader Graph expertise for mobile and cross-platform projects.',
          items: ['VFX Graph', 'Shader Graph', 'HDRP / URP'],
          color: 'var(--accent-2)',
        },
        {
          title: 'Blender',
          description: '3D modeling, procedural texturing, and geometry nodes for asset creation.',
          items: ['Geometry Nodes', 'Procedural Materials', 'Asset Pipelines'],
          color: '#f97316',
        },
      ]
    : [
        {
          title: 'Frontend Stack',
          description: 'Modern React development with TypeScript, state management, and build tools.',
          items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS'],
          color: 'var(--accent)',
        },
        {
          title: 'Performance & A11y',
          description: 'Building fast, accessible experiences that work for everyone.',
          items: ['WCAG 2.1 Compliance', 'Core Web Vitals', 'Code Splitting', 'Lazy Loading'],
          color: 'var(--accent-2)',
        },
        {
          title: 'Animation & Motion',
          description: 'Rich interactive experiences with modern animation libraries.',
          items: ['GSAP', 'Framer Motion', 'Lottie', 'Three.js / Spline'],
          color: '#f97316',
        },
      ];

  return (
    <div className="h-full flex items-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container-main section-padding w-full">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4" style={{ color: 'var(--text)' }}>
            {isTechArt ? 'Core Capabilities' : 'Technical Expertise'}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            {isTechArt
              ? 'Specialized in real-time VFX across multiple engines, with deep expertise in Unreal Engine.'
              : 'Modern frontend development with a focus on performance, accessibility, and developer experience.'}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div key={cap.title} className="glass-card p-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `color-mix(in srgb, ${cap.color} 20%, transparent)` }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: cap.color }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="heading-4 mb-2" style={{ color: 'var(--text)' }}>{cap.title}</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{cap.description}</p>
              <ul className="space-y-2">
                {cap.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cap.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {isFrontend && (
          <div className="mt-8 p-6 glass-card" style={{ borderLeft: '4px solid var(--accent)' }}>
            <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Also experienced in Game Development
            </h4>
            <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
              Unity VR development for Meta Quest, WebGL integration, and shader programming.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Unity', 'C#', 'Meta Quest SDK', 'VR Development', 'WebGL'].map((skill) => (
                <span key={skill} className="tag text-xs">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AboutPanel() {
  const cards = [
    {
      id: 'now',
      label: 'Currently',
      title: 'What I do now',
      content: isTechArt
        ? 'Creating stunning VFX and shaders for games. Currently focused on Unreal Engine 5 projects.'
        : 'Building accessible, performant web applications. Focused on React, TypeScript, and modern tooling.',
      icon: '🎯',
    },
    {
      id: 'tools',
      label: 'Toolkit',
      title: 'Favorite tools',
      content: isTechArt
        ? 'Unreal Engine, Niagara, Material Editor, Blender, Houdini'
        : 'React, TypeScript, Tailwind, GSAP, Vite, Figma',
      icon: '🛠️',
    },
    {
      id: 'interests',
      label: 'Interests',
      title: 'Beyond code',
      content: 'Animation, photography, game design, open source, learning new technologies',
      icon: '✨',
    },
    {
      id: 'bio',
      label: 'About',
      title: 'Who I am',
      content: profile.bio || 'A passionate developer who loves creating beautiful, functional experiences.',
      icon: '👋',
    },
  ];

  return (
    <div className="h-full flex items-center" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container-main section-padding w-full">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4" style={{ color: 'var(--text)' }}>
            A bit about me
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Quick glimpse into who I am and what drives me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="glass-card p-6 relative"
              style={{ transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
            >
              <span
                className="absolute -top-3 left-4 px-3 py-1 text-xs font-medium rounded-full"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
              >
                {card.label}
              </span>
              <div className="flex items-start gap-4 mt-2">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{card.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/about" className="btn-ghost inline-flex items-center gap-2">
            Learn more about me
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function GalleryPanel({ items }: { items: ReturnType<typeof getLatestGalleryItems> }) {
  return (
    <div className="h-full flex items-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container-main section-padding w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>Latest Work</h2>
            <p style={{ color: 'var(--muted)' }}>
              Browse through VFX breakdowns, shader experiments, and 3D assets.
            </p>
          </div>
          <Link to="/gallery" className="btn-ghost">
            View Gallery
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="group aspect-square rounded-xl overflow-hidden"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="h-full flex items-center" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container-main section-padding w-full">
        <div
          className="relative glass-card p-8 md:p-12 text-center overflow-hidden max-w-3xl mx-auto"
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent, color-mix(in srgb, var(--accent-2) 10%, transparent))',
            }}
          />
          <div className="relative">
            <h2 className="heading-2 mb-4" style={{ color: 'var(--text)' }}>
              {isTechArt ? (
                <>Let's Create Something <span className="text-gradient">Magical</span></>
              ) : (
                <>Let's Build Something <span className="text-gradient">Amazing</span></>
              )}
            </h2>
            <p className="max-w-xl mx-auto mb-8" style={{ color: 'var(--muted)' }}>
              {isTechArt
                ? "Looking for a Tech Artist to bring your VFX vision to life? I'm always excited to work on new projects."
                : "Looking for a Frontend Engineer to build your next product? Let's discuss how I can help."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">Get in Touch</Link>
              {isFrontend && (
                <Link to="/experience" className="btn-secondary">View Experience</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
