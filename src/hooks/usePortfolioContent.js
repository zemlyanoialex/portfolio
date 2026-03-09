import { useEffect, useState } from 'react';
import { DEFAULT_PORTFOLIO_CONTENT } from '../data/portfolioData';
import { fetchPortfolioContent } from '../lib/firestorePortfolio';

export default function usePortfolioContent() {
  const [content, setContent] = useState(DEFAULT_PORTFOLIO_CONTENT);
  const [loading, setLoading] = useState(true);
  const [usingFirestore, setUsingFirestore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      const response = await fetchPortfolioContent();
      if (cancelled) {
        return;
      }

      setContent(response.content);
      setUsingFirestore(response.source === 'firestore');
      setError(response.error);
      setLoading(false);
    }

    loadContent();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    content,
    error,
    loading,
    usingFirestore,
  };
}
