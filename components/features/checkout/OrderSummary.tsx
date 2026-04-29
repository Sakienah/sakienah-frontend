import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/contexts/CartContext';

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
        {items.map(({ product, variant, quantity, bundleSelections }) => {
          const isBundle = (product.bundleItems?.length ?? 0) > 0;
          return (
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
                {/* Kleur voor variant product */}
                {variant && (
                  <span className="flex items-center" style={{ gap: 5, marginTop: 3 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: variant.colorHex,
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 10, color: '#aaa' }}>{variant.colorName}</span>
                  </span>
                )}
                {/* Bundle inhoud */}
                {isBundle && (product.bundleItems?.length ?? 0) > 0 && (
                  <div style={{ marginTop: 4 }}>
                    {product.bundleItems!.map((bi) => {
                      const sel =
                        bundleSelections?.find((s) => s.productId === bi.productId) ?? null;
                      return (
                        <span
                          key={bi.id}
                          className="flex items-center"
                          style={{ gap: 5, marginTop: 2 }}
                        >
                          <span style={{ fontSize: 10, color: '#777' }}>
                            {bi.quantity > 1 ? `${bi.quantity}× ` : ''}
                            {bi.product.name}
                          </span>
                          {sel && (
                            <>
                              <span
                                style={{
                                  width: 7,
                                  height: 7,
                                  borderRadius: '50%',
                                  background: sel.colorHex,
                                  display: 'inline-block',
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{ fontSize: 10, color: '#aaa' }}>{sel.colorName}</span>
                            </>
                          )}
                        </span>
                      );
                    })}
                  </div>
                )}
                <p style={{ fontSize: 11, color: '#aaa', marginTop: 3 }}>Aantal: {quantity}</p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>
                {formatPrice(parseFloat(product.price) * quantity)}
              </span>
            </div>
          );
        })}
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
