export default function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-12 md:mb-16 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
