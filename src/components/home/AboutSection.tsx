import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { profile } from '../../content/profile';
import { isTechArt } from '../../config';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const container = containerRef.current;
      const header = container.querySelector('[data-about-header]');
      const cards = container.querySelectorAll('[data-about-card]');

      // Set initial state - header visible, cards hidden with rotation
      gsap.set(header, { opacity: 1 });
      gsap.set(cards, {
        opacity: 0,
        y: 40,
        rotateZ: (i) => (i % 2 === 0 ? -3 : 3),
      });

      // Create pinned section with staggered card reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=70%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Reveal cards with rotation settling during pin
      tl.to(cards, {
        opacity: 1,
        y: 0,
        rotateZ: (i) => (i % 2 === 0 ? -1 : 1),
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  const cards = [
    {
      id: 'now',
      label: 'Currently',
      title: 'What I do now',
      content: isTechArt
        ? 'Creating stunning VFX and shaders for games. Currently focused on Unreal Engine 5 projects.'
        : 'Building accessible, performant web applications. Focused on React, TypeScript, and modern tooling.',
      icon: '🎯',
    },
    {
      id: 'tools',
      label: 'Toolkit',
      title: 'Favorite tools',
      content: isTechArt
        ? 'Unreal Engine, Niagara, Material Editor, Blender, Houdini'
        : 'React, TypeScript, Tailwind, GSAP, Vite, Figma',
      icon: '🛠️',
    },
    {
      id: 'interests',
      label: 'Interests',
      title: 'Beyond code',
      content: 'Animation, photography, game design, open source, learning new technologies',
      icon: '✨',
    },
    {
      id: 'bio',
      label: 'About',
      title: 'Who I am',
      content: profile.bio || 'A passionate developer who loves creating beautiful, functional experiences.',
      icon: '👋',
    },
  ];

  return (
    <Section
      className="min-h-screen flex items-center"
      noPadding
      fullWidth
      style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)' }}
    >
      <div ref={containerRef} className="container-main section-padding w-full py-16">
        <div data-about-header className="text-center mb-12">
          <h2 className="heading-2 mb-4" style={{ color: 'var(--text)' }}>
            A bit about me
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Quick glimpse into who I am and what drives me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.id}
              data-about-card
              className="glass-card p-6 relative"
              style={{
                transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
              }}
            >
              {/* Label badge */}
              <span
                className="absolute -top-3 left-4 px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)',
                }}
              >
                {card.label}
              </span>

              <div className="flex items-start gap-4 mt-2">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {card.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full about page */}
        <div className="text-center mt-8">
          <Link
            to="/about"
            className="btn-ghost inline-flex items-center gap-2"
          >
            Learn more about me
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </Section>
  );
}
