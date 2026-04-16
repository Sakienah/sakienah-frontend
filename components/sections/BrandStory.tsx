import { Button } from '../ui/Button';

export function BrandStory() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <p className="text-xs tracking-widest uppercase text-gold font-medium">Ons verhaal</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-black leading-tight">
            Ontworpen voor rust.
            <br />
            Gebouwd voor comfort.
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed">
            Sakienah (سكينة) betekent rust en kalmte. Vanuit die gedachte is elk onderdeel van onze
            gebedsset ontworpen — om jou te helpen aanwezig te zijn, vrij van ongemak.
          </p>
          <p className="text-zinc-500 text-base leading-relaxed">
            Van materiaalskeuze tot de kleinste verbinding: alles is gemaakt om lang mee te gaan en
            elke dag opnieuw te inspireren.
          </p>
          <Button variant="secondary" className="w-fit">
            Meer over ons
          </Button>
        </div>
        <div className="relative">
          <div className="w-full aspect-[4/5] bg-zinc-50 rounded-2xl flex items-center justify-center">
            <span className="text-zinc-300 text-sm tracking-widest uppercase">Sfeerfoto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
