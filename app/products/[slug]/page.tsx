import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductView } from '@/components/features/product/ProductView';
import { ProductBreadcrumb } from '@/components/features/product/ProductBreadcrumb';
import { getProduct } from '@/lib/api';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white" style={{ paddingTop: 96 }}>
        <ProductBreadcrumb productName={product.name} />

        <div style={{ background: '#fff', padding: '56px 40px 80px' }}>
          <div className="max-w-[1280px] mx-auto">
            <ProductView product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
