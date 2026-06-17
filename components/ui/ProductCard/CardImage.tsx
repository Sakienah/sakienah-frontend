'use client';

import Image from 'next/image';

type Props = {
  images: string[];
  currentImageIndex: number;
  alt: string;
  aspectRatio: '3/4' | '4/3' | '1/1' | '4/5';
  sizes: string;
  isOutOfStock: boolean;
  isLowStock: boolean;
  stock: number;
  discountPct: number | null;
  isBestseller: boolean;
  isHot?: boolean;
  soldCount?: number;
  wishlisted: boolean;
  onWishlistToggle: () => void;
  onQuickView: () => void;
  onNavigate: (dir: number) => void;
};

export function CardImage({
  images,
  currentImageIndex,
  alt,
  aspectRatio,
  sizes,
  isOutOfStock,
  isLowStock,
  stock,
  discountPct,
  isBestseller,
  isHot,
  soldCount,
  wishlisted,
  onWishlistToggle,
  onQuickView,
  onNavigate,
}: Props) {
  const currentImage = images[currentImageIndex] ?? images[0];

  return (
    <div
      className="flex-shrink-0 relative overflow-hidden bg-[#FAF7F2]"
      style={{ aspectRatio, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
    >
      {currentImage && (
        <div className="w-full h-full flex items-center justify-center bg-[#FAF7F2]">
          <div className="relative" style={{ width: '84%', height: '84%' }}>
            <Image
              src={currentImage}
              alt={alt}
              fill
              className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:group-hover:scale-[1.06]"
              sizes={sizes}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-badge {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .hot-badge {
          animation: pulse-badge 2s ease-in-out infinite;
        }
      `}</style>

      <div
        className="absolute flex flex-col pointer-events-none"
        style={{ top: 8, left: 8, gap: 4, zIndex: 2 }}
      >
        {isHot && !isOutOfStock && (
          <span
            className="hot-badge font-semibold uppercase"
            style={{
              fontSize: 9,
              letterSpacing: '0.08em',
              padding: '4px 8px',
              background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
              color: '#fff',
            }}
          >
            🔥 Populair
          </span>
        )}
        {isOutOfStock && (
          <span
            className="font-semibold uppercase bg-[#0a0a0a] text-gold"
            style={{ fontSize: 9, letterSpacing: '0.1em', padding: '4px 8px' }}
          >
            Uitverkocht
          </span>
        )}
        {discountPct && !isOutOfStock && (
          <span
            className="font-bold uppercase"
            style={{
              fontSize: 9,
              letterSpacing: '0.1em',
              padding: '4px 8px',
              background: '#0a0a0a',
              color: '#c9a84c',
            }}
          >
            -{discountPct}%
          </span>
        )}
        {isLowStock && !isOutOfStock && !discountPct && !isHot && (
          <span
            className="low-stock-badge font-semibold uppercase bg-[#0a0a0a] text-gold relative"
            style={{ fontSize: 9, letterSpacing: '0.08em', padding: '5px 8px' }}
          >
            Nog {stock} op voorraad
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                fill="none"
                stroke="#c9a84c"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="200"
                className="low-stock-border"
              />
            </svg>
          </span>
        )}
        {isBestseller && !isOutOfStock && !isLowStock && !isHot && (
          <span
            className="font-semibold uppercase bg-[#0a0a0a] text-gold"
            style={{ fontSize: 9, letterSpacing: '0.1em', padding: '4px 8px' }}
          >
            Bestseller
          </span>
        )}
        {soldCount && soldCount > 10 && !isOutOfStock && (
          <span
            className="font-semibold uppercase"
            style={{
              fontSize: 9,
              letterSpacing: '0.08em',
              padding: '4px 8px',
              background: '#0a0a0a',
              color: '#c9a84c',
            }}
          >
            {soldCount}+ verkocht
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onWishlistToggle();
        }}
        className="absolute flex items-center justify-center rounded-full border-none cursor-pointer transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-90 md:group-hover:scale-110"
        style={{
          top: 8,
          right: 8,
          background: 'rgba(255,255,255,0.95)',
          width: 34,
          height: 34,
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
        aria-label={wishlisted ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
      >
        <svg
          width="14"
          height="14"
          fill={wishlisted ? '#c9a84c' : 'none'}
          stroke={wishlisted ? '#c9a84c' : '#0a0a0a'}
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onQuickView();
        }}
        className="absolute flex items-center justify-center rounded-full border-none cursor-pointer transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-90 opacity-100 translate-y-0 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
        style={{
          top: 48,
          right: 8,
          background: 'rgba(255,255,255,0.95)',
          width: 34,
          height: 34,
          zIndex: 10,
        }}
        aria-label="Snel bekijken"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(-1);
            }}
            className="absolute flex items-center justify-center rounded-full cursor-pointer border hover:bg-gold hover:text-white transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-90 opacity-100 md:opacity-0 md:group-hover:opacity-100"
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
              zIndex: 10,
            }}
            aria-label="Vorige afbeelding"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(1);
            }}
            className="absolute flex items-center justify-center rounded-full cursor-pointer border hover:bg-gold hover:text-white transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-90 opacity-100 md:opacity-0 md:group-hover:opacity-100"
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
              zIndex: 10,
            }}
            aria-label="Volgende afbeelding"
          >
            →
          </button>
        </>
      )}

      {images.length > 1 && (
        <div
          className="absolute flex pointer-events-none"
          style={{
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            gap: 6,
            zIndex: 2,
          }}
        >
          {images.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === currentImageIndex ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === currentImageIndex ? '#c9a84c' : 'rgba(10,10,10,0.25)',
                transition: 'width 300ms var(--ease-out-strong), background 300ms ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
