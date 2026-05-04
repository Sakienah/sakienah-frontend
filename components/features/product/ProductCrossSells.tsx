'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

type Props = {
  /** Slug van de huidige productcategorie voor gerelateerde suggesties */
  categorySlug: string;
  /** ID van het huidige product om te voorkomen dat het zichzelf aanbeveelt */
  currentProductId: string;
};

/**
 * Toont 3 gerelateerde producten onderaan de productdetailpagina.
 * Geselecteerd uit dezelfde categorie, exclusief het huidige product.
 * Verhoogt de gemiddelde orderwaarde en stimuleert herontdekking.
 */
export function ProductCrossSells({ categorySlug, currentProductId }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const all = await getProducts(categorySlug);
        const filtered = all
          .filter((p) => p.isActive && p.id !== currentProductId && p.stock > 0)
          .slice(0, 3);
        setProducts(filtered);
      } catch {
        // Stil falen — cross-sells zijn optioneel
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [categorySlug, currentProductId]);

  if (loading || products.length === 0) return null;

  return (
    <div style={{ marginTop: 64 }}>
      <h3
        className="font-display"
        style={{ fontSize: 24, fontWeight: 600, color: '#0a0a0a', marginBottom: 24 }}
      >
        Ook interessant
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((product) => {
          const image = product.images[0];
          const discountPct = product.comparePrice
            ? Math.round((1 - parseFloat(product.price) / parseFloat(product.comparePrice)) * 100)
            : null;

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #F0EBE3',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                className="hover:translate-y-[-4px] hover:shadow-lg"
              >
                {/* Productafbeelding */}
                <div
                  style={{
                    aspectRatio: '3/4',
                    background: '#EDE8DF',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  )}
                  {discountPct && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        background: '#c9a84c',
                        color: '#0a0a0a',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '4px 8px',
                      }}
                    >
                      -{discountPct}%
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: 14 }}>
                  <p
                    className="font-display"
                    style={{ fontSize: 14, fontWeight: 500, color: '#0a0a0a', marginBottom: 6 }}
                  >
                    {product.name}
                  </p>
                  <div className="flex items-baseline" style={{ gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#c9a84c' }}>
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span style={{ fontSize: 11, color: '#ccc', textDecoration: 'line-through' }}>
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
