'use client';

const items =
  'Gratis verzending v.a. €50 · Veilig betalen · 30 dagen retour · Premium islamitische producten · سكينة — Rust voor lichaam en ziel · ';

export function AnnouncementBar() {
  return (
    <div
      className="w-full overflow-hidden border-b border-gold/20"
      style={{ background: '#0a0a0a', padding: '9px 0' }}
    >
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
        <span className="text-[10px] tracking-[0.18em] uppercase text-gold pr-16">{items}</span>
        <span className="text-[10px] tracking-[0.18em] uppercase text-gold pr-16">{items}</span>
      </div>
    </div>
  );
}
