import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/layout';
import { ProjectCard } from '../components/ui';
import { ShowreelPlayer } from '../components/media';
import { HeroSection, SkillsSection, AboutSection, ContactSection } from '../components/home';
import { useDocumentTitle, useGsapContext, usePrefersReducedMotion } from '../hooks';
import { getFeaturedProjects } from '../content/projects';
import { getLatestGalleryItems } from '../content/gallery';
import { profile } from '../content/profile';
import { isTechArt } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  useDocumentTitle();

  const featuredProjects = getFeaturedProjects();
  const latestGallery = getLatestGalleryItems(6);

  return (
    <>
      {/* Hero Section with pinned scroll animation */}
      <HeroSection />

      {/* Showreel Section - Tech Art only */}
      {isTechArt && profile.showShowreel && <ShowreelSection />}

      {/* Featured Projects */}
      <FeaturedProjectsSection projects={featuredProjects} />

      {/* Skills/Capabilities */}
      <SkillsSection />

      {/* About Section - scrapbook style */}
      <AboutSection />

      {/* Gallery Preview - Tech Art profile only */}
      {isTechArt && profile.showGallery && <GalleryPreviewSection items={latestGallery} />}

      {/* Contact CTA */}
      <ContactSection />
    </>
  );
}

function ShowreelSection() {
  return (
    <Section>
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
    </Section>
  );
}

interface FeaturedProjectsSectionProps {
  projects: ReturnType<typeof getFeaturedProjects>;
}

function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const header = containerRef.current.querySelector('[data-projects-header]');
      const cards = containerRef.current.querySelectorAll('[data-project-card]');

      // Header reveal
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          immediateRender: false,
          scrollTrigger: { trigger: header, start: 'top 85%', once: true }
        }
      );
      

      // Batch reveal cards
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  ScrollTrigger.refresh();

  return (
    <Section style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)' }}>
      <div ref={containerRef}>
        <div
          data-projects-header
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>
              {isTechArt ? 'Featured Projects' : 'Featured Work'}
            </h2>
            <p style={{ color: 'var(--muted)' }}>
              {isTechArt
                ? 'Case studies showcasing my approach to VFX and shader development.'
                : 'Projects showcasing frontend architecture, UI systems, and performance.'}
            </p>
          </div>
          <Link to={isTechArt ? '/work' : '/projects'} className="btn-ghost">
            View all projects
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.slug} data-project-card>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

interface GalleryPreviewSectionProps {
  items: ReturnType<typeof getLatestGalleryItems>;
}

function GalleryPreviewSection({ items }: GalleryPreviewSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const header = containerRef.current.querySelector('[data-gallery-header]');
      const images = containerRef.current.querySelectorAll('[data-gallery-item]');

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

      gsap.from(images, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.05,
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

  return (
    <Section style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)' }}>
      <div ref={containerRef}>
        <div
          data-gallery-header
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>
              Latest Work
            </h2>
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
              data-gallery-item
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
    </Section>
  );
}
