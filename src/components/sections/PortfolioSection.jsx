import { useEffect, useState } from 'react';
import {
  PORTFOLIO_PROJECTS,
  PROJECT_IMAGES,
} from '../../data/portfolioData';
import ProjectCard from '../ui/ProjectCard';
import SectionTitle from '../ui/SectionTitle';

function getGridColumns(windowWidth) {
  if (windowWidth >= 1024) {
    return 3;
  }
  if (windowWidth >= 768) {
    return 2;
  }
  return 1;
}

function getItemsCountForRows(projects, maxRows, columns, isProjectFeatured) {
  if (!projects.length || maxRows <= 0) {
    return 0;
  }

  let rowsUsed = 1;
  let usedColumnsInRow = 0;
  let count = 0;

  for (const project of projects) {
    const span = isProjectFeatured(project) && columns >= 3 ? 2 : 1;

    if (usedColumnsInRow + span > columns) {
      rowsUsed += 1;
      usedColumnsInRow = 0;
    }

    if (rowsUsed > maxRows) {
      break;
    }

    usedColumnsInRow += span;
    count += 1;
  }

  return count;
}

function storagePathToUrl(pathValue) {
  if (typeof pathValue !== 'string' || !pathValue.trim()) {
    return '';
  }

  const bucket =
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    (process.env.REACT_APP_FIREBASE_PROJECT_ID
      ? `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebasestorage.app`
      : '');

  if (!bucket) {
    return '';
  }

  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    pathValue.trim()
  )}?alt=media`;
}

function resolveMediaUrl(rawUrl, rawPath) {
  if (typeof rawUrl === 'string' && rawUrl.trim()) {
    return rawUrl.trim();
  }
  return storagePathToUrl(rawPath);
}

function normalizeProjectImages(project, imageMap) {
  const mediaImages = Array.isArray(project?.media?.images) ? project.media.images : [];
  if (mediaImages.length) {
    return mediaImages.map((item) => {
      const mainSrc = resolveMediaUrl(item?.webpUrl ?? item?.url, item?.webpPath ?? item?.path);
      const fallbackSrc = resolveMediaUrl(item?.fallbackUrl, item?.fallbackPath);
      const initialSrc = mainSrc || fallbackSrc || '';

      return {
        type: 'image',
        src: initialSrc,
        fallbackSrc: mainSrc && fallbackSrc && fallbackSrc !== mainSrc ? fallbackSrc : '',
        alt: item?.alt || `${project?.title || 'Project'} preview`,
      };
    });
  }

  const legacyImages = imageMap[project?.imageKey] || [];
  return legacyImages.map((item) => ({
    type: 'gradient',
    className: item,
    alt: `${project?.title || 'Project'} preview`,
  }));
}

export default function PortfolioSection({ onOpenGallery, projects, projectImages }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [columns, setColumns] = useState(() => {
    if (typeof window === 'undefined') {
      return 3;
    }
    return getGridColumns(window.innerWidth);
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      setColumns(getGridColumns(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projectItems = projects?.length ? projects : PORTFOLIO_PROJECTS;
  const getProjectSortOrder = (project) => {
    const numericOrder = Number(project?.order);
    return Number.isFinite(numericOrder) ? numericOrder : Number.MAX_SAFE_INTEGER;
  };

  const getProjectSortYear = (project) => {
    if (typeof project?.year === 'number') {
      return project.year;
    }

    if (typeof project?.projectTimeline?.majorRebuildYear === 'number') {
      return project.projectTimeline.majorRebuildYear;
    }

    if (typeof project?.projectTimeline?.startedYear === 'number') {
      return project.projectTimeline.startedYear;
    }

    return 0;
  };

  const visibleProjectItems = projectItems
    .filter((project) => !project?.meta?.isHidden)
    .slice()
    .sort((a, b) => {
      const orderDiff = getProjectSortOrder(a) - getProjectSortOrder(b);
      if (orderDiff !== 0) {
        return orderDiff;
      }

      const yearDiff = getProjectSortYear(b) - getProjectSortYear(a);
      if (yearDiff !== 0) {
        return yearDiff;
      }

      return String(a?.title || '').localeCompare(String(b?.title || ''));
    });
  const imageMap = {
    ...PROJECT_IMAGES,
    ...(projectImages || {}),
  };
  const isProjectFeatured = (project) =>
    Boolean(project?.meta?.isFeatured ?? project?.featured);
  const getProjectLink = (project) => project?.links?.live ?? project?.link ?? '';
  const isProjectArchived = (project) => Boolean(project?.meta?.isArchived);
  const defaultRows = 2;
  const defaultVisibleCount = getItemsCountForRows(
    visibleProjectItems,
    defaultRows,
    columns,
    isProjectFeatured
  );
  const hasCollapsedItems = visibleProjectItems.length > defaultVisibleCount;
  const projectsToRender =
    isExpanded || !hasCollapsedItems
      ? visibleProjectItems
      : visibleProjectItems.slice(0, defaultVisibleCount);

  return (
    <section
      id="portfolio"
      className="py-24 px-6 bg-slate-100 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Engineering challenges turned into functional products.">
          Portfolio
        </SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsToRender.map((project) => (
            <div
              key={project.id ?? project.title}
              className={isProjectFeatured(project) ? 'lg:col-span-2' : ''}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={getProjectLink(project)}
                isArchived={isProjectArchived(project)}
                images={normalizeProjectImages(project, imageMap)}
                onOpenGallery={onOpenGallery}
              />
            </div>
          ))}
        </div>
        {hasCollapsedItems ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-5 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:border-orange-400/60 transition-colors"
            >
              {isExpanded ? 'Show less' : `Show more (${visibleProjectItems.length - defaultVisibleCount})`}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
