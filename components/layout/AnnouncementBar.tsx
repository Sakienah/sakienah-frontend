'use client';

const TEXT =
  'Gratis verzending v.a. €50 · Veilig betalen · 30 dagen retour · Premium islamitische producten · سكينة — Rust voor lichaam en ziel · ';

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#0a0a0a] border-b border-gold/20 overflow-hidden py-2">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-[10px] tracking-[0.18em] uppercase text-gold pr-16">{TEXT}</span>
        <span className="text-[10px] tracking-[0.18em] uppercase text-gold pr-16">{TEXT}</span>
      </div>
    </div>
  );
}
