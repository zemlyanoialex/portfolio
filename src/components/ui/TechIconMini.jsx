export default function TechIconMini({ icon: Icon, label }) {
  return (
    <div className="relative group cursor-help">
      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all shadow-sm">
        <Icon className="w-4 h-4" />
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
        {label}
      </div>
    </div>
  );
}
