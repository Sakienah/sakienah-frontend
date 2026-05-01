'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product, ProductVariant, BundleSelection } from '@/types';
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

type Props = {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
  bundleSelections?: Map<string, ProductVariant>;
  onBundleSelectionChange?: (selections: Map<string, ProductVariant>) => void;
};

export function ProductDetail({
  product,
  selectedVariant,
  onVariantChange,
  bundleSelections = new Map(),
  onBundleSelectionChange = () => {},
}: Props) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('beschrijving');
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const wished = isWishlisted(product.id);

  const isBundle = (product.bundleItems ?? []).length > 0;
  const hasVariants = !isBundle && product.variants && product.variants.length > 0;

  const bundleItemsNeedingColor = (product.bundleItems ?? []).filter(
    (item) => item.product.variants.length > 0,
  );
  const allBundleSelectionsReady =
    !isBundle || bundleItemsNeedingColor.every((item) => bundleSelections.has(item.productId));

  // Effectieve stock en SKU: variant-niveau als er varianten zijn
  const effectiveStock = selectedVariant ? selectedVariant.stock : product.stock;
  const effectiveSku = selectedVariant?.sku ?? product.sku;

  // Voor een bundle: minimum stock van alle losse items (na kleurkeuze)
  const bundleMinStock =
    isBundle && allBundleSelectionsReady
      ? Math.min(
          ...(product.bundleItems ?? []).map((bi) => {
            if (bi.product.variants.length > 0) {
              const sel = bundleSelections.get(bi.productId);
              return sel ? sel.stock : 0;
            }
            return bi.product.stock;
          }),
        )
      : 0;

  const canAdd = isBundle ? allBundleSelectionsReady && bundleMinStock > 0 : effectiveStock > 0;

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAdd = () => {
    if (isBundle) {
      const selections: BundleSelection[] = Array.from(bundleSelections.entries()).map(
        ([productId, variant]) => ({
          productId,
          variantId: variant.id,
          colorName: variant.colorName,
          colorHex: variant.colorHex,
        }),
      );
      void addItem(product.id, null, undefined, undefined, selections);
    } else {
      void addItem(
        product.id,
        undefined,
        selectedVariant?.id ?? undefined,
        selectedVariant?.colorValue ?? undefined,
      );
    }
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

        {/* Bundle inhoud */}
        {isBundle && (
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#aaa',
                marginBottom: 14,
              }}
            >
              Wat zit in deze deal
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(product.bundleItems ?? []).map((item) => {
                const hasItemVariants = item.product.variants.length > 0;
                const selected = bundleSelections.get(item.productId) ?? null;
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                      padding: '14px 16px',
                      background: '#FAF7F2',
                      border: '1px solid #F0EBE3',
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        flexShrink: 0,
                        position: 'relative',
                        overflow: 'hidden',
                        background: '#EDE8DF',
                      }}
                    >
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="52px"
                        />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a', marginBottom: 4 }}
                      >
                        {item.quantity > 1 ? `${item.quantity}× ` : ''}
                        {item.product.name}
                      </p>
                      {hasItemVariants ? (
                        <>
                          <p style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>
                            Kleur:{' '}
                            <span style={{ color: '#0a0a0a', fontWeight: 600 }}>
                              {selected?.colorName ?? 'Kies een kleur'}
                            </span>
                          </p>
                          <div className="flex" style={{ gap: 8 }}>
                            {item.product.variants.map((v) => {
                              const isSel = selected?.id === v.id;
                              return (
                                <button
                                  key={v.id}
                                  onClick={() => {
                                    const next = new Map(bundleSelections);
                                    if (isSel) next.delete(item.productId);
                                    else next.set(item.productId, v);
                                    onBundleSelectionChange(next);
                                  }}
                                  title={v.colorName}
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    background: v.colorHex,
                                    border: '2px solid #fff',
                                    boxShadow: isSel
                                      ? '0 0 0 2px #c9a84c'
                                      : '0 0 0 1.5px rgba(0,0,0,0.15)',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'box-shadow 0.15s',
                                  }}
                                  aria-label={v.colorName}
                                  aria-pressed={isSel}
                                />
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <span style={{ fontSize: 11, color: '#c9a84c', fontWeight: 600 }}>
                          ✓ Inbegrepen
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {!allBundleSelectionsReady && (
              <p style={{ fontSize: 11, color: '#b07000', marginTop: 10 }}>
                Kies een kleur voor alle onderdelen om toe te voegen.
              </p>
            )}
          </div>
        )}

        {/* Variant kleurkiezer */}
        {hasVariants && (
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
                {selectedVariant?.colorName}
              </span>
            </p>
            <div className="flex" style={{ gap: 10 }}>
              {product.variants.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => onVariantChange(variant)}
                    title={variant.colorName}
                    disabled={variant.stock === 0}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: variant.colorHex,
                      border: isSelected ? '2px solid #c9a84c' : '2px solid transparent',
                      outline: isSelected ? '2px solid #c9a84c' : '2px solid #E8E0D5',
                      outlineOffset: 2,
                      cursor: variant.stock === 0 ? 'not-allowed' : 'pointer',
                      opacity: variant.stock === 0 ? 0.35 : 1,
                      transition: 'outline 0.15s',
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Qty + Add */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
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
            disabled={!canAdd}
            style={{
              flex: 1,
              background: added ? '#c9a84c' : canAdd ? '#0a0a0a' : '#C8C1B8',
              color: added ? '#0a0a0a' : '#fff',
              border: 'none',
              cursor: !canAdd ? 'not-allowed' : 'pointer',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '0 28px',
              height: 52,
              transition: 'all 0.25s',
            }}
          >
            {isBundle
              ? !allBundleSelectionsReady
                ? 'Kies kleuren hierboven'
                : bundleMinStock === 0
                  ? 'Niet op voorraad'
                  : added
                    ? '✓ Toegevoegd aan winkelwagen'
                    : 'Voeg toe aan winkelwagen'
              : effectiveStock === 0
                ? 'Niet op voorraad'
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
              toggleWishlist(product.id, selectedVariant?.colorValue ?? undefined);
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
          <span style={{ fontSize: 11, color: '#777' }}>SKU: {effectiveSku || '—'}</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: isBundle
                ? allBundleSelectionsReady && bundleMinStock === 0
                  ? '#E74C3C'
                  : '#4CAF78'
                : effectiveStock > 0
                  ? '#4CAF78'
                  : '#E74C3C',
            }}
          >
            ●{' '}
            {isBundle
              ? allBundleSelectionsReady && bundleMinStock === 0
                ? 'Niet op voorraad'
                : 'Op voorraad'
              : effectiveStock > 0
                ? 'Op voorraad'
                : 'Niet op voorraad'}
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
            padding: 'clamp(12px, 3vw, 16px) clamp(16px, 5vw, 40px)',
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
