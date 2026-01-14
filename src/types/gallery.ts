export type GalleryCategory = 'VFX' | 'Shaders' | '3D Models' | 'Tools' | 'All';

export type GalleryItemType = 'image' | 'video' | 'turntable' | 'gif';

export type Engine = 'Unreal' | 'Unity' | 'Blender';

export interface GalleryItem {
  id: string;
  title: string;
  type: GalleryItemType;
  category: GalleryCategory;
  tags: string[];
  thumbnail: string;
  fullMedia: string;
  caption: string;
  engine?: Engine;
  date?: string;
}
