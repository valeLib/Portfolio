import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { CvDownloadButton } from '../ui';
import { SplineHero, LottieDecor } from '../media';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { profile } from '../../content/profile';
import { isTechArt } from '../../config';
import sparklesAnimation from '../../assets/lottie/magic-sparkles.json';
import mouseScrollAnimation from '../../assets/lottie/Mouse scroll animation.lottie?url';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!containerRef.current || !heroContentRef.current || prefersReducedMotion) return;

      const container = containerRef.current;
      const content = heroContentRef.current;

      // Get animatable elements
      const badge = content.querySelector('[data-hero="badge"]');
      const headline = content.querySelector('[data-hero="headline"]');
      const subline = content.querySelector('[data-hero="subline"]');
      const cta = content.querySelector('[data-hero="cta"]');
      const visual = content.querySelector('[data-hero="visual"]');
      const scrollHint = content.querySelector('[data-hero="scroll-hint"]');

      // Initial states
      gsap.set([badge, headline, subline, cta, scrollHint], {
        opacity: 0,
        y: 30,
      });
      gsap.set(visual, { opacity: 0, scale: 0.95 });

      // Create pinned timeline with 3 beats
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Beat 1 (0-33%): Headline reveal
      tl.to(badge, { opacity: 1, y: 0, duration: 0.3 }, 0)
        .to(headline, { opacity: 1, y: 0, duration: 0.4 }, 0.1)
        .to(visual, { opacity: 1, scale: 1, duration: 0.5 }, 0.15);

      // Beat 2 (33-66%): Subline appears
      tl.to(subline, { opacity: 1, y: 0, duration: 0.4 }, 0.35);

      // Beat 3 (66-100%): CTA + scroll hint
      tl.to(cta, { opacity: 1, y: 0, duration: 0.4 }, 0.55)
        .to(scrollHint, { opacity: 0.8, y: 0, duration: 0.3 }, 0.7);
    },
    containerRef,
    [prefersReducedMotion]
  );

  // If reduced motion, show everything immediately
  const showAll = prefersReducedMotion;

  return (
    <Section className="relative overflow-hidden" noPadding>
      <div ref={containerRef} className="min-h-screen">
        <div className="container-main section-padding pt-24 md:pt-32">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl transition-colors"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}
            />
            <div
              className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl transition-colors"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent-2) 10%, transparent)' }}
            />
          </div>

          <div
            ref={heroContentRef}
            className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]"
          >
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div
                data-hero="badge"
                className="mb-4"
                style={{ opacity: showAll ? 1 : undefined }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  {profile.availability}
                </span>
              </div>

              <h1
                data-hero="headline"
                className="heading-1 mb-4"
                style={{ color: 'var(--text)', opacity: showAll ? 1 : undefined }}
              >
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

              <p
                data-hero="subline"
                className="text-xl mb-8 max-w-xl"
                style={{ color: 'var(--muted)', opacity: showAll ? 1 : undefined }}
              >
                {isTechArt
                  ? 'Unreal-first. Shipping-focused. Clean breakdowns. Creating immersive visual experiences that bring games to life.'
                  : 'React, TypeScript, and modern tooling. Accessible, performant, and beautiful user interfaces that delight users.'}
              </p>

              <div
                data-hero="cta"
                className="flex flex-wrap gap-4"
                style={{ opacity: showAll ? 1 : undefined }}
              >
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
            </div>

            {/* Spline 3D Scene */}
            <div
              data-hero="visual"
              className="order-1 lg:order-2 relative"
              style={{ opacity: showAll ? 1 : undefined }}
            >
              <div className="aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden">
                <SplineHero />
              </div>
              {/* Sparkles decoration */}
              <LottieDecor
                data={JSON.stringify(sparklesAnimation)}
                className="absolute -top-8 -right-8 w-48 h-48 opacity-80"
              />
            </div>
          </div>

          {/* Mouse scroll indicator */}
          <div
            data-hero="scroll-hint"
            className="hidden md:flex justify-center mt-8"
            style={{ opacity: showAll ? 0.8 : undefined }}
          >
            <LottieDecor src={mouseScrollAnimation} className="w-20 h-20 opacity-80" />
          </div>
        </div>
      </div>
    </Section>
  );
}
