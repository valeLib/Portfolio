import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  id: string;
  label: string;
  element: string; // Selector for the chapter element
}

interface ScrollIndexProps {
  chapters: Chapter[];
  className?: string;
}

export function ScrollIndex({ chapters, className = '' }: ScrollIndexProps) {
  const [activeChapter, setActiveChapter] = useState<string>(chapters[0]?.id || '');
  const indexRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const triggers: ScrollTrigger[] = [];

    chapters.forEach((chapter) => {
      const element = document.querySelector(chapter.element);
      if (!element) return;

      const trigger = ScrollTrigger.create({
        trigger: element as HTMLElement,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveChapter(chapter.id),
        onEnterBack: () => setActiveChapter(chapter.id),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [chapters, prefersReducedMotion]);

  const scrollToChapter = (chapterId: string) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    const element = document.querySelector(chapter.element);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={indexRef}
      className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block ${className}`}
    >
      <div className="flex flex-col gap-3">
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;

          return (
            <button
              key={chapter.id}
              onClick={() => scrollToChapter(chapter.id)}
              className="group text-right transition-all duration-300"
              aria-label={`Go to ${chapter.label}`}
            >
              <div className="flex items-center gap-3 justify-end">
                {/* Label - shows on hover or when active */}
                <span
                  className="text-xs font-medium tracking-wider uppercase transition-opacity duration-300"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {chapter.label}
                </span>

                {/* Dot indicator */}
                <div className="relative">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? 'var(--accent)' : 'var(--border-color)',
                      transform: isActive ? 'scale(1.5)' : 'scale(1)',
                      boxShadow: isActive
                        ? `0 0 12px color-mix(in srgb, var(--accent) 70%, transparent)`
                        : 'none',
                    }}
                  />
                  {/* Hover ring */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      border: '1px solid var(--accent)',
                      transform: 'scale(2)',
                    }}
                  />
                </div>
              </div>

              {/* Label on hover (for inactive) */}
              {!isActive && (
                <span
                  className="absolute right-8 text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ color: 'var(--muted)' }}
                >
                  {chapter.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
