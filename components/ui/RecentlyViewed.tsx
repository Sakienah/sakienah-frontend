'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { formatPrice } from '@/lib/utils';

/**
 * Toont recent bekeken producten onderaan de pagina.
 * De data komt uit localStorage via de useRecentlyViewed hook.
 */
export function RecentlyViewedSection() {
  const { recentProducts } = useRecentlyViewed();

  // Toon niets totdat de localStorage data geladen is (useEffect)
  // of als er minder dan 1 product is
  if (recentProducts.length <= 1) return null;

  return (
    <section
      style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(1rem, 5vw, 2.5rem)',
        background: '#fff',
        borderTop: '1px solid #F0EBE3',
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        <h2
          className="font-display text-center"
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 600,
            color: '#0a0a0a',
            marginBottom: 32,
          }}
        >
          Recent bekeken
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentProducts.map((product) => (
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
                  padding: 12,
                  background: '#FAF7F2',
                  border: '1px solid #F0EBE3',
                  transition: 'transform 0.2s',
                }}
                className="hover:translate-y-[-2px]"
              >
                {/* Product thumbnail */}
                <div
                  style={{
                    width: 56,
                    height: 68,
                    background: '#EDE8DF',
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  )}
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="font-display truncate"
                    style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a', marginBottom: 4 }}
                  >
                    {product.name}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#c9a84c' }}>
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
