'use client';

import type { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';

export function ShopGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          aspectRatio="4/5"
          sizes="(max-width:768px) 50vw, 33vw"
        />
      ))}
    </div>
  );
}
