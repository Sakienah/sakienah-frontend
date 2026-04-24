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
