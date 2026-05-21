import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { SkeletonGrid } from '@/components/ui/Skeleton';

export default function ShopLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 'clamp(120px, 20vw, 146px)',
            paddingBottom: 'clamp(40px, 8vw, 56px)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <GeomPattern dark />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <span
                className="font-arabic select-none"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 'clamp(3rem, 8vw, 4rem)',
                  color: '#c9a84c',
                  opacity: 0.12,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  direction: 'rtl',
                }}
              >
                المتجر
              </span>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#c9a84c',
                  fontWeight: 600,
                  marginBottom: 14,
                  position: 'relative',
                }}
              >
                Collectie
              </p>
              <h1
                className="font-display text-white"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 3rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  position: 'relative',
                }}
              >
                Shop
              </h1>
            </div>
          </div>
        </div>
        <SkeletonGrid count={6} />
      </main>
      <Footer />
    </>
  );
}
