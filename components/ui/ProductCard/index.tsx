'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/types';
import { QuickView } from '../QuickView';
import { DealTimer } from '../DealCard';
import { useProductCard } from './useProductCard';
import { CardImage } from './CardImage';
import { CardSwatches } from './CardSwatches';
import { CardInfo } from './CardInfo';
import { CardCTA } from './CardCTA';
import { resolveFeatures, DEFAULT_SHIPPING_PROMISE } from './constants';

type Props = {
  product: Product;
  aspectRatio?: '3/4' | '4/3' | '1/1' | '4/5';
  sizes?: string;
};

/**
 * Premium product card. Hele card is een Link via het "stretched link"-patroon:
 * een absolute <Link> ligt onder de interactieve knoppen (z-index gestapeld),
 * zodat klikken op de card navigeert maar buttons hun eigen actie behouden.
 */
export function ProductCard({
  product,
  aspectRatio = '3/4',
  sizes = '(max-width:768px) 100vw, 50vw',
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const card = useProductCard(product);

  const features = resolveFeatures(product.features, product.category?.slug);
  const shippingPromise = product.shippingPromise ?? DEFAULT_SHIPPING_PROMISE;

  return (
    <>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col relative overflow-hidden rounded-lg bg-white"
        style={{
          border: '1px solid #F0EBE3',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hovered ? '0 8px 20px rgba(0,0,0,0.06)' : '0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        {/* Stretched link — covers card, sits below interactive buttons */}
        <Link
          href={`/products/${product.slug}`}
          aria-label={product.name}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        />

        <CardImage
          images={card.images}
          currentImageIndex={card.currentImageIndex}
          alt={product.name}
          aspectRatio={aspectRatio}
          sizes={sizes}
          hovered={hovered}
          isOutOfStock={card.isOutOfStock}
          isLowStock={card.isLowStock}
          stock={product.stock}
          discountPct={card.discountPct}
          isBestseller={card.isBestseller}
          isHot={card.isHot}
          soldCount={card.soldCount}
          wishlisted={card.wishlisted}
          onWishlistToggle={card.toggleWishlist}
          onQuickView={() => setQuickViewOpen(true)}
          onNavigate={card.navigateImage}
        />

        {card.hasVariants && (
          <CardSwatches
            variants={product.variants}
            selectedVariantId={card.selectedVariant?.id ?? null}
            onSelect={card.selectVariant}
          />
        )}

        {product.comparePrice && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <DealTimer productId={product.id} />
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
          <CardInfo
            name={product.name}
            price={product.price}
            comparePrice={product.comparePrice}
            rating={product.rating}
            reviewCount={product.reviewCount}
            features={features}
            shippingPromise={shippingPromise}
            trustSignal={product.trustSignal}
            stock={product.stock}
            isLowStock={card.isLowStock}
          />
        </div>

        <CardCTA
          isBundle={card.isBundle}
          isOutOfStock={card.isOutOfStock}
          canAdd={card.canAdd}
          hasVariants={card.hasVariants}
          selectedVariant={card.selectedVariant}
          variantOutOfStock={card.variantOutOfStock}
          added={card.added}
          productSlug={product.slug}
          onAddToCart={card.addToCart}
        />
      </article>

      {quickViewOpen && <QuickView product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}
