import { Section } from '../components/layout';
import { ProjectCard } from '../components/ui';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import { projects } from '../content/projects';

export function Work() {
  useDocumentTitle('Work');
  const headerRef = useGsapReveal<HTMLDivElement>();
  const gridRef = useGsapReveal<HTMLDivElement>({ stagger: 0.15 });

  return (
    <>
      {/* Header */}
      <Section className="page-safe-top pb-8">
        <div ref={headerRef}>
          <div data-gsap-reveal className="max-w-3xl">
            <h1 className="heading-1 mb-4" style={{ color: 'var(--text)' }}>
              Featured <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-dark-400">
              A collection of case studies showcasing my approach to VFX development,
              shader creation, and real-time optimization in game engines.
            </p>
          </div>
        </div>
      </Section>

      {/* Projects Grid */}
      <Section className="pt-0">
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <div key={project.slug} data-gsap-reveal>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-dark-950/50">
        <div className="text-center">
          <h2 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>Interested in working together?</h2>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">
            I'm always looking for new challenges and opportunities to create amazing VFX.
          </p>
          <a href="/#/contact" className="btn-primary">
            Get in Touch
          </a>
        </div>
      </Section>
    </>
  );
}
