export type Tab = 'overzicht' | 'bestellingen' | 'gegevens' | 'adres' | 'wachtwoord';

export const TABS: { id: Tab; label: string }[] = [
  { id: 'overzicht', label: 'Overzicht' },
  { id: 'bestellingen', label: 'Bestellingen' },
  { id: 'gegevens', label: 'Mijn gegevens' },
  { id: 'adres', label: 'Adres' },
  { id: 'wachtwoord', label: 'Wachtwoord' },
];

export const inputClass =
  'w-full bg-[#FAF7F2] border border-[#E8E0D5] text-[#0a0a0a] text-sm px-4 py-3.5 outline-none focus:border-[#c9a84c] transition-colors';

export const labelClass =
  'block font-sans text-[10px] tracking-[0.13em] uppercase text-[#888] mb-2';

export function statusColor(s: string): string {
  if (s === 'DELIVERED') return '#4CAF78';
  if (s === 'SHIPPED') return '#c9a84c';
  if (s === 'CANCELLED' || s === 'REFUNDED') return '#C62828';
  return '#888';
}

export function statusLabel(s: string): string {
  const map: Record<string, string> = {
    PENDING: 'In behandeling',
    CONFIRMED: 'Bevestigd',
    PROCESSING: 'Verwerking',
    SHIPPED: 'Onderweg',
    DELIVERED: 'Bezorgd',
    CANCELLED: 'Geannuleerd',
    REFUNDED: 'Terugbetaald',
  };
  return map[s] ?? s;
}
