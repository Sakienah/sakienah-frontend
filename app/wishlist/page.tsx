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
      <main className="min-h-screen">
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 146,
            paddingBottom: 56,
            paddingLeft: 40,
            paddingRight: 40,
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
                  fontSize: 10,
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
                style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em' }}
              >
                Favorieten
              </h1>
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FAF7F2',
            padding: '48px 40px 96px',
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
