import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection, HomeScrollStack } from '../components/home';
import { useDocumentTitle } from '../hooks';
import { getFeaturedProjects } from '../content/projects';
import { getAllFrontendProjects } from '../content/frontend-projects';
import { getLatestGalleryItems } from '../content/gallery';
import { isFrontend } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  useDocumentTitle();

  // Get projects based on profile
  const featuredProjects = isFrontend ? null : getFeaturedProjects();
  const frontendProjects = isFrontend ? getAllFrontendProjects().slice(0, 3) : null;
  const latestGallery = getLatestGalleryItems(6);

  return (
    <>
      {/* Hero Section with pinned scroll animation */}
      <HeroSection />

      {/* Post-hero scroll stack - all sections in one pinned container */}
      <HomeScrollStack
        featuredProjects={featuredProjects}
        frontendProjects={frontendProjects}
        latestGallery={latestGallery}
      />
    </>
  );
}
