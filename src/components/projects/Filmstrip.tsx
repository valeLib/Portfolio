import { forwardRef } from 'react';
import type { FrontendProject } from './projects.data';

interface FilmstripProps {
  projects: FrontendProject[];
  activeIndex: number;
  onSelectProject: (index: number) => void;
}

export const Filmstrip = forwardRef<HTMLDivElement, FilmstripProps>(
  ({ projects, activeIndex, onSelectProject }, ref) => {
    return (
      <div
        ref={ref}
        className="h-full overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar"
        role="list"
        aria-label="Project navigation"
      >
        <div className="space-y-2">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            const indexLabel = String(index + 1).padStart(2, '0');

            return (
              <button
                key={project.id}
                data-filmstrip-item={index}
                onClick={() => onSelectProject(index)}
                className="w-full text-left p-4 rounded-lg transition-all duration-300 relative group"
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
                aria-label={`View ${project.title}`}
                aria-current={isActive ? 'true' : undefined}
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
