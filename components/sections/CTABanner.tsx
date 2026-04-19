import { GeomPattern } from '@/components/ui/GeomPattern';

export function CTABanner() {
  return (
    <section className="bg-[#0a0a0a] py-20 px-10 text-center relative overflow-hidden">
      <GeomPattern opacity={0.07} />
      <div className="relative z-10">
        <div
          className="font-arabic text-[52px] text-gold leading-[1.4] mb-4"
          style={{ direction: 'rtl' }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="w-14 h-px bg-gold/30" />
          <span className="w-1.5 h-1.5 bg-gold/50 rotate-45" />
          <span className="w-14 h-px bg-gold/30" />
        </div>
        <p className="text-[12px] text-white/35 tracking-[0.15em] uppercase">
          In naam van Allah, de Barmhartige, de Genadevolle
        </p>
      </div>
    </section>
  );
}
