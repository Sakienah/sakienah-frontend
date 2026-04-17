import type { Product, Category } from '@/types';

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
