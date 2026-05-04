import { GeomPattern } from '@/components/ui/GeomPattern';

/**
 * Shimmer skeleton voor productcards — toont placeholder-animatie tijdens
 * het laden van producten. Gebruikt in BestsellersGrid, ShopGrid, etc.
 */
export function ProductCardSkeleton() {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #F0EBE3',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image placeholder */}
      <div className="skeleton-shimmer" style={{ aspectRatio: '3/4', background: '#EDE8DF' }} />
      {/* Info placeholders */}
      <div style={{ padding: '14px 18px' }}>
        <div
          className="skeleton-shimmer"
          style={{ height: 18, width: '70%', marginBottom: 10, background: '#EDE8DF' }}
        />
        <div
          className="skeleton-shimmer"
          style={{ height: 12, width: '50%', marginBottom: 8, background: '#EDE8DF' }}
        />
        <div
          className="skeleton-shimmer"
          style={{ height: 16, width: '35%', marginBottom: 14, background: '#EDE8DF' }}
        />
        {/* Button placeholder */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div
            className="skeleton-shimmer"
            style={{ height: 40, flex: 1, background: '#EDE8DF' }}
          />
          <div
            className="skeleton-shimmer"
            style={{ height: 40, flex: 1.4, background: '#EDE8DF' }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Toon een grid van skeleton placeholders.
 */
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      style={{
        padding: 'clamp(40px, 8vw, 80px) 0',
        background: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern flip />
      <div className="max-w-[1280px] mx-auto relative z-10 px-[clamp(1rem, 5vw, 2.5rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
