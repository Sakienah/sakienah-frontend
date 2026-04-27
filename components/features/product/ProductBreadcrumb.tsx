'use client';

import Link from 'next/link';
import { useState } from 'react';

export function ProductBreadcrumb({ productName }: { productName: string }) {
  const [homeHovered, setHomeHovered] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);

  return (
    <div
      style={{
        background: '#0f0d0a',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        padding: '14px 40px',
        position: 'relative',
      }}
    >
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
      <div className="max-w-[1280px] mx-auto" style={{ position: 'relative' }}>
        <div
          className="flex items-center"
          style={{ gap: 12, fontSize: 14, letterSpacing: '0.06em' }}
        >
          <Link
            href="/"
            onMouseEnter={() => setHomeHovered(true)}
            onMouseLeave={() => setHomeHovered(false)}
            style={{
              fontFamily: 'var(--font-playfair)',
              color: homeHovered ? '#c9a84c' : '#fff',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            Home
          </Link>
          <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: 15 }}>›</span>
          <Link
            href="/shop"
            onMouseEnter={() => setShopHovered(true)}
            onMouseLeave={() => setShopHovered(false)}
            style={{
              fontFamily: 'var(--font-playfair)',
              color: shopHovered ? '#c9a84c' : '#fff',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            Shop
          </Link>
          <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: 15 }}>›</span>
          <span
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#c9a84c',
              fontStyle: 'italic',
            }}
          >
            {productName}
          </span>
        </div>
      </div>
    </div>
  );
}
