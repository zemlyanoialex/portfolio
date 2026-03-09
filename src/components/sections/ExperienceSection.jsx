import { EXPERIENCE } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';

export default function ExperienceSection({ experience }) {
  const experienceItems = experience?.length ? experience : EXPERIENCE;

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="A history of building products that matter.">
          Work Experience
        </SectionTitle>
        <div className="space-y-12">
          {experienceItems.map((job) => (
            <div
              key={job.id ?? `${job.company}-${job.period}`}
              className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
            >
              <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-orange-500" />
              <div className="mb-1 text-orange-500 font-mono text-sm uppercase">
                {job.period}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {job.role}
              </h3>
              <div className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-4">
                {job.company}
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {job.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
