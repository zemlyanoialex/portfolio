import {
  BriefcaseBusiness,
  FileText,
  Github,
  Linkedin,
  Twitch,
  Twitter,
} from 'lucide-react';
import TechIconMini from '../ui/TechIconMini';
import { DEFAULT_PROFILE } from '../../data/portfolioData';

export default function HeroSection({ profile }) {
  const profileData = {
    ...DEFAULT_PROFILE,
    ...profile,
  };
  const socialLinks = profileData.socialLinks || {};
  const socialItems = [
    {
      key: 'upwork',
      label: 'Upwork',
      href: socialLinks.upwork,
      icon: BriefcaseBusiness,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: socialLinks.linkedin,
      icon: Linkedin,
    },
    {
      key: 'github',
      label: 'GitHub',
      href: socialLinks.github,
      icon: Github,
    },
    {
      key: 'x',
      label: 'X',
      href: socialLinks.x,
      icon: Twitter,
    },
    {
      key: 'twitch',
      label: 'Twitch',
      href: socialLinks.twitch,
      icon: Twitch,
    },
  ].filter((item) => typeof item.href === 'string' && item.href.trim() && item.href.trim() !== '#');

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
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <TechIconMini
                  key={item.key}
                  icon={Icon}
                  label={item.label}
                  href={item.href}
                />
              );
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
                export async function <span className="text-blue-300">buildProduct</span>(idea) {'{'}
              </p>
              <p className="pl-4">
                <span className="text-purple-400">const</span> scope = await refine(idea);
              </p>
              <p className="pl-4">
                <span className="text-purple-400">const</span> mvp = await ship(scope);
              </p>
              <p className="pl-4">
                await listenToUsers(mvp);
              </p>
              <p className="pl-4 text-emerald-300">
                {'// Bugs are just feature requests in disguise :)'}
              </p>
              <p className="pl-4 text-purple-400">
                return iterate(mvp);
              </p>
              <p>{'}'}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-orange-500/10 blur-[100px] -z-10"></div>
        </div>
      </div>
    </section>
  );
}
