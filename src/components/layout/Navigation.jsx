import { Moon, Sun } from 'lucide-react';
import { DEFAULT_PROFILE, NAV_ITEMS } from '../../data/portfolioData';

function labelForSection(sectionId) {
  return sectionId === 'updates'
    ? 'X Updates'
    : sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
}

export default function Navigation({
  activeSection,
  selectedPost,
  darkMode,
  onToggleDarkMode,
  onScrollTo,
  navItems,
  profile,
}) {
  const items = navItems?.length ? navItems : NAV_ITEMS;
  const profileData = {
    ...DEFAULT_PROFILE,
    ...profile,
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-6">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onScrollTo('intro')}
        >
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            {profileData.brandInitial}
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            {profileData.brandName}
            <span className="text-orange-500">{profileData.brandAccent}</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-full">
          {items.map((sectionId) => (
            <button
              key={sectionId}
              onClick={() => onScrollTo(sectionId)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeSection === sectionId && !selectedPost
                  ? 'bg-white dark:bg-orange-500 text-orange-600 dark:text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-orange-500'
              }`}
            >
              {labelForSection(sectionId)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={darkMode}
            className="h-11 w-11 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-orange-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <a
            href={`mailto:${profileData.email}`}
            className="hidden lg:block px-5 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
