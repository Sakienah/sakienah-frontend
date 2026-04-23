'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

function WishlistCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem, toggleWishlist } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const image = product.images[0];

  return (
    <div style={{ background: '#fff', border: '1px solid #F0EBE3', overflow: 'hidden' }}>
      <div
        style={{
          aspectRatio: '3/4',
          position: 'relative',
          overflow: 'hidden',
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
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span style={{ fontSize: 10, color: '#c9a84c', opacity: 0.6 }}>geen foto</span>
          </div>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
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
          aria-label="Verwijder uit favorieten"
        >
          <svg
            width="14"
            height="14"
            fill="#c9a84c"
            stroke="#c9a84c"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        {product.category && (
          <p
            className="font-arabic"
            style={{
              fontSize: 14,
              color: '#c9a84c',
              direction: 'rtl',
              marginBottom: 4,
              opacity: 0.8,
            }}
          >
            {product.category.name}
          </p>
        )}
        <p
          className="font-display"
          style={{ fontSize: 17, fontWeight: 500, color: '#0a0a0a', marginBottom: 10 }}
        >
          {product.name}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              padding: '8px 14px',
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

export function WishlistPageContent({ allProducts }: { allProducts: Product[] }) {
  const { wishlist } = useCart();
  const wishedProducts = allProducts.filter((p) => wishlist.has(p.id));

  if (wishlist.size === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 0',
          border: '1px solid #F0EBE3',
          background: '#fff',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16, color: '#ddd' }}>♡</div>
        <h2
          className="font-display"
          style={{ fontSize: 28, fontWeight: 600, color: '#0a0a0a', marginBottom: 12 }}
        >
          Geen favorieten opgeslagen
        </h2>
        <p style={{ fontSize: 14, color: '#aaa', marginBottom: 32 }}>
          Voeg producten toe aan je verlanglijst vanuit de shop.
        </p>
        <Link
          href="/shop"
          style={{
            display: 'inline-block',
            background: '#0a0a0a',
            color: '#c9a84c',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '14px 36px',
          }}
        >
          Ontdek onze collectie
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {wishedProducts.map((product) => (
        <WishlistCard key={product.id} product={product} />
      ))}
    </div>
  );
}
