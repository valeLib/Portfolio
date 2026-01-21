// Profile selector - exports the correct profile based on VITE_PROFILE
// Unified (software-first) vs GameDev (tech art-first)

import { PROFILE } from '../../config';
import { unifiedProfile } from './unified';
import { gamedevProfile } from './gamedev';

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
  primaryFocus: string;
  secondaryFocus: string;
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
  showTechArtSection: boolean;
  availability: string;
  location: string;
  // Optional properties that may exist on specific profiles
  frontendNote?: {
    title: string;
    description: string;
    skills: string[];
  };
  techArtNote?: {
    title: string;
    description: string;
    skills: string[];
  };
}

// Export the current profile based on build-time environment
// unified → software-first (Frontend primary, Tech Art secondary)
// gamedev → gamedev-first (Tech Art primary, Frontend minimal)
export const profile: ProfileBase = PROFILE === 'unified'
  ? (unifiedProfile as unknown as ProfileBase)
  : (gamedevProfile as unknown as ProfileBase);

// Re-export individual profiles for direct access if needed
export { unifiedProfile, gamedevProfile };

// Legacy exports for backward compatibility
export const frontendProfile = unifiedProfile;
export const techArtProfile = gamedevProfile;

// Type helper
export type CurrentProfile = ProfileBase;
