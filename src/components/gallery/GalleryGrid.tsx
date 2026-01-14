import type { GalleryItem } from '../../types/gallery';

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-800 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-dark-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-dark-400">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} onClick={() => onItemClick(item)} />
      ))}
    </div>
  );
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

function GalleryCard({ item, onClick }: GalleryCardProps) {
  const isVideo = item.type === 'video' || item.type === 'turntable';

  return (
    <button
      onClick={onClick}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-dark-800 text-left w-full focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-dark-900"
    >
      {/* Thumbnail */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Video indicator */}
      {isVideo && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-dark-900/60 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Category badge */}
      <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-dark-900/60 backdrop-blur-sm rounded-md text-dark-200">
        {item.category}
      </span>

      {/* Content (shown on hover) */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="text-white font-semibold mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-dark-300 text-sm line-clamp-2">{item.caption}</p>
        {item.engine && (
          <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-accent-500/20 text-accent-400 rounded">
            {item.engine}
          </span>
        )}
      </div>
    </button>
  );
}
