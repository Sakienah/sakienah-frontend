'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

function formatPrice(price: string) {
  return `€ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

function HeroProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useCart();
  const wished = isWishlisted(product.id);
  const image = product.images[0];

  return (
    <div
      className="w-full max-w-[300px] bg-white relative cursor-pointer z-10 transition-all duration-300"
      style={{
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-20 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center"
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

      <Link href={`/products/${product.slug}`}>
        <div className="aspect-[4/3] overflow-hidden bg-[#EDE8DF] relative">
          {image ? (
            <Image src={image} alt={product.name} fill className="object-cover" sizes="300px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[10px] text-gold/70 font-mono tracking-[0.1em] text-center px-6">
                product shot
              </span>
            </div>
          )}
        </div>
        <div className="px-[18px] py-5">
          <p className="font-arabic text-[14px] text-gold/80 mb-1" style={{ direction: 'rtl' }}>
            {product.category?.name ?? ''}
          </p>
          <p className="text-[13px] font-medium text-[#0a0a0a] mb-2">{product.name}</p>
          <div className="flex items-center gap-2.5">
            <span className="text-[15px] font-semibold text-gold">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-[12px] text-zinc-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export function HeroProductCards({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((p) => (
        <HeroProductCard key={p.id} product={p} />
      ))}
    </>
  );
}
