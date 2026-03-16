import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Layers } from 'lucide-react';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function createSeededRandom(seedValue) {
  let seed = seedValue >>> 0;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function createStackLayouts(seedKey, count) {
  if (!count) {
    return [];
  }

  const random = createSeededRandom(hashString(seedKey));

  return Array.from({ length: count }, () => {
    const width = 84 + random() * 12;
    const height = 72 + random() * 18;
    const centerLeft = (100 - width) / 2;
    const centerTop = (100 - height) / 2;

    return {
      width,
      height,
      left: clamp(centerLeft + (random() - 0.5) * 12, 0, 100 - width),
      top: clamp(centerTop + (random() - 0.5) * 14, 0, 100 - height),
      x: (random() - 0.5) * 30,
      y: (random() - 0.5) * 24,
      rotation: (random() - 0.5) * 36,
      scale: 0.92 + random() * 0.14,
    };
  });
}

function normalizePreviewItem(item) {
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
    alt: item?.alt || 'Project preview image',
  };
}

function PreviewStackItem({ item, style }) {
  const normalizedItem = normalizePreviewItem(item);
  const initialSrc = normalizedItem.src || normalizedItem.fallbackSrc || '';
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  useEffect(() => {
    setCurrentSrc(initialSrc);
  }, [initialSrc]);

  if (normalizedItem.type === 'gradient' || !currentSrc) {
    return (
      <div
        className={`absolute rounded-xl shadow-xl border-4 border-white dark:border-slate-800 ${
          normalizedItem.className || 'bg-slate-700'
        } transform transition-all duration-500 ease-out`}
        style={style}
      />
    );
  }

  return (
    <div
      className="absolute rounded-xl shadow-xl border-4 border-white dark:border-slate-800 overflow-hidden bg-slate-700 transform transition-all duration-500 ease-out"
      style={style}
    >
      <img
        src={currentSrc}
        alt={normalizedItem.alt}
        loading="lazy"
        className="w-full h-full object-cover"
        onError={() => {
          if (
            normalizedItem.fallbackSrc &&
            currentSrc !== normalizedItem.fallbackSrc
          ) {
            setCurrentSrc(normalizedItem.fallbackSrc);
            return;
          }
          setCurrentSrc('');
        }}
      />
    </div>
  );
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  isArchived,
  images,
  onOpenGallery,
}) {
  const previewImages = (images || []).slice(0, 4);
  const stackLayouts = useMemo(
    () => createStackLayouts(`${title}-${previewImages.length}`, previewImages.length),
    [title, previewImages.length]
  );
  const projectTags = tags || [];
  const hasLiveLink =
    !isArchived && typeof link === 'string' && link.trim().length > 0 && link.trim() !== '#';
  const openExternalProject = () => {
    if (!hasLiveLink) {
      return;
    }

    const normalizedLink = link.trim();
    if (!/^https?:\/\//i.test(normalizedLink)) {
      return;
    }

    window.open(normalizedLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-orange-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full">
      <div
        className="relative h-72 bg-slate-50 dark:bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={() => onOpenGallery(images || [], title)}
      >
        <div className="relative w-64 h-44 md:w-80 md:h-52 pointer-events-none">
          {previewImages
            .slice()
            .reverse()
            .map((imageItem, index) => {
              const revIdx = previewImages.length - 1 - index;
              const layout = stackLayouts[revIdx];
              return (
                <PreviewStackItem
                  key={`${title}-${index}`}
                  item={imageItem}
                  style={{
                    width: `${layout?.width ?? 90}%`,
                    height: `${layout?.height ?? 82}%`,
                    left: `${layout?.left ?? 5}%`,
                    top: `${layout?.top ?? 8}%`,
                    transform: `translate(${layout?.x ?? 0}px, ${layout?.y ?? 0}px) rotate(${
                      layout?.rotation ?? 0
                    }deg) scale(${layout?.scale ?? 1})`,
                    zIndex: 10 - revIdx,
                    opacity: Math.max(0.56, 1 - revIdx * 0.16),
                  }}
                />
              );
            })}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
            <div className="bg-slate-900/90 text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 backdrop-blur-sm pointer-events-auto">
              <Layers className="w-3.5 h-3.5" /> View Album
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-50 text-xl group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
          {hasLiveLink ? (
            <button
              type="button"
              onClick={openExternalProject}
              className="text-slate-400 hover:text-orange-500 transition-colors"
              aria-label={`Open ${title} website`}
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          ) : null}
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          {projectTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black tracking-widest text-orange-600 dark:text-orange-400 uppercase bg-orange-50 dark:bg-orange-900/10 px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
