import { HeroSection } from '../components/home';
import { useDocumentTitle } from '../hooks';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { AboutSection } from '../components/home/AboutSection';
import { ContactSection } from '../components/home/ContactSection';
import { ScrollIndex } from '../components/ui';
import { RhythmSection } from '../components/layout';

const chapters = [
  { id: 'hero', label: 'Intro', element: '#hero' },
  { id: 'experience', label: 'Experience', element: '#experience' },
  { id: 'projects', label: 'Work', element: '#projects' },
  { id: 'skills', label: 'Skills', element: '#skills' },
  { id: 'about', label: 'About', element: '#about' },
  { id: 'contact', label: 'Contact', element: '#contact' },
];

export function Home() {
  useDocumentTitle();

  return (
    <>
      {/* Scroll Index - Chapter navigation */}
      <ScrollIndex chapters={chapters} />

      {/* Hero - Typography anchor */}
      <HeroSection />

      {/* Experience - Vertical timeline */}
      <RhythmSection rhythm="content" id="experience">
        <ExperienceSection />
      </RhythmSection>

      {/* Projects - Image wall rhythm */}
      <RhythmSection rhythm="image" id="projects">
        <ProjectsSection />
      </RhythmSection>

      {/* Skills - Content rhythm */}
      <RhythmSection rhythm="content" id="skills">
        <SkillsSection />
      </RhythmSection>

      {/* About - Content rhythm */}
      <RhythmSection rhythm="content" id="about">
        <AboutSection />
      </RhythmSection>

      {/* Contact - CTA rhythm (special emphasis) */}
      <RhythmSection rhythm="cta" id="contact">
        <ContactSection />
      </RhythmSection>
    </>
  );
}
