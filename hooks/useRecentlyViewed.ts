'use client';

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'sakienah_recently_viewed';
const MAX_ITEMS = 4;

/**
 * Product-ID data die we opslaan in localStorage voor 'recent bekeken'.
 */
type RecentProduct = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: string;
};

/** Lees opgeslagen producten uit localStorage bij initialisatie (eenmalig) */
function loadRecentFromStorage(): RecentProduct[] {
  try {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as RecentProduct[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage onbeschikbaar
  }
  return [];
}

/**
 * Hook die recent bekeken producten bijhoudt via localStorage.
 */
export function useRecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>(loadRecentFromStorage);

  /** Voeg een product toe aan de recent-bekeken lijst */
  const addToRecent = useCallback((product: RecentProduct) => {
    setRecentProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const next = [product, ...filtered].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage onbeschikbaar
      }
      return next;
    });
  }, []);

  return { recentProducts, addToRecent };
}
