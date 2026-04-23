import type { Product, Category, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API fout: ${res.status}`);
  return res.json() as Promise<T>;
}

export function getProducts(categorySlug?: string): Promise<Product[]> {
  const query = categorySlug ? `?category=${categorySlug}` : '';
  return apiFetch<Product[]>(`/products${query}`);
}

export function getProduct(slug: string): Promise<Product> {
  return apiFetch<Product>(`/products/${slug}`);
}

export function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>('/products/categories');
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? `Fout: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function loginUser(email: string, password: string): Promise<User> {
  return apiPost<User>('/auth/login', { email, password });
}

export function registerUser(data: {
  voornaam: string;
  achternaam: string;
  email: string;
  wachtwoord: string;
  nieuwsbrief: boolean;
}): Promise<User> {
  return apiPost<User>('/auth/register', {
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
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(d.message ?? `Fout: ${res.status}`);
  }
  return res.json() as Promise<User>;
}

export async function changePassword(
  huidigWachtwoord: string,
  nieuwWachtwoord: string,
): Promise<void> {
  const res = await fetch(`${API_URL}/auth/password`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ huidigWachtwoord, nieuwWachtwoord }),
  });
  if (!res.ok) {
    const d = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(d.message ?? `Fout: ${res.status}`);
  }
}

export type CartItemResponse = {
  id: string;
  quantity: number;
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
  return fetch(`${API_URL}/cart`, { credentials: 'include' })
    .then((r) => (r.ok ? r.json() : emptyCart))
    .catch(() => emptyCart) as Promise<CartResponse>;
}

export function addToCart(productId: string, quantity = 1): Promise<CartResponse> {
  return apiPost<CartResponse>('/cart/add', { productId, quantity });
}

export function updateCartItem(productId: string, quantity: number): Promise<CartResponse> {
  return fetch(`${API_URL}/cart/update`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ productId, quantity }),
  }).then((r) => r.json()) as Promise<CartResponse>;
}

export function removeCartItem(productId: string): Promise<CartResponse> {
  return fetch(`${API_URL}/cart/item/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((r) => r.json()) as Promise<CartResponse>;
}

export function clearCart(): Promise<CartResponse> {
  return fetch(`${API_URL}/cart/clear`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((r) => r.json()) as Promise<CartResponse>;
}

export function getOrders(): Promise<
  {
    id: string;
    orderNumber: string;
    status: string;
    total: string;
    createdAt: string;
    items: { productId: string; quantity: number; unitPrice: string }[];
  }[]
> {
  return fetch(`${API_URL}/orders/my`, { credentials: 'include' })
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []) as Promise<never>;
}
