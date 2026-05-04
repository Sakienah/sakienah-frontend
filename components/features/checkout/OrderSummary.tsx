'use client';

import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/contexts/CartContext';

type Props = {
  items: CartItem[];
  totalPrice: number;
  discountAmount?: number;
  couponCode?: string;
  shipping: number;
  grandTotal: number;
  couponInput: string;
  onCouponInputChange: (val: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  couponError: string | null;
  couponLoading: boolean;
};

export function OrderSummary({
  items,
  totalPrice,
  discountAmount,
  couponCode,
  shipping,
  grandTotal,
  couponInput,
  onCouponInputChange,
  onApplyCoupon,
  onRemoveCoupon,
  couponError,
  couponLoading,
}: Props) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #F0EBE3',
        padding: 40,
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

      {/* Kortingscode invoer */}
      <div style={{ borderTop: '1px solid #F0EBE3', paddingTop: 16, marginBottom: 16 }}>
        {couponCode ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#F0FBF4',
              border: '1px solid #4CAF78',
              padding: '10px 14px',
            }}
          >
            <span style={{ fontSize: 12, color: '#2d7a4f', fontWeight: 600 }}>✓ {couponCode}</span>
            <button
              onClick={onRemoveCoupon}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                color: '#999',
                padding: 0,
              }}
            >
              Verwijderen
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={couponInput}
                onChange={(e) => onCouponInputChange(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && void onApplyCoupon()}
                placeholder="Kortingscode"
                style={{
                  flex: 1,
                  border: '1px solid #E8E0D5',
                  padding: '10px 12px',
                  fontSize: 13,
                  outline: 'none',
                  color: '#0a0a0a',
                  background: '#fff',
                  letterSpacing: '0.05em',
                }}
              />
              <button
                onClick={() => void onApplyCoupon()}
                disabled={couponLoading || !couponInput.trim()}
                style={{
                  background: couponLoading || !couponInput.trim() ? '#ccc' : '#0a0a0a',
                  color: '#c9a84c',
                  border: 'none',
                  cursor: couponLoading || !couponInput.trim() ? 'not-allowed' : 'pointer',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '10px 16px',
                  whiteSpace: 'nowrap',
                }}
              >
                {couponLoading ? '...' : 'Toepassen'}
              </button>
            </div>
            {couponError && (
              <p style={{ fontSize: 12, color: '#c0392b', marginTop: 6 }}>{couponError}</p>
            )}
          </div>
        )}
      </div>

      {/* Prijsoverzicht */}
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
        {discountAmount !== undefined && discountAmount > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
              fontSize: 13,
              color: '#4CAF78',
            }}
          >
            <span>Korting</span>
            <span>− {formatPrice(discountAmount)}</span>
          </div>
        )}
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
          <span>
            {shipping === 0 ? (
              <span
                style={{
                  background: '#F0FBF4',
                  color: '#2d7a4f',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '2px 10px',
                  letterSpacing: '0.05em',
                }}
              >
                ✓ Gratis
              </span>
            ) : (
              <span style={{ color: '#0a0a0a' }}>{formatPrice(shipping)}</span>
            )}
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
