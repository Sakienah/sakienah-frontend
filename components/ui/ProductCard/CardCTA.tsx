'use client';

import Link from 'next/link';
import type { ProductVariant } from '@/types';

type Props = {
  isBundle: boolean;
  isOutOfStock: boolean;
  canAdd: boolean;
  hasVariants: boolean;
  selectedVariant: ProductVariant | null;
  variantOutOfStock: boolean;
  added: boolean;
  productSlug: string;
  onAddToCart: () => void;
};

export function CardCTA({
  isBundle,
  isOutOfStock,
  canAdd,
  hasVariants,
  selectedVariant,
  variantOutOfStock,
  added,
  productSlug,
  onAddToCart,
}: Props) {
  if (isBundle) {
    return (
      <div className="px-3 pb-3" style={{ paddingTop: 8, position: 'relative', zIndex: 10 }}>
        <Link
          href={`/products/${productSlug}`}
          className="block w-full text-center uppercase font-semibold no-underline"
          style={{
            fontSize: 10,
            letterSpacing: '0.1em',
            padding: '12px 0',
            background: '#0a0a0a',
            color: '#fff',
            transition: 'all 0.2s',
          }}
        >
          Stel samen
        </Link>
      </div>
    );
  }

  const disabled = isOutOfStock || !canAdd;
  const label = added
    ? '✓ Toegevoegd'
    : isOutOfStock
      ? 'Uitverkocht'
      : hasVariants && !selectedVariant
        ? 'Selecteer kleur'
        : variantOutOfStock
          ? 'Niet leverbaar'
          : 'In winkelwagen';

  return (
    <div className="px-3 pb-3" style={{ paddingTop: 8, position: 'relative', zIndex: 10 }}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!disabled) onAddToCart();
        }}
        disabled={disabled}
        className="w-full font-semibold border-none text-center transition-all"
        style={{
          fontSize: 11,
          letterSpacing: '0.06em',
          padding: '13px 0',
          background: added ? '#c9a84c' : !disabled ? '#0a0a0a' : '#d0ccc4',
          color: added ? '#0a0a0a' : '#fff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transform: added ? 'scale(1.02)' : 'scale(1)',
          boxShadow: added ? '0 4px 16px rgba(201,168,76,0.3)' : 'none',
        }}
      >
        {label}
      </button>

      <div className="flex items-center justify-center gap-1.5 mt-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span style={{ fontSize: 11, color: '#999' }}>30 dagen retour</span>
      </div>
    </div>
  );
}
