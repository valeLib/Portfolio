// Configuration constants for the portfolio

// ============================================
// Profile Configuration
// ============================================
// Two builds from one codebase:
// 1. unified - Software-first (Frontend primary, Tech Art secondary)
// 2. gamedev - GameDev-first (Tech Art primary, Frontend minimal)

export const PROFILE = (import.meta.env.VITE_PROFILE || 'unified') as 'unified' | 'gamedev';
export const isUnified = PROFILE === 'unified';
export const isGameDev = PROFILE === 'gamedev';

// Legacy flags for backward compatibility
export const isTechArt = isGameDev;
export const isFrontend = isUnified;

// ============================================
// CV Configuration
// ============================================
export const CV_CONFIG = {
  enabled: import.meta.env.VITE_CV_ENABLED === 'true',
  variant: (import.meta.env.VITE_CV_VARIANT || 'software') as 'software' | 'gamedev',
  
  // CV paths (build-time resolved)
  get path(): string {
    if (this.variant === 'gamedev') {
      return `${import.meta.env.BASE_URL}cv/Valentina_LZ_GameDev_CV.pdf`;
    }
    return `${import.meta.env.BASE_URL}cv/Valentina_LZ_CV.pdf`;
  },
  
  // Download filename
  get filename(): string {
    return this.variant === 'gamedev' 
      ? 'Valentina_LZ_GameDev_CV.pdf'
      : 'Valentina_LZ_CV.pdf';
  },
};

// Legacy export for backward compatibility
export const CV_PDF_PATH = CV_CONFIG.path;

// ============================================
// Asset Paths
// ============================================
export const CAT_MODEL_URL = `${import.meta.env.BASE_URL}models/cat.glb`;

// ============================================
// Site Metadata
// ============================================
export const SITE_CONFIG = isUnified
  ? {
      title: 'Valentina Liberona | Frontend Engineer',
      description: 'Frontend Engineer specializing in React, TypeScript, accessibility, and performant UI systems. Also experienced in Technical Art and Game Development.',
      author: 'Valentina Liberona Zuñiga',
      siteUrl: 'https://valelib.github.io/Portfolio',
      primaryFocus: 'Frontend Engineering',
      secondaryFocus: 'Technical Art & Game Development',
    }
  : {
      title: 'Valentina Liberona | Technical Artist & Game Developer',
      description: 'Technical Artist specializing in Real-time VFX, Shaders, Unity/Unreal Development, and Game Systems.',
      author: 'Valentina Liberona Zuñiga',
      siteUrl: 'https://valelib.github.io/Portfolio/Gamedev',
      primaryFocus: 'Technical Art & VFX',
      secondaryFocus: 'Frontend Engineering',
    };

// ============================================
// Social Links
// ============================================
export const SOCIAL_LINKS = {
  github: 'https://github.com/valeLib',
  linkedin: 'https://linkedin.com/in/valentina-liberona',
  artstation: 'https://artstation.com/valentina_sofia',
  email: 'valentina.liberona@example.com',
};

// ============================================
// Navigation Links
// ============================================
// Unified (software-first): Frontend/Software primary
const unifiedNavLinks = [
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' }
  // { label: 'Tech Art', path: '/tech-art', secondary: true }, // Secondary, last item
];

// GameDev (gamedev-first): Tech Art/GameDev primary
const gamedevNavLinks = [
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/tech-art' }, // Prominent
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
];

export const NAV_LINKS = isUnified ? unifiedNavLinks : gamedevNavLinks;

// ============================================
// Gallery & Tech Art
// ============================================
export const GALLERY_CATEGORIES = ['All', 'VFX', '3D Models', 'Shaders & Tools'] as const;

export const TECH_ART_CATEGORIES = {
  vfx: {
    label: 'VFX',
    description: 'Real-time particle systems, magic effects, and environmental FX',
  },
  models: {
    label: '3D Models',
    description: 'Game-ready assets, stylized characters, and environmental props',
  },
  shaders: {
    label: 'Shaders & Tools',
    description: 'Custom shaders, material systems, and pipeline tools',
  },
};

// ============================================
// Tools & Technologies
// ============================================
export const TOOLS = {
  // Frontend
  frontend: ['React', 'TypeScript', 'Vue', 'Next.js', 'Vite', 'Tailwind CSS'],
  animation: ['GSAP', 'Framer Motion', 'Lottie', 'Three.js', 'Spline'],
  backend: ['Node.js', 'Python', 'Flask', 'PHP/Laravel', 'GraphQL'],
  
  // Game Dev & Tech Art
  engines: ['Unreal Engine 5', 'Unity', 'Blender'],
  vfx: ['Niagara', 'VFX Graph', 'Cascade'],
  shaders: ['HLSL', 'Material Editor', 'Shader Graph', 'OSL'],
  programming: ['Blueprint', 'C++', 'C#', 'Python'],
  other: ['Houdini', 'Substance Designer', 'After Effects', 'DaVinci Resolve'],
};

// ============================================
// Build Info (for debugging)
// ============================================
export const BUILD_INFO = {
  profile: PROFILE,
  cvVariant: CV_CONFIG.variant,
  baseUrl: import.meta.env.BASE_URL,
  mode: import.meta.env.MODE,
};
