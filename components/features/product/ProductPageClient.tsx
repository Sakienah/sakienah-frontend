'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { RecentlyViewedSection } from '@/components/ui/RecentlyViewed';
import type { Product } from '@/types';

/**
 * Client-side wrapper die:
 * 1. Het huidige product registreert in localStorage (recent bekeken)
 * 2. De RecentlyViewedSection rendert
 */
export function ProductPageClient({ product }: { product: Product }) {
  const { addToRecent } = useRecentlyViewed();

  useEffect(() => {
    if (product) {
      addToRecent({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0] ?? '',
        price: product.price,
      });
    }
  }, [product, addToRecent]);

  return <RecentlyViewedSection />;
}
