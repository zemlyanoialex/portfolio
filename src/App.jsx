import React, { useEffect, useState } from 'react';
import Navigation from './components/layout/Navigation';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';
import ExperienceSection from './components/sections/ExperienceSection';
import GalleryModal from './components/sections/GalleryModal';
import HeroSection from './components/sections/HeroSection';
import PortfolioSection from './components/sections/PortfolioSection';
import SiteFooter from './components/sections/SiteFooter';
import StatsSection from './components/sections/StatsSection';
import UpdatesSection from './components/sections/UpdatesSection';
import { SECTION_IDS } from './data/portfolioData';
import usePortfolioContent from './hooks/usePortfolioContent';

export default function App() {
  const { content, error, loading, usingFirestore } = usePortfolioContent();
  const sectionIds = content.siteConfig?.sectionIds?.length
    ? content.siteConfig.sectionIds
    : SECTION_IDS;

  const [activeSection, setActiveSection] = useState('intro');
  const [darkMode, setDarkMode] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [currentGalleryTitle, setCurrentGalleryTitle] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

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

  useEffect(() => {
    const blogPosts = content.blogPosts || [];
    if (
      selectedPost &&
      !blogPosts.some((post) => String(post.id) === String(selectedPost.id))
    ) {
      setSelectedPost(null);
    }
  }, [content.blogPosts, selectedPost]);

  const scrollTo = (sectionId) => {
    setSelectedPost(null);
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
          selectedPost={selectedPost}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((prev) => !prev)}
          onScrollTo={scrollTo}
          navItems={content.siteConfig?.navItems}
          profile={content.profile}
        />

        <HeroSection profile={content.profile} techStack={content.techStack} />
        <StatsSection
          stats={content.stats}
          experience={content.experience}
          projects={content.projects}
        />
        <ExperienceSection
          experience={content.experience}
          usingFirestore={usingFirestore}
        />
        <PortfolioSection
          projects={content.projects}
          projectImages={content.projectImages}
          onOpenGallery={openGallery}
        />
        <UpdatesSection updates={content.updates} profile={content.profile} />
        <BlogSection
          blogPosts={content.blogPosts}
          selectedPost={selectedPost}
          onSelectPost={setSelectedPost}
        />
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
