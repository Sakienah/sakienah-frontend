'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { StarRating } from '@/components/ui/StarRating';

function formatPrice(price: string) {
  return `€ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

function BigProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const wished = isWishlisted(product.id);
  const image = product.images[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="bg-white overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-[3/4] overflow-hidden"
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-[#EDE8DF] flex items-center justify-center">
            <span className="text-[10px] text-gold/70 font-mono tracking-[0.1em] text-center px-6">
              product shot
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-[#0a0a0a]/60 flex items-end justify-center pb-7 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <span className="text-[11px] tracking-[0.18em] uppercase text-gold font-semibold">
            Bekijk product →
          </span>
        </div>

        {product.stock === 0 && (
          <span className="absolute top-4 left-4 bg-[#0a0a0a] text-gold text-[9px] tracking-[0.15em] uppercase px-2.5 py-1.5">
            Uitverkocht
          </span>
        )}
        {product.comparePrice && (
          <span className="absolute top-4 right-14 bg-gold text-[#0a0a0a] text-[9px] tracking-[0.12em] uppercase px-2.5 py-1.5 font-bold">
            Sale
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 bg-white/95 rounded-full w-9 h-9 flex items-center justify-center"
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
      </Link>

      <div className="px-6 py-[22px] flex items-start justify-between gap-4">
        <Link href={`/products/${product.slug}`} className="flex-1 min-w-0">
          <p className="font-arabic text-[15px] text-gold/85 mb-1" style={{ direction: 'rtl' }}>
            {product.category?.name ?? ''}
          </p>
          <p className="font-display text-[18px] font-medium text-[#0a0a0a] mb-1.5">
            {product.name}
          </p>
          <p className="text-[12px] text-zinc-400 mb-2.5">{product.category?.name}</p>
          <div className="flex items-center gap-2">
            <StarRating count={5} />
            <span className="text-[11px] text-zinc-400">4.9</span>
          </div>
        </Link>

        <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
          {product.comparePrice && (
            <span className="text-[12px] text-zinc-300 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
          <span className="text-[18px] font-bold text-gold">{formatPrice(product.price)}</span>
          <button
            onClick={handleAdd}
            className="text-[10px] tracking-[0.15em] uppercase font-semibold px-5 py-3 transition-all duration-200 whitespace-nowrap"
            style={{
              background: added ? '#c9a84c' : '#0a0a0a',
              color: added ? '#0a0a0a' : '#fff',
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((p) => (
        <BigProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
