import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CvDownloadButton } from '../ui';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { isTechArt, isFrontend } from '../../config';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Simple reveal animation - no pinning, editorial style
  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const container = containerRef.current;
      const card = container.querySelector('[data-contact-card]');
      const content = container.querySelectorAll('[data-contact-reveal]');

      // Set initial state
      gsap.set(card, { opacity: 0, y: 12 });
      gsap.set(content, { opacity: 0, y: 8 });

      // Simple scroll-triggered fade-in
      ScrollTrigger.create({
        trigger: container,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          });

          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2,
          });
        },
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  return (
    <div ref={containerRef}>
        <div
          data-contact-card
          className="relative glass-card p-8 md:p-12 text-center overflow-hidden"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent, color-mix(in srgb, var(--accent-2) 10%, transparent))',
            }}
          />

          <div className="relative">
            <h2
              data-contact-reveal
              className="text-2xl md:text-3xl font-bold mb-4"
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
              className="max-w-xl mx-auto mb-8 text-base md:text-lg"
              style={{ color: 'var(--muted)' }}
            >
              {isTechArt
                ? "Looking for a Tech Artist to bring your VFX vision to life? I'm always excited to work on new projects."
                : "Looking for a Frontend Engineer to build your next product? Let's discuss how I can help."}
            </p>

            <div data-contact-reveal className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
              {isFrontend && <CvDownloadButton variant="secondary" />}
            </div>
          </div>
        </div>
    </div>
  );
}
