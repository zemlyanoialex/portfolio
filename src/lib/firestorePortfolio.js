import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { DEFAULT_PORTFOLIO_CONTENT } from '../data/portfolioData';
import { db, hasFirebaseConfig } from './firebase';

const COLLECTIONS = {
  techStack: 'techStack',
  stats: 'stats',
  experience: 'experience',
  projects: 'projects',
  blogPosts: 'blogPosts',
  updates: 'updates',
};

function sortByOrder(a, b) {
  return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
}

function withDocId(documentSnapshot) {
  return {
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  };
}

async function getOrderedCollection(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(withDocId).sort(sortByOrder);
}

function pickRemoteOrDefault(remoteValue, fallbackValue) {
  if (Array.isArray(remoteValue)) {
    return remoteValue.length ? remoteValue : fallbackValue;
  }
  return remoteValue && Object.keys(remoteValue).length ? remoteValue : fallbackValue;
}

export async function fetchPortfolioContent() {
  if (!hasFirebaseConfig || !db) {
    return {
      content: DEFAULT_PORTFOLIO_CONTENT,
      source: 'local',
      error: null,
    };
  }

  try {
    const [
      techStack,
      stats,
      experience,
      projects,
      blogPosts,
      updates,
      profileSnapshot,
      siteConfigSnapshot,
    ] = await Promise.all([
      getOrderedCollection(COLLECTIONS.techStack),
      getOrderedCollection(COLLECTIONS.stats),
      getOrderedCollection(COLLECTIONS.experience),
      getOrderedCollection(COLLECTIONS.projects),
      getOrderedCollection(COLLECTIONS.blogPosts),
      getOrderedCollection(COLLECTIONS.updates),
      getDoc(doc(db, 'profile', 'main')),
      getDoc(doc(db, 'siteConfig', 'main')),
    ]);

    const profile = profileSnapshot.exists() ? profileSnapshot.data() : null;
    const siteConfig = siteConfigSnapshot.exists() ? siteConfigSnapshot.data() : null;
    const projectImages = siteConfig?.projectImages ?? null;

    return {
      source: 'firestore',
      error: null,
      content: {
        ...DEFAULT_PORTFOLIO_CONTENT,
        profile: {
          ...DEFAULT_PORTFOLIO_CONTENT.profile,
          ...pickRemoteOrDefault(profile, DEFAULT_PORTFOLIO_CONTENT.profile),
        },
        siteConfig: {
          ...DEFAULT_PORTFOLIO_CONTENT.siteConfig,
          ...pickRemoteOrDefault(siteConfig, DEFAULT_PORTFOLIO_CONTENT.siteConfig),
        },
        techStack: pickRemoteOrDefault(techStack, DEFAULT_PORTFOLIO_CONTENT.techStack),
        stats: pickRemoteOrDefault(stats, DEFAULT_PORTFOLIO_CONTENT.stats),
        experience: pickRemoteOrDefault(experience, DEFAULT_PORTFOLIO_CONTENT.experience),
        projects: pickRemoteOrDefault(projects, DEFAULT_PORTFOLIO_CONTENT.projects),
        blogPosts: pickRemoteOrDefault(blogPosts, DEFAULT_PORTFOLIO_CONTENT.blogPosts),
        updates: pickRemoteOrDefault(updates, DEFAULT_PORTFOLIO_CONTENT.updates),
        projectImages: {
          ...DEFAULT_PORTFOLIO_CONTENT.projectImages,
          ...pickRemoteOrDefault(projectImages, {}),
        },
      },
    };
  } catch (error) {
    return {
      content: DEFAULT_PORTFOLIO_CONTENT,
      source: 'local',
      error,
    };
  }
}
