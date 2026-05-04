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

const GOLD = '#c9a84c';
const GOLD_HAIRLINE = '#E8DCC0';
const GOLD_TINT_BG = 'rgba(201,168,76,0.08)';

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

  const discount = comparePrice
    ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
    : null;

  return (
    <div
      className="transition-all duration-300 hover:shadow-lg"
      style={{
        padding: '14px',
        borderRadius: 12,
        background: '#fff',
      }}
    >
      {/* PRICE BLOCK */}
      <div
        className="flex items-center justify-between"
        style={{
          marginBottom: 6,
        }}
      >
        <div className="flex items-baseline" style={{ gap: 8 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: GOLD,
            }}
          >
            {formatPrice(price)}
          </span>

          {comparePrice && (
            <span
              style={{
                fontSize: 12,
                textDecoration: 'line-through',
                color: '#999',
              }}
            >
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>

        {discount && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#fff',
              background: GOLD,
              padding: '2px 6px',
              borderRadius: 6,
            }}
          >
            -{discount}%
          </span>
        )}
      </div>

      {/* TITLE */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 6,
          lineHeight: 1.4,
          color: '#0a0a0a',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {name}
      </p>

      {/* RATING */}
      {hasRating && (
        <div className="flex items-center" style={{ gap: 6, marginBottom: 8 }}>
          <StarRating count={5} />
          <span style={{ fontSize: 11, fontWeight: 600 }}>{rating!.toFixed(1)}</span>
          {reviewCount && <span style={{ fontSize: 11, color: '#777' }}>({reviewCount})</span>}
        </div>
      )}

      {/* SHIPPING */}
      {shippingPromise && (
        <div style={{ marginBottom: 6 }}>
          <span
            className="inline-flex items-center"
            style={{
              fontSize: 11,
              fontWeight: 600,
              gap: 6,
              padding: '4px 10px',
              borderRadius: 999,
              background: GOLD_TINT_BG,
              border: `1px solid ${GOLD_HAIRLINE}`,
            }}
          >
            ✓ {shippingPromise}
          </span>
        </div>
      )}

      {/* TRUST */}
      {trustSignal && (
        <div
          style={{
            fontSize: 11,
            color: '#666',
            marginBottom: 8,
          }}
        >
          {trustSignal}
        </div>
      )}

      {/* FEATURES (LIMITED) */}
      <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 10 }}>
        {features.slice(0, 3).map((f, i) => (
          <span
            key={i}
            style={{
              fontSize: 11,
              background: '#f6f6f6',
              padding: '3px 6px',
              borderRadius: 6,
              color: '#555',
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
