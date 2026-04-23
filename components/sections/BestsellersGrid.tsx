'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

function Stars() {
  return (
    <span className="flex" style={{ gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 20 20" style={{ fill: '#c9a84c' }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function BigProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const wished = isWishlisted(product.id);
  const image = product.images[0];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#fff', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
    >
      <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
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
        <button
          onClick={() => toggleWishlist(product.id)}
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
          aria-label={wished ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
        >
          <svg
            width="15"
            height="15"
            fill={wished ? '#c9a84c' : 'none'}
            stroke={wished ? '#c9a84c' : '#888'}
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

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
          {product.category && (
            <p style={{ fontSize: 12, color: '#aaa', marginBottom: 10 }}>{product.category.name}</p>
          )}
          <div className="flex items-center" style={{ gap: 8 }}>
            <Stars />
            <span style={{ fontSize: 11, color: '#aaa' }}>4.9</span>
          </div>
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          {product.comparePrice && (
            <span style={{ fontSize: 12, color: '#ccc', textDecoration: 'line-through' }}>
              € {parseFloat(product.comparePrice).toFixed(2).replace('.', ',')}
            </span>
          )}
          <span style={{ fontSize: 18, fontWeight: 700, color: '#c9a84c' }}>
            € {parseFloat(product.price).toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={() => {
              if (!user) {
                router.push('/login');
                return;
              }
              void addItem(product.id);
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            style={{
              background: added ? '#c9a84c' : '#0a0a0a',
              color: added ? '#0a0a0a' : '#fff',
              border: 'none',
              cursor: 'pointer',
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

export function BestsellersGrid({ products }: { products: Product[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
      {products.map((p) => (
        <BigProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
