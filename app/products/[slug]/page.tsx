import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductView } from '@/components/features/product/ProductView';
import { ProductBreadcrumb } from '@/components/features/product/ProductBreadcrumb';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { getProduct } from '@/lib/api';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF7F2]" style={{ paddingTop: 'clamp(110px, 15vw, 106px)' }}>
        <ProductBreadcrumb productName={product.name} />

        <div
          className="py-10 md:py-20"
          style={{
            background: '#FAF7F2',
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div
              className="p-6 md:p-12"
              style={{ background: '#fff', border: '1px solid #F0EBE3' }}
            >
              <ProductView product={product} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
