import { useEffect, useRef, useCallback } from 'react';
import type { GalleryItem } from '../../types/gallery';
import { Tag } from '../ui/Tag';

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function GalleryModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: GalleryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrev) onPrev();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
      }
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, handleKeyDown]);

  // Focus trap
  useEffect(() => {
    if (!item || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [item]);

  if (!item) return null;

  const isVideo = item.type === 'video' || item.type === 'turntable';

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-950/95 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-3">
            <span className="text-dark-500 text-sm">{item.category}</span>
            {item.engine && (
              <Tag size="sm" variant="accent">
                {item.engine}
              </Tag>
            )}
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-dark-700 transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-heading)'}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Media Container */}
        <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden bg-dark-900">
          {isVideo ? (
            <video
              src={item.fullMedia}
              className="w-full h-full object-contain max-h-[60vh]"
              controls
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img
              src={item.fullMedia}
              alt={item.title}
              className="w-full h-full object-contain max-h-[60vh]"
            />
          )}

          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-900/80 backdrop-blur-sm flex items-center justify-center transition-all ${
              hasPrev
                ? 'hover:bg-dark-800 hover:scale-110'
                : 'opacity-30 cursor-not-allowed'
            }`}
            style={{ color: 'var(--text-heading)' }}
            aria-label="Previous item"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-900/80 backdrop-blur-sm flex items-center justify-center transition-all ${
              hasNext
                ? 'hover:bg-dark-800 hover:scale-110'
                : 'opacity-30 cursor-not-allowed'
            }`}
            style={{ color: 'var(--text-heading)' }}
            aria-label="Next item"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-4 px-2">
          <h2 id="modal-title" className="text-xl font-display font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
            {item.title}
          </h2>
          <p className="text-dark-400 mb-3">{item.caption}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Tag key={tag} size="sm">
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="text-dark-600 text-xs text-center mt-4">
          Use arrow keys to navigate, ESC to close
        </p>
      </div>
    </div>
  );
}
