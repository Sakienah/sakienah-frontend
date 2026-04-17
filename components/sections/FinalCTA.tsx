import { Button } from '../ui/Button';

const GEOMETRIC_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a84c' stroke-width='0.4' opacity='0.22'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z'/%3E%3Cpath d='M30 15 L45 30 L30 45 L15 30 Z'/%3E%3C/g%3E%3C/svg%3E")`;

export function FinalCTA() {
  return (
    <section
      className="py-24 bg-[#FAF7F2]"
      style={{ backgroundImage: GEOMETRIC_PATTERN, backgroundSize: '60px 60px' }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-12 h-px bg-gold opacity-50" />
          <span
            className="w-[6px] h-[6px] bg-gold opacity-70"
            style={{ transform: 'rotate(45deg)' }}
          />
          <span className="w-12 h-px bg-gold opacity-50" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-black mb-4">
          Klaar om te ontdekken?
        </h2>
        <p className="text-zinc-500 text-base font-sans max-w-md mx-auto mb-8">
          Bekijk de volledige collectie van Sakienah — voor elk moment, voor iedereen.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button variant="secondary" href="/shop">
            Shop alle producten
          </Button>
          <Button variant="outline" href="/cadeau-sets">
            Cadeau sets
          </Button>
        </div>
      </div>
    </section>
  );
}
