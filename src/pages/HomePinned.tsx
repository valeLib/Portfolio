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

  // Modern parallax with smooth transitions (no snap - let Lenis handle smoothness)
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    let cleanupSnap: (() => void) | null = null;
    const ctx = gsap.context(() => {
      const snapSections = gsap.utils.toArray<HTMLElement>('[data-section-snap]');
      const sections = gsap.utils.toArray<HTMLElement>('[data-section-entrance]');

      // ===================================================
      // FULL-PAGE SNAP (GSAP) - Apple/Tesla style
      // ===================================================
      const snapTriggers = snapSections.map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=1',
          invalidateOnRefresh: true,
          scroller: document.body,
        })
      );

      let snapPoints: number[] = [];
      const updateSnapPoints = () => {
        const maxScroll = ScrollTrigger.maxScroll(document.body) || 1;
        snapPoints = snapTriggers.map((trigger) => trigger.start / maxScroll);
      };

      updateSnapPoints();
      ScrollTrigger.addEventListener('refresh', updateSnapPoints);

      const snapTrigger = ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(document.body),
        scroller: document.body,
        snap: {
          snapTo: (value) => (snapPoints.length ? gsap.utils.snap(snapPoints, value) : value),
          duration: { min: 0.5, max: 1.5 },
          ease: 'power2.inOut',
        },
      });
      
      sections.forEach((section, index) => {
        // Initial state
        gsap.set(section, {
          opacity: 0,
          y: 100,
        });

        // Smooth entrance
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 3.5, // Much slower
          },
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        });

        // Scale entrance for depth
        gsap.fromTo(section,
          { scale: 0.96 },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 40%',
              scrub: 3,
            },
            scale: 1,
            ease: 'power2.out',
          }
        );

        // Content parallax
        const sectionContent = section.querySelector('[data-section-content]');
        if (sectionContent) {
          gsap.to(sectionContent, {
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 4,
            },
            y: -60,
            ease: 'none',
          });

          // Card micro-parallax
          const cards = sectionContent.querySelectorAll('.glass-card, .glass-card-hover');
          cards.forEach((card: any, cardIndex: number) => {
            const speed = 3.5 + (cardIndex % 3) * 0.5;
            const distance = 25 + (cardIndex % 3) * 15;
            
            gsap.to(card, {
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: speed,
              },
              y: -distance,
              ease: 'none',
            });
          });
        }
      });

      // Hero crossfade
      const hero = document.querySelector('#hero');
      const firstSection = sections[0];
      
      if (hero && firstSection) {
        gsap.to(hero, {
          scrollTrigger: {
            trigger: firstSection as gsap.DOMTarget,
            start: 'top 100%',
            end: 'top 80%',
            scrub: 1,
          },
          opacity: 0,
          y: -100,
          ease: 'power2.inOut',
        });
      }

      // Navbar is fixed and always visible - no scroll animations
      const navbar = document.querySelector('nav');
      if (navbar) {
        gsap.set(navbar, { clearProps: 'all' });
      }

      cleanupSnap = () => {
        ScrollTrigger.removeEventListener('refresh', updateSnapPoints);
        snapTrigger.kill();
        snapTriggers.forEach((trigger) => trigger.kill());
      };
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      cleanupSnap?.();
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <ScrollIndex chapters={chapters} />

      {/* Hero - Full viewport */}
      <HeroSection />

      {isUnified ? (
        <>
          {/* ================================================
               UNIFIED BUILD: Software-First Layout
               ================================================ */}

          <PinnedSection
            id="experience"
            pinDuration={window.innerHeight * 0.98}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(0).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(0).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={10}
          >
            <div data-section-content>
              <ExperienceSection />
            </div>
          </PinnedSection>

          <PinnedSection
            id="projects"
            pinDuration={window.innerHeight * 0.8}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(1).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(1).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={20}
          >
            <div data-section-content>
              <ProjectsSection />
            </div>
          </PinnedSection>

          <PinnedSection
            id="skills"
            pinDuration={window.innerHeight * 0.8}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(2).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(2).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={40}
          >
            <div data-section-content>
              <SkillsSection />
            </div>
          </PinnedSection>

          <PinnedSection
            id="about"
            pinDuration={window.innerHeight * 0.8}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(3).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(3).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={50}
          >
            <div data-section-content>
              <AboutSection />
            </div>
          </PinnedSection>

          {/* Contact - Final section */}
          <Section 
            id="contact" 
            className="min-h-screen flex items-center full-viewport-section"
            style={{ zIndex: 60, ...getSectionTheme(4).style, minHeight: '100dvh' }}
            {...getSectionTheme(4).dataAttribute}
            data-section-entrance=""
            data-section-snap=""
          >
            <div data-section-content className="w-full">
              <ContactSection />
            </div>
          </Section>
        </>
      ) : (
        <>
          {/* ================================================
               GAMEDEV BUILD: Tech Art-First Layout
               ================================================ */}

          <PinnedSection
            id="gallery"
            pinDuration={window.innerHeight * 0.8}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(0).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(0).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={10}
          >
            <div data-section-content>
              <TechArtPreview featured />
            </div>
          </PinnedSection>

          <PinnedSection
            id="projects"
            pinDuration={window.innerHeight * 0.8}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(1).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(1).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={20}
          >
            <div data-section-content>
              <ProjectsSection />
            </div>
          </PinnedSection>

          <PinnedSection
            id="experience"
            pinDuration={window.innerHeight * 0.8}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(2).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(2).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={30}
          >
            <div data-section-content>
              <ExperienceSection />
            </div>
          </PinnedSection>

          <PinnedSection
            id="skills"
            pinDuration={window.innerHeight * 0.8}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(3).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(3).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={40}
          >
            <div data-section-content>
              <SkillsSection />
            </div>
          </PinnedSection>

          <PinnedSection
            id="about"
            pinDuration={window.innerHeight * 0.8}
            pinSpacing={false}
            disablePin
            sectionClassName="full-viewport-section"
            bgStyle={{ ...getSectionTheme(4).style, minHeight: '100dvh' }}
            dataAttributes={{ ...getSectionTheme(4).dataAttribute, 'data-section-entrance': '', 'data-section-snap': '' }}
            index={50}
          >
            <div data-section-content>
              <AboutSection />
            </div>
          </PinnedSection>

          {/* Contact - Final section */}
          <Section 
            id="contact" 
            className="min-h-screen flex items-center full-viewport-section"
            style={{ zIndex: 60, ...getSectionTheme(5).style, minHeight: '100dvh' }}
            {...getSectionTheme(5).dataAttribute}
            data-section-entrance=""
            data-section-snap=""
          >
            <div data-section-content className="w-full">
              <ContactSection />
            </div>
          </Section>
        </>
      )}
    </>
  );
}
