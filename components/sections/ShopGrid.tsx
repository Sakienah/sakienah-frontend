'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

function formatPrice(price: string) {
  return `€ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

function ShopProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const wished = isWishlisted(product.id);
  const image = product.images[0];

  return (
    <div
      className="bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EDE8DF]">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] text-gold/60 font-mono">geen foto</span>
          </div>
        )}

        <div
          className="absolute inset-0 bg-[#0a0a0a]/60 flex items-end justify-center pb-6 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <button
            onClick={() => {
              addItem(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }}
            className="text-[10px] tracking-[0.15em] uppercase font-semibold text-gold"
          >
            {added ? '✓ Toegevoegd' : '+ Winkelwagen'}
          </button>
        </div>

        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-[#0a0a0a] text-gold text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">
            Uitverkocht
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center"
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

      <Link href={`/products/${product.slug}`} className="block px-4 pt-4 pb-5">
        <p className="font-arabic text-[13px] text-gold/80 mb-1" style={{ direction: 'rtl' }}>
          {product.category?.name ?? ''}
        </p>
        <p className="text-[13px] font-medium text-[#0a0a0a] mb-1.5">{product.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-gold">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-[11px] text-zinc-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}

export function ShopGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => (
        <ShopProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
