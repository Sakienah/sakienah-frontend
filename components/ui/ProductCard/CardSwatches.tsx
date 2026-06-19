'use client';

import type { ProductVariant } from '@/types';
import { MAX_VISIBLE_SWATCHES } from './constants';

type Props = {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variant: ProductVariant) => void;
};

export function CardSwatches({ variants, selectedVariantId, onSelect }: Props) {
  const visible = variants.slice(0, MAX_VISIBLE_SWATCHES);
  const overflow = variants.length - MAX_VISIBLE_SWATCHES;

  return (
    <div className="flex flex-col" style={{ gap: 7, position: 'relative', zIndex: 10 }}>
      {visible.map((v) => {
        const isSel = selectedVariantId === v.id;
        const disabled = v.stock === 0 && !v.isPreOrder;
        return (
          <button
            key={v.id}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(v);
            }}
            disabled={disabled}
            title={v.colorName}
            className="flex-shrink-0 p-0 rounded-full"
            style={{
              width: 26,
              height: 26,
              background: v.colorHex,
              border: '2.5px solid #fff',
              boxShadow: isSel ? '0 0 0 2px #0a0a0a' : '0 2px 6px rgba(0,0,0,0.15)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.35 : 1,
              transition: 'box-shadow 0.15s, transform 0.15s',
              transform: isSel ? 'scale(1.12)' : 'scale(1)',
            }}
            aria-label={v.colorName}
            aria-pressed={isSel}
          />
        );
      })}
      {overflow > 0 && (
        <span className="text-[#999] text-center" style={{ fontSize: 10, lineHeight: '26px' }}>
          +{overflow}
        </span>
      )}
    </div>
  );
}
