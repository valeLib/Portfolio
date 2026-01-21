import { useState, useMemo } from 'react';
import { Section } from '../components/layout';
import { FilterChips } from '../components/ui';
import { GalleryGrid, GalleryModal } from '../components/gallery';
import { useDocumentTitle, useGsapReveal } from '../hooks';
import { galleryItems, getGalleryItemsByCategory, searchGalleryItems } from '../content/gallery';
import { GALLERY_CATEGORIES } from '../config';
import type { GalleryItem, GalleryCategory } from '../types/gallery';

export function Gallery() {
  useDocumentTitle('Gallery');
  const headerRef = useGsapReveal<HTMLDivElement>();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    let items = getGalleryItemsByCategory(selectedCategory as GalleryCategory);
    if (searchQuery.trim()) {
      const searchResults = searchGalleryItems(searchQuery);
      items = items.filter((item) => searchResults.some((r) => r.id === item.id));
    }
    return items;
  }, [selectedCategory, searchQuery]);

  const currentIndex = selectedItem
    ? filteredItems.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    }
  };

  return (
    <>
      {/* Header */}
      <Section className="pb-8">
        <div ref={headerRef}>
          <div data-gsap-reveal className="max-w-3xl mb-8">
            <h1 className="heading-1 mb-4" style={{ color: 'var(--text-heading)' }}>
              <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xl text-dark-400">
              Browse through VFX breakdowns, shader experiments, and 3D assets.
              Click on any item to view in detail.
            </p>
          </div>

          {/* Filters */}
          <div data-gsap-reveal className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <FilterChips
              options={GALLERY_CATEGORIES}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />

            <div className="relative w-full sm:w-auto sm:ml-auto">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full sm:w-64 pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Results count */}
          <p className="text-dark-500 text-sm mt-4">
            Showing {filteredItems.length} of {galleryItems.length} items
          </p>
        </div>
      </Section>

      {/* Gallery Grid */}
      <Section className="pt-0">
        <GalleryGrid items={filteredItems} onItemClick={setSelectedItem} />
      </Section>

      {/* Modal */}
      <GalleryModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < filteredItems.length - 1}
      />
    </>
  );
}
