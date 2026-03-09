import {
  PORTFOLIO_PROJECTS,
  PROJECT_IMAGES,
} from '../../data/portfolioData';
import ProjectCard from '../ui/ProjectCard';
import SectionTitle from '../ui/SectionTitle';

export default function PortfolioSection({ onOpenGallery, projects, projectImages }) {
  const projectItems = projects?.length ? projects : PORTFOLIO_PROJECTS;
  const imageMap = {
    ...PROJECT_IMAGES,
    ...(projectImages || {}),
  };
  const featuredProject = projectItems.find((project) => project.featured);
  const regularProjects = projectItems.filter((project) => !project.featured);

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
          {featuredProject && (
            <div className="lg:col-span-2">
              <ProjectCard
                title={featuredProject.title}
                description={featuredProject.description}
                tags={featuredProject.tags}
                link={featuredProject.link}
                images={imageMap[featuredProject.imageKey] || []}
                onOpenGallery={onOpenGallery}
              />
            </div>
          )}

          {regularProjects.map((project) => (
            <ProjectCard
              key={project.id ?? project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
              images={imageMap[project.imageKey] || []}
              onOpenGallery={onOpenGallery}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
