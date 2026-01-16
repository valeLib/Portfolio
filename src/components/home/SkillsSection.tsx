import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { isTechArt, isFrontend, TOOLS } from '../../config';

gsap.registerPlugin(ScrollTrigger);

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const cards = containerRef.current.querySelectorAll('[data-skill-card]');
      const header = containerRef.current.querySelector('[data-skill-header]');

      // Animate header
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

      // Batch reveal cards with stagger
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
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
    <Section>
      <div ref={containerRef}>
        <div data-skill-header className="text-center mb-12">
          <h2 className="heading-2 mb-4" style={{ color: 'var(--text)' }}>
            {isTechArt ? 'Core Capabilities' : 'Technical Expertise'}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            {isTechArt
              ? 'Specialized in real-time VFX across multiple engines, with deep expertise in Unreal Engine.'
              : 'Modern frontend development with a focus on performance, accessibility, and developer experience.'}
          </p>
        </div>

        {isTechArt ? (
          <TechArtCapabilities />
        ) : (
          <FrontendCapabilities />
        )}

        {/* Frontend: Game dev mention */}
        {isFrontend && (
          <div
            data-skill-card
            className="mt-8 p-6 glass-card"
            style={{ borderLeft: '4px solid color-mix(in srgb, var(--accent) 50%, transparent)' }}
          >
            <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Also experienced in Game Development
            </h4>
            <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
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
  );
}

function TechArtCapabilities() {
  const capabilities = [
    {
      title: 'Unreal Engine',
      description: 'Primary engine of choice. Expert-level Niagara, Materials, and Blueprint development.',
      items: TOOLS.vfx.slice(0, 3),
      gradientFrom: 'var(--accent)',
      gradientTo: 'var(--accent-2)',
      dotColor: 'var(--accent)',
    },
    {
      title: 'Unity',
      description: 'VFX Graph and Shader Graph expertise for mobile and cross-platform projects.',
      items: ['VFX Graph', 'Shader Graph', 'HDRP / URP'],
      gradientFrom: 'var(--accent-2)',
      gradientTo: 'var(--accent)',
      dotColor: 'var(--accent-2)',
    },
    {
      title: 'Blender',
      description: '3D modeling, procedural texturing, and geometry nodes for asset creation.',
      items: ['Geometry Nodes', 'Procedural Materials', 'Asset Pipelines'],
      gradientFrom: '#f97316',
      gradientTo: '#ea580c',
      dotColor: '#f97316',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {capabilities.map((cap) => (
        <CapabilityCard key={cap.title} {...cap} />
      ))}
    </div>
  );
}

function FrontendCapabilities() {
  const capabilities = [
    {
      title: 'Frontend Stack',
      description: 'Modern React development with TypeScript, state management, and build tools.',
      items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS'],
      gradientFrom: 'var(--accent)',
      gradientTo: 'var(--accent-2)',
      dotColor: 'var(--accent)',
    },
    {
      title: 'Performance & A11y',
      description: 'Building fast, accessible experiences that work for everyone.',
      items: ['WCAG 2.1 Compliance', 'Core Web Vitals', 'Code Splitting', 'Lazy Loading'],
      gradientFrom: 'var(--accent-2)',
      gradientTo: 'var(--accent)',
      dotColor: 'var(--accent-2)',
    },
    {
      title: 'Animation & Motion',
      description: 'Rich interactive experiences with modern animation libraries.',
      items: ['GSAP', 'Framer Motion', 'Lottie', 'Three.js / Spline'],
      gradientFrom: '#f97316',
      gradientTo: '#ea580c',
      dotColor: '#f97316',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {capabilities.map((cap) => (
        <CapabilityCard key={cap.title} {...cap} />
      ))}
    </div>
  );
}

interface CapabilityCardProps {
  title: string;
  description: string;
  items: string[];
  gradientFrom: string;
  gradientTo: string;
  dotColor: string;
}

function CapabilityCard({ title, description, items, gradientFrom, gradientTo, dotColor }: CapabilityCardProps) {
  return (
    <div data-skill-card className="glass-card p-6">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${gradientFrom} 20%, transparent), color-mix(in srgb, ${gradientTo} 20%, transparent))`,
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: gradientFrom }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </div>
      <h3 className="heading-4 mb-2" style={{ color: 'var(--text)' }}>
        {title}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
        {description}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm"
            style={{ color: 'var(--muted)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
