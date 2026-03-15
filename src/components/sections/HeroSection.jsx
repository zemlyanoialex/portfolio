import { Code, Cpu, Database, FileText, Globe, Terminal } from 'lucide-react';
import TechIconMini from '../ui/TechIconMini';
import { DEFAULT_PROFILE, TECH_STACK } from '../../data/portfolioData';

const ICONS = {
  Code,
  Cpu,
  Database,
  Globe,
  Terminal,
};

export default function HeroSection({ profile, techStack }) {
  const profileData = {
    ...DEFAULT_PROFILE,
    ...profile,
  };
  const techItems = techStack?.length ? techStack : TECH_STACK;

  return (
    <section id="intro" className="pt-32 pb-20 md:pt-48 md:pb-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-in slide-in-from-left duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/15 via-orange-400/20 to-orange-500/10 border border-orange-400/30 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_16px_rgba(249,115,22,0.18)]">
            {profileData.openToWorkLabel}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-50 leading-[1.1] mb-6 tracking-tighter">
            {profileData.headingLead} <br />
            <span className="text-orange-500">{profileData.headingHighlight}</span>
          </h1>
          <div className="flex gap-4 mb-8">
            {techItems.map((item) => {
              const Icon = ICONS[item.icon] || Terminal;
              return <TechIconMini key={item.label} icon={Icon} label={item.label} />;
            })}
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            {profileData.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={profileData.resumeUrl}
              target={profileData.resumeUrl.startsWith('http') ? '_blank' : undefined}
              rel={profileData.resumeUrl.startsWith('http') ? 'noreferrer' : undefined}
              className="hover-resume-shake px-8 py-4 rounded-xl bg-orange-500 text-white dark:text-slate-950 font-black text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 active:scale-95"
            >
              <FileText className="w-5 h-5" /> {profileData.resumeLabel}
            </a>
          </div>
        </div>
        <div className="relative animate-in slide-in-from-right duration-700">
          <div className="relative z-10 bg-[#0f1117] rounded-3xl border border-slate-800 p-8 shadow-2xl rotate-2">
            <div className="font-mono text-xs md:text-sm leading-relaxed text-slate-300">
              <p className="text-purple-400">
                export class <span className="text-yellow-200">VerifyEngine</span> {'{'}
              </p>
              <p className="pl-4 text-purple-400">
                async <span className="text-blue-300">processBatch</span>(id: string) {'{'}
              </p>
              <p className="pl-8">
                <span className="text-purple-400">const</span> stream ={' '}
                <span className="text-purple-400">new</span>{' '}
                <span className="text-yellow-200">AuditStream</span>();
              </p>
              <p className="pl-8 text-purple-400">
                return await <span className="text-slate-300">db.docs</span>
                .<span className="text-blue-300">find</span>({'{'} id {'}'})
              </p>
              <p className="pl-12">.pipe(stream).collect();</p>
              <p className="pl-4">{'}'} {'}'}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-orange-500/10 blur-[100px] -z-10"></div>
        </div>
      </div>
    </section>
  );
}
