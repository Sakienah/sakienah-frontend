'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { CartPage as CartContent } from '@/components/features/cart/CartPage';
import { useCart } from '@/contexts/CartContext';

function CartHeader() {
  const { totalItems } = useCart();
  return (
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
      <GeomPattern opacity={0.07} />
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
            Overzicht
          </p>
          <h1
            className="font-display text-white"
            style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            Winkelwagen
          </h1>
        </div>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          {totalItems} product{totalItems !== 1 ? 'en' : ''}
        </span>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CartHeader />
        <div style={{ background: '#FAF7F2', padding: '48px 40px 96px' }}>
          <div className="max-w-[1280px] mx-auto">
            <CartContent />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
