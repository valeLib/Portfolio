import { Link } from 'react-router-dom';
import { Section } from '../components/layout';
import { ProjectCard, CvDownloadButton } from '../components/ui';
import { ShowreelPlayer, SplineHero, LottieDecor } from '../components/media';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import { getFeaturedProjects } from '../content/projects';
import { getLatestGalleryItems } from '../content/gallery';
import { profile } from '../content/profile';
import { isTechArt, isFrontend, TOOLS } from '../config';
import catAnimation from '../assets/lottie/cat-decoration.json';
import sparklesAnimation from '../assets/lottie/magic-sparkles.json';

export function Home() {
  useDocumentTitle();
  const heroRef = useGsapReveal<HTMLDivElement>({ y: 40, stagger: 0.15 });
  const projectsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const capabilitiesRef = useGsapReveal<HTMLDivElement>({ stagger: 0.15 });
  const galleryRef = useGsapReveal<HTMLDivElement>();

  const featuredProjects = getFeaturedProjects();
  const latestGallery = getLatestGalleryItems(6);

  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-8 md:pt-16" noPadding>
        <div className="container-main section-padding">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-500/10 rounded-full blur-3xl" />
          </div>

          <div ref={heroRef} className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div data-gsap-reveal className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-sm font-medium">
                  <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                  {profile.availability}
                </span>
              </div>

              <h1 data-gsap-reveal className="heading-1 text-white mb-4">
                {isTechArt ? (
                  <>
                    Tech Artist,{' '}
                    <span className="text-gradient">Magic VFX</span>,{' '}
                    Shaders, Tools
                  </>
                ) : (
                  <>
                    <span className="text-gradient">Frontend Engineer</span>
                    <br />
                    Building Modern Web Experiences
                  </>
                )}
              </h1>

              <p data-gsap-reveal className="text-xl text-dark-300 mb-8 max-w-xl">
                {isTechArt
                  ? 'Unreal-first. Shipping-focused. Clean breakdowns. Creating immersive visual experiences that bring games to life.'
                  : 'React, TypeScript, and modern tooling. Accessible, performant, and beautiful user interfaces that delight users.'}
              </p>

              <div data-gsap-reveal className="flex flex-wrap gap-4">
                {isTechArt ? (
                  <>
                    <Link to="/work" className="btn-primary">
                      View Projects
                    </Link>
                    <Link to="/gallery" className="btn-secondary">
                      Browse Gallery
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/experience" className="btn-primary">
                      View Experience
                    </Link>
                    <Link to="/projects" className="btn-secondary">
                      Browse Projects
                    </Link>
                    <CvDownloadButton variant="ghost" />
                  </>
                )}
              </div>

              {/* Lottie Decoration */}
              <LottieDecor
                src={JSON.stringify(catAnimation)}
                className="absolute -bottom-8 left-0 w-24 h-24 opacity-30"
              />
            </div>

            {/* Spline 3D Scene - shown for both profiles */}
            <div data-gsap-reveal className="order-1 lg:order-2 relative">
              <div className="aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden">
                <SplineHero />
              </div>
              {/* Sparkles decoration */}
              <LottieDecor
                src={JSON.stringify(sparklesAnimation)}
                className="absolute -top-4 -right-4 w-32 h-32 opacity-50"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Showreel Section - Tech Art only */}
      {isTechArt && profile.showShowreel && (
        <Section>
          <div className="text-center mb-8">
            <h2 className="heading-2 text-white mb-4">Showreel</h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              A curated collection of my best VFX work, featuring magic systems, shader effects, and real-time particle systems.
            </p>
          </div>
          <ShowreelPlayer
            src="/placeholders/showreel.mp4"
            poster="/placeholders/showreel-poster.jpg"
            title="2024 Showreel"
          />
        </Section>
      )}

      {/* Featured Projects */}
      <Section className="bg-dark-950/50">
        <div ref={projectsRef}>
          <div data-gsap-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="heading-2 text-white mb-2">
                {isTechArt ? 'Featured Projects' : 'Featured Work'}
              </h2>
              <p className="text-dark-400">
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
            {featuredProjects.map((project) => (
              <div key={project.slug} data-gsap-reveal>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Capabilities - Profile specific */}
      <Section>
        <div ref={capabilitiesRef}>
          <div data-gsap-reveal className="text-center mb-12">
            <h2 className="heading-2 text-white mb-4">
              {isTechArt ? 'Core Capabilities' : 'Technical Expertise'}
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              {isTechArt
                ? 'Specialized in real-time VFX across multiple engines, with deep expertise in Unreal Engine.'
                : 'Modern frontend development with a focus on performance, accessibility, and developer experience.'}
            </p>
          </div>

          {isTechArt ? (
            // Tech Art Capabilities
            <div className="grid md:grid-cols-3 gap-6">
              {/* Unreal Engine */}
              <div data-gsap-reveal className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-3.5l6-4.5-6-4.5v9z" />
                  </svg>
                </div>
                <h3 className="heading-4 text-white mb-2">Unreal Engine</h3>
                <p className="text-dark-400 text-sm mb-4">
                  Primary engine of choice. Expert-level Niagara, Materials, and Blueprint development.
                </p>
                <ul className="space-y-2">
                  {TOOLS.vfx.slice(0, 3).map((tool) => (
                    <li key={tool} className="flex items-center gap-2 text-sm text-dark-300">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unity */}
              <div data-gsap-reveal className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v6.36l-7-3.5V8.82zm16 6.36l-7 3.5v-6.36l7-3.5v6.36z" />
                  </svg>
                </div>
                <h3 className="heading-4 text-white mb-2">Unity</h3>
                <p className="text-dark-400 text-sm mb-4">
                  VFX Graph and Shader Graph expertise for mobile and cross-platform projects.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-dark-300">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    VFX Graph
                  </li>
                  <li className="flex items-center gap-2 text-sm text-dark-300">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    Shader Graph
                  </li>
                  <li className="flex items-center gap-2 text-sm text-dark-300">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    HDRP / URP
                  </li>
                </ul>
              </div>

              {/* Blender */}
              <div data-gsap-reveal className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 012.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.282 1.63-.885 2.202a3.424 3.424 0 01-2.354.938 3.424 3.424 0 01-2.355-.938c-.602-.572-.93-1.38-.885-2.201h-.002zm-4.14 0c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 012.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.282 1.63-.885 2.202a3.424 3.424 0 01-2.354.938 3.424 3.424 0 01-2.355-.938c-.602-.572-.93-1.38-.885-2.201h-.002zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </div>
                <h3 className="heading-4 text-white mb-2">Blender</h3>
                <p className="text-dark-400 text-sm mb-4">
                  3D modeling, procedural texturing, and geometry nodes for asset creation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-dark-300">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    Geometry Nodes
                  </li>
                  <li className="flex items-center gap-2 text-sm text-dark-300">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    Procedural Materials
                  </li>
                  <li className="flex items-center gap-2 text-sm text-dark-300">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    Asset Pipelines
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // Frontend Capabilities
            <div className="grid md:grid-cols-3 gap-6">
              {/* Frontend */}
              <div data-gsap-reveal className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="heading-4 text-white mb-2">Frontend Stack</h3>
                <p className="text-dark-400 text-sm mb-4">
                  Modern React development with TypeScript, state management, and build tools.
                </p>
                <ul className="space-y-2">
                  {['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS'].map((tool) => (
                    <li key={tool} className="flex items-center gap-2 text-sm text-dark-300">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accessibility & Performance */}
              <div data-gsap-reveal className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="heading-4 text-white mb-2">Performance & A11y</h3>
                <p className="text-dark-400 text-sm mb-4">
                  Building fast, accessible experiences that work for everyone.
                </p>
                <ul className="space-y-2">
                  {['WCAG 2.1 Compliance', 'Core Web Vitals', 'Code Splitting', 'Lazy Loading'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-dark-300">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Animation & Motion */}
              <div data-gsap-reveal className="glass-card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="heading-4 text-white mb-2">Animation & Motion</h3>
                <p className="text-dark-400 text-sm mb-4">
                  Rich interactive experiences with modern animation libraries.
                </p>
                <ul className="space-y-2">
                  {['GSAP', 'Framer Motion', 'Lottie', 'Three.js / Spline'].map((tool) => (
                    <li key={tool} className="flex items-center gap-2 text-sm text-dark-300">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Frontend: Small tech art mention */}
          {isFrontend && (
            <div data-gsap-reveal className="mt-8 p-6 glass-card border-l-4 border-accent-500/50">
              <h4 className="text-lg font-semibold text-white mb-2">Also experienced in Game Development</h4>
              <p className="text-dark-400 text-sm mb-3">
                Unity VR development for Meta Quest, WebGL integration, and shader programming.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Unity', 'C#', 'Meta Quest SDK', 'VR Development', 'WebGL'].map((skill) => (
                  <span key={skill} className="tag text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Gallery Preview - Tech Art profile only */}
      {isTechArt && profile.showGallery && (
        <Section className="bg-dark-950/50">
          <div ref={galleryRef}>
            <div data-gsap-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <h2 className="heading-2 text-white mb-2">Latest Work</h2>
                <p className="text-dark-400">
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
              {latestGallery.map((item) => (
                <Link
                  key={item.id}
                  to="/gallery"
                  className="group aspect-square rounded-xl overflow-hidden bg-dark-800"
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
      )}

      {/* Contact CTA */}
      <Section>
        <div className="relative glass-card p-8 md:p-12 text-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-transparent to-primary-500/10" />

          <div className="relative">
            <h2 className="heading-2 text-white mb-4">
              {isTechArt ? (
                <>
                  Let's Create Something <span className="text-gradient">Magical</span>
                </>
              ) : (
                <>
                  Let's Build Something <span className="text-gradient">Amazing</span>
                </>
              )}
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto mb-8">
              {isTechArt
                ? "Looking for a Tech Artist to bring your VFX vision to life? I'm always excited to work on new projects."
                : "Looking for a Frontend Engineer to build your next product? Let's discuss how I can help."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
              {isFrontend && <CvDownloadButton variant="secondary" />}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
