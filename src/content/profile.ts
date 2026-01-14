export const profile = {
  name: 'Your Name',
  title: 'Tech Artist',
  tagline: 'Magic VFX, Shaders, Real-time Systems',
  bio: `I'm a Tech Artist passionate about creating immersive visual experiences in real-time engines.
  My focus is on magic VFX, shader development, and building efficient systems that bring
  creative visions to life while maintaining performance.`,

  bioExtended: `With a deep understanding of both artistic and technical requirements, I bridge the gap
  between concept and implementation. I specialize in creating visually stunning effects that
  are optimized for real-time performance, working primarily in Unreal Engine 5.

  My approach combines strong fundamentals in VFX artistry with solid technical skills in
  shader programming, Blueprint systems, and optimization techniques. I believe in creating
  modular, reusable systems that empower teams to iterate quickly.`,

  focusAreas: [
    {
      title: 'Magic VFX',
      description: 'Spells, abilities, environmental magic effects using Niagara and VFX Graph',
      icon: 'sparkles',
    },
    {
      title: 'Shaders & Materials',
      description: 'Custom materials, post-processing effects, and procedural textures',
      icon: 'palette',
    },
    {
      title: 'Real-time Systems',
      description: 'Performance-optimized VFX pipelines and tools for production',
      icon: 'cpu',
    },
    {
      title: 'Tools Development',
      description: 'Editor tools, automation scripts, and workflow improvements',
      icon: 'wrench',
    },
  ],

  skills: {
    engines: [
      { name: 'Unreal Engine 5', level: 'Expert', primary: true },
      { name: 'Unity', level: 'Proficient' },
      { name: 'Blender', level: 'Proficient' },
    ],
    vfx: [
      { name: 'Niagara', level: 'Expert' },
      { name: 'VFX Graph', level: 'Advanced' },
      { name: 'Cascade', level: 'Proficient' },
    ],
    shaders: [
      { name: 'HLSL', level: 'Advanced' },
      { name: 'Material Editor', level: 'Expert' },
      { name: 'Shader Graph', level: 'Advanced' },
    ],
    programming: [
      { name: 'Blueprint', level: 'Expert' },
      { name: 'C++', level: 'Intermediate' },
      { name: 'Python', level: 'Proficient' },
    ],
  },

  frontend: {
    note: 'While my primary focus is Tech Art, I also have experience building polished web interfaces.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  },

  availability: 'Open to opportunities',
  location: 'Remote / Your Location',
};
