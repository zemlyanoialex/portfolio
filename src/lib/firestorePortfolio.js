import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { DEFAULT_PORTFOLIO_CONTENT } from '../data/portfolioData';
import { db, hasFirebaseConfig } from './firebase';

const COLLECTIONS = {
  techStack: 'techStack',
  stats: 'stats',
  experience: 'experience',
  clients: 'clients',
  testimonials: 'testimonials',
  projects: 'projects',
  blogPosts: 'blogPosts',
  updates: 'updates',
};

function sortByOrder(a, b) {
  return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
}

function toComparableValue(point, fallback = 0) {
  if (!point || typeof point.year !== 'number') {
    return fallback;
  }
  const month = typeof point.month === 'number' ? point.month : 1;
  return point.year * 100 + month;
}

function isCurrentRole(item) {
  return Boolean(item.timeline) && !item.timeline.to;
}

function sortExperienceByTimelineDesc(a, b) {
  const aHasTimeline = Boolean(a.timeline?.from || a.timeline?.to);
  const bHasTimeline = Boolean(b.timeline?.from || b.timeline?.to);

  if (!aHasTimeline && !bHasTimeline) {
    return sortByOrder(a, b);
  }

  if (aHasTimeline && !bHasTimeline) {
    return -1;
  }
  if (!aHasTimeline && bHasTimeline) {
    return 1;
  }

  const aCurrent = isCurrentRole(a);
  const bCurrent = isCurrentRole(b);

  if (aCurrent !== bCurrent) {
    return aCurrent ? -1 : 1;
  }

  const aTo = toComparableValue(a.timeline?.to, 0);
  const bTo = toComparableValue(b.timeline?.to, 0);
  if (aTo !== bTo) {
    return bTo - aTo;
  }

  const aFrom = toComparableValue(a.timeline?.from, 0);
  const bFrom = toComparableValue(b.timeline?.from, 0);
  if (aFrom !== bFrom) {
    return bFrom - aFrom;
  }

  return sortByOrder(a, b);
}

function withDocId(documentSnapshot) {
  return {
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  };
}

async function getCollection(collectionName, sortFn = sortByOrder) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(withDocId).sort(sortFn);
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
      clients,
      testimonials,
      projects,
      blogPosts,
      updates,
      profileSnapshot,
      siteConfigSnapshot,
    ] = await Promise.all([
      getCollection(COLLECTIONS.techStack),
      getCollection(COLLECTIONS.stats),
      getCollection(COLLECTIONS.experience, sortExperienceByTimelineDesc),
      getCollection(COLLECTIONS.clients),
      getCollection(COLLECTIONS.testimonials),
      getCollection(COLLECTIONS.projects),
      getCollection(COLLECTIONS.blogPosts),
      getCollection(COLLECTIONS.updates),
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
        clients: pickRemoteOrDefault(clients, DEFAULT_PORTFOLIO_CONTENT.clients),
        testimonials: pickRemoteOrDefault(
          testimonials,
          DEFAULT_PORTFOLIO_CONTENT.testimonials
        ),
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
