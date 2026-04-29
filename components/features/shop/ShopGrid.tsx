'use client';

import type { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';

export function ShopGrid({ products }: { products: Product[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          aspectRatio="3/4"
          sizes="(max-width:768px) 50vw, 33vw"
        />
      ))}
    </div>
  );
}
