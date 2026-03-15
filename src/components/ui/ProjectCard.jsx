import { useEffect, useState } from 'react';
import { ExternalLink, Layers } from 'lucide-react';

const STACK_POSITIONS = [
  { r: -12, x: -20, y: -15 },
  { r: 8, x: 15, y: 10 },
  { r: -4, x: 10, y: -20 },
  { r: 15, x: -10, y: 15 },
];

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
        className={`absolute inset-0 rounded-xl shadow-xl border-4 border-white dark:border-slate-800 ${
          normalizedItem.className || 'bg-slate-700'
        } transform transition-all duration-500 ease-out`}
        style={style}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 rounded-xl shadow-xl border-4 border-white dark:border-slate-800 overflow-hidden bg-slate-700 transform transition-all duration-500 ease-out"
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
  const projectTags = tags || [];
  const hasLiveLink =
    !isArchived && typeof link === 'string' && link.trim().length > 0 && link.trim() !== '#';

  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-orange-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full">
      <div
        className="relative h-72 bg-slate-50 dark:bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={() => onOpenGallery(images || [], title)}
      >
        <div className="relative w-48 h-36 md:w-56 md:h-40 pointer-events-none">
          {previewImages
            .slice()
            .reverse()
            .map((imageItem, index) => {
              const revIdx = previewImages.length - 1 - index;
              const { r, x, y } = STACK_POSITIONS[revIdx];
              return (
                <PreviewStackItem
                  key={`${title}-${index}`}
                  item={imageItem}
                  style={{
                    transform: `rotate(${r}deg) translate(${x}px, ${y}px)`,
                    zIndex: 10 - revIdx,
                    opacity: 1 - revIdx * 0.1,
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
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-orange-500 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
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
