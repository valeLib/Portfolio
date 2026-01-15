// Configuration constants for the portfolio

// Spline 3D scene URL - replace with your own scene
export const SPLINE_SCENE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';

// Site metadata
export const SITE_CONFIG = {
  title: 'Tech Artist Portfolio',
  description: 'Tech Artist specializing in Magic VFX, Shaders, and Real-time Systems',
  author: 'Tech Artist',
  siteUrl: 'https://valeLib.github.io/Portflio',
};

// Social links
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  artstation: 'https://artstation.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'your.email@example.com',
};

// Navigation links
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

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
