'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, ProductVariant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { StarRating } from './StarRating';

type Props = {
  product: Product;
  /** Wordt aangeroepen wanneer de modal gesloten moet worden */
  onClose: () => void;
};

/**
 * Quick View modal — compacte weergave van productdetails zonder paginanavigatie.
 * Toont afbeeldingengalerij, varianten, prijs en directe add-to-cart.
 * Sluit met Escape, klik buiten modal, of ✕ knop.
 */
export function QuickView({ product, onClose }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null,
  );
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const isBundle = (product.bundleItems ?? []).length > 0;
  const hasVariants = product.variants.length > 0;
  const isOutOfStock = product.stock === 0;
  const canAdd = hasVariants
    ? selectedVariant !== null && (selectedVariant?.stock ?? 0) > 0
    : !isOutOfStock;

  const images =
    selectedVariant && selectedVariant.images.length > 0 ? selectedVariant.images : product.images;

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setActiveImage((i) => (i > 0 ? i - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setActiveImage((i) => (i < images.length - 1 ? i + 1 : 0));
    },
    [onClose, images.length],
  );

  async function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (!canAdd) return;
    await addItem(
      product.id,
      undefined,
      selectedVariant?.id ?? undefined,
      selectedVariant?.colorValue ?? undefined,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const discountPct = product.comparePrice
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.comparePrice)) * 100)
    : null;

  return (
    <div
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(3px)',
        padding: 'clamp(1rem, 4vw, 2rem)',
      }}
    >
      <div
        className="bg-white w-full relative overflow-auto"
        style={{
          maxWidth: 800,
          maxHeight: '85vh',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Sluitknop */}
        <button
          onClick={onClose}
          className="absolute flex items-center justify-center rounded-full cursor-pointer border z-10 transition-all hover:bg-[#f5f5f5]"
          style={{
            top: 12,
            right: 12,
            background: '#fff',
            borderColor: '#E8E0D5',
            width: 32,
            height: 32,
            fontSize: 16,
            color: '#666',
          }}
          aria-label="Sluiten"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Linkerzijde: afbeeldingsgalerij */}
          <div className="relative bg-[#FAF7F2]" style={{ minHeight: 280 }}>
            {images.length > 0 ? (
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#ccc]">
                <span style={{ fontSize: 13 }}>Geen foto beschikbaar</span>
              </div>
            )}

            {/* Badges */}
            {discountPct && !isOutOfStock && (
              <span
                className="absolute font-bold uppercase bg-gold"
                style={{
                  top: 12,
                  left: 12,
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  padding: '4px 8px',
                  color: '#0a0a0a',
                }}
              >
                -{discountPct}%
              </span>
            )}
            {isOutOfStock && (
              <span
                className="absolute uppercase bg-[#0a0a0a] text-gold"
                style={{
                  top: 12,
                  left: 12,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  padding: '4px 8px',
                }}
              >
                Uitverkocht
              </span>
            )}

            {/* Navigatiepijlen */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((i) => (i > 0 ? i - 1 : images.length - 1))}
                  className="absolute flex items-center justify-center rounded-full cursor-pointer border z-[5] hover:bg-gold hover:text-white"
                  style={{
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)',
                    borderColor: '#E8E0D5',
                    width: 28,
                    height: 28,
                    fontSize: 12,
                    color: '#555',
                  }}
                  aria-label="Vorige"
                >
                  ←
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i < images.length - 1 ? i + 1 : 0))}
                  className="absolute flex items-center justify-center rounded-full cursor-pointer border z-[5] hover:bg-gold hover:text-white"
                  style={{
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)',
                    borderColor: '#E8E0D5',
                    width: 28,
                    height: 28,
                    fontSize: 12,
                    color: '#555',
                  }}
                  aria-label="Volgende"
                >
                  →
                </button>
              </>
            )}

            {/* Dot indicatoren */}
            {images.length > 1 && (
              <div
                className="absolute flex"
                style={{
                  bottom: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  gap: 6,
                }}
              >
                {images.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: i === activeImage ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === activeImage ? '#c9a84c' : 'rgba(255,255,255,0.6)',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Rechterzijde: productinformatie */}
          <div style={{ padding: 24 }}>
            {product.category && (
              <p
                className="uppercase text-[#aaa]"
                style={{
                  fontSize: 9,
                  letterSpacing: '0.15em',
                  marginBottom: 6,
                }}
              >
                {product.category.name}
              </p>
            )}

            <h2
              className="font-display font-semibold"
              style={{ fontSize: 18, color: '#0a0a0a', marginBottom: 6, lineHeight: 1.3 }}
            >
              {product.name}
            </h2>

            <div className="flex items-center" style={{ gap: 6, marginBottom: 12 }}>
              <StarRating count={5} />
              <span className="text-[#aaa]" style={{ fontSize: 11 }}>
                4.9
              </span>
            </div>

            <div className="flex items-baseline" style={{ gap: 8, marginBottom: 12 }}>
              <span className="font-bold text-gold" style={{ fontSize: 20 }}>
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="line-through text-[#ccc]" style={{ fontSize: 12 }}>
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            {product.description && (
              <p
                className="text-[#777] overflow-hidden"
                style={{
                  fontSize: 12,
                  lineHeight: 1.6,
                  marginBottom: 16,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {product.description}
              </p>
            )}

            {/* Kleurvarianten */}
            {hasVariants && (
              <div style={{ marginBottom: 16 }}>
                <p
                  className="uppercase text-[#aaa]"
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.12em',
                    marginBottom: 6,
                  }}
                >
                  Kleur
                  {selectedVariant && (
                    <span className="font-semibold text-[#0a0a0a]">
                      : {selectedVariant.colorName}
                    </span>
                  )}
                </p>
                <div className="flex" style={{ gap: 6 }}>
                  {product.variants.map((v) => {
                    const isSel = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        disabled={v.stock === 0}
                        title={v.colorName}
                        className="p-0 rounded-full"
                        style={{
                          width: 26,
                          height: 26,
                          background: v.colorHex,
                          border: isSel ? '2px solid #c9a84c' : '2px solid transparent',
                          outline: isSel ? '2px solid #c9a84c' : '2px solid #E8E0D5',
                          outlineOffset: 1,
                          cursor: v.stock === 0 ? 'not-allowed' : 'pointer',
                          opacity: v.stock === 0 ? 0.35 : 1,
                          transition: 'outline 0.15s',
                        }}
                        aria-label={v.colorName}
                        aria-pressed={isSel}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-to-cart + details link */}
            <div className="flex flex-col" style={{ gap: 8 }}>
              {!isBundle && (
                <button
                  onClick={handleAddToCart}
                  disabled={!canAdd}
                  className="w-full uppercase font-bold border-none text-white transition-all duration-[0.25s]"
                  style={{
                    background: added ? '#c9a84c' : canAdd ? '#0a0a0a' : '#C8C1B8',
                    color: added ? '#0a0a0a' : '#fff',
                    cursor: !canAdd ? 'not-allowed' : 'pointer',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    padding: '12px 0',
                  }}
                >
                  {added
                    ? '✓ Toegevoegd'
                    : isOutOfStock
                      ? 'Uitverkocht'
                      : hasVariants && !selectedVariant
                        ? 'Kies een kleur'
                        : 'Voeg toe aan winkelwagen'}
                </button>
              )}

              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="block text-center bg-transparent text-[#666] border font-medium hover:border-gold hover:text-gold transition-all duration-[0.2s]"
                style={{
                  borderColor: '#E8E0D5',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '10px 0',
                  textDecoration: 'none',
                }}
              >
                {isBundle ? 'Stel samen →' : 'Bekijk volledig product'}
              </Link>

              <p
                className="font-semibold text-center"
                style={{
                  fontSize: 10,
                  color: product.stock > 0 ? '#4CAF78' : '#E74C3C',
                  marginTop: 4,
                }}
              >
                ● {product.stock > 0 ? 'Op voorraad' : 'Niet op voorraad'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
