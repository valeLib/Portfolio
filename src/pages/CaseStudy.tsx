import { useParams, Link, Navigate } from 'react-router-dom';
import { Section } from '../components/layout';
import { Tag, Breadcrumbs } from '../components/ui';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import { getProjectBySlug, getAdjacentProjects } from '../content/projects';

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;
  const { prev, next } = slug ? getAdjacentProjects(slug) : { prev: null, next: null };

  useDocumentTitle(project?.title);
  const headerRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const contentRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, start: 'top 90%' });

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <>
      {/* Header */}
      <Section className="pb-8">
        <div ref={headerRef}>
          <Breadcrumbs
            items={[
              { label: 'Work', path: '/work' },
              { label: project.title },
            ]}
          />

          <div data-gsap-reveal className="flex flex-wrap gap-2 mb-4">
            <Tag variant="accent">{project.engine}</Tag>
            <span className="text-dark-500">{project.date}</span>
            <span className="text-dark-600">|</span>
            <span className="text-dark-400">{project.role}</span>
          </div>

          <h1 data-gsap-reveal className="heading-1 text-white mb-4">
            {project.title}
          </h1>

          <p data-gsap-reveal className="text-xl text-dark-400 max-w-3xl mb-6">
            {project.summary}
          </p>

          <div data-gsap-reveal className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </Section>

      {/* Hero Media */}
      <Section className="pt-0 pb-8" fullWidth>
        <div className="container-main">
          <div className="aspect-video rounded-2xl overflow-hidden bg-dark-800">
            {project.heroMedia.type === 'video' ? (
              <video
                src={project.heroMedia.src}
                poster={project.heroMedia.poster}
                controls
                className="w-full h-full object-cover"
                preload="metadata"
                playsInline
              />
            ) : (
              <img
                src={project.heroMedia.src}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </Section>

      {/* Content */}
      <Section className="pt-0">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* Goal */}
          <div data-gsap-reveal className="mb-12">
            <h2 className="heading-3 text-white mb-4">Goal</h2>
            <p className="text-dark-300 text-lg leading-relaxed">{project.goal}</p>
          </div>

          {/* What I Built */}
          <div data-gsap-reveal className="mb-12">
            <h2 className="heading-3 text-white mb-4">What I Built</h2>
            <ul className="space-y-3">
              {project.whatIBuilt.map((item, index) => (
                <li key={index} className="flex gap-3 text-dark-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-400 text-sm">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Breakdown Sections */}
          {project.breakdown.vfx && (
            <BreakdownSection
              title={project.breakdown.vfx.title}
              description={project.breakdown.vfx.description}
              items={project.breakdown.vfx.items}
              media={project.breakdown.vfx.media}
            />
          )}

          {project.breakdown.shaders && (
            <BreakdownSection
              title={project.breakdown.shaders.title}
              description={project.breakdown.shaders.description}
              items={project.breakdown.shaders.items}
              media={project.breakdown.shaders.media}
            />
          )}

          {project.breakdown.tools && (
            <BreakdownSection
              title={project.breakdown.tools.title}
              description={project.breakdown.tools.description}
              items={project.breakdown.tools.items}
              media={project.breakdown.tools.media}
            />
          )}

          {project.breakdown.optimization && (
            <BreakdownSection
              title={project.breakdown.optimization.title}
              description={project.breakdown.optimization.description}
              items={project.breakdown.optimization.items}
              media={project.breakdown.optimization.media}
            />
          )}

          {/* Performance Table */}
          {project.performance && project.performance.length > 0 && (
            <div data-gsap-reveal className="mb-12">
              <h2 className="heading-3 text-white mb-4">Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 px-4 text-dark-400 font-medium">Metric</th>
                      {project.performance[0].before && (
                        <th className="text-left py-3 px-4 text-dark-400 font-medium">Before</th>
                      )}
                      <th className="text-left py-3 px-4 text-dark-400 font-medium">
                        {project.performance[0].before ? 'After' : 'Value'}
                      </th>
                      {project.performance[0].improvement && (
                        <th className="text-left py-3 px-4 text-dark-400 font-medium">Improvement</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {project.performance.map((row, index) => (
                      <tr key={index} className="border-b border-dark-800">
                        <td className="py-3 px-4 text-dark-200">{row.metric}</td>
                        {row.before && (
                          <td className="py-3 px-4 text-dark-400">{row.before}</td>
                        )}
                        <td className="py-3 px-4 text-accent-400">{row.after}</td>
                        {row.improvement && (
                          <td className="py-3 px-4 text-green-400">{row.improvement}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <div data-gsap-reveal className="mb-12">
              <h2 className="heading-3 text-white mb-4">Breakdown Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((item, index) => (
                  <div key={index} className="rounded-xl overflow-hidden bg-dark-800">
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        controls
                        className="w-full aspect-video object-cover"
                        preload="metadata"
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.caption || `Gallery item ${index + 1}`}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                    )}
                    {item.caption && (
                      <p className="p-3 text-sm text-dark-400">{item.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Takeaways */}
          <div data-gsap-reveal className="mb-12">
            <h2 className="heading-3 text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-4">
              {project.takeaways.map((takeaway, index) => (
                <li key={index} className="flex gap-3 text-dark-300">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-accent-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Navigation */}
      <Section className="bg-dark-950/50">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="group flex-1 glass-card p-4 hover:border-accent-500/30 transition-colors"
            >
              <span className="text-dark-500 text-sm flex items-center gap-1 mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Project
              </span>
              <span className="text-white font-medium group-hover:text-accent-400 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="group flex-1 glass-card p-4 text-right hover:border-accent-500/30 transition-colors"
            >
              <span className="text-dark-500 text-sm flex items-center justify-end gap-1 mb-1">
                Next Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-white font-medium group-hover:text-accent-400 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </Section>
    </>
  );
}

// Breakdown Section Component
interface BreakdownSectionProps {
  title: string;
  description: string;
  items?: string[];
  media?: { type: string; src: string; caption?: string }[];
}

function BreakdownSection({ title, description, items, media }: BreakdownSectionProps) {
  return (
    <div data-gsap-reveal className="mb-12">
      <h2 className="heading-3 text-white mb-4">{title}</h2>
      <p className="text-dark-300 mb-4">{description}</p>

      {items && items.length > 0 && (
        <ul className="space-y-2 mb-4">
          {items.map((item, index) => (
            <li key={index} className="flex gap-2 text-dark-300">
              <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {media && media.length > 0 && (
        <div className="grid gap-4">
          {media.map((item, index) => (
            <div key={index} className="rounded-xl overflow-hidden bg-dark-800">
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  controls
                  className="w-full"
                  preload="metadata"
                  playsInline
                />
              ) : (
                <img src={item.src} alt={item.caption || ''} className="w-full" loading="lazy" />
              )}
              {item.caption && (
                <p className="p-3 text-sm text-dark-400">{item.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
