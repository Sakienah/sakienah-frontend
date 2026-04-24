'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { StarRating } from './StarRating';
import { useProductActions } from '@/hooks/useProductActions';
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
  const { added, wishlisted, handleAddToCart, handleToggleWishlist } = useProductActions(
    product.id,
  );
  const image = product.images[0];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#fff', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
    >
      {/* Image */}
      <div style={{ aspectRatio, overflow: 'hidden', position: 'relative' }}>
        {image ? (
          <Image src={image} alt={product.name} fill className="object-cover" sizes={sizes} />
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

        {/* Hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,10,0.6)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 28,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.28s',
          }}
        >
          <Link
            href={`/products/${product.slug}`}
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              fontWeight: 600,
            }}
          >
            Bekijk product →
          </Link>
        </div>

        {/* Badges */}
        {product.stock === 0 && (
          <span
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
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
        {product.comparePrice && (
          <span
            style={{
              position: 'absolute',
              top: 16,
              right: 56,
              background: '#c9a84c',
              color: '#0a0a0a',
              fontSize: 9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 10px',
              fontWeight: 700,
            }}
          >
            Sale
          </span>
        )}

        {/* Wishlist button */}
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

      {/* Product info */}
      <div
        style={{
          padding: '22px 24px 26px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <Link href={`/products/${product.slug}`} style={{ flex: 1 }}>
          {product.category && (
            <p
              className="font-arabic"
              style={{
                fontSize: 15,
                color: '#c9a84c',
                direction: 'rtl',
                marginBottom: 4,
                opacity: 0.85,
              }}
            >
              {product.category.name}
            </p>
          )}
          <p
            className="font-display"
            style={{ fontSize: 18, fontWeight: 500, color: '#0a0a0a', marginBottom: 6 }}
          >
            {product.name}
          </p>
          <div className="flex items-center" style={{ gap: 8 }}>
            <StarRating count={5} />
            <span style={{ fontSize: 11, color: '#aaa' }}>4.9</span>
          </div>
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          {product.comparePrice && (
            <span style={{ fontSize: 12, color: '#ccc', textDecoration: 'line-through' }}>
              {formatPrice(product.comparePrice)}
            </span>
          )}
          <span style={{ fontSize: 18, fontWeight: 700, color: '#c9a84c' }}>
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              background: added ? '#c9a84c' : '#0a0a0a',
              color: added ? '#0a0a0a' : '#fff',
              border: 'none',
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              opacity: product.stock === 0 ? 0.5 : 1,
              fontSize: 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '12px 20px',
              fontWeight: 600,
              transition: 'all 0.25s',
              whiteSpace: 'nowrap',
            }}
          >
            {added ? '✓ Toegevoegd' : '+ Winkelwagen'}
          </button>
        </div>
      </div>
    </div>
  );
}
