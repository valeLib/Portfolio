import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/layout';
import { Tag, CvDownloadButton } from '../components/ui';
import { LottieDecor } from '../components/media';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import { profile } from '../content/profile';
import { isFrontend } from '../config';
import sparklesAnimation from '../assets/lottie/magic-sparkles.json';
import programmingAnimation from '../assets/lottie/Programming Computer.lottie?url';

// Skill categories for frontend profile
const frontendSkillCategories = [
  {
    title: 'Frontend Frameworks',
    icon: 'code',
    color: 'accent',
    skills: ['React', 'Vue', 'Next.js', 'Vite', 'TypeScript'],
  },
  {
    title: 'Styling & UI',
    icon: 'palette',
    color: 'primary',
    skills: ['Tailwind CSS', 'CSS-in-JS', 'Sass', 'Responsive Design', 'Design Systems'],
  },
  {
    title: 'State & Data',
    icon: 'data',
    color: 'green',
    skills: ['Redux', 'Pinia', 'React Query', 'GraphQL', 'REST APIs'],
  },
  {
    title: 'Animation',
    icon: 'motion',
    color: 'orange',
    skills: ['GSAP', 'Framer Motion', 'Lottie', 'Three.js', 'Spline'],
  },
  {
    title: 'Testing & Quality',
    icon: 'check',
    color: 'blue',
    skills: ['Jest', 'Vitest', 'Testing Library', 'Cypress', 'ESLint'],
  },
  {
    title: 'DevOps & Tools',
    icon: 'tools',
    color: 'purple',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'GCP'],
  },
];

// Skill categories for tech-art profile (fallback)
const techArtSkillCategories = [
  {
    title: 'Game Engines',
    icon: 'code',
    color: 'accent',
    skills: ['Unreal Engine 5', 'Unity', 'Blender'],
  },
  {
    title: 'VFX Systems',
    icon: 'sparkles',
    color: 'primary',
    skills: ['Niagara', 'VFX Graph', 'Cascade'],
  },
  {
    title: 'Shaders',
    icon: 'palette',
    color: 'orange',
    skills: ['HLSL', 'Material Editor', 'Shader Graph'],
  },
  {
    title: 'Programming',
    icon: 'tools',
    color: 'green',
    skills: ['Blueprint', 'C++', 'C#', 'Python'],
  },
];

const skillCategories = isFrontend ? frontendSkillCategories : techArtSkillCategories;

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  accent: { bg: 'bg-accent-500/20', text: 'text-accent-400', border: 'border-accent-500/30' },
  primary: { bg: 'bg-primary-500/20', text: 'text-primary-400', border: 'border-primary-500/30' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
};

export function Skills() {
  useDocumentTitle('Skills');
  const headerRef = useGsapReveal<HTMLDivElement>();
  const skillsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <>
      {/* Header */}
      <Section className="page-safe-top pb-8 relative overflow-hidden">
        <div ref={headerRef}>
          <div data-gsap-reveal className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content Column */}
            <div className="relative">
              <h1 className="heading-1 mb-4" style={{ color: 'var(--text-heading)' }}>
                Skills & <span className="text-gradient">Technologies</span>
              </h1>
              <p className="text-xl text-dark-300 mb-6">
                {isFrontend
                  ? 'A comprehensive overview of my technical skills and the technologies I work with daily.'
                  : 'Tools and technologies I use to create stunning visual effects and real-time graphics.'}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to={isFrontend ? '/experience' : '/work'} className="btn-secondary">
                  {isFrontend ? 'View Experience' : 'View Work'}
                </Link>
                {isFrontend && <CvDownloadButton variant="ghost" />}
              </div>
            </div>

            {/* Animation Column */}
            <div className="hidden lg:flex justify-center">
              <LottieDecor
                src={programmingAnimation}
                className="w-72 h-72 xl:w-96 xl:h-96"
              />
            </div>
          </div>
        </div>

        {/* Lottie decoration */}
        <LottieDecor
          data={JSON.stringify(sparklesAnimation)}
          className="absolute top-0 right-0 w-40 h-40 opacity-30"
        />
      </Section>

      {/* Skills Grid */}
      <Section className="pt-0">
        <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const colors = colorClasses[category.color] || colorClasses.accent;
            return (
              <div key={category.title} data-gsap-reveal className="glass-card p-6">
                <div className={`w-12 h-12 mb-4 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <SkillIcon name={category.icon} className={colors.text} />
                </div>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Tag key={skill} size="sm">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Detailed Skills from Profile */}
      <Section className="bg-dark-950/50">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4" style={{ color: 'var(--text-heading)' }}>Proficiency Levels</h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            A detailed breakdown of my expertise across different areas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(profile.skills).map(([category, skills]) => (
            <div key={category} className="glass-card p-6">
              <h3 className="font-semibold mb-4 capitalize" style={{ color: 'var(--text-heading)' }}>{category}</h3>
              <ul className="space-y-3">
                {skills?.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="text-dark-300 text-sm">{skill.name}</span>
                    <Tag size="sm" variant={skill.primary ? 'accent' : 'default'}>
                      {skill.level}
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative text-center">
          <h2 className="heading-3 mb-4" style={{ color: 'var(--text-heading)' }}>Ready to Work Together?</h2>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">
            Let's discuss how my skills can help bring your project to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Get in Touch
            </Link>
            {isFrontend && <CvDownloadButton variant="secondary" />}
          </div>
        </div>
      </Section>
    </>
  );
}

// Skill Icon Component
function SkillIcon({ name, className }: { name: string; className?: string }): ReactElement {
  const baseClass = `w-6 h-6 ${className || ''}`;

  const icons: Record<string, ReactElement> = {
    code: (
      <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    palette: (
      <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    data: (
      <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    motion: (
      <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    check: (
      <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tools: (
      <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    sparkles: (
      <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  };

  return icons[name] || icons.code;
}
