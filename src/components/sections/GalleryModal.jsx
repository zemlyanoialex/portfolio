import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageIcon, X } from 'lucide-react';

function normalizeGalleryItem(item) {
  if (typeof item === 'string') {
    return { type: 'gradient', className: item };
  }

  if (item?.type === 'gradient') {
    return {
      type: 'gradient',
      className: item.className || 'bg-slate-700',
    };
  }

  return {
    type: 'image',
    src: typeof item?.src === 'string' ? item.src : '',
    fallbackSrc: typeof item?.fallbackSrc === 'string' ? item.fallbackSrc : '',
    alt: item?.alt || 'Project image preview',
  };
}

export default function GalleryModal({
  open,
  title,
  images,
  onClose,
}) {
  const imageItems = images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = normalizeGalleryItem(imageItems[currentIndex]);
  const initialSrc = currentImage.src || currentImage.fallbackSrc || '';
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const hasMultipleImages = imageItems.length > 1;

  useEffect(() => {
    setCurrentSrc(initialSrc);
  }, [initialSrc]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setCurrentIndex(0);
  }, [open, title, imageItems.length]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (!hasMultipleImages) {
        return;
      }
      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + imageItems.length) % imageItems.length);
      }
      if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % imageItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, hasMultipleImages, imageItems.length]);

  const goToPrevious = () => {
    if (!hasMultipleImages) {
      return;
    }
    setCurrentIndex((prev) => (prev - 1 + imageItems.length) % imageItems.length);
  };

  const goToNext = () => {
    if (!hasMultipleImages) {
      return;
    }
    setCurrentIndex((prev) => (prev + 1) % imageItems.length);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="h-11 w-11 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border border-slate-800">
          {currentImage.type === 'gradient' || !currentSrc ? (
            <div
              className={`w-full h-full ${
                currentImage.className || 'bg-slate-700'
              } flex items-center justify-center`}
            >
              <ImageIcon className="w-16 h-16 text-white/10" />
            </div>
          ) : (
            <img
              src={currentSrc}
              alt={currentImage.alt}
              className="w-full h-full object-cover"
              onError={() => {
                if (
                  currentImage.fallbackSrc &&
                  currentSrc !== currentImage.fallbackSrc
                ) {
                  setCurrentSrc(currentImage.fallbackSrc);
                  return;
                }
                setCurrentSrc('');
              }}
            />
          )}

          {hasMultipleImages ? (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-black/45 hover:bg-black/70 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-black/45 hover:bg-black/70 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-xs text-white font-medium">
                {currentIndex + 1} / {imageItems.length}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
