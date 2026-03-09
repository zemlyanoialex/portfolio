import { ImageIcon, X } from 'lucide-react';

export default function GalleryModal({
  open,
  title,
  images,
  onClose,
}) {
  if (!open) return null;
  const imageItems = images || [];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>
        <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border border-slate-800">
          <div className={`w-full h-full ${imageItems[0] || 'bg-slate-700'} flex items-center justify-center`}>
            <ImageIcon className="w-16 h-16 text-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
