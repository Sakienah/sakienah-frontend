'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProductCard } from '@/components/ui/ProductCard';

export function WishlistPage({ allProducts }: { allProducts: Product[] }) {
  const { wishlist } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div style={{ padding: '80px 0', textAlign: 'center' }}>Laden...</div>;
  }

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
