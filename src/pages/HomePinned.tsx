import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HeroSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  AboutSection,
  ContactSection,
  TechArtPreview,
} from '../components/home';
import { useDocumentTitle, usePrefersReducedMotion } from '../hooks';
import { ScrollIndex } from '../components/ui';
import { PinnedSection } from '../components/layout';
import { Section } from '../components/layout';
import { isUnified } from '../config';

gsap.registerPlugin(ScrollTrigger);

// Profile-aware chapter navigation
const unifiedChapters = [
  { id: 'hero', label: 'Intro', element: '#hero' },
  { id: 'experience', label: 'Experience', element: '#experience' },
  { id: 'projects', label: 'Projects', element: '#projects' },
  { id: 'tech-art', label: 'Tech Art', element: '#tech-art' },
  { id: 'skills', label: 'Skills', element: '#skills' },
  { id: 'about', label: 'About', element: '#about' },
  { id: 'contact', label: 'Contact', element: '#contact' },
];

const gamedevChapters = [
  { id: 'hero', label: 'Intro', element: '#hero' },
  { id: 'gallery', label: 'Gallery', element: '#gallery' },
  { id: 'projects', label: 'Projects', element: '#projects' },
  { id: 'experience', label: 'Experience', element: '#experience' },
  { id: 'skills', label: 'Skills', element: '#skills' },
  { id: 'about', label: 'About', element: '#about' },
  { id: 'contact', label: 'Contact', element: '#contact' },
];

const chapters = isUnified ? unifiedChapters : gamedevChapters;

export function HomePinned() {
  useDocumentTitle();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Setup and refresh ScrollTrigger
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    // Refresh after layout is complete
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <ScrollIndex chapters={chapters} />

      {/* Hero - Not pinned, standard entry */}
      <HeroSection />

      {isUnified ? (
        <>
          {/* ================================================
               UNIFIED BUILD: Software-First Pinned Layout
               ================================================ */}

          <PinnedSection
            id="experience"
            pinDuration={window.innerHeight * 1.5}
            bgClassName="bg-[var(--bg)]"
            index={10}
          >
            <ExperienceSection />
          </PinnedSection>

          <PinnedSection
            id="projects"
            pinDuration={window.innerHeight * 2}
            bgClassName="bg-[var(--bg)]"
            index={20}
          >
            <ProjectsSection />
          </PinnedSection>

          <PinnedSection
            id="tech-art"
            pinDuration={window.innerHeight * 1.2}
            bgClassName="bg-[var(--bg)]"
            index={30}
          >
            <TechArtPreview />
          </PinnedSection>

          <PinnedSection
            id="skills"
            pinDuration={window.innerHeight * 1.5}
            bgClassName="bg-[var(--bg)]"
            index={40}
          >
            <SkillsSection />
          </PinnedSection>

          <PinnedSection
            id="about"
            pinDuration={window.innerHeight * 1.2}
            bgClassName="bg-[var(--bg)]"
            index={50}
          >
            <AboutSection />
          </PinnedSection>

          {/* Contact - Final section, not pinned */}
          <Section id="contact" className="relative" style={{ zIndex: 60 }}>
            <ContactSection />
          </Section>
        </>
      ) : (
        <>
          {/* ================================================
               GAMEDEV BUILD: Tech Art-First Pinned Layout
               ================================================ */}

          <PinnedSection
            id="gallery"
            pinDuration={window.innerHeight * 2}
            bgClassName="bg-[var(--bg)]"
            index={10}
          >
            <TechArtPreview featured />
          </PinnedSection>

          <PinnedSection
            id="projects"
            pinDuration={window.innerHeight * 1.5}
            bgClassName="bg-[var(--bg)]"
            index={20}
          >
            <ProjectsSection />
          </PinnedSection>

          <PinnedSection
            id="experience"
            pinDuration={window.innerHeight * 1.5}
            bgClassName="bg-[var(--bg)]"
            index={30}
          >
            <ExperienceSection />
          </PinnedSection>

          <PinnedSection
            id="skills"
            pinDuration={window.innerHeight * 1.2}
            bgClassName="bg-[var(--bg)]"
            index={40}
          >
            <SkillsSection />
          </PinnedSection>

          <PinnedSection
            id="about"
            pinDuration={window.innerHeight}
            bgClassName="bg-[var(--bg)]"
            index={50}
          >
            <AboutSection />
          </PinnedSection>

          {/* Contact - Final section, not pinned */}
          <Section id="contact" className="relative" style={{ zIndex: 60 }}>
            <ContactSection />
          </Section>
        </>
      )}
    </>
  );
}
