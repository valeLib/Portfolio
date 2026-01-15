// Frontend / Software Engineer profile content

export const frontendProfile = {
  name: 'Valentina Liberona',
  title: 'Frontend Engineer',
  tagline: 'React, TypeScript, Accessibility, Performance',

  heroHeadline: 'Frontend Engineer',
  heroSubheadline: 'Building accessible, performant, and beautiful user interfaces',

  bio: `I'm a Frontend Engineer with expertise in React, TypeScript, and modern web technologies.
  I specialize in building accessible, performant UIs with a focus on design systems,
  data-heavy dashboards, and seamless user experiences.`,

  bioExtended: `With experience across healthcare, fintech, and education sectors, I bring a product-focused
  mindset to frontend development. I'm passionate about accessibility (WCAG compliance),
  performance optimization, and creating maintainable design systems.

  Beyond web development, I have hands-on experience with Unity WebGL integration and
  VR development for Meta Quest, bridging the gap between web and immersive experiences.
  I use GSAP, Framer Motion, and Lottie to create smooth, engaging interactions.`,

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
