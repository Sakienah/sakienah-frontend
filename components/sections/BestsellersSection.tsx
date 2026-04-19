import { getProducts } from '@/lib/api';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { BestsellersGrid } from './BestsellersGrid';

export async function BestsellersSection() {
  const products = await getProducts().catch(() => []);
  if (products.length === 0) return null;

  return (
    <section className="bg-[#FAF7F2] py-24 relative overflow-hidden">
      <GeomPattern opacity={0.05} />
      <div className="max-w-[1280px] mx-auto px-10 relative z-10">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">
              Onze Collectie
            </p>
            <h2 className="font-display text-[44px] font-semibold text-[#0a0a0a] tracking-[-0.02em] leading-[1.1]">
              Meest Gekocht
            </h2>
          </div>
          <a
            href="/shop"
            className="text-[11px] tracking-[0.15em] uppercase text-zinc-400 hover:text-gold transition-colors"
          >
            Bekijk alles →
          </a>
        </div>
        <BestsellersGrid products={products.slice(0, 4)} />
      </div>
    </section>
  );
}
