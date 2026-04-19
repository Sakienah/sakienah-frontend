'use client';

import { useState } from 'react';
import type { Product, Category } from '@/types';
import { ShopGrid } from './ShopGrid';

export function ShopClientShell({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState('Alles');
  const filtered =
    filter === 'Alles'
      ? products
      : products.filter((p) => p.category?.slug === filter || p.category?.name === filter);

  return (
    <>
      {/* Filter bar */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #F0EBE3',
          padding: '16px 40px',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#bbb',
            marginRight: 8,
          }}
        >
          Filter:
        </span>
        <button
          onClick={() => setFilter('Alles')}
          style={{
            fontSize: 11,
            letterSpacing: '0.1em',
            padding: '7px 18px',
            background: filter === 'Alles' ? '#0a0a0a' : 'transparent',
            color: filter === 'Alles' ? '#c9a84c' : '#999',
            border: `1px solid ${filter === 'Alles' ? '#0a0a0a' : '#E8E0D5'}`,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Alles
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.name)}
            style={{
              fontSize: 11,
              letterSpacing: '0.1em',
              padding: '7px 18px',
              background: filter === cat.name ? '#0a0a0a' : 'transparent',
              color: filter === cat.name ? '#c9a84c' : '#999',
              border: `1px solid ${filter === cat.name ? '#0a0a0a' : '#E8E0D5'}`,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat.name}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#bbb' }}>
          {filtered.length} producten
        </span>
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
