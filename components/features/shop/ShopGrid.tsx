'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function ShopProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const wished = isWishlisted(product.id);
  const image = product.images[0];

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
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.13)' : '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          aspectRatio: '3/4',
          overflow: 'hidden',
          position: 'relative',
          background: '#EDE8DF',
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 50vw, 33vw"
            style={{
              transition: 'transform 0.4s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] text-gold/60 font-mono">geen foto</span>
          </div>
        )}
        {product.stock === 0 && (
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
              padding: '5px 10px',
            }}
          >
            Uitverkocht
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!user) {
              router.push('/login');
              return;
            }
            toggleWishlist(product.id);
          }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            cursor: 'pointer',
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          }}
          aria-label={wished ? 'Verwijder uit favorieten' : 'Toevoegen aan favorieten'}
        >
          <svg
            width="13"
            height="13"
            fill={wished ? '#c9a84c' : 'none'}
            stroke={wished ? '#c9a84c' : '#999'}
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div style={{ padding: '18px 20px 22px' }}>
        <p
          className="font-display"
          style={{ fontSize: 17, fontWeight: 500, color: '#0a0a0a', marginBottom: 12 }}
        >
          {product.name}
        </p>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 16, fontWeight: 700, color: '#c9a84c' }}>
            € {parseFloat(product.price).toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              void addItem(product.id);
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }}
            style={{
              background: added ? '#c9a84c' : '#0a0a0a',
              color: added ? '#0a0a0a' : '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 9,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '10px 16px',
              fontWeight: 600,
              transition: 'all 0.25s',
            }}
          >
            {added ? '✓ Toegevoegd' : 'Toevoegen'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShopGrid({ products }: { products: Product[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {products.map((p) => (
        <ShopProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
