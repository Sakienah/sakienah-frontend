'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

function formatPrice(n: number) {
  return `€ ${n.toFixed(2).replace('.', ',')}`;
}

function ColorBadge({ color }: { color: string }) {
  const hex = color === 'bruin' ? '#7B4F2E' : color === 'rood' ? '#9B2626' : '#888';
  const label = color === 'bruin' ? 'Bruin' : color === 'rood' ? 'Rood' : color;
  return (
    <span className="flex items-center" style={{ gap: 6, marginTop: 6 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: hex,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 11, color: '#888' }}>{label}</span>
    </span>
  );
}

export function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  const shipping = totalPrice >= 50 ? 0 : 4.95;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 0',
          border: '1px solid #F0EBE3',
          background: '#fff',
        }}
      >
        <p style={{ fontSize: 48, marginBottom: 16 }}>🛍</p>
        <h2
          className="font-display"
          style={{ fontSize: 28, fontWeight: 600, color: '#0a0a0a', marginBottom: 12 }}
        >
          Je winkelwagen is leeg
        </h2>
        <p style={{ fontSize: 14, color: '#aaa', marginBottom: 32 }}>
          Voeg producten toe vanuit de shop.
        </p>
        <Link
          href="/shop"
          style={{
            display: 'inline-block',
            background: '#0a0a0a',
            color: '#c9a84c',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '14px 36px',
          }}
        >
          Ontdek onze collectie
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
      {/* Items */}
      <div style={{ background: '#fff', border: '1px solid #F0EBE3' }}>
        {items.map(({ product, quantity, selectedColor }) => (
          <div
            key={product.id}
            className="flex items-center"
            style={{ gap: 24, padding: '28px 32px', borderBottom: '1px solid #F0EBE3' }}
          >
            {/* Image */}
            <div
              style={{
                width: 100,
                height: 120,
                background: '#EDE8DF',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              ) : null}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              {product.category && (
                <p
                  className="font-arabic"
                  style={{
                    fontSize: 14,
                    color: '#c9a84c',
                    opacity: 0.8,
                    direction: 'rtl',
                    marginBottom: 2,
                  }}
                >
                  {product.category.name}
                </p>
              )}
              <p
                className="font-display"
                style={{ fontSize: 18, fontWeight: 500, color: '#0a0a0a', marginBottom: 4 }}
              >
                {product.name}
              </p>
              {selectedColor && <ColorBadge color={selectedColor} />}
              {product.category && (
                <p
                  style={{
                    fontSize: 12,
                    color: '#aaa',
                    marginBottom: 16,
                    marginTop: selectedColor ? 8 : 0,
                  }}
                >
                  {product.category.name}
                </p>
              )}
              {/* Qty */}
              <div
                className="flex items-center"
                style={{ border: '1px solid #E8E0D5', display: 'inline-flex' }}
              >
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  style={{
                    width: 36,
                    height: 36,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                    color: '#0a0a0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  −
                </button>
                <span style={{ width: 36, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  style={{
                    width: 36,
                    height: 36,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                    color: '#0a0a0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price + remove */}
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: '#c9a84c' }}>
                {formatPrice(parseFloat(product.price) * quantity)}
              </span>
              <button
                onClick={() => removeItem(product.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 11,
                  color: '#ccc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Verwijder
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #F0EBE3',
          padding: 32,
          alignSelf: 'start',
          position: 'sticky',
          top: 106,
        }}
      >
        <h2
          className="font-display"
          style={{ fontSize: 24, fontWeight: 600, color: '#0a0a0a', marginBottom: 28 }}
        >
          Overzicht
        </h2>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: '1px solid #F8F4EF',
          }}
        >
          <span style={{ fontSize: 14, color: '#777' }}>
            Subtotaal ({totalItems} artikel{totalItems !== 1 ? 'en' : ''})
          </span>
          <span style={{ fontSize: 14, color: '#0a0a0a', fontWeight: 500 }}>
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: '1px solid #F8F4EF',
          }}
        >
          <span style={{ fontSize: 14, color: '#777' }}>Verzending</span>
          <span
            style={{ fontSize: 14, color: shipping === 0 ? '#4CAF78' : '#0a0a0a', fontWeight: 500 }}
          >
            {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
          </span>
        </div>
        {shipping > 0 && (
          <p style={{ fontSize: 11, color: '#c9a84c', marginTop: 10 }}>
            Nog {formatPrice(50 - totalPrice)} tot gratis verzending
          </p>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0',
            marginTop: 8,
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: 20, fontWeight: 600, color: '#0a0a0a' }}
          >
            Totaal
          </span>
          <span
            className="font-display"
            style={{ fontSize: 24, fontWeight: 700, color: '#c9a84c' }}
          >
            {formatPrice(grandTotal)}
          </span>
        </div>

        <Link
          href="/checkout"
          style={{
            display: 'block',
            textAlign: 'center',
            background: '#0a0a0a',
            color: '#c9a84c',
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: 18,
            marginBottom: 12,
          }}
        >
          Doorgaan naar betalen
        </Link>
        <Link
          href="/shop"
          style={{
            display: 'block',
            textAlign: 'center',
            background: 'transparent',
            color: '#999',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 500,
            padding: 14,
            border: '1px solid #E8E0D5',
          }}
        >
          Verder winkelen
        </Link>
      </div>
    </div>
  );
}
