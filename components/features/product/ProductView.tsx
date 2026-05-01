'use client';

import { useState } from 'react';
import type { Product, ProductVariant } from '@/types';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductDetail } from './ProductDetail';

export function ProductView({ product }: { product: Product }) {
  const isBundle = (product.bundleItems ?? []).length > 0;
  const firstVariant = !isBundle && product.variants.length > 0 ? product.variants[0] : null;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(firstVariant);
  const [bundleSelections, setBundleSelections] = useState<Map<string, ProductVariant>>(new Map());

  const images =
    selectedVariant && selectedVariant.images.length > 0 ? selectedVariant.images : product.images;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[44fr_56fr] gap-8 lg:gap-16">
      <ProductImageGallery
        images={images}
        name={product.name}
        key={selectedVariant?.id ?? 'base'}
      />
      <ProductDetail
        product={product}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
        bundleSelections={bundleSelections}
        onBundleSelectionChange={setBundleSelections}
      />
    </div>
  );
}
