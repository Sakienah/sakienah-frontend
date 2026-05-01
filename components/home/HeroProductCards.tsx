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
    <div style={{ width: '100%', maxWidth: 340 }}>
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

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        maxWidth: '100%',
        background: '#fff',
        position: 'relative',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        zIndex: 2,
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
        className="absolute z-10 flex items-center justify-center"
        style={{
          top: 12,
          right: 12,
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          cursor: 'pointer',
          width: 32,
          height: 32,
          borderRadius: '50%',
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

      <Link
        href={`/products/${product.slug}`}
        style={{
          aspectRatio: '4/3',
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          background: '#EDE8DF',
        }}
      >
        {image ? (
          <Image src={image} alt={product.name} fill className="object-cover" sizes="300px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] text-gold/60 font-mono">geen foto</span>
          </div>
        )}
      </Link>

      <div style={{ padding: '16px 18px 20px' }}>
        <p
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: '#0a0a0a', marginBottom: 8 }}
        >
          {product.name}
        </p>
        <div className="flex items-center" style={{ gap: 10 }}>
          <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: '#c9a84c' }}>
            € {parseFloat(product.price).toFixed(2).replace('.', ',')}
          </span>
          {product.comparePrice && (
            <span
              style={{ fontSize: 'var(--text-sm)', color: '#aaa', textDecoration: 'line-through' }}
            >
              € {parseFloat(product.comparePrice).toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
