// Profile selector - exports the correct profile based on VITE_PROFILE

import { PROFILE } from '../../config';
import { techArtProfile } from './tech-art';
import { frontendProfile } from './frontend';

// Skill type
export interface Skill {
  name: string;
  level: string;
  primary?: boolean;
}

// Common profile type for shared properties
export interface ProfileBase {
  name: string;
  fullName?: string;
  title: string;
  tagline: string;
  roles?: string[];
  heroHeadline: string;
  heroSubheadline: string;
  bio: string;
  bioExtended: string;
  focusAreas: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  skills: Record<string, Skill[]>;
  showShowreel: boolean;
  showGallery: boolean;
  showExperience: boolean;
  showProjects: boolean;
  availability: string;
  location: string;
  // Optional properties that may exist on specific profiles
  frontend?: {
    note: string;
    skills: string[];
  };
  techArt?: {
    note: string;
    skills: string[];
  };
}

// Export the current profile based on build-time environment
// Cast to ProfileBase for consistent typing across the app
export const profile: ProfileBase = PROFILE === 'frontend'
  ? (frontendProfile as unknown as ProfileBase)
  : (techArtProfile as unknown as ProfileBase);

// Re-export individual profiles for direct access if needed
export { techArtProfile, frontendProfile };

// Type helper
export type CurrentProfile = ProfileBase;
