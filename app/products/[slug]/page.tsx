import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductDetail } from '@/components/features/product/ProductDetail';
import { ProductImageGallery } from '@/components/features/product/ProductImageGallery';
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

        {/* Main content */}
        <div style={{ background: '#fff', padding: '56px 40px 80px' }}>
          <div className="max-w-[1280px] mx-auto">
            <div style={{ display: 'grid', gridTemplateColumns: '44% 56%', gap: 64 }}>
              <ProductImageGallery images={product.images} name={product.name} />
              <ProductDetail product={product} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
