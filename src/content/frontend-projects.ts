// Frontend / Software Engineering projects for the Software Engineer profile

export interface FrontendProject {
  id: string;
  title: string;
  company: string;
  category: string;
  problem: string;
  contribution: string;
  outcome: string;
  technologies: string[];
  liveUrl?: string;
  image?: string;
}

export const frontendProjects: FrontendProject[] = [
  {
    id: 'neurospeech',
    title: 'NeurospeechAI Research Platform',
    company: 'UCL (University College London)',
    category: 'Web Application / Research Platform',
    problem:
      'Neuroscience researchers needed an accessible web platform to conduct speech processing experiments, but existing tools lacked proper accessibility and modern UX.',
    contribution:
      'Built the frontend from scratch using React, TypeScript, and Vite. Implemented WCAG 2.1 AA compliance and created a custom design system with Tailwind CSS.',
    outcome:
      'Delivered a production-ready platform currently being used by researchers to conduct studies with diverse participant groups.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'WCAG 2.1'],
    liveUrl: 'https://neurospeechai.com/',
    image: '/projects/neurospeech.png',
  },
  {
    id: 'pignus-dashboard',
    title: 'Modern Reporting Dashboard',
    company: 'Pignus',
    category: 'Web Dashboard / Data Visualization',
    problem:
      'Legacy PHP Laravel dashboard was slow, hard to maintain, and lacked interactivity for data visualization.',
    contribution:
      'Migrated frontend to Vue 3 + Inertia.js with Vite build system. Implemented Pinia for state management and created interactive charts while maintaining backend API compatibility.',
    outcome:
      'Significantly improved page load performance and developer experience. The modern stack enabled faster feature development and more responsive data visualizations.',
    technologies: ['Vue 3', 'Inertia.js', 'Vite', 'Pinia', 'Chart.js', 'Laravel'],
    liveUrl: 'https://www.pignus.cl/plataforma/',
    image: '/projects/pignus-plataform.png',
  },
  {
    id: 'eye-search',
    title: 'Eye-Search Research Platform',
    company: 'UCL (University College London)',
    category: 'Web Application with WebGL Integration',
    problem:
      'Researchers needed to deploy Unity-based eye-tracking experiments on the web, accessible to participants remotely.',
    contribution:
      'Built React + TypeScript frontend and integrated Unity WebGL builds. Created seamless authentication flow and data synchronization between web and Unity contexts.',
    outcome:
      'Platform successfully enabled remote participation in eye-tracking research, particularly valuable during pandemic restrictions.',
    technologies: ['React', 'TypeScript', 'Unity WebGL', 'Authentication'],
    liveUrl: 'https://eye-search.co.uk/',
    image: '/projects/eyesearch.png',
  },
  {
    id: 'capitalizarme',
    title: 'Financial Services Platform',
    company: 'Capitalizarme',
    category: 'Web Application / FinTech Dashboard',
    problem:
      'Financial platform required robust state management and high performance for handling sensitive transactions.',
    contribution:
      'Developed features using React, TypeScript, and Next.js. Implemented Redux-based state management for complex financial flows and contributed to performance optimizations.',
    outcome:
      'Contributed to a high-performance platform handling significant daily transaction volume with excellent performance metrics.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Redux'],
    image: '/projects/capitalizarme.png',
  },
  {
    id: 'pulso-escolar',
    title: 'Educational Analytics Dashboards',
    company: 'Pulso Escolar',
    category: 'Web Dashboard / Data Visualization',
    problem:
      'Educational institutions needed intuitive dashboards to visualize student performance and attendance data.',
    contribution:
      'Built responsive Vue.js dashboards with interactive charts for educational data visualization. Created reusable component library and set up automated CI/CD deployment on GCP.',
    outcome:
      'Deployed to multiple schools across Chile, helping educators access and understand student data more effectively.',
    technologies: ['Vue', 'Google Cloud Platform', 'Data Visualization', 'CI/CD'],
    image: '/projects/radar.png',
  },
];

// Game Development projects (secondary section for Software Engineer profile)
export const gameDevProjects: FrontendProject[] = [
  {
    id: 'pignus-vr',
    title: 'Meta Quest VR Applications',
    company: 'Pignus',
    category: 'XR/VR Experience',
    problem:
      'Client needed immersive VR experiences for training and evaluation, optimized for standalone Quest hardware.',
    contribution:
      'Developed Unity VR applications using Meta Quest SDK. Implemented hand tracking and controller interactions. Optimized rendering for Quest 2/3 performance constraints.',
    outcome:
      'Delivered VR applications running smoothly on Quest hardware, currently in use for evaluation and training purposes.',
    technologies: ['Unity', 'C#', 'Meta Quest SDK', 'VR Optimization'],
    image: '/projects/pignus-vr.png',
  },
];

// Helper functions
export const getAllFrontendProjects = (): FrontendProject[] => frontendProjects;
export const getAllGameDevProjects = (): FrontendProject[] => gameDevProjects;
export const getFrontendProjectById = (id: string): FrontendProject | undefined =>
  frontendProjects.find((p) => p.id === id);
