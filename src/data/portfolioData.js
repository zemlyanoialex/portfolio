export const SECTION_IDS = [
  'intro',
  'stats',
  'experience',
  'portfolio',
  'updates',
  'blog',
  'contact',
];

export const NAV_ITEMS = [
  'intro',
  'experience',
  'portfolio',
  'updates',
  'blog',
  'contact',
];

export const TECH_STACK = [
  { icon: 'Terminal', label: 'Node.js' },
  { icon: 'Cpu', label: 'React' },
  { icon: 'Database', label: 'PostgreSQL' },
  { icon: 'Globe', label: 'Next.js' },
  { icon: 'Code', label: 'TypeScript' },
];

export const STATS = [
  { icon: 'Zap', label: 'Projects Completed', value: '40+' },
  { icon: 'Users', label: 'Happy Clients', value: '25+' },
  { icon: 'Server', label: 'Uptime Managed', value: '99.9%' },
  { icon: 'Code', label: 'Lines of Code', value: '500k+' },
  { icon: 'Star', label: 'Github Stars', value: '1.2k' },
  { icon: 'Award', label: 'Years Exp', value: '6+' },
];

export const EXPERIENCE = [
  {
    company: 'VerifyIt',
    role: 'Lead Engineer / Founder',
    period: '2024 - Present',
    desc: 'Building an automated auditor for corporate knowledge bases using Node.js streams and high-performance crawlers.',
  },
  {
    company: 'TechScale Systems',
    role: 'Senior Backend Developer',
    period: '2021 - 2024',
    desc: 'Scaled microservices to handle 1M+ requests per second. Implemented Redis caching layers and PostgreSQL optimization.',
  },
  {
    company: 'Creative Labs',
    role: 'Full Stack Developer',
    period: '2019 - 2021',
    desc: 'Developed responsive React interfaces and built RESTful APIs for e-commerce platforms.',
  },
];

export const PROJECT_IMAGES = {
  verifyit: [
    'bg-gradient-to-br from-slate-700 to-slate-600',
    'bg-gradient-to-br from-orange-700 to-orange-900',
    'bg-gradient-to-br from-blue-900 to-slate-900',
    'bg-gradient-to-br from-slate-500 to-slate-400',
  ],
  foundry: [
    'bg-gradient-to-br from-emerald-800 to-slate-800',
    'bg-gradient-to-br from-slate-700 to-gray-600',
    'bg-gradient-to-br from-teal-900 to-emerald-900',
  ],
  ecommerce: [
    'bg-gradient-to-br from-indigo-900 to-purple-900',
    'bg-gradient-to-br from-slate-800 to-black',
    'bg-gradient-to-br from-pink-900 to-rose-900',
  ],
  crypto: [
    'bg-gradient-to-br from-gray-900 to-gray-800',
    'bg-gradient-to-br from-amber-900 to-yellow-900',
  ],
};

export const PORTFOLIO_PROJECTS = [
  {
    title: 'VerifyIt',
    description:
      'Automatic auditor for corporate knowledge bases using Node.js. Handles millions of files with a custom streaming engine.',
    tags: ['Node.js', 'PostgreSQL', 'Streams'],
    link: '#',
    imageKey: 'verifyit',
    featured: true,
  },
  {
    title: 'HyperTrade',
    description:
      'High-frequency trading API backend. Sub-ms latency with Redis and optimized Express middleware.',
    tags: ['Express', 'Redis', 'TS'],
    link: '#',
    imageKey: 'ecommerce',
  },
  {
    title: 'Foundry Clone',
    description: 'Visual-heavy interactive landing page architecture.',
    tags: ['React', 'Framer', 'Three.js'],
    link: '#',
    imageKey: 'foundry',
  },
  {
    title: 'EcoSync',
    description: 'E-commerce backend for global distribution.',
    tags: ['Next.js', 'Stripe'],
    link: '#',
    imageKey: 'crypto',
  },
  {
    title: 'Audit Dashboard',
    description: 'Real-time reporting for VerifyIt engine.',
    tags: ['Tailwind', 'Charts'],
    link: '#',
    imageKey: 'verifyit',
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Scaling Node.js Streams for Petabyte Audits',
    date: 'Oct 12, 2025',
    readTime: '12 min',
    excerpt:
      'How we utilized the native Node.js Stream API to process massive knowledge bases.',
    content:
      'When building VerifyIt, the primary challenge was memory management. Standard JSON parsing would load the entire document into memory, causing heap overflows on larger corporate wikis. We solved this using a custom implementation of Transform streams that process data in chunks. This allowed us to audit repositories with millions of files while keeping a flat memory profile of under 200MB.',
    external: false,
  },
  {
    id: 2,
    title: 'The Cost of Context Providers in React',
    date: 'Sep 28, 2025',
    readTime: '9 min',
    excerpt:
      'Exploring performance bottlenecks in large-scale React applications.',
    content:
      'Performance at scale often hits a wall when too many components are subscribed to a single global context. Every update triggers a re-render of the entire tree. In this article, we look at how atomic state management or signals can alleviate these pains.',
    external: false,
  },
  {
    id: 3,
    title: 'Modern Backend Security',
    date: 'Aug 15, 2025',
    readTime: '15 min',
    excerpt: 'A deep dive into securing Express.js applications.',
    url: 'https://medium.com',
    external: true,
  },
];

export const TWEETS = [
  {
    id: 1,
    text: 'Just shipped the v2 of the VerifyIt auditing engine. Memory consumption reduced by 60% by switching to custom streams. #NodeJS #Backend',
    date: '2h ago',
  },
  {
    id: 2,
    text: 'Architecture tip: Always validate your documentation against your actual codebase. If they diverge, the docs are just fiction. 🛠️',
    date: '1d ago',
  },
  {
    id: 3,
    text: 'React Server Components are changing the way we think about data fetching patterns. Still weighing the DX tradeoffs.',
    date: '3d ago',
  },
];

export const DEFAULT_PROFILE = {
  brandInitial: 'D',
  brandName: 'Dev',
  brandAccent: 'Portfolio',
  openToWorkLabel: 'Open to new opportunities',
  headingLead: 'Engineering',
  headingHighlight: 'Reliable Systems.',
  summary:
    'Expert in Node.js architecture and React performance. I build products like VerifyIt that scale to petabytes of data without breaking a sweat.',
  resumeLabel: 'Download Resume',
  resumeUrl: '#',
  email: 'hello@verifyit.dev',
  phone: '+1 (555) 123-4567',
  updatesHandle: '@dev_handle',
  socialLinks: {
    x: '#',
    linkedin: '#',
    github: '#',
    email: 'mailto:hello@verifyit.dev',
  },
  footerText: '© 2026 Engineering Portfolio / Built with React & Node',
};

export const DEFAULT_SITE_CONFIG = {
  sectionIds: SECTION_IDS,
  navItems: NAV_ITEMS,
};

export const DEFAULT_PORTFOLIO_CONTENT = {
  profile: DEFAULT_PROFILE,
  siteConfig: DEFAULT_SITE_CONFIG,
  techStack: TECH_STACK,
  stats: STATS,
  experience: EXPERIENCE,
  projects: PORTFOLIO_PROJECTS,
  blogPosts: BLOG_POSTS,
  updates: TWEETS,
  projectImages: PROJECT_IMAGES,
};
