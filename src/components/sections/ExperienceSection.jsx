import { useState } from 'react';
import { EXPERIENCE } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';

function toComparableValue(point, fallback = 0) {
  if (!point || typeof point.year !== 'number') {
    return fallback;
  }
  const month = typeof point.month === 'number' ? point.month : 1;
  return point.year * 100 + month;
}

function isCurrentRole(job) {
  if (!job.timeline) {
    return false;
  }
  return !job.timeline.to;
}

function compareByTimelineDesc(a, b) {
  const aCurrent = isCurrentRole(a);
  const bCurrent = isCurrentRole(b);

  if (aCurrent !== bCurrent) {
    return aCurrent ? -1 : 1;
  }

  const aTo = toComparableValue(a.timeline?.to, 0);
  const bTo = toComparableValue(b.timeline?.to, 0);
  if (aTo !== bTo) {
    return bTo - aTo;
  }

  const aFrom = toComparableValue(a.timeline?.from, 0);
  const bFrom = toComparableValue(b.timeline?.from, 0);
  return bFrom - aFrom;
}

function formatPeriod(job) {
  if (job.period) {
    return job.period;
  }

  const fromYear = job.timeline?.from?.year;
  const toYear = job.timeline?.to?.year;

  if (typeof fromYear !== 'number') {
    return '';
  }

  return `${fromYear} - ${typeof toYear === 'number' ? toYear : 'Present'}`;
}

export default function ExperienceSection({ experience, usingFirestore }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const experienceItems = experience?.length ? experience : EXPERIENCE;
  const sortedExperienceItems = [...experienceItems].sort(compareByTimelineDesc);
  const maxVisibleItems = 3;
  const hasHiddenItems = sortedExperienceItems.length > maxVisibleItems;
  const canShowFullHistory = Boolean(usingFirestore);
  const canExpand = canShowFullHistory && hasHiddenItems;
  const visibleExperienceItems =
    (canExpand && isExpanded) || !hasHiddenItems
      ? sortedExperienceItems
      : sortedExperienceItems.slice(0, maxVisibleItems);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="A history of building products that matter.">
          Work Experience
        </SectionTitle>
        <div className="space-y-12">
          {visibleExperienceItems.map((job) => {
            const hasCompanyLink =
              typeof job.companyLink === 'string' && job.companyLink.trim().length > 0;
            const periodText = formatPeriod(job);
            const fallbackPeriodKey =
              periodText || `${job.timeline?.from?.year ?? 'na'}-${job.timeline?.to?.year ?? 'now'}`;

            return (
              <div
                key={job.id ?? `${job.company}-${job.role}-${fallbackPeriodKey}`}
                className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
              >
                <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-orange-500" />
                <div className="mb-1 text-orange-500 font-mono text-sm uppercase">
                  {periodText}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {job.role}
                </h3>
                <div className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-4">
                  {hasCompanyLink ? (
                    <a
                      href={job.companyLink}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      referrerPolicy="no-referrer"
                      className="hover:text-orange-500 transition-colors"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {job.desc}
                </p>
              </div>
            );
          })}
        </div>
        {canExpand ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-5 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:border-orange-400/60 transition-colors"
            >
              {isExpanded ? 'Show less' : `Show more (${sortedExperienceItems.length - maxVisibleItems})`}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
