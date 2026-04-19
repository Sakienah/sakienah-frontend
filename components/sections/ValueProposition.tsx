import { values } from '@/lib/data';
import { GoldOrnament } from '@/components/ui/GoldOrnament';

export function ValueProposition() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold mb-3.5">
            Waarom Sakienah
          </p>
          <h2 className="font-display text-[44px] font-semibold text-[#0a0a0a] tracking-[-0.02em]">
            Kwaliteit met intentie
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map(({ arabic, title, desc }) => (
            <div
              key={title}
              className="border border-gold/[0.18] p-12 text-center bg-[#FAF7F2] relative overflow-hidden"
            >
              <div
                className="absolute top-2.5 right-2.5 font-arabic text-[80px] text-gold/[0.06] leading-none select-none pointer-events-none"
                aria-hidden="true"
                style={{ direction: 'rtl' }}
              >
                {arabic}
              </div>
              <GoldOrnament className="mb-6" />
              <h3 className="font-display text-[22px] font-semibold text-[#0a0a0a] mb-3.5">
                {title}
              </h3>
              <p className="text-[14px] text-zinc-500 leading-[1.75]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
