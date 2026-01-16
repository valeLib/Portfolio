// Configuration constants for the portfolio

// Profile configuration from build-time environment variables
export const PROFILE = (import.meta.env.VITE_PROFILE || 'tech-art') as 'tech-art' | 'frontend'
export const CV_ENABLED = import.meta.env.VITE_CV_ENABLED === 'true'
export const isTechArt = PROFILE === 'tech-art'
export const isFrontend = PROFILE === 'frontend'

// CV PDF path - uses Vite's base path automatically
export const CV_PDF_PATH = `${import.meta.env.BASE_URL}cv/Valentina_LZ_CV.pdf`

// Spline 3D scene URL - replace with your own scene
export const SPLINE_SCENE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';

// Site metadata - profile-aware
export const SITE_CONFIG = isTechArt
  ? {
      title: 'Tech Artist Portfolio',
      description: 'Tech Artist specializing in Magic VFX, Shaders, and Real-time Systems',
      author: 'Valentina Liberona',
      siteUrl: 'https://valelib.github.io/Portfolio',
    }
  : {
      title: 'Valentina Liberona | Frontend Engineer',
      description: 'Frontend Engineer specializing in React, TypeScript, accessibility, and performant UI systems',
      author: 'Valentina Liberona',
      siteUrl: 'https://valelib.github.io/Portfolio/Software-Engineer',
    };

// Social links
export const SOCIAL_LINKS = {
  github: 'https://github.com/valeLib',
  linkedin: 'https://linkedin.com/in/valentina-liberona',
  artstation: 'https://artstation.com/valentina_sofia',
  email: 'valentina.liberona@example.com',
};

// Navigation links - profile-aware
const techArtNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const frontendNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const NAV_LINKS = isTechArt ? techArtNavLinks : frontendNavLinks;

// Gallery categories for filtering
export const GALLERY_CATEGORIES = ['All', 'VFX', 'Shaders', '3D Models', 'Tools'] as const;

// Tools and technologies
export const TOOLS = {
  engines: ['Unreal Engine 5', 'Unity', 'Blender'],
  vfx: ['Niagara', 'VFX Graph', 'Cascade'],
  shaders: ['HLSL', 'Material Editor', 'Shader Graph', 'OSL'],
  programming: ['Blueprint', 'C++', 'C#', 'Python'],
  other: ['Houdini', 'Substance Designer', 'After Effects', 'DaVinci Resolve'],
};
