export interface BreakdownSection {
  title: string;
  description: string;
  items?: string[];
  media?: MediaItem[];
}

export interface MediaItem {
  type: 'image' | 'video' | 'gif';
  src: string;
  caption?: string;
  thumbnail?: string;
}

export interface PerformanceRow {
  metric: string;
  before?: string;
  after: string;
  improvement?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  date: string;
  tags: string[];
  featured: boolean;
  heroMedia: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
  goal: string;
  whatIBuilt: string[];
  breakdown: {
    vfx?: BreakdownSection;
    shaders?: BreakdownSection;
    tools?: BreakdownSection;
    optimization?: BreakdownSection;
  };
  performance?: PerformanceRow[];
  gallery: MediaItem[];
  takeaways: string[];
  engine: 'Unreal' | 'Unity' | 'Blender' | 'Multiple';
}
