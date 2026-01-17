import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection, HomeScrollStack } from '../components/home';
import { useDocumentTitle } from '../hooks';
import { getFeaturedProjects } from '../content/projects';
import { getLatestGalleryItems } from '../content/gallery';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  useDocumentTitle();

  const featuredProjects = getFeaturedProjects();
  const latestGallery = getLatestGalleryItems(6);

  return (
    <>
      {/* Hero Section with pinned scroll animation */}
      <HeroSection />

      {/* Post-hero scroll stack - all sections in one pinned container */}
      <HomeScrollStack
        featuredProjects={featuredProjects}
        latestGallery={latestGallery}
      />
    </>
  );
}
