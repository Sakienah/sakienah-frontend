import { Button } from '../ui/Button';

const GEOMETRIC_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a84c' stroke-width='0.4' opacity='0.22'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z'/%3E%3Cpath d='M30 15 L45 30 L30 45 L15 30 Z'/%3E%3C/g%3E%3C/svg%3E")`;

export function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center pt-16 bg-[#FAF7F2] relative overflow-hidden"
      style={{ backgroundImage: GEOMETRIC_PATTERN, backgroundSize: '60px 60px' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full py-20 md:py-32">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-4">
            Islamitische Lifestyle Winkel
          </p>

          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-gold opacity-60" />
            <span
              className="w-[6px] h-[6px] bg-gold opacity-80"
              style={{ transform: 'rotate(45deg)' }}
            />
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.1] text-black mb-6">
            Alles voor jouw
            <br />
            <span className="text-gold">islamitische lifestyle</span>
          </h1>

          <p className="text-zinc-500 text-base leading-relaxed max-w-lg mb-8 font-light">
            Van gebedskleding tot Koran accessoires — premium producten geselecteerd met zorg en
            intentie.
          </p>

          <div className="flex gap-3 flex-wrap mb-10">
            <Button variant="secondary" href="/shop">
              Shop collectie
            </Button>
            <Button variant="outline" href="/producten">
              Bekijk producten
            </Button>
          </div>

          <div className="flex flex-wrap gap-6">
            {['Gratis verzending v.a. €50', '30 dagen retour', 'Veilig betalen'].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[11px] text-zinc-400 tracking-wide"
              >
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
