import { ArrowLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { BLOG_POSTS } from '../../data/portfolioData';
import SectionTitle from '../ui/SectionTitle';

export default function BlogSection({ selectedPost, onSelectPost, blogPosts }) {
  const posts = blogPosts?.length ? blogPosts : BLOG_POSTS;

  return (
    <section
      id="blog"
      className="py-24 px-6 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-4xl mx-auto">
        {!selectedPost ? (
          <>
            <SectionTitle subtitle="Deep dives into software architecture and performance.">
              Technical Blog
            </SectionTitle>
            <div className="grid gap-6">
              {posts.map((post) => (
                <button
                  key={post.id ?? post.title}
                  onClick={() =>
                    post.external
                      ? window.open(post.url, '_blank')
                      : onSelectPost(post)
                  }
                  className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-orange-500 transition-all flex flex-col md:flex-row items-center justify-between"
                >
                  <div className="max-w-2xl">
                    <span className="text-xs font-mono text-orange-500 mb-2 block uppercase tracking-widest">
                      {post.date}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-orange-500 group-hover:translate-x-2 transition-all">
                    {post.external ? (
                      <ExternalLink className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-6 h-6" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => onSelectPost(null)}
              className="flex items-center gap-2 text-orange-500 mb-8 font-bold hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> Back to blog
            </button>
            <article className="prose dark:prose-invert max-w-none">
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
                {selectedPost.title}
              </h1>
              <div className="flex gap-4 text-xs font-mono text-slate-400 mb-8 uppercase">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime || '5 min'} read</span>
              </div>
              <div className="text-xl text-slate-600 dark:text-slate-400 leading-loose space-y-8">
                <p className="p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl border-l-4 border-orange-500 italic">
                  "{selectedPost.excerpt}"
                </p>
                <p>{selectedPost.content || 'Content coming soon.'}</p>
                <p>
                  Building high-performance applications requires more than just
                  clean code; it requires an understanding of how data flows
                  through your system. Whether it's managing memory with streams
                  or minimizing re-renders in the frontend, the goal is always
                  to provide the most efficient experience for the end user.
                </p>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
