'use client';

import { useState } from 'react';
import type { Product, Category } from '@/types';
import { GeomPattern } from '@/components/ui/GeomPattern';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const allItems = ['Alles', ...categories.map((c) => c.name)];
  const filtered =
    filter === 'Alles'
      ? products
      : products.filter((p) => p.category?.slug === filter || p.category?.name === filter);

  return (
    <>
      {/* Desktop filter bar (md+) — TrustBar style, unchanged */}
      <div
        className="hidden md:flex"
        style={{
          background: '#0f0d0a',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
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

        {/* Product count */}
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

      {/* Mobile filter bar */}
      <div
        className="flex md:hidden items-center justify-between px-4 py-3 relative"
        style={{
          background: '#0f0d0a',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#c9a84c',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'var(--font-playfair)',
            }}
          >
            <span>{filter}</span>
            <span style={{ fontSize: 10 }}>▼</span>
          </button>
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div
                className="absolute left-0 top-full mt-1 z-20"
                style={{
                  background: '#0f0d0a',
                  border: '1px solid rgba(201,168,76,0.2)',
                  minWidth: 180,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                {allItems.map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      setFilter(name);
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      color: filter === name ? '#c9a84c' : 'rgba(255,255,255,0.8)',
                      fontSize: 14,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-playfair)',
                      borderBottom: '1px solid rgba(201,168,76,0.08)',
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <span
          style={{
            fontSize: 11,
            color: '#c9a84c',
            opacity: 0.7,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {filtered.length} stuks
        </span>
      </div>

      {/* Grid */}
      <div
        className="px-4 md:px-10 py-12 md:py-24 relative overflow-hidden"
        style={{ background: '#FAF7F2' }}
      >
        <GeomPattern flip />
        <div className="max-w-[1280px] mx-auto relative z-10">
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
