'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function HeroProductCards({ products }: { products: Product[] }) {
  return (
    <div className="w-full" style={{ maxWidth: 320 }}>
      {products.map((p) => (
        <HeroProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function HeroProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const wished = isWishlisted(product.id);
  const image = product.images[0];

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round((1 - Number(product.price) / Number(product.comparePrice)) * 100)
      : null;

  const formatPrice = (p: string | number) => {
    const num = typeof p === 'string' ? parseFloat(p) : p;
    return `€ ${num.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-full bg-[#FAF7F2] relative z-[2] transition-shadow transition-transform duration-300"
      style={{
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        borderRadius: 10,
        padding: 20,
      }}
    >
      <button
        onClick={() => {
          if (!user) {
            router.push('/login');
            return;
          }
          toggleWishlist(product.id);
        }}
        className="absolute z-10 flex items-center justify-center rounded-full border-none cursor-pointer"
        style={{
          top: 12,
          right: 12,
          background: 'rgba(255,255,255,0.95)',
          width: 32,
          height: 32,
        }}
        aria-label={wished ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
      >
        <svg
          width="14"
          height="14"
          fill={wished ? '#c9a84c' : 'none'}
          stroke={wished ? '#c9a84c' : '#999'}
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {discount && (
        <span
          className="absolute z-10 font-bold"
          style={{
            top: 12,
            left: 12,
            background: '#c9a84c',
            color: '#0a0a0a',
            fontSize: 10,
            padding: '3px 7px',
            borderRadius: 5,
          }}
        >
          -{discount}%
        </span>
      )}

      <div
        className="overflow-hidden relative mb-3"
        style={{ aspectRatio: '4/3', borderRadius: 8 }}
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="320px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#EDE8DF]">
            <span className="text-[9px] text-gold/60 font-mono">geen foto</span>
          </div>
        )}
      </div>

      <div style={{ padding: '0 2px' }}>
        <p
          className="font-medium mb-1"
          style={{
            fontSize: 14,
            color: '#0a0a0a',
          }}
        >
          {product.name}
        </p>

        <div className="flex items-center mb-2" style={{ gap: 5 }}>
          <span className="flex items-center" style={{ gap: 3 }}>
            <svg width="11" height="11" viewBox="0 0 20 20" style={{ fill: '#c9a84c' }}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span style={{ fontSize: 12, color: '#0a0a0a' }}>4.9</span>
          </span>
          <span style={{ fontSize: 12, color: '#999' }}>(120 reviews)</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold" style={{ color: '#c9a84c' }}>
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="line-through" style={{ fontSize: 12, color: '#aaa' }}>
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        <p className="font-medium mb-3" style={{ fontSize: 11, color: '#c9a84c' }}>
          ● Nog 5 op voorraad
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="block w-full font-semibold text-center transition-colors"
          style={{
            background: '#0a0a0a',
            color: '#fff',
            padding: '12px 18px',
            borderRadius: 7,
            fontSize: 11,
            letterSpacing: '0.05em',
          }}
        >
          Bekijk details
        </Link>
      </div>
    </div>
  );
}
