import { MessageSquare, Twitter } from 'lucide-react';
import { DEFAULT_PROFILE, TWEETS } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';

export default function UpdatesSection({ updates, profile }) {
  const updatesFeed = updates?.length ? updates : TWEETS;
  const profileData = {
    ...DEFAULT_PROFILE,
    ...profile,
  };

  return (
    <section id="updates" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle subtitle="Real-time development log and architecture thoughts.">
          X Updates
        </SectionTitle>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
                {profileData.brandInitial}
              </div>
              <span className="font-bold text-sm">{profileData.updatesHandle}</span>
            </div>
            <Twitter className="w-5 h-5 text-sky-500" />
          </div>
          {updatesFeed.map((tweet) => (
            <div
              key={tweet.id ?? `${tweet.date}-${tweet.text}`}
              className="p-6 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex justify-between mb-2 text-xs font-mono text-slate-400">
                <span>{tweet.date}</span>
                <MessageSquare className="w-4 h-4" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {tweet.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
