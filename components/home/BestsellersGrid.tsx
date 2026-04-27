'use client';

import type { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';

export function BestsellersGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} aspectRatio="3/4" />
      ))}
    </div>
  );
}
