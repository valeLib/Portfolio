import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/layout';
import { Tag } from '../components/ui';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import { profile } from '../content/profile';

export function About() {
  useDocumentTitle('About');
  const headerRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const skillsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <>
      {/* Header */}
      <Section className="pb-8">
        <div ref={headerRef} className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div data-gsap-reveal className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-sm font-medium">
                <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                {profile.availability}
              </span>
            </div>

            <h1 data-gsap-reveal className="heading-1 text-white mb-4">
              About <span className="text-gradient">Me</span>
            </h1>

            <p data-gsap-reveal className="text-xl text-dark-300 mb-6">
              {profile.tagline}
            </p>

            <p data-gsap-reveal className="text-dark-400 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Profile image placeholder */}
          <div data-gsap-reveal className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-accent-500/20 via-dark-800 to-primary-500/20 border border-dark-700 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-dark-700/50 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-dark-400 text-sm">Profile photo placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Extended Bio */}
      <Section className="pt-0">
        <div ref={contentRef} className="max-w-3xl">
          <p data-gsap-reveal className="text-dark-300 leading-relaxed whitespace-pre-line">
            {profile.bioExtended}
          </p>
        </div>
      </Section>

      {/* Focus Areas */}
      <Section className="bg-dark-950/50">
        <div data-gsap-reveal className="text-center mb-12">
          <h2 className="heading-2 text-white mb-4">Focus Areas</h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            My core specializations in real-time graphics and game development.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.focusAreas.map((area) => (
            <div key={area.title} data-gsap-reveal className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-500/20 flex items-center justify-center">
                <FocusIcon name={area.icon} />
              </div>
              <h3 className="text-white font-semibold mb-2">{area.title}</h3>
              <p className="text-dark-400 text-sm">{area.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <div ref={skillsRef}>
          <div data-gsap-reveal className="text-center mb-12">
            <h2 className="heading-2 text-white mb-4">Tools & Skills</h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Technologies and software I use to bring creative visions to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Engines */}
            <div data-gsap-reveal className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Game Engines</h3>
              <ul className="space-y-3">
                {profile.skills.engines.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-dark-300">{skill.name}</span>
                    <Tag size="sm" variant={skill.primary ? 'accent' : 'default'}>
                      {skill.level}
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>

            {/* VFX */}
            <div data-gsap-reveal className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">VFX Systems</h3>
              <ul className="space-y-3">
                {profile.skills.vfx.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-dark-300">{skill.name}</span>
                    <Tag size="sm">{skill.level}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shaders */}
            <div data-gsap-reveal className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Shaders</h3>
              <ul className="space-y-3">
                {profile.skills.shaders.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-dark-300">{skill.name}</span>
                    <Tag size="sm">{skill.level}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programming */}
            <div data-gsap-reveal className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Programming</h3>
              <ul className="space-y-3">
                {profile.skills.programming.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-dark-300">{skill.name}</span>
                    <Tag size="sm">{skill.level}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Frontend Credibility (minimal) */}
      <Section className="bg-dark-950/50">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-dark-400 text-sm uppercase tracking-wider mb-4">
            Also Experienced In
          </h3>
          <h2 className="heading-3 text-white mb-4">Frontend Development</h2>
          <p className="text-dark-400 mb-6">{profile.frontend.note}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {profile.frontend.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="heading-3 text-white mb-4">Let's Work Together</h2>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </Section>
    </>
  );
}

// Focus Icon Component
function FocusIcon({ name }: { name: string }) {
  const icons: Record<string, ReactElement> = {
    sparkles: (
      <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    palette: (
      <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    cpu: (
      <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    wrench: (
      <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };

  return icons[name] || icons.sparkles;
}
