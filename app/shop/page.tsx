import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProducts, getCategories } from '@/lib/api';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { ShopClientShell } from '@/components/sections/ShopClientShell';

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Dark hero header */}
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 146,
            paddingBottom: 56,
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <GeomPattern opacity={0.07} />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <span
                className="font-arabic select-none"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 60,
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
                  fontSize: 10,
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
                  fontSize: 48,
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

        <ShopClientShell products={products} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
