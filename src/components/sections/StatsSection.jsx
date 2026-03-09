import { Award, Code, Server, Star, Users, Zap } from 'lucide-react';
import { STATS } from '../../data/portfolioData';

const ICONS = {
  Award,
  Code,
  Server,
  Star,
  Users,
  Zap,
};

export default function StatsSection({ stats }) {
  const statsItems = stats?.length ? stats : STATS;

  return (
    <section
      id="stats"
      className="py-12 px-6 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
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
