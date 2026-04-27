const STORAGE_KEY = 'sakienah_cart';

export type LocalCartItem = {
  productId: string;
  quantity: number;
  variantId: string | null;
  selectedColor: string | null;
};

export function getLocalCart(): LocalCartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalCartItem[]) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(items: LocalCartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToLocalCart(
  productId: string,
  quantity: number,
  variantId: string | null,
  selectedColor: string | null,
): LocalCartItem[] {
  const items = getLocalCart();
  const existing = items.find(
    (i) =>
      i.productId === productId && i.variantId === variantId && i.selectedColor === selectedColor,
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, quantity, variantId, selectedColor });
  }
  saveLocalCart(items);
  return items;
}

export function updateLocalCart(
  productId: string,
  quantity: number,
  variantId: string | null,
  selectedColor: string | null,
): LocalCartItem[] {
  const items = getLocalCart();
  if (quantity === 0) return removeFromLocalCart(productId, variantId, selectedColor);
  const existing = items.find(
    (i) =>
      i.productId === productId && i.variantId === variantId && i.selectedColor === selectedColor,
  );
  if (existing) existing.quantity = quantity;
  saveLocalCart(items);
  return items;
}

export function removeFromLocalCart(
  productId: string,
  variantId: string | null,
  selectedColor: string | null,
): LocalCartItem[] {
  const items = getLocalCart().filter(
    (i) =>
      !(
        i.productId === productId &&
        i.variantId === variantId &&
        i.selectedColor === selectedColor
      ),
  );
  saveLocalCart(items);
  return items;
}

export function clearLocalCart(): void {
  localStorage.removeItem(STORAGE_KEY);
}
