'use client';

import { StarRating } from '../StarRating';
import { formatPrice } from '@/lib/utils';

type Props = {
  name: string;
  price: string;
  comparePrice: string | null;
  rating?: number;
  reviewCount?: number;
  features: string[];
  shippingPromise?: string | null;
  trustSignal?: string | null;
};

export function CardInfo({
  name,
  price,
  comparePrice,
  rating,
  reviewCount,
  features,
  shippingPromise,
  trustSignal,
}: Props) {
  const hasRating = typeof rating === 'number';

  return (
    <div style={{ padding: '6px 8px 0' }}>
      {/* Prijs + oude prijs */}
      <div className="flex items-baseline" style={{ gap: 6, marginBottom: 2 }}>
        <span className="font-bold text-gold" style={{ fontSize: 15 }}>
          {formatPrice(price)}
        </span>
        {comparePrice && (
          <span className="text-[#aaa] line-through" style={{ fontSize: 11 }}>
            {formatPrice(comparePrice)}
          </span>
        )}
      </div>

      {/* Titel */}
      <p
        className="font-display"
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#0a0a0a',
          margin: '3px 0 2px',
          lineHeight: 1.3,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {name}
      </p>

      {/* Rating — alleen wanneer er echte data is */}
      {hasRating && (
        <div className="flex items-center" style={{ gap: 4, marginBottom: 4 }}>
          <StarRating count={5} />
          <span className="text-[#aaa]" style={{ fontSize: 10 }}>
            {rating!.toFixed(1)}
          </span>
          {typeof reviewCount === 'number' && (
            <>
              <span className="text-[#ccc]" style={{ fontSize: 10 }}>
                ·
              </span>
              <span className="text-[#888]" style={{ fontSize: 10 }}>
                ({reviewCount})
              </span>
            </>
          )}
        </div>
      )}

      {/* Bezorg-belofte + trust-signal */}
      {(shippingPromise || trustSignal) && (
        <div
          className="flex flex-wrap items-center"
          style={{ columnGap: 6, rowGap: 1, marginBottom: 4 }}
        >
          {shippingPromise && (
            <span
              className="flex items-center text-[#0a0a0a]"
              style={{ fontSize: 10, fontWeight: 600, gap: 4 }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a84c"
                strokeWidth="2.5"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {shippingPromise}
            </span>
          )}
          {shippingPromise && trustSignal && (
            <span className="text-[#ccc]" style={{ fontSize: 10 }}>
              ·
            </span>
          )}
          {trustSignal && (
            <span className="text-[#666]" style={{ fontSize: 10 }}>
              {trustSignal}
            </span>
          )}
        </div>
      )}

      {/* Productkenmerken */}
      <div className="flex flex-wrap" style={{ columnGap: 8, rowGap: 1 }}>
        {features.map((f, i) => (
          <span key={i} className="flex items-center text-[#666]" style={{ fontSize: 9, gap: 4 }}>
            {i > 0 && <span className="text-[#ccc]">·</span>}
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
