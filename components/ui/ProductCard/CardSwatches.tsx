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
    <div className="flex px-2 pt-1" style={{ gap: 3, position: 'relative', zIndex: 10 }}>
      {visible.map((v) => {
        const isSel = selectedVariantId === v.id;
        const disabled = v.stock === 0;
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
              width: 16,
              height: 16,
              background: v.colorHex,
              border: '2px solid #fff',
              boxShadow: isSel ? '0 0 0 1.5px #0a0a0a' : '0 0 0 1px rgba(0,0,0,0.15)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.35 : 1,
              transition: 'box-shadow 0.15s',
            }}
            aria-label={v.colorName}
            aria-pressed={isSel}
          />
        );
      })}
      {overflow > 0 && (
        <span className="text-[#999]" style={{ fontSize: 10, lineHeight: '16px' }}>
          +{overflow}
        </span>
      )}
    </div>
  );
}
