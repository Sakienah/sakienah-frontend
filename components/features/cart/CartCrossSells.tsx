'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { getProducts } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

/**
 * Toont maximaal 3 gerelateerde producten onderaan de winkelwagen.
 * Producten worden geselecteerd uit dezelfde categorieën als wat in de cart zit,
 * met uitsluiting van producten die al in de cart zitten.
 */
export function CartCrossSells() {
  const { items, addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Geen cross-sells tonen als de winkelwagen leeg is
    if (items.length === 0) {
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        // Verzamel unieke category-slugs uit de cart-items
        const categorySlugs = [
          ...new Set(
            items.map((item) => item.product.category?.slug).filter((s): s is string => !!s),
          ),
        ];

        // Haal producten op uit alle relevante categorieën
        const allResults: Product[] = [];
        for (const slug of categorySlugs.slice(0, 2)) {
          const catProducts = await getProducts(slug);
          allResults.push(...catProducts);
        }

        // Als er geen categorie-producten zijn, probeer alle producten
        if (allResults.length === 0) {
          const allProducts = await getProducts();
          allResults.push(...allProducts);
        }

        // Filter: geen producten die al in de cart zitten, maximaal actief
        const cartProductIds = new Set(items.map((i) => i.product.id));
        const crossSells = allResults
          .filter((p) => p.isActive && !cartProductIds.has(p.id) && p.stock > 0)
          .slice(0, 3);

        setProducts(crossSells);
      } catch {
        // Stil falen — cross-sells zijn nice-to-have, geen must
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [items]);

  /** Snelle add-to-cart zonder de pagina te verlaten */
  async function handleQuickAdd(e: React.MouseEvent, product: Product) {
    e.preventDefault();
    e.stopPropagation();
    await addItem(product.id);
    setAddedIds((prev) => {
      const next = new Set(prev);
      next.add(product.id);
      return next;
    });
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  }

  // Niets renderen tijdens laden of als er geen producten zijn
  if (loading || products.length === 0) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <h3
        className="font-display"
        style={{ fontSize: 18, fontWeight: 600, color: '#0a0a0a', marginBottom: 16 }}
      >
        Vaak samen gekocht
      </h3>
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        style={{
          background: '#fff',
          border: '1px solid #F0EBE3',
          padding: 24,
        }}
      >
        {products.map((product) => {
          const isAdded = addedIds.has(product.id);
          const image = product.images[0];
          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  transition: 'transform 0.2s',
                }}
                className="hover:translate-y-[-2px]"
              >
                {/* Product thumbnail */}
                <div
                  style={{
                    width: 64,
                    height: 76,
                    background: '#EDE8DF',
                    flexShrink: 0,
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
                      sizes="64px"
                    />
                  )}
                </div>

                {/* Product info + snelle add */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="font-display"
                    style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a', marginBottom: 4 }}
                  >
                    {product.name}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#c9a84c', marginBottom: 6 }}>
                    {formatPrice(product.price)}
                  </p>
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    style={{
                      background: isAdded ? '#c9a84c' : 'transparent',
                      color: isAdded ? '#0a0a0a' : '#666',
                      border: `1px solid ${isAdded ? '#c9a84c' : '#E8E0D5'}`,
                      cursor: 'pointer',
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: '6px 12px',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isAdded ? '✓ Toegevoegd' : '+ Winkelwagen'}
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
