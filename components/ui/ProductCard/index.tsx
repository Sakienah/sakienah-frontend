'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { QuickView } from '../QuickView';
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
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const card = useProductCard(product);

  const features = resolveFeatures(product.features, product.category?.slug);
  const shippingPromise = product.shippingPromise ?? DEFAULT_SHIPPING_PROMISE;

  return (
    <>
      <motion.article
        className="group flex flex-col relative overflow-hidden rounded-2xl bg-white h-full"
        style={
          {
            border: '1px solid rgba(201,168,76,0.18)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            '--product-gold': '#c9a84c',
            '--product-gold-light': 'rgba(201,168,76,0.18)',
            '--product-gold-soft': 'rgba(201,168,76,0.08)',
          } as React.CSSProperties
        }
        initial="initial"
        whileHover="hover"
        variants={{
          initial: { y: 0 },
          hover: { y: -10 },
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      >
        {/* Background wash */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, var(--product-gold-light) 0%, transparent 55%)',
          }}
        />

        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='none' stroke='%23c9a84c' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '22px 22px',
          }}
        />

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
          <div className="absolute z-10" style={{ top: 36, left: 10 }}>
            <CardSwatches
              variants={product.variants}
              selectedVariantId={card.selectedVariant?.id ?? null}
              onSelect={card.selectVariant}
            />
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none', flex: '1 0 auto' }}>
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
      </motion.article>

      {quickViewOpen && <QuickView product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}
