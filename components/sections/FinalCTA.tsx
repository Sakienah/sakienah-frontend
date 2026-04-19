import { GeomPattern } from '@/components/ui/GeomPattern';

export function FinalCTA() {
  return (
    <section className="bg-[#0a0a0a] py-25 px-10 text-center relative overflow-hidden">
      <GeomPattern opacity={0.08} />
      <div className="relative z-10">
        <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold mb-5">
          Klaar om te bestellen?
        </p>
        <h2 className="font-display text-[52px] font-semibold text-white tracking-[-0.02em] mb-4 leading-[1.15]">
          Ontdek onze volledige
          <br />
          <span className="text-gold italic">collectie</span>
        </h2>
        <p className="text-[15px] text-white/45 mb-11 max-w-[420px] mx-auto">
          Premium producten voor jouw islamitische lifestyle — met gratis verzending vanaf €50.
        </p>
        <a
          href="/shop"
          className="inline-block text-[11px] tracking-[0.18em] uppercase font-bold bg-gold text-[#0a0a0a] px-12 py-[18px] hover:opacity-85 transition-opacity"
        >
          Shop nu
        </a>
      </div>
    </section>
  );
}
