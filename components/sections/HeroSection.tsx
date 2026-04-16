import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
        <div className="flex flex-col gap-6">
          <p className="text-xs tracking-widest uppercase text-gold font-medium">
            Premium Gebedsset
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight text-black">
            Bid comfortabel.
            <br />
            Altijd.
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
            De Sakienah gebedsset combineert een ergonomische rugsteun met een elegante
            Koran-standaard — ontworpen voor rust, gemaakt voor duurzaamheid.
          </p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-4 h-4 fill-gold" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-zinc-500 ml-1">4.9 · 200+ tevreden klanten</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" href="#product">
              Ontdek het product
            </Button>
            <Button variant="outline" href="#over-ons">
              Meer leren
            </Button>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="w-full aspect-square max-w-lg bg-zinc-50 rounded-2xl flex items-center justify-center">
            <span className="text-zinc-300 text-sm tracking-widest uppercase">Productfoto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
