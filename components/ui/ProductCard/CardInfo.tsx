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
  stock?: number;
  isLowStock?: boolean;
};

const GOLD = '#c9a84c';

export function CardInfo({
  name,
  price,
  comparePrice,
  rating,
  reviewCount,
  features,
  shippingPromise,
  trustSignal,
  stock,
  isLowStock,
}: Props) {
  const hasRating = typeof rating === 'number';
  const discount = comparePrice
    ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
    : null;

  return (
    <div style={{ padding: '14px 16px 12px', background: '#fff' }}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 pr-2">
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 4,
              lineHeight: 1.3,
              color: '#0a0a0a',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {name}
          </p>

          {hasRating && (
            <div className="flex items-center gap-1.5">
              <StarRating count={5} size={10} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#0a0a0a' }}>
                {rating!.toFixed(1)}
              </span>
              {reviewCount && <span style={{ fontSize: 10, color: '#999' }}>({reviewCount})</span>}
            </div>
          )}
        </div>

        {discount && (
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: '#fff',
              background: '#0a0a0a',
              padding: '3px 6px',
              borderRadius: 3,
              flexShrink: 0,
              letterSpacing: '0.03em',
            }}
          >
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0a0a0a' }}>
          {formatPrice(price)}
        </span>
        {comparePrice && (
          <span style={{ fontSize: 12, textDecoration: 'line-through', color: '#aaa' }}>
            {formatPrice(comparePrice)}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
        {isLowStock && stock !== undefined && (
          <span
            className="flex items-center gap-1"
            style={{ fontSize: 10, color: '#c9a84c', fontWeight: 600 }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#c9a84c',
                display: 'inline-block',
              }}
            />
            Nog {stock} op voorraad
          </span>
        )}
        {shippingPromise && (
          <span className="flex items-center gap-1" style={{ fontSize: 10, color: '#888' }}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#999"
              strokeWidth="1.5"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            {shippingPromise}
          </span>
        )}
      </div>

      {trustSignal && <p style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>{trustSignal}</p>}

      {features.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {features.slice(0, 2).map((f, i) => (
            <span
              key={i}
              style={{
                fontSize: 9,
                background: '#f5f4f2',
                padding: '2px 5px',
                borderRadius: 3,
                color: '#777',
              }}
            >
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
