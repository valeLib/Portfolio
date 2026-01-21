import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWall } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { projects } from '../../content/projects';
import { isGameDev } from '../../config';

gsap.registerPlugin(ScrollTrigger);

interface TechArtPreviewProps {
  featured?: boolean; // If true, shows more items (for gamedev build)
}

export function TechArtPreview({ featured = false }: TechArtPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Header animation
  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const header = containerRef.current.querySelector('[data-tech-art-header]');
      gsap.set(header, { opacity: 0, y: 12 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  // Filter tech art projects
  const techArtProjects = projects.filter(
    (p) => p.engine === 'Unreal' || p.tags.some((t) => ['VFX', 'Shaders', '3D', 'Niagara', 'Materials'].includes(t))
  );

  // Show more items for gamedev build
  const displayCount = featured ? 6 : 3;
  const displayProjects = techArtProjects.slice(0, displayCount);

  // Transform to ImageWall format
  const galleryItems = displayProjects.map((project) => ({
    id: project.slug,
    src:
      project.heroMedia?.type === 'image'
        ? project.heroMedia.src
        : project.heroMedia?.poster || '/placeholders/project-placeholder.jpg',
    alt: project.title,
    title: project.title,
    subtitle: project.role,
  }));

  return (
    <div ref={containerRef}>
      {/* Section header */}
      <div data-tech-art-header className="flex items-end justify-between gap-4 mb-12">
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: 'var(--text)' }}
          >
            {isGameDev ? (
              <>
                Technical Art <span className="text-gradient">Gallery</span>
              </>
            ) : (
              <>
                Technical Art <span className="text-gradient">& VFX</span>
              </>
            )}
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            {featured
              ? 'Real-time particle systems, procedural shaders, and game-ready assets'
              : 'Selected technical art work from game development projects'}
          </p>
          {!isGameDev && (
            <p className="text-sm mt-2" style={{ color: 'var(--muted)', opacity: 0.8 }}>
              Secondary focus area. Primary work is in{' '}
              <Link to="/projects" className="underline hover:no-underline" style={{ color: 'var(--accent)' }}>
                Projects
              </Link>
              .
            </p>
          )}
        </div>
        <Link
          to="/tech-art"
          className="text-sm font-medium hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          {featured ? 'View all' : 'View gallery'}
        </Link>
      </div>

      {/* Gallery Grid */}
      {galleryItems.length > 0 ? (
        <ImageWall
          items={galleryItems}
          columns={3}
          onItemClick={(item) => {
            window.location.href = `#/work/${item.id}`;
          }}
        />
      ) : (
        <div className="glass-card p-12 text-center">
          <p className="text-lg mb-4" style={{ color: 'var(--text)' }}>
            Technical Art Gallery
          </p>
          <p className="text-base" style={{ color: 'var(--muted)' }}>
            VFX, shaders, and 3D work from Unity and Unreal Engine projects.
          </p>
          <Link
            to="/tech-art"
            className="btn-secondary mt-6 inline-flex"
          >
            View Gallery
          </Link>
        </div>
      )}
    </div>
  );
}
