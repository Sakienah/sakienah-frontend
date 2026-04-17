import Image from 'next/image';
import { getProducts } from '@/lib/api';
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
            <span className="text-zinc-300 text-xs font-sans">Productfoto</span>
          </div>
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

export async function BestsellersSection() {
  const products = await getProducts().catch(() => []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-2">
              Collectie
            </p>
            <h2 className="font-display text-4xl font-semibold text-black">Meest Gekocht</h2>
          </div>
          <a
            href="/shop"
            className="text-xs tracking-widest uppercase text-zinc-400 hover:text-gold transition-colors hidden md:block"
          >
            Bekijk alles →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="/shop"
            className="text-xs tracking-widest uppercase text-zinc-400 hover:text-gold transition-colors"
          >
            Bekijk alles →
          </a>
        </div>
      </div>
    </section>
  );
}
