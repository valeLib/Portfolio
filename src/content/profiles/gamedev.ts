// GameDev / Tech Art Profile
// Primary: Technical Art, VFX, Game Development
// Secondary: Frontend Engineering (minimal)

export const gamedevProfile = {
  name: 'Valentina Liberona',
  fullName: 'Valentina Liberona Zuñiga',
  title: 'Technical Artist & Game Developer',
  tagline: 'Real-time VFX, Shaders, Unity/Unreal, Game Systems',

  // Roles for cycling animation in hero
  roles: [
    'Technical Artist',
    'VFX Artist',
    'Game Developer',
    'Unity / Unreal Developer',
    'Shader Artist',
  ],

  heroHeadline: 'Technical Artist & Game Developer',
  heroSubheadline: 'Creating immersive visual experiences and real-time effects for games',

  // Primary focus (featured prominently)
  primaryFocus: 'Technical Art & VFX',
  
  // Secondary focus (minimal mention)
  secondaryFocus: 'Frontend Engineering',

  // Main bio - Tech Art / GameDev focused
  bio: `I am a technical artist specializing in real-time VFX, shader development, and game systems.

I bring together artistic vision and technical execution to create visually stunning and performant experiences. My work spans particle systems, procedural materials, custom shaders, and gameplay-integrated effects that enhance player immersion.

I work across Unity and Unreal Engine, with deep expertise in Niagara, VFX Graph, and material systems. I value efficient workflows, clean pipelines, and solutions that empower both artists and engineers.`,

  // Extended bio - Includes tools and approach
  bioExtended: `From a technical perspective, I focus on building reusable, modular systems that scale. Whether it's a particle effect, shader network, or tool pipeline, I prioritize performance, artist-friendliness, and maintainability.

My skillset includes real-time rendering, procedural generation, custom editor tools, and optimization for different platforms (PC, Console, Mobile, VR). I enjoy solving visual challenges that require both creative problem-solving and technical depth.

I also have a strong foundation in frontend engineering (React, TypeScript, Vue), which I apply when building internal tools, web-based asset managers, or interactive documentation for game pipelines.`,

  // Focus areas (for About page or Skills section)
  focusAreas: [
    {
      title: 'Real-time VFX',
      description: 'Niagara, VFX Graph, particle systems, environmental effects',
      icon: 'sparkles',
    },
    {
      title: 'Shader Development',
      description: 'HLSL, Material Editor, Shader Graph, procedural materials',
      icon: 'palette',
    },
    {
      title: 'Game Development',
      description: 'Unity, Unreal Engine, C#, Blueprint, gameplay systems',
      icon: 'gamepad',
    },
    {
      title: '3D Modeling & Assets',
      description: 'Blender, Houdini, game-ready assets, procedural generation',
      icon: 'cube',
    },
    {
      title: 'Tools & Pipelines',
      description: 'Custom editor tools, asset pipelines, workflow automation',
      icon: 'wrench',
    },
    {
      title: 'Frontend Engineering (Secondary)',
      description: 'React, TypeScript for web tools and documentation',
      icon: 'code',
    },
  ],

  // Skills grouped by category
  skills: {
    engines: [
      { name: 'Unreal Engine 5', level: 'Advanced', primary: true },
      { name: 'Unity', level: 'Expert', primary: true },
      { name: 'Blender', level: 'Advanced' },
      { name: 'Houdini', level: 'Intermediate' },
    ],
    vfx: [
      { name: 'Niagara', level: 'Advanced', primary: true },
      { name: 'VFX Graph', level: 'Expert', primary: true },
      { name: 'Cascade', level: 'Proficient' },
      { name: 'Particle Systems', level: 'Expert' },
    ],
    shaders: [
      { name: 'HLSL', level: 'Advanced', primary: true },
      { name: 'Material Editor (UE)', level: 'Expert', primary: true },
      { name: 'Shader Graph (Unity)', level: 'Expert', primary: true },
      { name: 'OSL', level: 'Intermediate' },
    ],
    programming: [
      { name: 'C#', level: 'Expert', primary: true },
      { name: 'Blueprint', level: 'Expert', primary: true },
      { name: 'C++', level: 'Intermediate' },
      { name: 'Python', level: 'Advanced' },
    ],
    modeling: [
      { name: 'Blender', level: 'Advanced' },
      { name: 'Substance Designer', level: 'Proficient' },
      { name: 'Houdini', level: 'Intermediate' },
      { name: 'Geometry Nodes', level: 'Proficient' },
    ],
    frontend: [
      { name: 'React', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Vue', level: 'Proficient' },
      { name: 'Web Tools Development', level: 'Proficient' },
    ],
  },

  // Frontend note (secondary/minimal mention)
  frontendNote: {
    title: 'Frontend Engineering',
    description: 'I also have experience in web development, which I apply to building internal tools, documentation systems, and web-based asset managers for game pipelines.',
    skills: ['React', 'TypeScript', 'Vue', 'Vite', 'Tailwind CSS'],
  },

  // Profile-specific visibility flags
  showShowreel: true,        // Video reel of VFX work
  showGallery: true,         // Gallery is PRIMARY in gamedev
  showExperience: true,
  showProjects: true,
  showTechArtSection: true,  // Primary section

  availability: 'Available for game dev projects',
  location: 'Remote',
};

export type GameDevProfile = typeof gamedevProfile;
