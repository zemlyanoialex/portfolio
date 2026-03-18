import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { DEFAULT_PROFILE } from '../../data/portfolioData';

export default function SiteFooter({ profile }) {
  const profileData = {
    ...DEFAULT_PROFILE,
    ...profile,
  };
  const socialLinks = profileData.socialLinks || {};

  return (
    <footer className="py-16 border-t border-slate-200 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-950">
      <div className="flex justify-center gap-8 mb-10">
        <a
          href={socialLinks.x || '#'}
          aria-label="X profile"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all hover:scale-110"
        >
          <Twitter className="w-6 h-6" />
        </a>
        <a
          href={socialLinks.linkedin || '#'}
          aria-label="LinkedIn profile"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all hover:scale-110"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href={socialLinks.github || '#'}
          aria-label="GitHub profile"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all hover:scale-110"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href={socialLinks.email || `mailto:${profileData.email}`}
          aria-label="Send email"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-900 dark:text-slate-200 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all hover:scale-110"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
      <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.2em]">
        {profileData.footerText}
      </p>
    </footer>
  );
}
