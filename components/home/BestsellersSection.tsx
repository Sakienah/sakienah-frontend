import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { BestsellersGrid } from './BestsellersGrid';

export async function BestsellersSection() {
  const products = await getProducts().catch(() => []);

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: '#FAF7F2', position: 'relative', overflow: 'hidden' }}
    >
      <GeomPattern flip />
      <div className="max-w-[1280px] mx-auto relative z-10 px-6 md:px-10">
        <div className="flex items-end justify-between mb-10 md:mb-14">
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
              Onze Collectie
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 600,
                color: '#0a0a0a',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Wat Wij Aanbieden
            </h2>
          </div>
          <Link
            href="/shop"
            className="transition-colors hover:text-gold"
            style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#999',
            }}
          >
            Bekijk alles →
          </Link>
        </div>
        <BestsellersGrid products={products} />
      </div>
    </section>
  );
}
