// Frontend / Software Engineer profile content

export const frontendProfile = {
  name: 'Valentina Liberona',
  fullName: 'Valentina Liberona Zuñiga',
  title: 'Frontend Engineer',
  tagline: 'React, TypeScript, Accessibility, Performance',

  // Roles for cycling animation in hero
  roles: [
    'Frontend Engineer',
    'Full-Stack Developer',
    'Game / VR Developer',
    'Technical Artist',
  ],

  heroHeadline: 'Frontend Engineer',
  heroSubheadline: 'Building accessible, performant, and beautiful user interfaces',

  bio: `I am a frontend engineer who enjoys building things with care and intention.

I bring a creative and artistic mindset to development, with strong attention to detail. I focus on delivering work that feels clean, solid, and well finished, while keeping a healthy balance between quality, clarity, and deadlines.

I work well in teams with clear ownership and defined responsibilities. I value asynchronous workflows, where autonomy is respected and each person can focus on delivering their part with reliability.`,

  bioExtended: `From a technical perspective, I focus on building interfaces that feel alive and intentional. I use tools such as GSAP, Lenis, Three.js or Spline, Lottie, and Tailwind to create interactive experiences that go beyond static layouts. Motion and depth are used with purpose, only when they improve flow, understanding, and usability.

I care deeply about accessibility, performance, and maintainability. I enjoy working with systems that scale, code that is easy to read, and interfaces that feel intuitive to real users. My goal is to contribute work that raises the quality of both the product and the team.`,

  focusAreas: [
    {
      title: 'Frontend Development',
      description: 'React, TypeScript, Vue, Next.js, Vite, and modern build tools',
      icon: 'code',
    },
    {
      title: 'UI Systems & Design',
      description: 'Design systems, component libraries, and responsive layouts',
      icon: 'palette',
    },
    {
      title: 'Accessibility',
      description: 'WCAG 2.1 compliance, screen reader support, and inclusive design',
      icon: 'accessibility',
    },
    {
      title: 'Performance',
      description: 'Core Web Vitals optimization, lazy loading, and efficient rendering',
      icon: 'zap',
    },
  ],

  skills: {
    frontend: [
      { name: 'React', level: 'Expert', primary: true },
      { name: 'TypeScript', level: 'Expert', primary: true },
      { name: 'Vue', level: 'Advanced' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'Vite', level: 'Expert' },
      { name: 'Tailwind CSS', level: 'Expert' },
    ],
    animation: [
      { name: 'GSAP', level: 'Advanced' },
      { name: 'Framer Motion', level: 'Advanced' },
      { name: 'Lottie', level: 'Proficient' },
      { name: 'Three.js', level: 'Intermediate' },
      { name: 'Spline', level: 'Proficient' },
    ],
    backend: [
      { name: 'Node.js', level: 'Proficient' },
      { name: 'Python', level: 'Proficient' },
      { name: 'Flask', level: 'Intermediate' },
      { name: 'PHP/Laravel', level: 'Intermediate' },
      { name: 'GraphQL', level: 'Proficient' },
    ],
    tools: [
      { name: 'Git', level: 'Expert' },
      { name: 'Figma', level: 'Advanced' },
      { name: 'Redux', level: 'Advanced' },
      { name: 'Testing (Jest/Vitest)', level: 'Proficient' },
    ],
  },

  // Small tech art mention for this profile
  techArt: {
    note: 'I also have experience in game development, VFX, and technical art.',
    skills: ['Unity', 'C#', 'Shaders', 'VFX', 'Meta Quest SDK'],
  },

  // Profile-specific visibility flags
  showShowreel: false,
  showGallery: false,
  showExperience: true,
  showProjects: true,

  availability: 'Open to opportunities',
  location: 'Remote',
};

export type FrontendProfile = typeof frontendProfile;
