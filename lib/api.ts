import { cache } from 'react';
import type { Product, Category, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const PROXY = '/api/proxy';

// Public (server of client) — roept de backend direct aan
async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API fout: ${res.status}`);
  return res.json() as Promise<T>;
}

// Authenticated GET via Next.js proxy — client only
async function proxyGet<T>(path: string, fallback: T): Promise<T> {
  return fetch(`${PROXY}${path}`)
    .then((r) => (r.ok ? (r.json() as Promise<T>) : Promise.resolve(fallback)))
    .catch(() => fallback);
}

async function proxyGetOrThrow<T>(path: string): Promise<T> {
  const res = await fetch(`${PROXY}${path}`);
  if (!res.ok) {
    const d = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(d.message ?? `Fout: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// Authenticated mutatie via Next.js proxy — client only
async function proxyMutate<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${PROXY}${path}`, {
    method,
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : {},
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const d = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(d.message ?? `Fout: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// Auth via BFF-routes (zetten cookie op Next.js-domein)
async function authPost<T>(route: string, body: unknown): Promise<T> {
  const res = await fetch(route, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const d = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(d.message ?? `Fout: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// Publieke producten — cache() deduplicates per request (voorkomt dubbele fetches)
export const getProducts = cache(async (categorySlug?: string): Promise<Product[]> => {
  const query = categorySlug ? `?category=${categorySlug}` : '';
  return apiFetch<Product[]>(`/products${query}`);
});

export function getProduct(slug: string): Promise<Product> {
  return apiFetch<Product>(`/products/${slug}`);
}

export const getCategories = cache(async (): Promise<Category[]> => {
  return apiFetch<Category[]>('/products/categories');
});

// Auth
export function loginUser(email: string, password: string): Promise<User> {
  return authPost<User>('/api/auth/login', { email, password });
}

export function registerUser(data: {
  voornaam: string;
  achternaam: string;
  email: string;
  wachtwoord: string;
  nieuwsbrief: boolean;
}): Promise<User> {
  return authPost<User>('/api/auth/register', {
    voornaam: data.voornaam,
    achternaam: data.achternaam,
    email: data.email,
    password: data.wachtwoord,
    nieuwsbrief: data.nieuwsbrief,
  });
}

export async function updateProfile(data: {
  voornaam?: string;
  achternaam?: string;
  email?: string;
  telefoon?: string;
}): Promise<User> {
  return proxyMutate<User>('PATCH', '/auth/profile', data);
}

export async function changePassword(
  huidigWachtwoord: string,
  nieuwWachtwoord: string,
): Promise<void> {
  await proxyMutate<unknown>('PATCH', '/auth/password', {
    huidigWachtwoord,
    nieuwWachtwoord,
  });
}

// Cart
export type CartItemResponse = {
  id: string;
  quantity: number;
  selectedColor: string | null;
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    comparePrice: string | null;
    images: string[];
    stock: number;
    category: { id: string; name: string; slug: string } | null;
  };
};

export type CartResponse = {
  items: CartItemResponse[];
  totalItems: number;
  subtotal: string;
};

const emptyCart: CartResponse = { items: [], totalItems: 0, subtotal: '0.00' };

export function getCart(): Promise<CartResponse> {
  return proxyGet<CartResponse>('/cart', emptyCart);
}

export function addToCart(
  productId: string,
  quantity = 1,
  selectedColor?: string | null,
): Promise<CartResponse> {
  return proxyMutate<CartResponse>('POST', '/cart/add', { productId, quantity, selectedColor });
}

export function updateCartItem(productId: string, quantity: number): Promise<CartResponse> {
  return proxyMutate<CartResponse>('PATCH', '/cart/update', { productId, quantity });
}

export function removeCartItem(productId: string): Promise<CartResponse> {
  return proxyMutate<CartResponse>('DELETE', `/cart/item/${productId}`);
}

export function clearCart(): Promise<CartResponse> {
  return proxyMutate<CartResponse>('DELETE', '/cart/clear');
}

// Checkout
export type CheckoutPayload = {
  address: { street: string; city: string; postalCode: string };
  paymentMethod: string;
  notes?: string;
};

export type OrderResponse = {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: string;
  shippingCost: string;
  total: string;
  createdAt: string;
};

export function postCheckout(payload: CheckoutPayload): Promise<OrderResponse> {
  return proxyMutate<OrderResponse>('POST', '/orders/checkout', payload);
}

// Orders
export type OrderItem = {
  productId: string;
  quantity: number;
  unitPrice: string;
  total: string;
  selectedColor: string | null;
  product: { name: string; slug: string; images: string[] };
};

export type OrderAddress = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderSummary = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  subtotal: string;
  shippingCost: string;
  total: string;
  createdAt: string;
  notes: string | null;
  items: OrderItem[];
  address: OrderAddress | null;
};

export function getOrders(): Promise<OrderSummary[]> {
  return proxyGet<OrderSummary[]>('/orders/my', []);
}

export function getOrderById(id: string): Promise<OrderSummary> {
  return proxyGetOrThrow<OrderSummary>(`/orders/${id}`);
}

// Adressen
export type AddressData = {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export function getAddress(): Promise<AddressData | null> {
  return fetch(`${PROXY}/addresses/default`)
    .then((r) => (r.ok ? (r.json() as Promise<AddressData>) : Promise.resolve(null)))
    .catch(() => null);
}

export function saveAddress(data: {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}): Promise<AddressData> {
  return proxyMutate<AddressData>('PUT', '/addresses/default', data);
}

// Favorieten
export type FavoriteItem = { productId: string; selectedColor: string | null };

export function getFavorites(): Promise<FavoriteItem[]> {
  return proxyGet<FavoriteItem[]>('/favorites', []);
}

export function toggleFavorite(
  productId: string,
  selectedColor?: string | null,
): Promise<FavoriteItem[]> {
  return proxyMutate<FavoriteItem[]>('POST', '/favorites/toggle', { productId, selectedColor });
}
