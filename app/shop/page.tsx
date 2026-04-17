import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProducts, getCategories } from '@/lib/api';
import type { Product } from '@/types';

function formatPrice(price: string) {
  return `€ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  return (
    <a href={`/products/${product.slug}`} className="group cursor-pointer">
      <div className="relative bg-[#FAF7F2] rounded-xl aspect-[3/4] mb-4 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-zinc-300 text-xs">Geen foto</span>
          </div>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-zinc-800 text-white text-[9px] tracking-widest uppercase px-2.5 py-1">
            Uitverkocht
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black text-gold text-[10px] tracking-widest uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200 text-center">
          + Bekijk product
        </div>
      </div>
      <p className="text-sm text-black font-medium mb-0.5">{product.name}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gold font-semibold">{formatPrice(product.price)}</p>
        {product.comparePrice && (
          <p className="text-xs text-zinc-400 line-through">{formatPrice(product.comparePrice)}</p>
        )}
      </div>
    </a>
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
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-2">
              Collectie
            </p>
            <h1 className="font-display text-4xl font-semibold text-black">Alle producten</h1>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <a
                href="/shop"
                className={`text-[10px] tracking-widest uppercase px-4 py-2 border transition-colors ${
                  !category
                    ? 'bg-black text-white border-black'
                    : 'border-zinc-200 text-zinc-500 hover:border-black hover:text-black'
                }`}
              >
                Alles
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className={`text-[10px] tracking-widest uppercase px-4 py-2 border transition-colors ${
                    category === cat.slug
                      ? 'bg-black text-white border-black'
                      : 'border-zinc-200 text-zinc-500 hover:border-black hover:text-black'
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-zinc-400 text-sm">Geen producten gevonden.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
