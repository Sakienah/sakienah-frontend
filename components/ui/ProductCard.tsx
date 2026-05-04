'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product, ProductVariant } from '@/types';
import { StarRating } from './StarRating';
import { QuickView } from './QuickView';
import { DealTimer } from './DealCard';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { formatPrice } from '@/lib/utils';

/** Productkenmerken per categorie — hardcoded tot backend API beschikbaar is */
const FEATURE_MAP: Record<string, string[]> = {
  gebedskleed: ['Premium materiaal', 'Handgemaakt', 'Rugsteun'],
  'koran-accessoires': ['Hout', 'Verstelbaar', 'Compact'],
  deals: ['Voordeelbundel', 'Beperkte oplage'],
};
const DEFAULT_FEATURES = ['Islamitisch gecureerd', 'Premium kwaliteit'];

function getFeatures(categorySlug?: string | null): string[] {
  if (categorySlug && FEATURE_MAP[categorySlug]) return FEATURE_MAP[categorySlug];
  return DEFAULT_FEATURES;
}

type Props = {
  product: Product;
  aspectRatio?: '3/4' | '4/3' | '1/1';
  sizes?: string;
};

/**
 * Productcard met premium layout:
 * 1. Afbeelding met witruimte en carousel
 * 2. Deal timer banner (alleen bij aanbiedingen)
 * 3. Prijs + rating + titel
 * 4. Gratis verzending indicator
 * 5. CTA: "+ Winkelwagen"
 */
