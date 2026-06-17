import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { Reveal } from '@/components/ui/Reveal';
import { BestsellersGrid } from './BestsellersGrid';

export async function BestsellersSection() {
  const products = await getProducts().catch(() => []);

  return (
    <section
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        background: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern flip />
      <div className="max-w-[1280px] mx-auto relative z-10 px-6 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <h2
              className="font-display font-semibold"
              style={{
                fontSize: 'var(--text-h2)',
                color: '#0a0a0a',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Wat Wij Aanbieden
            </h2>
            <Link
              href="/shop"
              className="uppercase transition-colors hover:text-gold text-[#999]"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.15em' }}
            >
              Bekijk alles →
            </Link>
          </div>
        </Reveal>
        <BestsellersGrid products={products} />
      </div>
    </section>
  );
}
