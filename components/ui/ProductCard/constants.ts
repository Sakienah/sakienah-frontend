/** Productkenmerken per categorie — fallback wanneer product.features niet beschikbaar is. */
export const FEATURE_MAP: Record<string, string[]> = {
  gebedskleed: ['Premium materiaal', 'Handgemaakt', 'Rugsteun'],
  'koran-accessoires': ['Hout', 'Verstelbaar', 'Compact'],
  deals: ['Voordeelbundel', 'Beperkte oplage'],
};

export const DEFAULT_FEATURES = ['Islamitisch gecureerd', 'Premium kwaliteit'];

/** Globale bezorg-belofte voor alle cards. Zet op `null` om uit te schakelen. */
export const DEFAULT_SHIPPING_PROMISE: string | null = 'Voor 22:00 besteld, morgen in huis';

export const MAX_VISIBLE_SWATCHES = 5;

export function resolveFeatures(
  productFeatures: string[] | undefined,
  categorySlug: string | null | undefined,
): string[] {
  if (productFeatures && productFeatures.length > 0) return productFeatures;
  if (categorySlug && FEATURE_MAP[categorySlug]) return FEATURE_MAP[categorySlug];
  return DEFAULT_FEATURES;
}
