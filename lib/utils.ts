const priceFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
});

const dateFormatter = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatPrice(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return priceFormatter.format(num);
}

export function formatDate(dateString: string): string {
  return dateFormatter.format(new Date(dateString));
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function calculateDiscount(price: string, comparePrice: string): number {
  const p = parseFloat(price);
  const c = parseFloat(comparePrice);
  if (!c || c <= p) return 0;
  return Math.round(((c - p) / c) * 100);
}

/**
 * Formatteert een postcode op basis van land.
 * NL: 4 cijfers + spatie + 2 hoofdletters (bv. 1234 AB)
 * BE: max 4 cijfers (bv. 1000)
 */
export function formatPostcode(raw: string, country: string): string {
  if (country === 'NL') {
    const cleaned = raw.replace(/[^0-9a-zA-Z]/g, '');
    let digits = '';
    let letters = '';
    for (const ch of cleaned) {
      if (/\d/.test(ch) && digits.length < 4) {
        digits += ch;
      } else if (/[a-zA-Z]/.test(ch) && digits.length === 4 && letters.length < 2) {
        letters += ch.toUpperCase();
      }
    }
    if (digits.length < 4) return digits;
    return letters ? `${digits} ${letters}` : `${digits} `;
  }
  if (country === 'BE') {
    return raw.replace(/\D/g, '').slice(0, 4);
  }
  return raw;
}
