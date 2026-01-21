import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RhythmSection } from '../components/layout';
import { FilterChips, ImageWall } from '../components/ui';
import { useDocumentTitle, useGsapContext, usePrefersReducedMotion } from '../hooks';
import { projects } from '../content/projects';
import { isGameDev } from '../config';

gsap.registerPlugin(ScrollTrigger);

// Filter tech art projects (VFX, shaders, 3D from Unreal projects)
const techArtProjects = projects.filter(
  (p) => p.engine === 'Unreal' || p.tags.some((t) => ['VFX', 'Shaders', '3D'].includes(t))
);

const categories = ['All', 'VFX', '3D Models', 'Shaders & Tools'];

export function TechArt() {
  useDocumentTitle('Technical Art & VFX');
  
  const [activeFilter, setActiveFilter] = useState('All');
  const headerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Header animation
  useGsapContext(
    () => {
      if (!headerRef.current || prefersReducedMotion) return;

      const elements = headerRef.current.querySelectorAll('[data-reveal]');
      gsap.set(elements, { opacity: 0, y: 12 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.2,
      });
    },
    headerRef,
    [prefersReducedMotion]
  );

  // Filter projects
  const filteredProjects = activeFilter === 'All'
    ? techArtProjects
    : techArtProjects.filter((p) =>
        p.tags.some((tag) => {
          if (activeFilter === 'VFX') return tag === 'VFX' || tag === 'Niagara';
          if (activeFilter === '3D Models') return tag === '3D' || tag === '3D Models';
          if (activeFilter === 'Shaders & Tools') return tag === 'Shaders' || tag === 'Materials';
          return false;
        })
      );

  // Transform to ImageWall format
  const galleryItems = filteredProjects.map((project) => ({
    id: project.slug,
    src: project.heroMedia?.type === 'image' ? project.heroMedia.src : project.heroMedia?.poster || '/placeholders/project-placeholder.jpg',
    alt: project.title,
    title: project.title,
    subtitle: project.role,
  }));

  return (
    <>
      {/* Hero Section */}
      <RhythmSection rhythm="hero" id="tech-art-hero">
        <div ref={headerRef} className="text-center max-w-4xl mx-auto">
          <h1
            data-reveal
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: 'var(--text)' }}
          >
            {isGameDev ? (
              <>
                Technical Art <span className="text-gradient">& VFX</span>
              </>
            ) : (
              <>
                Technical Art <span className="text-gradient">Gallery</span>
              </>
            )}
          </h1>

          <p
            data-reveal
            className="text-lg md:text-xl mb-4"
            style={{ color: 'var(--muted)' }}
          >
            {isGameDev
              ? 'Real-time particle systems, procedural shaders, and game-ready assets created with Unreal Engine, Unity, and Blender.'
              : 'A collection of technical art work including real-time VFX, shaders, and 3D assets from game development projects.'}
          </p>

          {!isGameDev && (
            <p
              data-reveal
              className="text-base"
              style={{ color: 'var(--muted)', opacity: 0.8 }}
            >
              This is a secondary focus area. For primary work, see{' '}
              <Link
                to="/projects"
                className="underline hover:no-underline"
                style={{ color: 'var(--accent)' }}
              >
                Projects
              </Link>
              .
            </p>
          )}
        </div>
      </RhythmSection>

      {/* Filter Section */}
      <RhythmSection rhythm="transition">
        <div className="flex justify-center">
          <FilterChips
            options={categories}
            selected={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </RhythmSection>

      {/* Gallery Grid */}
      <RhythmSection rhythm="image" id="tech-art-gallery">
        {filteredProjects.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                {activeFilter !== 'All' && ` in ${activeFilter}`}
              </p>
            </div>

            <ImageWall
              items={galleryItems}
              columns={3}
              onItemClick={(item) => {
                // Navigate to case study page (legacy route)
                window.location.href = `#/work/${item.id}`;
              }}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg" style={{ color: 'var(--muted)' }}>
              No projects found in this category.
            </p>
          </div>
        )}
      </RhythmSection>

      {/* Additional Context for Unified Build */}
      {!isGameDev && (
        <RhythmSection rhythm="content">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: 'var(--text)' }}
            >
              Technical Art Background
            </h2>
            <p
              className="text-base md:text-lg mb-6 leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              While my primary focus is frontend engineering, I have a strong background in
              technical art and game development. This experience with Unity, Unreal Engine, VFX
              systems, and real-time rendering informs my approach to frontend animation, 3D
              integration (Three.js, Spline), and performance optimization.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              These skills complement my frontend work, particularly when building interactive
              experiences, animated UI systems, or web-based 3D visualizations.
            </p>
          </div>
        </RhythmSection>
      )}
    </>
  );
}
