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
  isActive: boolean;
  categoryId: string | null;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
};
