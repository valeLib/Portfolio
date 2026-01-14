import type { GalleryItem, GalleryCategory } from '../types/gallery';

export const galleryItems: GalleryItem[] = [
  // VFX Items (8)
  {
    id: 'vfx-001',
    title: 'Arcane Portal',
    type: 'video',
    category: 'VFX',
    tags: ['Niagara', 'Magic', 'Portal'],
    thumbnail: '/placeholders/gallery/vfx-portal-thumb.jpg',
    fullMedia: '/placeholders/gallery/vfx-portal.mp4',
    caption: 'Procedural portal effect with swirling energy and particle trails',
    engine: 'Unreal',
  },
  {
    id: 'vfx-002',
    title: 'Fire Burst',
    type: 'video',
    category: 'VFX',
    tags: ['Niagara', 'Fire', 'Impact'],
    thumbnail: '/placeholders/gallery/vfx-fire-thumb.jpg',
    fullMedia: '/placeholders/gallery/vfx-fire.mp4',
    caption: 'Explosive fire burst with ember particles and heat distortion',
    engine: 'Unreal',
  },
  {
    id: 'vfx-003',
    title: 'Ice Crystal Formation',
    type: 'video',
    category: 'VFX',
    tags: ['Niagara', 'Ice', 'Growth'],
    thumbnail: '/placeholders/gallery/vfx-ice-thumb.jpg',
    fullMedia: '/placeholders/gallery/vfx-ice.mp4',
    caption: 'Animated ice crystal growth with frost spreading effect',
    engine: 'Unreal',
  },
  {
    id: 'vfx-004',
    title: 'Lightning Chain',
    type: 'video',
    category: 'VFX',
    tags: ['Niagara', 'Lightning', 'Electric'],
    thumbnail: '/placeholders/gallery/vfx-lightning-thumb.jpg',
    fullMedia: '/placeholders/gallery/vfx-lightning.mp4',
    caption: 'Chained lightning effect with branching and glow',
    engine: 'Unreal',
  },
  {
    id: 'vfx-005',
    title: 'Healing Aura',
    type: 'video',
    category: 'VFX',
    tags: ['Niagara', 'Healing', 'Buff'],
    thumbnail: '/placeholders/gallery/vfx-heal-thumb.jpg',
    fullMedia: '/placeholders/gallery/vfx-heal.mp4',
    caption: 'Soft healing aura with rising particles and gentle pulse',
    engine: 'Unreal',
  },
  {
    id: 'vfx-006',
    title: 'Dark Energy Orb',
    type: 'video',
    category: 'VFX',
    tags: ['Niagara', 'Dark', 'Magic'],
    thumbnail: '/placeholders/gallery/vfx-dark-thumb.jpg',
    fullMedia: '/placeholders/gallery/vfx-dark.mp4',
    caption: 'Menacing dark energy orb with swirling shadows',
    engine: 'Unreal',
  },
  {
    id: 'vfx-007',
    title: 'Nature Growth',
    type: 'video',
    category: 'VFX',
    tags: ['VFX Graph', 'Nature', 'Growth'],
    thumbnail: '/placeholders/gallery/vfx-nature-thumb.jpg',
    fullMedia: '/placeholders/gallery/vfx-nature.mp4',
    caption: 'Procedural vine growth with leaves and flowers',
    engine: 'Unity',
  },
  {
    id: 'vfx-008',
    title: 'Teleport Effect',
    type: 'video',
    category: 'VFX',
    tags: ['Niagara', 'Teleport', 'Magic'],
    thumbnail: '/placeholders/gallery/vfx-teleport-thumb.jpg',
    fullMedia: '/placeholders/gallery/vfx-teleport.mp4',
    caption: 'Character teleport with disintegration and reassembly',
    engine: 'Unreal',
  },

  // Shaders/Materials Items (6)
  {
    id: 'shader-001',
    title: 'Hologram Shader',
    type: 'image',
    category: 'Shaders',
    tags: ['Material', 'Hologram', 'Sci-Fi'],
    thumbnail: '/placeholders/gallery/shader-holo-thumb.jpg',
    fullMedia: '/placeholders/gallery/shader-holo.jpg',
    caption: 'Scanline hologram effect with glitch and noise',
    engine: 'Unreal',
  },
  {
    id: 'shader-002',
    title: 'Stylized Water',
    type: 'image',
    category: 'Shaders',
    tags: ['Material', 'Water', 'Stylized'],
    thumbnail: '/placeholders/gallery/shader-water-thumb.jpg',
    fullMedia: '/placeholders/gallery/shader-water.jpg',
    caption: 'Toon-style water shader with foam and caustics',
    engine: 'Unreal',
  },
  {
    id: 'shader-003',
    title: 'Crystal Material',
    type: 'image',
    category: 'Shaders',
    tags: ['Material', 'Crystal', 'Refraction'],
    thumbnail: '/placeholders/gallery/shader-crystal-thumb.jpg',
    fullMedia: '/placeholders/gallery/shader-crystal.jpg',
    caption: 'Subsurface scattering crystal with internal glow',
    engine: 'Unreal',
  },
  {
    id: 'shader-004',
    title: 'Dissolve Effect',
    type: 'image',
    category: 'Shaders',
    tags: ['Material', 'Dissolve', 'Transition'],
    thumbnail: '/placeholders/gallery/shader-dissolve-thumb.jpg',
    fullMedia: '/placeholders/gallery/shader-dissolve.jpg',
    caption: 'Noise-driven dissolve with emissive edge',
    engine: 'Unity',
  },
  {
    id: 'shader-005',
    title: 'Force Field',
    type: 'image',
    category: 'Shaders',
    tags: ['Material', 'Shield', 'Energy'],
    thumbnail: '/placeholders/gallery/shader-shield-thumb.jpg',
    fullMedia: '/placeholders/gallery/shader-shield.jpg',
    caption: 'Hexagonal force field with impact ripples',
    engine: 'Unreal',
  },
  {
    id: 'shader-006',
    title: 'Lava Material',
    type: 'image',
    category: 'Shaders',
    tags: ['Material', 'Lava', 'Procedural'],
    thumbnail: '/placeholders/gallery/shader-lava-thumb.jpg',
    fullMedia: '/placeholders/gallery/shader-lava.jpg',
    caption: 'Flowing lava with crust formation and emission',
    engine: 'Unreal',
  },

  // 3D Models Items (4)
  {
    id: 'model-001',
    title: 'Magic Staff',
    type: 'turntable',
    category: '3D Models',
    tags: ['Prop', 'Weapon', 'Fantasy'],
    thumbnail: '/placeholders/gallery/model-staff-thumb.jpg',
    fullMedia: '/placeholders/gallery/model-staff.mp4',
    caption: 'Fantasy staff with crystal and intricate metal work',
    engine: 'Blender',
  },
  {
    id: 'model-002',
    title: 'Potion Bottles',
    type: 'turntable',
    category: '3D Models',
    tags: ['Prop', 'Potion', 'Fantasy'],
    thumbnail: '/placeholders/gallery/model-potions-thumb.jpg',
    fullMedia: '/placeholders/gallery/model-potions.mp4',
    caption: 'Set of magical potion bottles with liquid shaders',
    engine: 'Blender',
  },
  {
    id: 'model-003',
    title: 'Rune Stone',
    type: 'image',
    category: '3D Models',
    tags: ['Prop', 'Magic', 'Environment'],
    thumbnail: '/placeholders/gallery/model-rune-thumb.jpg',
    fullMedia: '/placeholders/gallery/model-rune.jpg',
    caption: 'Ancient rune stone with emissive carved symbols',
    engine: 'Blender',
  },
  {
    id: 'model-004',
    title: 'Spell Book',
    type: 'image',
    category: '3D Models',
    tags: ['Prop', 'Book', 'Fantasy'],
    thumbnail: '/placeholders/gallery/model-book-thumb.jpg',
    fullMedia: '/placeholders/gallery/model-book.jpg',
    caption: 'Animated spell book with glowing pages',
    engine: 'Blender',
  },
];

export const getGalleryItemsByCategory = (category: GalleryCategory): GalleryItem[] => {
  if (category === 'All') return galleryItems;
  return galleryItems.filter((item) => item.category === category);
};

export const getGalleryItemById = (id: string): GalleryItem | undefined => {
  return galleryItems.find((item) => item.id === id);
};

export const getLatestGalleryItems = (count: number = 6): GalleryItem[] => {
  return galleryItems.slice(0, count);
};

export const searchGalleryItems = (query: string): GalleryItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return galleryItems.filter(
    (item) =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.caption.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
