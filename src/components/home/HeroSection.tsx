import { useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../layout';
import { CvDownloadButton } from '../ui';
import { CatScene, LottieDecor } from '../media';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { useTheme } from '../../hooks/useTheme';
import { profile } from '../../content/profile';
import { isTechArt } from '../../config';
import mouseScrollAnimation from '../../assets/lottie/Mouse scroll animation.lottie?url';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();

  // Animation colors based on theme
  const colors = theme === 'light'
    ? {
        liquid: '#96A178',      // Matcha green
        secondary: '#FFB7B7',   // Strawberry pink
        bubbles: '#7A8B5A',     // Darker matcha
        background: 'transparent',
      }
    : {
        liquid: '#A855F7',      // Vibrant Purple
        secondary: '#C084FC',   // Light Purple
        bubbles: '#E879F9',     // Fuchsia/Magenta bubbles
        background: 'transparent',
      };

  // Draw the pour animation frame
  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, progress: number, timestamp: number) => {
    ctx.clearRect(0, 0, width, height);

    // Cup dimensions - centered in the smaller canvas
    const cupWidth = Math.min(width * 0.6, 100);
    const cupHeight = Math.min(height * 0.55, 160);
    const cupX = (width - cupWidth) / 2;
    const cupY = height * 0.25;
    const cupBottom = cupY + cupHeight;

    // Draw cup outline (glass effect)
    ctx.strokeStyle = theme === 'light'
      ? 'rgba(75, 83, 53, 0.25)'
      : 'rgba(255, 45, 149, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cupX, cupY);
    ctx.lineTo(cupX - 8, cupBottom);
    ctx.lineTo(cupX + cupWidth + 8, cupBottom);
    ctx.lineTo(cupX + cupWidth, cupY);
    ctx.stroke();

    // Glass reflection
    ctx.strokeStyle = theme === 'light'
      ? 'rgba(255, 255, 255, 0.4)'
      : 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cupX + 10, cupY + 20);
    ctx.lineTo(cupX + 5, cupBottom - 20);
    ctx.stroke();

    // Calculate liquid level based on progress
    const liquidHeight = cupHeight * Math.min(progress, 1);
    const liquidTop = cupBottom - liquidHeight;

    if (liquidHeight > 0) {
      // Create gradient for liquid
      const gradient = ctx.createLinearGradient(cupX, liquidTop, cupX, cupBottom);
      gradient.addColorStop(0, colors.liquid);
      gradient.addColorStop(1, theme === 'light' ? '#5F6D45' : '#4C1D95');

      // Draw liquid with wave effect
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(cupX - 6, cupBottom);

      // Wave at top of liquid
      const waveAmplitude = 6 * (1 - progress * 0.5);
      const waveFrequency = 3;
      for (let x = cupX - 6; x <= cupX + cupWidth + 6; x += 2) {
        const waveY = liquidTop + Math.sin((x / cupWidth) * Math.PI * waveFrequency + timestamp * 0.003) * waveAmplitude;
        ctx.lineTo(x, waveY);
      }

      ctx.lineTo(cupX + cupWidth + 6, cupBottom);
      ctx.closePath();
      ctx.fill();

      // Add strawberry swirl (light) or neon glow (dark) at 50%+ progress
      if (progress > 0.5) {
        const swirlProgress = (progress - 0.5) * 2;
        ctx.globalAlpha = swirlProgress * 0.7;

        if (theme === 'light') {
          // Strawberry syrup swirl
          ctx.fillStyle = colors.secondary;
          const swirlY = cupBottom - liquidHeight * 0.3;
          for (let i = 0; i < 4; i++) {
            const swirlX = cupX + cupWidth * 0.2 + (cupWidth * 0.6 * i / 3);
            const radius = 12 + Math.sin(i + timestamp * 0.002) * 4;
            ctx.beginPath();
            ctx.arc(swirlX, swirlY + Math.sin(i * 2) * 8, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Neon glow particles
          ctx.shadowColor = colors.secondary;
          ctx.shadowBlur = 15 * swirlProgress;
          ctx.fillStyle = colors.secondary;
          for (let i = 0; i < 6; i++) {
            const glowX = cupX + 15 + (i * 37) % (cupWidth - 30);
            const glowY = liquidTop + 20 + (i * 47) % (liquidHeight - 40);
            ctx.beginPath();
            ctx.arc(glowX, glowY, 3 + (i % 3) * 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
      }

      // Draw bubbles
      ctx.fillStyle = theme === 'light'
        ? 'rgba(255, 255, 255, 0.5)'
        : colors.bubbles;

      if (theme === 'dark') {
        ctx.shadowColor = colors.bubbles;
        ctx.shadowBlur = 8;
      }

      const numBubbles = Math.floor(progress * 12);
      for (let i = 0; i < numBubbles; i++) {
        const bubbleX = cupX + 15 + (i * 19) % (cupWidth - 30);
        const bubbleY = liquidTop + 8 + ((i * 27 + timestamp * 0.015) % (liquidHeight - 16));
        const bubbleRadius = 2 + (i % 3) * 1.5;

        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, bubbleRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    // Pour stream (visible during filling)
    if (progress < 0.9 && progress > 0.05) {
      const streamWidth = 12 - progress * 8;
      const streamX = cupX + cupWidth / 2;

      ctx.fillStyle = colors.liquid;
      if (theme === 'dark') {
        ctx.shadowColor = colors.liquid;
        ctx.shadowBlur = 12;
      }

      ctx.beginPath();
      ctx.moveTo(streamX - streamWidth / 2, 0);
      ctx.quadraticCurveTo(
        streamX + Math.sin(timestamp * 0.004) * 8,
        liquidTop / 2,
        streamX,
        liquidTop
      );
      ctx.quadraticCurveTo(
        streamX - Math.sin(timestamp * 0.004) * 8,
        liquidTop / 2,
        streamX + streamWidth / 2,
        0
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }, [colors, theme]);

  // Animation loop for canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = (timestamp: number) => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      drawFrame(ctx, rect.width, rect.height, progressRef.current, timestamp);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [drawFrame, prefersReducedMotion]);

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

      // VISIBLE at scroll=0: badge, headline, visual are shown immediately
      // Scroll enhances by revealing subline, CTA, and scroll hint
      gsap.set([badge, headline, visual], { opacity: 1, y: 0, scale: 1 });
      gsap.set([subline, cta], { opacity: 0, y: 20 });
      gsap.set(scrollHint, { opacity: 0 });

      // Create pinned timeline - scroll reveals secondary elements AND controls pour animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update pour animation progress
            progressRef.current = self.progress;
          },
        },
      });

      // Scroll reveals subline, CTA, and hint progressively
      tl.to(subline, { opacity: 1, y: 0, duration: 0.3 }, 0)
        .to(cta, { opacity: 1, y: 0, duration: 0.3 }, 0.15)
        .to(scrollHint, { opacity: 0.8, duration: 0.2 }, 0.3);
    },
    containerRef,
    [prefersReducedMotion]
  );

  // If reduced motion, show everything immediately
  const showAll = prefersReducedMotion;

  return (
    <Section className="relative overflow-hidden" noPadding fullWidth>
      <div ref={containerRef} className="min-h-screen relative">
        {/* Background decoration - outside container-main to span full width */}
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

        <div className="container-main section-padding pt-24 md:pt-32 relative">
          <div
            ref={heroContentRef}
            className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]"
          >
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div
                data-hero="badge"
                className="mb-4"
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

              <div
                data-hero="headline"
                className="mb-4"
              >
                {isTechArt ? (
                  <h1
                    className="heading-1"
                    style={{ color: 'var(--text)' }}
                  >
                    Tech Artist,{' '}
                    <span className="text-gradient">Magic VFX</span>,{' '}
                    Shaders, Tools
                  </h1>
                ) : (
                  <>
                    {/* First line: Pour Animation + Frontend Engineer */}
                    <div className="flex items-end gap-2 lg:gap-3">
                      {/* Pour Animation */}
                      <div className="relative w-12 h-16 md:w-14 md:h-20 lg:w-16 lg:h-24 flex-shrink-0 mb-1 lg:mb-2">
                        <canvas
                          ref={canvasRef}
                          className="absolute inset-0 w-full h-full"
                          aria-hidden="true"
                        />
                        {prefersReducedMotion && (
                          <div className="absolute inset-0 flex items-end justify-center">
                            <div
                              className="w-8 h-12 rounded-b-lg"
                              style={{
                                backgroundColor: colors.liquid,
                                boxShadow: theme === 'dark' ? `0 0 20px ${colors.liquid}` : '0 4px 15px rgba(0,0,0,0.1)'
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <h1
                        className="heading-1"
                        style={{ color: 'var(--text)' }}
                      >
                        <span className="text-gradient">Frontend Engineer</span>
                      </h1>
                    </div>
                    {/* Second line: Building Modern Web Experiences */}
                    <h1
                      className="heading-1"
                      style={{ color: 'var(--text)' }}
                    >
                      Building Modern Web Experiences
                    </h1>
                  </>
                )}
              </div>

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

            {/* Visual: 3D Cat Model */}
            <div
              data-hero="visual"
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-square lg:aspect-auto lg:h-[560px] rounded-2xl overflow-visible">
                <CatScene />
              </div>
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
