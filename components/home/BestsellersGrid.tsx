'use client';

import type { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

export function BestsellersGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i, 3) * 0.06}>
          <ProductCard product={p} aspectRatio="3/4" />
        </Reveal>
      ))}
    </div>
  );
}
