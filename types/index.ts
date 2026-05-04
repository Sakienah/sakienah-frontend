export type User = {
  id?: string;
  naam: string;
  email: string;
  telefoon?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  parentId: string | null;
  children?: Category[];
};

export type ProductColor = {
  name: string;
  value: string;
};

export type ProductOptions = {
  colors?: ProductColor[];
};

export type ProductVariant = {
  id: string;
  productId: string;
  colorName: string;
  colorValue: string;
  colorHex: string;
  sku: string | null;
  stock: number;
  images: string[];
  isActive: boolean;
};

export type BundleSelection = {
  productId: string;
  variantId: string;
  colorName: string;
  colorHex: string;
};

export type BundleItem = {
  id: string;
  bundleId: string;
  productId: string;
  quantity: number;
  sortOrder: number;
  product: Product;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  comparePrice: string | null;
  sku: string | null;
  stock: number;
  images: string[];
  options: ProductOptions | null;
  variants: ProductVariant[];
  bundleItems: BundleItem[];
  isActive: boolean;
  categoryId: string | null;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  shippingPromise?: string;
  trustSignal?: string;
  origin?: string;
  isHot?: boolean;
  soldCount?: number;
};
