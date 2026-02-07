import { forwardRef, useCallback, useRef, useEffect } from 'react';
import type { FrontendProject } from './projects.data';

interface FilmstripProps {
  projects: FrontendProject[];
  activeIndex: number;
  onSelectProject: (index: number) => void;
}

export const Filmstrip = forwardRef<HTMLDivElement, FilmstripProps>(
  ({ projects, activeIndex, onSelectProject }, ref) => {
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        let nextIndex: number | null = null;

        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowLeft':
            e.preventDefault();
            nextIndex = index > 0 ? index - 1 : projects.length - 1;
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            e.preventDefault();
            nextIndex = index < projects.length - 1 ? index + 1 : 0;
            break;
          case 'Home':
            e.preventDefault();
            nextIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            nextIndex = projects.length - 1;
            break;
        }

        if (nextIndex !== null) {
          onSelectProject(nextIndex);
          buttonsRef.current[nextIndex]?.focus();
        }
      },
      [projects.length, onSelectProject]
    );

    // Scroll active item into view
    useEffect(() => {
      buttonsRef.current[activeIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }, [activeIndex]);

    return (
      <div
        ref={ref}
        className="h-full overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar"
        role="listbox"
        aria-label="Project navigation"
        aria-activedescendant={`filmstrip-item-${activeIndex}`}
      >
        <div className="space-y-2">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            const indexLabel = String(index + 1).padStart(2, '0');

            return (
              <button
                key={project.id}
                ref={(el) => { buttonsRef.current[index] = el; }}
                id={`filmstrip-item-${index}`}
                data-filmstrip-item={index}
                onClick={() => onSelectProject(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full text-left p-4 rounded-lg transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                style={{
                  backgroundColor: isActive
                    ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                    : 'transparent',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: isActive
                    ? 'var(--accent)'
                    : 'color-mix(in srgb, var(--border-color) 50%, transparent)',
                }}
                role="option"
                aria-selected={isActive}
                aria-label={`View ${project.title}`}
                tabIndex={isActive ? 0 : -1}
              >
                {/* Progress indicator */}
                {isActive && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--accent)',
                    }}
                  />
                )}

                {/* Index */}
                <div
                  className="text-xs font-mono mb-2 transition-colors duration-300"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                  }}
                >
                  {indexLabel}
                </div>

                {/* Title */}
                <h4
                  className="text-sm font-semibold mb-1 transition-colors duration-300"
                  style={{
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                  }}
                >
                  {project.title}
                </h4>

                {/* Summary */}
                <p
                  className="text-xs line-clamp-1 transition-colors duration-300"
                  style={{
                    color: isActive ? 'var(--muted)' : 'color-mix(in srgb, var(--muted) 60%, transparent)',
                  }}
                >
                  {project.category}
                </p>

                {/* Active dot indicator */}
                {isActive && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: 'var(--accent)',
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Filmstrip.displayName = 'Filmstrip';
