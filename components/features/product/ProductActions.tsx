'use client';

import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function ProductActions({ product }: { product: Product }) {
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const wished = isWishlisted(product.id);

  function handleAddToCart() {
    if (!user) {
      router.push('/login');
      return;
    }
    void addItem(product.id);
  }

  return (
    <div className="flex gap-3 mb-8">
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="flex-1 bg-gold text-[#0a0a0a] text-[11px] tracking-[0.15em] uppercase font-semibold py-4 hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {product.stock === 0 ? 'Uitverkocht' : '+ Voeg toe aan winkelwagen'}
      </button>
      <button
        onClick={() => {
          if (!user) {
            router.push('/login');
            return;
          }
          toggleWishlist(product.id);
        }}
        className="border border-[#E8E0D5] px-4 py-4 hover:border-gold transition-colors"
        aria-label={wished ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
      >
        <svg
          width="18"
          height="18"
          fill={wished ? '#c9a84c' : 'none'}
          stroke={wished ? '#c9a84c' : '#888'}
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );
}
