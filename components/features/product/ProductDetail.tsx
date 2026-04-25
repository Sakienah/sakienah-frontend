'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

function Stars() {
  return (
    <span className="flex" style={{ gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 20 20" style={{ fill: '#c9a84c' }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('beschrijving');
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const colors = product.options?.colors ?? [];
  const [selectedColor, setSelectedColor] = useState(colors[0]?.value ?? null);
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const wished = isWishlisted(product.id);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAdd = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    void addItem(product.id, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const savings = product.comparePrice
    ? (
        ((parseFloat(product.comparePrice) - parseFloat(product.price)) /
          parseFloat(product.comparePrice)) *
        100
      ).toFixed(0)
    : null;

  return (
    <>
      {/* Info panel */}
      <div style={{ paddingTop: 8 }}>
        {product.category && (
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              marginBottom: 8,
            }}
          >
            {product.category.name}
          </p>
        )}
        {product.category && (
          <div
            className="font-arabic"
            style={{
              fontSize: 32,
              color: '#c9a84c',
              direction: 'rtl',
              marginBottom: 8,
              opacity: 0.85,
            }}
          >
            {product.category.name}
          </div>
        )}
        <h1
          className="font-display"
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {product.name}
        </h1>

        <div className="flex items-center" style={{ gap: 8, marginBottom: 24 }}>
          <Stars />
          <span style={{ fontSize: 12, color: '#aaa' }}>4.9 (32 reviews)</span>
        </div>

        <div className="flex items-baseline" style={{ gap: 12, marginBottom: 10 }}>
          <span
            className="font-display"
            style={{ fontSize: 36, fontWeight: 700, color: '#c9a84c' }}
          >
            € {parseFloat(product.price).toFixed(2).replace('.', ',')}
          </span>
          {product.comparePrice && (
            <span style={{ fontSize: 18, color: '#ccc', textDecoration: 'line-through' }}>
              € {parseFloat(product.comparePrice).toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        {savings ? (
          <div
            style={{
              background: '#FAF7F2',
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#c9a84c',
              fontSize: 11,
              fontWeight: 600,
              padding: '6px 14px',
              display: 'inline-block',
              marginBottom: 28,
              letterSpacing: '0.1em',
            }}
          >
            Je bespaart {savings}%
          </div>
        ) : (
          <div style={{ marginBottom: 28 }} />
        )}

        {product.description && (
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.8, marginBottom: 24 }}>
            {product.description.split('\n\n')[0]}
          </p>
        )}

        {/* Color picker */}
        {colors.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#aaa',
                marginBottom: 10,
              }}
            >
              Kleur —{' '}
              <span style={{ color: '#0a0a0a', fontWeight: 600 }}>
                {colors.find((c) => c.value === selectedColor)?.name}
              </span>
            </p>
            <div className="flex" style={{ gap: 10 }}>
              {colors.map((color) => {
                const hex =
                  color.value === 'bruin' ? '#7B4F2E' : color.value === 'rood' ? '#9B2626' : '#888';
                const isSelected = selectedColor === color.value;
                return (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    title={color.name}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: hex,
                      border: isSelected ? '2px solid #c9a84c' : '2px solid transparent',
                      outline: isSelected ? '2px solid #c9a84c' : '2px solid #E8E0D5',
                      outlineOffset: 2,
                      cursor: 'pointer',
                      transition: 'outline 0.15s',
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Qty + Add */}
        <div className="flex items-center" style={{ gap: 14, marginBottom: 20 }}>
          <div className="flex items-center" style={{ border: '1px solid #E8E0D5' }}>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{
                width: 40,
                height: 52,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 18,
                color: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              −
            </button>
            <span style={{ width: 44, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              style={{
                width: 40,
                height: 52,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 18,
                color: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            style={{
              flex: 1,
              background: added ? '#c9a84c' : '#0a0a0a',
              color: added ? '#0a0a0a' : '#fff',
              border: 'none',
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '0 28px',
              height: 52,
              transition: 'all 0.25s',
              opacity: product.stock === 0 ? 0.4 : 1,
            }}
          >
            {product.stock === 0
              ? 'Uitverkocht'
              : added
                ? '✓ Toegevoegd aan winkelwagen'
                : 'Voeg toe aan winkelwagen'}
          </button>
          <button
            onClick={() => {
              if (!user) {
                router.push('/login');
                return;
              }
              toggleWishlist(product.id, selectedColor);
            }}
            style={{
              width: 52,
              height: 52,
              border: '1px solid #E8E0D5',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label={wished ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
          >
            <svg
              width="18"
              height="18"
              fill={wished ? '#c9a84c' : 'none'}
              stroke={wished ? '#c9a84c' : '#888'}
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Trust mini */}
        <div
          className="flex flex-wrap"
          style={{ borderTop: '1px solid #F0EBE3', paddingTop: 24, gap: 24 }}
        >
          {['🚚 Gratis v.a. €50', '↩ 30 dagen retour', '🔒 Veilig betalen'].map((t) => (
            <span
              key={t}
              className="flex items-center"
              style={{ fontSize: 11, color: '#999', gap: 6 }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          className="flex justify-between items-center mt-4"
          style={{ padding: '12px 16px', background: '#FAF7F2', border: '1px solid #F0EBE3' }}
        >
          <span style={{ fontSize: 11, color: '#777' }}>SKU: {product.sku || '—'}</span>
          <span style={{ fontSize: 11, color: '#4CAF78', fontWeight: 600 }}>
            ● {product.stock > 0 ? 'Op voorraad' : 'Uitverkocht'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 1280, marginTop: 64 }}>
        <div className="flex" style={{ borderBottom: '1px solid #F0EBE3', marginBottom: 40 }}>
          {[
            ['beschrijving', 'Beschrijving'],
            ['kenmerken', 'Kenmerken'],
            ['reviews', 'Reviews'],
          ].map(([t, l]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '16px 28px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${tab === t ? '#c9a84c' : 'transparent'}`,
                color: tab === t ? '#0a0a0a' : '#aaa',
                cursor: 'pointer',
                fontWeight: tab === t ? 600 : 400,
                marginBottom: -1,
                transition: 'all 0.2s',
              }}
            >
              {l}
            </button>
          ))}
        </div>
        {tab === 'beschrijving' && (
          <div style={{ maxWidth: 680 }}>
            {product.description ? (
              product.description.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  style={{ fontSize: 15, color: '#555', lineHeight: 1.9, marginBottom: 20 }}
                >
                  {para}
                </p>
              ))
            ) : (
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.9 }}>
                Geen beschrijving beschikbaar.
              </p>
            )}
          </div>
        )}
        {tab === 'kenmerken' && (
          <div style={{ maxWidth: 560 }}>
            <div
              className="flex items-start"
              style={{ gap: 14, padding: '14px 0', borderBottom: '1px solid #F8F4EF' }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: '#c9a84c',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <span style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                Premium kwaliteit materiaal
              </span>
            </div>
            <div
              className="flex items-start"
              style={{ gap: 14, padding: '14px 0', borderBottom: '1px solid #F8F4EF' }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: '#c9a84c',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <span style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                Handgemaakt met aandacht voor detail
              </span>
            </div>
          </div>
        )}
        {tab === 'reviews' && (
          <div style={{ maxWidth: 680 }}>
            <p style={{ fontSize: 14, color: '#aaa' }}>Nog geen reviews voor dit product.</p>
          </div>
        )}
      </div>

      {/* Sticky bar */}
      {stickyVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fff',
            borderTop: '1px solid #E8E0D5',
            padding: '16px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 150,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <div className="flex items-center" style={{ gap: 20 }}>
            <span
              className="font-display"
              style={{ fontSize: 18, fontWeight: 600, color: '#0a0a0a' }}
            >
              {product.name}
            </span>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#c9a84c' }}>
              € {parseFloat(product.price).toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button
            onClick={handleAdd}
            style={{
              background: added ? '#c9a84c' : '#0a0a0a',
              color: added ? '#0a0a0a' : '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '14px 36px',
              transition: 'all 0.25s',
            }}
          >
            {added ? '✓ Toegevoegd' : 'Voeg toe aan winkelwagen'}
          </button>
        </div>
      )}
    </>
  );
}
