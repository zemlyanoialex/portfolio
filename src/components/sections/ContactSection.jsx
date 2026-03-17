import { Mail, Phone, Send } from 'lucide-react';
import { DEFAULT_PROFILE } from '../../data/portfolioData';

export default function ContactSection({ profile }) {
  const profileData = {
    ...DEFAULT_PROFILE,
    ...profile,
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 md:p-16 shadow-2xl overflow-hidden">
          <h2 className="text-3xl font-bold mb-10 text-center">Let's build something.</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 min-w-0">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Email</div>
                <span className="text-sm font-bold break-all">{profileData.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 min-w-0">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Phone</div>
                <span className="text-sm font-bold break-words">{profileData.phone}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <a
              href={`mailto:${profileData.email}`}
              className="w-full bg-orange-500 text-white font-black py-5 rounded-xl hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Send className="w-5 h-5" /> Send Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
