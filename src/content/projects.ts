import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    slug: 'arcane-sigil-spell-system',
    title: 'Arcane Sigil Spell System',
    summary: 'A complex ritual circle spell system with timeline-driven animations, dynamic sigil generation, and modular VFX components built in Unreal Engine 5.',
    role: 'Tech Artist / VFX Lead',
    date: '2024',
    tags: ['Niagara', 'Materials', 'Blueprint', 'Unreal Engine 5'],
    featured: true,
    heroMedia: {
      type: 'video',
      src: '/placeholders/arcane-sigil-hero.mp4',
      poster: '/placeholders/arcane-sigil-poster.jpg',
    },
    goal: 'Create a visually impressive and performance-efficient spell casting system that features procedural sigil generation, layered particle effects, and smooth timeline-driven animations. The system needed to support multiple spell types while maintaining a consistent magical aesthetic.',
    whatIBuilt: [
      'Modular Niagara system with 12+ reusable emitters for different spell elements',
      'Custom material functions for procedural sigil generation with animated reveals',
      'Blueprint timeline system for orchestrating complex multi-phase spell sequences',
      'GPU-driven particle system for ground runes with proper sorting and blending',
      'Distance-based LOD system for particle density and material complexity',
    ],
    breakdown: {
      vfx: {
        title: 'VFX System',
        description: 'The core VFX uses a modular Niagara system architecture with parent-child relationships for easy iteration.',
        items: [
          'Central orb emitter with noise-driven distortion',
          'Radial beam system using spline-based ribbon rendering',
          'Ground sigil projector with animated UV scrolling',
          'Ambient particle field with turbulence and curl noise',
          'Impact burst system with mesh-based debris',
        ],
        media: [
          {
            type: 'image',
            src: '/placeholders/arcane-niagara-graph.jpg',
            caption: 'Niagara system overview showing modular emitter structure',
          },
        ],
      },
      shaders: {
        title: 'Shaders & Materials',
        description: 'Custom materials drive the magical aesthetic with procedural patterns and animated effects.',
        items: [
          'Procedural sigil generator using layered noise and math operations',
          'Animated reveal system with customizable edge glow',
          'Distortion material for heat haze and magical warping',
          'Emissive pulse system synced to gameplay events',
        ],
        media: [
          {
            type: 'image',
            src: '/placeholders/arcane-material-graph.jpg',
            caption: 'Material function for procedural sigil generation',
          },
        ],
      },
      tools: {
        title: 'Tools & Blueprints',
        description: 'Blueprint systems enable designers to create new spell variations without code changes.',
        items: [
          'Spell definition data assets for easy configuration',
          'Timeline-based sequencer for spell phases',
          'Debug visualization tools for particle bounds and performance',
        ],
      },
      optimization: {
        title: 'Optimization',
        description: 'Performance optimizations ensure the system runs smoothly even with multiple spells active.',
        items: [
          'GPU simulation for all particle systems',
          'Distance-based LOD for particle count and material complexity',
          'Texture atlasing for reduced draw calls',
          'Pooled spawn system for frequently used effects',
        ],
      },
    },
    performance: [
      { metric: 'Particle Count (Max)', before: '50,000', after: '15,000', improvement: '70% reduction' },
      { metric: 'Draw Calls', before: '45', after: '12', improvement: '73% reduction' },
      { metric: 'GPU Time', before: '4.2ms', after: '1.8ms', improvement: '57% faster' },
    ],
    gallery: [
      { type: 'video', src: '/placeholders/arcane-demo-1.mp4', caption: 'Full spell sequence demonstration' },
      { type: 'image', src: '/placeholders/arcane-breakdown-1.jpg', caption: 'Niagara system hierarchy' },
      { type: 'image', src: '/placeholders/arcane-breakdown-2.jpg', caption: 'Material node graph' },
      { type: 'image', src: '/placeholders/arcane-breakdown-3.jpg', caption: 'Blueprint timeline setup' },
    ],
    takeaways: [
      'Modular VFX architecture significantly speeds up iteration and enables easy variation creation',
      'GPU-driven particles are essential for complex magic effects while maintaining performance',
      'Timeline-based orchestration provides precise control over multi-phase spell sequences',
    ],
    engine: 'Unreal',
  },
  {
    slug: 'elemental-impact-vfx-pack',
    title: 'Elemental Impact VFX Pack',
    summary: 'A comprehensive collection of gameplay impact effects featuring arcane, fire, and ice elements with reusable Niagara modules and performance-aware design.',
    role: 'Tech Artist',
    date: '2024',
    tags: ['Niagara', 'VFX', 'Performance', 'Unreal Engine 5'],
    featured: true,
    heroMedia: {
      type: 'video',
      src: '/placeholders/elemental-hero.mp4',
      poster: '/placeholders/elemental-poster.jpg',
    },
    goal: 'Develop a production-ready VFX pack with multiple elemental impact effects that can be easily integrated into any project. The pack needed to support various impact sizes, be highly customizable, and maintain excellent performance on target hardware.',
    whatIBuilt: [
      'Three complete elemental sets (Arcane, Fire, Ice) with 5 impact sizes each',
      'Shared Niagara module library for common behaviors (sparks, debris, shockwaves)',
      'Master material with element-specific parameter collections',
      'Scalability system for automatic quality adjustment based on platform',
      'Integration Blueprint with simple API for spawning effects',
    ],
    breakdown: {
      vfx: {
        title: 'VFX Architecture',
        description: 'The pack uses a hierarchical Niagara system with shared modules for consistency and efficiency.',
        items: [
          'Core impact template with plug-and-play element modules',
          'Shared spark/ember system with element-specific colors and behaviors',
          'Ground decal system with animated fade and distortion',
          'Shockwave ring with customizable profile curves',
          'Secondary debris system with physics-lite simulation',
        ],
        media: [
          {
            type: 'video',
            src: '/placeholders/elemental-vfx-showcase.mp4',
            caption: 'All elemental impacts in sequence',
          },
        ],
      },
      shaders: {
        title: 'Material System',
        description: 'A unified material system allows quick element variations while maintaining visual consistency.',
        items: [
          'Master impact material with element parameter collections',
          'Procedural noise-based distortion for magical feel',
          'Gradient-mapped color system for easy palette swaps',
          'Depth-fade and camera-fade for clean blending',
        ],
      },
      optimization: {
        title: 'Performance',
        description: 'Built from the ground up with performance in mind for use in fast-paced gameplay.',
        items: [
          'Scalability presets (Low/Medium/High/Epic)',
          'Automatic particle count scaling based on impact size',
          'Texture streaming and mip bias optimization',
          'Efficient mesh particle usage for debris',
        ],
      },
    },
    performance: [
      { metric: 'Small Impact GPU', after: '0.3ms' },
      { metric: 'Medium Impact GPU', after: '0.6ms' },
      { metric: 'Large Impact GPU', after: '1.1ms' },
      { metric: 'Memory Footprint', after: '45MB (all elements)' },
    ],
    gallery: [
      { type: 'video', src: '/placeholders/elemental-fire.mp4', caption: 'Fire elemental impacts' },
      { type: 'video', src: '/placeholders/elemental-ice.mp4', caption: 'Ice elemental impacts' },
      { type: 'video', src: '/placeholders/elemental-arcane.mp4', caption: 'Arcane elemental impacts' },
      { type: 'image', src: '/placeholders/elemental-comparison.jpg', caption: 'Size comparison chart' },
    ],
    takeaways: [
      'Shared module architecture enables rapid development of new elemental variants',
      'Building scalability into the system from the start saves significant optimization time later',
      'Clear API design makes integration seamless for gameplay programmers',
    ],
    engine: 'Unreal',
  },
  {
    slug: 'magical-weapon-enhancement',
    title: 'Magical Weapon Enhancement',
    summary: 'A persistent weapon enchantment system featuring dynamic shaders, subtle particle effects, and state-driven intensity that responds to gameplay.',
    role: 'Tech Artist / Shader Developer',
    date: '2023',
    tags: ['Materials', 'Niagara', 'Blueprint', 'Unreal Engine 5'],
    featured: true,
    heroMedia: {
      type: 'video',
      src: '/placeholders/weapon-hero.mp4',
      poster: '/placeholders/weapon-poster.jpg',
    },
    goal: 'Create a visually appealing weapon enchantment system that enhances weapons with magical effects while remaining performant enough for always-on display. The system needed to support multiple enchantment types and respond dynamically to gameplay states.',
    whatIBuilt: [
      'Dynamic material system with state-driven parameter blending',
      'Subtle ambient particle system following weapon mesh bounds',
      'Edge detection shader for magical outline effects',
      'Intensity system responding to combat states (idle, active, charged)',
      'Audio-reactive pulse system for feedback on ability use',
    ],
    breakdown: {
      shaders: {
        title: 'Shader System',
        description: 'The core enchantment effect is driven by a sophisticated material setup with multiple blending layers.',
        items: [
          'Base enchantment layer with animated energy flow',
          'Edge highlight using screen-space derivatives',
          'Fresnel-based intensity boost at glancing angles',
          'State-driven emissive pulse with smooth transitions',
          'UV-independent world-space projection for consistent look',
        ],
        media: [
          {
            type: 'image',
            src: '/placeholders/weapon-material-graph.jpg',
            caption: 'Main enchantment material graph',
          },
        ],
      },
      vfx: {
        title: 'Particle Effects',
        description: 'Subtle particle effects enhance the magical feel without overwhelming the weapon visuals.',
        items: [
          'Mesh-surface spawning for particles following weapon shape',
          'Velocity-based emission intensity',
          'Soft sprite particles with depth blending',
          'Trail system for swing motion',
        ],
      },
      tools: {
        title: 'Integration System',
        description: 'Blueprint interface allows easy integration with any weapon and gameplay system.',
        items: [
          'Enchantment component for simple attachment',
          'Data-driven enchantment definitions',
          'State machine for smooth intensity transitions',
          'Event dispatchers for gameplay integration',
        ],
      },
    },
    performance: [
      { metric: 'Material Instructions', after: '185' },
      { metric: 'Particle Count (Idle)', after: '50' },
      { metric: 'Particle Count (Active)', after: '150' },
      { metric: 'GPU Overhead', after: '0.4ms' },
    ],
    gallery: [
      { type: 'video', src: '/placeholders/weapon-states.mp4', caption: 'Enchantment state transitions' },
      { type: 'video', src: '/placeholders/weapon-combat.mp4', caption: 'In-combat demonstration' },
      { type: 'image', src: '/placeholders/weapon-breakdown-1.jpg', caption: 'Material layer breakdown' },
      { type: 'image', src: '/placeholders/weapon-breakdown-2.jpg', caption: 'Particle system setup' },
    ],
    takeaways: [
      'Persistent effects require careful balance between visual impact and performance cost',
      'State-driven systems add significant depth with minimal additional overhead',
      'Edge effects and fresnel are powerful tools for enhancing magical aesthetics',
    ],
    engine: 'Unreal',
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (currentSlug: string) => {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  return { prev, next };
};
