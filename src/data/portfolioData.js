export const SECTION_IDS = [
  "intro",
  "stats",
  "experience",
  "portfolio",
  "updates",
  "blog",
  "contact",
];

export const NAV_ITEMS = [
  "intro",
  "experience",
  "portfolio",
  "updates",
  "blog",
  "contact",
];

export const TECH_STACK = [
  { icon: "Terminal", label: "Node.js" },
  { icon: "Cpu", label: "React" },
  { icon: "Database", label: "PostgreSQL" },
  { icon: "Globe", label: "Next.js" },
  { icon: "Code", label: "TypeScript" },
];

export const STATS = [
  { icon: "Zap", label: "Projects Completed", value: "40+" },
  { icon: "Code", label: "Core Stack", value: "Node/React" },
  { icon: "MapPin", label: "Location", value: "Ukraine, Kyiv" },
  { icon: "Award", label: "Years Exp", value: "6+" },
];

export const EXPERIENCE = [
  {
    company: "BestWebSoft",
    companyLink: "https://bestwebsoft.com/",
    role: "WordPress Developer",
    desc: "Developed and maintained WordPress plugins and themes for client requirements, optimized plugin functionality for compatibility across WordPress versions, and improved theme usability and accessibility.",
    timeline: {
      from: { year: 2011, month: 10 },
      to: { year: 2012, month: 6 },
    },
    meta: {
      workType: "On-site",
      companyLocation: "Zaporizhzhia, Ukraine",
    },
    stack: ["WordPress", "jQuery", "MySQL"],
  },
  {
    company: "GBKSOFT",
    companyLink: "https://gbksoft.ua/",
    role: "Web Developer",
    desc: "Developed and maintained a localized social networking site and a childhood-focused web platform, implemented jQuery-based front-end interactivity, optimized MySQL and MongoDB data flows, and supported existing products with stability and performance improvements.",
    timeline: {
      from: { year: 2012, month: 12 },
      to: { year: 2014, month: 1 },
    },
    meta: {
      workType: "On-site",
      companyLocation: "Zaporizhzhia, Ukraine",
    },
    stack: ["PHP", "CodeIgniter", "Symfony", "jQuery", "MySQL", "MongoDB"],
  },
  {
    company: "Flexi IT-company",
    companyLink: "https://flexi.ink/",
    role: "Technical Lead & Co-Founder",
    desc: "Led the company’s technical direction and foundational technology decisions, managed client and candidate interviews, supported teams across the full software development lifecycle, and drove delivery of web applications aligned with business goals.",
    timeline: {
      from: { year: 2014, month: 1 },
      to: { year: 2017, month: 7 },
    },
    meta: {
      workType: "On-site",
      companyLocation: "Zaporizhzhia, Ukraine",
    },
    stack: [
      "PHP",
      "Symfony",
      "Laravel",
      "CodeIgniter",
      "WordPress",
      "MySQL",
      "MongoDB",
      "AngularJS",
    ],
  },
  {
    company: "Toptal",
    companyLink: "https://www.toptal.com/",
    role: "Senior WordPress Developer",
    desc: "Built custom WordPress themes and plugins from scratch for diverse client projects, delivering scalable and maintainable solutions with strong focus on core compatibility, performance, and engineering best practices.",
    timeline: {
      from: { year: 2016, month: 5 },
      to: { year: 2018, month: 9 },
    },
    meta: {
      workType: "Remote",
      companyLocation: "Global",
      employmentType: "Freelance",
    },
    stack: ["WordPress", "PHP", "JavaScript", "MySQL"],
  },
  {
    company: "Confidential (NDA)",
    companyLink: null,
    role: "Full Stack Developer",
    desc: "Contributed to delivery of a Progressive Web Application (PWA) using Next.js and Firebase, collaborating closely on front-end implementation to ensure timely project completion.",
    timeline: {
      from: { year: 2019, month: 6 },
      to: { year: 2020, month: 2 },
    },
    meta: {
      workType: "Remote",
    },
    stack: ["Next.js", "Firebase", "JavaScript"],
  },
  {
    company: "WestWayTechnology",
    companyLink: "https://westwaydigital.com/",
    role: "React / Node.js Developer",
    desc: "Developed and supported multiple React + Node.js products, including an office building management platform (GraphQL, NestJS) and an online education platform with video conferencing, progress tracking, exams, scoreboards, and third-party API integrations. Also supported smaller WordPress projects, with focus on scalability and performance.",
    timeline: {
      from: { year: 2019, month: 4 },
      to: null,
    },
    meta: {
      workType: "Remote",
      companyLocation: "New York, USA",
    },
    stack: [
      "Node.js",
      "React",
      "GraphQL",
      "NestJS",
      "WordPress",
      "Third-party APIs",
    ],
  },
  {
    company: "Confidential (NDA)",
    companyLink: null,
    role: "Full Stack Developer",
    desc: "Built an online marketplace platform with Nuxt 3 (Vue) frontend and Laravel APIs, developed a cryptocurrency payment sub-service for seamless transactions, and delivered scalable backend solutions for high-frequency operations while improving performance and UX.",
    timeline: {
      from: { year: 2024, month: 1 },
      to: { year: 2024, month: 12 },
    },
    meta: {
      workType: "Remote",
    },
    stack: ["Nuxt 3", "Vue.js", "Laravel", "PHP", "Cryptocurrency Payments"],
  },
  {
    company: "Supercake",
    companyLink: "https://supercake.co/",
    role: "Full Stack Developer",
    desc: "Building and scaling high-traffic consumer products as a full stack developer, including backend API services and modern Vue/Nuxt frontends with payment and Firebase integrations.",
    timeline: {
      from: { year: 2026, month: 1 },
      to: null,
    },
    meta: {
      workType: "Remote",
      companyLocation: "Germany",
    },
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Redis",
      "Vue.js",
      "Nuxt 3",
      "Firebase",
    ],
  },
];

