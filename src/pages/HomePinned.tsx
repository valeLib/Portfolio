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
import { getSectionTheme } from '../utils/sectionTheme';

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
               Matcha & Cream Alternating Theme
               ================================================ */}

          <PinnedSection
            id="experience"
            pinDuration={window.innerHeight * 1.5}
            bgStyle={getSectionTheme(0).style}
            dataAttributes={getSectionTheme(0).dataAttribute}
            index={10}
          >
            <ExperienceSection />
          </PinnedSection>

          <PinnedSection
            id="projects"
            pinDuration={window.innerHeight * 2}
            bgStyle={getSectionTheme(1).style}
            dataAttributes={getSectionTheme(1).dataAttribute}
            index={20}
          >
            <ProjectsSection />
          </PinnedSection>

          {/* <PinnedSection
            id="tech-art"
            pinDuration={window.innerHeight * 1.2}
            bgStyle={getSectionTheme(2).style}
            dataAttributes={getSectionTheme(2).dataAttribute}
            index={30}
          >
            <TechArtPreview />
          </PinnedSection> */}

          <PinnedSection
            id="skills"
            pinDuration={window.innerHeight * 1.5}
            bgStyle={getSectionTheme(2).style}
            dataAttributes={getSectionTheme(2).dataAttribute}
            index={40}
          >
            <SkillsSection />
          </PinnedSection>

          <PinnedSection
            id="about"
            pinDuration={window.innerHeight * 1.2}
            className="pb-60 mb-60 md:pb-72"
            bgStyle={getSectionTheme(3).style}
            dataAttributes={getSectionTheme(3).dataAttribute}
            index={50}
          >
            <AboutSection />
          </PinnedSection>

          {/* Contact - Final section, not pinned - alternates to primary theme */}
          <Section 
            id="contact" 
            className="mt-96 pt-96 md:pt-20 md:mt-0 xl:pt-32"
            style={{ zIndex: 60, ...getSectionTheme(4).style }}
            {...getSectionTheme(4).dataAttribute}
          >
            <ContactSection />
          </Section>
        </>
      ) : (
        <>
          {/* ================================================
               GAMEDEV BUILD: Tech Art-First Pinned Layout
               Matcha & Cream Alternating Theme
               ================================================ */}

          <PinnedSection
            id="gallery"
            pinDuration={window.innerHeight * 2}
            bgStyle={getSectionTheme(0).style}
            dataAttributes={getSectionTheme(0).dataAttribute}
            index={10}
          >
            <TechArtPreview featured />
          </PinnedSection>

          <PinnedSection
            id="projects"
            pinDuration={window.innerHeight * 1.5}
            bgStyle={getSectionTheme(1).style}
            dataAttributes={getSectionTheme(1).dataAttribute}
            index={20}
          >
            <ProjectsSection />
          </PinnedSection>

          <PinnedSection
            id="experience"
            pinDuration={window.innerHeight * 1.5}
            bgStyle={getSectionTheme(2).style}
            dataAttributes={getSectionTheme(2).dataAttribute}
            index={30}
          >
            <ExperienceSection />
          </PinnedSection>

          <PinnedSection
            id="skills"
            pinDuration={window.innerHeight * 1.2}
            bgStyle={getSectionTheme(3).style}
            dataAttributes={getSectionTheme(3).dataAttribute}
            index={40}
          >
            <SkillsSection />
          </PinnedSection>

          <PinnedSection
            id="about"
            pinDuration={window.innerHeight}
            bgStyle={getSectionTheme(4).style}
            dataAttributes={getSectionTheme(4).dataAttribute}
            index={50}
          >
            <AboutSection />
          </PinnedSection>

          {/* Contact - Final section, not pinned - alternates to primary theme */}
          <Section 
            id="contact" 
            className="relative"
            style={{ zIndex: 60, ...getSectionTheme(5).style }}
            {...getSectionTheme(5).dataAttribute}
          >
            <ContactSection />
          </Section>
        </>
      )}
    </>
  );
}
