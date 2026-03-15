const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { initializeApp } = require('firebase/app');
const { collection, doc, getDocs, getFirestore, writeBatch } = require('firebase/firestore');

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

function slugFromTitle(title) {
  return String(title || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function loadProjectsFromSource() {
  const sourcePath = path.resolve(process.cwd(), 'src/data/portfolioData.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const match = source.match(
    /export const PORTFOLIO_PROJECTS = (\[[\s\S]*?\n\]);\n\nexport const BLOG_POSTS/
  );

  if (!match) {
    throw new Error('Could not find PORTFOLIO_PROJECTS in src/data/portfolioData.js');
  }

  let projects;
  try {
    projects = vm.runInNewContext(match[1], {});
  } catch (error) {
    throw new Error(`Failed to parse PORTFOLIO_PROJECTS: ${error.message}`);
  }

  if (!Array.isArray(projects)) {
    throw new Error('PORTFOLIO_PROJECTS is not an array');
  }

  return projects;
}

function toProjectDocs(projects) {
  return projects.map((project, index) => {
    const normalizedProject = JSON.parse(JSON.stringify(project));
    const id = project.slug || slugFromTitle(project.title) || `project-${index + 1}`;
    return {
      id,
      data: {
        ...normalizedProject,
        order: index + 1,
      },
    };
  });
}

async function seedProjects({ prune }) {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const projectDocs = toProjectDocs(loadProjectsFromSource());

  const batch = writeBatch(db);
  projectDocs.forEach((project) => {
    batch.set(doc(db, 'projects', project.id), project.data);
  });

  let prunedCount = 0;
  if (prune) {
    const snapshot = await getDocs(collection(db, 'projects'));
    const keepIds = new Set(projectDocs.map((project) => project.id));
    snapshot.docs.forEach((snapshotDoc) => {
      if (!keepIds.has(snapshotDoc.id)) {
        batch.delete(doc(db, 'projects', snapshotDoc.id));
        prunedCount += 1;
      }
    });
  }

  await batch.commit();

  console.log(`Seeded ${projectDocs.length} project documents.`);
  if (prune) {
    console.log(`Pruned ${prunedCount} extra project documents.`);
  }
}

async function main() {
  const prune = process.argv.includes('--prune');
  await seedProjects({ prune });
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
