'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product, ProductVariant } from '@/types';
import { StarRating } from './StarRating';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';

type Props = {
  product: Product;
  aspectRatio?: '3/4' | '4/3' | '1/1';
  sizes?: string;
};

export function ProductCard({
  product,
  aspectRatio = '3/4',
  sizes = '(max-width:768px) 100vw, 50vw',
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const image = product.images[0];
  const wishlisted = isWishlisted(product.id);
  const isBundle = (product.bundleItems ?? []).length > 0;
  const hasVariants = !isBundle && product.variants.length > 0;
  const canAdd = !hasVariants || selectedVariant !== null;
  const isOutOfStock = product.stock === 0;
  const discountPct = product.comparePrice
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.comparePrice)) * 100)
    : null;

  const visibleVariants = product.variants.slice(0, 6);
  const extraCount = product.variants.length - 6;

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

  function handleSwatchClick(e: React.MouseEvent, variant: ProductVariant) {
    e.stopPropagation();
    setSelectedVariant((prev) => (prev?.id === variant.id ? null : variant));
  }

  return (
    <div
      onClick={() => router.push(`/products/${product.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid #F0EBE3',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.13)' : '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes={sizes}
            style={{
              transition: 'transform 0.4s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#EDE8DF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 10, color: '#c9a84c', opacity: 0.6, fontFamily: 'monospace' }}>
              geen foto
            </span>
          </div>
        )}

        {/* Badge */}
        {isOutOfStock && (
          <span
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              background: '#0a0a0a',
              color: '#c9a84c',
              fontSize: 9,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '6px 12px',
            }}
          >
            Uitverkocht
          </span>
        )}
        {discountPct && !isOutOfStock && (
          <span
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              background: '#c9a84c',
              color: '#0a0a0a',
              fontSize: 9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 10px',
              fontWeight: 700,
            }}
          >
            -{discountPct}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleToggleWishlist}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(255,255,255,0.95)',
            border: 'none',
            cursor: 'pointer',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          }}
          aria-label={wishlisted ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
        >
          <svg
            width="15"
            height="15"
            fill={wishlisted ? '#c9a84c' : 'none'}
            stroke={wishlisted ? '#c9a84c' : '#888'}
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Color swatches */}
      {hasVariants && (
        <div
          style={{ padding: '12px 18px 0', display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={(e) => e.stopPropagation()}
        >
          {visibleVariants.map((variant) => {
            const isSelected = selectedVariant?.id === variant.id;
            return (
              <button
                key={variant.id}
                onClick={(e) => handleSwatchClick(e, variant)}
                title={variant.colorName}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: variant.colorHex,
                  border: '2px solid #fff',
                  boxShadow: isSelected ? '0 0 0 2px #0a0a0a' : '0 0 0 1.5px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                  transition: 'box-shadow 0.15s',
                }}
                aria-label={variant.colorName}
                aria-pressed={isSelected}
              />
            );
          })}
          {extraCount > 0 && (
            <span style={{ fontSize: 11, color: '#888', fontWeight: 500 }}>+{extraCount}</span>
          )}
        </div>
      )}

      {/* Info */}
      <div style={{ padding: hasVariants ? '10px 18px 0' : '20px 18px 0', flex: 1 }}>
        <p
          className="font-display"
          style={{ fontSize: 17, fontWeight: 500, color: '#0a0a0a', marginBottom: 5 }}
        >
          {product.name}
        </p>
        <div className="flex items-center" style={{ gap: 6, marginBottom: 8 }}>
          <StarRating count={5} />
          <span style={{ fontSize: 11, color: '#aaa' }}>4.9</span>
          {product.category && (
            <span style={{ fontSize: 11, color: '#ccc' }}> · {product.category.name}</span>
          )}
        </div>
        <div className="flex items-center" style={{ gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#c9a84c' }}>
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span style={{ fontSize: 12, color: '#ccc', textDecoration: 'line-through' }}>
              {formatPrice(product.comparePrice)}
            </span>
          )}
          {discountPct && (
            <span style={{ fontSize: 11, color: '#c9a84c', fontWeight: 600 }}>
              {discountPct}% korting
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{ padding: '0 18px 20px', display: 'flex', gap: 8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          href={`/products/${product.slug}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            padding: '11px 0',
            border: '1px solid #D9D3C9',
            color: '#0a0a0a',
            textDecoration: 'none',
            display: 'block',
          }}
        >
          Bekijk
        </Link>
        {isBundle ? (
          <Link
            href={`/products/${product.slug}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1.4,
              textAlign: 'center',
              background: '#0a0a0a',
              color: '#fff',
              border: 'none',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '11px 0',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'block',
              whiteSpace: 'nowrap',
            }}
          >
            Stel samen →
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            style={{
              flex: 1.4,
              background: added ? '#c9a84c' : canAdd && !isOutOfStock ? '#0a0a0a' : '#C8C1B8',
              color: added ? '#0a0a0a' : '#fff',
              border: 'none',
              cursor: isOutOfStock || !canAdd ? 'not-allowed' : 'pointer',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '11px 0',
              fontWeight: 600,
              transition: 'background 0.25s, color 0.25s',
              whiteSpace: 'nowrap',
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
  );
}
