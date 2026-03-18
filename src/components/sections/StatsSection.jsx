import { Award, Code, Languages, MapPin, Server, Star, Users, Zap } from 'lucide-react';
import { STATS } from '../../data/portfolioData';

const ICONS = {
  Award,
  Code,
  Languages,
  MapPin,
  Server,
  Star,
  Users,
  Zap,
};

function normalizeMonth(monthValue) {
  if (typeof monthValue !== 'number' || Number.isNaN(monthValue)) {
    return 1;
  }
  return Math.min(12, Math.max(1, monthValue));
}

function getStartPoint(job) {
  const from = job?.timeline?.from;
  if (from && typeof from.year === 'number') {
    return {
      year: from.year,
      month: normalizeMonth(from.month),
    };
  }

  if (typeof job?.period === 'string') {
    const yearMatch = job.period.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      return { year: Number(yearMatch[0]), month: 1 };
    }
  }

  return null;
}

function calculateYearsExperience(experienceItems) {
  if (!Array.isArray(experienceItems) || !experienceItems.length) {
    return null;
  }

  let earliestStart = null;
  for (const job of experienceItems) {
    const startPoint = getStartPoint(job);
    if (!startPoint) {
      continue;
    }

    const comparable = startPoint.year * 100 + startPoint.month;
    if (!earliestStart || comparable < earliestStart.comparable) {
      earliestStart = { ...startPoint, comparable };
    }
  }

  if (!earliestStart) {
    return null;
  }

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const totalMonths =
    (nowYear - earliestStart.year) * 12 + (nowMonth - earliestStart.month) + 1;

  const years = Math.max(1, Math.floor(totalMonths / 12));
  return `${years}+`;
}

function calculateProjectsCompleted(projectItems) {
  if (!Array.isArray(projectItems) || !projectItems.length) {
    return null;
  }
  return String(projectItems.length);
}

export default function StatsSection({ stats, experience, projects }) {
  const yearsExpValue = calculateYearsExperience(experience);
  const projectsCompletedValue = calculateProjectsCompleted(projects);
  const sourceStats = Array.isArray(stats) ? stats : [];
  const sourceStatsByLabel = new Map(sourceStats.map((item) => [item.label, item]));
  const statsItems = STATS.map((defaultStat) => {
    const stat = sourceStatsByLabel.get(defaultStat.label) || defaultStat;
    if (stat.label === 'Years Exp' && yearsExpValue) {
      return { ...stat, value: yearsExpValue };
    }
    if (stat.label === 'Projects Completed' && projectsCompletedValue) {
      return { ...stat, value: projectsCompletedValue };
    }
    return stat;
  });
  const largeGridClass = statsItems.length > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4';

  return (
    <section
      id="stats"
      className="py-12 px-6 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50"
    >
      <div className={`max-w-7xl mx-auto grid grid-cols-2 ${largeGridClass} gap-8`}>
        {statsItems.map((stat) => {
          const Icon = ICONS[stat.icon] || Code;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
