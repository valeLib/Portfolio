// Work experience data for the Frontend profile

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: 'frontend' | 'fullstack' | 'xr' | 'research';
  description: string;
  highlights: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 'ucl-neurospeech',
    company: 'UCL - NeurospeechAI',
    role: 'Frontend Developer',
    location: 'London, UK (Remote)',
    period: '2024 - Present',
    type: 'frontend',
    description: 'Building an accessible web application for speech therapy research at University College London.',
    highlights: [
      'Developed a fully accessible React + TypeScript application from scratch',
      'Implemented WCAG 2.1 AA compliance for users with speech impairments',
      'Created a custom design system with Vite and Tailwind CSS',
      'Integrated with Python Flask backend for speech analysis',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'WCAG 2.1', 'Flask'],
  },
  {
    id: 'pignus',
    company: 'Pignus',
    role: 'Full-Stack Developer & VR Developer',
    location: 'Chile (Remote)',
    period: '2023 - 2024',
    type: 'fullstack',
    description: 'Led dashboard modernization and developed VR training applications for industrial safety.',
    highlights: [
      'Migrated legacy PHP Laravel dashboard to Vue + Inertia with Vite',
      'Implemented state management with Pinia for complex data flows',
      'Built interactive charts and data visualizations',
      'Developed Unity VR applications for Meta Quest headsets',
      'Optimized VR performance for standalone Quest hardware',
    ],
    technologies: ['Vue', 'Inertia.js', 'Vite', 'Pinia', 'Laravel', 'Unity', 'Meta Quest SDK', 'C#'],
  },
  {
    id: 'capitalizarme',
    company: 'Capitalizarme',
    role: 'Frontend Developer',
    location: 'Chile (Remote)',
    period: '2022 - 2023',
    type: 'frontend',
    description: 'Built and maintained fintech web applications for real estate investment platform.',
    highlights: [
      'Developed React + TypeScript frontend with Next.js for SEO optimization',
      'Implemented complex state management with Redux',
      'Optimized performance for data-heavy investment dashboards',
      'Created responsive, mobile-first interfaces',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Redux', 'Responsive Design'],
  },
  {
    id: 'ucl-eyesearch',
    company: 'UCL - Eye-Search',
    role: 'Frontend Developer',
    location: 'London, UK (Remote)',
    period: '2022',
    type: 'research',
    description: 'Developed a web platform integrating Unity WebGL for eye-tracking research at UCL.',
    highlights: [
      'Built React + TypeScript frontend for research data collection',
      'Integrated Unity WebGL application seamlessly into web platform',
      'Implemented user authentication and session management',
      'Designed intuitive navigation for research participants',
    ],
    technologies: ['React', 'TypeScript', 'Unity WebGL', 'Authentication'],
  },
  {
    id: 'pulso-escolar',
    company: 'Pulso Escolar',
    role: 'Frontend Developer',
    location: 'Chile',
    period: '2021 - 2022',
    type: 'frontend',
    description: 'Built data visualization dashboards for educational analytics platform.',
    highlights: [
      'Developed Vue.js dashboards for school performance analytics',
      'Created interactive data visualizations and charts',
      'Deployed and maintained applications on Google Cloud Platform',
      'Collaborated with stakeholders to define data presentation requirements',
    ],
    technologies: ['Vue', 'Data Visualization', 'Google Cloud Platform', 'Charts'],
  },
  {
    id: 'nlhpc',
    company: 'NLHPC (National Laboratory for HPC)',
    role: 'Frontend Developer Intern',
    location: 'Chile',
    period: '2020 - 2021',
    type: 'frontend',
    description: 'Built monitoring dashboards for high-performance computing infrastructure.',
    highlights: [
      'Developed React dashboards for HPC cluster monitoring',
      'Implemented GraphQL queries and subscriptions for real-time data',
      'Created responsive interfaces for system administrators',
      'Learned best practices for handling large-scale data streams',
    ],
    technologies: ['React', 'GraphQL', 'Real-time Data', 'Dashboards'],
  },
];

// Helper functions
export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find((exp) => exp.id === id);
};

export const getExperiencesByType = (type: Experience['type']): Experience[] => {
  return experiences.filter((exp) => exp.type === type);
};

export const getAllTechnologies = (): string[] => {
  const techSet = new Set<string>();
  experiences.forEach((exp) => {
    exp.technologies.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};
