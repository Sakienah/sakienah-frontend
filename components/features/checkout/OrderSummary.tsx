import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/contexts/CartContext';

function ColorBadge({ color }: { color: string }) {
  const hex = color === 'bruin' ? '#7B4F2E' : color === 'rood' ? '#9B2626' : '#888';
  const label = color === 'bruin' ? 'Bruin' : color === 'rood' ? 'Rood' : color;
  return (
    <span className="flex items-center" style={{ gap: 5, marginTop: 3 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: hex,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 10, color: '#aaa' }}>{label}</span>
    </span>
  );
}

type Props = {
  items: CartItem[];
  totalPrice: number;
  shipping: number;
  grandTotal: number;
};

export function OrderSummary({ items, totalPrice, shipping, grandTotal }: Props) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #F0EBE3',
        padding: 28,
        position: 'sticky',
        top: 106,
      }}
    >
      <h3
        className="font-display"
        style={{ fontSize: 20, fontWeight: 600, color: '#0a0a0a', marginBottom: 24 }}
      >
        Jouw bestelling
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
        {items.map(({ product, quantity, selectedColor }) => (
          <div key={product.id} className="flex items-center" style={{ gap: 16 }}>
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
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a', marginBottom: 2 }}>
                {product.name}
              </p>
              {selectedColor && <ColorBadge color={selectedColor} />}
              <p style={{ fontSize: 11, color: '#aaa', marginTop: 3 }}>Aantal: {quantity}</p>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>
              {formatPrice(parseFloat(product.price) * quantity)}
            </span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #F0EBE3', paddingTop: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontSize: 13,
            color: '#777',
          }}
        >
          <span>Subtotaal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
            fontSize: 13,
            color: '#777',
          }}
        >
          <span>Verzending</span>
          <span style={{ color: shipping === 0 ? '#4CAF78' : '#0a0a0a' }}>
            {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #F0EBE3',
            paddingTop: 16,
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a' }}
          >
            Totaal
          </span>
          <span
            className="font-display"
            style={{ fontSize: 20, fontWeight: 700, color: '#c9a84c' }}
          >
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
