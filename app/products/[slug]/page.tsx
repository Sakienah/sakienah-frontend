import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { getProduct } from '@/lib/api';

function formatPrice(price: string) {
  return `€ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) notFound();

  const image = product.images[0];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-zinc-400 hover:text-black transition-colors mb-10"
          >
            ← Terug naar shop
          </a>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Afbeelding */}
            <div className="relative bg-[#FAF7F2] rounded-2xl aspect-square overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-zinc-300 text-sm">Geen foto beschikbaar</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              {product.category && (
                <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-3">
                  {product.category.name}
                </p>
              )}

              <h1 className="font-display text-3xl md:text-4xl font-semibold text-black mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-semibold text-gold">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-base text-zinc-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>

              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-xs text-emerald-600 font-medium">
                    Op voorraad ({product.stock} beschikbaar)
                  </span>
                ) : (
                  <span className="text-xs text-red-500 font-medium">Uitverkocht</span>
                )}
              </div>

              <div className="flex gap-3 mb-8">
                <Button variant="primary" className="flex-1">
                  + Voeg toe aan winkelwagen
                </Button>
              </div>

              {product.description && (
                <div className="border-t border-zinc-100 pt-6">
                  <p className="text-[10px] tracking-[0.24em] uppercase text-zinc-400 font-semibold mb-3">
                    Beschrijving
                  </p>
                  <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {product.sku && <p className="text-[10px] text-zinc-300 mt-6">SKU: {product.sku}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
