import React, { useEffect, useState } from 'react';
import Navigation from './components/layout/Navigation';
import ContactSection from './components/sections/ContactSection';
import ClientsSection from './components/sections/ClientsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import GalleryModal from './components/sections/GalleryModal';
import HeroSection from './components/sections/HeroSection';
import PortfolioSection from './components/sections/PortfolioSection';
import SiteFooter from './components/sections/SiteFooter';
import StatsSection from './components/sections/StatsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import { SECTION_IDS } from './data/portfolioData';
import usePortfolioContent from './hooks/usePortfolioContent';

const HIDDEN_SECTION_IDS = new Set(['updates', 'blog']);

function ensureSectionBefore(sectionIds, targetSectionId, beforeSectionId) {
  const withoutTarget = sectionIds.filter((sectionId) => sectionId !== targetSectionId);
  const beforeIndex = withoutTarget.indexOf(beforeSectionId);

  if (beforeIndex === -1) {
    return [...withoutTarget, targetSectionId];
  }

  return [
    ...withoutTarget.slice(0, beforeIndex),
    targetSectionId,
    ...withoutTarget.slice(beforeIndex),
  ];
}

function normalizeSections(sectionIds, hasTestimonials) {
  const base = Array.isArray(sectionIds) ? sectionIds : [];
  if (!hasTestimonials) {
    return base.filter((sectionId) => sectionId !== 'testimonials');
  }
  return ensureSectionBefore(base, 'testimonials', 'contact');
}

export default function App() {
  const { content, error, loading, usingFirestore } = usePortfolioContent();
  const hasTestimonials = Array.isArray(content.testimonials)
    && content.testimonials.some(
      (item) =>
        !item?.isHidden
        && typeof item?.quote === 'string'
        && item.quote.trim().length > 0
    );
  const configuredSectionIds = content.siteConfig?.sectionIds?.length
    ? content.siteConfig.sectionIds
    : SECTION_IDS;
  const normalizedSectionIds = normalizeSections(configuredSectionIds, hasTestimonials);
  const sectionIds = normalizedSectionIds.filter((sectionId) => !HIDDEN_SECTION_IDS.has(sectionId));
  const configuredNavItems = content.siteConfig?.navItems;
  const normalizedNavItems = normalizeSections(
    configuredNavItems?.length ? configuredNavItems : sectionIds,
    hasTestimonials
  );
  const navItems = normalizedNavItems.filter((sectionId) => !HIDDEN_SECTION_IDS.has(sectionId));

  const [activeSection, setActiveSection] = useState('intro');
  const [darkMode, setDarkMode] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [currentGalleryTitle, setCurrentGalleryTitle] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const openGallery = (images, title) => {
    setCurrentGalleryImages(images);
    setCurrentGalleryTitle(title);
    setGalleryOpen(true);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300">
        <Navigation
          activeSection={activeSection}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((prev) => !prev)}
          onScrollTo={scrollTo}
          navItems={navItems}
          profile={content.profile}
        />

        <HeroSection profile={content.profile} />
        <StatsSection
          stats={content.stats}
          experience={content.experience}
          projects={content.projects}
        />
        <ClientsSection clients={content.clients} />
        <ExperienceSection
          experience={content.experience}
          usingFirestore={usingFirestore}
        />
        <PortfolioSection
          projects={content.projects}
          projectImages={content.projectImages}
          onOpenGallery={openGallery}
        />
        {hasTestimonials ? (
          <TestimonialsSection testimonials={content.testimonials} />
        ) : null}
        <ContactSection profile={content.profile} />
        <SiteFooter profile={content.profile} />

        <GalleryModal
          open={galleryOpen}
          title={currentGalleryTitle}
          images={currentGalleryImages}
          onClose={() => setGalleryOpen(false)}
        />

        <div className="fixed bottom-4 right-4 text-[10px] uppercase tracking-widest font-mono px-3 py-2 rounded-full border bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 text-slate-500 backdrop-blur-md">
          {loading
            ? 'Checking updates...'
            : usingFirestore
              ? 'Live content'
              : 'Local preview'}
          {error ? ' (sync issue)' : ''}
        </div>
      </div>
    </div>
  );
}
