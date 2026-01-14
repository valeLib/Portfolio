import { Link } from 'react-router-dom';
import type { Project } from '../../types/project';
import { Tag } from './Tag';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block glass-card-hover p-1 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
        {project.heroMedia.type === 'video' ? (
          <video
            src={project.heroMedia.src}
            poster={project.heroMedia.poster}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            muted
            loop
            playsInline
            preload="metadata"
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
          />
        ) : (
          <img
            src={project.heroMedia.src}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Engine badge */}
        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-dark-900/80 backdrop-blur-sm rounded-md text-dark-200">
          {project.engine}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 pt-0">
        <h3 className="heading-4 text-white mb-2 group-hover:text-accent-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-dark-400 text-sm mb-4 line-clamp-2">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} size="sm">
              {tag}
            </Tag>
          ))}
          {project.tags.length > 3 && (
            <Tag size="sm" variant="accent">
              +{project.tags.length - 3}
            </Tag>
          )}
        </div>
      </div>
    </Link>
  );
}
