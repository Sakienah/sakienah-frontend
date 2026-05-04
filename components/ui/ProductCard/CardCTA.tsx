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
      <div className="px-2 pb-2" style={{ paddingTop: 6, position: 'relative', zIndex: 10 }}>
        <Link
          href={`/products/${productSlug}`}
          className="block w-full text-center uppercase font-semibold no-underline bg-[#0a0a0a] text-white"
          style={{ fontSize: 10, letterSpacing: '0.1em', padding: '10px 0' }}
        >
          Stel samen →
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
        ? 'Kies kleur'
        : variantOutOfStock
          ? 'Uitverkocht'
          : '+ Winkelwagen';

  return (
    <div className="px-2 pb-2" style={{ paddingTop: 6, position: 'relative', zIndex: 10 }}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAddToCart();
        }}
        disabled={disabled}
        className="w-full uppercase font-semibold border-none text-center"
        style={{
          fontSize: 10,
          letterSpacing: '0.1em',
          padding: '10px 0',
          background: added ? '#c9a84c' : !disabled ? '#0a0a0a' : '#C8C1B8',
          color: added ? '#0a0a0a' : '#fff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s',
        }}
      >
        {label}
      </button>
    </div>
  );
}
