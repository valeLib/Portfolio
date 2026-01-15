// Re-export profile from the profiles module
// This maintains backwards compatibility with existing imports
export { profile, techArtProfile, frontendProfile } from './profiles';
export type { ProfileBase, CurrentProfile } from './profiles';