export const PROJECT_IMAGES = {
  verifyit: [
    "bg-gradient-to-br from-slate-700 to-slate-600",
    "bg-gradient-to-br from-orange-700 to-orange-900",
    "bg-gradient-to-br from-blue-900 to-slate-900",
    "bg-gradient-to-br from-slate-500 to-slate-400",
  ],
  foundry: [
    "bg-gradient-to-br from-emerald-800 to-slate-800",
    "bg-gradient-to-br from-slate-700 to-gray-600",
    "bg-gradient-to-br from-teal-900 to-emerald-900",
  ],
  ecommerce: [
    "bg-gradient-to-br from-indigo-900 to-purple-900",
    "bg-gradient-to-br from-slate-800 to-black",
    "bg-gradient-to-br from-pink-900 to-rose-900",
  ],
  crypto: [
    "bg-gradient-to-br from-gray-900 to-gray-800",
    "bg-gradient-to-br from-amber-900 to-yellow-900",
  ],
};

export const PORTFOLIO_PROJECTS = [
  {
    title: "Practice",
    slug: "practice",
    year: 2024,
    projectTimeline: {
      startedYear: 2020,
      majorRebuildYear: 2024,
    },
    description:
      "Built and scaled a NestJS/TypeScript backend monorepo for an education platform, covering classes, assignments, grades, attendance, reporting, authentication, and district-level administration.",
    tags: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "GraphQL",
      "Sequelize",
      "MySQL",
      "Redis",
      "Bull Queue",
      "CQRS",
      "Docker",
    ],
    links: {
      live: "https://nyc.practice.org/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/practice/practice1.webp",
          fallbackPath: "portfolio/practice/practice1.jpg",
          alt: "Practice platform screenshot 1",
        },
        {
          webpPath: "portfolio/practice/practice2.webp",
          fallbackPath: "portfolio/practice/practice2.jpg",
          alt: "Practice platform screenshot 2",
        },
        {
          webpPath: "portfolio/practice/practice3.webp",
          fallbackPath: "portfolio/practice/practice3.jpg",
          alt: "Practice platform screenshot 3",
        },
        {
          webpPath: "portfolio/practice/practice4.webp",
          fallbackPath: "portfolio/practice/practice4.jpg",
          alt: "Practice platform screenshot 4",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "BuildingHub",
    slug: "buildinghub",
    year: 2019,
    projectTimeline: {
      startedYear: 2019,
    },
    description:
      "Built and maintained a modular proptech backend platform for property operations, covering work orders, incidents, guest/vendor access, billing, subscriptions, and tenant/property administration.",
    tags: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "GraphQL",
      "MySQL",
      "Redis",
      "Bull Queue",
      "CQRS",
      "Stripe",
      "Docker",
    ],
    links: {
      live: "https://buildinghub.io/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/buildinghub/buildinghub.webp",
          fallbackPath: "portfolio/buildinghub/buildinghub.png",
          alt: "BuildingHub platform screenshot 1",
        },
        {
          webpPath: "portfolio/buildinghub/buildinghub1.webp",
          fallbackPath: "portfolio/buildinghub/buildinghub1.png",
          alt: "BuildingHub platform screenshot 2",
        },
        {
          webpPath: "portfolio/buildinghub/buildinghub2.webp",
          fallbackPath: "portfolio/buildinghub/buildinghub2.png",
          alt: "BuildingHub platform screenshot 3",
        },
        {
          webpPath: "portfolio/buildinghub/buildinghub3.webp",
          fallbackPath: "portfolio/buildinghub/buildinghub3.png",
          alt: "BuildingHub platform screenshot 4",
        },
        {
          webpPath: "portfolio/buildinghub/buildinghub4.webp",
          fallbackPath: "portfolio/buildinghub/buildinghub4.png",
          alt: "BuildingHub platform screenshot 5",
        },
      ],
    },
    meta: {
      isFeatured: true,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "Viennaresidence",
    slug: "viennaresidence",
    year: 2022,
    description:
      "Built and maintained a rental platform operating in Vienna and Frankfurt, helping property owners find tenants while the system handles booking and operational support workflows.",
    tags: ["Laravel", "Angular", "Property Rental", "Booking Platform"],
    links: {
      live: "https://www.viennaresidence.com/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/viennaresidence/vienna.webp",
          fallbackPath: "portfolio/viennaresidence/vienna.png",
          alt: "Viennaresidence screenshot 1",
        },
        {
          webpPath: "portfolio/viennaresidence/vienna1.webp",
          fallbackPath: "portfolio/viennaresidence/vienna1.png",
          alt: "Viennaresidence screenshot 2",
        },
        {
          webpPath: "portfolio/viennaresidence/vienna2.webp",
          fallbackPath: "portfolio/viennaresidence/vienna2.png",
          alt: "Viennaresidence screenshot 3",
        },
        {
          webpPath: "portfolio/viennaresidence/vienna3.webp",
          fallbackPath: "portfolio/viennaresidence/vienna3.png",
          alt: "Viennaresidence screenshot 4",
        },
      ],
    },
    meta: {
      isFeatured: true,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "AquaTru Water",
    slug: "aquatru-water",
    year: 2020,
    description:
      "Contributed to an e-commerce platform for home water purification products, focused on product discovery, conversion flows, and ongoing storefront/content operations.",
    tags: [
      "E-commerce",
      "Shopify",
      "Shopify Hydrogen",
      "Builder.io",
      "Water Purification",
    ],
    links: {
      live: "https://aquatruwater.com/",
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Activity calculation",
    slug: "activity-calculation",
    year: 2020,
    description:
      "Developed a private activity-calculation system with responsive UI and REST API integration for data processing workflows.",
    tags: ["jQuery", "HTML", "CSS", "REST API", "Responsive Design"],
    links: {
      live: null,
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: true,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Admin system for mobile",
    slug: "admin-system-for-mobile",
    year: 2018,
    description:
      "Built an admin system for efficient content management and publishing workflows for a mobile application.",
    tags: ["Bootstrap 4", "Laravel", "jQuery"],
    links: {
      live: null,
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Frassers",
    slug: "frassers",
    year: 2019,
    description:
      "Developed and maintained a web platform with a responsive UI and front-end component styling.",
    tags: ["Bootstrap 4", "jQuery", "Sass"],
    links: {
      live: "http://frassers.com",
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Israel Airplane Platform",
    slug: "israel-airplane-platform",
    year: 2019,
    description:
      "Built a WordPress-based in-flight platform backed by Amazon infrastructure, enabling passengers to access onboard digital services during flights.",
    tags: ["WordPress", "PHP", "Amazon Web Services", "In-flight Platform"],
    links: {
      live: null,
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Hr Bjorkman",
    slug: "hr-bjorkman",
    year: 2018,
    description:
      "Maintained and improved a carpet replacement scheduling platform with API-driven workflows and operational automation.",
    tags: ["PHP", "REST API", "Scheduling Platform"],
    links: {
      live: "https://www.hrbjorkman.se/",
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Smart Trappstadning",
    slug: "smart-trappstadning",
    year: 2018,
    description:
      "Built and maintained a WordPress-based lead generation platform for a Stockholm property-cleaning business, with service pages and quote flows for BRF and property-owner operations.",
    tags: [
      "WordPress",
      "PHP",
      "Local SEO",
      "Lead Generation",
      "B2B Services",
      "Conversion Funnel",
      "Cloudflare",
    ],
    links: {
      live: "https://smarttrappstadning.se/",
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "SunWay",
    slug: "sunway",
    year: 2015,
    description:
      "Built and improved an e-commerce store for UV clothing, extending WooCommerce functionality and integrating Mailchimp.",
    tags: [
      "WordPress",
      "WooCommerce",
      "Visual Composer",
      "HTML",
      "CSS",
      "Mailchimp",
    ],
    links: {
      live: "https://sunwayuvclothing.com/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/sunway/sunway.webp",
          fallbackPath: "portfolio/sunway/sunway.png",
          alt: "SunWay storefront screenshot 1",
        },
        {
          webpPath: "portfolio/sunway/sunway1.webp",
          fallbackPath: "portfolio/sunway/sunway1.png",
          alt: "SunWay storefront screenshot 2",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "Soundsuit",
    slug: "soundsuit",
    year: 2018,
    description:
      "Built a music streaming-focused website on WordPress with a fully manageable content workflow, allowing the owner to publish and expand content independently without ongoing developer involvement.",
    tags: ["WordPress", "jQuery", "HTML", "CSS", "Divi Builder"],
    links: {
      live: "https://soundsuit.fm/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/soundsuit/soundsuit.webp",
          fallbackPath: "portfolio/soundsuit/soundsuit.png",
          alt: "Soundsuit screenshot 1",
        },
        {
          webpPath: "portfolio/soundsuit/soundsuit1.webp",
          fallbackPath: "portfolio/soundsuit/soundsuit1.png",
          alt: "Soundsuit screenshot 2",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "Pure Charity Plugin",
    slug: "pure-charity-plugin",
    year: 2016,
    description:
      "Developed a WordPress plugin that consolidated multiple internal company plugins into a single unified solution.",
    tags: ["WordPress", "WordPress Plugins"],
    links: {
      live: "https://github.com/purecharity",
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Liferia",
    slug: "liferia",
    year: 2017,
    description:
      "Built a cosmetics brand website for an international company to present products, help users choose suitable options, and support subscription-based recurring delivery and payment workflows.",
    tags: [
      "OpenCart",
      "jQuery",
      "HTML",
      "CSS",
      "Server Administration",
      "Credit Card Payment",
    ],
    links: {
      live: "https://liferia.com.ua/",
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Azer Turk Bank",
    slug: "azer-turk-bank",
    year: 2015,
    description:
      "Developed a corporate banking website with customer support flows, online services, and a currency exchange calculator.",
    tags: ["PHP", "JavaScript", "jQuery", "Banking", "UI/UX", "Calculator"],
    links: {
      live: "https://azerturkbank.az/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/azerturkbank/azerturkbank-imac21.webp",
          fallbackPath: "portfolio/azerturkbank/azerturkbank-imac21.png",
          alt: "Azer Turk Bank desktop view",
        },
        {
          webpPath: "portfolio/azerturkbank/azerturkbank-ipad.webp",
          fallbackPath: "portfolio/azerturkbank/azerturkbank-ipad.png",
          alt: "Azer Turk Bank tablet view",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "PMSI",
    slug: "pmsi",
    year: 2016,
    description:
      "Developed a WordPress system to streamline hiring review workflows with candidate intake, email invites, and role-specific document generation.",
    tags: ["WordPress", "ACF", "jQuery", "HTML", "CSS", "TCPDF", "MySQL"],
    links: {
      live: "https://www.pmsi.me/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/pmsi/pmsi.webp",
          fallbackPath: "portfolio/pmsi/pmsi.png",
          alt: "PMSI workflow platform screenshot",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "Mypress",
    slug: "mypress",
    year: 2017,
    description:
      "Built a portal for press managers to centralize communication workflows across social networks, TV channels, magazines, and other media partners from one operational dashboard.",
    tags: [
      "Project Management",
      "Kohana",
      "jQuery",
      "HTML",
      "CSS",
      "Responsive Design",
    ],
    links: {
      live: "http://mypress.de/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/mypress/mypress.webp",
          fallbackPath: "portfolio/mypress/mypress.png",
          alt: "Mypress screenshot 1",
        },
        {
          webpPath: "portfolio/mypress/mypress1.webp",
          fallbackPath: "portfolio/mypress/mypress1.png",
          alt: "Mypress screenshot 2",
        },
        {
          webpPath: "portfolio/mypress/mypress2.webp",
          fallbackPath: "portfolio/mypress/mypress2.png",
          alt: "Mypress screenshot 3",
        },
        {
          webpPath: "portfolio/mypress/mypress3.webp",
          fallbackPath: "portfolio/mypress/mypress3.png",
          alt: "Mypress screenshot 4",
        },
      ],
    },
    meta: {
      isFeatured: true,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "Grobovoi",
    slug: "grobovoi",
    year: 2016,
    description:
      "Built and supported an education platform for selling and delivering online courses and knowledge products.",
    tags: ["WordPress", "WooCommerce", "Education Platform"],
    links: {
      live: "https://www.grabovoi.education/",
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: true,
    },
  },
  {
    title: "Big Data System",
    slug: "big-data-system",
    year: 2016,
    description:
      "Contributed as a front-end developer to a private big data platform for recommendation workflows across multiple enterprise industries.",
    tags: ["TypeScript", "AngularJS", "HTML", "LESS", "Grunt", "D3", "Lodash"],
    links: {
      live: null,
      repo: null,
    },
    media: {
      images: [],
    },
    meta: {
      isFeatured: false,
      isNDA: true,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "OMG",
    slug: "omg",
    year: 2015,
    description:
      "Built a content-focused platform for reading trending topics with a Laravel backend and Bootstrap frontend, optimized with Amazon infrastructure.",
    tags: [
      "Laravel 4/5",
      "jQuery",
      "Amazon",
      "Blade",
      "Bootstrap",
      "HTML",
      "CSS",
    ],
    links: {
      live: "http://omygsh.com/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/omygsh/omygsh.webp",
          fallbackPath: "portfolio/omygsh/omygsh.jpg",
          alt: "OMG content platform screenshot",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: true,
      isHidden: false,
    },
  },
  {
    title: "Questomania",
    slug: "questomania",
    year: 2014,
    description:
      "Built an escape-room website with self-service booking and cancellation flows, allowing visitors to manage reservations online.",
    tags: ["WordPress", "WooCommerce", "Booking"],
    links: {
      live: "https://www.questomania.co.il",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/questomania/questomania.webp",
          fallbackPath: "portfolio/questomania/questomania.png",
          alt: "Questomania booking website screenshot",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: true,
      isHidden: true,
    },
  },
  {
    title: "Earny",
    slug: "earny",
    year: 2014,
    description:
      "Built a mobile-first rewards platform where users earned account bonuses for app installs, with API-driven advertiser workflows.",
    tags: ["Symfony2", "jQuery", "REST API", "Responsive Design", "PHP"],
    links: {
      live: "http://earny.ru/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/earny/earny.webp",
          fallbackPath: "portfolio/earny/earny.png",
          alt: "Earny platform screenshot",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: true,
      isHidden: true,
    },
  },
  {
    title: "CheapCouriersUK",
    slug: "cheapcouriersuk",
    year: 2013,
    description:
      "Built a logistics platform for UK parcel delivery with shipping cost calculations, pickup scheduling, and integrated card/PayPal payments.",
    tags: [
      "PHP",
      "Kohana",
      "jQuery UI",
      "MySQL",
      "Logistics APIs",
      "PayPal",
      "Payments",
    ],
    links: {
      live: "http://www.cheapcouriersuk.com/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/cheapcourier/cheapcouriersuk.webp",
          fallbackPath: "portfolio/cheapcourier/cheapcouriersuk.png",
          alt: "CheapCouriersUK platform screenshot",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: true,
      isHidden: false,
    },
  },
  {
    title: "Fiffr",
    slug: "fiffr",
    year: 2013,
    description:
      "Contributed to a family-focused platform for tracking child growth, nutrition, and activity, completing both backend and frontend delivery.",
    tags: ["CodeIgniter", "jQuery", "MySQL", "Bootstrap", "PHP"],
    links: {
      live: "http://fiffr.com/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/fiffr/fiffrcom-0.webp",
          fallbackPath: "portfolio/fiffr/fiffr.com - 0.jpg",
          alt: "Fiffr screen 1",
        },
        {
          webpPath: "portfolio/fiffr/fiffrcom-1.webp",
          fallbackPath: "portfolio/fiffr/fiffr.com - 1.jpg",
          alt: "Fiffr screen 2",
        },
        {
          webpPath: "portfolio/fiffr/fiffrcom-2.webp",
          fallbackPath: "portfolio/fiffr/fiffr.com - 2.jpg",
          alt: "Fiffr screen 3",
        },
        {
          webpPath: "portfolio/fiffr/fiffrcom-3.webp",
          fallbackPath: "portfolio/fiffr/fiffr.com - 3.jpg",
          alt: "Fiffr screen 4",
        },
        {
          webpPath: "portfolio/fiffr/fiffrcom-4.webp",
          fallbackPath: "portfolio/fiffr/fiffr.com - 4.png",
          alt: "Fiffr screen 5",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: true,
      isHidden: false,
    },
  },
  {
    title: "Anonmap",
    slug: "anonmap",
    year: 2013,
    description:
      "Built a cross-browser anonymous image board with topic feeds, map-based views, social sharing, clustering, and category filtering.",
    tags: ["PHP", "JavaScript", "Maps", "Social APIs", "Forum", "Image Board"],
    links: {
      live: "http://anonmap.com/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/anonmap/anonmap.webp",
          fallbackPath: "portfolio/anonmap/anonmap.png",
          alt: "Anonmap platform screenshot",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
  {
    title: "Skybase",
    slug: "skybase",
    year: 2013,
    description:
      "Built a social networking platform from scratch (frontend and backend), with a connected mobile app delivered before the website.",
    tags: ["Laravel", "jQuery", "MongoDB", "MySQL", "Social Network"],
    links: {
      live: "https://skybase.com",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/skybase/skybace.webp",
          fallbackPath: "portfolio/skybase/skybace.png",
          alt: "Skybase screenshot 1",
        },
        {
          webpPath: "portfolio/skybase/skybace1.webp",
          fallbackPath: "portfolio/skybase/skybace1.png",
          alt: "Skybase screenshot 2",
        },
        {
          webpPath: "portfolio/skybase/skybace2.webp",
          fallbackPath: "portfolio/skybase/skybace2.png",
          alt: "Skybase screenshot 3",
        },
        {
          webpPath: "portfolio/skybase/skybace3.webp",
          fallbackPath: "portfolio/skybase/skybace3.png",
          alt: "Skybase screenshot 4",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: true,
      isHidden: true,
    },
  },
  {
    title: "Alaska Dream Makers",
    slug: "alaska-dream-makers",
    year: 2013,
    description:
      "Supported a WordPress-based real estate platform where customers could browse and choose land options in Alaska.",
    tags: ["WordPress", "WooCommerce", "Real Estate"],
    links: {
      live: "http://alaskadreammakers.com/",
      repo: null,
    },
    media: {
      images: [
        {
          webpPath: "portfolio/alaska/alaskadreammakers.webp",
          fallbackPath: "portfolio/alaska/alaskadreammakers.png",
          alt: "Alaska Dream Makers website screenshot",
        },
      ],
    },
    meta: {
      isFeatured: false,
      isNDA: false,
      isArchived: false,
      isHidden: false,
    },
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Scaling Node.js Streams for Petabyte Audits",
    date: "Oct 12, 2025",
    readTime: "12 min",
    excerpt:
      "How we utilized the native Node.js Stream API to process massive knowledge bases.",
    content:
      "When building VerifyIt, the primary challenge was memory management. Standard JSON parsing would load the entire document into memory, causing heap overflows on larger corporate wikis. We solved this using a custom implementation of Transform streams that process data in chunks. This allowed us to audit repositories with millions of files while keeping a flat memory profile of under 200MB.",
    external: false,
  },
  {
    id: 2,
    title: "The Cost of Context Providers in React",
    date: "Sep 28, 2025",
    readTime: "9 min",
    excerpt:
      "Exploring performance bottlenecks in large-scale React applications.",
    content:
      "Performance at scale often hits a wall when too many components are subscribed to a single global context. Every update triggers a re-render of the entire tree. In this article, we look at how atomic state management or signals can alleviate these pains.",
    external: false,
  },
  {
    id: 3,
    title: "Modern Backend Security",
    date: "Aug 15, 2025",
    readTime: "15 min",
    excerpt: "A deep dive into securing Express.js applications.",
    url: "https://medium.com",
    external: true,
  },
];

export const TWEETS = [
  {
    id: 1,
    text: "Just shipped the v2 of the VerifyIt auditing engine. Memory consumption reduced by 60% by switching to custom streams. #NodeJS #Backend",
    date: "2h ago",
  },
  {
    id: 2,
    text: "Architecture tip: Always validate your documentation against your actual codebase. If they diverge, the docs are just fiction. 🛠️",
    date: "1d ago",
  },
  {
    id: 3,
    text: "React Server Components are changing the way we think about data fetching patterns. Still weighing the DX tradeoffs.",
    date: "3d ago",
  },
];

export const DEFAULT_PROFILE = {
  brandInitial: "OZ",
  brandName: "Oleksandr",
  brandAccent: "Zemlianoi",
  openToWorkLabel: "Open to new opportunities",
  headingLead: "Full Stack",
  headingHighlight: "Product Engineer.",
  summary:
    "I build and scale web products end-to-end: Node.js/NestJS backends, React/Vue frontends, and real business workflows from booking and payments to education and property platforms.",
  resumeLabel: "Download Resume",
  resumeUrl:
    "https://firebasestorage.googleapis.com/v0/b/portfolio-zemlianoi.firebasestorage.app/o/zemlianoi_cv.pdf?alt=media&token=dc5b3a64-cb87-459e-8686-5d225a7444c2",
  email: "oleksandr.zemlianoi@gmail.com",
  phone: "+380973915837",
  updatesHandle: "@dev_handle",
  socialLinks: {
    upwork: "https://www.upwork.com/freelancers/~01a32d51123700c234",
    x: "https://x.com/zemlianoi_aleks",
    linkedin: "https://www.linkedin.com/in/oleksandr-zemlianoi-a4654872/",
    github: "https://github.com/zemlyanoialex",
    twitch: "https://www.twitch.tv/zemlianoi",
    email: "mailto:oleksandr.zemlianoi@gmail.com",
  },
  footerText: "© 2026 Engineering Portfolio / Built with React & Node",
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
