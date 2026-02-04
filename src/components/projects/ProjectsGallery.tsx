import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { projects as defaultProjects, type FrontendProject } from './projects.data';
import { FeaturedProject } from './FeaturedProject';
import { Filmstrip } from './Filmstrip';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsGalleryProps {
  projects?: FrontendProject[];
  title?: string;
  description?: string;
}

export function ProjectsGallery({
  projects = defaultProjects,
  title = 'Frontend & Software Engineering',
  description = 'Production applications built with React, Vue, TypeScript, and modern web technologies. Focus on performance, accessibility, and scalable architecture.',
}: ProjectsGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop pinned scroll interaction
  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion || isMobile) return;

      const totalProjects = projects.length;
      if (totalProjects <= 1) return;

      // Scroll distance: each project gets 100vh
      const scrollDistance = (totalProjects - 1) * 100;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollDistance}vh`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const newIndex = Math.round(self.progress * (totalProjects - 1));
          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
          }
        },
      });
    },
    containerRef,
    [prefersReducedMotion, projects, activeIndex, isMobile]
  );

  // Featured panel content reveal animation
  useEffect(() => {
    if (prefersReducedMotion || !featuredRef.current || isMobile) return;

    const content = featuredRef.current.querySelector('[data-featured-content]');
    if (!content) return;

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 20,
        clipPath: 'inset(0% 0% 100% 0%)',
      },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.5,
        ease: 'power2.out',
      }
    );
  }, [activeIndex, prefersReducedMotion, isMobile]);

  // Mobile card entrance animation
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      if (!mobileContainerRef.current || prefersReducedMotion || !isMobile) return;

      const cards = mobileContainerRef.current.querySelectorAll('[data-featured-content]');

      // Cinematic card entrance - each card is a beat in the story
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    mobileContainerRef,
    [prefersReducedMotion, isMobile]
  );

  // Mobile/Reduced motion: simple vertical list
  if (prefersReducedMotion || isMobile) {
    return (
      <Section className="py-16 md:py-24">
        <div ref={mobileContainerRef} className="container-main">
          <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>
            {title}
          </h2>
          <p className="max-w-2xl text-sm mb-12" style={{ color: 'var(--muted)' }}>
            {description}
          </p>
          <div className="grid gap-8">
            {projects.map((project) => (
              <FeaturedProject key={project.id} project={project} compact />
            ))}
          </div>
        </div>
      </Section>
    );
  }

  // Desktop: Pinned featured + filmstrip layout
  return (
    <Section className="min-h-screen overflow-hidden" noPadding fullWidth>
      <div ref={containerRef} className="h-screen flex flex-col">
        {/* Header */}
        <div className="container-main pt-20 pb-6 shrink-0">
          <div className="flex items-end justify-between gap-4">
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

        {/* Two-column layout: Featured + Filmstrip */}
        <div className="container-main flex-1 flex gap-8 pb-8 overflow-hidden">
          {/* Featured Project Panel */}
          <div
            ref={featuredRef}
            className="flex-1 lg:w-[65%] overflow-hidden"
            style={{ willChange: 'transform, opacity' }}
          >
            <FeaturedProject project={projects[activeIndex]} />
          </div>

          {/* Filmstrip */}
          <div className="w-[35%] lg:w-[30%] shrink-0 overflow-hidden">
            <Filmstrip
              ref={filmstripRef}
              projects={projects}
              activeIndex={activeIndex}
              onSelectProject={setActiveIndex}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
