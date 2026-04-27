import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductDetail } from '@/components/features/product/ProductDetail';
import { ProductImageGallery } from '@/components/features/product/ProductImageGallery';
import { getProduct } from '@/lib/api';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white" style={{ paddingTop: 106 }}>
        {/* Breadcrumb */}
        <div
          style={{ background: '#fff', padding: '14px 40px', borderBottom: '1px solid #F0EBE3' }}
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center" style={{ gap: 8, fontSize: 12 }}>
              <Link href="/" style={{ color: '#999' }}>
                Home
              </Link>
              <span style={{ color: '#ccc' }}>›</span>
              <Link href="/shop" style={{ color: '#999' }}>
                Shop
              </Link>
              <span style={{ color: '#ccc' }}>›</span>
              <span style={{ color: '#0a0a0a', fontWeight: 500 }}>{product.name}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ background: '#fff', padding: '56px 40px 80px' }}>
          <div className="max-w-[1280px] mx-auto">
            <div style={{ display: 'grid', gridTemplateColumns: '44% 56%', gap: 64 }}>
              {/* Image gallery */}
              <ProductImageGallery images={product.images} name={product.name} />

              {/* Info + actions */}
              <ProductDetail product={product} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
