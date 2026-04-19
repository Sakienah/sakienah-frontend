import { getProducts } from '@/lib/api';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { HeroProductCards } from './HeroProductCards';

export async function HeroSection() {
  const products = await getProducts().catch(() => []);
  const featured = products.slice(0, 2);

  return (
    <section className="min-h-screen grid" style={{ gridTemplateColumns: '58% 42%' }}>
      {/* Left — dark */}
      <div className="bg-[#0a0a0a] flex flex-col justify-center px-16 py-36 relative overflow-hidden">
        <GeomPattern opacity={0.06} />

        {/* Arabic watermark */}
        <div
          className="absolute -right-10 top-1/2 -translate-y-1/2 font-arabic text-[280px] text-gold/[0.04] leading-none pointer-events-none select-none"
          aria-hidden="true"
          style={{ direction: 'rtl' }}
        >
          سكينة
        </div>

        <div className="relative z-10">
          {/* Bismillah ornament */}
          <div className="flex items-center gap-3 mb-7">
            <span className="w-7 h-px bg-gold opacity-60" />
            <span className="font-arabic text-[18px] text-gold/85" style={{ direction: 'rtl' }}>
              بِسْمِ اللَّهِ
            </span>
            <span className="w-7 h-px bg-gold opacity-60" />
          </div>

          <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold mb-5">
            Islamitische Lifestyle Winkel
          </p>

          <h1 className="font-display text-[64px] font-bold leading-[1.1] text-white mb-1 tracking-[-0.02em]">
            Alles voor jouw
          </h1>
          <h1 className="font-display text-[64px] font-normal italic leading-[1.1] text-gold mb-8 tracking-[-0.02em]">
            islamitische lifestyle
          </h1>

          <p className="text-white/55 text-base leading-[1.75] max-w-[420px] mb-11 font-light">
            Premium producten geselecteerd met zorg en intentie — van gebedskleding tot Koran
            accessoires.
          </p>

          <div className="flex gap-3.5 mb-12">
            <a
              href="/shop"
              className="text-[11px] tracking-[0.15em] uppercase font-semibold bg-gold text-[#0a0a0a] px-9 py-4 hover:opacity-85 transition-opacity"
            >
              Shop collectie
            </a>
            <a
              href="/about"
              className="text-[11px] tracking-[0.15em] uppercase font-medium text-white/70 border border-white/20 px-9 py-4 hover:border-gold hover:text-gold transition-all"
            >
              Over Sakienah
            </a>
          </div>

          <div className="flex gap-8 flex-wrap">
            {['Gratis verzending v.a. €50', '30 dagen retour', 'Veilig betalen'].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[11px] text-white/40 tracking-[0.05em]"
              >
                <span className="w-1 h-1 bg-gold rotate-45 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — cream */}
      <div className="bg-[#FAF7F2] flex flex-col justify-center items-center px-12 py-36 gap-6 relative overflow-hidden">
        <GeomPattern opacity={0.09} />
        <div
          className="absolute top-40 right-10 font-arabic text-[48px] text-gold/25 select-none pointer-events-none"
          aria-hidden="true"
          style={{ direction: 'rtl' }}
        >
          سكينة
        </div>
        <HeroProductCards products={featured} />
      </div>
    </section>
  );
}
