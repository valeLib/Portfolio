import {
  HeroSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  AboutSection,
  ContactSection,
  TechArtPreview,
} from '../components/home';
import { useDocumentTitle } from '../hooks';
import { ScrollIndex } from '../components/ui';
import { RhythmSection } from '../components/layout';
import { isUnified } from '../config';

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

export function Home() {
  useDocumentTitle();

  return (
    <>
      {/* Scroll Index - Chapter navigation */}
      <ScrollIndex chapters={chapters} />

      {/* Hero - Typography anchor */}
      <HeroSection />

      {isUnified ? (
        <>
          {/* ================================================
               UNIFIED BUILD: Software-First Layout
               ================================================ */}

          {/* Experience - Primary focus */}
          <RhythmSection rhythm="content" id="experience">
            <ExperienceSection />
          </RhythmSection>

          {/* Projects - Primary focus */}
          <RhythmSection rhythm="image" id="projects">
            <ProjectsSection />
          </RhythmSection>

          {/* Tech Art Preview - Secondary section */}
          <RhythmSection rhythm="content" id="tech-art">
            <TechArtPreview />
          </RhythmSection>

          {/* Skills */}
          <RhythmSection rhythm="content" id="skills">
            <SkillsSection />
          </RhythmSection>

          {/* About */}
          <RhythmSection rhythm="content" id="about">
            <AboutSection />
          </RhythmSection>

          {/* Contact - CTA */}
          <RhythmSection rhythm="cta" id="contact">
            <ContactSection />
          </RhythmSection>
        </>
      ) : (
        <>
          {/* ================================================
               GAMEDEV BUILD: Tech Art-First Layout
               ================================================ */}

          {/* Tech Art Gallery - Primary focus */}
          <RhythmSection rhythm="image" id="gallery">
            <TechArtPreview featured />
          </RhythmSection>

          {/* Projects */}
          <RhythmSection rhythm="content" id="projects">
            <ProjectsSection />
          </RhythmSection>

          {/* Experience */}
          <RhythmSection rhythm="content" id="experience">
            <ExperienceSection />
          </RhythmSection>

          {/* Skills */}
          <RhythmSection rhythm="content" id="skills">
            <SkillsSection />
          </RhythmSection>

          {/* About */}
          <RhythmSection rhythm="content" id="about">
            <AboutSection />
          </RhythmSection>

          {/* Contact - CTA */}
          <RhythmSection rhythm="cta" id="contact">
            <ContactSection />
          </RhythmSection>
        </>
      )}
    </>
  );
}
