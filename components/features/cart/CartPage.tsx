'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { CartCrossSells } from './CartCrossSells';

/**
 * Prijs formatteren naar Nederlands formaat (€ 19,99).
 */
function formatPrice(n: number) {
  return `€ ${n.toFixed(2).replace('.', ',')}`;
}

/**
 * Horizontale progress bar die vult naarmate de klant dichter
 * bij de gratis-verzending-drempel van € 50 komt.
 * De balk animeert automatisch bij elke waarde-update.
 */
function FreeShippingBar({ currentTotal }: { currentTotal: number }) {
  const THRESHOLD = 50;
  const [animatedPct, setAnimatedPct] = useState(0);

  // Animateer de balkbreedte bij elke verandering van currentTotal
  useEffect(() => {
    const target = Math.min((currentTotal / THRESHOLD) * 100, 100);
    const timer = setTimeout(() => setAnimatedPct(target), 50);
    return () => clearTimeout(timer);
  }, [currentTotal]);

  const remaining = THRESHOLD - currentTotal;

  // Volledige breedte = gratis verzending bereikt
  if (remaining <= 0) {
    return (
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            height: 6,
            background: '#4CAF78',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        />
        <p style={{ fontSize: 12, color: '#4CAF78', fontWeight: 600, marginTop: 8 }}>
          ✓ Je krijgt gratis verzending!
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 12, color: '#c9a84c', fontWeight: 600, marginBottom: 8 }}>
        Nog {formatPrice(remaining)} tot gratis verzending
      </p>
      <div
        style={{
          height: 6,
          background: '#F0EBE3',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #c9a84c, #d4b65e)',
            borderRadius: 3,
            width: `${animatedPct}%`,
            transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            minWidth: 4,
          }}
        />
      </div>
      <p style={{ fontSize: 11, color: '#bbb', marginTop: 6 }}>
        Gratis verzending vanaf € 50 in Nederland en België.
      </p>
    </div>
  );
}

/**
 * Vertrouwensbadges die de klant geruststellen bij het afrekenen:
 * beveiligde betaling, geaccepteerde betaalmethodes.
 */
function CartTrustBadges() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 16,
        paddingTop: 16,
        borderTop: '1px solid #F0EBE3',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.05em' }}>
        🔒 Veilig betalen
      </span>
      <span style={{ color: '#ddd' }}>·</span>
      <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.05em', fontWeight: 500 }}>
        iDEAL
      </span>
      <span style={{ color: '#ddd' }}>·</span>
      <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.05em', fontWeight: 500 }}>
        Visa
      </span>
      <span style={{ color: '#ddd' }}>·</span>
      <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.05em', fontWeight: 500 }}>
        Mastercard
      </span>
      <span style={{ color: '#ddd' }}>·</span>
      <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.05em', fontWeight: 500 }}>
        PayPal
      </span>
    </div>
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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
      {/* Items */}
      <div style={{ background: '#fff', border: '1px solid #F0EBE3' }}>
        {items.map(({ product, variant, quantity, variantId, selectedColor, bundleSelections }) => {
          const image = variant?.images[0] ?? product.images[0];
          const isBundle = (product.bundleItems?.length ?? 0) > 0;
          const itemStock = variant ? variant.stock : product.stock;
          const isOutOfStock = !isBundle && itemStock < quantity;
          return (
            <div
              key={`${product.id}-${variantId ?? selectedColor ?? ''}`}
              className="flex flex-col sm:flex-row sm:items-center"
              style={{
                gap: 16,
                padding: 'clamp(16px,4vw,28px) clamp(16px,4vw,32px)',
                borderBottom: '1px solid #F0EBE3',
              }}
            >
              {/* Image */}
              <div
                className="w-20 h-24 sm:w-[100px] sm:h-[120px] flex-shrink-0"
                style={{
                  background: '#EDE8DF',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {image ? (
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                ) : null}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p
                  className="font-display"
                  style={{ fontSize: 18, fontWeight: 500, color: '#0a0a0a', marginBottom: 4 }}
                >
                  {product.name}
                </p>
                {variant && (
                  <span className="flex items-center" style={{ gap: 6, marginTop: 6 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: variant.colorHex,
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 11, color: '#888' }}>{variant.colorName}</span>
                  </span>
                )}
                {/* Bundle inhoud */}
                {isBundle && (product.bundleItems?.length ?? 0) > 0 && (
                  <div style={{ marginTop: 8, marginBottom: 4 }}>
                    <p
                      style={{
                        fontSize: 10,
                        color: '#bbb',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: 6,
                      }}
                    >
                      Inhoud deal
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {product.bundleItems!.map((bi) => {
                        const sel =
                          bundleSelections?.find((s) => s.productId === bi.productId) ?? null;
                        return (
                          <span key={bi.id} className="flex items-center" style={{ gap: 6 }}>
                            <span style={{ fontSize: 11, color: '#555' }}>
                              {bi.quantity > 1 ? `${bi.quantity}× ` : ''}
                              {bi.product.name}
                            </span>
                            {sel && (
                              <>
                                <span
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: sel.colorHex,
                                    display: 'inline-block',
                                    flexShrink: 0,
                                  }}
                                />
                                <span style={{ fontSize: 10, color: '#888' }}>{sel.colorName}</span>
                              </>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                {isOutOfStock && (
                  <p style={{ fontSize: 11, color: '#E74C3C', fontWeight: 600, marginTop: 6 }}>
                    Niet op voorraad
                  </p>
                )}
                {product.category && (
                  <p
                    style={{
                      fontSize: 12,
                      color: '#aaa',
                      marginBottom: 16,
                      marginTop: variant || isBundle ? 8 : 0,
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
                    onClick={() =>
                      updateQuantity(product.id, quantity - 1, variantId, selectedColor)
                    }
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
                    onClick={() =>
                      updateQuantity(product.id, quantity + 1, variantId, selectedColor)
                    }
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
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 700, color: '#c9a84c' }}>
                  {formatPrice(parseFloat(product.price) * quantity)}
                </span>
                <button
                  onClick={() => removeItem(product.id, selectedColor, variantId)}
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
          );
        })}
      </div>

      {/* Summary */}
      <div
        className="lg:sticky lg:top-[106px]"
        style={{
          background: '#fff',
          border: '1px solid #F0EBE3',
          padding: 32,
          alignSelf: 'start',
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
        {/* Visuele voortgangsbalk voor gratis verzending — verhoogt conversie door de drempel concreet te maken */}
        <FreeShippingBar currentTotal={totalPrice} />

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

        {/* Vertrouwensbadges onder de CTA's — reduceren aankoopangst */}
        <CartTrustBadges />
      </div>

      {/* Cross-sells — 'Vaak samen gekocht' producten om de gemiddelde orderwaarde te verhogen */}
      <CartCrossSells />
    </div>
  );
}
