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

export async function updateCartItem(productId: string, quantity: number): Promise<CartResponse> {
  const res = await fetch(`${API_URL}/cart/update`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? `Fout: ${res.status}`);
  }
  return res.json() as Promise<CartResponse>;
}

export async function removeCartItem(productId: string): Promise<CartResponse> {
  const res = await fetch(`${API_URL}/cart/item/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? `Fout: ${res.status}`);
  }
  return res.json() as Promise<CartResponse>;
}

export async function clearCart(): Promise<CartResponse> {
  const res = await fetch(`${API_URL}/cart/clear`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? `Fout: ${res.status}`);
  }
  return res.json() as Promise<CartResponse>;
}

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
  return apiPost<OrderResponse>('/orders/checkout', payload);
}

export type OrderItem = {
  productId: string;
  quantity: number;
  unitPrice: string;
  total: string;
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
  return fetch(`${API_URL}/orders/my`, { credentials: 'include' })
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []) as Promise<OrderSummary[]>;
}

export async function getOrderById(id: string): Promise<OrderSummary> {
  const r = await fetch(`${API_URL}/orders/${id}`, { credentials: 'include' });
  if (!r.ok) throw new Error(`Fout: ${r.status}`);
  return r.json() as Promise<OrderSummary>;
}

export type AddressData = {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export async function getAddress(): Promise<AddressData | null> {
  const r = await fetch(`${API_URL}/addresses/default`, { credentials: 'include' });
  if (!r.ok) return null;
  const data = await r.json();
  return (data as AddressData) ?? null;
}

export async function saveAddress(data: {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}): Promise<AddressData> {
  const r = await fetch(`${API_URL}/addresses/default`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!r.ok) {
    const d = (await r.json().catch(() => ({}))) as { message?: string };
    throw new Error(d.message ?? `Fout: ${r.status}`);
  }
  return r.json() as Promise<AddressData>;
}

export function getFavorites(): Promise<string[]> {
  return fetch(`${API_URL}/favorites`, { credentials: 'include' })
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []) as Promise<string[]>;
}

export function toggleFavorite(productId: string): Promise<string[]> {
  return apiPost<string[]>('/favorites/toggle', { productId });
}
