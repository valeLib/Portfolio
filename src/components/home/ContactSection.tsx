import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { CvDownloadButton } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { isTechArt, isFrontend } from '../../config';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const card = containerRef.current.querySelector('[data-contact-card]');
      const content = containerRef.current.querySelectorAll('[data-contact-reveal]');

      // Card reveal
      gsap.from(card, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        },
      });

      // Content stagger
      gsap.from(content, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
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
        <div
          data-contact-card
          className="relative glass-card p-8 md:p-12 text-center overflow-hidden"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent, color-mix(in srgb, var(--accent-2) 10%, transparent))',
            }}
          />

          <div className="relative">
            <h2
              data-contact-reveal
              className="heading-2 mb-4"
              style={{ color: 'var(--text)' }}
            >
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

            <p
              data-contact-reveal
              className="max-w-xl mx-auto mb-8"
              style={{ color: 'var(--muted)' }}
            >
              {isTechArt
                ? "Looking for a Tech Artist to bring your VFX vision to life? I'm always excited to work on new projects."
                : "Looking for a Frontend Engineer to build your next product? Let's discuss how I can help."}
            </p>

            <div
              data-contact-reveal
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
              {isFrontend && <CvDownloadButton variant="secondary" />}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