export function ProductCard({
  product,
  aspectRatio = '3/4',
  sizes = '(max-width:768px) 100vw, 50vw',
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const { showAddedToast } = useToast();
  const router = useRouter();

  const wishlisted = isWishlisted(product.id);
  const isBundle = (product.bundleItems ?? []).length > 0;
  const hasVariants = !isBundle && product.variants.length > 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const discountPct = product.comparePrice
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.comparePrice)) * 100)
    : null;
  const isBestseller = !isOutOfStock && discountPct === null && product.category?.slug !== 'deals';

  const variantImages = selectedVariant?.images.length ? selectedVariant.images : product.images;
  const images = variantImages.length > 0 ? variantImages : product.images;
  const currentImage = images[currentImageIndex] ?? product.images[0];

  const canAdd = hasVariants ? selectedVariant !== null : !isOutOfStock;
  const features = getFeatures(product.category?.slug);

  function handleVariantSelect(variant: ProductVariant) {
    setSelectedVariant(variant);
    setCurrentImageIndex(0);
  }

  async function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (!canAdd || isOutOfStock) return;
    await addItem(
      product.id,
      selectedVariant?.colorName ?? null,
      selectedVariant?.id,
      selectedVariant?.colorHex ?? undefined,
    );
    setAdded(true);
    showAddedToast(product.name, currentImage);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user) {
      router.push('/login');
      return;
    }
    toggleWishlist(product.id, selectedVariant?.colorName ?? null);
  }

  function navigateImage(dir: number) {
    setCurrentImageIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }

  return (
    <>
      <div
        onClick={() => router.push(`/products/${product.slug}`)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setCurrentImageIndex(0);
        }}
        className="flex flex-col cursor-pointer relative overflow-hidden rounded-lg bg-white"
        style={{
          border: '1px solid #F0EBE3',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        {/* 1. Afbeelding container */}
        <div
          className="flex-shrink-0 relative overflow-hidden bg-[#FAF7F2]"
          style={{
            aspectRatio,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          {currentImage && (
            <div className="w-full h-full flex items-center justify-center bg-[#FAF7F2]">
              <div className="relative" style={{ width: '84%', height: '84%' }}>
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes={sizes}
                  style={{
                    transition: 'transform 0.5s ease',
                    transform: hovered ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
              </div>
            </div>
          )}

          {/* Badges — linksboven op de afbeelding */}
          <div className="absolute flex flex-col" style={{ top: 8, left: 8, gap: 4 }}>
            {isOutOfStock && (
              <span
                className="font-semibold uppercase bg-[#0a0a0a] text-gold"
                style={{ fontSize: 9, letterSpacing: '0.1em', padding: '4px 8px' }}
              >
                Uitverkocht
              </span>
            )}
            {discountPct && !isOutOfStock && (
              <span
                className="font-bold uppercase bg-gold"
                style={{
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  padding: '4px 8px',
                  color: '#0a0a0a',
                }}
              >
                -{discountPct}%
              </span>
            )}
            {isLowStock && !isOutOfStock && !discountPct && (
              <span
                className="low-stock-badge font-semibold uppercase bg-[#0a0a0a] text-gold relative"
                style={{ fontSize: 9, letterSpacing: '0.08em', padding: '5px 8px' }}
              >
                Nog {product.stock} op voorraad
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  aria-hidden="true"
                >
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="200"
                    className="low-stock-border"
                  />
                </svg>
              </span>
            )}
            {isBestseller && !isOutOfStock && !isLowStock && (
              <span
                className="font-semibold uppercase bg-[#0a0a0a] text-gold"
                style={{ fontSize: 9, letterSpacing: '0.1em', padding: '4px 8px' }}
              >
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist hart — rechtsboven */}
          <button
            onClick={handleToggleWishlist}
            className="absolute flex items-center justify-center rounded-full border-none cursor-pointer"
            style={{
              top: 8,
              right: 8,
              background: 'rgba(255,255,255,0.95)',
              width: 34,
              height: 34,
              transition: 'transform 0.2s',
            }}
            aria-label={wishlisted ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
          >
            <svg
              width="14"
              height="14"
              fill={wishlisted ? '#c9a84c' : 'none'}
              stroke={wishlisted ? '#c9a84c' : '#0a0a0a'}
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Quick View oog-icoon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewOpen(true);
            }}
            className="absolute flex items-center justify-center rounded-full border-none cursor-pointer"
            style={{
              top: 48,
              right: 8,
              background: 'rgba(255,255,255,0.95)',
              width: 34,
              height: 34,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(-8px)',
              transition: 'all 0.2s',
            }}
            aria-label="Snel bekijken"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="1.5"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          {/* Carousel pijlen */}
          {images.length > 1 && hovered && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
                className="absolute flex items-center justify-center rounded-full cursor-pointer border z-[5] hover:bg-gold hover:text-white"
                style={{
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  borderColor: '#E8E0D5',
                  width: 28,
                  height: 28,
                  fontSize: 12,
                  color: '#555',
                }}
                aria-label="Vorige afbeelding"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                className="absolute flex items-center justify-center rounded-full cursor-pointer border z-[5] hover:bg-gold hover:text-white"
                style={{
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  borderColor: '#E8E0D5',
                  width: 28,
                  height: 28,
                  fontSize: 12,
                  color: '#555',
                }}
                aria-label="Volgende afbeelding"
              >
                →
              </button>
            </>
          )}

          {/* Dot indicatoren */}
          {images.length > 1 && (
            <div
              className="absolute flex"
              style={{
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                gap: 6,
              }}
            >
              {images.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: i === currentImageIndex ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === currentImageIndex ? '#c9a84c' : 'rgba(10,10,10,0.25)',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Kleurswatches */}
        {hasVariants && (
          <div className="flex px-2 pt-1" style={{ gap: 3 }} onClick={(e) => e.stopPropagation()}>
            {product.variants.slice(0, 5).map((v) => {
              const isSel = selectedVariant?.id === v.id;
              return (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVariantSelect(v);
                  }}
                  disabled={v.stock === 0}
                  title={v.colorName}
                  className="flex-shrink-0 p-0 rounded-full"
                  style={{
                    width: 16,
                    height: 16,
                    background: v.colorHex,
                    border: '2px solid #fff',
                    boxShadow: isSel ? '0 0 0 1.5px #0a0a0a' : '0 0 0 1px rgba(0,0,0,0.15)',
                    cursor: v.stock === 0 ? 'not-allowed' : 'pointer',
                    opacity: v.stock === 0 ? 0.35 : 1,
                    transition: 'box-shadow 0.15s',
                  }}
                  aria-label={v.colorName}
                  aria-pressed={isSel}
                />
              );
            })}
            {product.variants.length > 5 && (
              <span className="text-[#999]" style={{ fontSize: 10, lineHeight: '16px' }}>
                +{product.variants.length - 5}
              </span>
            )}
          </div>
        )}

        {/* 2. Deal Timer — alleen bij aanbiedingen */}
        {product.comparePrice && <DealTimer productId={product.id} />}

        {/* 3. Prijs + Titel + Rating + Kenmerken */}
        <div style={{ padding: '6px 8px 0' }}>
          {/* Prijs + oude prijs */}
          <div className="flex items-baseline" style={{ gap: 6, marginBottom: 2 }}>
            <span className="font-bold text-gold" style={{ fontSize: 15 }}>
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-[#aaa] line-through" style={{ fontSize: 11 }}>
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Titel */}
          <p
            className="font-display"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#0a0a0a',
              margin: '3px 0 2px',
              lineHeight: 1.3,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </p>

          {/* Rating + reviews */}
          <div className="flex items-center" style={{ gap: 4, marginBottom: 4 }}>
            <StarRating count={5} />
            <span className="text-[#aaa]" style={{ fontSize: 10 }}>
              4.9
            </span>
            <span className="text-[#ccc]" style={{ fontSize: 10 }}>
              ·
            </span>
            <span className="text-[#888]" style={{ fontSize: 10 }}>
              (128)
            </span>
          </div>

          {/* Productkenmerken — USP's als bullet points */}
          <div className="flex flex-wrap" style={{ columnGap: 8, rowGap: 1 }}>
            {features.map((f, i) => (
              <span
                key={i}
                className="flex items-center text-[#666]"
                style={{ fontSize: 9, gap: 4 }}
              >
                {i > 0 && <span className="text-[#ccc]">·</span>}
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* 4. CTA knop */}
        <div className="px-2 pb-2" style={{ paddingTop: 6 }} onClick={(e) => e.stopPropagation()}>
          {isBundle ? (
            <Link
              href={`/products/${product.slug}`}
              className="block w-full text-center uppercase font-semibold no-underline bg-[#0a0a0a] text-white"
              style={{ fontSize: 10, letterSpacing: '0.1em', padding: '10px 0' }}
            >
              Stel samen →
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || !canAdd}
              className="w-full uppercase font-semibold border-none text-center"
              style={{
                fontSize: 10,
                letterSpacing: '0.1em',
                padding: '10px 0',
                background: added ? '#c9a84c' : canAdd && !isOutOfStock ? '#0a0a0a' : '#C8C1B8',
                color: added ? '#0a0a0a' : '#fff',
                cursor: isOutOfStock || !canAdd ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s',
              }}
            >
              {added
                ? '✓ Toegevoegd'
                : isOutOfStock
                  ? 'Uitverkocht'
                  : hasVariants && !selectedVariant
                    ? 'Kies kleur'
                    : '+ Winkelwagen'}
            </button>
          )}
        </div>
      </div>

      {quickViewOpen && <QuickView product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}
