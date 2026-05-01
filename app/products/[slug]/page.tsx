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
      <main className="flex-1 bg-[#FAF7F2]" style={{ paddingTop: 96 }}>
        <ProductBreadcrumb productName={product.name} />

        <div
          style={{
            background: '#FAF7F2',
            padding: '56px 40px 80px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div style={{ background: '#fff', border: '1px solid #F0EBE3', padding: '48px 48px' }}>
              <ProductView product={product} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
