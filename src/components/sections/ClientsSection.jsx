import { ImageOff } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CLIENTS } from '../../data/portfolioData';

function storagePathToUrl(pathValue) {
  if (typeof pathValue !== 'string' || !pathValue.trim()) {
    return '';
  }

  const bucket =
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
    || (process.env.REACT_APP_FIREBASE_PROJECT_ID
      ? `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebasestorage.app`
      : '');

  if (!bucket) {
    return '';
  }

  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    pathValue.trim()
  )}?alt=media`;
}

function resolveMediaUrl(rawPath) {
  if (typeof rawPath === 'string' && /^https?:\/\//i.test(rawPath.trim())) {
    return rawPath.trim();
  }

  return storagePathToUrl(rawPath);
}

function buildLogoCandidates(client) {
  const candidates = [
    resolveMediaUrl(client?.logo?.path),
    storagePathToUrl(client?.logo?.path),
  ].filter(Boolean);

  return [...new Set(candidates)];
}

function getLogoAppearanceClass(client) {
  if (typeof client?.logo?.className === 'string' && client.logo.className.trim()) {
    return client.logo.className.trim();
  }

  switch (client?.slug) {
    case 'pure-charity':
      return 'dark:invert dark:brightness-125 dark:contrast-125';
    case 'km-ware-us-llc':
      return 'dark:invert dark:mix-blend-screen dark:brightness-125';
    case 'digiproduct':
      return 'brightness-[0.35] contrast-150 dark:brightness-100 dark:contrast-100';
    case 'viennaresidence':
      return 'dark:invert dark:brightness-115 dark:contrast-125';
    case 'ecm-solutions':
      return 'dark:brightness-190 dark:contrast-135';
    case 'soundsuite':
      return 'brightness-[0.35] contrast-150 dark:brightness-100 dark:contrast-100';
    case 'soundalerts':
      return 'brightness-[0.45] contrast-145 dark:brightness-110 dark:contrast-120';
    case 'westway':
      return 'dark:invert dark:brightness-125 dark:contrast-115';
    default:
      return '';
  }
}

function ClientLogoItem({ client }) {
  const logoCandidates = useMemo(() => buildLogoCandidates(client), [client]);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);
  const currentSrc = logoCandidates[candidateIndex] || '';

  useEffect(() => {
    setCandidateIndex(0);
    setHasFailedAll(false);
  }, [client?.id, client?.name, client?.slug, logoCandidates.length]);

  const handleLogoError = () => {
    if (candidateIndex + 1 < logoCandidates.length) {
      setCandidateIndex((prev) => prev + 1);
      return;
    }

    setHasFailedAll(true);
  };

  const logoAppearanceClass = getLogoAppearanceClass(client);
  const content = !hasFailedAll && currentSrc ? (
    <img
      src={currentSrc}
      alt={client?.logo?.alt || `${client?.name || 'Client'} logo`}
      loading="lazy"
      onError={handleLogoError}
      className={`max-h-9 md:max-h-10 w-auto max-w-full object-contain opacity-90 group-hover:opacity-100 transition-all ${logoAppearanceClass}`}
    />
  ) : (
    <div className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 flex items-center justify-center">
      <ImageOff className="w-5 h-5" />
    </div>
  );

  return (
    <div className="h-20 rounded-2xl flex items-center justify-center p-4 group bg-gradient-to-br from-slate-900/10 via-slate-700/7 to-slate-900/10 dark:from-cyan-300/12 dark:via-sky-300/8 dark:to-indigo-300/12 hover:from-slate-900/14 hover:via-slate-700/10 hover:to-slate-900/14 dark:hover:from-cyan-400/18 dark:hover:via-sky-400/12 dark:hover:to-indigo-400/18 transition-colors backdrop-blur-[1px]">
      {content}
    </div>
  );
}

export default function ClientsSection({ clients }) {
  const sourceClients = clients?.length ? clients : CLIENTS;
  const visibleClients = sourceClients
    .filter((client) => {
      if (client?.isHidden) {
        return false;
      }

      return buildLogoCandidates(client).length > 0;
    })
    .sort((a, b) => (a?.order ?? Number.MAX_SAFE_INTEGER) - (b?.order ?? Number.MAX_SAFE_INTEGER));

  if (!visibleClients.length) {
    return null;
  }

  return (
    <section
      id="clients"
      className="py-20 px-6 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-orange-500 mb-3">
            Social Proof
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
            Trusted By
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
            Companies and product teams I have worked with across SaaS, education, media, and
            e-commerce projects.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {visibleClients.map((client) => (
              <ClientLogoItem
                key={client.id ?? client.slug ?? client.name}
                client={client}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
