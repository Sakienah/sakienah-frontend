'use client';

import { useState } from 'react';
import type { Product, Category } from '@/types';
import { ShopGrid } from './ShopGrid';

export function ShopPage({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState('Alles');
  const [hovered, setHovered] = useState<string | null>(null);
  const allItems = ['Alles', ...categories.map((c) => c.name)];
  const filtered =
    filter === 'Alles'
      ? products
      : products.filter((p) => p.category?.slug === filter || p.category?.name === filter);

  return (
    <>
      {/* Filter bar — TrustBar stijl */}
      <div
        style={{
          background: '#0f0d0a',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Top gold gradient line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              'linear-gradient(90deg, transparent 0%, #c9a84c 20%, #c9a84c 80%, transparent 100%)',
            opacity: 0.35,
          }}
        />

        {allItems.map((name, i) => {
          const isActive = filter === name;
          const isHovered = hovered === name;
          return (
            <div key={name} style={{ display: 'flex', flex: 1, minWidth: 0 }}>
              {i > 0 && (
                <div
                  style={{
                    width: 1,
                    alignSelf: 'stretch',
                    background: 'rgba(201,168,76,0.12)',
                    flexShrink: 0,
                  }}
                />
              )}
              <button
                onClick={() => setFilter(name)}
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  flex: 1,
                  padding: '18px 24px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                {/* Number */}
                <span
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 12,
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 10,
                    color: '#c9a84c',
                    opacity: isHovered || isActive ? 0.7 : 0.2,
                    fontStyle: 'italic',
                    transition: 'opacity 0.3s',
                    letterSpacing: '0.05em',
                  }}
                >
                  0{i + 1}
                </span>

                {/* Animated bottom line */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: isActive ? '100%' : isHovered ? '100%' : '0%',
                    height: 1.5,
                    background: 'linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.2))',
                    transition: 'width 0.4s ease',
                  }}
                />

                <div
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 15,
                    fontStyle: isHovered ? 'italic' : 'normal',
                    fontWeight: 400,
                    color: isActive ? '#c9a84c' : '#fff',
                    transition: 'all 0.3s',
                  }}
                >
                  {name}
                </div>
              </button>
            </div>
          );
        })}

        {/* Producten teller */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 28px',
            borderLeft: '1px solid rgba(201,168,76,0.12)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: '#c9a84c',
              opacity: 0.7,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {filtered.length} stuks
          </span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ background: '#FAF7F2', padding: '48px 40px 96px' }}>
        <div className="max-w-[1280px] mx-auto">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa', fontSize: 14 }}>
              Geen producten gevonden.
            </div>
          ) : (
            <ShopGrid products={filtered} />
          )}
        </div>
      </div>
    </>
  );
}
