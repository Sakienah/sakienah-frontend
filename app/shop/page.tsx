import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProducts, getCategories } from '@/lib/api';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { ShopGrid } from '@/components/sections/ShopGrid';
import type { Category } from '@/types';

function CategoryFilter({
  categories,
  active,
}: {
  categories: Category[];
  active: string | undefined;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <Link
        href="/shop"
        className={`text-[10px] tracking-widest uppercase px-4 py-2 border transition-colors ${
          !active
            ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
            : 'border-[#E8E0D5] text-zinc-500 hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
        }`}
      >
        Alles
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/shop?category=${cat.slug}`}
          className={`text-[10px] tracking-widest uppercase px-4 py-2 border transition-colors ${
            active === cat.slug
              ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
              : 'border-[#E8E0D5] text-zinc-500 hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(category).catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Dark hero */}
        <div className="bg-[#0a0a0a] pt-[106px] pb-14 px-10 relative overflow-hidden">
          <GeomPattern opacity={0.07} />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">
              Collectie
            </p>
            <h1 className="font-display text-[44px] font-semibold text-white tracking-[-0.02em]">
              Onze Collectie
            </h1>
          </div>
        </div>

        {/* Products */}
        <div className="bg-[#FAF7F2] pb-24 pt-12 px-10">
          <div className="max-w-[1280px] mx-auto">
            {categories.length > 0 && <CategoryFilter categories={categories} active={category} />}
            {products.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-zinc-400 text-sm">Geen producten gevonden.</p>
              </div>
            ) : (
              <ShopGrid products={products} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
