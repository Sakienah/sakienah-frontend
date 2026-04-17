import { Button } from '../ui/Button';

export function CTABanner() {
  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <p className="text-xs tracking-widest uppercase text-black/60 font-medium">Klantrecensie</p>
        <blockquote className="font-display text-2xl md:text-3xl font-semibold text-black max-w-2xl leading-snug">
          &ldquo;De beste investering voor mijn dagelijkse gebed. Ik bid nu zoveel
          comfortabeler.&rdquo;
        </blockquote>
        <p className="text-sm text-black/60">— Fatima R., tevreden klant</p>
        <div className="w-16 h-px bg-black/20 my-2" />
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-black">
          Klaar om comfortabel te bidden?
        </h2>
        <Button variant="secondary">Bestel nu →</Button>
      </div>
    </section>
  );
}
