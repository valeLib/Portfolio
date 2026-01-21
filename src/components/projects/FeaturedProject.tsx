import { forwardRef } from 'react';
import { Tag } from '../ui';
import type { FrontendProject } from './projects.data';

interface FeaturedProjectProps {
  project: FrontendProject;
  compact?: boolean;
}

export const FeaturedProject = forwardRef<HTMLDivElement, FeaturedProjectProps>(
  ({ project, compact = false }, ref) => {
    const tags = project.technologies ?? [];

    if (compact) {
      return (
        <div
          ref={ref}
          className="glass-card p-6 rounded-2xl"
          data-featured-content
        >
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-2 py-1 text-xs font-medium rounded"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                color: 'var(--accent)',
                border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title & Company */}
          <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
            {project.title}
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--accent)' }}>
            {project.company}
          </p>

          {/* Content blocks */}
          <div className="space-y-4 mb-6">
            <ContentBlock label="Problem" content={project.problem} />
            <ContentBlock label="My Contribution" content={project.contribution} />
            <ContentBlock label="Outcome" content={project.outcome} />
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tech) => (
                <Tag key={tech} size="sm">
                  {tech}
                </Tag>
              ))}
            </div>
          )}

          {/* CTA */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)' }}
              aria-label={`View live site for ${project.title}`}
            >
              <LinkIcon />
              View Live Site
            </a>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="h-full flex flex-col justify-center"
        data-featured-content
      >
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="px-3 py-1.5 text-sm font-medium rounded-lg"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
              color: 'var(--accent)',
              border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title & Company */}
        <h3 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          {project.title}
        </h3>
        <p className="text-lg mb-8" style={{ color: 'var(--accent)' }}>
          {project.company}
        </p>

        {/* Content blocks in grid */}
        <div className="grid gap-6 mb-8">
          <ContentBlock label="Problem" content={project.problem} />
          <ContentBlock label="My Contribution" content={project.contribution} />
          <ContentBlock label="Outcome" content={project.outcome} />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tech) => (
              <Tag key={tech} size="md">
                {tech}
              </Tag>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg)',
              }}
              aria-label={`View live site for ${project.title}`}
            >
              <LinkIcon />
              View Live Site
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                color: 'var(--accent)',
                border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
              }}
              aria-label={`View repository for ${project.title}`}
            >
              <CodeIcon />
              View Code
            </a>
          )}
        </div>
      </div>
    );
  }
);

FeaturedProject.displayName = 'FeaturedProject';

// Helper component for content blocks
function ContentBlock({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-wider mb-2 font-semibold"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {content}
      </p>
    </div>
  );
}

// Icons
function LinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}
