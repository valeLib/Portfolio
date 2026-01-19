import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext, usePrefersReducedMotion } from '../../hooks';
import { useTheme } from '../../hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

interface VideoHeroProps {
  className?: string;
}

export function VideoHero({ className = '' }: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
        background: '#FDFCF0',  // Cream
      }
    : {
        liquid: '#8B5CF6',      // Liquid purple
        secondary: '#FF2D95',   // Neon pink
        bubbles: '#00F5FF',     // Cyan bubbles
        background: '#0F0510',  // Deep grape
      };

  // Draw the pour animation frame
  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    // Clear canvas
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, width, height);

    // Cup dimensions
    const cupWidth = width * 0.4;
    const cupHeight = height * 0.6;
    const cupX = (width - cupWidth) / 2;
    const cupY = height * 0.3;
    const cupBottom = cupY + cupHeight;

    // Draw cup outline (glass effect)
    ctx.strokeStyle = theme === 'light' ? 'rgba(75, 83, 53, 0.3)' : 'rgba(255, 45, 149, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cupX, cupY);
    ctx.lineTo(cupX - 10, cupBottom);
    ctx.lineTo(cupX + cupWidth + 10, cupBottom);
    ctx.lineTo(cupX + cupWidth, cupY);
    ctx.stroke();

    // Calculate liquid level based on progress
    const liquidHeight = cupHeight * Math.min(progress, 1);
    const liquidTop = cupBottom - liquidHeight;

    if (liquidHeight > 0) {
      // Create gradient for liquid
      const gradient = ctx.createLinearGradient(cupX, liquidTop, cupX, cupBottom);
      gradient.addColorStop(0, colors.liquid);
      gradient.addColorStop(1, theme === 'light' ? '#7A8B5A' : '#6D28D9');

      // Draw liquid with wave effect
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(cupX - 8, cupBottom);

      // Wave at top of liquid
      const waveAmplitude = 8 * (1 - progress * 0.5);
      const waveFrequency = 3;
      for (let x = cupX - 8; x <= cupX + cupWidth + 8; x += 2) {
        const waveY = liquidTop + Math.sin((x / cupWidth) * Math.PI * waveFrequency + Date.now() * 0.003) * waveAmplitude;
        ctx.lineTo(x, waveY);
      }

      ctx.lineTo(cupX + cupWidth + 8, cupBottom);
      ctx.closePath();
      ctx.fill();

      // Add strawberry swirl (light) or neon glow (dark) at 50%+ progress
      if (progress > 0.5) {
        const swirlProgress = (progress - 0.5) * 2;
        ctx.globalAlpha = swirlProgress * 0.6;

        if (theme === 'light') {
          // Strawberry syrup swirl
          ctx.fillStyle = colors.secondary;
          ctx.beginPath();
          const swirlY = cupBottom - liquidHeight * 0.3;
          for (let i = 0; i < 5; i++) {
            const swirlX = cupX + cupWidth * 0.2 + (cupWidth * 0.6 * i / 4);
            const radius = 15 + Math.sin(i + Date.now() * 0.002) * 5;
            ctx.moveTo(swirlX + radius, swirlY);
            ctx.arc(swirlX, swirlY + Math.sin(i * 2) * 10, radius, 0, Math.PI * 2);
          }
          ctx.fill();
        } else {
          // Neon glow effect
          ctx.shadowColor = colors.secondary;
          ctx.shadowBlur = 20 * swirlProgress;
          ctx.fillStyle = colors.secondary;
          for (let i = 0; i < 8; i++) {
            const glowX = cupX + Math.random() * cupWidth;
            const glowY = liquidTop + Math.random() * liquidHeight;
            ctx.beginPath();
            ctx.arc(glowX, glowY, 3 + Math.random() * 5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
      }

      // Draw bubbles
      ctx.fillStyle = theme === 'light'
        ? 'rgba(255, 255, 255, 0.6)'
        : colors.bubbles;

      if (theme === 'dark') {
        ctx.shadowColor = colors.bubbles;
        ctx.shadowBlur = 10;
      }

      const numBubbles = Math.floor(progress * 15);
      for (let i = 0; i < numBubbles; i++) {
        const bubbleX = cupX + 20 + (i * 17) % (cupWidth - 40);
        const bubbleY = liquidTop + 10 + ((i * 23 + Date.now() * 0.02) % (liquidHeight - 20));
        const bubbleRadius = 2 + (i % 3) * 2;

        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, bubbleRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    // Pour stream (visible during filling)
    if (progress < 0.95) {
      const streamWidth = 15 - progress * 10;
      const streamX = width / 2;

      ctx.fillStyle = colors.liquid;
      if (theme === 'dark') {
        ctx.shadowColor = colors.liquid;
        ctx.shadowBlur = 15;
      }

      ctx.beginPath();
      ctx.moveTo(streamX - streamWidth / 2, 0);
      ctx.quadraticCurveTo(
        streamX + Math.sin(Date.now() * 0.005) * 10,
        liquidTop / 2,
        streamX,
        liquidTop
      );
      ctx.quadraticCurveTo(
        streamX - Math.sin(Date.now() * 0.005) * 10,
        liquidTop / 2,
        streamX + streamWidth / 2,
        0
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }, [colors, theme]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      drawFrame(ctx, rect.width, rect.height, progressRef.current);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [drawFrame, prefersReducedMotion]);

  // GSAP ScrollTrigger to control progress
  useGsapContext(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    },
    containerRef,
    [prefersReducedMotion]
  );

  // Static fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`min-h-screen flex items-center justify-center ${className}`}
        style={{ backgroundColor: colors.background }}
      >
        <div
          className="w-32 h-48 rounded-b-3xl"
          style={{
            backgroundColor: colors.liquid,
            boxShadow: theme === 'dark' ? `0 0 30px ${colors.liquid}` : 'none'
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen relative ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: colors.background }}
      />
    </div>
  );
}
