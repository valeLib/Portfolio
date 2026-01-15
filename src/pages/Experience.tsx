import { useState } from 'react';
import { Section } from '../components/layout';
import { Tag, CvDownloadButton } from '../components/ui';
import { LottieDecor } from '../components/media';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import { experiences, type Experience as ExperienceType } from '../content/experience';
import catAnimation from '../assets/lottie/cat-decoration.json';

type FilterType = 'all' | ExperienceType['type'];

const filterLabels: Record<FilterType, string> = {
  all: 'All',
  frontend: 'Frontend',
  fullstack: 'Full-Stack',
  xr: 'XR / Game Dev',
  research: 'Research',
};

export function Experience() {
  useDocumentTitle('Experience');
  const [filter, setFilter] = useState<FilterType>('all');

  const headerRef = useGsapReveal<HTMLDivElement>();
  const timelineRef = useGsapReveal<HTMLDivElement>({ stagger: 0.15 });

  const filteredExperiences =
    filter === 'all' ? experiences : experiences.filter((exp) => exp.type === filter);

  const typeColors: Record<ExperienceType['type'], string> = {
    frontend: 'bg-accent-500/20 text-accent-400 border-accent-500/30',
    fullstack: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
    xr: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    research: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  return (
    <>
      {/* Header */}
      <Section className="pb-8">
        <div ref={headerRef}>
          <div data-gsap-reveal className="max-w-3xl">
            <h1 className="heading-1 text-white mb-4">
              Work <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-xl text-dark-300 mb-6">
              My professional journey across frontend development, full-stack engineering, and XR
              applications.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <CvDownloadButton variant="secondary" />
            </div>
          </div>
        </div>
      </Section>

      {/* Filters */}
      <Section className="pt-0">
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(filterLabels) as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-accent-500 text-white'
                  : 'bg-dark-800/50 text-dark-300 hover:text-white hover:bg-dark-700/50'
              }`}
            >
              {filterLabels[type]}
            </button>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="pt-0">
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-dark-700 transform md:-translate-x-1/2" />

          {filteredExperiences.map((exp, index) => (
            <div
              key={exp.id}
              data-gsap-reveal
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent-500 rounded-full border-4 border-dark-900 transform -translate-x-1/2 md:-translate-x-1/2 z-10" />

              {/* Content */}
              <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className="glass-card p-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded border ${
                            typeColors[exp.type]
                          }`}
                        >
                          {filterLabels[exp.type]}
                        </span>
                        <span className="text-dark-500 text-sm">{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                      <p className="text-accent-400">{exp.company}</p>
                      <p className="text-dark-500 text-sm">{exp.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-dark-300 mb-4">{exp.description}</p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                        <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Tag key={tech} size="sm">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}

          {/* Lottie decoration at end */}
          <div className="relative flex justify-center">
            <LottieDecor
              src={JSON.stringify(catAnimation)}
              className="w-24 h-24 opacity-30"
            />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-dark-950/50">
        <div className="text-center">
          <h2 className="heading-3 text-white mb-4">Interested in Working Together?</h2>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-primary">
              Get in Touch
            </a>
            <CvDownloadButton variant="secondary" />
          </div>
        </div>
      </Section>
    </>
  );
}
