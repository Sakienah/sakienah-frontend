import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { WishlistPage as WishlistContent } from '@/components/features/wishlist/WishlistPage';
import { getProducts } from '@/lib/api';

export default async function WishlistPage() {
  const allProducts = await getProducts().catch(() => []);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 'clamp(120px, 20vw, 146px)',
            paddingBottom: 'clamp(40px, 8vw, 56px)',
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern dark />
          <div
            className="max-w-[1280px] mx-auto relative z-10"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
          >
            <div>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#c9a84c',
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                Opgeslagen
              </p>
              <h1
                className="font-display text-white"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 2.75rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                Favorieten
              </h1>
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FAF7F2',
            paddingTop: 'clamp(2rem, 5vw, 3rem)',
            paddingBottom: 'clamp(3rem, 8vw, 6rem)',
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern flip />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <WishlistContent allProducts={allProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
