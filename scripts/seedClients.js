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

function slugFromName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function loadClientsFromSource() {
  const sourcePath = path.resolve(process.cwd(), 'src/data/portfolioData.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const match = source.match(
    /export const CLIENTS = (\[[\s\S]*?\]);\n\nexport const TESTIMONIALS/
  );

  if (!match) {
    throw new Error('Could not find CLIENTS in src/data/portfolioData.js');
  }

  let clients;
  try {
    clients = vm.runInNewContext(match[1], {});
  } catch (error) {
    throw new Error(`Failed to parse CLIENTS: ${error.message}`);
  }

  if (!Array.isArray(clients)) {
    throw new Error('CLIENTS is not an array');
  }

  return clients;
}

function toClientDocs(clients) {
  return clients.map((client, index) => {
    const normalizedClient = JSON.parse(JSON.stringify(client));
    const id = client.slug || slugFromName(client.name) || `client-${index + 1}`;
    return {
      id,
      data: {
        ...normalizedClient,
        order: Number.isFinite(Number(normalizedClient.order))
          ? Number(normalizedClient.order)
          : index + 1,
      },
    };
  });
}

async function seedClients({ prune }) {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const clientDocs = toClientDocs(loadClientsFromSource());

  const batch = writeBatch(db);
  clientDocs.forEach((client) => {
    batch.set(doc(db, 'clients', client.id), client.data);
  });

  let prunedCount = 0;
  if (prune) {
    const snapshot = await getDocs(collection(db, 'clients'));
    const keepIds = new Set(clientDocs.map((client) => client.id));
    snapshot.docs.forEach((snapshotDoc) => {
      if (!keepIds.has(snapshotDoc.id)) {
        batch.delete(doc(db, 'clients', snapshotDoc.id));
        prunedCount += 1;
      }
    });
  }

  await batch.commit();

  console.log(`Seeded ${clientDocs.length} client documents.`);
  if (prune) {
    console.log(`Pruned ${prunedCount} extra client documents.`);
  }
}

async function main() {
  const prune = process.argv.includes('--prune');
  await seedClients({ prune });
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
