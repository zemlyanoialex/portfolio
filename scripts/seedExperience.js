const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const {
  collection,
  doc,
  getDocs,
  getFirestore,
  writeBatch,
} = require('firebase/firestore');

const EXPERIENCE_DOCS = [
  {
    id: 'bestwebsoft-wordpress-developer-2011-10',
    data: {
      company: 'BestWebSoft',
      companyLink: 'https://bestwebsoft.com/',
      role: 'WordPress Developer',
      desc: 'Developed and maintained WordPress plugins and themes for client requirements, optimized plugin functionality for compatibility across WordPress versions, and improved theme usability and accessibility.',
      timeline: {
        from: { year: 2011, month: 10 },
        to: { year: 2012, month: 6 },
      },
      meta: {
        workType: 'On-site',
        companyLocation: 'Zaporizhzhia, Ukraine',
      },
      stack: ['WordPress', 'jQuery', 'MySQL'],
    },
  },
  {
    id: 'gbksoft-web-developer-2012-12',
    data: {
      company: 'GBKSOFT',
      companyLink: 'https://gbksoft.ua/',
      role: 'Web Developer',
      desc: 'Developed and maintained a localized social networking site and a childhood-focused web platform, implemented jQuery-based front-end interactivity, optimized MySQL and MongoDB data flows, and supported existing products with stability and performance improvements.',
      timeline: {
        from: { year: 2012, month: 12 },
        to: { year: 2014, month: 1 },
      },
      meta: {
        workType: 'On-site',
        companyLocation: 'Zaporizhzhia, Ukraine',
      },
      stack: ['PHP', 'CodeIgniter', 'Symfony', 'jQuery', 'MySQL', 'MongoDB'],
    },
  },
  {
    id: 'flexi-technical-lead-cofounder-2014-01',
    data: {
      company: 'Flexi IT-company',
      companyLink: 'https://flexi.ink/',
      role: 'Technical Lead & Co-Founder',
      desc: 'Led the company’s technical direction and foundational technology decisions, managed client and candidate interviews, supported teams across the full software development lifecycle, and drove delivery of web applications aligned with business goals.',
      timeline: {
        from: { year: 2014, month: 1 },
        to: { year: 2017, month: 7 },
      },
      meta: {
        workType: 'On-site',
        companyLocation: 'Zaporizhzhia, Ukraine',
      },
      stack: [
        'PHP',
        'Symfony',
        'Laravel',
        'CodeIgniter',
        'WordPress',
        'MySQL',
        'MongoDB',
        'AngularJS',
      ],
    },
  },
  {
    id: 'toptal-senior-wordpress-developer-2016-05',
    data: {
      company: 'Toptal',
      companyLink: 'https://www.toptal.com/',
      role: 'Senior WordPress Developer',
      desc: 'Built custom WordPress themes and plugins from scratch for diverse client projects, delivering scalable and maintainable solutions with strong focus on core compatibility, performance, and engineering best practices.',
      timeline: {
        from: { year: 2016, month: 5 },
        to: { year: 2018, month: 9 },
      },
      meta: {
        workType: 'Remote',
        companyLocation: 'Global',
        employmentType: 'Freelance',
      },
      stack: ['WordPress', 'PHP', 'JavaScript', 'MySQL'],
    },
  },
  {
    id: 'nda-full-stack-developer-2019-06',
    data: {
      company: 'Confidential (NDA)',
      companyLink: null,
      role: 'Full Stack Developer',
      desc: 'Contributed to delivery of a Progressive Web Application (PWA) using Next.js and Firebase, collaborating closely on front-end implementation to ensure timely project completion.',
      timeline: {
        from: { year: 2019, month: 6 },
        to: { year: 2020, month: 2 },
      },
      meta: {
        workType: 'Remote',
      },
      stack: ['Next.js', 'Firebase', 'JavaScript'],
    },
  },
  {
    id: 'westwaytechnology-react-node-developer-2019-04',
    data: {
      company: 'WestWayTechnology',
      companyLink: 'https://westwaydigital.com/',
      role: 'React / Node.js Developer',
      desc: 'Developed and supported multiple React + Node.js products, including an office building management platform (GraphQL, NestJS) and an online education platform with video conferencing, progress tracking, exams, scoreboards, and third-party API integrations. Also supported smaller WordPress projects, with focus on scalability and performance.',
      timeline: {
        from: { year: 2019, month: 4 },
        to: null,
      },
      meta: {
        workType: 'Remote',
        companyLocation: 'New York, USA',
      },
      stack: ['Node.js', 'React', 'GraphQL', 'NestJS', 'WordPress', 'Third-party APIs'],
    },
  },
  {
    id: 'nda-full-stack-developer-2024-01',
    data: {
      company: 'Confidential (NDA)',
      companyLink: null,
      role: 'Full Stack Developer',
      desc: 'Built an online marketplace platform with Nuxt 3 (Vue) frontend and Laravel APIs, developed a cryptocurrency payment sub-service for seamless transactions, and delivered scalable backend solutions for high-frequency operations while improving performance and UX.',
      timeline: {
        from: { year: 2024, month: 1 },
        to: { year: 2024, month: 12 },
      },
      meta: {
        workType: 'Remote',
      },
      stack: ['Nuxt 3', 'Vue.js', 'Laravel', 'PHP', 'Cryptocurrency Payments'],
    },
  },
  {
    id: 'supercake-full-stack-developer-2026-01',
    data: {
      company: 'Supercake',
      companyLink: 'https://supercake.co/',
      role: 'Full Stack Developer',
      desc: 'Building and scaling high-traffic consumer products as a full stack developer, including backend API services and modern Vue/Nuxt frontends with payment and Firebase integrations.',
      timeline: {
        from: { year: 2026, month: 1 },
        to: null,
      },
      meta: {
        workType: 'Remote',
        companyLocation: 'Germany',
      },
      stack: [
        'Node.js',
        'TypeScript',
        'Express',
        'PostgreSQL',
        'Redis',
        'Vue.js',
        'Nuxt 3',
        'Firebase',
      ],
    },
  },
];

function loadEnvFile(relativePath) {
  const filePath = path.resolve(process.cwd(), relativePath);
  if (!fs.existsSync(filePath)) {
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function getFirebaseConfig() {
  loadEnvFile('.env.local');
  loadEnvFile('.env');

  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(`Missing Firebase config keys: ${missing.join(', ')}`);
  }

  return config;
}

async function seedExperience({ prune }) {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const batch = writeBatch(db);

  for (const item of EXPERIENCE_DOCS) {
    batch.set(doc(db, 'experience', item.id), item.data);
  }

  let prunedCount = 0;
  if (prune) {
    const currentSnapshot = await getDocs(collection(db, 'experience'));
    const keepIds = new Set(EXPERIENCE_DOCS.map((item) => item.id));
    currentSnapshot.docs.forEach((snapshot) => {
      if (!keepIds.has(snapshot.id)) {
        batch.delete(doc(db, 'experience', snapshot.id));
        prunedCount += 1;
      }
    });
  }

  await batch.commit();

  console.log(`Seeded ${EXPERIENCE_DOCS.length} experience documents.`);
  if (prune) {
    console.log(`Pruned ${prunedCount} extra experience documents.`);
  }
}

async function main() {
  const prune = process.argv.includes('--prune');
  await seedExperience({ prune });
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
